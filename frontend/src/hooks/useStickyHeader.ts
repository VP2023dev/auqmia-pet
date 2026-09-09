import { useEffect, useState } from 'react'

export function useStickyHeader(threshold = 16): boolean {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsSticky(window.scrollY > threshold)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return isSticky
}
