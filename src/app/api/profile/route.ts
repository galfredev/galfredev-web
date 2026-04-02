import { createSupabaseServerClient } from '@/lib/supabase/server'
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
    typeof candidate.businessType === 'string' &&
    typeof candidate.teamSize === 'string' &&
    typeof candidate.primaryNeed === 'string' &&
    Array.isArray(candidate.interests) &&
    typeof candidate.preferredContactChannel === 'string' &&
    typeof candidate.newsletterOptIn === 'boolean' &&
    typeof candidate.commercialFollowUp === 'boolean' &&
    typeof candidate.profilingConsent === 'boolean'
  )
}

export async function POST(request: Request) {
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

  const { error: profileError } = await supabase.from('profiles').upsert({
    id: user.id,
    email: user.email ?? '',
    full_name: payload.fullName.trim() || null,
    phone: payload.phone.trim() || null,
    company_name: payload.companyName.trim() || null,
  })

  if (profileError) {
    return NextResponse.json(
      { ok: false, message: 'No se pudo guardar la información básica del perfil.' },
      { status: 500 },
    )
  }

  const { error: preferencesError } = await supabase
    .from('user_preferences')
    .upsert({
      user_id: user.id,
      business_type: payload.businessType || null,
      team_size: payload.teamSize || null,
      primary_need: payload.primaryNeed || null,
      interests: payload.interests,
      preferred_contact_channel: payload.preferredContactChannel || null,
    })

  if (preferencesError) {
    return NextResponse.json(
      { ok: false, message: 'No se pudieron guardar tus preferencias.' },
      { status: 500 },
    )
  }

  const { error: consentError } = await supabase.from('marketing_consents').upsert(
    {
      user_id: user.id,
      newsletter_opt_in: payload.newsletterOptIn,
      commercial_follow_up: payload.commercialFollowUp,
      profiling_opt_in: payload.profilingConsent,
      privacy_policy_accepted: true,
      source: 'profile',
    },
    {
      onConflict: 'user_id',
    },
  )

  if (consentError) {
    return NextResponse.json(
      { ok: false, message: 'No se pudieron guardar tus consentimientos.' },
      { status: 500 },
    )
  }

  return NextResponse.json({
    ok: true,
    message: 'Perfil actualizado correctamente.',
  })
}
