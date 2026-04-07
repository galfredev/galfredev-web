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

type BorderGlowCardProps = {
  children: ReactNode
  className?: string
}

export function BorderGlowCard({ children, className }: BorderGlowCardProps) {
  const pointerX = useMotionValue(0.5)
  const pointerY = useMotionValue(0.5)
  const smoothX = useSpring(pointerX, { stiffness: 220, damping: 26 })
  const smoothY = useSpring(pointerY, { stiffness: 220, damping: 26 })
  const reduceMotion = useReducedMotion()
  const hydrated = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  )

  const glowX = useTransform(smoothX, (value) => `${value * 100}%`)
  const glowY = useTransform(smoothY, (value) => `${value * 100}%`)
  const borderGlow = useMotionTemplate`radial-gradient(260px circle at ${glowX} ${glowY}, rgba(31,127,115,0.42), transparent 58%)`
  const enableMotion = hydrated && !reduceMotion
  const fallbackBackground = 'linear-gradient(180deg,rgba(31,127,115,0.12),transparent 42%)'

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
      whileHover={enableMotion ? { y: -3 } : undefined}
      transition={{ duration: 0.22 }}
      className={cn(
        'group relative overflow-hidden rounded-[30px] border border-white/8 bg-white/5',
        className,
      )}
    >
      <motion.div
        aria-hidden
        style={{
          background: enableMotion ? borderGlow : fallbackBackground,
        }}
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
      />
      <div className="pointer-events-none absolute inset-[1px] rounded-[29px] border border-[rgba(31,127,115,0.14)] opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent_30%)]" />
      <div className="relative">{children}</div>
    </motion.div>
  )
}
