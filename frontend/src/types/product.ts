export const productCategories = [
  'todos',
  'racoes',
  'petiscos',
  'brinquedos',
  'higiene',
  'acessorios',
] as const

export type ProductCategory = (typeof productCategories)[number]

export interface Product {
  id: string
  name: string
  category: Exclude<ProductCategory, 'todos'>
  categoryLabel: string
  price: number
  image: string
  description: string
  featured?: boolean
}
