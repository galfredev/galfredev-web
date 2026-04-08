import { BorderGlowCard } from '@/components/motion/border-glow-card'
import { CenterFlow } from '@/components/motion/center-flow'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { processSteps } from '@/content/site-content'

export function ProcessSection() {
  return (
    <section id="proceso" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6 lg:space-y-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
          <Reveal className="lg:sticky lg:top-28 lg:self-start" variant="section">
            <div className="max-w-xl space-y-7">
              <SectionHeading
                eyebrow="Cómo trabajamos"
                title="Un proceso corto, claro y aterrizado."
                description="Entender el problema, implementar lo útil y mejorar sobre uso real."
              />

              <div className="flex flex-wrap gap-2.5">
                {['Diagnóstico', 'Implementación', 'Integración', 'Seguimiento'].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/54"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <p className="max-w-lg text-sm leading-7 text-white/50 sm:text-[15px]">
                La idea no es sumar complejidad por sumar. Primero se detecta la fricción real,
                después se arma la pieza justa y, por último, se ajusta sobre uso real para que
                el sistema acompañe el crecimiento.
              </p>
            </div>
          </Reveal>

          <Reveal variant="surface">
            <div className="surface-panel ml-auto w-full max-w-[690px] rounded-[2rem] p-2.5 sm:p-3 lg:p-4">
              <CenterFlow />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.08} variant="surface">
          <div className="surface-panel rounded-[2.2rem] p-4 sm:p-5 lg:p-6">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="section-kicker">Tres pasos</p>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/56">
                  Diagnóstico claro, implementación enfocada y mejora continua para que la solución siga sirviendo sobre uso real.
                </p>
              </div>
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/34">
                Método GalfreDev
              </span>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {processSteps.map((step, index) => (
                <Reveal key={step.step} delay={index * 0.06} variant="surface">
                  <BorderGlowCard className="h-full p-5 sm:p-6">
                    <div className="flex h-full flex-col">
                      <div className="mb-5 flex items-start justify-between gap-4">
                        <div className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-[1.15rem] border border-[var(--color-accent)]/18 bg-[var(--color-accent)]/10 px-3 text-sm font-semibold text-[var(--color-accent)] shadow-[0_0_24px_rgba(31,127,115,0.08)]">
                          {step.step}
                        </div>
                        <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/30">
                          Paso
                        </span>
                      </div>

                      <div className="flex h-full flex-col">
                        <h3 className="max-w-[14ch] text-[1.8rem] font-medium leading-[1.02] tracking-[-0.06em] text-white">
                          {step.title}
                        </h3>
                        <p className="mt-4 text-sm leading-7 text-white/60">
                          {step.description}
                        </p>

                        <div className="mt-auto pt-5">
                          <div className="ambient-divider" />
                          <p className="mt-4 rounded-[1.4rem] border border-white/8 bg-black/18 px-4 py-3.5 text-sm leading-6 text-white/76">
                            {step.outcome}
                          </p>
                        </div>
                      </div>
                    </div>
                  </BorderGlowCard>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
