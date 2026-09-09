import { useMemo, useState } from 'react'
import { initialBookingForm, type BookingFormData } from '@/types/booking'

export const bookingSteps = [
  'Serviço',
  'Pet',
  'Tutor',
  'Data',
  'Horário',
  'Confirmação',
] as const

export function useBookingForm() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<BookingFormData>(initialBookingForm)

  const updateForm = (partial: Partial<BookingFormData>) => {
    setForm((current) => ({ ...current, ...partial }))
  }

  const canContinue = useMemo(() => {
    if (step === 0) return form.serviceIds.length > 0
    if (step === 1) {
      return Boolean(
        form.pet.name && form.pet.species && form.pet.breed && form.pet.size && form.pet.age,
      )
    }
    if (step === 2) {
      return Boolean(form.tutor.name && form.tutor.whatsapp && form.tutor.email)
    }
    if (step === 3) return Boolean(form.date)
    if (step === 4) return Boolean(form.time)
    return true
  }, [form, step])

  const next = () => {
    if (canContinue) {
      setStep((current) => Math.min(current + 1, bookingSteps.length - 1))
    }
  }

  const back = () => {
    setStep((current) => Math.max(current - 1, 0))
  }

  return {
    step,
    setStep,
    form,
    updateForm,
    canContinue,
    next,
    back,
  }
}
