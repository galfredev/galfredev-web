'use client'

import { cn } from '@/lib/utils'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { startTransition, useEffect, useState, useSyncExternalStore } from 'react'

type RotatingTextProps = {
  words: string[]
  activeIndex?: number
  intervalMs?: number
  className?: string
}

export function RotatingText({
  words,
  activeIndex,
  intervalMs = 4800,
  className,
}: RotatingTextProps) {
  const [internalIndex, setInternalIndex] = useState(0)
  const reduceMotion = useReducedMotion()
  const hydrated = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  )

  const isControlled = typeof activeIndex === 'number'
  const resolvedIndex = isControlled ? activeIndex : internalIndex
  const safeIndex =
    words.length > 0 ? ((resolvedIndex % words.length) + words.length) % words.length : 0
  const activeWord = words[safeIndex] ?? ''
  const reserveWord =
    words.reduce((longest, word) => (word.length > longest.length ? word : longest), words[0] ?? '') ||
    activeWord

  useEffect(() => {
    if (isControlled || words.length <= 1) {
      return
    }

    const timer = window.setInterval(() => {
      startTransition(() => {
        setInternalIndex((current) => (current + 1) % words.length)
      })
    }, intervalMs)

    return () => window.clearInterval(timer)
  }, [intervalMs, isControlled, words])

  if (!activeWord) {
    return null
  }

  return (
    <span className={cn('relative inline-grid align-top', className)}>
      <span aria-hidden className="invisible block select-none">
        {reserveWord}
      </span>

      {!hydrated ? (
        <span className="absolute inset-0 block text-[var(--color-accent)]">{activeWord}</span>
      ) : null}

      <AnimatePresence mode="wait" initial={false}>
        {hydrated ? (
          <motion.span
            key={activeWord}
            initial={
              reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.992, filter: 'blur(12px)' }
            }
            animate={
              reduceMotion
                ? { opacity: 1 }
                : {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: 'blur(0px)',
                    textShadow: '0 0 24px rgba(31,127,115,0.14)',
                  }
            }
            exit={
              reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.996, filter: 'blur(10px)' }
            }
            transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 block text-[var(--color-accent)] will-change-transform"
          >
            {activeWord}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </span>
  )
}
