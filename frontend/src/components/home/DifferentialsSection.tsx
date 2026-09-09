import { Award, CalendarDays, Clock, Heart, HouseHeart, ShieldCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { Reveal } from '@/components/motion/Reveal'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { differentials } from '@/data/differentials'
import { easeOutExpo } from '@/utils/motion'

const iconMap: Record<(typeof differentials)[number]['icon'], LucideIcon> = {
  heart: Heart,
  award: Award,
  shield: ShieldCheck,
  house: HouseHeart,
  clock: Clock,
  calendar: CalendarDays,
}

export function DifferentialsSection() {
  const reduce = useReducedMotion()

  return (
    <section className="py-10 sm:py-20">
      <Container className="grid items-center gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <SectionTitle
            eyebrow="Diferenciais"
            title="Por que escolher nosso Pet Shop?"
            description="A AUqMIA Pet nasceu para ser o lugar em que o tutor deixa o animal com tranquilidade — e o pet sai melhor do que entrou."
          />
          <motion.div
            className="mt-8 overflow-hidden rounded-[2rem] border border-primary/20 shadow-card"
            initial={reduce ? false : { opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: easeOutExpo }}
          >
            <img
              src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=70"
              alt="Tutor ao lado do cão no ambiente da loja"
              className="h-52 w-full object-cover sm:h-72"
              loading="lazy"
            />
          </motion.div>
        </Reveal>
        <Stagger className="grid grid-cols-2 gap-2.5 sm:gap-4" delay={0.1}>
          {differentials.map((item) => {
            const Icon = iconMap[item.icon]
            return (
              <StaggerItem key={item.id}>
                <motion.article
                  className="rounded-2xl bg-surface p-3 shadow-soft sm:rounded-3xl sm:p-5"
                  whileHover={reduce ? undefined : { y: -6, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                >
                  <motion.span
                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-secondary-soft text-secondary-dark sm:h-11 sm:w-11 sm:rounded-2xl"
                    whileHover={reduce ? undefined : { rotate: 12, scale: 1.08 }}
                  >
                    <Icon size={20} />
                  </motion.span>
                  <h3 className="mt-2 text-sm font-semibold text-ink sm:mt-4 sm:text-base">{item.title}</h3>
                  <p className="mt-1 line-clamp-3 text-xs leading-5 text-muted sm:mt-2 sm:text-sm sm:leading-6">
                    {item.description}
                  </p>
                </motion.article>
              </StaggerItem>
            )
          })}
        </Stagger>
      </Container>
    </section>
  )
}
