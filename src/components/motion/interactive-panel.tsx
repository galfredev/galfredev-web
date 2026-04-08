'use client'

import { cn } from '@/lib/utils'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useSyncExternalStore, type ReactNode } from 'react'

type InteractivePanelProps = {
  children: ReactNode
  className?: string
  glowClassName?: string
}

export function InteractivePanel({
  children,
  className,
  glowClassName,
}: InteractivePanelProps) {
  const pointerX = useMotionValue(0.5)
  const pointerY = useMotionValue(0.5)
  const smoothX = useSpring(pointerX, { stiffness: 180, damping: 24 })
  const smoothY = useSpring(pointerY, { stiffness: 180, damping: 24 })
  const reduceMotion = useReducedMotion()
  const hydrated = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  )

  const rotateX = useTransform(smoothY, [0, 1], [3.5, -3.5])
  const rotateY = useTransform(smoothX, [0, 1], [-3.5, 3.5])
  const glowX = useTransform(smoothX, [0, 1], ['0%', '100%'])
  const glowY = useTransform(smoothY, [0, 1], ['0%', '100%'])
  const background = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, rgba(61,221,196,0.16), transparent 40%)`
  const accentGlow = useMotionTemplate`radial-gradient(220px circle at ${glowX} ${glowY}, rgba(255,255,255,0.08), transparent 52%)`
  const enableMotion = hydrated && !reduceMotion

  return (
    <motion.div
      onMouseMove={(event) => {
        if (!enableMotion) {
          return
        }

        const bounds = event.currentTarget.getBoundingClientRect()
        pointerX.set((event.clientX - bounds.left) / bounds.width)
        pointerY.set((event.clientY - bounds.top) / bounds.height)
      }}
      onMouseLeave={() => {
        pointerX.set(0.5)
        pointerY.set(0.5)
      }}
      style={
        enableMotion
          ? { rotateX, rotateY, transformStyle: 'preserve-3d' }
          : undefined
      }
      whileHover={enableMotion ? { y: -6, scale: 1.008 } : undefined}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'surface-panel surface-panel-interactive group active:scale-[0.99]',
        className,
      )}
    >
      <motion.div
        aria-hidden
        style={{ background: enableMotion ? background : 'transparent' }}
        className={cn('pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100', glowClassName)}
      />
      <motion.div
        aria-hidden
        style={{ background: enableMotion ? accentGlow : 'transparent' }}
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
      />
      <div className="pointer-events-none absolute inset-[1px] rounded-[calc(2rem-1px)] border border-[rgba(61,221,196,0.07)] opacity-70" />
      <div className="relative">{children}</div>
    </motion.div>
  )
}
