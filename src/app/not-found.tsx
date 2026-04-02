import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex min-h-screen items-center px-4 py-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-[36px] border border-white/8 bg-white/5 p-8 text-center shadow-[0_24px_90px_rgba(0,0,0,0.28)] sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-accent)]">
            Error 404
          </p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.06em] text-white sm:text-5xl">
            Esta ruta no encontró una solución.
          </h1>
          <p className="mt-5 text-lg leading-8 text-white/60">
            Volvé al inicio para seguir viendo cómo GalfreDev puede ayudarte con automatización, software e IA aplicada.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-medium text-slate-950"
            >
              Volver al inicio
            </Link>
            <Link
              href="/#contacto"
              className="rounded-full border border-white/12 px-5 py-3 text-sm text-white/82"
            >
              Ir al contacto
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
