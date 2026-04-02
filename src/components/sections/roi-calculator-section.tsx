'use client'

import { InteractivePanel } from '@/components/motion/interactive-panel'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { calculateRoi } from '@/lib/roi'
import { formatCurrencyArs } from '@/lib/utils'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { useState } from 'react'

const defaultInputs = {
  repetitiveHoursPerWeek: 16,
  monthlyCostArs: 850000,
  averageTicketArs: 150000,
}

export function RoiCalculatorSection() {
  const [inputs, setInputs] = useState(defaultInputs)
  const results = calculateRoi(inputs)

  const whatsappMessage = [
    'Hola, usé la calculadora ROI de GalfreDev.',
    `Horas repetitivas por semana: ${inputs.repetitiveHoursPerWeek}`,
    `Costo mensual estimado de esa tarea o recurso: ${formatCurrencyArs(inputs.monthlyCostArs)}`,
    `Valor promedio por venta, turno o gestión crítica: ${formatCurrencyArs(inputs.averageTicketArs)}`,
    `Impacto mensual estimado: ${formatCurrencyArs(results.totalMonthlyImpactArs)}`,
    'Quiero revisar este escenario con ustedes.',
  ].join('\n')

  return (
    <section id="roi" className="px-4 py-22 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="Calculadora ROI"
            title="Una cuenta rápida para ver si hoy ya conviene automatizar."
            description="Pensada para negocios con tareas repetitivas, seguimiento manual o gestión operativa que hoy consume horas y costo real."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
          <Reveal className="grid gap-4">
            {[
              {
                key: 'repetitiveHoursPerWeek',
                label: 'Horas repetitivas por semana',
                helper: 'Tiempo dedicado a seguimiento, carga de datos, respuestas, coordinación o gestión manual.',
                min: 0,
                max: 60,
                step: 1,
              },
              {
                key: 'monthlyCostArs',
                label: 'Costo mensual de esa tarea o recurso (ARS)',
                helper: 'Puede ser el costo de una persona, del tiempo operativo o del área que hoy absorbe ese trabajo.',
                min: 100000,
                max: 4000000,
                step: 25000,
              },
              {
                key: 'averageTicketArs',
                label: 'Valor promedio por venta, turno o gestión importante (ARS)',
                helper: 'Sirve para estimar cuánto cuesta llegar tarde, perder seguimiento o no responder bien.',
                min: 20000,
                max: 1500000,
                step: 5000,
              },
            ].map((field) => (
              <InteractivePanel key={field.key} className="p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-medium text-white">{field.label}</p>
                  <span className="text-sm text-[var(--color-accent)]">
                    {field.key === 'repetitiveHoursPerWeek'
                      ? inputs.repetitiveHoursPerWeek
                      : formatCurrencyArs(
                          inputs[field.key as keyof typeof inputs] as number,
                        )}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-white/50">
                  {field.helper}
                </p>
                <input
                  type="range"
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  value={inputs[field.key as keyof typeof inputs]}
                  onChange={(event) =>
                    setInputs((current) => ({
                      ...current,
                      [field.key]: Number(event.target.value),
                    }))
                  }
                  className="mt-5 w-full accent-[var(--color-accent)]"
                />
              </InteractivePanel>
            ))}
          </Reveal>

          <Reveal delay={0.08} className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <InteractivePanel className="p-5">
                <p className="text-sm text-white/48">Tiempo recuperable al mes</p>
                <h3 className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-white">
                  {results.monthlyHoursRecovered.toFixed(0)}h
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/58">
                  Estimación de horas que podrían dejar de hacerse a mano.
                </p>
              </InteractivePanel>
              <InteractivePanel className="p-5">
                <p className="text-sm text-white/48">Impacto mensual estimado</p>
                <h3 className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-white">
                  {formatCurrencyArs(results.totalMonthlyImpactArs)}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/58">
                  Combina ahorro operativo y valor que hoy puede escaparse por demora o desorden.
                </p>
              </InteractivePanel>
            </div>

            <InteractivePanel className="p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[22px] border border-white/8 bg-black/16 p-4">
                  <p className="text-sm text-white/48">Ahorro operativo potencial</p>
                  <p className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-white">
                    {formatCurrencyArs(results.monthlyOperationalSavings)}
                  </p>
                </div>
                <div className="rounded-[22px] border border-white/8 bg-black/16 p-4">
                  <p className="text-sm text-white/48">Valor recuperable por seguimiento</p>
                  <p className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-white">
                    {formatCurrencyArs(results.monthlyRecoveredValue)}
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-[24px] border border-[var(--color-accent)]/16 bg-[var(--color-accent)]/8 p-5">
                <p className="text-sm leading-7 text-white/72">
                  Si este número tiene sentido para tu operación, probablemente ya haya una oportunidad clara para automatizar una tarea, un área o una parte del seguimiento comercial.
                </p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={buildWhatsAppUrl(whatsappMessage)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-[var(--color-accent-strong)]"
                  >
                    Revisar este escenario por WhatsApp
                  </a>
                  <span className="inline-flex items-center rounded-full border border-white/10 px-4 py-3 text-sm text-white/56">
                    Impacto anual potencial: {formatCurrencyArs(results.annualImpactArs)}
                  </span>
                </div>
              </div>
            </InteractivePanel>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
