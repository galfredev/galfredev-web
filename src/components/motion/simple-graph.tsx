'use client'

import { cn } from '@/lib/utils'
import { motion, useReducedMotion } from 'framer-motion'

const points = [
  [6, 76],
  [20, 68],
  [34, 57],
  [48, 48],
  [62, 38],
  [76, 29],
  [92, 18],
] as const

const linePath = points
  .map(([x, y], index) => `${index === 0 ? 'M' : 'L'} ${x} ${y}`)
  .join(' ')

export function SimpleGraph({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion()
  const shouldAnimate = !reduceMotion

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[30px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5',
        className,
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:36px_36px] opacity-30" />
      <div className="relative">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--color-accent)]">
              Impacto visible
            </p>
            <p className="mt-2 text-sm leading-6 text-white/56">
              Menos demora, más seguimiento y una operación con mejor ritmo.
            </p>
          </div>
          <div className="rounded-full border border-[var(--color-accent)]/16 bg-[var(--color-accent)]/8 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--color-accent)]">
            ROI
          </div>
        </div>

        <svg viewBox="0 0 100 86" className="h-[220px] w-full">
          <defs>
            <linearGradient id="graph-line" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(31,127,115,0.38)" />
              <stop offset="100%" stopColor="rgba(78,219,194,0.98)" />
            </linearGradient>
            <linearGradient id="graph-fill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(31,127,115,0.24)" />
              <stop offset="100%" stopColor="rgba(31,127,115,0)" />
            </linearGradient>
          </defs>

          {[18, 34, 50, 66].map((y) => (
            <line
              key={y}
              x1="4"
              y1={y}
              x2="96"
              y2={y}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="0.4"
              strokeDasharray="1.4 2"
            />
          ))}

          <motion.path
            d={`${linePath} L 92 80 L 6 80 Z`}
            fill="url(#graph-fill)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.55 }}
          />

          <motion.path
            d={linePath}
            fill="none"
            stroke="url(#graph-line)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: shouldAnimate ? 1.15 : 0.5, ease: [0.22, 1, 0.36, 1] }}
          />

          {points.map(([x, y], index) => (
            <motion.g
              key={`${x}-${y}`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.06 }}
            >
              <motion.circle
                cx={x}
                cy={y}
                r="4.8"
                fill="rgba(31,127,115,0.18)"
                animate={shouldAnimate ? { scale: [1, 1.32, 1], opacity: [0.45, 0.8, 0.45] } : { scale: 1, opacity: 0.45 }}
                transition={{
                  duration: 2.4 + index * 0.15,
                  repeat: shouldAnimate ? Number.POSITIVE_INFINITY : 0,
                  ease: 'easeInOut',
                }}
              />
              <circle cx={x} cy={y} r="2.35" fill="#4edbc2" />
            </motion.g>
          ))}
        </svg>

        <div className="mt-4 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.22em] text-white/38">
          <span className="rounded-full border border-white/8 bg-black/18 px-3 py-1.5">
            Respuesta
          </span>
          <span className="rounded-full border border-white/8 bg-black/18 px-3 py-1.5">
            Seguimiento
          </span>
          <span className="rounded-full border border-white/8 bg-black/18 px-3 py-1.5">
            Conversión
          </span>
        </div>
      </div>
    </div>
  )
}
