export type LeadStatus = 'idle' | 'loading' | 'success' | 'error'

export type LeadFormState = {
  fullName: string
  email: string
  phone: string
  companyName: string
  businessType: string
  primaryNeed: string
  challenge: string
  consentFollowUp: boolean
  consentNewsletter: boolean
  consentPrivacy: boolean
  website: string
}

export type LeadPayload = LeadFormState & {
  elapsedMs: number
  source?: string
}

export type LeadFieldErrors = Partial<Record<keyof LeadFormState, string>>

export type LeadApiResponse = {
  ok: boolean
  message: string
  whatsappUrl?: string
  errors?: LeadFieldErrors
}

export type LeadValidationResult = {
  isValid: boolean
  errors: LeadFieldErrors
  normalized: LeadFormState
}

export const leadPrimaryNeedOptions = [
  { value: 'whatsapp', label: 'WhatsApp y captacion' },
  { value: 'seguimiento', label: 'Seguimiento comercial' },
  { value: 'turnos', label: 'Turnos y recordatorios' },
  { value: 'cobranzas', label: 'Cobranzas y avisos' },
  { value: 'automatizacion-interna', label: 'Automatizacion interna' },
  { value: 'software-a-medida', label: 'Software a medida' },
] as const

const leadPrimaryNeedLabelMap = new Map<string, string>(
  leadPrimaryNeedOptions.map((option) => [option.value, option.label]),
)

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function createInitialLeadFormState(): LeadFormState {
  return {
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    businessType: '',
    primaryNeed: '',
    challenge: '',
    consentFollowUp: true,
    consentNewsletter: false,
    consentPrivacy: false,
    website: '',
  }
}

export function getLeadPrimaryNeedLabel(value: string) {
  return leadPrimaryNeedLabelMap.get(value) ?? value
}

export function validateLeadPayload(payload: unknown): payload is LeadPayload {
  if (!payload || typeof payload !== 'object') {
    return false
  }

  const candidate = payload as Record<string, unknown>

  return (
    typeof candidate.fullName === 'string' &&
    typeof candidate.email === 'string' &&
    typeof candidate.phone === 'string' &&
    typeof candidate.companyName === 'string' &&
    typeof candidate.businessType === 'string' &&
    typeof candidate.primaryNeed === 'string' &&
    typeof candidate.challenge === 'string' &&
    typeof candidate.consentFollowUp === 'boolean' &&
    typeof candidate.consentNewsletter === 'boolean' &&
    typeof candidate.consentPrivacy === 'boolean' &&
    typeof candidate.website === 'string' &&
    typeof candidate.elapsedMs === 'number' &&
    (typeof candidate.source === 'string' || typeof candidate.source === 'undefined')
  )
}

export function validateLeadForm(input: LeadFormState): LeadValidationResult {
  const normalized: LeadFormState = {
    fullName: input.fullName.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
    companyName: input.companyName.trim(),
    businessType: input.businessType.trim(),
    primaryNeed: input.primaryNeed.trim(),
    challenge: input.challenge.trim(),
    consentFollowUp: input.consentFollowUp,
    consentNewsletter: input.consentNewsletter,
    consentPrivacy: input.consentPrivacy,
    website: input.website.trim(),
  }

  const errors: LeadFieldErrors = {}

  if (!normalized.fullName) {
    errors.fullName = 'Necesitamos tu nombre para registrar la consulta.'
  }

  if (!normalized.email) {
    errors.email = 'Necesitamos un email para responderte.'
  } else if (!emailRegex.test(normalized.email)) {
    errors.email = 'Ingresa un email valido.'
  }

  const phoneDigits = normalized.phone.replace(/\D/g, '')
  if (!normalized.phone) {
    errors.phone = 'Necesitamos un WhatsApp para continuar el lead.'
  } else if (phoneDigits.length < 8) {
    errors.phone = 'Ingresa un numero de WhatsApp valido.'
  }

  if (!normalized.primaryNeed) {
    errors.primaryNeed = 'Elegi la necesidad principal.'
  }

  if (!normalized.challenge) {
    errors.challenge = 'Contanos el contexto para preparar mejor la propuesta.'
  } else if (normalized.challenge.length < 24) {
    errors.challenge = 'Sumanos un poco mas de contexto para entender la consulta.'
  }

  if (!normalized.consentPrivacy) {
    errors.consentPrivacy =
      'Necesitamos tu consentimiento de privacidad para guardar este lead.'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    normalized,
  }
}

type WhatsAppLeadLike = Pick<
  LeadFormState,
  | 'fullName'
  | 'email'
  | 'phone'
  | 'companyName'
  | 'businessType'
  | 'primaryNeed'
  | 'challenge'
  | 'consentFollowUp'
  | 'consentNewsletter'
  | 'consentPrivacy'
>

export function buildLeadWhatsAppMessage(lead: WhatsAppLeadLike) {
  const lines = [
    'Nuevo lead desde GalfreDev',
    '',
    `Nombre: ${lead.fullName}`,
    `Email: ${lead.email}`,
    `WhatsApp: ${lead.phone}`,
    lead.companyName ? `Empresa: ${lead.companyName}` : '',
    lead.businessType ? `Rubro: ${lead.businessType}` : '',
    `Necesidad principal: ${getLeadPrimaryNeedLabel(lead.primaryNeed)}`,
    `Contexto: ${lead.challenge}`,
    '',
    `Consentimiento comercial: ${lead.consentFollowUp ? 'Si' : 'No'}`,
    `Consentimiento novedades: ${lead.consentNewsletter ? 'Si' : 'No'}`,
    `Politica de privacidad aceptada: ${lead.consentPrivacy ? 'Si' : 'No'}`,
  ]

  return lines.filter(Boolean).join('\n')
}

export function buildDraftWhatsAppMessage(form: LeadFormState) {
  const validation = validateLeadForm(form)

  if (!validation.normalized.fullName && !validation.normalized.email) {
    return 'Hola, quiero consultar por los servicios de GalfreDev.'
  }

  return buildLeadWhatsAppMessage({
    ...validation.normalized,
    phone: validation.normalized.phone || 'No compartido todavia',
    primaryNeed: validation.normalized.primaryNeed || 'A definir',
    challenge:
      validation.normalized.challenge ||
      'Quiero continuar la conversacion por WhatsApp y terminar de explicar el contexto.',
  })
}
