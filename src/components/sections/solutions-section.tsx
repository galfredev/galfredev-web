'use client'

import { InteractivePanel } from '@/components/motion/interactive-panel'
import { Reveal } from '@/components/motion/reveal'
import { StaggerItem, StaggerReveal } from '@/components/motion/stagger-reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { solutions } from '@/content/site-content'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function SolutionsSection() {
  return (
    <section id="soluciones" className="px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal variant="section">
          <SectionHeading
            eyebrow="Servicios"
            title="Lo que hacemos, en concreto."
            description="Sin catálogo armado. Cada servicio nació de un problema real: responder más rápido, no perder un lead, ordenar la agenda o construir una base que dure."
          />
        </Reveal>

        <StaggerReveal
          className="mt-12 grid gap-5 lg:grid-cols-2"
          delay={0.12}
          stagger={0.1}
        >
          {solutions.map((solution, index) => (
            <StaggerItem key={solution.title}>
              <InteractivePanel className="h-full p-5 sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    {solution.label ? (
                      <span className="rounded-full border border-[var(--color-accent)]/18 bg-[var(--color-accent)]/8 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
                        {solution.label}
                      </span>
                    ) : null}
                    <span className="rounded-full border border-white/10 bg-black/18 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/42">
                      {solution.audience}
                    </span>
                  </div>
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="font-serif-display text-[2.8rem] leading-none tracking-[-0.04em] text-white/10 select-none sm:text-[3.4rem]"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </motion.span>
                </div>

                <h3 className="mt-5 max-w-[18ch] text-[1.45rem] font-medium leading-[1.06] tracking-[-0.05em] text-white sm:mt-6 sm:text-[1.85rem]">
                  {solution.title}
                </h3>

                <div className="mt-5 grid gap-4 text-sm leading-7 text-white/64">
                  <p>{solution.pain}</p>
                  <p className="rounded-[1.5rem] border border-white/8 bg-black/16 px-4 py-3 text-white/78">
                    {solution.outcome}
                  </p>
                </div>

                <div className="mt-5 ambient-divider" />

                <ul className="mt-5 flex flex-wrap gap-2 text-sm text-white/74">
                  {solution.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="rounded-full border border-white/8 bg-black/16 px-4 py-2"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>

                <a
                  href={buildWhatsAppUrl(solution.message)}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-7 inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/24 bg-[var(--color-accent)]/10 px-5 py-3 text-sm text-white transition duration-300 hover:border-[var(--color-accent)]/42 hover:bg-[var(--color-accent)]/16 active:scale-[0.985]"
                >
                  {solution.ctaLabel}
                  <ArrowRight
                    size={16}
                    className="transition duration-300 group-hover:translate-x-0.5"
                  />
                </a>
              </InteractivePanel>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  )
}
