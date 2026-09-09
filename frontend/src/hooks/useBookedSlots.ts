import { useCallback, useEffect, useState } from 'react'
import { appointmentService } from '@/services/api'
import type { BookedSlot } from '@/utils/schedule'

const STORAGE_KEY = 'auqmia-booked-slots-v2'

function readLocalSlots(): BookedSlot[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as BookedSlot[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeLocalSlots(slots: BookedSlot[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(slots))
}

function mergeSlots(...lists: BookedSlot[][]): BookedSlot[] {
  const map = new Map<string, BookedSlot>()
  for (const list of lists) {
    for (const slot of list) {
      map.set(`${slot.date}-${slot.time}-${slot.durationMinutes}`, slot)
    }
  }
  return [...map.values()]
}

export function useBookedSlots() {
  const [slots, setSlots] = useState<BookedSlot[]>(() => readLocalSlots())

  const refresh = useCallback(async () => {
    const local = readLocalSlots()
    try {
      const { data } = await appointmentService.availability()
      const remote = data.slots.map((slot) => ({
        date: slot.date,
        time: slot.time.slice(0, 5),
        durationMinutes: slot.duration_minutes,
      }))
      writeLocalSlots(remote)
      setSlots(remote)
    } catch {
      setSlots(local)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const addSlot = useCallback((slot: BookedSlot) => {
    setSlots((current) => {
      const next = mergeSlots(current, [slot])
      writeLocalSlots(next)
      return next
    })
  }, [])

  return { slots, refresh, addSlot }
}
