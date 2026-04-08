'use client'

import { ROICalculator } from '@/components/roi/roi-calculator'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/ui/section-heading'

export function RoiCalculatorSection() {
  return (
    <section id="roi" className="px-4 py-22 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal variant="section">
          <SectionHeading
            eyebrow="Calculadora ROI"
            title="Descubrí cuánto podés ahorrar automatizando tareas repetitivas."
            description="Solo necesitás dos datos para ver el impacto mensual, anual y el tiempo que podrías liberar sin sumar más carga al equipo."
          />
        </Reveal>

        <ROICalculator />
      </div>
    </section>
  )
}
