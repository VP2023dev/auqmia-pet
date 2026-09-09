import { Search } from 'lucide-react'
import { SEO } from '@/components/common/SEO'
import { ProductCard } from '@/components/products/ProductCard'
import { EmptyState } from '@/components/ui/EmptyState'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { productCategoryFilters, products } from '@/data/products'
import { useProductFilters } from '@/hooks/useProductFilters'
import { cn } from '@/utils/cn'

export function Products() {
  const { query, setQuery, category, setCategory, filteredProducts } = useProductFilters(products)

  return (
    <>
      <SEO
        title="Produtos"
        description="Catálogo da AUqMIA Pet com rações, petiscos, brinquedos, higiene e acessórios."
        path="/produtos"
      />
      <section className="pt-10 pb-16">
        <Container>
          <SectionTitle
            className="mb-8"
            eyebrow="Catálogo"
            title="Produtos escolhidos para o dia a dia"
            description="Filtre por categoria ou busque pelo nome. A compra é finalizada pelo WhatsApp, com confirmação de estoque."
          />

          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <label className="relative w-full max-w-md" htmlFor="product-search">
              <Search className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted" size={18} />
              <input
                id="product-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar produto"
                className="h-12 w-full rounded-full border border-line bg-surface pr-4 pl-11 text-sm outline-none focus:border-primary"
              />
            </label>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoria">
              {productCategoryFilters.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setCategory(filter.id)}
                  className={cn(
                    'min-h-10 rounded-full px-3 py-2 text-sm font-medium transition-colors sm:px-4',
                    category === filter.id
                      ? 'bg-primary text-night'
                      : 'bg-surface text-ink hover:bg-primary-soft',
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <EmptyState
              title="Nenhum produto encontrado"
              description="Tente outro termo ou volte para a categoria Todos."
            />
          ) : (
            <div className="grid grid-cols-2 gap-2.5 sm:gap-5 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
