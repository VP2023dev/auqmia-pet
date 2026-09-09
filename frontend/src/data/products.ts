import type { Product } from '@/types/product'

export const products: Product[] = [
  {
    id: 'racao-premium',
    name: 'Ração Premium Adulto',
    category: 'racoes',
    categoryLabel: 'Rações',
    price: 189.9,
    image:
      'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=800&q=80',
    description: 'Fórmula completa para cães adultos, com proteína de qualidade e equilíbrio nutricional.',
    featured: true,
  },
  {
    id: 'petisco-natural',
    name: 'Petisco natural assado',
    category: 'petiscos',
    categoryLabel: 'Petiscos',
    price: 24.9,
    image:
      'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80',
    description: 'Petisco crocante, sem corante artificial, para treinos e momentos de carinho.',
    featured: true,
  },
  {
    id: 'brinquedo-corda',
    name: 'Brinquedo de corda',
    category: 'brinquedos',
    categoryLabel: 'Brinquedos',
    price: 32.0,
    image:
      'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?auto=format&fit=crop&w=800&q=80',
    description: 'Corda resistente para puxar, mastigar e gastar energia dentro de casa.',
    featured: true,
  },
  {
    id: 'coleira-ajustavel',
    name: 'Coleira ajustável',
    category: 'acessorios',
    categoryLabel: 'Acessórios',
    price: 49.9,
    image:
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
    description: 'Coleira com fivela segura e acabamento macio no pescoço.',
    featured: true,
  },
  {
    id: 'cama-pet',
    name: 'Cama para pet',
    category: 'acessorios',
    categoryLabel: 'Acessórios',
    price: 159.0,
    image:
      'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80',
    description: 'Cama alta e lavável, com tecido aconchegante para descanso diário.',
    featured: true,
  },
  {
    id: 'shampoo-pelos',
    name: 'Shampoo para pelagem',
    category: 'higiene',
    categoryLabel: 'Higiene',
    price: 39.9,
    image:
      'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80',
    description: 'Shampoo de pH equilibrado, indicado para uso frequente sem ressecar a pele.',
    featured: true,
  },
  {
    id: 'racao-filhote',
    name: 'Ração para filhotes',
    category: 'racoes',
    categoryLabel: 'Rações',
    price: 164.5,
    image:
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80',
    description: 'Nutrição para a fase de crescimento, com porções fáceis de digerir.',
  },
  {
    id: 'bolinha-interativa',
    name: 'Bolinha interativa',
    category: 'brinquedos',
    categoryLabel: 'Brinquedos',
    price: 27.5,
    image:
      'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?auto=format&fit=crop&w=800&q=80',
    description: 'Brinquedo leve para buscar e estimular o olfato em ambientes internos.',
  },
]

export const productCategoryFilters: Array<{
  id: Product['category'] | 'todos'
  label: string
}> = [
  { id: 'todos', label: 'Todos' },
  { id: 'racoes', label: 'Rações' },
  { id: 'petiscos', label: 'Petiscos' },
  { id: 'brinquedos', label: 'Brinquedos' },
  { id: 'higiene', label: 'Higiene' },
  { id: 'acessorios', label: 'Acessórios' },
]
