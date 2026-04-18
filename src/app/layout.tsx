import { socialLinks, siteCopy } from '@/content/site-content'
import { env } from '@/lib/env'
import { WhatsAppFab } from '@/components/layout/whatsapp-fab'
import { CursorSpotlight } from '@/components/motion/cursor-spotlight'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Instrument_Serif, Sora } from 'next/font/google'
import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  weight: '400',
  display: 'swap',
})

const metadataBase = new URL(env.siteUrl)

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: 'GalfreDev | Automatización, software a medida e IA aplicada',
    template: '%s | GalfreDev',
  },
  description:
    'GalfreDev diseña automatización para negocios, bots para WhatsApp, integraciones y software a medida en Argentina. Menos tareas manuales, más seguimiento y más control operativo.',
  keywords: [
    'automatización para negocios',
    'bots para WhatsApp',
    'software a medida',
    'integraciones',
    'seguimiento comercial',
    'automatización de procesos',
    'IA aplicada a negocios',
    'Córdoba',
    'Argentina',
  ],
  category: 'technology',
  openGraph: {
    title: 'GalfreDev | Automatización, software a medida e IA aplicada',
    description:
      'Automatización para negocios, bots para WhatsApp, integraciones y software a medida en Argentina.',
    url: env.siteUrl,
    siteName: 'GalfreDev',
    locale: 'es_AR',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'GalfreDev | Automatización, software a medida e IA aplicada',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GalfreDev | Automatización, software a medida e IA aplicada',
    description:
      'Automatización para negocios, bots para WhatsApp, integraciones y software a medida en Argentina.',
    images: ['/opengraph-image'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${sora.variable} ${instrumentSerif.variable}`}>
      <body className="antialiased">
        <a
          href="#contenido-principal"
          className="sr-only fixed left-4 top-4 z-[100] rounded-full bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-slate-950 focus:not-sr-only"
        >
          Saltar al contenido
        </a>
        <CursorSpotlight />
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
              description:
                'Automatización para negocios, bots para WhatsApp, integraciones y software a medida en Argentina.',
              serviceType: [
                'Automatización de procesos',
                'Bots para WhatsApp',
                'Integraciones',
                'Software a medida',
                'IA aplicada a negocios',
              ],
              areaServed: [
                {
                  '@type': 'Country',
                  name: 'Argentina',
                },
                {
                  '@type': 'City',
                  name: 'Córdoba',
                },
              ],
              founder: {
                '@type': 'Person',
                name: siteCopy.founderName,
              },
              sameAs: socialLinks
                .filter((item) => !item.href.startsWith('mailto:'))
                .map((item) => item.href),
            }),
          }}
        />
      </body>
    </html>
  )
}
