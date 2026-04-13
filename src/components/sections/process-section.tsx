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
            <div className="rounded-[2.1rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-6 backdrop-blur-sm sm:p-7">
              <div className="rounded-[1.8rem] border border-white/8 bg-black/18 px-5 py-5 sm:px-6">
                <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_2.8rem_minmax(0,1fr)_2.8rem_minmax(0,1fr)] md:items-center md:gap-0">
                  {processSteps.map((step, index) => (
                    <div key={step.step} className="contents">
                      <div className="min-w-0 rounded-[1.3rem] border border-white/8 bg-white/[0.02] px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[1rem] border border-[var(--color-accent)]/18 bg-[var(--color-accent)]/10 px-3 text-sm font-semibold text-[var(--color-accent)]">
                            {step.step}
                          </div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
                            Paso
                          </p>
                        </div>

                        <p className="mt-3 max-w-[12ch] text-[0.98rem] font-medium leading-[1.12] text-white">
                          {step.title}
                        </p>
                      </div>

                      {index < processSteps.length - 1 ? (
                        <div className="hidden items-center justify-center md:flex">
                          <div className="relative flex h-5 w-full items-center justify-center overflow-hidden">
                            <motion.div
                              className="h-px w-full bg-gradient-to-r from-[var(--color-accent)]/10 via-[var(--color-accent)]/26 to-[var(--color-accent)]/10"
                              initial={{ scaleX: 0 }}
                              whileInView={{ scaleX: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.9, delay: 0.3 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                              style={{ originX: 0 }}
                            />
                            <motion.div
                              className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent)]/78 shadow-[0_0_12px_rgba(24,189,159,0.34)]"
                              initial={{ opacity: 0, scale: 0 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: 0.7 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                            />
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 rounded-[1.6rem] border border-white/8 bg-black/18 px-5 py-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
                  Método GalfreDev
                </p>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-white/58">
                  El objetivo es llegar rápido a una solución que sirva en operación real, no a
                  un proceso largo que se vea bien en una presentación y después no se use.
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
