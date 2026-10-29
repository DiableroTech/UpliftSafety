import { Star } from '@phosphor-icons/react'
import { useLayoutEffect, useRef, useState } from 'react'
import { getTestimonialSummary, testimonials, type Testimonial } from '../data/testimonials'

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useLayoutEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(media.matches)
    onChange()
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  return reduced
}

function initials(attribution: string) {
  const parts = attribution.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return ''
  const first = parts[0]?.[0] ?? ''
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : ''
  return `${first}${last}`.toUpperCase()
}

const AVATAR_COLORS = [
  '#175873',
  '#2563eb',
  '#7c3aed',
  '#c026d3',
  '#e11d48',
  '#ea580c',
  '#ca8a04',
  '#059669',
  '#0d9488',
  '#64748b',
] as const

function avatarColorForId(id: string): string {
  let index = 0
  for (let i = 0; i < id.length; i += 1) {
    index = (index + id.charCodeAt(i) * (i + 3)) % AVATAR_COLORS.length
  }
  return AVATAR_COLORS[index] ?? AVATAR_COLORS[0]
}

function Stars({ rating, tone }: { rating: number; tone: 'card' | 'summary' }) {
  const filled = Math.round(rating)

  return (
    <span className="inline-flex gap-0.5 text-[#d4a017]" aria-hidden="true">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          weight={index < filled ? 'fill' : 'regular'}
          size={tone === 'summary' ? 18 : 15}
          className={index < filled ? undefined : 'opacity-35'}
        />
      ))}
    </span>
  )
}

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5c-.3 1.5-1.1 2.8-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.7z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1C3.4 21.3 7.4 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.4 14.4c-.2-.7-.4-1.4-.4-2.4s.1-1.7.4-2.4V6.5H1.4C.5 8.3 0 10.1 0 12s.5 3.7 1.4 5.5l4-3.1z"
      />
      <path
        fill="#EA4335"
        d="M12 4.8c1.7 0 3.3.6 4.5 1.8l3.4-3.4C17.9 1.2 15.2 0 12 0 7.4 0 3.4 2.7 1.4 6.5l4 3.1C6.3 6.9 8.9 4.8 12 4.8z"
      />
    </svg>
  )
}

function Quote({
  id,
  quote,
  expanded,
  onToggle,
}: {
  id: string
  quote: string
  expanded: boolean
  onToggle: (id: string) => void
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const [overflows, setOverflows] = useState(false)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const measure = () => {
      const width = el.clientWidth
      if (width === 0) return
      const style = getComputedStyle(el)
      const probe = document.createElement('p')
      probe.textContent = quote
      probe.style.position = 'fixed'
      probe.style.left = '0'
      probe.style.top = '0'
      probe.style.visibility = 'hidden'
      probe.style.pointerEvents = 'none'
      probe.style.width = `${width}px`
      probe.style.font = style.font
      probe.style.lineHeight = style.lineHeight
      probe.style.letterSpacing = style.letterSpacing
      el.parentElement?.appendChild(probe)
      const full = probe.getBoundingClientRect().height
      probe.remove()
      const lineHeight = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.625
      setOverflows(full > lineHeight * 4 + 1)
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [quote])

  return (
    <div className="mt-3">
      <p
        ref={ref}
        className={`text-[0.9375rem] leading-snug text-ink sm:text-base sm:leading-relaxed ${expanded ? '' : 'line-clamp-4'}`}
      >
        {quote}
      </p>
      {overflows ? (
        <button
          type="button"
          className="mt-2 font-display text-[11px] font-bold tracking-[0.14em] text-blue uppercase"
          aria-expanded={expanded}
          onClick={() => onToggle(id)}
        >
          {expanded ? 'Less' : 'More'}
        </button>
      ) : null}
    </div>
  )
}

function TestimonialCard({
  item,
  expanded,
  onToggle,
}: {
  item: Testimonial
  expanded: boolean
  onToggle: (id: string) => void
}) {
  const googleHref = item.source === 'google' && item.sourceUrl ? item.sourceUrl : null

  return (
    <article className="testimonial-card-surface flex w-full flex-col bg-paper p-4">
      <div className="flex items-center gap-2">
        <span className="font-display text-lg font-bold text-ink" aria-hidden="true">
          {item.rating}
        </span>
        <span className="sr-only">Rated {item.rating} out of 5</span>
        <Stars rating={item.rating} tone="card" />
        {item.date ? (
          <time className="ml-auto shrink-0 text-sm font-medium text-mute">{item.date}</time>
        ) : null}
      </div>
      <Quote id={item.id} quote={item.quote} expanded={expanded} onToggle={onToggle} />
      <div className="mt-3 flex items-center gap-3 pt-3">
        <span
          className="flex size-10 shrink-0 items-center justify-center rounded-full font-display text-xs font-semibold text-white"
          style={{ backgroundColor: avatarColorForId(item.id) }}
          aria-hidden="true"
        >
          {initials(item.attribution)}
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-semibold text-ink">{item.attribution}</span>
          {item.detail ? <span className="mt-0.5 block text-sm text-mute">{item.detail}</span> : null}
        </span>
        {googleHref ? (
          <a
            href={googleHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${item.attribution} on Google`}
            className="ml-auto shrink-0"
          >
            <GoogleMark />
          </a>
        ) : null}
      </div>
    </article>
  )
}

function CardSet({
  items,
  expandedId,
  onToggle,
  clone = false,
}: {
  items: readonly Testimonial[]
  expandedId: string | null
  onToggle: (id: string) => void
  clone?: boolean
}) {
  return (
    <ul className="testimonial-set" aria-hidden={clone || undefined} inert={clone ? true : undefined}>
      {items.map((item) => (
        <li
          key={clone ? `${item.id}-clone` : item.id}
          className="testimonial-card w-[16.5rem] shrink-0 sm:w-[18.5rem]"
        >
          <TestimonialCard
            item={item}
            expanded={expandedId === item.id}
            onToggle={onToggle}
          />
        </li>
      ))}
    </ul>
  )
}

const SPEED = 44

function wrap(value: number, size: number) {
  if (size <= 0) return 0
  return ((value % size) + size) % size
}

export default function TestimonialSection() {
  const summary = getTestimonialSummary(testimonials)
  const reduced = usePrefersReducedMotion()
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const [loop, setLoop] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useLayoutEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return

    let setWidth = 0
    let offset = offsetRef.current
    let last = performance.now()
    let frame = 0
    let dragging = false
    let pointerId = -1
    let startX = 0
    let startOffset = 0
    let hover = false
    let focused = false

    const updateFocus = () => {
      const vp = viewport.getBoundingClientRect()
      if (vp.width <= 0) return
      const center = vp.left + vp.width / 2
      const radius = Math.min(vp.width * 0.26, 340)

      for (const el of viewport.querySelectorAll<HTMLElement>('.testimonial-card')) {
        const rect = el.getBoundingClientRect()
        if (rect.width <= 0) continue
        const cardCenter = rect.left + rect.width / 2
        const dist = Math.abs(cardCenter - center)
        let strength = 1 - dist / radius
        if (strength < 0) strength = 0
        if (strength > 1) strength = 1
        strength = strength * strength * (3 - 2 * strength)
        el.style.setProperty('--focus', strength.toFixed(3))
      }
    }

    const apply = () => {
      track.style.transform = `translate3d(${-offset}px, 0, 0)`
      updateFocus()
    }

    const measure = () => {
      const copies = track.querySelectorAll(':scope > .testimonial-set').length || 1
      const oneCopy = track.scrollWidth / copies
      if (!Number.isFinite(oneCopy) || oneCopy <= 0) return
      setWidth = oneCopy
      offset = wrap(offset, setWidth)
      offsetRef.current = offset
      apply()
      const shouldLoop = oneCopy > viewport.clientWidth + 1
      setLoop((current) => (current === shouldLoop ? current : shouldLoop))
    }

    const tick = (now: number) => {
      const dt = Math.min(32, now - last)
      last = now
      const hold = reduced || hover || focused || dragging || expandedId !== null
      if (!hold && setWidth > viewport.clientWidth + 1) {
        offset = wrap(offset + (SPEED * dt) / 1000, setWidth)
        offsetRef.current = offset
        apply()
      } else {
        updateFocus()
      }
      frame = requestAnimationFrame(tick)
    }

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0 || setWidth <= 0) return
      const target = event.target
      if (target instanceof Element && target.closest('a, button')) return
      dragging = true
      pointerId = event.pointerId
      startX = event.clientX
      startOffset = offset
      viewport.classList.add('is-dragging')
      if (viewport.hasPointerCapture(event.pointerId) === false) {
        try {
          viewport.setPointerCapture(event.pointerId)
        } catch {
          // Pointer already ended. The move and up listeners still track the drag.
        }
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging || event.pointerId !== pointerId) return
      offset = wrap(startOffset - (event.clientX - startX), setWidth)
      offsetRef.current = offset
      apply()
    }

    const endDrag = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return
      dragging = false
      pointerId = -1
      viewport.classList.remove('is-dragging')
      hover = event.pointerType === 'mouse' && viewport.matches(':hover')
    }

    const onEnter = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') hover = true
    }

    const onLeave = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') hover = false
    }

    const syncFocus = () => {
      focused = viewport.contains(document.activeElement)
    }

    measure()
    frame = requestAnimationFrame(tick)
    const observer = new ResizeObserver(measure)
    observer.observe(viewport)
    viewport.addEventListener('pointerdown', onPointerDown)
    viewport.addEventListener('pointermove', onPointerMove)
    viewport.addEventListener('pointerup', endDrag)
    viewport.addEventListener('pointercancel', endDrag)
    viewport.addEventListener('pointerenter', onEnter)
    viewport.addEventListener('pointerleave', onLeave)
    viewport.addEventListener('focusin', syncFocus)
    viewport.addEventListener('focusout', syncFocus)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      viewport.removeEventListener('pointerdown', onPointerDown)
      viewport.removeEventListener('pointermove', onPointerMove)
      viewport.removeEventListener('pointerup', endDrag)
      viewport.removeEventListener('pointercancel', endDrag)
      viewport.removeEventListener('pointerenter', onEnter)
      viewport.removeEventListener('pointerleave', onLeave)
      viewport.removeEventListener('focusin', syncFocus)
      viewport.removeEventListener('focusout', syncFocus)
      viewport.classList.remove('is-dragging')
    }
  }, [reduced, loop, expandedId, summary.count])

  if (summary.count === 0) return null

  const countLabel = summary.hasPlaceholder ? 'notes' : 'reviews'

  const toggleQuote = (id: string) => {
    setExpandedId((current) => (current === id ? null : id))
  }

  return (
    <section aria-labelledby="home-testimonials-title" className="overflow-hidden bg-blue py-11 sm:py-14">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
          <h2
            id="home-testimonials-title"
            className="min-w-0 font-display text-2xl font-extrabold tracking-tight text-balance text-white sm:text-4xl"
          >
            What they say about us
          </h2>
          <div className="flex shrink-0 flex-col items-end">
            <div className="flex items-center gap-2.5">
              <p className="font-display text-3xl leading-none font-extrabold text-white sm:text-4xl">
                <span aria-hidden="true">{summary.average.toFixed(1)}</span>
                <span className="sr-only">Rated {summary.average.toFixed(1)} out of 5</span>
              </p>
              <Stars rating={summary.average} tone="summary" />
            </div>
            <p className="mt-1 text-sm text-white/75">
              {summary.count} {countLabel}
            </p>
          </div>
        </div>
        <p className="mx-auto mt-3 max-w-[40rem] text-center text-base leading-relaxed text-balance text-white/80 sm:mx-0 sm:max-w-none sm:text-left sm:text-lg">
          After working with clients across British Columbia, we heard back about the work. Here is
          what they say about the team.
        </p>
      </div>
      <div ref={viewportRef} className="testimonial-viewport mt-5 sm:mt-6">
        <div ref={trackRef} className="testimonial-track">
          <CardSet items={testimonials} expandedId={expandedId} onToggle={toggleQuote} />
          {loop ? (
            <CardSet items={testimonials} expandedId={expandedId} onToggle={toggleQuote} clone />
          ) : null}
        </div>
      </div>
    </section>
  )
}
