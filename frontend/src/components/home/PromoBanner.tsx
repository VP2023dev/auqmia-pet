import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { weeklyPromotion } from '@/data/promotion'
import { easeOutExpo } from '@/utils/motion'

export function PromoBanner() {
  const reduce = useReducedMotion()

  return (
    <section className="py-4 sm:py-8">
      <Container>
        <motion.div
          className="relative overflow-hidden rounded-[2rem] border border-primary/20 bg-night"
          initial={reduce ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
        >
          <img
            src={weeklyPromotion.image}
            alt="Cão após banho e tosa"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
            loading="lazy"
          />
          <div className="relative flex flex-col gap-5 px-5 py-10 sm:px-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between lg:px-14">
            <div className="max-w-xl text-white">
              <p className="text-xs font-semibold tracking-[0.18em] text-secondary uppercase">
                {weeklyPromotion.badge}
              </p>
              <h2 className="mt-3 font-serif text-2xl font-semibold tracking-tight sm:text-3xl">{weeklyPromotion.title}</h2>
              <p className="mt-3 text-sm leading-6 text-white/80">{weeklyPromotion.description}</p>
            </div>
            <Link to="/agendamento" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                {weeklyPromotion.ctaLabel}
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
