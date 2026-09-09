export const contactConfig = {
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '5517991667925',
  whatsappDefaultMessage: [
    '✨ *AUqMIA Pet*',
    '━━━━━━━━━━━━━━━━',
    'Olá! Vim pelo site e gostaria de *agendar um horário* para meu pet.',
    '',
    'Pode me passar as opções, por favor?',
  ].join('\n'),
  phoneDisplay: '(17) 99166-7925',
  phoneHref: 'tel:+5517991667925',
  email: 'contato@auqmiapet.com.br',
  instagram: 'auqmia.pet',
  instagramUrl: 'https://instagram.com/auqmia.pet',
  address: {
    street: 'Rua José Brites Figueiredo, 6229',
    neighborhood: 'Próximo à rodoviária',
    city: 'Auriflama',
    state: 'SP',
    zip: '15350-000',
    full: 'Rua José Brites Figueiredo, 6229 — próximo à rodoviária, Auriflama — SP',
  },
  mapEmbedUrl:
    'https://maps.google.com/maps?q=Rua%20Jos%C3%A9%20Brites%20Figueiredo%2C%206229%2C%20Auriflama%2C%20SP&t=&z=16&ie=UTF8&iwloc=&output=embed',
  hours: [
    { days: 'Segunda a Sexta', time: '08:00 às 18:00' },
    { days: 'Sábado', time: '08:00 às 14:00' },
    { days: 'Domingo', time: 'Fechado' },
  ],
} as const
