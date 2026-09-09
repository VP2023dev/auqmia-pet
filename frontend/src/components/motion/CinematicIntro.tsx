import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import logo from '@/assets/logo.webp'
import { siteConfig } from '@/config/site'

const INTRO_KEY = 'auqmia-intro-v3'

function shouldPlayIntro(): boolean {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  return !sessionStorage.getItem(INTRO_KEY)
}

export function CinematicIntro() {
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(shouldPlayIntro)

  useEffect(() => {
    if (!visible) return

    document.body.style.overflow = 'hidden'
    const timer = window.setTimeout(finish, 4200)

    return () => {
      window.clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [visible])

  const finish = () => {
    sessionStorage.setItem(INTRO_KEY, '1')
    document.body.style.overflow = ''
    setVisible(false)
  }

  if (reduce) return null

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[80] overflow-hidden bg-night"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute inset-0 bg-night"
            exit={{ y: '-100%' }}
            transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-0 bg-night"
            exit={{ y: '100%' }}
            transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
          />

          <div className="relative flex h-full items-center justify-center">
            <motion.div
              aria-hidden="true"
              className="absolute h-[150%] w-[150%] rounded-full bg-[radial-gradient(circle,rgba(214,177,92,0.32)_0%,transparent_58%)]"
              initial={{ opacity: 0, scale: 0.35 }}
              animate={{ opacity: [0, 1, 0.45], scale: [0.35, 1, 1.22] }}
              transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
            />

            <motion.span
              aria-hidden="true"
              className="absolute h-px bg-linear-to-r from-transparent via-primary to-transparent"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '78%', opacity: [0, 1, 0.2] }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            />

            <motion.img
              src={logo}
              alt={siteConfig.name}
              className="relative z-10 w-[min(82vw,400px)] object-contain mix-blend-lighten drop-shadow-[0_0_40px_rgba(214,177,92,0.35)]"
              initial={{ opacity: 0, scale: 0.82, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.25, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            />

            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 z-20 w-32 bg-linear-to-r from-transparent via-white/35 to-transparent"
              initial={{ x: '-50vw', opacity: 0 }}
              animate={{ x: '50vw', opacity: [0, 1, 0] }}
              transition={{ duration: 1.25, delay: 1.45, ease: [0.22, 1, 0.36, 1] }}
            />

            <motion.p
              className="absolute bottom-[16%] z-10 px-4 text-center text-[10px] tracking-[0.28em] text-primary uppercase sm:text-[11px] sm:tracking-[0.42em]"
              initial={{ opacity: 0, letterSpacing: '0.7em', y: 18 }}
              animate={{ opacity: 1, letterSpacing: '0.42em', y: 0 }}
              transition={{ duration: 1.05, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              {siteConfig.serviceLine}
            </motion.p>
          </div>

          <button
            type="button"
            onClick={finish}
            className="absolute right-5 bottom-5 z-30 text-xs tracking-[0.2em] text-white/45 uppercase hover:text-white"
          >
            Pular
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
