import { isProfileComplete, validateProfileState } from '@/lib/profile'
import {
  getSafeServerErrorMessage,
  isJsonRequest,
  isSameOriginRequest,
} from '@/lib/security'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { getProfileBundleForUser } from '@/lib/user-context'
import type { ProfileFormState } from '@/types/site'
import { NextResponse } from 'next/server'

function isProfilePayload(payload: unknown): payload is ProfileFormState {
  if (!payload || typeof payload !== 'object') {
    return false
  }

  const candidate = payload as Record<string, unknown>

  return (
    typeof candidate.fullName === 'string' &&
    typeof candidate.phone === 'string' &&
    typeof candidate.companyName === 'string' &&
    typeof candidate.avatarUrl === 'string' &&
    typeof candidate.businessType === 'string' &&
    typeof candidate.businessTypeOther === 'string' &&
    typeof candidate.teamSize === 'string' &&
    typeof candidate.teamSizeOther === 'string' &&
    typeof candidate.primaryNeed === 'string' &&
    typeof candidate.primaryNeedOther === 'string' &&
    Array.isArray(candidate.interests) &&
    candidate.interests.every((interest) => typeof interest === 'string') &&
    typeof candidate.interestsOther === 'string' &&
    typeof candidate.preferredContactChannel === 'string' &&
    typeof candidate.preferredContactChannelOther === 'string' &&
    typeof candidate.newsletterOptIn === 'boolean' &&
    typeof candidate.commercialFollowUp === 'boolean' &&
    typeof candidate.profilingConsent === 'boolean'
  )
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json(
      { ok: false, message: 'No pudimos validar el origen de la solicitud.' },
      { status: 403 },
    )
  }

  if (!isJsonRequest(request)) {
    return NextResponse.json(
      { ok: false, message: 'El formato enviado no es válido.' },
      { status: 415 },
    )
  }

  let payload: unknown

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, message: 'No se pudo leer la actualización del perfil.' },
      { status: 400 },
    )
  }

  if (!isProfilePayload(payload)) {
    return NextResponse.json(
      { ok: false, message: 'Los datos del perfil no son válidos.' },
      { status: 400 },
    )
  }

  const validation = validateProfileState(payload)

  if (!validation.isValid) {
    return NextResponse.json(
      {
        ok: false,
        message: 'Revisá los campos marcados antes de guardar.',
        errors: validation.errors,
      },
      { status: 400 },
    )
  }

  try {
    const supabase = await createSupabaseServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { ok: false, message: 'Necesitás iniciar sesión para guardar el perfil.' },
        { status: 401 },
      )
    }

    const currentBundle = await getProfileBundleForUser(user.id)
    const wasComplete = isProfileComplete(currentBundle)
    const { normalized } = validation

    const { error: profileError } = await supabase.from('profiles').upsert(
      {
        id: user.id,
        email: user.email ?? '',
        full_name: normalized.fullName,
        phone: normalized.phone,
        company_name: normalized.companyName,
        avatar_url: normalized.avatarUrl,
      },
      {
        onConflict: 'id',
      },
    )

    if (profileError) {
      console.error('Profile upsert failed', { code: profileError.code, message: profileError.message })

      return NextResponse.json(
        { ok: false, message: 'No se pudo guardar la información básica del perfil.' },
        { status: 500 },
      )
    }

    const { error: preferencesError } = await supabase
      .from('user_preferences')
      .upsert(
        {
          user_id: user.id,
          business_type: normalized.businessType,
          business_type_other: normalized.businessTypeOther,
          team_size: normalized.teamSize,
          team_size_other: normalized.teamSizeOther,
          primary_need: normalized.primaryNeed,
          primary_need_other: normalized.primaryNeedOther,
          interests: normalized.interests,
          interests_other: normalized.interestsOther,
          preferred_contact_channel: normalized.preferredContactChannel,
          preferred_contact_channel_other: normalized.preferredContactChannelOther,
        },
        {
          onConflict: 'user_id',
        },
      )

    if (preferencesError) {
      console.error('User preferences upsert failed', { code: preferencesError.code, message: preferencesError.message })

      return NextResponse.json(
        { ok: false, message: 'No se pudieron guardar tus preferencias.' },
        { status: 500 },
      )
    }

    const { error: consentError } = await supabase.from('marketing_consents').upsert(
      {
        user_id: user.id,
        newsletter_opt_in: normalized.newsletterOptIn,
        commercial_follow_up: normalized.commercialFollowUp,
        profiling_opt_in: normalized.profilingConsent,
        privacy_policy_accepted: true,
        source: 'profile',
      },
      {
        onConflict: 'user_id',
      },
    )

    if (consentError) {
      console.error('Marketing consent upsert failed', { code: consentError.code, message: consentError.message })

      return NextResponse.json(
        { ok: false, message: 'No se pudieron guardar tus consentimientos.' },
        { status: 500 },
      )
    }

    return NextResponse.json({
      ok: true,
      message: wasComplete
        ? 'Perfil actualizado correctamente.'
        : 'Perfil completado correctamente.',
      redirectTo: '/?profile=updated',
    })
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: getSafeServerErrorMessage(),
      },
      { status: 500 },
    )
  }
}
