import { useEffect, useRef, useState } from 'react'

type TypewriterTextProps = {
  text: string
  className?: string
}

export default function TypewriterText({ text, className = '' }: TypewriterTextProps) {
  const targetRef = useRef<HTMLSpanElement>(null)
  const [started, setStarted] = useState(false)
  const [characterCount, setCharacterCount] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReducedMotion(media.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const target = targetRef.current
    if (!target || reducedMotion) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setStarted(true)
        observer.disconnect()
      },
      { threshold: 0.45 },
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [reducedMotion])

  useEffect(() => {
    if (!started || reducedMotion || characterCount >= text.length) return

    const nextCharacter = text[characterCount]
    const delay = nextCharacter === ',' ? 70 : nextCharacter === '.' ? 100 : 28
    const timer = window.setTimeout(() => {
      setCharacterCount((count) => Math.min(count + 1, text.length))
    }, delay)

    return () => window.clearTimeout(timer)
  }, [characterCount, reducedMotion, started, text])

  const visibleText = reducedMotion ? text : text.slice(0, characterCount)
  const isTyping = started && !reducedMotion && characterCount < text.length

  return (
    <span ref={targetRef} className={className}>
      <span aria-hidden="true">
        {visibleText}
        <span className={`typewriter-caret ${isTyping ? 'is-typing' : ''}`} />
      </span>
      <span className="sr-only">{text}</span>
    </span>
  )
}
