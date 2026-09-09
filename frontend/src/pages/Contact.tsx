import { SEO } from '@/components/common/SEO'
import { ContactSection } from '@/components/home/ContactSection'
import { CTASection } from '@/components/common/CTASection'

export function Contact() {
  return (
    <>
      <SEO
        title="Contato"
        description="WhatsApp, Instagram, telefone, endereço e horário de atendimento da AUqMIA Pet."
        path="/contato"
      />
      <ContactSection />
      <CTASection />
    </>
  )
}
