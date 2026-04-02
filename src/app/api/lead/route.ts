import { createSupabaseServerClient } from '@/lib/supabase/server'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { NextResponse } from 'next/server'

type LeadPayload = {
  fullName: string
  email: string
  phone?: string
  companyName?: string
  businessType?: string
  primaryNeed: string
  challenge: string
  consentFollowUp: boolean
  consentNewsletter: boolean
  consentPrivacy: boolean
  website?: string
  elapsedMs: number
  source?: string
}

function isLeadPayload(payload: unknown): payload is LeadPayload {
  if (!payload || typeof payload !== 'object') {
    return false
  }

  const candidate = payload as Record<string, unknown>

  return (
    typeof candidate.fullName === 'string' &&
    typeof candidate.email === 'string' &&
    typeof candidate.primaryNeed === 'string' &&
    typeof candidate.challenge === 'string' &&
    typeof candidate.consentFollowUp === 'boolean' &&
    typeof candidate.consentNewsletter === 'boolean' &&
    typeof candidate.consentPrivacy === 'boolean' &&
    typeof candidate.elapsedMs === 'number'
  )
}

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

  if (!isLeadPayload(payload)) {
    return NextResponse.json(
      { ok: false, message: 'Los datos enviados no tienen el formato esperado.' },
      { status: 400 },
    )
  }

  if (payload.website?.trim()) {
    return NextResponse.json({ ok: true, message: 'Solicitud recibida.' })
  }

  const fullName = payload.fullName.trim()
  const email = payload.email.trim().toLowerCase()
  const challenge = payload.challenge.trim()

  if (!fullName || !email || !payload.primaryNeed || challenge.length < 24) {
    return NextResponse.json(
      {
        ok: false,
        message:
          'Completá nombre, email, necesidad principal y un poco más de contexto.',
      },
      { status: 400 },
    )
  }

  if (!payload.consentPrivacy) {
    return NextResponse.json(
      {
        ok: false,
        message: 'Necesito consentimiento de privacidad para guardar la consulta.',
      },
      { status: 400 },
    )
  }

  if (payload.elapsedMs < 1200) {
    return NextResponse.json(
      {
        ok: false,
        message: 'La solicitud fue demasiado rápida. Probá de nuevo en unos segundos.',
      },
      { status: 400 },
    )
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { ok: false, message: 'Ingresá un email válido.' },
      { status: 400 },
    )
  }

  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: lead, error: leadError } = await supabase
    .from('lead_intake')
    .insert({
      user_id: user?.id ?? null,
      full_name: fullName,
      email,
      phone: payload.phone?.trim() || null,
      company_name: payload.companyName?.trim() || null,
      business_type: payload.businessType?.trim() || null,
      primary_need: payload.primaryNeed,
      challenge,
      status: 'new',
      source: payload.source ?? 'website',
    })
    .select('id')
    .single<{ id: string }>()

  if (leadError || !lead) {
    return NextResponse.json(
      {
        ok: false,
        message: 'No se pudo registrar la consulta en la base de datos.',
      },
      { status: 500 },
    )
  }

  const { error: consentError } = await supabase.from('marketing_consents').insert({
    lead_id: lead.id,
    newsletter_opt_in: payload.consentNewsletter,
    commercial_follow_up: payload.consentFollowUp,
    profiling_opt_in: false,
    privacy_policy_accepted: payload.consentPrivacy,
    source: payload.source ?? 'website',
  })

  if (consentError) {
    return NextResponse.json(
      {
        ok: false,
        message: 'La consulta entró, pero falló el registro de consentimiento.',
      },
      { status: 500 },
    )
  }

  const whatsappMessage = [
    'Hola, vengo desde la nueva web de GalfreDev.',
    `Nombre: ${fullName}`,
    `Email: ${email}`,
    payload.phone ? `WhatsApp: ${payload.phone.trim()}` : '',
    payload.companyName ? `Empresa: ${payload.companyName.trim()}` : '',
    payload.businessType ? `Rubro: ${payload.businessType.trim()}` : '',
    `Necesidad principal: ${payload.primaryNeed}`,
    `Contexto: ${challenge}`,
  ]
    .filter(Boolean)
    .join('\n')

  return NextResponse.json({
    ok: true,
    message:
      'Tu consulta quedó registrada. Si querés, seguí la conversación ahora por WhatsApp.',
    whatsappUrl: buildWhatsAppUrl(whatsappMessage),
  })
}
