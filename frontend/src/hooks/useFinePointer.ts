import { useEffect, useState } from 'react'

export function useFinePointer(): boolean {
  const [isFine, setIsFine] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setIsFine(media.matches)

    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return isFine
}
