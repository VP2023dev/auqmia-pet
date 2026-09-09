import { Link } from 'react-router-dom'
import { SEO } from '@/components/common/SEO'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export function NotFound() {
  return (
    <>
      <SEO
        title="Página não encontrada"
        description="A página que você tentou abrir não existe na AUqMIA Pet."
        path="/404"
      />
      <section className="py-24">
        <Container className="max-w-xl text-center">
          <p className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">404</p>
          <h1 className="mt-4 font-serif text-4xl font-semibold text-ink">Essa página saiu para passear</h1>
          <p className="mt-4 text-sm leading-7 text-muted">
            O endereço não existe ou foi movido. Volte para a página inicial ou fale com a gente para agendar um
            horário.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-2 sm:flex sm:justify-center sm:gap-3">
            <Link to="/">
              <Button className="w-full">Início</Button>
            </Link>
            <Link to="/agendamento">
              <Button variant="outline" className="w-full">
                Agendar
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
