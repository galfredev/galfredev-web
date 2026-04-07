import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '404',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <main id="contenido-principal" className="px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pt-32">
      <div className="mx-auto max-w-3xl rounded-[32px] border border-white/8 bg-[rgba(8,12,20,0.82)] p-8 text-center shadow-[0_28px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-accent)]">
          Error 404
        </p>
        <h1 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.06em] text-white sm:text-5xl">
          Esta página no existe.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-white/60">
          Volvé al inicio para seguir viendo cómo GalfreDev puede ayudarte con automatización, software e IA aplicada.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-medium text-slate-950"
          >
            Volver al inicio
          </Link>
          <Link
            href="/#contacto"
            className="inline-flex items-center justify-center rounded-full border border-white/12 px-5 py-3 text-sm text-white/82 transition hover:border-white/24 hover:text-white"
          >
            Ir al contacto
          </Link>
        </div>
      </div>
    </main>
  )
}
