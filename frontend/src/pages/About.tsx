import { SEO } from '@/components/common/SEO'
import { CTASection } from '@/components/common/CTASection'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'

export function About() {
  return (
    <>
      <SEO
        title="Sobre"
        description="Conheça a AUqMIA Pet: um pet shop criado para oferecer carinho e cuidado em cada banho e tosa."
        path="/sobre"
      />
      <section className="pt-10 pb-16">
        <Container className="grid items-start gap-6 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <SectionTitle
              eyebrow="Quem somos"
              title="Feito para o pet se sentir seguro — e o tutor, também"
              description="A AUqMIA Pet é um espaço novo, aberto para ser o endereço de confiança da vizinhança: banho e tosa com tempo de verdade para cada pet."
            />
            <div className="mt-8 space-y-4 text-sm leading-7 text-muted">
              <p>
                O nome AUqMIA junta o AU do cachorro e o MIA do gato — a nossa forma de dizer alquimia: transformar o
                banho e a tosa em um momento calmo, elegante e bem feito.
              </p>
              <p>
                A ideia nasceu da vontade de juntar técnica e calma. Muitos salões correm. Aqui o horário é de verdade:
                o pet não entra numa fila invisível e o tutor sabe o que está acontecendo.
              </p>
              <p>
                A equipe soma mais de oito anos em banho, tosa e atendimento. A casa é recente, o cuidado não. Usamos
                no banho o que aceitaríamos na pele do próprio animal e mantemos o ambiente limpo entre um atendimento e
                outro.
              </p>
              <p>
                Se você procura um lugar para deixar o cão ou o gato sem aquele aperto no peito, venha conhecer a casa.
                Pode olhar o espaço, tirar dúvida e agendar o primeiro horário sem compromisso.
              </p>
            </div>
          </div>
          <div className="order-1 grid grid-cols-2 gap-3 lg:order-2 lg:grid-cols-1">
            <img
              src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1100&q=80"
              alt="Área de banho da AUqMIA Pet"
              className="h-40 w-full rounded-2xl border border-primary/20 object-cover shadow-card sm:h-72 sm:rounded-[2rem]"
            />
            <img
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1100&q=80"
              alt="Pets felizes após o atendimento"
              className="h-40 w-full rounded-2xl border border-primary/20 object-cover shadow-card sm:h-56 sm:rounded-[2rem]"
              loading="lazy"
            />
          </div>
        </Container>
      </section>
      <CTASection
        title="Quer conhecer a loja antes de agendar?"
        description="Chame no WhatsApp e combinamos um horário para você visitar o espaço com o seu pet."
      />
    </>
  )
}
