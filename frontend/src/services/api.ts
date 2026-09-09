import axios from 'axios'
import type { Product } from '@/types/product'
import type { Service } from '@/types/service'

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const productService = {
  list: () => api.get<PaginatedResponse<Product>>('/products/'),
  getById: (id: string) => api.get<Product>(`/products/${id}/`),
}

export const serviceService = {
  list: () => api.get<PaginatedResponse<Service>>('/services/'),
}

export interface BookedSlotPayload {
  date: string
  time: string
  duration_minutes: number
}

export interface PublicBookingPayload {
  service_names: string[]
  duration_minutes: number
  pet_name: string
  species: string
  breed: string
  size: string
  age?: string
  notes?: string
  tutor_name: string
  phone: string
  email: string
  appointment_date: string
  appointment_time: string
}

export const appointmentService = {
  availability: () => api.get<{ slots: BookedSlotPayload[] }>('/appointments/availability/'),
  book: (payload: PublicBookingPayload) => api.post('/appointments/book/', payload),
}

export const customerService = {
  create: (payload: { name: string; email: string; phone: string }) =>
    api.post('/customers/', payload),
}

export const petService = {
  create: (payload: {
    customer: number
    name: string
    species: string
    breed: string
    size: string
    notes?: string
  }) => api.post('/pets/', payload),
}
