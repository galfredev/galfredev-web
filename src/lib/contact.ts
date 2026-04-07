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
  { value: 'whatsapp', label: 'WhatsApp y captación' },
  { value: 'seguimiento', label: 'Seguimiento comercial' },
  { value: 'turnos', label: 'Turnos y recordatorios' },
  { value: 'cobranzas', label: 'Cobranzas y avisos' },
  { value: 'automatizacion-interna', label: 'Automatización interna' },
  { value: 'software-a-medida', label: 'Software a medida' },
] as const

const leadPrimaryNeedLabelMap = new Map<string, string>(
  leadPrimaryNeedOptions.map((option) => [option.value, option.label]),
)

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneDigitsRegex = /\D/g
const singleLineControlCharsRegex = /[\u0000-\u001F\u007F]+/g
const multilineControlCharsRegex = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]+/g
const MAX_FULL_NAME_LENGTH = 80
const MAX_EMAIL_LENGTH = 160
const MAX_PHONE_LENGTH = 24
const MAX_COMPANY_LENGTH = 120
const MAX_BUSINESS_TYPE_LENGTH = 80
const MAX_CHALLENGE_LENGTH = 1200
const MIN_CHALLENGE_LENGTH = 24

function cleanSingleLine(value: string) {
  return value.replace(singleLineControlCharsRegex, ' ').replace(/\s+/g, ' ').trim()
}

function cleanMultiline(value: string) {
  return value
    .replace(multilineControlCharsRegex, ' ')
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

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
    Number.isFinite(candidate.elapsedMs) &&
    (typeof candidate.source === 'string' || typeof candidate.source === 'undefined')
  )
}

export function validateLeadForm(input: LeadFormState): LeadValidationResult {
  const normalized: LeadFormState = {
    fullName: cleanSingleLine(input.fullName),
    email: cleanSingleLine(input.email).toLowerCase(),
    phone: cleanSingleLine(input.phone),
    companyName: cleanSingleLine(input.companyName),
    businessType: cleanSingleLine(input.businessType),
    primaryNeed: cleanSingleLine(input.primaryNeed),
    challenge: cleanMultiline(input.challenge),
    consentFollowUp: input.consentFollowUp,
    consentNewsletter: input.consentNewsletter,
    consentPrivacy: input.consentPrivacy,
    website: cleanSingleLine(input.website),
  }

  const errors: LeadFieldErrors = {}

  if (!normalized.fullName) {
    errors.fullName = 'Necesitamos tu nombre para registrar la consulta.'
  } else if (normalized.fullName.length > MAX_FULL_NAME_LENGTH) {
    errors.fullName = 'Usá un nombre un poco más corto.'
  }

  if (!normalized.email) {
    errors.email = 'Necesitamos un email para responderte.'
  } else if (!emailRegex.test(normalized.email)) {
    errors.email = 'Ingresá un email válido.'
  } else if (normalized.email.length > MAX_EMAIL_LENGTH) {
    errors.email = 'El email es demasiado largo.'
  }

  const phoneDigits = normalized.phone.replace(phoneDigitsRegex, '')
  if (!normalized.phone) {
    errors.phone = 'Necesitamos un WhatsApp para continuar el lead.'
  } else if (phoneDigits.length < 8) {
    errors.phone = 'Ingresá un número de WhatsApp válido.'
  } else if (phoneDigits.length > 15 || normalized.phone.length > MAX_PHONE_LENGTH) {
    errors.phone = 'Revisá el número de WhatsApp antes de enviarlo.'
  }

  if (normalized.companyName.length > MAX_COMPANY_LENGTH) {
    errors.companyName = 'El nombre de la empresa es demasiado largo.'
  }

  if (normalized.businessType.length > MAX_BUSINESS_TYPE_LENGTH) {
    errors.businessType = 'El rubro es demasiado largo.'
  }

  if (!normalized.primaryNeed) {
    errors.primaryNeed = 'Elegí la necesidad principal.'
  } else if (!leadPrimaryNeedLabelMap.has(normalized.primaryNeed)) {
    errors.primaryNeed = 'Elegí una necesidad principal válida.'
  }

  if (!normalized.challenge) {
    errors.challenge = 'Contanos el contexto para preparar mejor la propuesta.'
  } else if (normalized.challenge.length < MIN_CHALLENGE_LENGTH) {
    errors.challenge = 'Sumanos un poco más de contexto para entender la consulta.'
  } else if (normalized.challenge.length > MAX_CHALLENGE_LENGTH) {
    errors.challenge = 'Resumí un poco el contexto para poder revisarlo mejor.'
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
    `Consentimiento comercial: ${lead.consentFollowUp ? 'Sí' : 'No'}`,
    `Consentimiento novedades: ${lead.consentNewsletter ? 'Sí' : 'No'}`,
    `Política de privacidad aceptada: ${lead.consentPrivacy ? 'Sí' : 'No'}`,
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
    phone: validation.normalized.phone || 'No compartido todavía',
    primaryNeed: validation.normalized.primaryNeed || 'A definir',
    challenge:
      validation.normalized.challenge ||
      'Quiero continuar la conversación por WhatsApp y terminar de explicar el contexto.',
  })
}
