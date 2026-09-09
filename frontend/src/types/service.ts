export interface Service {
  id: string
  name: string
  shortDescription: string
  description: string
  priceFrom: number
  durationMinutes: number
  icon: 'bath' | 'scissors' | 'combo' | 'hygiene' | 'nails' | 'hydration' | 'ears'
  image: string
  featured?: boolean
}
