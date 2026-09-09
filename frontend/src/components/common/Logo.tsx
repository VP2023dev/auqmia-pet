import { Link } from 'react-router-dom'
import logo from '@/assets/logo.webp'
import { siteConfig } from '@/config/site'
import { cn } from '@/utils/cn'

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      to="/"
      className={cn('inline-flex shrink-0 items-center', className)}
      aria-label={`${siteConfig.name}, página inicial`}
    >
      <img
        src={logo}
        alt={`${siteConfig.name} — ${siteConfig.serviceLine}`}
        className="h-11 w-auto max-w-[8.75rem] object-contain mix-blend-lighten sm:h-14 sm:max-w-44"
      />
    </Link>
  )
}
