'use client'

import { cn } from '@/lib/utils'
import type { HeroScenario, HeroScenarioMessage } from '@/types/site'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { CheckCheck, MessageCircleMore, Workflow } from 'lucide-react'
import { useRef, useSyncExternalStore } from 'react'

type DeviceShowcaseProps = {
  scenario: HeroScenario
}

function bubbleClassName(message: HeroScenarioMessage) {
  if (message.tone === 'accent') {
    return 'ml-auto max-w-[90%] rounded-[22px] rounded-br-md border border-[var(--color-accent)]/18 bg-[var(--color-accent)]/10 px-4 py-3 text-sm leading-6 text-white'
  }

  if (message.tone === 'system') {
    return 'max-w-[88%] rounded-[22px] rounded-bl-md border border-white/8 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-white/68'
  }

  return 'max-w-[88%] rounded-[22px] rounded-bl-md border border-white/8 bg-white/5 px-4 py-3 text-sm leading-6 text-white/74'
}

function ScenarioBody({
  scenario,
  animated,
  reduceMotion,
}: {
  scenario: HeroScenario
  animated: boolean
  reduceMotion: boolean
}) {
  const content = (
    <>
      <div className="space-y-3">
        {scenario.messages.map((message, index) =>
          animated ? (
            <motion.div
              key={`${scenario.id}-${index}`}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.48, delay: 0.1 + index * 0.08, ease: 'easeOut' }}
              className={cn(message.hiddenOnMobile && 'hidden sm:block')}
            >
              <div
                className={cn(bubbleClassName(message), message.align === 'right' ? 'ml-auto' : '')}
              >
                {message.text}
              </div>
            </motion.div>
          ) : (
            <div
              key={`${scenario.id}-${index}`}
              className={cn(message.hiddenOnMobile && 'hidden sm:block')}
            >
              <div
                className={cn(bubbleClassName(message), message.align === 'right' ? 'ml-auto' : '')}
              >
                {message.text}
              </div>
            </div>
          ),
        )}
      </div>

      <div className="rounded-[24px] border border-white/8 bg-black/20 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-white">
            <div className="flex size-9 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[var(--color-accent)]">
              <Workflow size={16} />
            </div>
            <div>
              <p className="text-sm font-medium">{scenario.footerTitle}</p>
              <p className="text-xs text-white/42">{scenario.footerDetail}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs text-white/58">
            <CheckCheck size={14} className="text-[var(--color-accent)]" />
            {scenario.footerStatus}
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {scenario.cards.map((card) => (
            <div
              key={card.label}
              className="rounded-[20px] border border-white/8 bg-white/[0.03] px-4 py-3"
            >
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/34">{card.label}</p>
              <p className="mt-2 text-sm font-medium text-white">{card.value}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )

  if (!animated) {
    return <div className="mt-5 space-y-5">{content}</div>
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={scenario.id}
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -18 }}
        transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
        className="mt-5 space-y-5"
      >
        {content}
      </motion.div>
    </AnimatePresence>
  )
}

export function DeviceShowcase({ scenario }: DeviceShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const pointerX = useMotionValue(0.5)
  const pointerY = useMotionValue(0.5)
  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 22 })
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 22 })
  const reduceMotion = useReducedMotion()
  const hydrated = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  )

  const enableInteraction = hydrated && !reduceMotion
  const rotateX = useTransform(smoothY, [0, 1], enableInteraction ? [7, -7] : [0, 0])
  const rotateY = useTransform(smoothX, [0, 1], enableInteraction ? [-8, 8] : [0, 0])
  const ambientNodes = [
    { position: 'left-[8%] top-[24%]', duration: 5.6, delay: 0.2, size: 'size-4' },
    { position: 'right-[8%] top-[20%]', duration: 6.2, delay: 0.5, size: 'size-3.5' },
    { position: 'right-[10%] bottom-[18%]', duration: 5.9, delay: 0.9, size: 'size-4.5' },
  ] as const

  return (
    <div
      ref={containerRef}
      onMouseMove={(event) => {
        if (!enableInteraction) {
          return
        }

        const bounds = containerRef.current?.getBoundingClientRect()

        if (!bounds) {
          return
        }

        pointerX.set((event.clientX - bounds.left) / bounds.width)
        pointerY.set((event.clientY - bounds.top) / bounds.height)
      }}
      onMouseLeave={() => {
        pointerX.set(0.5)
        pointerY.set(0.5)
      }}
      className="relative mx-auto w-full max-w-[640px]"
    >
      <motion.div
        animate={enableInteraction ? { opacity: [0.72, 1, 0.72], scale: [1, 1.03, 1] } : undefined}
        transition={{ duration: 7.2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        className="absolute inset-x-[10%] top-12 h-56 rounded-full bg-[radial-gradient(circle,rgba(31,127,115,0.22),transparent_60%)] blur-3xl"
      />

      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        {ambientNodes.map((node) => (
          <motion.div
            key={node.position}
            animate={
              enableInteraction
                ? {
                    y: [0, -5, 0],
                    scale: [1, 1.06, 1],
                    opacity: [0.48, 0.88, 0.48],
                  }
                : undefined
            }
            transition={{
              duration: node.duration,
              delay: node.delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
            }}
            className={cn('absolute', node.position)}
          >
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-[-14px] rounded-full bg-[radial-gradient(circle,rgba(31,127,115,0.14),transparent_70%)] blur-xl" />
              <div className="relative flex size-8 items-center justify-center rounded-full border border-[var(--color-accent)]/18 bg-[rgba(8,12,20,0.74)] shadow-[0_0_18px_rgba(31,127,115,0.1)]">
                <span className={cn('rounded-full bg-[var(--color-accent)]/78', node.size)} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        style={enableInteraction ? { rotateX, rotateY } : undefined}
        className="relative mx-auto w-full max-w-[460px] rounded-[40px] border border-white/10 bg-[rgba(8,12,20,0.72)] p-3 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl"
      >
        <div className="rounded-[34px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-3">
          <div className="rounded-[28px] border border-white/8 bg-[rgba(7,12,18,0.96)] p-4 sm:p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-2xl border border-[var(--color-accent)]/16 bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                  <MessageCircleMore size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{scenario.panelTitle}</p>
                  <p className="text-xs uppercase tracking-[0.22em] text-white/34">
                    {scenario.panelEyebrow}
                  </p>
                </div>
              </div>
              <span className="rounded-full border border-white/10 bg-black/18 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
                {scenario.panelStatus}
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {scenario.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white/44"
                >
                  {tag}
                </span>
              ))}
            </div>

            <ScenarioBody scenario={scenario} animated={hydrated} reduceMotion={!!reduceMotion} />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
