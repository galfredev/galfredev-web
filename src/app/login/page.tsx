import { LoginPanel } from '@/components/auth/login-panel'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'

export const metadata = {
  title: 'Acceso',
}

export default function LoginPage() {
  return (
    <>
      <SiteHeader />
      <main className="px-4 pb-18 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <div className="mx-auto grid min-h-[80svh] max-w-7xl items-center gap-10 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-accent)]">
              Acceso secundario
            </p>
            <h1 className="max-w-2xl text-balance text-5xl font-semibold tracking-[-0.08em] text-white sm:text-6xl">
              Perfil simple para guardar contexto, no para desviar la conversión.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-white/60">
              El objetivo principal del sitio sigue siendo conversar y detectar oportunidades reales. El perfil suma orden, consentimiento y mejor entendimiento del negocio.
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
