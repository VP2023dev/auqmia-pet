import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { easeOutExpo } from '@/utils/motion'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
}

const offset = {
  up: { x: 0, y: 36 },
  down: { x: 0, y: -28 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  none: { x: 0, y: 0 },
}

export function Reveal({ children, className, delay = 0, direction = 'up' }: RevealProps) {
  const reduce = useReducedMotion()
  const from = offset[direction]

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, ...from }}
      whileInView={reduce ? undefined : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: easeOutExpo }}
    >
      {children}
    </motion.div>
  )
}
