import { WhatsAppFab } from '@/components/layout/whatsapp-fab'
import { env } from '@/lib/env'
import { siteCopy } from '@/content/site-content'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Instrument_Serif, Sora } from 'next/font/google'
import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  weight: '400',
})

const metadataBase = new URL(env.siteUrl)

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: 'GalfreDev | Automatización, software a medida e IA aplicada',
    template: '%s | GalfreDev',
  },
  description:
    'GalfreDev diseña automatizaciones, bots, integraciones y software a medida para negocios reales en Argentina. Menos tareas manuales, más sistema y más seguimiento.',
  keywords: [
    'automatización',
    'software a medida',
    'bots de WhatsApp',
    'IA aplicada',
    'integraciones',
    'Next.js',
    'Supabase',
    'Argentina',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'GalfreDev | Automatización, software a medida e IA aplicada',
    description:
      'Automatización, bots, integraciones y software a medida para negocios reales en Argentina.',
    url: env.siteUrl,
    siteName: 'GalfreDev',
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GalfreDev',
    description:
      'Automatización, integraciones y software a medida para negocios reales.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${sora.variable} ${instrumentSerif.variable}`}>
      <body>
        {children}
        <WhatsAppFab />
        <Analytics />
        <SpeedInsights />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: siteCopy.brand,
              url: env.siteUrl,
              email: siteCopy.email,
              areaServed: 'AR',
              founder: {
                '@type': 'Person',
                name: siteCopy.founderName,
              },
              description:
                'Automatización, bots, integraciones y software a medida para negocios reales.',
            }),
          }}
        />
      </body>
    </html>
  )
}
