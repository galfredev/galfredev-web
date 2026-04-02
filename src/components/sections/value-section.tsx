import { InteractivePanel } from '@/components/motion/interactive-panel'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { valuePillars } from '@/content/site-content'

export function ValueSection() {
  return (
    <section id="propuesta" className="px-4 py-18 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="Propuesta de valor"
            title="La idea es simple: menos fricción, más sistema."
            description="Automatización, integración y software a medida aplicados a problemas concretos del negocio."
          />
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {valuePillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.06}>
              <InteractivePanel className="h-full p-6">
                <div className="inline-flex rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/40">
                  {pillar.icon ?? `0${index + 1}`}
                </div>
                <h3 className="mt-5 text-xl font-medium tracking-[-0.05em] text-white">
                  {pillar.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-7 text-white/60">
                  {pillar.summary}
                </p>
                <ul className="mt-5 space-y-2 text-sm text-white/72">
                  {pillar.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-2 size-1.5 rounded-full bg-[var(--color-accent)]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </InteractivePanel>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
