import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { ProfileForm } from '@/components/profile/profile-form'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import type { ProfileFormState } from '@/types/site'
import { redirect } from 'next/navigation'

type ProfileRecord = {
  full_name: string | null
  phone: string | null
  company_name: string | null
}

type PreferencesRecord = {
  business_type: string | null
  team_size: string | null
  primary_need: string | null
  interests: string[] | null
  preferred_contact_channel: string | null
}

type ConsentRecord = {
  newsletter_opt_in: boolean | null
  commercial_follow_up: boolean | null
  profiling_opt_in: boolean | null
}

export const metadata = {
  title: 'Perfil',
}

export default async function ProfilePage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const provider = user.app_metadata?.provider
  const providerLabel =
    provider === 'google'
      ? 'Google'
      : provider === 'github'
        ? 'GitHub'
        : provider === 'linkedin_oidc'
          ? 'LinkedIn'
          : 'Magic link'

  const [{ data: profile }, { data: preferences }, { data: consent }] =
    await Promise.all([
      supabase
        .from('profiles')
        .select('full_name, phone, company_name')
        .eq('id', user.id)
        .maybeSingle<ProfileRecord>(),
      supabase
        .from('user_preferences')
        .select(
          'business_type, team_size, primary_need, interests, preferred_contact_channel',
        )
        .eq('user_id', user.id)
        .maybeSingle<PreferencesRecord>(),
      supabase
        .from('marketing_consents')
        .select('newsletter_opt_in, commercial_follow_up, profiling_opt_in')
        .eq('user_id', user.id)
        .maybeSingle<ConsentRecord>(),
    ])

  const initialValues: ProfileFormState = {
    fullName: profile?.full_name ?? user.user_metadata?.full_name ?? '',
    phone: profile?.phone ?? '',
    companyName: profile?.company_name ?? '',
    businessType: preferences?.business_type ?? '',
    teamSize: preferences?.team_size ?? '',
    primaryNeed: preferences?.primary_need ?? '',
    interests: preferences?.interests ?? [],
    preferredContactChannel: preferences?.preferred_contact_channel ?? '',
    newsletterOptIn: consent?.newsletter_opt_in ?? false,
    commercialFollowUp: consent?.commercial_follow_up ?? true,
    profilingConsent: consent?.profiling_opt_in ?? false,
  }

  return (
    <>
      <SiteHeader />
      <main className="px-4 pb-18 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <div className="mx-auto max-w-7xl">
          <ProfileForm
            email={user.email ?? ''}
            providerLabel={providerLabel}
            initialValues={initialValues}
          />
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
