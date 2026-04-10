'use client'

import { BlurHighlight } from '@/components/motion/blur-highlight'
import { BorderGlowCard } from '@/components/motion/border-glow-card'
import { DeviceShowcase } from '@/components/motion/device-showcase'
import { RotatingText } from '@/components/motion/rotating-text'
import { heroMetrics, heroScenarios } from '@/content/site-content'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { motion } from 'framer-motion'
import { ArrowDownRight } from 'lucide-react'
import Link from 'next/link'
import { startTransition, useEffect, useState } from 'react'

const HERO_ROTATION_MS = 5800

export function HeroSection() {
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0)
  const activeScenario = heroScenarios[activeScenarioIndex] ?? heroScenarios[0]

  useEffect(() => {
    if (heroScenarios.length <= 1) {
      return
    }

    const timer = window.setInterval(() => {
      startTransition(() => {
        setActiveScenarioIndex((current) => (current + 1) % heroScenarios.length)
      })
    }, HERO_ROTATION_MS)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <section className="relative overflow-hidden px-4 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-[780px] bg-[radial-gradient(circle_at_top,rgba(31,127,115,0.2),transparent_44%),radial-gradient(circle_at_76%_16%,rgba(255,165,75,0.12),transparent_26%),radial-gradient(circle_at_20%_8%,rgba(77,122,255,0.08),transparent_24%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,16,0.08),rgba(5,8,16,0.84))]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 pb-16 sm:min-h-[92svh] sm:pb-18 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10 lg:pb-24">
        <div className="space-y-9">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/72 backdrop-blur-xl"
          >
            <span className="inline-flex size-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_18px_var(--color-accent)]" />
            Automatización aplicada a negocios reales
          </motion.div>

          <div className="space-y-7">
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.92, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[11.6ch] text-balance text-[2.6rem] font-semibold leading-[0.92] tracking-[-0.085em] text-white sm:max-w-[10.8ch] sm:text-[3.35rem] md:text-[4.4rem] lg:max-w-[10.1ch] lg:text-[5.55rem]"
            >
              <span className="block text-white">Automatización real para</span>
              <RotatingText
                words={heroScenarios.map((scenario) => scenario.headline)}
                activeIndex={activeScenarioIndex}
                className="mt-2 block max-w-[9.2ch] leading-[0.9] sm:max-w-[9.5ch]"
              />
              <span className="mt-2 block text-white/96">con más sistema.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl text-pretty text-[1.03rem] leading-8 text-[var(--text-soft)] sm:text-[1.14rem]"
            >
              <BlurHighlight
                text="En GalfreDev diseñamos bots, automatizaciones, integraciones y software a medida para responder más rápido, no perder clientes, ordenar procesos y hacer que la operación escale con criterio."
                highlightWords={[
                  'GalfreDev',
                  'bots',
                  'automatizaciones',
                  'integraciones',
                  'software',
                  'clientes',
                  'procesos',
                ]}
              />
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.82, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <a
              href={buildWhatsAppUrl(
                'Hola, quiero hablar por WhatsApp para evaluar automatizaciones en mi negocio.',
              )}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[rgba(61,221,196,0.18)] bg-[linear-gradient(180deg,rgba(50,148,134,0.98),rgba(31,127,115,0.92))] px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_14px_40px_rgba(31,127,115,0.18)] transition duration-300 hover:translate-y-[-1px] hover:shadow-[0_18px_48px_rgba(31,127,115,0.24)] active:scale-[0.985]"
            >
              Hablar por WhatsApp
              <ArrowDownRight
                size={16}
                className="transition duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              />
            </a>
            <a
              href="#roi"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.035] px-6 py-3.5 text-sm text-white/84 transition duration-300 hover:border-white/20 hover:bg-white/[0.055] hover:text-white active:scale-[0.985]"
            >
              Ver diagnóstico rápido
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.88, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-3 sm:grid-cols-3"
          >
            {heroMetrics.map((metric, index) => (
              <BorderGlowCard
                key={metric.label}
                className={[
                  'backdrop-blur-xl',
                  index === 0 ? 'px-5 py-5' : 'px-5 py-4',
                  index === 2 ? 'col-span-2 sm:col-span-1' : '',
                ].join(' ')}
              >
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.22 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="inline-flex size-2 rounded-full bg-[var(--color-accent)]/80 shadow-[0_0_16px_rgba(61,221,196,0.2)]" />
                    <p className={index === 0 ? 'text-base font-semibold text-white' : 'text-sm font-medium text-white'}>
                      {metric.value}
                    </p>
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/60">
                    {metric.label}
                  </p>
                  <p className={index === 0 ? 'text-sm leading-6 text-white/66' : 'text-sm leading-6 text-white/60'}>
                    {metric.detail}
                  </p>
                </motion.div>
              </BorderGlowCard>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 26 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.96, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:-translate-y-8 lg:translate-x-6 xl:-translate-y-10 xl:translate-x-10"
        >
          <DeviceShowcase scenario={activeScenario} />
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent,rgba(5,8,16,0.95))]" />
      <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 text-xs uppercase tracking-[0.28em] text-white/28 lg:block">
        <Link href="#soluciones">Scroll para ver el sistema</Link>
      </div>
    </section>
  )
}
