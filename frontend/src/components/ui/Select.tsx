import type { SelectHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: SelectOption[]
  placeholder?: string
  error?: string
}

export function Select({
  label,
  options,
  placeholder = 'Selecione',
  error,
  id,
  className,
  ...props
}: SelectProps) {
  const selectId = id ?? props.name

  return (
    <label className="block space-y-2" htmlFor={selectId}>
      <span className="text-sm font-medium text-ink">{label}</span>
      <select
        id={selectId}
        className={cn(
          'h-12 w-full appearance-none rounded-2xl border border-line bg-surface px-4 text-sm text-ink outline-none transition-colors focus:border-primary',
          error && 'border-red-400',
          className,
        )}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <span className="text-xs text-red-500">{error}</span> : null}
    </label>
  )
}
