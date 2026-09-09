import type { Service } from '@/types/service'

export const services: Service[] = [
  {
    id: 'banho',
    name: 'Banho',
    shortDescription: 'Higienização completa com produtos adequados à pele do seu pet.',
    description:
      'Banho com água na temperatura certa, shampoo selecionado por tipo de pelagem e secagem cuidadosa. O objetivo é deixar o pet limpo, confortável e sem estresse.',
    priceFrom: 35,
    durationMinutes: 45,
    icon: 'bath',
    image:
      'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=900&q=80',
    featured: true,
  },
  {
    id: 'tosa',
    name: 'Tosa',
    shortDescription: 'Corte alinhado ao porte, à raça e ao estilo que você prefere.',
    description:
      'Tosa feita com calma, tesoura e máquina, respeitando o volume da pelagem e o conforto do animal. Indicada para manter higiene, beleza e praticidade no dia a dia.',
    priceFrom: 50,
    durationMinutes: 60,
    icon: 'scissors',
    image:
      'https://images.unsplash.com/photo-1516732409414-9683dcf0070f?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'banho-tosa',
    name: 'Banho + Tosa',
    shortDescription: 'O combo mais pedido: limpeza, corte e acabamento no mesmo horário.',
    description:
      'Banho, tosa e finalização em um único atendimento. Ideal para quem quer sair com o pet cheiroso, com a pelagem no ponto e sem precisar marcar dois horários.',
    priceFrom: 75,
    durationMinutes: 90,
    icon: 'combo',
    image:
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80',
    featured: true,
  },
  {
    id: 'tosa-higienica',
    name: 'Tosa higiênica',
    shortDescription: 'Acabamento nas áreas sensíveis para mais higiene e conforto.',
    description:
      'Corte pontual em patas, barriga, região íntima e ao redor dos olhos. Uma opção prática entre as tosas completas, especialmente no calor.',
    priceFrom: 30,
    durationMinutes: 30,
    icon: 'hygiene',
    image:
      'https://images.unsplash.com/photo-1583336663277-620dc1996580?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'corte-unhas',
    name: 'Corte de unhas',
    shortDescription: 'Corte seguro, sem pressa e com contenção gentil.',
    description:
      'Aparação das unhas com atenção à veia e ao formato da pata. Evita desconforto ao andar, riscos em casa e acúmulo de sujeira.',
    priceFrom: 15,
    durationMinutes: 15,
    icon: 'nails',
    image:
      'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'hidratacao',
    name: 'Hidratação',
    shortDescription: 'Tratamento para pelagem ressecada, opaca ou com nós frequentes.',
    description:
      'Máscara hidratante aplicada após o banho para devolver maciez e brilho. Recomendada para pets de pelo longo ou que passam por tosas regulares.',
    priceFrom: 25,
    durationMinutes: 25,
    icon: 'hydration',
    image:
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'limpeza-ouvido',
    name: 'Limpeza de ouvido',
    shortDescription: 'Higienização delicada para prevenir odor e acúmulo de cera.',
    description:
      'Limpeza externa do conduto auditivo com produto apropriado. Um cuidado simples que ajuda a manter o pet mais confortável entre as consultas veterinárias.',
    priceFrom: 18,
    durationMinutes: 15,
    icon: 'ears',
    image:
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=900&q=80',
  },
]

export function getServiceById(id: string): Service | undefined {
  return services.find((service) => service.id === id)
}

export function getServicesByIds(ids: string[]): Service[] {
  return services.filter((service) => ids.includes(service.id))
}
