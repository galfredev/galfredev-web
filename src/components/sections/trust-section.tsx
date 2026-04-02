import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { trustSignals } from '@/content/site-content'

export function TrustSection() {
  return (
    <section id="confianza" className="px-4 py-22 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="Confianza"
            title="Señales de seriedad pensadas para una marca que quiere verse premium y operar con prolijidad."
            description="Cuando todavía no hay un océano de testimonios públicos, la confianza se construye mostrando criterio, método, stack real, formación verificable y una forma profesional de trabajar datos y contacto."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {trustSignals.map((signal, index) => (
            <Reveal key={signal.title} delay={index * 0.05}>
              <article className="h-full rounded-[28px] border border-white/8 bg-white/5 p-6">
                <p className="text-sm font-medium text-white">{signal.title}</p>
                <p className="mt-4 text-sm leading-7 text-white/62">
                  {signal.summary}
                </p>
                <p className="mt-5 rounded-[20px] border border-white/8 bg-black/18 px-4 py-3 text-sm text-white/70">
                  {signal.detail}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
