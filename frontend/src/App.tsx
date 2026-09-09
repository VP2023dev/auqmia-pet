import { BrowserRouter } from 'react-router-dom'
import { CinematicIntro } from '@/components/motion/CinematicIntro'
import { AppRoutes } from '@/routes/AppRoutes'

export default function App() {
  return (
    <BrowserRouter>
      <CinematicIntro />
      <AppRoutes />
    </BrowserRouter>
  )
}
