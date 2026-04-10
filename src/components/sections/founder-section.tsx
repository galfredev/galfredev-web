'use client'

import { BlurHighlight } from '@/components/motion/blur-highlight'
import { BorderGlowCard } from '@/components/motion/border-glow-card'
import { InteractivePanel } from '@/components/motion/interactive-panel'
import { Reveal } from '@/components/motion/reveal'
import { certifications, founderHighlights, siteCopy, stackGroups } from '@/content/site-content'
import { SectionHeading } from '@/components/ui/section-heading'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, Code2, Database, Sparkles, Workflow } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

const stackIcons = [Code2, Database, Workflow]
const focusIcons = [Bot, Sparkles, Workflow]

function CertificationShowcase() {
  const [activeId, setActiveId] = useState(certifications[0]?.id ?? '')
  const [dialogId, setDialogId] = useState<string | null>(null)

  const activeCertification =
    certifications.find((item) => item.id === activeId) ?? certifications[0]
  const dialogCertification = certifications.find((item) => item.id === dialogId)

  return (
    <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
      <div className="space-y-3 lg:col-span-1">
        {certifications.map((certification) => (
          <motion.button
            key={certification.id}
            type="button"
            whileHover={{ x: 4 }}
            onMouseEnter={() => setActiveId(certification.id)}
            onFocus={() => setActiveId(certification.id)}
            onClick={() => setDialogId(certification.id)}
            className={[
              'w-full rounded-[1.45rem] border p-4 text-left transition duration-300',
              activeId === certification.id
                ? 'border-[var(--color-accent)]/24 bg-[var(--color-accent)]/8'
                : 'border-white/8 bg-white/[0.04] hover:border-white/16 hover:bg-white/[0.06]',
            ].join(' ')}
          >
            <p className="text-sm font-medium text-white">{certification.title}</p>
            <p className="mt-2 text-sm text-white/48">
              {certification.issuer} · {certification.date}
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.24em] text-[var(--color-accent)]">
              Ver certificado
            </p>
          </motion.button>
        ))}
      </div>

      {activeCertification ? (
        <InteractivePanel className="hidden p-4 lg:block">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-white">{activeCertification.title}</p>
              <p className="mt-1 text-sm text-white/48">
                {activeCertification.issuer} · {activeCertification.date}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setDialogId(activeCertification.id)}
              className="rounded-full border border-white/12 px-3 py-2 text-xs uppercase tracking-[0.22em] text-white/66"
            >
              Ampliar
            </button>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem] border border-white/8">
            <Image
              src={activeCertification.image}
              alt={`Certificado ${activeCertification.title}`}
              fill
              className="object-cover"
            />
          </div>
        </InteractivePanel>
      ) : null}

      <AnimatePresence>
        {dialogCertification ? (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDialogId(null)}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/82 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="page-panel relative w-full max-w-5xl overflow-hidden rounded-[1.8rem] p-4"
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="text-left">
                  <p className="text-lg font-medium text-white">{dialogCertification.title}</p>
                  <p className="mt-1 text-sm text-white/48">
                    {dialogCertification.issuer} · {dialogCertification.date}
                  </p>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-2 text-xs uppercase tracking-[0.22em] text-white/54">
                  Tocá afuera para cerrar
                </span>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.35rem] border border-white/8">
                <Image
                  src={dialogCertification.image}
                  alt={`Certificado ${dialogCertification.title}`}
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          </motion.button>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export function FounderSection() {
  return (
    <section id="fundador" className="px-4 py-22 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal variant="section">
          <SectionHeading
            eyebrow="Valentino Galfre"
            title="Ingeniería, automatización e implementación real para negocios que necesitan avanzar en serio."
            description="Detrás de cada solución de GalfreDev hay ingeniería real, criterio técnico y foco en resultados concretos."
          />
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="space-y-6" variant="surface">
            <BorderGlowCard className="p-4">
              <div className="absolute inset-x-8 top-0 h-32 rounded-full bg-[radial-gradient(circle,rgba(61,221,196,0.22),transparent_62%)] blur-3xl" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.7rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] sm:aspect-[4/5]">
                <Image
                  src={siteCopy.founderImage}
                  alt="Valentino Galfre"
                  fill
                  className="object-cover"
                />

                {[
                  { text: 'Next.js + TS', className: 'left-4 top-4' },
                  { text: 'Supabase', className: 'right-4 top-10' },
                  { text: 'Automatización', className: 'left-5 bottom-18' },
                ].map((badge, index) => (
                  <motion.div
                    key={badge.text}
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 3 + index,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: 'easeInOut',
                    }}
                    className={`absolute hidden lg:block ${badge.className} rounded-full border border-white/12 bg-[rgba(8,12,20,0.72)] px-3 py-2 text-xs uppercase tracking-[0.18em] text-white/78 backdrop-blur-xl`}
                  >
                    {badge.text}
                  </motion.div>
                ))}
              </div>
            </BorderGlowCard>

            <div className="flex flex-wrap gap-2 lg:hidden">
              {['Next.js + TS', 'Supabase', 'Automatización'].map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-2 text-xs uppercase tracking-[0.18em] text-white/72"
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {['UTN FRC', 'Backend', 'IA aplicada'].map((item, index) => {
                const Icon = focusIcons[index]

                return (
                  <InteractivePanel key={item} className="p-4">
                    <div className="flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-[var(--color-accent)]">
                      <Icon size={18} />
                    </div>
                    <p className="mt-4 text-sm font-medium text-white">{item}</p>
                  </InteractivePanel>
                )
              })}
            </div>
          </Reveal>

          <div className="space-y-6">
            <Reveal variant="surface">
              <InteractivePanel className="p-6">
                <p className="text-lg leading-8 text-white/72">
                  <BlurHighlight
                    text="No solo escribo código: diseño sistemas que optimizan procesos, reducen costos operativos y le devuelven foco al negocio."
                    highlightWords={['sistemas', 'procesos', 'costos', 'negocio']}
                  />
                </p>
                <div className="mt-6 grid gap-3">
                  {founderHighlights.map((item) => (
                    <motion.div
                      key={item}
                      whileHover={{ x: 4 }}
                      className="rounded-[1.35rem] border border-white/8 bg-black/18 px-4 py-3 text-sm text-white/74"
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </InteractivePanel>
            </Reveal>

            <Reveal delay={0.05} className="grid gap-4 sm:grid-cols-3" variant="surface">
              {stackGroups.map((group, index) => {
                const Icon = stackIcons[index] ?? Code2

                return (
                  <InteractivePanel key={group.label} className="p-5">
                    <div className="flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-[var(--color-accent)]">
                      <Icon size={18} />
                    </div>
                    <p className="mt-4 text-sm font-medium text-white">{group.label}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 bg-black/18 px-3 py-1.5 text-xs text-white/66"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </InteractivePanel>
                )
              })}
            </Reveal>

            <Reveal delay={0.08} variant="surface">
              <InteractivePanel className="p-6">
                <div className="mb-6">
                  <p className="section-kicker">Certificaciones</p>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-white/58">
                    Formación verificable respaldada por instituciones reconocidas en la industria.
                  </p>
                </div>
                <CertificationShowcase />
              </InteractivePanel>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
