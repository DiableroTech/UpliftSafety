import { type FormEvent, useState } from 'react'

export default function Contact() {
  const [sent, setSent] = useState(false)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="px-5 py-20">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2">
        <div>
          <p className="font-display text-[11px] font-semibold tracking-[0.24em] text-hi uppercase">
            Contact
          </p>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Get a quote. Ask the hard question.
          </h1>
          <p className="mt-5 text-lg text-paper/70">
            Hygiene, programs, or a crew that needs tickets. This form is demo-only — it does not
            send. Use the numbers if you need them today.
          </p>
          <dl className="mt-10 space-y-6">
            <div>
              <dt className="font-display text-sm font-bold">Jason Zaffino</dt>
              <dd className="mt-1 text-paper/70">
                <a className="hover:text-hi" href="mailto:jason.zaffino@upliftsafety.ca">
                  jason.zaffino@upliftsafety.ca
                </a>
                <span className="block">250-540-3511</span>
              </dd>
            </div>
            <div>
              <dt className="font-display text-sm font-bold">Marsha Bell</dt>
              <dd className="mt-1 text-paper/70">
                <a className="hover:text-hi" href="mailto:marsha.bell@upliftsafety.ca">
                  marsha.bell@upliftsafety.ca
                </a>
                <span className="block">778-257-1863</span>
              </dd>
            </div>
          </dl>
        </div>

        {sent ? (
          <p className="self-center font-display text-2xl text-hi">
            Got it — in the real site this would land in their inbox.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4 border border-line bg-ink-2 p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-xs tracking-wide text-mute uppercase">
                First name
                <input
                  required
                  name="first"
                  className="mt-2 w-full border border-line bg-ink px-3 py-2.5 text-paper outline-none focus:border-hi"
                />
              </label>
              <label className="block text-xs tracking-wide text-mute uppercase">
                Last name
                <input
                  name="last"
                  className="mt-2 w-full border border-line bg-ink px-3 py-2.5 text-paper outline-none focus:border-hi"
                />
              </label>
            </div>
            <label className="block text-xs tracking-wide text-mute uppercase">
              Email
              <input
                required
                type="email"
                name="email"
                className="mt-2 w-full border border-line bg-ink px-3 py-2.5 text-paper outline-none focus:border-hi"
              />
            </label>
            <label className="block text-xs tracking-wide text-mute uppercase">
              Phone
              <input
                name="phone"
                className="mt-2 w-full border border-line bg-ink px-3 py-2.5 text-paper outline-none focus:border-hi"
              />
            </label>
            <label className="block text-xs tracking-wide text-mute uppercase">
              Message
              <textarea
                required
                name="message"
                rows={5}
                className="mt-2 w-full resize-y border border-line bg-ink px-3 py-2.5 text-paper outline-none focus:border-hi"
              />
            </label>
            <button
              type="submit"
              className="bg-hi px-6 py-3 font-display text-xs font-bold tracking-[0.18em] text-hi-ink uppercase"
            >
              Send
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
