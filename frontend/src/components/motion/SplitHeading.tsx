import { motion, useReducedMotion } from 'motion/react'
import { easeOutExpo } from '@/utils/motion'
import { cn } from '@/utils/cn'

interface SplitHeadingProps {
  text: string
  as?: 'h1' | 'h2'
  className?: string
  delay?: number
}

export function SplitHeading({ text, as = 'h1', className, delay = 0 }: SplitHeadingProps) {
  const reduce = useReducedMotion()
  const Tag = as
  const words = text.split(' ')

  return (
    <Tag className={cn(className)}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-1 align-bottom">
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: '110%', rotate: 4 }}
            animate={reduce ? undefined : { y: '0%', rotate: 0 }}
            transition={{ duration: 0.8, delay: delay + index * 0.07, ease: easeOutExpo }}
          >
            {word}
            {index < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
