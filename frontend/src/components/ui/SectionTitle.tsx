import { cn } from '@/utils/cn'

interface SectionTitleProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionTitleProps) {
  return (
    <div className={cn(align === 'center' && 'mx-auto text-center', 'max-w-2xl', className)}>
      {eyebrow ? (
        <p className="mb-2 inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-primary uppercase sm:mb-3 sm:text-xs">
          <span className="h-px w-6 bg-primary sm:w-8" />
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-serif text-[1.45rem] leading-tight font-semibold tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-2 text-sm leading-6 text-muted sm:mt-4 sm:text-base sm:leading-7">{description}</p>
      ) : null}
    </div>
  )
}
