import { BorderGlowCard } from '@/components/motion/border-glow-card'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { valuePillars } from '@/content/site-content'

export function ValueSection() {
  const [primaryPillar, ...secondaryPillars] = valuePillars

  return (
    <section id="propuesta" className="px-4 py-18 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-end lg:gap-14">
          <Reveal variant="section">
            <SectionHeading
              eyebrow="Propuesta de valor"
              title="La idea es simple: menos fricción, más sistema."
              description="No vendemos complejidad. Diseñamos piezas útiles para que el negocio responda mejor, opere con más orden y pueda escalar sin improvisar."
            />
          </Reveal>

          <Reveal delay={0.06} variant="surface">
            <div className="rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-6 backdrop-blur-sm sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--color-accent)]">
                Qué cambia en la práctica
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {[
                  'Menos demora para responder.',
                  'Menos desorden operativo.',
                  'Más criterio para crecer.',
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.5rem] border border-white/8 bg-black/18 px-4 py-4 text-sm leading-7 text-white/72"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/54">
                El foco está en resolver fricciones concretas del negocio con automatización,
                integración y software a medida cuando realmente hace falta.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <Reveal variant="surface">
            <BorderGlowCard className="h-full p-6 sm:p-7 lg:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex rounded-full border border-[var(--color-accent)]/18 bg-[var(--color-accent)]/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
                  {primaryPillar.icon ?? '01'}
                </div>
                <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-white/34">
                  Pilar principal
                </span>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
                <div>
                  <h3 className="max-w-[12ch] text-[2.2rem] font-semibold leading-[0.96] tracking-[-0.06em] text-white sm:text-[2.7rem]">
                    {primaryPillar.title}
                  </h3>
                  <p className="mt-4 max-w-md text-base leading-8 text-white/62">
                    {primaryPillar.summary}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {primaryPillar.points.map((point) => (
                    <div
                      key={point}
                      className="rounded-[1.5rem] border border-white/8 bg-black/18 px-4 py-4 text-sm leading-7 text-white/74"
                    >
                      <div className="mb-3 size-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_12px_rgba(61,221,196,0.22)]" />
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </BorderGlowCard>
          </Reveal>

          <div className="grid gap-4">
            {secondaryPillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 0.06 + 0.08} variant="surface">
                <div className="rounded-[1.8rem] border border-white/8 bg-white/[0.03] px-5 py-5 backdrop-blur-sm transition duration-300 hover:border-white/14 hover:bg-white/[0.04] sm:px-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="inline-flex rounded-full border border-white/10 bg-black/18 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/40">
                        {pillar.icon ?? `0${index + 2}`}
                      </div>
                      <h3 className="mt-4 text-[1.55rem] font-medium leading-[1.04] tracking-[-0.05em] text-white">
                        {pillar.title}
                      </h3>
                    </div>
                    <span className="text-[11px] uppercase tracking-[0.24em] text-white/28">
                      Impacto
                    </span>
                  </div>

                  <p className="mt-4 max-w-lg text-sm leading-7 text-white/60">
                    {pillar.summary}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {pillar.points.map((point) => (
                      <span
                        key={point}
                        className="rounded-full border border-white/10 bg-black/16 px-3 py-2 text-sm text-white/72"
                      >
                        {point}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
