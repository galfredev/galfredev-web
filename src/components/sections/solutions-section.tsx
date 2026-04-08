import { InteractivePanel } from '@/components/motion/interactive-panel'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { solutions } from '@/content/site-content'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { ArrowRight } from 'lucide-react'

export function SolutionsSection() {
  return (
    <section id="soluciones" className="px-4 py-22 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal variant="section">
          <SectionHeading
            eyebrow="Soluciones claras"
            title="Cuatro frentes donde GalfreDev puede mover de verdad la aguja."
            description="Menos catálogo, más claridad. Cada bloque apunta a un problema frecuente y a un resultado fácil de entender."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {solutions.map((solution, index) => (
            <Reveal key={solution.title} delay={index * 0.05} variant="surface">
              <InteractivePanel className="h-full p-6 sm:p-7">
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

                <h3 className="mt-6 max-w-[16ch] text-[1.9rem] font-medium leading-[1.02] tracking-[-0.05em] text-white">
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
