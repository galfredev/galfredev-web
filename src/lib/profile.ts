import type { ProfileBundle, ProfileFormState } from '@/types/site'

const DATA_URL_IMAGE_PATTERN = /^data:image\/(png|jpe?g|webp|gif|svg\+xml);base64,/i

function cleanString(value: string) {
  return value.trim()
}

function cleanOptionalString(value: string) {
  const trimmed = cleanString(value)
  return trimmed.length > 0 ? trimmed : null
}

export function createEmptyProfileState(): ProfileFormState {
  return {
    fullName: '',
    phone: '',
    companyName: '',
    avatarUrl: '',
    businessType: '',
    businessTypeOther: '',
    teamSize: '',
    teamSizeOther: '',
    primaryNeed: '',
    primaryNeedOther: '',
    interests: [],
    interestsOther: '',
    preferredContactChannel: '',
    preferredContactChannelOther: '',
    newsletterOptIn: false,
    commercialFollowUp: true,
    profilingConsent: false,
  }
}

export function createProfileState(bundle?: Partial<ProfileBundle>): ProfileFormState {
  return {
    ...createEmptyProfileState(),
    fullName: bundle?.fullName ?? '',
    phone: bundle?.phone ?? '',
    companyName: bundle?.companyName ?? '',
    avatarUrl: bundle?.avatarUrl ?? '',
    businessType: bundle?.businessType ?? '',
    businessTypeOther: bundle?.businessTypeOther ?? '',
    teamSize: bundle?.teamSize ?? '',
    teamSizeOther: bundle?.teamSizeOther ?? '',
    primaryNeed: bundle?.primaryNeed ?? '',
    primaryNeedOther: bundle?.primaryNeedOther ?? '',
    interests: bundle?.interests ?? [],
    interestsOther: bundle?.interestsOther ?? '',
    preferredContactChannel: bundle?.preferredContactChannel ?? '',
    preferredContactChannelOther: bundle?.preferredContactChannelOther ?? '',
    newsletterOptIn: bundle?.newsletterOptIn ?? false,
    commercialFollowUp: bundle?.commercialFollowUp ?? true,
    profilingConsent: bundle?.profilingConsent ?? false,
  }
}

export function isValidAvatarDataUrl(value: string) {
  return DATA_URL_IMAGE_PATTERN.test(value)
}

export function sanitizeInterestList(values: string[]) {
  return Array.from(
    new Set(
      values
        .map((value) => cleanString(value))
        .filter(Boolean),
    ),
  )
}

export function normalizeProfileState(form: ProfileFormState) {
  const interests = sanitizeInterestList(form.interests)
  const avatarUrl = cleanString(form.avatarUrl)

  return {
    fullName: cleanString(form.fullName),
    phone: cleanOptionalString(form.phone),
    companyName: cleanOptionalString(form.companyName),
    avatarUrl:
      avatarUrl.length === 0
        ? null
        : isValidAvatarDataUrl(avatarUrl) || /^https?:\/\//i.test(avatarUrl)
          ? avatarUrl
          : null,
    businessType: cleanOptionalString(form.businessType),
    businessTypeOther: cleanOptionalString(form.businessTypeOther),
    teamSize: cleanOptionalString(form.teamSize),
    teamSizeOther: cleanOptionalString(form.teamSizeOther),
    primaryNeed: cleanOptionalString(form.primaryNeed),
    primaryNeedOther: cleanOptionalString(form.primaryNeedOther),
    interests,
    interestsOther: cleanOptionalString(form.interestsOther),
    preferredContactChannel: cleanOptionalString(form.preferredContactChannel),
    preferredContactChannelOther: cleanOptionalString(
      form.preferredContactChannelOther,
    ),
    newsletterOptIn: form.newsletterOptIn,
    commercialFollowUp: form.commercialFollowUp,
    profilingConsent: form.profilingConsent,
  }
}

export function validateProfileState(form: ProfileFormState) {
  const normalized = normalizeProfileState(form)
  const errors: Partial<Record<keyof ProfileFormState, string>> = {}

  if (!normalized.fullName) {
    errors.fullName = 'Contanos cómo querés que te llamemos.'
  }

  if (
    normalized.avatarUrl &&
    !isValidAvatarDataUrl(normalized.avatarUrl) &&
    !/^https?:\/\//i.test(normalized.avatarUrl)
  ) {
    errors.avatarUrl = 'La imagen no tiene un formato válido.'
  }

  if (
    normalized.phone &&
    normalized.phone.length < 8
  ) {
    errors.phone = 'Revisá el número de contacto.'
  }

  if (
    normalized.businessType === 'otro' &&
    !normalized.businessTypeOther
  ) {
    errors.businessTypeOther = 'Sumá una breve descripción del rubro.'
  }

  if (normalized.teamSize === 'otro' && !normalized.teamSizeOther) {
    errors.teamSizeOther = 'Contanos el tamaño aproximado del equipo.'
  }

  if (normalized.primaryNeed === 'otro' && !normalized.primaryNeedOther) {
    errors.primaryNeedOther = 'Describí la necesidad principal.'
  }

  if (
    normalized.preferredContactChannel === 'otro' &&
    !normalized.preferredContactChannelOther
  ) {
    errors.preferredContactChannelOther =
      'Indicá cuál es el mejor canal para contactarte.'
  }

  return {
    normalized,
    errors,
    isValid: Object.keys(errors).length === 0,
  }
}

export function deriveInitials(value: string) {
  const tokens = value
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean)
    .slice(0, 2)

  if (tokens.length === 0) {
    return 'GD'
  }

  return tokens.map((token) => token[0]?.toUpperCase() ?? '').join('')
}

export function isProfileComplete(bundle: Pick<
  ProfileBundle,
  | 'fullName'
  | 'companyName'
  | 'businessType'
  | 'businessTypeOther'
  | 'primaryNeed'
  | 'primaryNeedOther'
  | 'interests'
  | 'interestsOther'
>) {
  if (!bundle.fullName?.trim()) {
    return false
  }

  const hasContext = Boolean(
    bundle.companyName?.trim() ||
      bundle.businessType?.trim() ||
      bundle.businessTypeOther?.trim() ||
      bundle.primaryNeed?.trim() ||
      bundle.primaryNeedOther?.trim() ||
      bundle.interests.length > 0 ||
      bundle.interestsOther?.trim(),
  )

  return hasContext
}

export function getPostLoginRedirect(hasCompletedProfile: boolean) {
  return hasCompletedProfile ? '/' : '/perfil'
}
