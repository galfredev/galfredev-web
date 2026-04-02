import { InteractivePanel } from '@/components/motion/interactive-panel'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { processSteps } from '@/content/site-content'

export function ProcessSection() {
  return (
    <section id="proceso" className="px-4 py-22 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Cómo trabajamos"
            title="Un proceso corto, claro y aterrizado."
            description="Entender el problema, implementar lo útil y mejorar sobre uso real."
          />
        </Reveal>

        <div className="grid gap-4">
          {processSteps.map((step, index) => (
            <Reveal key={step.step} delay={index * 0.05}>
              <InteractivePanel className="p-6">
                <div className="grid gap-5 md:grid-cols-[84px_1fr] md:items-start">
                  <div className="flex flex-col items-start gap-3 md:pt-1">
                    <span className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-2xl border border-[var(--color-accent)]/18 bg-[var(--color-accent)]/10 px-3 text-sm font-semibold text-[var(--color-accent)]">
                      {step.step}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/34">
                      Paso
                    </span>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-medium tracking-[-0.05em] text-white">
                      {step.title}
                    </h3>
                    <p className="max-w-xl text-sm leading-7 text-white/62">
                      {step.description}
                    </p>
                    <p className="rounded-2xl border border-white/8 bg-black/18 px-4 py-3 text-sm text-white/78">
                      {step.outcome}
                    </p>
                  </div>
                </div>
              </InteractivePanel>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
