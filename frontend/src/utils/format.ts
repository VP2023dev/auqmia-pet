const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export function formatCurrency(value: number): string {
  return currencyFormatter.format(value)
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} minutos`
  }

  const hours = Math.floor(minutes / 60)
  const remaining = minutes % 60

  if (remaining === 0) {
    return hours === 1 ? '1 hora' : `${hours} horas`
  }

  return `${hours}h ${remaining}min`
}

export function formatDateLabel(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`)
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  })
}

export function formatDateShort(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`)
  return date.toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  })
}
