import { Button } from '@/components/ui/Button'
import type { Product } from '@/types/product'
import { formatCurrency } from '@/utils/format'
import { buildProductMessage, openWhatsApp } from '@/services/whatsapp'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-soft transition-colors duration-300 hover:border-primary/45 sm:rounded-3xl">
      <div className="aspect-[4/3] overflow-hidden bg-primary-soft">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <p className="text-[10px] font-medium tracking-wide text-primary uppercase sm:text-xs">
          {product.categoryLabel}
        </p>
        <h3 className="mt-1 text-sm font-semibold text-ink sm:mt-2 sm:text-lg">{product.name}</h3>
        <p className="mt-2 text-sm font-semibold text-secondary-dark sm:mt-3 sm:text-lg">
          {formatCurrency(product.price)}
        </p>
        <Button
          className="mt-3 h-10 px-3 text-[11px] sm:mt-5 sm:h-12 sm:text-sm"
          variant="whatsapp"
          onClick={() => openWhatsApp(buildProductMessage(product.name))}
        >
          <span className="sm:hidden">WhatsApp</span>
          <span className="hidden sm:inline">Comprar pelo WhatsApp</span>
        </Button>
      </div>
    </article>
  )
}
