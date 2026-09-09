import { ReviewCard } from '@/components/reviews/ReviewCard'
import { Reveal } from '@/components/motion/Reveal'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { reviews } from '@/data/reviews'

export function ReviewsSection() {
  return (
    <section className="py-10 sm:py-20">
      <Container>
        <Reveal>
          <SectionTitle
            className="mb-6 sm:mb-12"
            eyebrow="Avaliações"
            title="O que nossos clientes dizem"
            description="Histórias reais de tutores que já passaram pela AUqMIA Pet."
          />
        </Reveal>
        <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0">
          {reviews.map((review) => (
            <div key={review.id} className="min-w-[78%] snap-start md:min-w-0">
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
