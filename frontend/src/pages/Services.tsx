import { Clock } from 'lucide-react'
import { SEO } from '@/components/common/SEO'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { services } from '@/data/services'
import { formatCurrency, formatDuration } from '@/utils/format'
import { buildServiceMessage, openWhatsApp } from '@/services/whatsapp'
import { CTASection } from '@/components/common/CTASection'

export function Services() {
  return (
    <>
      <SEO
        title="Serviços"
        description="Banho, tosa, hidratação e cuidados especiais com preço a partir de e tempo aproximado."
        path="/servicos"
      />
      <section className="pt-10 pb-6">
        <Container>
          <SectionTitle
            eyebrow="Serviços"
            title="Cuidado completo, no tempo certo"
            description="Valores iniciais e duração aproximada. O preço final varia conforme porte, pelagem e o que o pet precisa no dia."
          />
        </Container>
      </section>
      <section className="pb-16">
        <Container className="grid gap-3 sm:gap-6">
          {services.map((service, index) => (
            <article
              key={service.id}
              className="grid grid-cols-[6.5rem_1fr] overflow-hidden rounded-2xl border border-line bg-surface shadow-soft transition-colors duration-300 hover:border-primary/40 sm:grid-cols-1 sm:rounded-[2rem] md:grid-cols-[280px_1fr]"
            >
              <img
                src={service.image}
                alt={`Serviço de ${service.name}`}
                className="h-full min-h-28 w-full object-cover sm:h-56 md:h-full"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              <div className="flex flex-col justify-between p-3 sm:p-6 md:p-8">
                <div>
                  <h2 className="text-base font-semibold text-ink sm:text-2xl">{service.name}</h2>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted sm:mt-3 sm:line-clamp-none sm:text-sm sm:leading-7">
                    {service.description}
                  </p>
                </div>
                <div className="mt-3 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <div>
                    <p className="text-lg font-semibold text-primary sm:text-xl">{formatCurrency(service.priceFrom)}</p>
                    <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-muted sm:text-sm">
                      <Clock size={13} />
                      {formatDuration(service.durationMinutes)}
                    </p>
                  </div>
                  <Button
                    className="h-10 px-3 text-xs sm:h-12 sm:px-5 sm:text-sm"
                    onClick={() => openWhatsApp(buildServiceMessage(service.name))}
                  >
                    Agendar
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </Container>
      </section>
      <CTASection />
    </>
  )
}
