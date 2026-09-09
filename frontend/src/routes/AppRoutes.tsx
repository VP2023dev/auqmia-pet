import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Loading } from '@/components/ui/Loading'
import { siteFeatures } from '@/config/site'
import { MainLayout } from '@/layouts/MainLayout'
import { Home } from '@/pages/Home'

const Services = lazy(() => import('@/pages/Services').then((module) => ({ default: module.Services })))
const Products = lazy(() => import('@/pages/Products').then((module) => ({ default: module.Products })))
const About = lazy(() => import('@/pages/About').then((module) => ({ default: module.About })))
const Contact = lazy(() => import('@/pages/Contact').then((module) => ({ default: module.Contact })))
const Booking = lazy(() => import('@/pages/Booking').then((module) => ({ default: module.Booking })))
const NotFound = lazy(() => import('@/pages/NotFound').then((module) => ({ default: module.NotFound })))

export function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/servicos" element={<Services />} />
          <Route
            path="/produtos"
            element={siteFeatures.store ? <Products /> : <Navigate to="/" replace />}
          />
          <Route path="/sobre" element={<About />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/agendamento" element={<Booking />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
