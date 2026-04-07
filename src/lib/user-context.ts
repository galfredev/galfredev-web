import { hasSupabaseEnv } from '@/lib/env'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import {
  createProfileState,
  deriveInitials,
  getPostLoginRedirect,
  isProfileComplete,
} from '@/lib/profile'
import type { AuthUserSummary, ProfileBundle } from '@/types/site'
import type { User } from '@supabase/supabase-js'

type ProfileRow = {
  full_name: string | null
  phone: string | null
  company_name: string | null
  avatar_url: string | null
}

type PreferencesRow = {
  business_type: string | null
  business_type_other: string | null
  team_size: string | null
  team_size_other: string | null
  primary_need: string | null
  primary_need_other: string | null
  interests: string[] | null
  interests_other: string | null
  preferred_contact_channel: string | null
  preferred_contact_channel_other: string | null
}

type ConsentRow = {
  newsletter_opt_in: boolean | null
  commercial_follow_up: boolean | null
  profiling_opt_in: boolean | null
}

function getProviderLabel(provider: string | undefined) {
  if (provider === 'google') return 'Google'
  if (provider === 'github') return 'GitHub'
  if (provider === 'linkedin_oidc') return 'LinkedIn'
  return 'Enlace mágico'
}

function getProviderAvatar(user: User) {
  const metadata = user.user_metadata as Record<string, unknown> | undefined
  const candidate =
    typeof metadata?.avatar_url === 'string'
      ? metadata.avatar_url
      : typeof metadata?.picture === 'string'
        ? metadata.picture
        : null

  return candidate
}

export async function getProfileBundleForUser(userId: string) {
  if (!hasSupabaseEnv()) {
    return {
      fullName: null,
      phone: null,
      companyName: null,
      avatarUrl: null,
      businessType: null,
      businessTypeOther: null,
      teamSize: null,
      teamSizeOther: null,
      primaryNeed: null,
      primaryNeedOther: null,
      interests: [],
      interestsOther: null,
      preferredContactChannel: null,
      preferredContactChannelOther: null,
      newsletterOptIn: false,
      commercialFollowUp: true,
      profilingConsent: false,
    } satisfies ProfileBundle
  }

  const supabase = await createSupabaseServerClient()

  const [{ data: profile }, { data: preferences }, { data: consent }] =
    await Promise.all([
      supabase
        .from('profiles')
        .select('full_name, phone, company_name, avatar_url')
        .eq('id', userId)
        .maybeSingle<ProfileRow>(),
      supabase
        .from('user_preferences')
        .select(
          [
            'business_type',
            'business_type_other',
            'team_size',
            'team_size_other',
            'primary_need',
            'primary_need_other',
            'interests',
            'interests_other',
            'preferred_contact_channel',
            'preferred_contact_channel_other',
          ].join(', '),
        )
        .eq('user_id', userId)
        .maybeSingle<PreferencesRow>(),
      supabase
        .from('marketing_consents')
        .select(
          'newsletter_opt_in, commercial_follow_up, profiling_opt_in',
        )
        .eq('user_id', userId)
        .maybeSingle<ConsentRow>(),
    ])

  const bundle: ProfileBundle = {
    fullName: profile?.full_name ?? null,
    phone: profile?.phone ?? null,
    companyName: profile?.company_name ?? null,
    avatarUrl: profile?.avatar_url ?? null,
    businessType: preferences?.business_type ?? null,
    businessTypeOther: preferences?.business_type_other ?? null,
    teamSize: preferences?.team_size ?? null,
    teamSizeOther: preferences?.team_size_other ?? null,
    primaryNeed: preferences?.primary_need ?? null,
    primaryNeedOther: preferences?.primary_need_other ?? null,
    interests: preferences?.interests ?? [],
    interestsOther: preferences?.interests_other ?? null,
    preferredContactChannel: preferences?.preferred_contact_channel ?? null,
    preferredContactChannelOther:
      preferences?.preferred_contact_channel_other ?? null,
    newsletterOptIn: consent?.newsletter_opt_in ?? false,
    commercialFollowUp: consent?.commercial_follow_up ?? true,
    profilingConsent: consent?.profiling_opt_in ?? false,
  }

  return bundle
}

export async function getCurrentUserContext() {
  if (!hasSupabaseEnv()) {
    return null
  }

  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const bundle = await getProfileBundleForUser(user.id)
  const metadata = user.user_metadata as Record<string, unknown> | undefined
  const metadataName =
    typeof metadata?.full_name === 'string'
      ? metadata.full_name
      : typeof metadata?.name === 'string'
        ? metadata.name
        : null

  const displayName =
    bundle.fullName ||
    metadataName ||
    bundle.companyName ||
    user.email?.split('@')[0] ||
    'Perfil'

  const hasCompleted = isProfileComplete(bundle)

  const authUser: AuthUserSummary = {
    id: user.id,
    email: user.email ?? '',
    provider: user.app_metadata?.provider ?? 'email',
    providerLabel: getProviderLabel(user.app_metadata?.provider),
    displayName,
    initials: deriveInitials(displayName),
    avatarUrl: bundle.avatarUrl ?? getProviderAvatar(user),
    companyName: bundle.companyName,
    hasCompletedProfile: hasCompleted,
  }

  return {
    user,
    authUser,
    profileBundle: bundle,
    initialProfileState: createProfileState(bundle),
    postLoginRedirect: getPostLoginRedirect(hasCompleted),
  }
}
