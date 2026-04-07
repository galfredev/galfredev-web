'use client'

import { cn } from '@/lib/utils'
import { motion, useReducedMotion } from 'framer-motion'
import { Bot, CheckCircle2, GitBranch, MessageCircle, Radar, Workflow } from 'lucide-react'
import type { ComponentType } from 'react'

type FlowNode = {
  label: string
  icon: ComponentType<{ size?: number; className?: string }>
  angle: number
  labelOffset?: { x: number; y: number }
  labelPlacement?: 'left' | 'right' | 'top' | 'bottom'
  pulseDelay: number
}

const ORBIT_CENTER = { x: 300, y: 184 }
const ORBIT_OFFSET = { x: -30, y: -22 }
const ICON_ORBIT = { rx: 120, ry: 96 }
const LABEL_ORBIT = { rx: 196, ry: 146 }

const flowNodes: FlowNode[] = [
  { label: 'Consulta', icon: MessageCircle, angle: -148, pulseDelay: 0 },
  {
    label: 'Diagnóstico',
    icon: Radar,
    angle: -90,
    labelOffset: { x: 0, y: -32 },
    labelPlacement: 'top',
    pulseDelay: 0.18,
  },
  {
    label: 'Automatización',
    icon: Bot,
    angle: -32,
    labelOffset: { x: 34, y: -22 },
    labelPlacement: 'right',
    pulseDelay: 0.36,
  },
  {
    label: 'Seguimiento',
    icon: Workflow,
    angle: 26,
    labelOffset: { x: 42, y: 48 },
    labelPlacement: 'right',
    pulseDelay: 0.54,
  },
  {
    label: 'Integración',
    icon: GitBranch,
    angle: 90,
    labelOffset: { x: -28, y: 48 },
    labelPlacement: 'bottom',
    pulseDelay: 0.72,
  },
  {
    label: 'Resultado',
    icon: CheckCircle2,
    angle: 152,
    labelOffset: { x: -48, y: 48 },
    labelPlacement: 'bottom',
    pulseDelay: 0.9,
  },
]

function toRadians(angle: number) {
  return (angle * Math.PI) / 180
}

function getOrbitPosition(angle: number, orbit: { rx: number; ry: number }) {
  const radians = toRadians(angle)

  return {
    x: ORBIT_CENTER.x + ORBIT_OFFSET.x + Math.cos(radians) * orbit.rx,
    y: ORBIT_CENTER.y + ORBIT_OFFSET.y + Math.sin(radians) * orbit.ry,
  }
}

function getLabelPlacement(angle: number) {
  if (angle <= -120 || angle >= 120) {
    return 'left'
  }

  if (angle >= -60 && angle <= 60) {
    return 'right'
  }

  if (angle < 0) {
    return 'top'
  }

  return 'bottom'
}

function getLabelTransform(placement: ReturnType<typeof getLabelPlacement>) {
  switch (placement) {
    case 'left':
      return 'translate(-100%, -50%)'
    case 'right':
      return 'translate(0, -50%)'
    case 'top':
      return 'translate(-50%, -100%)'
    case 'bottom':
      return 'translate(-50%, 0)'
  }
}

export function CenterFlow({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion()
  const shouldAnimate = !reduceMotion

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[32px] border border-white/8 bg-[radial-gradient(circle_at_50%_46%,rgba(31,127,115,0.15),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-3 sm:p-4',
        className,
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />

      <div className="relative mx-auto aspect-[1.12] max-w-[580px]">
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 600 360">
          <defs>
            <linearGradient id="orbit-line" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.04)" />
              <stop offset="50%" stopColor="rgba(31,127,115,0.22)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
            </linearGradient>
            <radialGradient id="orbit-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(78,219,194,0.16)" />
              <stop offset="100%" stopColor="rgba(78,219,194,0)" />
            </radialGradient>
          </defs>

          <ellipse
            cx={ORBIT_CENTER.x}
            cy={ORBIT_CENTER.y}
            rx="146"
            ry="106"
            fill="url(#orbit-glow)"
          />
          <circle
            cx={ORBIT_CENTER.x}
            cy={ORBIT_CENTER.y}
            r="108"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
          <circle
            cx={ORBIT_CENTER.x}
            cy={ORBIT_CENTER.y}
            r="80"
            fill="none"
            stroke="rgba(31,127,115,0.1)"
            strokeWidth="1"
          />

          {flowNodes.map((node) => {
            const iconPosition = getOrbitPosition(node.angle, ICON_ORBIT)

            return (
              <g key={node.label}>
                <path
                  d={`M ${ORBIT_CENTER.x} ${ORBIT_CENTER.y} L ${iconPosition.x} ${iconPosition.y}`}
                  fill="none"
                  stroke="url(#orbit-line)"
                  strokeWidth="1.15"
                  strokeLinecap="round"
                />
                <motion.circle
                  r="3.8"
                  fill="rgba(78,219,194,0.95)"
                  filter="drop-shadow(0 0 8px rgba(78,219,194,0.48))"
                  animate={
                    shouldAnimate ? { offsetDistance: ['0%', '100%'] } : { offsetDistance: '100%' }
                  }
                  transition={{
                    duration: 2.9,
                    delay: node.pulseDelay,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'linear',
                  }}
                  style={{
                    offsetPath: `path("M ${ORBIT_CENTER.x} ${ORBIT_CENTER.y} L ${iconPosition.x} ${iconPosition.y}")`,
                  }}
                />
              </g>
            )
          })}
        </svg>

        {flowNodes.map((node, index) => {
          const Icon = node.icon
          const iconPosition = getOrbitPosition(node.angle, ICON_ORBIT)
          const defaultLabelPosition = getOrbitPosition(node.angle, LABEL_ORBIT)
          const labelPosition = node.labelOffset
            ? {
                x: iconPosition.x + node.labelOffset.x,
                y: iconPosition.y + node.labelOffset.y,
              }
            : defaultLabelPosition
          const placement = node.labelPlacement ?? getLabelPlacement(node.angle)

          return (
            <div key={node.label}>
              <motion.div
                className="absolute"
                style={{
                  left: `${(iconPosition.x / 600) * 100}%`,
                  top: `${(iconPosition.y / 360) * 100}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.42, delay: 0.12 + index * 0.05 }}
              >
                <motion.div
                  whileHover={reduceMotion ? undefined : { y: -3, scale: 1.03 }}
                  animate={shouldAnimate ? { y: [0, -3, 0] } : undefined}
                  transition={{
                    y: {
                      duration: 3.6 + index * 0.2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: 'easeInOut',
                    },
                    scale: { duration: 0.2 },
                  }}
                  className="flex size-14 items-center justify-center rounded-[22px] border border-white/10 bg-[rgba(7,12,20,0.9)] text-[var(--color-accent)] shadow-[0_20px_50px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:size-16"
                >
                  <div className="flex size-10 items-center justify-center rounded-[16px] border border-[var(--color-accent)]/18 bg-[radial-gradient(circle,rgba(31,127,115,0.16),rgba(6,12,20,0.98)_70%)] sm:size-11">
                    <Icon size={18} />
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                className="absolute"
                style={{
                  left: `${(labelPosition.x / 600) * 100}%`,
                  top: `${(labelPosition.y / 360) * 100}%`,
                  transform: getLabelTransform(placement),
                }}
                initial={{ opacity: 0, y: placement === 'bottom' ? 6 : placement === 'top' ? -6 : 0, x: placement === 'left' ? -6 : placement === 'right' ? 6 : 0 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.38, delay: 0.18 + index * 0.05 }}
              >
                <span className="rounded-full border border-white/8 bg-[rgba(7,12,20,0.82)] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
                  {node.label}
                </span>
              </motion.div>
            </div>
          )
        })}

        <motion.div
          className="absolute z-10 h-[110px] w-[110px] rounded-[30px] border border-[var(--color-accent)]/18 bg-[radial-gradient(circle,rgba(31,127,115,0.16),rgba(7,12,20,0.96)_72%)] p-3 shadow-[0_0_56px_rgba(31,127,115,0.11)] sm:h-[118px] sm:w-[118px]"
          style={{
            left: `${(ORBIT_CENTER.x / 600) * 100}%`,
            top: `${(ORBIT_CENTER.y / 360) * 100}%`,
            transform: 'translate(-50%, -50%)',
          }}
          animate={shouldAnimate ? { scale: [1, 1.018, 1] } : undefined}
          transition={{ duration: 4.8, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        >
          <div className="flex h-full w-full flex-col items-center justify-center rounded-[24px] border border-white/8 bg-[rgba(6,11,18,0.92)] text-center">
            <div className="mb-2 flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/6 text-xs font-semibold text-white">
              GD
            </div>
            <p className="text-[10px] font-medium tracking-[0.22em] text-white/78">
              GALFREDEV
            </p>
            <div className="mt-2 h-px w-8 bg-gradient-to-r from-transparent via-[var(--color-accent)]/60 to-transparent" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
