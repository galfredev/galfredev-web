'use client'

import { cn } from '@/lib/utils'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { ReactNode } from 'react'

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

  const rotateX = useTransform(smoothY, [0, 1], [6, -6])
  const rotateY = useTransform(smoothX, [0, 1], [-6, 6])
  const glowX = useTransform(smoothX, [0, 1], ['0%', '100%'])
  const glowY = useTransform(smoothY, [0, 1], ['0%', '100%'])
  const background = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, rgba(31,127,115,0.14), transparent 36%)`
  

  return (
    <motion.div
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect()
        pointerX.set((event.clientX - bounds.left) / bounds.width)
        pointerY.set((event.clientY - bounds.top) / bounds.height)
      }}
      onMouseLeave={() => {
        pointerX.set(0.5)
        pointerY.set(0.5)
      }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.22 }}
      className={cn(
        'group relative overflow-hidden rounded-[30px] border border-white/8 bg-white/5',
        className,
      )}
    >
      <motion.div
        aria-hidden
        style={{ background }}
        className={cn('pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100', glowClassName)}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_28%)] opacity-70" />
      <div className="relative">{children}</div>
    </motion.div>
  )
}
