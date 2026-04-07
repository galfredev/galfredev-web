'use client'

import { UserAvatar } from '@/components/layout/user-avatar'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import type { AuthUserSummary, NavItem } from '@/types/site'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

type SiteHeaderClientProps = {
  navItems: NavItem[]
  authUser: AuthUserSummary | null
}

export function SiteHeaderClient({
  navItems,
  authUser,
}: SiteHeaderClientProps) {
  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const nextValue = window.scrollY > 16
      setScrolled((current) => (current === nextValue ? current : nextValue))
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    function handleWindowClick() {
      setMenuOpen(false)
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        setMenuOpen(false)
      }
    }

    window.addEventListener('click', handleWindowClick)
    window.addEventListener('keydown', handleEscape)
    return () => {
      window.removeEventListener('click', handleWindowClick)
      window.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const desktopItems = useMemo(() => {
    if (!authUser) {
      return navItems
    }

    return [...navItems, { label: 'Perfil', href: '/perfil' }]
  }, [authUser, navItems])

  function resolveHref(href: string) {
    return href.startsWith('#') ? `/${href}` : href
  }

  const profileLabel = authUser?.hasCompletedProfile
    ? 'Ver perfil'
    : 'Completar perfil'

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

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegación principal">
          {desktopItems.map((item) =>
            resolveHref(item.href).startsWith('/') ? (
              <Link
                key={item.href}
                href={resolveHref(item.href)}
                className="text-sm text-white/66 transition hover:text-white"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-white/66 transition hover:text-white"
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
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

          {authUser ? (
            <div className="relative" onClick={(event) => event.stopPropagation()}>
              <button
                type="button"
                onClick={() => setMenuOpen((value) => !value)}
                className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/6 px-2 py-1.5 text-left transition hover:border-white/20 hover:bg-white/8"
                aria-label="Abrir menú de usuario"
                aria-expanded={menuOpen}
                aria-controls="user-menu"
              >
                <UserAvatar user={authUser} />
                <span className="max-w-[10rem] truncate text-sm text-white/82">
                  {authUser.displayName}
                </span>
                <ChevronDown size={16} className="text-white/48" />
              </button>

              <AnimatePresence>
                {menuOpen ? (
                  <motion.div
                    id="user-menu"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-[calc(100%+12px)] w-[20rem] rounded-[28px] border border-white/10 bg-[rgba(8,12,20,0.96)] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl"
                  >
                    <div className="flex items-center gap-3 rounded-[22px] border border-white/8 bg-white/[0.03] p-3">
                      <UserAvatar user={authUser} />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white">
                          {authUser.displayName}
                        </p>
                        <p className="truncate text-xs text-white/48">
                          {authUser.email}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-2">
                      <Link
                        href="/perfil"
                        className="rounded-2xl border border-white/8 px-4 py-3 text-sm text-white/82 transition hover:border-white/16 hover:bg-white/6"
                        onClick={() => setMenuOpen(false)}
                      >
                        {profileLabel}
                      </Link>
                      <Link
                        href="/auth/signout"
                        className="rounded-2xl border border-white/8 px-4 py-3 text-sm text-white/58 transition hover:border-white/16 hover:bg-white/6 hover:text-white"
                        onClick={() => setMenuOpen(false)}
                      >
                        Cerrar sesión
                      </Link>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-full border border-white/12 px-4 py-2 text-sm text-white/74 transition hover:border-white/24 hover:text-white"
            >
              Acceso
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white lg:hidden"
          aria-label={open ? 'Cerrar navegación' : 'Abrir navegación'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.24 }}
            className="mx-auto mt-3 max-w-7xl overflow-hidden rounded-[28px] border border-white/10 bg-[rgba(8,12,20,0.94)] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl lg:hidden"
          >
            {authUser ? (
              <div className="mb-4 flex items-center gap-3 rounded-[22px] border border-white/8 bg-white/[0.03] p-3">
                <UserAvatar user={authUser} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">
                    {authUser.displayName}
                  </p>
                  <p className="truncate text-xs text-white/48">{authUser.email}</p>
                </div>
              </div>
            ) : null}

            <div className="space-y-2">
              {desktopItems.map((item) =>
                resolveHref(item.href).startsWith('/') ? (
                  <Link
                    key={item.href}
                    href={resolveHref(item.href)}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-sm text-white/72 transition hover:bg-white/6 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-sm text-white/72 transition hover:bg-white/6 hover:text-white"
                  >
                    {item.label}
                  </a>
                ),
              )}
            </div>

            <div className="mt-4 grid gap-3 border-t border-white/8 pt-4">
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

              {authUser ? (
                <Link
                  href="/auth/signout"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-white/10 px-4 py-3 text-center text-sm text-white/82"
                >
                  Cerrar sesión
                </Link>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-white/10 px-4 py-3 text-center text-sm text-white/82"
                >
                  Acceso
                </Link>
              )}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
