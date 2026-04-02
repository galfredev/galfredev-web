import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { ProfileForm } from '@/components/profile/profile-form'
import { getCurrentUserContext } from '@/lib/user-context'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Perfil',
}

export default async function ProfilePage() {
  const userContext = await getCurrentUserContext()

  if (!userContext) {
    redirect('/login')
  }

  return (
    <>
      <SiteHeader />
      <main className="px-4 pb-18 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <div className="mx-auto max-w-7xl">
          <ProfileForm
            email={userContext.authUser.email}
            providerLabel={userContext.authUser.providerLabel}
            initialValues={userContext.initialProfileState}
            mode={userContext.authUser.hasCompletedProfile ? 'edit' : 'onboarding'}
            fallbackAvatarUrl={userContext.authUser.avatarUrl}
          />
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
