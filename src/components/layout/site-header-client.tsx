'use client'

import { UserAvatar } from '@/components/layout/user-avatar'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import type { AuthUserSummary, NavItem } from '@/types/site'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

type SiteHeaderClientProps = {
  navItems: NavItem[]
  authUser: AuthUserSummary | null
}

type NavLinkItemProps = {
  item: NavItem
  href: string
  active: boolean
  mobile?: boolean
  onNavigate?: () => void
}

const observedSectionHrefs = ['#soluciones', '#proceso', '#roi', '#fundador', '#contacto']
function NavLinkItem({
  item,
  href,
  active,
  mobile = false,
  onNavigate,
}: NavLinkItemProps) {
  const baseClasses = mobile
    ? [
        'group relative flex items-center justify-between rounded-[1.1rem] border px-4 py-3.5 text-sm transition duration-300 active:scale-[0.985]',
        active
          ? 'border-[rgba(61,221,196,0.2)] bg-[rgba(31,127,115,0.11)] text-white'
          : 'border-transparent bg-white/[0.025] text-white/70 hover:border-white/8 hover:bg-white/[0.05] hover:text-white',
      ].join(' ')
    : [
        'group relative inline-flex items-center justify-center px-1 py-2 text-sm font-medium tracking-[-0.01em] transition duration-300 active:scale-[0.985]',
        active ? 'text-white' : 'text-white/64 hover:text-white',
      ].join(' ')

  const underline = (
    <span
      className={[
        'pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-px rounded-full',
        mobile ? 'w-[calc(100%-2rem)]' : 'w-[calc(100%-0.5rem)]',
        active
          ? 'bg-[linear-gradient(90deg,rgba(61,221,196,0),rgba(61,221,196,0.95),rgba(61,221,196,0))] opacity-100 shadow-[0_0_20px_rgba(61,221,196,0.22)]'
          : 'bg-[linear-gradient(90deg,rgba(61,221,196,0),rgba(61,221,196,0.82),rgba(61,221,196,0))] opacity-0 transition-opacity duration-300 group-hover:opacity-80',
      ].join(' ')}
      aria-hidden="true"
    />
  )

  const content = (
    <span className="relative inline-flex w-full items-center justify-center">
      {!mobile ? (
        <span
          className={[
            'pointer-events-none absolute inset-x-1 top-1/2 h-8 -translate-y-1/2 rounded-full blur-xl transition-opacity duration-300',
            active
              ? 'bg-[radial-gradient(circle,rgba(61,221,196,0.16),transparent_68%)] opacity-100'
              : 'bg-[radial-gradient(circle,rgba(61,221,196,0.1),transparent_72%)] opacity-0 group-hover:opacity-90',
          ].join(' ')}
          aria-hidden="true"
        />
      ) : null}
      <span className="relative z-10">{item.label}</span>
      {underline}
    </span>
  )

  if (href.startsWith('/')) {
    return (
      <Link
        href={href}
        onClick={onNavigate}
        className={baseClasses}
        aria-current={active ? 'page' : undefined}
      >
        {content}
      </Link>
    )
  }

  return (
    <a
      href={href}
      onClick={onNavigate}
      className={baseClasses}
      aria-current={active ? 'page' : undefined}
    >
      {content}
    </a>
  )
}

export function SiteHeaderClient({ navItems, authUser }: SiteHeaderClientProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => {
      const nextScrolled = window.scrollY > 14
      setScrolled((current) => (current === nextScrolled ? current : nextScrolled))
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
        setMenuOpen(false)
        setOpen(false)
      }
    }

    window.addEventListener('click', handleWindowClick)
    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('click', handleWindowClick)
      window.removeEventListener('keydown', handleEscape)
    }
  }, [])

  useEffect(() => {
    if (pathname !== '/') {
      return
    }

    const sections = observedSectionHrefs
      .map((href) => {
        const element = document.getElementById(href.slice(1))
        return element ? { href, element } : null
      })
      .filter((entry): entry is { href: string; element: HTMLElement } => Boolean(entry))

    if (!sections.length) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)

        if (visibleEntries[0]) {
          setActiveSection(`#${visibleEntries[0].target.id}`)
        } else if (window.scrollY < 28) {
          setActiveSection(null)
        }
      },
      {
        rootMargin: '-16% 0px -56% 0px',
        threshold: [0.18, 0.35, 0.52, 0.72],
      },
    )

    sections.forEach(({ element }) => observer.observe(element))

    const syncWithHash = () => {
      if (window.location.hash && observedSectionHrefs.includes(window.location.hash)) {
        setActiveSection(window.location.hash)
      }
    }

    syncWithHash()
    window.addEventListener('hashchange', syncWithHash)

    return () => {
      observer.disconnect()
      window.removeEventListener('hashchange', syncWithHash)
    }
  }, [pathname])

  const desktopItems = useMemo(() => {
    if (!authUser) {
      return navItems
    }

    return [...navItems, { label: 'Perfil', href: '/perfil' }]
  }, [authUser, navItems])

  function resolveHref(href: string) {
    return href.startsWith('#') ? `/${href}` : href
  }

  function isItemActive(item: NavItem) {
    const currentSection = pathname === '/' ? activeSection : null

    if (item.href === '/perfil') {
      return pathname === '/perfil'
    }

    if (pathname !== '/') {
      return false
    }

    return currentSection ? item.href === currentSection : false
  }

  const profileLabel = authUser?.hasCompletedProfile ? 'Ver perfil' : 'Completar perfil'

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div
        className={[
          'relative mx-auto flex max-w-7xl items-center justify-between overflow-hidden rounded-full border px-5 py-3.5 transition-all duration-500',
          scrolled
            ? 'border-white/10 bg-[rgba(7,12,20,0.8)] shadow-[0_18px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl'
            : 'border-white/8 bg-[rgba(7,12,20,0.42)] shadow-[0_10px_40px_rgba(0,0,0,0.12)] backdrop-blur-lg',
        ].join(' ')}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent_35%)]"
        />
        <span
          aria-hidden="true"
          className={[
            'pointer-events-none absolute inset-x-[16%] top-0 h-16 rounded-full blur-3xl transition-opacity duration-500',
            scrolled
              ? 'bg-[radial-gradient(circle,rgba(61,221,196,0.12),transparent_70%)] opacity-100'
              : 'bg-[radial-gradient(circle,rgba(61,221,196,0.08),transparent_70%)] opacity-70',
          ].join(' ')}
        />

        <Link href="/#top" className="relative z-10 flex items-center gap-3">
          <span className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            GD
          </span>
          <span className="text-sm font-semibold tracking-[0.18em] text-white/84">
            GALFREDEV
          </span>
        </Link>

        <nav className="relative z-10 hidden items-center gap-5 lg:flex" aria-label="Navegación principal">
          {desktopItems.map((item) => (
            <NavLinkItem
              key={item.href}
              item={item}
              href={resolveHref(item.href)}
              active={isItemActive(item)}
            />
          ))}
        </nav>

        <div className="relative z-10 hidden items-center gap-3 lg:flex">
          <a
            href={buildWhatsAppUrl(
              'Hola, quiero pedir un diagnóstico para automatizar procesos con GalfreDev.',
            )}
            target="_blank"
            rel="noreferrer"
            className="group relative overflow-hidden rounded-full border border-[rgba(61,221,196,0.2)] bg-[linear-gradient(180deg,rgba(50,148,134,0.98),rgba(31,127,115,0.92))] px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_10px_30px_rgba(31,127,115,0.16)] transition duration-300 hover:shadow-[0_14px_38px_rgba(31,127,115,0.22)] active:scale-[0.986]"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.18),transparent)] opacity-0 transition duration-500 group-hover:translate-x-3 group-hover:opacity-100"
            />
            <span className="relative z-10">Pedir diagnóstico</span>
          </a>

          {authUser ? (
            <div className="relative" onClick={(event) => event.stopPropagation()}>
              <button
                type="button"
                onClick={() => setMenuOpen((value) => !value)}
                className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.045] px-2 py-1.5 text-left transition duration-300 hover:border-white/18 hover:bg-white/[0.07]"
                aria-label="Abrir menú de usuario"
                aria-expanded={menuOpen}
                aria-controls="user-menu"
              >
                <UserAvatar user={authUser} />
                <span className="max-w-[10rem] truncate text-sm text-white/82">
                  {authUser.displayName}
                </span>
                <ChevronDown size={16} className="text-white/42" />
              </button>

              <AnimatePresence>
                {menuOpen ? (
                  <motion.div
                    id="user-menu"
                    initial={{ opacity: 0, y: -10, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.985 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="surface-panel page-panel absolute right-0 top-[calc(100%+12px)] w-[20rem] rounded-[1.75rem] p-4"
                  >
                    <div className="relative flex items-center gap-3 rounded-[1.35rem] border border-white/8 bg-white/[0.03] p-3">
                      <UserAvatar user={authUser} />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white">{authUser.displayName}</p>
                        <p className="truncate text-xs text-white/46">{authUser.email}</p>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-2">
                      <Link
                        href="/perfil"
                        className="rounded-[1.2rem] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white/82 transition duration-300 hover:border-white/14 hover:bg-white/[0.06]"
                        onClick={() => setMenuOpen(false)}
                      >
                        {profileLabel}
                      </Link>
                      <Link
                        href="/auth/signout"
                        className="rounded-[1.2rem] border border-white/8 bg-white/[0.02] px-4 py-3 text-sm text-white/58 transition duration-300 hover:border-white/14 hover:bg-white/[0.06] hover:text-white"
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
              className="rounded-full border border-white/12 bg-white/[0.035] px-4 py-2.5 text-sm text-white/76 transition duration-300 hover:border-white/18 hover:bg-white/[0.06] hover:text-white"
            >
              Acceso
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="relative z-10 inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white transition duration-300 hover:border-white/18 hover:bg-white/[0.08] active:scale-[0.96] lg:hidden"
          aria-label={open ? 'Cerrar navegación' : 'Abrir navegación'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          <span className="inline-flex transition-transform duration-200">
            {open ? <X size={18} /> : <Menu size={18} />}
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="page-panel mx-auto mt-3 max-w-7xl overflow-hidden rounded-[1.9rem] p-4 lg:hidden"
          >
            {authUser ? (
              <div className="relative mb-4 flex items-center gap-3 rounded-[1.35rem] border border-white/8 bg-white/[0.03] p-3">
                <UserAvatar user={authUser} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">{authUser.displayName}</p>
                  <p className="truncate text-xs text-white/46">{authUser.email}</p>
                </div>
              </div>
            ) : null}

            <div className="space-y-2">
              {desktopItems.map((item) => (
                <NavLinkItem
                  key={item.href}
                  item={item}
                  href={resolveHref(item.href)}
                  active={isItemActive(item)}
                  mobile
                  onNavigate={() => setOpen(false)}
                />
              ))}
            </div>

            <div className="mt-4 grid gap-3 border-t border-white/8 pt-4">
              <a
                href={buildWhatsAppUrl(
                  'Hola, quiero pedir un diagnóstico para automatizar procesos con GalfreDev.',
                )}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[rgba(61,221,196,0.2)] bg-[linear-gradient(180deg,rgba(50,148,134,0.98),rgba(31,127,115,0.92))] px-4 py-3 text-center text-sm font-semibold text-slate-950"
              >
                Pedir diagnóstico
              </a>

              {authUser ? (
                <Link
                  href="/auth/signout"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 text-center text-sm text-white/82"
                >
                  Cerrar sesión
                </Link>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 text-center text-sm text-white/82"
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
