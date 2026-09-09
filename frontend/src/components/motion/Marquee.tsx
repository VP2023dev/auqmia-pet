interface MarqueeProps {
  items: string[]
}

export function Marquee({ items }: MarqueeProps) {
  const row = [...items, ...items]

  return (
    <div className="relative overflow-hidden border-y border-primary/15 bg-night py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-ink to-transparent" />
      <div className="animate-marquee flex w-max gap-10 pr-10">
        {row.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-6 text-xs font-medium tracking-[0.16em] text-primary uppercase sm:gap-10 sm:text-sm sm:tracking-[0.22em]">
            {item}
            <span className="text-white/25" aria-hidden="true">
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
