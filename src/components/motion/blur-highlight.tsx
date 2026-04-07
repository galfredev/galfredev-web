'use client'

import { cn } from '@/lib/utils'
import { motion, useReducedMotion } from 'framer-motion'
import { useSyncExternalStore } from 'react'

type BlurHighlightProps = {
  text: string
  className?: string
  highlightClassName?: string
  highlightWords?: string[]
  delay?: number
}

export function BlurHighlight({
  text,
  className,
  highlightClassName,
  highlightWords = [],
  delay = 0,
}: BlurHighlightProps) {
  const reduceMotion = useReducedMotion()
  const hydrated = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  )
  const words = text.split(' ')
  const normalizedHighlights = new Set(
    highlightWords.map((word) => word.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')),
  )

  function normalizeWord(word: string) {
    return word
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[.,;:¡!¿?()"]/g, '')
  }

  return (
    <span className={cn('inline', className)}>
      {words.map((word, index) => (
        hydrated ? (
          <motion.span
            key={`${word}-${index}`}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.85 }}
            transition={{
              duration: reduceMotion ? 0.38 : 0.62,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + index * 0.045,
            }}
            className={cn(
              'mr-[0.32em] inline-block last:mr-0',
              normalizedHighlights.has(normalizeWord(word))
                ? cn(
                    'font-medium text-[var(--color-accent)]',
                    'drop-shadow-[0_0_18px_rgba(31,127,115,0.12)]',
                    highlightClassName,
                  )
                : index < 4 || index === words.length - 1
                  ? 'text-white'
                  : 'text-white/72',
            )}
          >
            {word}
          </motion.span>
        ) : (
          <span
            key={`${word}-${index}`}
            className={cn(
              'mr-[0.32em] inline-block last:mr-0',
              normalizedHighlights.has(normalizeWord(word))
                ? cn(
                    'font-medium text-[var(--color-accent)]',
                    'drop-shadow-[0_0_18px_rgba(31,127,115,0.12)]',
                    highlightClassName,
                  )
                : index < 4 || index === words.length - 1
                  ? 'text-white'
                  : 'text-white/72',
            )}
          >
            {word}
          </span>
        )
      ))}
    </span>
  )
}
