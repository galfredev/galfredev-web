import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { ContactSection } from '@/components/sections/contact-section'
import { FounderSection } from '@/components/sections/founder-section'
import { HeroSection } from '@/components/sections/hero-section'
import { ProcessSection } from '@/components/sections/process-section'
import { ProfileTeaserSection } from '@/components/sections/profile-teaser-section'
import { RoiCalculatorSection } from '@/components/sections/roi-calculator-section'
import { SolutionsSection } from '@/components/sections/solutions-section'
import { ValueSection } from '@/components/sections/value-section'

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="top" className="relative overflow-hidden">
        <HeroSection />
        <ValueSection />
        <SolutionsSection />
        <ProcessSection />
        <RoiCalculatorSection />
        <FounderSection />
        <ProfileTeaserSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}
