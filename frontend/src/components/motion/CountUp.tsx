import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'

interface CountUpProps {
  value: number
  suffix?: string
  decimals?: number
  className?: string
}

export function CountUp({ value, suffix = '', decimals = 0, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (reduce || !inView) {
      node.textContent = `${value.toFixed(decimals)}${suffix}`
      return
    }

    const control = animate(0, value, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (latest) => {
        node.textContent = `${latest.toFixed(decimals)}${suffix}`
      },
    })

    return () => control.stop()
  }, [decimals, inView, reduce, suffix, value])

  return <span ref={ref} className={className} />
}
