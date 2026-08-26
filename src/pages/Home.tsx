import { Link } from 'react-router-dom'

const heroImg =
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80'
const weldImg =
  'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=80'

const lanes = [
  {
    n: '01',
    title: 'Industrial hygiene',
    body: 'Exposure control, air quality, welding fume, ergonomics, hazardous materials.',
    to: '/services/hygiene',
  },
  {
    n: '02',
    title: 'Safety programs',
    body: 'Procedures, confined space, lockout, COR / OSSE audits, contract advisors.',
    to: '/services',
  },
  {
    n: '03',
    title: 'Training',
    body: 'Leadership, equipment, online awareness — built to WorkSafeBC and the shop floor.',
    to: '/training',
  },
]

export default function Home() {
  return (
    <>
      <section className="relative isolate min-h-[88svh] overflow-hidden">
        <img
          src={heroImg}
          alt=""
          className="absolute inset-0 h-full w-full scale-105 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />
        <div className="relative mx-auto flex min-h-[88svh] max-w-6xl flex-col justify-end px-5 pb-20 pt-28">
          <p className="rise font-display text-[11px] font-semibold tracking-[0.28em] text-hi uppercase">
            Kamloops · Western Canada
          </p>
          <h1 className="rise mt-5 max-w-3xl font-display text-5xl font-extrabold tracking-tight text-paper sm:text-7xl">
            Industrial hygiene
            <span className="block text-hi">and safety, done right.</span>
          </h1>
          <p className="rise mt-6 max-w-xl text-lg leading-relaxed text-paper/75">
            Helping organizations meet the regulation, protect workers, and cut loss — without
            the template brochure.
          </p>
          <div className="rise mt-10 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="bg-hi px-6 py-3 font-display text-xs font-bold tracking-[0.18em] text-hi-ink uppercase"
            >
              Talk to us
            </Link>
            <Link
              to="/training"
              className="border border-paper/30 px-6 py-3 font-display text-xs font-bold tracking-[0.18em] uppercase hover:border-hi hover:text-hi"
            >
              View training
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-ink-2">
        <div className="mx-auto grid max-w-6xl sm:grid-cols-3">
          {lanes.map((lane, i) => (
            <Link
              key={lane.n}
              to={lane.to}
              className={`group px-5 py-12 transition-colors hover:bg-ink ${
                i < 2 ? 'sm:border-r sm:border-line' : ''
              }`}
            >
              <p className="font-display text-[11px] tracking-[0.2em] text-hi">{lane.n}</p>
              <h2 className="mt-4 font-display text-2xl font-bold tracking-tight">{lane.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-mute">{lane.body}</p>
              <p className="mt-6 font-display text-[11px] tracking-[0.16em] text-paper/50 uppercase group-hover:text-hi">
                Explore →
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-stretch gap-0 px-5 py-24 lg:grid-cols-12">
        <div className="relative min-h-72 overflow-hidden lg:col-span-5">
          <img src={weldImg} alt="" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="flex flex-col justify-center border border-line border-t-0 bg-ink-2 p-8 lg:col-span-7 lg:border-t lg:border-l-0 lg:p-14">
          <p className="font-display text-[11px] font-semibold tracking-[0.24em] text-hi uppercase">
            Featured
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Asbestos certification for B.C.
          </h2>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-paper/75">
            Asbestos is still the number-one killer of workers in this province. Anyone doing
            abatement work needs training. We run WorkSafeBC Level 1, 2, and 3 — including group
            sessions.
          </p>
          <Link
            to="/contact"
            className="mt-8 w-fit bg-hi px-5 py-3 font-display text-[11px] font-bold tracking-[0.18em] text-hi-ink uppercase"
          >
            Book group training
          </Link>
        </div>
      </section>

      <section className="border-t border-line px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="font-display text-[11px] font-semibold tracking-[0.24em] text-hi uppercase">
            On the ground
          </p>
          <p className="mt-4 max-w-3xl font-display text-2xl font-semibold tracking-tight text-paper/90 sm:text-3xl">
            Kamloops, Kelowna, Vernon, Prince George, Edmonton, Calgary — and the rest of Western
            Canada.
          </p>
        </div>
      </section>
    </>
  )
}
