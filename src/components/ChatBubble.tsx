import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ArrowClockwise, ChatCircleText, CheckCircle, WarningCircle, X } from '@phosphor-icons/react'
import { postSmsInquiry, SmsInquiryError, type SmsErrorKind } from '../lib/api/sms-inquiry'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const ERROR_COPY: Record<SmsErrorKind, string> = {
  network: "Couldn't reach the server. Check your connection and try again.",
  validation: 'Please enter a short message (under 480 characters).',
  server: "Couldn't send right now. Please call 250-540-3511.",
}

export default function ChatBubble() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [phone, setPhone] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorKind, setErrorKind] = useState<SmsErrorKind | null>(null)
  const [wasMocked, setWasMocked] = useState(false)
  const panelRef = useRef<HTMLFormElement>(null)
  const fabRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        fabRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'sending' || !message.trim()) return
    setStatus('sending')
    setErrorKind(null)
    setWasMocked(false)
    try {
      const result = await postSmsInquiry({ message, page: pathname, phone, website: honeypot })
      setStatus('sent')
      setWasMocked(!!result.mock)
      setMessage('')
      setPhone('')
    } catch (err) {
      setStatus('error')
      setErrorKind(err instanceof SmsInquiryError ? err.kind : 'server')
    }
  }

  function reset() {
    setStatus('idle')
    setErrorKind(null)
  }

  return (
    <div className="fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6">
      {open && (
        <form
          ref={panelRef}
          onSubmit={onSubmit}
          className="mb-3 w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-ink/10 bg-paper p-4 text-ink shadow-2xl"
          aria-label="Message Uplift Safety"
        >
          {status === 'sent' ? (
            <div className="flex items-start gap-3">
              <CheckCircle size={22} weight="bold" className="mt-0.5 shrink-0 text-[#1f7a1f]" aria-hidden="true" />
              <div className="flex-1">
                <p className="text-sm font-semibold">Message sent</p>
                <p className="mt-1 text-xs text-ink/70">
                  Someone at Uplift Safety will get this and reach out.
                </p>
                {wasMocked && (
                  <p className="mt-1 text-[0.6875rem] font-semibold uppercase tracking-wide text-ink/50">
                    (mock mode — no real SMS was sent)
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  reset()
                }}
                aria-label="Close"
                className="shrink-0 text-ink/60 hover:text-ink"
              >
                <X size={18} weight="bold" />
              </button>
            </div>
          ) : (
            <>
              <div className="mb-3 flex items-start justify-between gap-3">
                <p className="text-sm font-semibold">Message Uplift Safety</p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="shrink-0 text-ink/60 hover:text-ink"
                >
                  <X size={18} weight="bold" />
                </button>
              </div>
              <p className="mb-3 text-xs text-ink/70">
                A person at Uplift Safety will read your message.
              </p>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={480}
                required
                rows={4}
                className="w-full resize-none rounded border border-ink/15 bg-white p-2 text-sm focus:border-blue focus:outline-none"
                placeholder="How can we help?"
                aria-label="Your message"
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                className="mt-2 w-full rounded border border-ink/15 bg-white p-2 text-sm focus:border-blue focus:outline-none"
                placeholder="Your phone (optional, so we can call back)"
                aria-label="Your phone number"
              />
              <input
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0"
              />
              <p className="mt-2 text-[0.6875rem] leading-snug text-ink/60">
                By sending, you agree we may text you back about this inquiry.
              </p>
              <button
                disabled={status === 'sending'}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded bg-accent px-3 py-2 font-display text-xs font-bold uppercase tracking-[0.16em] text-ink transition disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending…' : 'Send'}
              </button>
              {status === 'error' && errorKind && (
                <div
                  role="alert"
                  className="mt-3 flex items-start gap-2 rounded border border-red-200 bg-red-50 p-2 text-sm text-ink/80"
                >
                  <WarningCircle size={18} weight="bold" className="mt-0.5 shrink-0 text-red-600" aria-hidden="true" />
                  <div className="flex-1">
                    <p>{ERROR_COPY[errorKind]}</p>
                    {errorKind === 'network' && (
                      <button
                        type="button"
                        onClick={reset}
                        className="mt-1 inline-flex items-center gap-1 text-xs font-semibold underline"
                      >
                        <ArrowClockwise size={14} weight="bold" aria-hidden="true" />
                        Retry
                      </button>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </form>
      )}
      <button
        ref={fabRef}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? 'Close message panel' : 'Message Uplift Safety'}
        className="ml-auto flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-accent text-ink shadow-lg transition-all duration-200 ease-out hover:scale-110 hover:-translate-y-1 hover:bg-[#eaff33] hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue"
      >
        <ChatCircleText size={26} weight="bold" />
      </button>
    </div>
  )
}
