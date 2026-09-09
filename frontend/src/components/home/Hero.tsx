import { Link } from 'react-router-dom'
import { ArrowRight, Star } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { GoldField } from '@/components/motion/GoldField'
import { SplitHeading } from '@/components/motion/SplitHeading'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { easeOutExpo } from '@/utils/motion'

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-12 sm:pb-20">
      <GoldField />
      <Container className="relative grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: easeOutExpo }}
            className="mb-4 inline-flex items-center rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase"
          >
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            Pet shop recém-inaugurado
          </motion.p>
          <SplitHeading
            text="Seu pet merece cuidado, carinho e atenção."
            className="max-w-xl font-serif text-[2rem] leading-tight font-semibold tracking-tight text-ink sm:text-5xl lg:text-[3.4rem] lg:leading-[1.1]"
            delay={0.08}
          />
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: easeOutExpo }}
            className="mt-4 max-w-lg text-sm leading-7 text-muted sm:mt-5 sm:text-lg"
          >
            Banho, tosa e serviços especiais para deixar seu melhor amigo ainda mais feliz.
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.58, ease: easeOutExpo }}
            className="mt-5 grid grid-cols-2 gap-2 sm:mt-8 sm:flex sm:gap-3"
          >
            <Link to="/agendamento">
              <Button size="lg" className="w-full px-3 text-xs sm:w-auto sm:px-6 sm:text-base">
                Agendar agora
                <ArrowRight size={16} className="hidden sm:inline" />
              </Button>
            </Link>
            <Link to="/servicos">
              <Button size="lg" variant="outline" className="w-full px-3 text-xs sm:w-auto sm:px-6 sm:text-base">
                Serviços
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="relative">
          <div className="absolute -inset-3 hidden rounded-[2.4rem] border border-primary/30 lg:block" />
          <motion.div
            className="overflow-hidden rounded-[1.6rem] border border-primary/20 shadow-card sm:rounded-[2rem]"
            initial={reduce ? false : { opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: easeOutExpo }}
          >
            <img
              src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=900&q=70"
              alt="Cão golden retriever descansando em um ambiente claro e aconchegante"
              className="h-[200px] w-full object-cover sm:h-[420px] lg:h-[520px]"
            />
          </motion.div>
          <motion.div
            className="absolute right-3 bottom-3 left-3 rounded-2xl bg-surface/95 p-3 shadow-soft sm:right-auto sm:bottom-6 sm:left-6 sm:w-56 sm:p-4"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.35, ease: easeOutExpo }}
          >
            <div className="flex items-center gap-1 text-secondary">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} size={14} fill="currentColor" />
              ))}
            </div>
            <p className="mt-2 text-sm font-semibold text-ink">Avaliação 4.9</p>
            <p className="text-xs text-muted">Atendimento próximo e sem pressa.</p>
          </motion.div>
          <img
            src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=320&q=70"
            alt="Gato atento olhando para a câmera"
            className="absolute -top-3 right-3 hidden h-24 w-24 rounded-3xl object-cover shadow-card ring-4 ring-background md:block lg:h-32 lg:w-32"
          />
        </div>
      </Container>
    </section>
  )
}
