import { SiteHeaderClient } from '@/components/layout/site-header-client'
import { navItems } from '@/content/site-content'
import { getCurrentUserContext } from '@/lib/user-context'

export async function SiteHeader() {
  const userContext = await getCurrentUserContext()

  return (
    <SiteHeaderClient navItems={navItems} authUser={userContext?.authUser ?? null} />
  )
}
