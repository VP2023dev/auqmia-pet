import { contactConfig } from '@/config/contact'
import type { BookingFormData } from '@/types/booking'
import { getServicesByIds } from '@/data/services'
import { formatCurrency, formatDateLabel, formatDuration } from '@/utils/format'

const DIVIDER = '━━━━━━━━━━━━━━━━'

function getWhatsAppNumber(): string {
  return contactConfig.whatsappNumber.replace(/\D/g, '')
}

function capitalize(value: string): string {
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : value
}

function formatAge(age: string): string {
  const trimmed = age.trim()
  if (!trimmed) return 'Não informado'
  return /^\d+$/.test(trimmed) ? `${trimmed} anos` : trimmed
}

function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
  }
  if (digits.length === 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }
  return phone
}

export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${getWhatsAppNumber()}?text=${encoded}`
}

export function openWhatsApp(message: string = contactConfig.whatsappDefaultMessage): void {
  window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
}

export function buildProductMessage(productName: string): string {
  return [
    '✨ *AUqMIA Pet*',
    DIVIDER,
    'Olá! Vim pelo site e gostaria de *comprar*:',
    '',
    `🛍️ ${productName}`,
    '',
    'Pode me confirmar se tem disponível?',
  ].join('\n')
}

export function buildServiceMessage(serviceName: string): string {
  return [
    '✨ *AUqMIA Pet*',
    DIVIDER,
    'Olá! Vim pelo site e gostaria de *agendar*:',
    '',
    `🛁 ${serviceName}`,
    '',
    'Pode me passar os horários livres?',
  ].join('\n')
}

export function buildBookingMessage(data: BookingFormData): string {
  const selectedServices = getServicesByIds(data.serviceIds)
  const serviceLines = selectedServices.map((service) => `• ${service.name}`)
  const duration = selectedServices.reduce((sum, service) => sum + service.durationMinutes, 0)
  const totalFrom = selectedServices.reduce((sum, service) => sum + service.priceFrom, 0)
  const speciesLabel = {
    cao: 'Cão',
    gato: 'Gato',
    outro: 'Outro',
  }[data.pet.species || 'outro']

  const sizeLabel = {
    pequeno: 'Pequeno',
    medio: 'Médio',
    grande: 'Grande',
  }[data.pet.size || 'pequeno']

  return [
    '✨ *Novo agendamento — AUqMIA Pet*',
    DIVIDER,
    'Olá! Vim pelo site e gostaria de *confirmar* este horário.',
    '',
    '🛁 *Serviços*',
    ...(serviceLines.length > 0 ? serviceLines : ['• Não informado']),
    ...(duration ? [`_Tempo estimado: ${formatDuration(duration)}_`] : []),
    ...(totalFrom ? [`_A partir de ${formatCurrency(totalFrom)}_`] : []),
    '',
    '🐾 *Pet*',
    `• Nome: *${data.pet.name}*`,
    `• ${speciesLabel} · ${data.pet.breed}`,
    `• Porte ${sizeLabel} · ${formatAge(data.pet.age)}`,
    ...(data.pet.notes ? [`• Obs.: ${data.pet.notes}`] : []),
    '',
    '📅 *Quando*',
    `• ${capitalize(formatDateLabel(data.date))}`,
    `• Horário: *${data.time}*`,
    '',
    '👤 *Tutor*',
    `• ${data.tutor.name}`,
    `• ${formatPhone(data.tutor.whatsapp)}`,
    `• ${data.tutor.email}`,
    '',
    DIVIDER,
    '_Aguardo a confirmação. Obrigado!_ 💛',
  ].join('\n')
}
