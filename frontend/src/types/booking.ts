export const petSpecies = ['cao', 'gato', 'outro'] as const
export type PetSpecies = (typeof petSpecies)[number]

export const petSizes = ['pequeno', 'medio', 'grande'] as const
export type PetSize = (typeof petSizes)[number]

export interface BookingPet {
  name: string
  species: PetSpecies | ''
  breed: string
  size: PetSize | ''
  age: string
  notes: string
}

export interface BookingTutor {
  name: string
  whatsapp: string
  email: string
}

export interface BookingFormData {
  serviceIds: string[]
  pet: BookingPet
  tutor: BookingTutor
  date: string
  time: string
}

export const initialBookingForm: BookingFormData = {
  serviceIds: [],
  pet: {
    name: '',
    species: '',
    breed: '',
    size: '',
    age: '',
    notes: '',
  },
  tutor: {
    name: '',
    whatsapp: '',
    email: '',
  },
  date: '',
  time: '',
}
