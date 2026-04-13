'use client'

import { cn } from '@/lib/utils'
import { motion, useReducedMotion } from 'framer-motion'
import { useSyncExternalStore, type ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  x?: number
  id?: string
  variant?: 'hero' | 'section' | 'surface'
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
  x = 0,
  variant = 'section',
  ...props
}: RevealProps) {
  const reduceMotion = useReducedMotion()
  const hydrated = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  )

  const variantMap = {
    hero: { y: 24, duration: 0.92, amount: 0.15, scale: 0.985 },
    section: { y, duration: 0.82, amount: 0.2, scale: 0.992 },
    surface: { y: Math.max(12, y - 4), duration: 0.72, amount: 0.18, scale: 0.996 },
  } as const

  const config = variantMap[variant]

  return (
    <motion.div
      initial={
        hydrated
          ? reduceMotion
            ? { opacity: 0 }
            : { opacity: 0, y: config.y, x, scale: config.scale }
          : false
      }
      whileInView={
        reduceMotion
          ? { opacity: 1 }
          : { opacity: 1, y: 0, x: 0, scale: 1 }
      }
      viewport={{ once: true, amount: config.amount }}
      transition={{ duration: reduceMotion ? 0.38 : config.duration, ease: [0.22, 1, 0.36, 1], delay }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}
