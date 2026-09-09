import { motion, useReducedMotion, useScroll } from 'motion/react'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const reduce = useReducedMotion()

  if (reduce) return null

  return (
    <motion.div
      className="fixed top-0 right-0 left-0 z-50 h-[3px] origin-left bg-linear-to-r from-primary via-secondary to-primary"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
