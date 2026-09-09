import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'whatsapp' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-night hover:bg-primary-dark shadow-soft',
  secondary:
    'bg-secondary text-night hover:bg-secondary-dark shadow-soft',
  outline:
    'border border-line bg-surface text-ink hover:border-primary hover:text-primary',
  whatsapp:
    'bg-[#25D366] text-white hover:bg-[#1ebe5d] shadow-soft',
  ghost: 'bg-transparent text-ink hover:bg-primary-soft',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-5 text-sm',
  lg: 'h-13 min-h-12 px-6 text-base',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth,
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex min-h-12 items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50',
        variant === 'primary' && 'btn-shine',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
