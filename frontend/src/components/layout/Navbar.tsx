import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/common/Logo'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { navLinks } from '@/config/site'
import { useStickyHeader } from '@/hooks/useStickyHeader'
import { cn } from '@/utils/cn'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const isSticky = useStickyHeader()
  const location = useLocation()

  const closeMenu = () => setOpen(false)

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b transition-all duration-300',
        isSticky
          ? 'border-primary/20 bg-night shadow-soft md:bg-night/96 md:backdrop-blur'
          : 'border-transparent bg-night',
      )}
    >
      <Container className="flex min-h-16 items-center justify-between gap-3 py-2 sm:min-h-[4.75rem]">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  isActive || location.pathname === link.href ? 'text-primary' : 'text-white/80',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link to="/agendamento">
            <Button>Agendar agora</Button>
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-white lg:hidden"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Container>

      {open ? (
        <div className="border-t border-white/10 bg-night lg:hidden">
          <Container className="grid grid-cols-2 gap-2 py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                onClick={closeMenu}
                className={({ isActive }) =>
                  cn(
                    'rounded-2xl px-3 py-3 text-center text-sm font-medium',
                    isActive ? 'bg-white/8 text-primary' : 'text-white/85',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/agendamento" onClick={closeMenu} className="col-span-2 pt-1">
              <Button fullWidth>Agendar agora</Button>
            </Link>
          </Container>
        </div>
      ) : null}
    </header>
  )
}
