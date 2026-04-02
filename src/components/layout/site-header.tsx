'use client'

import { navItems } from '@/content/site-content'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)

    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div
        className={[
          'mx-auto flex max-w-7xl items-center justify-between rounded-full border px-5 py-3 transition-all duration-300',
          scrolled
            ? 'border-white/12 bg-[rgba(8,12,20,0.82)] shadow-[0_16px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl'
            : 'border-white/8 bg-[rgba(8,12,20,0.38)] backdrop-blur-md',
        ].join(' ')}
      >
        <Link href="/#top" className="flex items-center gap-3">
          <span className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/6 text-sm font-semibold text-white">
            GD
          </span>
          <span className="text-sm font-medium tracking-[0.18em] text-white/84">
            GALFREDEV
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-white/66 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/login"
            className="rounded-full border border-white/12 px-4 py-2 text-sm text-white/74 transition hover:border-white/24 hover:text-white"
          >
            Acceso
          </Link>
          <a
            href={buildWhatsAppUrl(
              'Hola, quiero pedir un diagnóstico para automatizar procesos con GalfreDev.',
            )}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[var(--color-accent)] px-5 py-2 text-sm font-medium text-slate-950 transition hover:bg-[var(--color-accent-strong)]"
          >
            Pedir diagnóstico
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white lg:hidden"
          aria-label={open ? 'Cerrar navegación' : 'Abrir navegación'}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.24 }}
            className="mx-auto mt-3 max-w-7xl overflow-hidden rounded-[28px] border border-white/10 bg-[rgba(8,12,20,0.94)] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl lg:hidden"
          >
            <div className="space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-sm text-white/72 transition hover:bg-white/6 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="mt-4 grid gap-3 border-t border-white/8 pt-4">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/10 px-4 py-3 text-center text-sm text-white/82"
              >
                Acceso
              </Link>
              <a
                href={buildWhatsAppUrl(
                  'Hola, quiero pedir un diagnóstico para automatizar procesos con GalfreDev.',
                )}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[var(--color-accent)] px-4 py-3 text-center text-sm font-medium text-slate-950"
              >
                Pedir diagnóstico
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
