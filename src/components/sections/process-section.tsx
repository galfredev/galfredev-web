'use client'

import { BorderGlowCard } from '@/components/motion/border-glow-card'
import { Reveal } from '@/components/motion/reveal'
import { StaggerItem, StaggerReveal } from '@/components/motion/stagger-reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { processSteps } from '@/content/site-content'
import { motion } from 'framer-motion'

export function ProcessSection() {
  return (
    <section id="proceso" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8 lg:space-y-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:gap-14">
          <Reveal variant="section">
            <div className="max-w-xl space-y-6">
              <SectionHeading
                eyebrow="Cómo trabajamos"
                title="Un proceso corto, claro y aterrizado."
                description="Primero entendemos la fricción real, después implementamos la pieza justa y finalmente ajustamos con uso real."
              />

              <div className="flex flex-wrap gap-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white/46">
                {['Diagnóstico', 'Implementación', 'Resultado útil'].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/54"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <p className="max-w-lg text-sm leading-7 text-white/50 sm:text-[15px]">
                La idea no es sumar complejidad por sumar. Primero se detecta la{' '}
                <span className="font-medium text-white">fricción real</span>, después se arma la{' '}
                <span className="font-medium text-white">pieza justa</span> y, por último, se
                ajusta sobre <span className="font-medium text-white">uso real</span> para que el
                sistema acompañe el crecimiento.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.06} variant="surface" className="hidden lg:block">
            <div className="relative overflow-hidden rounded-[2.1rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-8 backdrop-blur-sm sm:p-10">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(31,127,115,0.18),transparent_62%)]" />

              <div className="relative mx-auto aspect-square w-full max-w-[380px]">
                {[
                  { scale: 1, delay: 0 },
                  { scale: 0.78, delay: 0.6 },
                  { scale: 0.56, delay: 1.2 },
                ].map((ring, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border border-[var(--color-accent)]/16"
                    initial={{ scale: ring.scale, opacity: 0.22 }}
                    animate={{ opacity: [0.22, 0.55, 0.22] }}
                    transition={{ duration: 3.8, delay: ring.delay, repeat: Infinity, ease: 'easeInOut' }}
                  />
                ))}

                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent)] shadow-[0_0_18px_rgba(31,127,115,0.7)]" />
                </motion.div>

                <motion.div
                  className="absolute inset-[11%]"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 17, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-warm)]/85 shadow-[0_0_14px_rgba(255,180,106,0.55)]" />
                </motion.div>

                <motion.div
                  className="absolute inset-[22%]"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent-strong)] shadow-[0_0_10px_rgba(42,145,132,0.65)]" />
                </motion.div>

                <motion.div
                  className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent)]/18 backdrop-blur-md"
                  animate={{ scale: [1, 1.07, 1] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="absolute inset-2 rounded-full border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/30 shadow-[0_0_42px_rgba(31,127,115,0.5)]" />
                  <div className="absolute inset-[40%] rounded-full bg-white/85 shadow-[0_0_14px_rgba(255,255,255,0.55)]" />
                </motion.div>
              </div>

              <div className="relative mt-9 text-center">
                <p className="text-[13px] font-semibold uppercase tracking-[0.28em] text-[var(--color-accent)]">
                  Sistema en operación
                </p>
                <p className="mt-4 text-base leading-8 text-white/72 sm:text-[17px]">
                  Cuando todo encaja, no se ve el método.{' '}
                  <span className="text-white">Se ve el resultado.</span>
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <StaggerReveal className="grid gap-4 lg:grid-cols-3" delay={0.1} stagger={0.1}>
          {processSteps.map((step, index) => (
            <StaggerItem key={step.step} className="h-full">
              <BorderGlowCard className="relative h-full p-5 sm:p-6">
                {index < processSteps.length - 1 ? (
                  <div className="pointer-events-none absolute right-[-0.55rem] top-[3.1rem] hidden h-px w-6 bg-gradient-to-r from-[var(--color-accent)]/45 to-transparent lg:block" />
                ) : null}

                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between gap-4">
                    <div className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-[1.15rem] border border-[var(--color-accent)]/18 bg-[var(--color-accent)]/10 px-3 text-sm font-semibold text-[var(--color-accent)] shadow-[0_0_24px_rgba(31,127,115,0.08)]">
                      {step.step}
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">
                      Paso
                    </span>
                  </div>

                  <h3 className="mt-5 max-w-[13ch] text-[1.8rem] font-medium leading-[1.02] tracking-[-0.06em] text-white">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/60">{step.description}</p>

                  <div className="mt-auto pt-5">
                    <div className="ambient-divider" />
                    <p className="mt-4 text-sm leading-7 text-white/78">{step.outcome}</p>
                  </div>
                </div>
              </BorderGlowCard>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  )
}
