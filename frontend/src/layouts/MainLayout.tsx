import { Outlet } from 'react-router-dom'
import { ScrollToTop } from '@/components/common/ScrollToTop'
import { WhatsAppButton } from '@/components/common/WhatsAppButton'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'

export function MainLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 pb-20 sm:pb-8">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
