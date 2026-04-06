import {
  buildLeadWhatsAppMessage,
  validateLeadForm,
  validateLeadPayload,
} from '@/lib/contact'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  let payload: unknown

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, message: 'No se pudo leer la solicitud enviada.' },
      { status: 400 },
    )
  }

  if (!validateLeadPayload(payload)) {
    return NextResponse.json(
      { ok: false, message: 'Los datos enviados no tienen el formato esperado.' },
      { status: 400 },
    )
  }

  if (payload.website.trim()) {
    return NextResponse.json({ ok: true, message: 'Solicitud recibida.' })
  }

  const validation = validateLeadForm(payload)

  if (!validation.isValid) {
    return NextResponse.json(
      {
        ok: false,
        message: 'Revisa los campos marcados antes de enviar la consulta.',
        errors: validation.errors,
      },
      { status: 400 },
    )
  }

  if (payload.elapsedMs < 1200) {
    return NextResponse.json(
      {
        ok: false,
        message: 'La solicitud fue demasiado rapida. Proba de nuevo en unos segundos.',
      },
      { status: 400 },
    )
  }

  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const source = payload.source?.trim() || 'website-contact-section'
  const leadId = crypto.randomUUID()
  const { normalized } = validation

  const { error: leadError } = await supabase.from('lead_intake').insert({
    id: leadId,
    user_id: user?.id ?? null,
    full_name: normalized.fullName,
    email: normalized.email,
    phone: normalized.phone,
    company_name: normalized.companyName || null,
    business_type: normalized.businessType || null,
    primary_need: normalized.primaryNeed,
    challenge: normalized.challenge,
    status: 'new',
    source,
  })

  if (leadError) {
    console.error('Lead intake insert failed', {
      code: leadError.code,
      details: leadError.details,
      hint: leadError.hint,
      message: leadError.message,
      source,
    })

    return NextResponse.json(
      {
        ok: false,
        message: 'No se pudo registrar la consulta en la base de datos.',
      },
      { status: 500 },
    )
  }

  const { error: consentError } = await supabase.from('marketing_consents').insert({
    lead_id: leadId,
    newsletter_opt_in: normalized.consentNewsletter,
    commercial_follow_up: normalized.consentFollowUp,
    profiling_opt_in: false,
    privacy_policy_accepted: normalized.consentPrivacy,
    source,
  })

  if (consentError) {
    console.error('Marketing consent insert failed', {
      code: consentError.code,
      details: consentError.details,
      hint: consentError.hint,
      message: consentError.message,
      source,
    })

    return NextResponse.json(
      {
        ok: false,
        message:
          'La consulta se guardo, pero no pudimos registrar el consentimiento correctamente.',
      },
      { status: 500 },
    )
  }

  return NextResponse.json({
    ok: true,
    message: 'Tu consulta quedo registrada. Te llevamos a WhatsApp para continuar.',
    whatsappUrl: buildWhatsAppUrl(buildLeadWhatsAppMessage(normalized)),
  })
}
