import type { LucideIcon } from 'lucide-react'
import { Bath, Droplets, Ear, Leaf, Scissors, ScissorsLineDashed, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { Service } from '@/types/service'
import { buildServiceMessage, openWhatsApp } from '@/services/whatsapp'

const iconMap: Record<Service['icon'], LucideIcon> = {
  bath: Bath,
  scissors: Scissors,
  combo: Sparkles,
  hygiene: Leaf,
  nails: ScissorsLineDashed,
  hydration: Droplets,
  ears: Ear,
}

interface ServiceCardProps {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = iconMap[service.icon]

  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-surface p-3 shadow-soft transition-colors duration-300 hover:border-primary/45 sm:rounded-3xl sm:p-6">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-primary sm:h-12 sm:w-12 sm:rounded-2xl">
        <Icon size={18} aria-hidden="true" />
      </span>
      <h3 className="mt-3 text-sm font-semibold text-ink sm:mt-5 sm:text-lg">{service.name}</h3>
      <p className="mt-1 line-clamp-2 flex-1 text-xs leading-5 text-muted sm:mt-2 sm:line-clamp-none sm:text-sm sm:leading-6">
        {service.shortDescription}
      </p>
      <Button
        className="mt-3 h-10 text-xs sm:mt-6 sm:h-12 sm:text-sm"
        variant="outline"
        onClick={() => openWhatsApp(buildServiceMessage(service.name))}
      >
        Agendar
      </Button>
    </article>
  )
}
