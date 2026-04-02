import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  eyebrow: string
  title: string
  description: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-3xl space-y-5',
        align === 'center' && 'mx-auto text-center',
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-accent)]">
        {eyebrow}
      </p>
      <div className="space-y-4">
        <h2 className="text-balance text-3xl font-semibold tracking-[-0.06em] text-white sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p className="text-pretty text-base leading-7 text-white/66 sm:text-lg">
          {description}
        </p>
      </div>
    </div>
  )
}
