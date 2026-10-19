import { type FormEvent, useState } from 'react'

export default function Contact() {
  const [sent, setSent] = useState(false)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="px-5 py-12 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
            Contact Us
          </h1>
          <p className="mt-5 max-w-[65ch] text-lg text-mute">
            To discuss your specific health and safety needs or to get a quote,
            please contact us.
          </p>
          <dl className="mt-10 space-y-6">
            <div>
              <dt className="font-display text-sm font-bold">Jason Zaffino</dt>
              <dd className="mt-1">
                <a className="break-all text-blue hover:underline" href="mailto:jason.zaffino@upliftsafety.ca">
                  jason.zaffino@upliftsafety.ca
                </a>
                <span className="block">250-540-3511</span>
              </dd>
            </div>
            <div>
              <dt className="font-display text-sm font-bold">Marsha Bell</dt>
              <dd className="mt-1">
                <a className="break-all text-blue hover:underline" href="mailto:marsha.bell@upliftsafety.ca">
                  marsha.bell@upliftsafety.ca
                </a>
                <span className="block">778-257-1863</span>
              </dd>
            </div>
          </dl>
        </div>

        {sent ? (
          <p className="self-center font-display text-2xl text-blue">
            Thank you. We will be in touch.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4 border border-line p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                First name
                <input
                  required
                  name="first"
                  autoComplete="given-name"
                  className="mt-2 w-full border border-line bg-paper px-3 py-2.5 text-ink outline-none focus:border-blue"
                />
              </label>
              <label className="block text-sm">
                Last name
                <input
                  name="last"
                  autoComplete="family-name"
                  className="mt-2 w-full border border-line bg-paper px-3 py-2.5 text-ink outline-none focus:border-blue"
                />
              </label>
            </div>
            <label className="block text-sm">
              Email
              <input
                required
                type="email"
                name="email"
                autoComplete="email"
                className="mt-2 w-full border border-line bg-paper px-3 py-2.5 text-ink outline-none focus:border-blue"
              />
            </label>
            <label className="block text-sm">
              Phone
              <input
                name="phone"
                autoComplete="tel"
                className="mt-2 w-full border border-line bg-paper px-3 py-2.5 text-ink outline-none focus:border-blue"
              />
            </label>
            <label className="block text-sm">
              Message
              <textarea
                required
                name="message"
                rows={5}
                className="mt-2 w-full resize-y border border-line bg-paper px-3 py-2.5 text-ink outline-none focus:border-blue"
              />
            </label>
            <button
              type="submit"
              className="bg-accent px-6 py-3 font-display text-xs font-bold tracking-[0.18em] text-ink uppercase transition-transform duration-150 active:scale-[0.98]"
            >
              Send
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
