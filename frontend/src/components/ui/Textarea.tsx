import type { TextareaHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
}

export function Textarea({ label, error, id, className, ...props }: TextareaProps) {
  const textareaId = id ?? props.name

  return (
    <label className="block space-y-2" htmlFor={textareaId}>
      <span className="text-sm font-medium text-ink">{label}</span>
      <textarea
        id={textareaId}
        className={cn(
          'min-h-28 w-full rounded-2xl border border-line bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-primary',
          error && 'border-red-400',
          className,
        )}
        {...props}
      />
      {error ? <span className="text-xs text-red-500">{error}</span> : null}
    </label>
  )
}
