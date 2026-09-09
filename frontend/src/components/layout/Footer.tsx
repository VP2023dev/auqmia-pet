import { Link } from 'react-router-dom'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { Logo } from '@/components/common/Logo'
import { Container } from '@/components/ui/Container'
import { contactConfig } from '@/config/contact'
import { navLinks } from '@/config/site'
import { services } from '@/data/services'
import { InstagramIcon } from '@/components/common/InstagramIcon'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-primary/20 bg-night text-white">
      <Container className="grid grid-cols-2 gap-x-6 gap-y-8 py-10 sm:py-14 lg:grid-cols-4">
        <div className="col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-3 max-w-md text-sm leading-6 text-white/65">
            Banho e tosa com critério. Um espaço novo, com equipe que já vive isso há anos.
          </p>
          <a
            href={contactConfig.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
            aria-label="Instagram da AUqMIA Pet"
          >
            <InstagramIcon />
            @{contactConfig.instagram}
          </a>
        </div>

        <div>
          <h2 className="text-xs font-semibold tracking-wide uppercase sm:text-sm">Links rápidos</h2>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/agendamento" className="hover:text-white">
                Agendamento
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold tracking-wide uppercase sm:text-sm">Serviços</h2>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            {services.slice(0, 5).map((service) => (
              <li key={service.id}>
                <Link to="/servicos" className="hover:text-white">
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 grid grid-cols-2 gap-4 text-sm text-white/70 lg:col-span-1 lg:grid-cols-1 lg:gap-3">
          <h2 className="col-span-2 text-xs font-semibold tracking-wide text-white uppercase sm:text-sm lg:col-span-1">
            Contato
          </h2>
          <p className="col-span-2 flex items-start gap-2 lg:col-span-1">
            <MapPin size={16} className="mt-0.5 shrink-0" />
            <span>{contactConfig.address.full}</span>
          </p>
          <p className="flex items-center gap-2">
            <Phone size={16} className="shrink-0" />
            {contactConfig.phoneDisplay}
          </p>
          <p className="flex items-center gap-2 break-all">
            <Mail size={16} className="shrink-0" />
            {contactConfig.email}
          </p>
          <p className="col-span-2 flex items-start gap-2 lg:col-span-1">
            <Clock size={16} className="mt-0.5 shrink-0" />
            <span>
              {contactConfig.hours[0].days}: {contactConfig.hours[0].time}
              <br />
              {contactConfig.hours[1].days}: {contactConfig.hours[1].time}
            </span>
          </p>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="py-4 text-center text-xs text-white/45">
          © {year} AUqMIA Pet. Todos os direitos reservados.
        </Container>
      </div>
    </footer>
  )
}
