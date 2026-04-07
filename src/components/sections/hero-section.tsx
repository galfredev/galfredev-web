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
      <div className="absolute inset-x-0 top-0 h-[760px] bg-[radial-gradient(circle_at_top,rgba(31,127,115,0.18),transparent_46%),radial-gradient(circle_at_75%_18%,rgba(255,165,75,0.12),transparent_28%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,16,0.08),rgba(5,8,16,0.84))]" />

      <div className="relative mx-auto grid min-h-[92svh] max-w-7xl items-center gap-14 pb-18 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10 lg:pb-24">
        <div className="space-y-9">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/70 backdrop-blur-xl"
          >
            <span className="inline-flex size-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_18px_var(--color-accent)]" />
            Automatización aplicada a negocios reales
          </motion.div>

          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.82, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-[12ch] text-balance text-5xl font-semibold tracking-[-0.08em] text-white sm:max-w-[11ch] sm:text-6xl lg:max-w-[10.5ch] lg:text-7xl"
            >
              <span className="block">Automatización real para</span>
              <RotatingText
                words={heroScenarios.map((scenario) => scenario.headline)}
                activeIndex={activeScenarioIndex}
                className="mt-2 block max-w-[9.5ch] leading-[0.92] sm:max-w-[9.8ch]"
              />
              <span className="mt-2 block">con más sistema.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.86, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl text-pretty text-lg leading-8 text-white/66 sm:text-xl"
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
            transition={{ duration: 0.82, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <a
              href={buildWhatsAppUrl(
                'Hola, quiero hablar por WhatsApp para evaluar automatizaciones en mi negocio.',
              )}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3.5 text-sm font-medium text-slate-950 transition hover:bg-[var(--color-accent-strong)]"
            >
              Hablar por WhatsApp
              <ArrowDownRight size={16} />
            </a>
            <a
              href="#roi"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/5 px-6 py-3.5 text-sm text-white/86 transition hover:border-white/22 hover:bg-white/8"
            >
              Ver diagnóstico rápido
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.86, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-3 sm:grid-cols-3"
          >
            {heroMetrics.map((metric) => (
              <BorderGlowCard key={metric.label} className="px-5 py-4 backdrop-blur-xl">
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="inline-flex size-2 rounded-full bg-[var(--color-accent)]/80" />
                    <p className="text-sm font-medium text-white">{metric.value}</p>
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/38">
                    {metric.label}
                  </p>
                  <p className="text-sm leading-6 text-white/58">{metric.detail}</p>
                </motion.div>
              </BorderGlowCard>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 26 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.92, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
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
