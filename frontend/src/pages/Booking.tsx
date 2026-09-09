import { useMemo, useState } from 'react'
import { Check } from 'lucide-react'
import { isAxiosError } from 'axios'
import { SEO } from '@/components/common/SEO'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { getServicesByIds, services } from '@/data/services'
import { useBookedSlots } from '@/hooks/useBookedSlots'
import { bookingSteps, useBookingForm } from '@/hooks/useBookingForm'
import { appointmentService } from '@/services/api'
import { buildBookingMessage, openWhatsApp } from '@/services/whatsapp'
import { formatCurrency, formatDateLabel, formatDateShort, formatDuration } from '@/utils/format'
import { getAvailableDates, getAvailableTimes, getDayTimes, isTimeTaken } from '@/utils/schedule'
import { cn } from '@/utils/cn'

const speciesOptions = [
  { value: 'cao', label: 'Cão' },
  { value: 'gato', label: 'Gato' },
  { value: 'outro', label: 'Outro' },
]

const sizeOptions = [
  { value: 'pequeno', label: 'Pequeno' },
  { value: 'medio', label: 'Médio' },
  { value: 'grande', label: 'Grande' },
]

export function Booking() {
  const { step, form, updateForm, canContinue, next, back } = useBookingForm()
  const { slots, addSlot, refresh } = useBookedSlots()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const selectedServices = getServicesByIds(form.serviceIds)
  const selectedTotal = selectedServices.reduce((sum, service) => sum + service.priceFrom, 0)
  const durationMinutes = selectedServices.reduce((sum, service) => sum + service.durationMinutes, 0)
  const dates = getAvailableDates()
  const dayTimes = form.date ? getDayTimes(form.date) : []
  const freeTimes = form.date ? getAvailableTimes(form.date, slots, durationMinutes || 60) : []

  const datesStatus = useMemo(
    () =>
      Object.fromEntries(
        dates.map((date) => [
          date,
          getAvailableTimes(date, slots, durationMinutes || 60).length === 0,
        ]),
      ),
    [dates, slots, durationMinutes],
  )

  const toggleService = (serviceId: string) => {
    const isSelected = form.serviceIds.includes(serviceId)
    updateForm({
      serviceIds: isSelected
        ? form.serviceIds.filter((id) => id !== serviceId)
        : [...form.serviceIds, serviceId],
      time: '',
    })
  }

  const confirm = async () => {
    setError('')
    setSubmitting(true)

    const booked = {
      date: form.date,
      time: form.time,
      durationMinutes: durationMinutes || 60,
    }

    try {
      await appointmentService.book({
        service_names: selectedServices.map((service) => service.name),
        duration_minutes: booked.durationMinutes,
        pet_name: form.pet.name,
        species: form.pet.species,
        breed: form.pet.breed,
        size: form.pet.size,
        age: form.pet.age,
        notes: form.pet.notes,
        tutor_name: form.tutor.name,
        phone: form.tutor.whatsapp,
        email: form.tutor.email,
        appointment_date: form.date,
        appointment_time: form.time,
      })
    } catch (requestError) {
      if (isAxiosError(requestError) && requestError.response?.status === 400) {
        setError('Esse horário acabou de ser preenchido. Volte e escolha outro.')
        await refresh()
        updateForm({ time: '' })
        setSubmitting(false)
        return
      }
    }

    addSlot(booked)
    openWhatsApp(buildBookingMessage(form))
    setSubmitting(false)
  }

  return (
    <>
      <SEO
        title="Agendamento"
        description="Agende banho, tosa e outros serviços da AUqMIA Pet em poucos passos e confirme pelo WhatsApp."
        path="/agendamento"
      />
      <section className="pt-10 pb-16">
        <Container className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Agendamento</p>
          <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Marque o horário do seu pet
          </h1>
          <p className="mt-3 text-sm leading-7 text-muted">
            Escolha os serviços, a data e um horário livre. Quando alguém confirma, aquele horário some para os outros.
          </p>

          <ol className="mt-8 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {bookingSteps.map((label, index) => (
              <li
                key={label}
                className={cn(
                  'rounded-2xl px-2 py-3 text-center text-[11px] font-medium sm:text-xs',
                  index === step
                    ? 'bg-primary text-night'
                    : index < step
                      ? 'bg-primary-soft text-primary'
                      : 'bg-surface text-muted',
                )}
              >
                <span className="sm:hidden">{index + 1}</span>
                <span className="hidden sm:inline">
                  {index + 1}. {label}
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-8 rounded-[2rem] border border-primary/15 bg-surface p-5 shadow-soft sm:p-8">
            {step === 0 && (
              <div>
                <p className="mb-4 text-sm text-muted">
                  Escolha um ou mais serviços. O tempo do horário é a soma do que você marcar.
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-1 sm:gap-3">
                  {services.map((service) => {
                    const isSelected = form.serviceIds.includes(service.id)

                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => toggleService(service.id)}
                        aria-pressed={isSelected}
                        className={cn(
                          'rounded-2xl border px-3 py-3 text-left transition-colors sm:px-4 sm:py-4',
                          isSelected
                            ? 'border-primary bg-primary-soft'
                            : 'border-line hover:border-primary/40',
                        )}
                      >
                        <span className="flex items-start justify-between gap-2">
                          <span className="block text-sm font-semibold text-ink sm:text-base">{service.name}</span>
                          <span
                            className={cn(
                              'inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border',
                              isSelected
                                ? 'border-primary bg-primary text-night'
                                : 'border-line text-transparent',
                            )}
                          >
                            <Check size={12} strokeWidth={3} />
                          </span>
                        </span>
                        <span className="mt-1 block text-xs text-muted sm:text-sm">
                          {formatCurrency(service.priceFrom)} · {formatDuration(service.durationMinutes)}
                        </span>
                      </button>
                    )
                  })}
                </div>
                {selectedServices.length > 0 ? (
                  <p className="mt-4 text-sm text-ink">
                    {selectedServices.length} {selectedServices.length === 1 ? 'serviço' : 'serviços'} · a
                    partir de {formatCurrency(selectedTotal)} · cerca de {formatDuration(durationMinutes)}
                  </p>
                ) : null}
              </div>
            )}

            {step === 1 && (
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Nome do pet"
                  name="petName"
                  value={form.pet.name}
                  onChange={(event) => updateForm({ pet: { ...form.pet, name: event.target.value } })}
                />
                <Select
                  label="Espécie"
                  name="species"
                  options={speciesOptions}
                  value={form.pet.species}
                  onChange={(event) =>
                    updateForm({
                      pet: { ...form.pet, species: event.target.value as typeof form.pet.species },
                    })
                  }
                />
                <Input
                  label="Raça"
                  name="breed"
                  value={form.pet.breed}
                  onChange={(event) => updateForm({ pet: { ...form.pet, breed: event.target.value } })}
                />
                <Select
                  label="Porte"
                  name="size"
                  options={sizeOptions}
                  value={form.pet.size}
                  onChange={(event) =>
                    updateForm({ pet: { ...form.pet, size: event.target.value as typeof form.pet.size } })
                  }
                />
                <Input
                  label="Idade"
                  name="age"
                  placeholder="Ex.: 3 anos"
                  value={form.pet.age}
                  onChange={(event) => updateForm({ pet: { ...form.pet, age: event.target.value } })}
                />
                <div className="sm:col-span-2">
                  <Textarea
                    label="Observações"
                    name="notes"
                    placeholder="Alergias, medo de secador, corte preferido..."
                    value={form.pet.notes}
                    onChange={(event) => updateForm({ pet: { ...form.pet, notes: event.target.value } })}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Seu nome"
                  name="tutorName"
                  value={form.tutor.name}
                  onChange={(event) => updateForm({ tutor: { ...form.tutor, name: event.target.value } })}
                />
                <Input
                  label="WhatsApp"
                  name="whatsapp"
                  placeholder="(11) 99999-9999"
                  value={form.tutor.whatsapp}
                  onChange={(event) =>
                    updateForm({ tutor: { ...form.tutor, whatsapp: event.target.value } })
                  }
                />
                <div className="sm:col-span-2">
                  <Input
                    label="E-mail"
                    name="email"
                    type="email"
                    value={form.tutor.email}
                    onChange={(event) => updateForm({ tutor: { ...form.tutor, email: event.target.value } })}
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <p className="mb-4 text-sm text-muted">Dias sem horário livre aparecem como lotados.</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {dates.map((date) => {
                    const full = datesStatus[date]
                    return (
                      <button
                        key={date}
                        type="button"
                        disabled={full}
                        onClick={() => updateForm({ date, time: '' })}
                        className={cn(
                          'rounded-2xl border px-2 py-3 text-left text-xs capitalize sm:px-3 sm:py-4 sm:text-sm',
                          full && 'cursor-not-allowed opacity-45',
                          !full && form.date === date && 'border-primary bg-primary-soft',
                          !full && form.date !== date && 'border-line hover:border-primary/40',
                        )}
                      >
                        <span className="sm:hidden">{formatDateShort(date)}</span>
                        <span className="hidden sm:inline">{formatDateLabel(date)}</span>
                        {full ? <span className="mt-1 block text-[10px] uppercase">Lotado</span> : null}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <p className="mb-4 text-sm text-muted">
                  Horários ocupados ou que não cabem os {formatDuration(durationMinutes || 60)} ficam bloqueados.
                </p>
                {freeTimes.length === 0 ? (
                  <p className="rounded-2xl border border-line px-4 py-6 text-sm text-muted">
                    Não há horário livre nesse dia para o tempo escolhido. Volte e escolha outra data.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {dayTimes.map((time) => {
                      const taken = isTimeTaken(form.date, time, durationMinutes || 60, slots)
                      return (
                        <button
                          key={time}
                          type="button"
                          disabled={taken}
                          onClick={() => updateForm({ time })}
                          className={cn(
                            'rounded-2xl border py-3 text-sm font-medium',
                            taken && 'cursor-not-allowed opacity-40',
                            !taken && form.time === time && 'border-primary bg-primary-soft',
                            !taken && form.time !== time && 'border-line hover:border-primary/40',
                          )}
                        >
                          {time}
                          {taken ? <span className="mt-1 block text-[10px] font-normal">Ocupado</span> : null}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {step === 5 && (
              <div className="grid grid-cols-2 gap-3 text-sm leading-6 text-muted">
                <h2 className="col-span-2 text-lg font-semibold text-ink sm:text-xl">Confira o resumo</h2>
                <p>
                  <strong className="text-ink">Pet:</strong> {form.pet.name}
                </p>
                <p className="col-span-2">
                  <strong className="text-ink">Serviços:</strong>{' '}
                  {selectedServices.map((service) => service.name).join(', ') || '—'}
                </p>
                <p className="col-span-2">
                  <strong className="text-ink">Tempo estimado:</strong> {formatDuration(durationMinutes || 60)}
                </p>
                {selectedServices.length > 1 ? (
                  <p className="col-span-2">
                    <strong className="text-ink">A partir de:</strong> {formatCurrency(selectedTotal)}
                  </p>
                ) : null}
                <p>
                  <strong className="text-ink">Data:</strong> {form.date ? formatDateLabel(form.date) : ''}
                </p>
                <p>
                  <strong className="text-ink">Horário:</strong> {form.time}
                </p>
                <p className="col-span-2">
                  <strong className="text-ink">Tutor:</strong> {form.tutor.name}
                </p>
                {error ? <p className="col-span-2 text-sm text-red-400">{error}</p> : null}
              </div>
            )}

            <div className="mt-6 grid grid-cols-2 gap-2 sm:mt-8 sm:flex sm:justify-between">
              <Button variant="outline" className="w-full sm:w-auto" onClick={back} disabled={step === 0 || submitting}>
                Voltar
              </Button>
              {step < 5 ? (
                <Button className="w-full sm:w-auto" onClick={next} disabled={!canContinue}>
                  Continuar
                </Button>
              ) : (
                <Button
                  variant="whatsapp"
                  className="w-full px-3 text-xs sm:w-auto sm:px-5 sm:text-sm"
                  onClick={() => void confirm()}
                  disabled={submitting}
                >
                  {submitting ? 'Reservando...' : 'Confirmar'}
                </Button>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
