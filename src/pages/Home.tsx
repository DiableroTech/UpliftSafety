import { Link } from 'react-router-dom'
import HomeEditorialShowcases from '../components/HomeEditorialShowcases'
import ProjectsCtaSection from '../components/ProjectsCtaSection'
import TestimonialSection from '../components/TestimonialSection'
import TypewriterText from '../components/TypewriterText'
import { useReveal } from '../hooks/useReveal'

const heroImg = '/rewebsitekickoff/image-asset.jpeg'
const weldImg =
  'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=80'

export default function Home() {
  const { revealTarget: asbestosTarget, shown: asbestosShown } = useReveal<HTMLElement>()

  return (
    <>
      <section className="relative isolate min-h-[calc(100dvh-4rem)] overflow-hidden">
        <img
          src={heroImg}
          alt=""
          className="hero-media absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue/70 via-blue/35 to-transparent" />
        <div className="relative mx-auto flex min-h-[calc(100dvh-4rem)] max-w-6xl flex-col justify-center px-5 py-16 text-white">
          <p className="enter-slide font-display text-[11px] font-semibold tracking-[0.28em] text-accent uppercase">
            Kamloops · Western Canada
          </p>
          <h1 className="enter-slide seq1 mt-4 max-w-3xl font-display text-4xl font-extrabold tracking-tight sm:mt-5 sm:text-5xl lg:text-7xl">
            Elevate to Excellence
          </h1>
          <p className="hero-lead enter-fade seq2 mt-4 max-w-[65ch] text-lg leading-relaxed text-white sm:mt-5 sm:text-xl">
            Uplift Safety is one of the most well-respected and recognized Safety Consultant
            practices in Western Canada serving virtually every industry from BC to Manitoba.
          </p>
          <div className="enter-fade seq3 mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link
              viewTransition
              to="/contact"
              className="bg-accent px-6 py-3 text-center font-display text-xs font-bold tracking-[0.18em] text-ink uppercase transition-transform duration-150 active:scale-[0.98]"
            >
              Talk to us
            </Link>
            <Link
              viewTransition
              to="/training"
              className="border border-white/70 px-6 py-3 text-center font-display text-xs font-bold tracking-[0.18em] text-white uppercase transition-[color,background-color,transform] duration-150 hover:bg-white hover:text-ink active:scale-[0.98]"
            >
              View training
            </Link>
          </div>
        </div>
      </section>

      <section aria-label="Service area" className="bg-blue">
        <div className="service-area-strip-inner mx-auto w-full max-w-7xl">
          <p className="service-area-banner">
            <TypewriterText text="No matter what the challenge, we develop solutions that help organizations meet regulatory requirements, protect workers and mitigate loss." />
          </p>
        </div>
      </section>

      <HomeEditorialShowcases />

      <ProjectsCtaSection />

      <TestimonialSection />

      <section
        ref={asbestosTarget}
        className={`reveal-fade mx-auto grid max-w-6xl items-stretch px-5 py-12 sm:py-20 lg:grid-cols-12 lg:px-0 ${
          asbestosShown ? 'is-shown' : ''
        }`}
      >
        <div className="relative min-h-52 overflow-hidden sm:min-h-72 lg:col-span-5">
          <img
            src={weldImg}
            alt=""
            className="hero-media absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center border border-line border-t-0 p-6 sm:p-8 lg:col-span-7 lg:border-t lg:border-l-0 lg:p-14">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-4xl">
            Asbestos certification for B.C.
          </h2>
          <p className="mt-5 max-w-[65ch] text-lg leading-relaxed text-mute">
            Asbestos is still the number-one killer of workers in this province. Anyone doing
            abatement work needs training. We run WorkSafeBC Level 1, 2, and 3, including group
            sessions.
          </p>
          <Link
            viewTransition
            to="/contact"
            className="mt-8 w-fit border border-blue px-5 py-3 font-display text-[11px] font-bold tracking-[0.18em] text-blue uppercase transition-[color,background-color,transform] duration-150 hover:bg-blue hover:text-white active:scale-[0.98]"
          >
            Book group training
          </Link>
        </div>
      </section>
    </>
  )
}
