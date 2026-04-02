'use client'

import { heroMetrics } from '@/content/site-content'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowDownRight, Bot, Radar, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'

function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pointerX = useMotionValue(0.5)
  const pointerY = useMotionValue(0.5)
  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 22 })
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 22 })

  const rotateX = useTransform(smoothY, [0, 1], [10, -10])
  const rotateY = useTransform(smoothX, [0, 1], [-10, 10])
  const glowX = useTransform(smoothX, (value) => `${value * 100}%`)
  const glowY = useTransform(smoothY, (value) => `${value * 100}%`)

  return (
    <div
      ref={containerRef}
      onMouseMove={(event) => {
        const bounds = containerRef.current?.getBoundingClientRect()

        if (!bounds) {
          return
        }

        pointerX.set((event.clientX - bounds.left) / bounds.width)
        pointerY.set((event.clientY - bounds.top) / bounds.height)
      }}
      className="relative mx-auto w-full max-w-[640px]"
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="hero-panel relative overflow-hidden rounded-[32px] border border-white/10 p-5 shadow-[0_28px_120px_rgba(0,0,0,0.38)]"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              'radial-gradient(circle at var(--glow-x) var(--glow-y), rgba(31,127,115,0.18), transparent 38%)',
            ['--glow-x' as string]: glowX,
            ['--glow-y' as string]: glowY,
          }}
        />

        <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:44px_44px] opacity-45" />

        <div className="relative grid gap-4 rounded-[26px] border border-white/8 bg-[rgba(8,12,20,0.68)] p-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex items-start justify-between gap-5 rounded-[22px] border border-white/8 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02))] p-4"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/18 bg-[var(--color-accent)]/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/84">
                <Sparkles size={12} />
                Sistema vivo
              </div>
              <p className="max-w-xs text-lg font-medium text-white">
                Captación, seguimiento y operación sincronizados en un mismo flujo.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-white/82">
              <Radar size={26} />
            </div>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="rounded-[22px] border border-white/8 bg-white/5 p-4"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-white/38">
                <span>Flujo comercial</span>
                <span>Siempre activo</span>
              </div>
              <div className="mt-5 space-y-3">
                {[
                  'Consulta entra por WhatsApp',
                  'El sistema clasifica la oportunidad',
                  'Se dispara seguimiento automático',
                  'Escala a humano cuando conviene cerrar',
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.28 + index * 0.08 }}
                    className="flex items-center gap-3 rounded-2xl border border-white/8 bg-black/20 px-4 py-3 text-sm text-white/76"
                  >
                    <span className="inline-flex size-8 items-center justify-center rounded-full border border-[var(--color-accent)]/22 bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                      0{index + 1}
                    </span>
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="grid gap-4">
              {[
                {
                  icon: Bot,
                  title: 'Bots con criterio',
                  text: 'No responden por responder: filtran, recuerdan y empujan a la próxima acción.',
                },
                {
                  icon: ArrowDownRight,
                  title: 'Integraciones útiles',
                  text: 'WhatsApp, formularios, CRMs y procesos internos conectados con lógica de negocio.',
                },
              ].map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.22 + index * 0.1 }}
                  className="rounded-[22px] border border-white/8 bg-white/5 p-4"
                >
                  <div className="flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-[var(--color-accent)]">
                    <card.icon size={20} />
                  </div>
                  <h3 className="mt-6 text-base font-medium text-white">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/60">
                    {card.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-[720px] bg-[radial-gradient(circle_at_top,rgba(31,127,115,0.18),transparent_46%),radial-gradient(circle_at_75%_18%,rgba(255,165,75,0.14),transparent_28%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,16,0.1),rgba(5,8,16,0.82))]" />

      <div className="relative mx-auto grid min-h-[92svh] max-w-7xl items-center gap-16 pb-18 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:pb-24">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/70 backdrop-blur-xl"
          >
            <span className="inline-flex size-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_18px_var(--color-accent)]" />
            Automatización aplicada a negocios reales
          </motion.div>

          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="max-w-4xl text-balance text-5xl font-semibold tracking-[-0.08em] text-white sm:text-6xl lg:text-7xl"
            >
              Automatización real para ordenar procesos, acelerar respuestas y no perder oportunidades.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="max-w-2xl text-pretty text-lg leading-8 text-white/66 sm:text-xl"
            >
              En GalfreDev diseñamos bots, automatizaciones, integraciones y
              software a medida para responder más rápido, no perder clientes,
              ordenar procesos y hacer que la operación escale con criterio.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24 }}
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
            transition={{ duration: 0.7, delay: 0.32 }}
            className="grid gap-3 sm:grid-cols-3"
          >
            {heroMetrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-[24px] border border-white/8 bg-white/6 px-5 py-4 backdrop-blur-xl"
              >
                <p className="text-sm font-medium text-white">{metric.value}</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-white/38">
                  {metric.label}
                </p>
                <p className="mt-3 text-sm leading-6 text-white/58">
                  {metric.detail}
                </p>
              </div>
            ))}
          </motion.div>

        </div>

        <HeroVisual />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent,rgba(5,8,16,0.95))]" />
      <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 text-xs uppercase tracking-[0.28em] text-white/28 lg:block">
        <Link href="#soluciones">Scroll para ver el sistema</Link>
      </div>
    </section>
  )
}
