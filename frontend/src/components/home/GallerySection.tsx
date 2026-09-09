import { Gallery } from '@/components/gallery/Gallery'
import { Reveal } from '@/components/motion/Reveal'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { galleryItems } from '@/data/gallery'

export function GallerySection() {
  return (
    <section className="py-10 sm:py-20">
      <Container>
        <Reveal>
          <SectionTitle
            className="mb-6 sm:mb-12"
            eyebrow="Galeria"
            title="O dia a dia da casa"
            description="Pets, banho, tosa e o dia a dia da casa."
          />
        </Reveal>
        <Gallery items={galleryItems} />
      </Container>
    </section>
  )
}
