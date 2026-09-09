const motes = [
  { className: 'top-[18%] left-[12%] h-1.5 w-1.5', delay: '0s' },
  { className: 'top-[28%] right-[18%] h-1 w-1', delay: '1.4s' },
  { className: 'top-[62%] left-[22%] h-2 w-2', delay: '2.2s' },
  { className: 'bottom-[22%] right-[28%] h-1.5 w-1.5', delay: '0.8s' },
  { className: 'top-[44%] left-[48%] h-1 w-1', delay: '3s' },
]

export function GoldField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -top-16 -left-10 h-44 w-44 rounded-full bg-primary/22 blur-3xl animate-orb md:h-72 md:w-72" />
      <div className="absolute top-8 right-0 h-52 w-52 rounded-full bg-secondary/16 blur-3xl animate-orb-delayed md:h-80 md:w-80" />
      <div className="absolute bottom-0 left-1/3 h-36 w-36 rounded-full bg-primary/12 blur-3xl animate-orb" />
      {motes.map((mote) => (
        <span
          key={mote.className}
          className={`animate-float-mote absolute rounded-full bg-primary ${mote.className}`}
          style={{ animationDelay: mote.delay }}
        />
      ))}
    </div>
  )
}
