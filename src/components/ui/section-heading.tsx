import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
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
        'max-w-3xl space-y-6',
        align === 'center' && 'mx-auto text-center',
      )}
    >
      <p
        className={cn(
          'section-kicker',
          align === 'center' && 'justify-center',
        )}
      >
        {eyebrow}
      </p>
      <div className="space-y-4">
        <h2 className="text-balance text-3xl font-semibold leading-[0.96] tracking-[-0.07em] text-white sm:text-4xl lg:text-[3.35rem]">
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              'max-w-2xl text-pretty text-base leading-8 text-[var(--text-faint)] sm:text-lg',
              align === 'center' && 'mx-auto',
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
    </div>
  )
}
