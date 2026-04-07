import { LoginPanel } from '@/components/auth/login-panel'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { getCurrentUserContext } from '@/lib/user-context'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Acceso',
  description:
    'Ingresá a tu perfil de GalfreDev para guardar contexto, preferencias y datos útiles antes de avanzar con una propuesta o diagnóstico.',
  alternates: {
    canonical: '/login',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default async function LoginPage() {
  const userContext = await getCurrentUserContext()

  if (userContext) {
    redirect(userContext.postLoginRedirect)
  }

  return (
    <>
      <SiteHeader />
      <main id="contenido-principal" className="px-4 pb-18 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <div className="mx-auto grid min-h-[80svh] max-w-7xl items-center gap-10 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-accent)]">
              Acceso liviano
            </p>
            <h1 className="max-w-2xl text-balance text-5xl font-semibold tracking-[-0.08em] text-white sm:text-6xl">
              Ingresá una vez y dejá tu contexto listo para que la próxima conversación avance más rápido.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-white/60">
              El perfil sirve para guardar datos básicos, entender mejor tu operación y adaptar diagnósticos o propuestas sin convertir el sitio en un portal complejo.
            </p>
          </div>

          <div className="lg:justify-self-end">
            <LoginPanel />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
