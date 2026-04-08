'use client'

import { calculateRoi } from '@/lib/roi'
import { formatCurrencyArs } from '@/lib/utils'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import { ArrowRight, Coins, TrendingUp, Wallet } from 'lucide-react'
import { useEffect, useId, useMemo, useState, type ComponentType } from 'react'

const DEFAULT_SALARY_ARS = 850000
const DEFAULT_HOURS = 16

function formatHours(value: number) {
  return new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: value % 1 === 0 ? 0 : 1,
    maximumFractionDigits: 1,
  }).format(value)
}

function formatCompactNumber(value: number) {
  return new Intl.NumberFormat('es-AR', {
    maximumFractionDigits: value < 10 ? 1 : 0,
  }).format(value)
}

function parseCurrencyInput(value: string) {
  const digits = value.replace(/\D/g, '')
  return digits ? Number(digits) : 0
}

function formatCurrencyInput(value: number) {
  return formatCurrencyArs(Math.max(0, value))
}

function AnimatedMetric({
  value,
  formatter,
}: {
  value: number
  formatter: (value: number) => string
}) {
  const reducedMotion = useReducedMotion()
  const motionValue = useMotionValue(value)
  const spring = useSpring(motionValue, {
    stiffness: 110,
    damping: 22,
    mass: 0.8,
  })
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    motionValue.set(value)
  }, [motionValue, value])

  useMotionValueEvent(spring, 'change', (latest) => {
    setDisplayValue(latest)
  })

  if (reducedMotion) {
    return <>{formatter(value)}</>
  }

  return <>{formatter(displayValue)}</>
}

function RoiProjectionChart({
  monthlySavingsArs,
}: {
  monthlySavingsArs: number
}) {
  const reducedMotion = useReducedMotion()
  const data = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) => ({
        month: index + 1,
        value: monthlySavingsArs * (index + 1),
      })),
    [monthlySavingsArs],
  )

  const width = 760
  const height = 260
  const paddingX = 26
  const paddingTop = 20
  const paddingBottom = 32
  const chartWidth = width - paddingX * 2
  const chartHeight = height - paddingTop - paddingBottom
  const maxValue = Math.max(...data.map((point) => point.value), 1)

  const points = data.map((point, index) => {
    const x = paddingX + (chartWidth / (data.length - 1)) * index
    const y =
      paddingTop + chartHeight - (point.value / maxValue) * chartHeight

    return { ...point, x, y }
  })

  const linePath = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ')

  const areaPath = `${linePath} L ${points.at(-1)?.x ?? width - paddingX} ${
    height - paddingBottom
  } L ${points[0]?.x ?? paddingX} ${height - paddingBottom} Z`

  return (
    <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-white">Proyección de ahorro a 12 meses</p>
          <p className="mt-1 text-sm text-white/50">
            Se acumula automáticamente mes a mes según el ahorro estimado actual.
          </p>
        </div>
        <div className="hidden shrink-0 whitespace-nowrap rounded-full border border-emerald-400/16 bg-emerald-400/8 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-emerald-300 sm:inline-flex">
          ROI visible
        </div>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-[220px] w-full"
        role="img"
        aria-label="Gráfico de ahorro acumulado de 12 meses"
      >
        <defs>
          <linearGradient id="roi-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(16,185,129,0.58)" />
            <stop offset="100%" stopColor="rgba(45,212,191,1)" />
          </linearGradient>
          <linearGradient id="roi-fill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(16,185,129,0.28)" />
            <stop offset="100%" stopColor="rgba(16,185,129,0)" />
          </linearGradient>
        </defs>

        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const y = paddingTop + chartHeight - chartHeight * ratio

          return (
            <line
              key={ratio}
              x1={paddingX}
              x2={width - paddingX}
              y1={y}
              y2={y}
              stroke="rgba(255,255,255,0.08)"
              strokeDasharray="6 8"
            />
          )
        })}

        <motion.path
          d={areaPath}
          fill="url(#roi-fill)"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d={linePath}
          fill="none"
          stroke="url(#roi-line)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reducedMotion ? false : { pathLength: 0, opacity: 0.4 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: reducedMotion ? 0.2 : 1.1, ease: [0.22, 1, 0.36, 1] }}
        />

        {points.map((point, index) => (
          <motion.g
            key={point.month}
            initial={reducedMotion ? false : { opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: reducedMotion ? 0 : 0.28 + index * 0.04, duration: 0.24 }}
          >
            <circle
              cx={point.x}
              cy={point.y}
              r="5"
              fill="#0a0a0f"
              stroke="rgba(45,212,191,0.9)"
              strokeWidth="3"
            />
          </motion.g>
        ))}

        {points.map((point) => (
          <text
            key={`label-${point.month}`}
            x={point.x}
            y={height - 8}
            textAnchor="middle"
            className="fill-white/45 text-[11px]"
          >
            {point.month}
          </text>
        ))}
      </svg>
    </div>
  )
}

type ResultCardProps = {
  label: string
  value: number
  formatter: (value: number) => string
  delay: number
  icon: ComponentType<{ size?: number; className?: string }>
}

function ResultCard({ label, value, formatter, delay, icon: Icon }: ResultCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.56, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex min-h-[12.5rem] h-full flex-col rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-sm transition duration-300 hover:border-emerald-400/18 hover:bg-white/[0.06]"
    >
      <div className="flex min-h-[4.25rem] items-start justify-between gap-3">
        <p className="max-w-[8ch] text-sm uppercase leading-[1.35] tracking-[0.22em] text-emerald-400">
          {label}
        </p>
        <div className="rounded-xl border border-white/10 bg-black/18 p-2 text-emerald-300">
          <Icon size={16} />
        </div>
      </div>
      <p className="mt-auto overflow-hidden break-words pt-5 text-[clamp(1.85rem,2.3vw,3.05rem)] font-bold leading-[0.92] tracking-[-0.07em] text-white">
        <AnimatedMetric value={value} formatter={formatter} />
      </p>
    </motion.div>
  )
}

export function ROICalculator() {
  const salaryInputId = useId()
  const hoursInputId = useId()
  const [monthlySalaryArs, setMonthlySalaryArs] = useState(DEFAULT_SALARY_ARS)
  const [repetitiveHoursPerWeek, setRepetitiveHoursPerWeek] = useState(DEFAULT_HOURS)

  const results = calculateRoi({
    monthlySalaryArs,
    repetitiveHoursPerWeek,
  })

  const salaryInputValue = formatCurrencyInput(monthlySalaryArs)
  const whatsappHref = buildWhatsAppUrl(
    [
      'Hola, usé la calculadora ROI de GalfreDev.',
      `Sueldo mensual del recurso: ${formatCurrencyArs(monthlySalaryArs)}`,
      `Horas semanales en tareas repetitivas: ${formatHours(repetitiveHoursPerWeek)} hs`,
      `Ahorro mensual estimado: ${formatCurrencyArs(results.monthlySavingsArs)}`,
      `Ahorro anual proyectado: ${formatCurrencyArs(results.annualSavingsArs)}`,
      'Quiero automatizar estas tareas.',
    ].join('\n'),
  )

  return (
    <div className="mt-12 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm sm:p-7 lg:p-8">
      <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <div className="space-y-5">
          <div className="rounded-[1.7rem] border border-white/10 bg-black/16 p-5 sm:p-6">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor={salaryInputId}
                  className="flex items-center gap-2 text-sm font-medium text-white"
                >
                  <Wallet size={16} className="text-emerald-400" />
                  Sueldo mensual del recurso
                </label>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  Ingresá el costo mensual del empleado o recurso que hoy hace esas tareas.
                </p>
                <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                  <input
                    id={salaryInputId}
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    value={salaryInputValue}
                    onChange={(event) => {
                      setMonthlySalaryArs(parseCurrencyInput(event.target.value))
                    }}
                    className="w-full bg-transparent text-2xl font-semibold tracking-[-0.04em] text-white outline-none placeholder:text-white/24"
                    aria-describedby={`${salaryInputId}-help`}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between gap-3">
                  <label
                    htmlFor={hoursInputId}
                    className="flex items-center gap-2 text-sm font-medium text-white"
                  >
                    <Coins size={16} className="text-emerald-400" />
                    Horas semanales en tareas repetitivas
                  </label>
                  <span className="rounded-full border border-emerald-400/16 bg-emerald-400/8 px-3 py-1 text-sm font-medium text-emerald-300">
                    {formatHours(repetitiveHoursPerWeek)} hs
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  Ajustá cuántas horas por semana se consumen en tareas que podríamos automatizar.
                </p>
                <div className="mt-5">
                  <input
                    id={hoursInputId}
                    type="range"
                    min={1}
                    max={40}
                    step={1}
                    value={repetitiveHoursPerWeek}
                    onChange={(event) => {
                      setRepetitiveHoursPerWeek(Number(event.target.value))
                    }}
                    className="roi-slider h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10"
                    aria-describedby={`${hoursInputId}-help`}
                  />
                  <div className="mt-2 flex justify-between text-xs text-white/34">
                    <span>1 hs</span>
                    <span>40 hs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[1.4rem] border border-emerald-400/16 bg-emerald-400/8 px-4 py-4 text-sm text-white/74">
            Hoy esas horas repetitivas te están costando aproximadamente{' '}
            <span className="font-semibold text-white">
              <AnimatedMetric
                value={results.monthlyRepetitiveCostArs}
                formatter={formatCurrencyArs}
              />
            </span>{' '}
            por mes.
          </div>
        </div>

        <div className="space-y-4">
          <RoiProjectionChart monthlySavingsArs={results.monthlySavingsArs} />

          <motion.a
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="group block rounded-[1.6rem] border border-emerald-400/18 bg-[linear-gradient(180deg,rgba(16,185,129,0.12),rgba(16,185,129,0.06))] p-5 text-white transition duration-300 hover:border-emerald-400/28 hover:bg-[linear-gradient(180deg,rgba(16,185,129,0.16),rgba(16,185,129,0.08))]"
          >
            <p className="text-sm uppercase tracking-[0.22em] text-emerald-300">Siguiente paso</p>
            <p className="mt-3 text-xl font-semibold leading-tight tracking-[-0.04em]">
              Si automatizás estas tareas, podés recuperar{' '}
              <span className="text-emerald-300">
                <AnimatedMetric
                  value={results.annualSavingsArs}
                  formatter={formatCurrencyArs}
                />
              </span>{' '}
              al año. ¿Hablamos?
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white/84">
              Quiero automatizar
              <ArrowRight
                size={16}
                className="transition duration-300 group-hover:translate-x-0.5"
              />
            </div>
          </motion.a>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
        <ResultCard
          label="Ahorro / mes"
          value={results.monthlySavingsArs}
          formatter={formatCurrencyArs}
          delay={0.04}
          icon={TrendingUp}
        />
        <ResultCard
          label="Horas libres / mes"
          value={results.monthlyHoursRecovered}
          formatter={(value) => `${formatCompactNumber(value)} hs`}
          delay={0.1}
          icon={Coins}
        />
        <ResultCard
          label="Ahorro anual"
          value={results.annualSavingsArs}
          formatter={formatCurrencyArs}
          delay={0.16}
          icon={Wallet}
        />
      </div>
    </div>
  )
}
