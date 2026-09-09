export interface BookedSlot {
  date: string
  time: string
  durationMinutes: number
}

function parseMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

function toTimeLabel(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

export function isSaturday(isoDate: string): boolean {
  return new Date(`${isoDate}T00:00:00`).getDay() === 6
}

export function getOpeningMinutes(): number {
  return 8 * 60
}

export function getClosingMinutes(isoDate: string): number {
  return isSaturday(isoDate) ? 14 * 60 : 18 * 60
}

export function getAvailableDates(days = 14): string[] {
  const dates: string[] = []
  const cursor = new Date()

  while (dates.length < days) {
    cursor.setDate(cursor.getDate() + 1)
    const weekday = cursor.getDay()
    if (weekday === 0) continue

    const year = cursor.getFullYear()
    const month = String(cursor.getMonth() + 1).padStart(2, '0')
    const day = String(cursor.getDate()).padStart(2, '0')
    dates.push(`${year}-${month}-${day}`)
  }

  return dates
}

export function getDayTimes(isoDate: string): string[] {
  const lastStart = getClosingMinutes(isoDate) - 60
  const times: string[] = []

  for (let minutes = getOpeningMinutes(); minutes <= lastStart; minutes += 60) {
    times.push(toTimeLabel(minutes))
  }

  return times
}

export function slotsOverlap(
  startA: string,
  durationA: number,
  startB: string,
  durationB: number,
): boolean {
  const aStart = parseMinutes(startA)
  const aEnd = aStart + durationA
  const bStart = parseMinutes(startB)
  const bEnd = bStart + durationB
  return aStart < bEnd && aEnd > bStart
}

export function isTimeTaken(
  isoDate: string,
  time: string,
  durationMinutes: number,
  booked: BookedSlot[],
): boolean {
  const start = parseMinutes(time)
  const end = start + durationMinutes
  if (end > getClosingMinutes(isoDate)) return true

  return booked
    .filter((slot) => slot.date === isoDate)
    .some((slot) => slotsOverlap(time, durationMinutes, slot.time, slot.durationMinutes))
}

export function getAvailableTimes(
  isoDate: string,
  booked: BookedSlot[] = [],
  durationMinutes = 60,
): string[] {
  return getDayTimes(isoDate).filter((time) => !isTimeTaken(isoDate, time, durationMinutes, booked))
}

export function getOccupiedTimes(
  isoDate: string,
  booked: BookedSlot[] = [],
  durationMinutes = 60,
): string[] {
  return getDayTimes(isoDate).filter((time) => isTimeTaken(isoDate, time, durationMinutes, booked))
}
