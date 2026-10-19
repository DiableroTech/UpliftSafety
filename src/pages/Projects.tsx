import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { projects, type ProjectSector } from '../data/projects'

const sectorLabel: Record<ProjectSector, string> = {
  mining: 'Mining',
  industrial: 'Industrial',
  forestry: 'Forestry',
}

const filters = [
  { id: 'all', label: 'All' },
  { id: 'mining', label: 'Mining' },
  { id: 'industrial', label: 'Industrial' },
  { id: 'forestry', label: 'Forestry' },
] as const

type FilterId = (typeof filters)[number]['id']

export default function Projects() {
  const [filter, setFilter] = useState<FilterId>('all')
  const rowRef = useRef<HTMLDivElement>(null)
  const [bar, setBar] = useState({ left: 0, width: 0, top: 0 })
  const [slide, setSlide] = useState(false)
  const visible =
    filter === 'all' ? projects : projects.filter((project) => project.sector === filter)

  useLayoutEffect(() => {
    const row = rowRef.current
    if (!row) return

    const measure = () => {
      const active = row.querySelector<HTMLButtonElement>('[aria-pressed="true"]')
      if (!active) return
      const rowBox = row.getBoundingClientRect()
      const box = active.getBoundingClientRect()
      const left = box.left - rowBox.left - row.clientLeft
      const width = box.width
      const top = box.bottom - rowBox.top - row.clientTop - 2
      setBar((prev) =>
        prev.left === left && prev.width === width && prev.top === top ? prev : { left, width, top },
      )
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(row)
    const frame = requestAnimationFrame(() => setSlide(true))
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [filter])

  return (
    <>
      <PageHero
        title="Projects"
        image="/projects/kamloops-banner.jpg"
        scrim="from-blue/70 via-blue/35 to-transparent"
      >
        Samples of mining and industrial work, shown here until the real projects are ready.
      </PageHero>

      <div className="mx-auto max-w-6xl px-5">
        <div
          ref={rowRef}
          role="group"
          aria-label="Filter by sector"
          className="relative flex flex-wrap gap-x-8 gap-y-3 border-b border-line py-6"
        >
          {filters.map((item) => {
            const on = filter === item.id
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(item.id)}
                className={`cursor-pointer pb-1 font-display text-[11px] font-semibold tracking-[0.16em] uppercase ${
                  on ? 'text-blue' : 'text-ink'
                }`}
              >
                {item.label}
              </button>
            )
          })}
          <span
            aria-hidden="true"
            className={`absolute h-0.5 bg-blue ${
              slide ? 'transition-[left,width,top] duration-300 ease-out motion-reduce:transition-none' : ''
            }`}
            style={{ left: bar.left, width: bar.width, top: bar.top }}
          />
        </div>

        {visible.length === 0 ? (
          <p className="py-16 text-[15px] text-ink">No projects in this sector yet.</p>
        ) : (
          <ul>
            {visible.map((project) => (
              <li key={project.slug} className="border-b border-line">
                <Link
                  viewTransition
                  to={`/projects/${project.slug}`}
                  className="group grid lg:grid-cols-2"
                >
                  <div className="relative min-h-64">
                    <img
                      src={project.image.src}
                      alt={project.image.alt}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center px-0 py-8 sm:py-10 lg:px-10 lg:py-14">
                    <p className="font-display text-[11px] font-semibold tracking-[0.16em] uppercase">
                      {project.placeholder ? (
                        <span className="text-blue">Sample</span>
                      ) : null}
                      {project.placeholder ? (
                        <span className="text-mute"> · </span>
                      ) : null}
                      <span className="text-mute">{sectorLabel[project.sector]}</span>
                    </p>
                    <h2 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                      {project.title}
                    </h2>
                    <p className="mt-2 text-sm text-mute">{project.region}</p>
                    <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-ink">
                      {project.summary}
                    </p>
                    <p className="mt-6 font-display text-[11px] font-semibold tracking-[0.16em] text-blue uppercase group-hover:underline">
                      View project
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
