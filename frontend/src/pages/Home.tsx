import { AboutPreview } from '@/components/home/AboutPreview'
import { ContactSection } from '@/components/home/ContactSection'
import { DifferentialsSection } from '@/components/home/DifferentialsSection'
import { GallerySection } from '@/components/home/GallerySection'
import { Hero } from '@/components/home/Hero'
import { PromoBanner } from '@/components/home/PromoBanner'
import { ReviewsSection } from '@/components/home/ReviewsSection'
import { ServicesSection } from '@/components/home/ServicesSection'
import { CTASection } from '@/components/common/CTASection'
import { SEO } from '@/components/common/SEO'
import { Marquee } from '@/components/motion/Marquee'
import { ScrollProgress } from '@/components/motion/ScrollProgress'
import { services } from '@/data/services'

export function Home() {
  return (
    <>
      <SEO
        title="AUqMIA Pet | Banho e tosa com cuidado, carinho e atenção"
        description="Banho, tosa e agendamento fácil em um pet shop moderno. Conheça a AUqMIA Pet."
        path="/"
      />
      <ScrollProgress />
      <Hero />
      <Marquee items={services.map((service) => service.name)} />
      <ServicesSection />
      <DifferentialsSection />
      <CTASection />
      <PromoBanner />
      <AboutPreview />
      <ReviewsSection />
      <GallerySection />
      <ContactSection />
    </>
  )
}
