export const leadStatuses = [
  'new',
  'contacted',
  'qualified',
  'proposal_sent',
  'won',
  'lost',
  'spam',
] as const

export const leadPriorities = ['low', 'normal', 'high'] as const

export const leadEventTypes = [
  'lead_created',
  'status_changed',
  'consent_recorded',
  'follow_up_scheduled',
  'note_added',
] as const

export type LeadStatusValue = (typeof leadStatuses)[number]
export type LeadPriorityValue = (typeof leadPriorities)[number]
export type LeadEventTypeValue = (typeof leadEventTypes)[number]

export const DEFAULT_LEAD_STATUS: LeadStatusValue = 'new'
export const DEFAULT_LEAD_PRIORITY: LeadPriorityValue = 'normal'
export const CONTACT_FORM_SOURCE = 'website-contact-form'
export const CONTACT_FORM_KEY = 'contact'
export const CONTACT_FORM_PAGE_PATH = '/#contacto'
export const CONTACT_FORM_ENTRY_POINT = 'contact-section'
export const CONTACT_FORM_CTA_ID = 'pedir-propuesta-o-diagnostico'
