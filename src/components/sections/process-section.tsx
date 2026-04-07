import { BorderGlowCard } from '@/components/motion/border-glow-card'
import { CenterFlow } from '@/components/motion/center-flow'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { processSteps } from '@/content/site-content'

export function ProcessSection() {
  return (
    <section id="proceso" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6 lg:space-y-7">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
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

              <p className="max-w-lg text-sm leading-7 text-white/48 sm:text-[15px]">
                La idea no es sumar complejidad por sumar. Primero se detecta la fricción real,
                después se arma la pieza justa y, por último, se ajusta sobre uso real para que el
                sistema acompañe el crecimiento.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="ml-auto w-full max-w-[690px] rounded-[32px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-2.5 shadow-[0_28px_90px_rgba(0,0,0,0.2)] sm:p-3 lg:p-4">
              <CenterFlow />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="rounded-[38px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.018))] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.16)] sm:p-5 lg:p-6">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-accent)]">
                  Tres pasos
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-white/56">
                  Diagnóstico claro, implementación enfocada y mejora continua para que la solución siga sirviendo sobre uso real.
                </p>
              </div>
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/34">
                Método GalfreDev
              </span>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {processSteps.map((step, index) => (
                <Reveal key={step.step} delay={index * 0.06}>
                  <BorderGlowCard className="h-full p-5 sm:p-6">
                    <div className="flex h-full flex-col">
                      <div className="mb-5 flex items-start justify-between gap-4">
                        <div className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-[18px] border border-[var(--color-accent)]/18 bg-[var(--color-accent)]/10 px-3 text-sm font-semibold text-[var(--color-accent)] shadow-[0_0_24px_rgba(31,127,115,0.08)]">
                          {step.step}
                        </div>
                        <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/30">
                          Paso
                        </span>
                      </div>

                      <div className="flex h-full flex-col">
                        <h3 className="max-w-[14ch] text-[28px] font-medium leading-[1.02] tracking-[-0.06em] text-white">
                          {step.title}
                        </h3>
                        <p className="mt-4 text-sm leading-7 text-white/60">
                          {step.description}
                        </p>

                        <div className="mt-auto pt-5">
                          <div className="h-px w-full bg-gradient-to-r from-[var(--color-accent)]/30 via-white/10 to-transparent" />
                          <p className="mt-4 rounded-[22px] border border-white/8 bg-black/18 px-4 py-3.5 text-sm leading-6 text-white/76">
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
