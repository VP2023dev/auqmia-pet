import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { InstagramIcon } from '@/components/common/InstagramIcon'
import { Reveal } from '@/components/motion/Reveal'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { contactConfig } from '@/config/contact'
import { openWhatsApp } from '@/services/whatsapp'
import { easeOutExpo } from '@/utils/motion'

export function ContactSection() {
  const reduce = useReducedMotion()

  return (
    <section className="py-10 sm:py-20" id="contato">
      <Container>
        <Reveal>
          <SectionTitle
            className="mb-6 sm:mb-12"
            eyebrow="Contato"
            title="Venha nos visitar ou chame no WhatsApp"
            description="Endereço, horário e canais certos para tirar dúvida ou marcar um horário."
          />
        </Reveal>
        <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:gap-6">
          <div className="rounded-2xl border border-line bg-surface p-4 shadow-soft sm:rounded-3xl sm:p-5">
            <div className="grid grid-cols-2 gap-4 text-sm text-muted">
              <p className="col-span-2 flex items-start gap-2">
                <MapPin className="mt-0.5 shrink-0 text-primary" size={18} />
                {contactConfig.address.full}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="shrink-0 text-primary" size={18} />
                <a href={contactConfig.phoneHref}>{contactConfig.phoneDisplay}</a>
              </p>
              <a
                href={contactConfig.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-primary"
              >
                <InstagramIcon />
                @{contactConfig.instagram}
              </a>
              <p className="col-span-2 flex items-center gap-2 sm:col-span-1">
                <Mail className="shrink-0 text-primary" size={18} />
                <span className="break-all">{contactConfig.email}</span>
              </p>
              <div className="col-span-2 sm:col-span-1">
                <p className="mb-2 flex items-center gap-2 font-medium text-ink">
                  <Clock className="text-primary" size={18} />
                  Horários
                </p>
                <ul className="space-y-1 text-xs sm:text-sm">
                  {contactConfig.hours.map((item) => (
                    <li key={item.days} className="flex justify-between gap-3">
                      <span>{item.days}</span>
                      <span>{item.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Button variant="whatsapp" className="mt-5 w-full" onClick={() => openWhatsApp()}>
              <MessageCircle size={18} />
              Chamar no WhatsApp
            </Button>
          </div>
          <motion.div
            className="overflow-hidden rounded-2xl border border-line bg-surface shadow-soft sm:rounded-[2rem]"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
          >
            <iframe
              title="Mapa da AUqMIA Pet"
              src={contactConfig.mapEmbedUrl}
              className="h-48 w-full border-0 sm:h-[360px] lg:h-full lg:min-h-80"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
