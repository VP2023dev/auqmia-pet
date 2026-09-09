import { Link } from 'react-router-dom'
import { ServiceCard } from '@/components/services/ServiceCard'
import { Reveal } from '@/components/motion/Reveal'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { TiltCard } from '@/components/motion/TiltCard'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { services } from '@/data/services'

export function ServicesSection() {
  return (
    <section className="py-10 sm:py-20" id="servicos">
      <Container>
        <div className="mb-6 flex items-end justify-between gap-4 sm:mb-12">
          <Reveal>
            <SectionTitle
              eyebrow="Serviços"
              title="Nossos serviços"
              description="Do banho rápido à tosa completa. Tudo pensado para o conforto do pet e a rotina do tutor."
            />
          </Reveal>
          <Reveal delay={0.15}>
            <Link to="/servicos" className="shrink-0 text-xs font-semibold text-primary hover:text-primary-dark sm:text-sm">
              Ver todos
            </Link>
          </Reveal>
        </div>
        <Stagger className="grid grid-cols-2 gap-2.5 sm:gap-4 xl:grid-cols-4">
          {services.map((service) => (
            <StaggerItem key={service.id}>
              <TiltCard className="h-full">
                <ServiceCard service={service} />
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}
