import { useMemo, useState } from 'react'
import type { Product, ProductCategory } from '@/types/product'

export function useProductFilters(products: Product[]) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<ProductCategory>('todos')

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return products.filter((product) => {
      const matchesCategory = category === 'todos' || product.category === category
      const matchesQuery =
        normalizedQuery.length === 0 ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery)

      return matchesCategory && matchesQuery
    })
  }, [products, query, category])

  return {
    query,
    setQuery,
    category,
    setCategory,
    filteredProducts,
  }
}
