import { MessageCircle } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { openWhatsApp } from '@/services/whatsapp'
import { easeOutExpo } from '@/utils/motion'

interface CTASectionProps {
  title?: string
  description?: string
  buttonLabel?: string
}

export function CTASection({
  title = 'Seu pet merece esse cuidado.',
  description = 'Escolha o horário, conte um pouco sobre o seu pet e confirme tudo pelo WhatsApp.',
  buttonLabel = 'Agendar pelo WhatsApp',
}: CTASectionProps) {
  const reduce = useReducedMotion()

  return (
    <section className="py-8 sm:py-20">
      <Container>
        <motion.div
          className="relative overflow-hidden rounded-[1.6rem] border border-primary/20 bg-night px-5 py-10 text-white sm:rounded-[2rem] sm:px-10 sm:py-12 lg:px-14"
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
        >
          <div aria-hidden="true" className="absolute -top-16 -right-10 h-36 w-36 rounded-full bg-primary/25 blur-3xl animate-orb md:h-48 md:w-48" />
          <div className="relative flex max-w-2xl flex-col items-start gap-3 sm:gap-6">
            <p className="text-xs font-semibold tracking-[0.18em] text-secondary uppercase">Agendamento</p>
            <h2 className="font-serif text-2xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
            <p className="text-sm leading-7 text-white/70 sm:text-base">{description}</p>
            <Button variant="whatsapp" size="lg" className="w-full sm:w-auto" onClick={() => openWhatsApp()}>
              <MessageCircle size={18} />
              {buttonLabel}
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
