import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { easeOutExpo } from '@/utils/motion'

interface StaggerProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function Stagger({ children, className, delay = 0 }: StaggerProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduce ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.09, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 28, scale: 0.97 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: easeOutExpo } },
      }}
    >
      {children}
    </motion.div>
  )
}
