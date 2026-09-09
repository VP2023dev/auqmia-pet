import { Link } from 'react-router-dom'
import { CountUp } from '@/components/motion/CountUp'
import { Reveal } from '@/components/motion/Reveal'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'

const stats = [
  { value: 8, suffix: '+', decimals: 0, label: 'anos de experiência da equipe' },
  { value: 120, suffix: '+', decimals: 0, label: 'pets atendidos no primeiro mês' },
  { value: 4.9, suffix: '', decimals: 1, label: 'média das avaliações' },
]

export function AboutPreview() {
  return (
    <section className="py-10 sm:py-20">
      <Container className="grid items-center gap-6 lg:grid-cols-2 lg:gap-16">
        <div className="overflow-hidden rounded-[1.6rem] border border-primary/20 shadow-card sm:rounded-[2rem]">
          <img
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=70"
            alt="Fachada e movimento da AUqMIA Pet com cães no ambiente externo"
            className="h-[180px] w-full object-cover sm:h-[380px] lg:h-[460px]"
            loading="lazy"
          />
        </div>
        <div>
          <Reveal>
            <SectionTitle
              eyebrow="Quem somos"
              title="Um espaço novo, com jeito de casa de confiança"
              description="A AUqMIA Pet foi criada para oferecer carinho e cuidado de verdade. Não somos uma esteira de banho: cada horário tem tempo real para o animal."
            />
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 text-sm leading-7 text-muted">
              A loja é recente, mas a equipe já passou por salões, clínicas e atendimento em casa. Unimos isso em um
              ambiente limpo, claro e fácil de chegar — para o tutor acompanhar se quiser, e o pet se sentir seguro.
            </p>
          </Reveal>
          <Stagger className="mt-8 grid grid-cols-3 gap-2 sm:gap-3" delay={0.15}>
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="rounded-2xl bg-surface px-2 py-3 text-center shadow-soft sm:px-3 sm:py-4">
                  <p className="font-serif text-xl font-semibold text-primary sm:text-2xl">
                    <CountUp value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                  </p>
                  <p className="mt-1 text-[10px] leading-4 text-muted sm:text-[11px]">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.2}>
            <Link to="/sobre" className="mt-8 inline-block">
              <Button variant="outline">Conhecer a casa</Button>
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
