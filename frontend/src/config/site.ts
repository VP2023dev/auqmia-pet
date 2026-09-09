export const siteConfig = {
  name: 'AUqMIA Pet',
  shortName: 'AUqMIA',
  serviceLine: 'Banho & Tosa',
  tagline: 'Cuidado que transforma o dia do seu pet.',
  description:
    'Pet shop especializado em banho e tosa, com atendimento próximo e ambiente preparado para o bem-estar animal.',
  url: 'https://auqmiapet.com.br',
  defaultTitle: 'AUqMIA Pet | Banho e tosa com cuidado, carinho e atenção',
} as const

export const siteFeatures = {
  store: false,
} as const

const allNavLinks = [
  { label: 'Home', href: '/' },
  { label: 'Serviços', href: '/servicos' },
  { label: 'Produtos', href: '/produtos' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Contato', href: '/contato' },
] as const

export const navLinks = siteFeatures.store
  ? allNavLinks
  : allNavLinks.filter((link) => link.href !== '/produtos')
