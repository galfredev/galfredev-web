import { socialLinks } from '@/content/site-content'
import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8 bg-black/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.9fr] lg:px-8">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-accent)]">
            GalfreDev
          </p>
          <h2 className="max-w-md text-2xl font-semibold tracking-[-0.05em] text-white">
            Automatización real, software a medida e IA aplicada para negocios que necesitan avanzar con más orden.
          </h2>
          <p className="max-w-lg text-sm leading-7 text-white/58">
            GalfreDev acompaña a empresas que quieren responder mejor, ordenar procesos y crecer con soluciones tecnológicas que tengan sentido en la operación real.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-medium text-white">Mapa rápido</p>
          <div className="grid gap-3 text-sm text-white/62">
            <a href="#soluciones" className="transition hover:text-white">
              Soluciones
            </a>
            <a href="#proceso" className="transition hover:text-white">
              Cómo trabajamos
            </a>
            <a href="#roi" className="transition hover:text-white">
              Calculadora ROI
            </a>
            <a href="#fundador" className="transition hover:text-white">
              Valentino Galfré
            </a>
            <Link href="/privacidad" className="transition hover:text-white">
              Política de privacidad
            </Link>
            <Link href="/terminos" className="transition hover:text-white">
              Términos de uso
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-medium text-white">Redes y contacto</p>
          <div className="grid gap-3 text-sm text-white/62">
            {socialLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={item.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                className="transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/8 px-4 py-5 text-center text-xs text-white/44 sm:px-6 lg:px-8">
        © 2026 GalfreDev. Córdoba, Argentina. Todos los derechos reservados.
      </div>
    </footer>
  )
}
