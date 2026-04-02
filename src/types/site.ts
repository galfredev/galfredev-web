export type NavItem = {
  href: string
  label: string
}

export type HeroMetric = {
  label: string
  value: string
  detail: string
}

export type ValuePillar = {
  icon?: string
  title: string
  summary: string
  points: string[]
}

export type SolutionCard = {
  title: string
  label?: string
  audience: string
  pain: string
  outcome: string
  bullets: string[]
  ctaLabel: string
  message: string
}

export type ProcessStep = {
  step: string
  title: string
  description: string
  outcome: string
}

export type TrustSignal = {
  title: string
  summary: string
  detail: string
}

export type Certification = {
  id: string
  title: string
  issuer: string
  date: string
  image: string
}

export type SocialLink = {
  label: string
  href: string
}

export type ProfileOption = {
  value: string
  label: string
}

export type ProfileFormState = {
  fullName: string
  phone: string
  companyName: string
  businessType: string
  teamSize: string
  primaryNeed: string
  interests: string[]
  preferredContactChannel: string
  newsletterOptIn: boolean
  commercialFollowUp: boolean
  profilingConsent: boolean
}
