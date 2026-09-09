import { Link } from 'react-router-dom'
import { ProductCard } from '@/components/products/ProductCard'
import { Reveal } from '@/components/motion/Reveal'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { TiltCard } from '@/components/motion/TiltCard'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { products } from '@/data/products'

export function FeaturedProducts() {
  const featured = products.filter((product) => product.featured)

  return (
    <section className="py-10 sm:py-20">
      <Container>
        <div className="mb-6 flex items-end justify-between gap-4 sm:mb-12">
          <Reveal>
            <SectionTitle
              eyebrow="Loja"
              title="Produtos em destaque"
              description="Itens que usamos e indicamos: alimentação, higiene e acessórios para o dia a dia."
            />
          </Reveal>
          <Reveal delay={0.12}>
            <Link to="/produtos" className="shrink-0 text-xs font-semibold text-primary hover:text-primary-dark sm:text-sm">
              Ver catálogo
            </Link>
          </Reveal>
        </div>
        <Stagger className="grid grid-cols-2 gap-2.5 sm:gap-5 xl:grid-cols-3">
          {featured.map((product) => (
            <StaggerItem key={product.id}>
              <TiltCard className="h-full">
                <ProductCard product={product} />
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}
