import { useEffect, useState } from 'react'

export function useReveal<T extends HTMLElement>(threshold = 0.18) {
  const [node, setNode] = useState<T | null>(null)
  const [shown, setShown] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    if (!node || shown) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setShown(true)
        observer.disconnect()
      },
      { threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [node, shown, threshold])

  return { revealTarget: setNode, shown }
}
