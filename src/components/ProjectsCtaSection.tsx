import { Link } from 'react-router-dom'
import { getHomeFeaturedProjects, type Project } from '../data/projects'

function ProjectTile({ project }: { project: Project }) {
  return (
    <Link
      viewTransition
      to={`/projects/${project.slug}`}
      aria-label={project.title}
      className="project-tile group relative isolate block min-h-48 overflow-hidden sm:min-h-56 lg:min-h-64"
    >
      <img
        src={project.image.src}
        alt=""
        loading="lazy"
        className="project-tile-photo absolute inset-0 h-full w-full object-cover"
      />
      <span className="project-tile-base-scrim pointer-events-none absolute inset-0" aria-hidden="true" />
      <span className="project-tile-hover-scrim pointer-events-none absolute inset-0" aria-hidden="true" />
      <span className="relative z-10 flex h-full min-h-48 flex-col justify-end p-4 sm:min-h-56 sm:p-5 lg:min-h-64">
        <span className="font-display text-lg font-bold tracking-tight text-white line-clamp-2 sm:text-xl">
          {project.title}
        </span>
        <span className="project-tile-summary mt-2 line-clamp-3 text-sm leading-relaxed text-white/90">
          {project.summary}
        </span>
      </span>
    </Link>
  )
}

function ShowMoreTile() {
  return (
    <Link
      viewTransition
      to="/projects"
      className="project-cta-more flex min-h-48 flex-col items-center justify-center gap-2 bg-paper px-4 py-8 text-center sm:min-h-56 lg:min-h-64"
    >
      <span className="font-display text-lg font-bold tracking-tight text-blue sm:text-xl">
        Show more projects
      </span>
    </Link>
  )
}

export default function ProjectsCtaSection() {
  const featured = getHomeFeaturedProjects()

  return (
    <section className="border-t border-line bg-paper py-12 sm:py-16" aria-labelledby="home-projects-heading">
      <div className="mx-auto max-w-6xl px-5">
        <header className="max-w-[65ch]">
          <h2
            id="home-projects-heading"
            className="font-display text-2xl font-bold tracking-tight sm:text-4xl"
          >
            Projects
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-mute">
            Past work in mining and industrial settings across Western Canada. Open a tile for the
            full write-up, or see everything on the projects page.
          </p>
        </header>

        <div className="project-cta-grid mt-8 grid grid-cols-1 gap-px bg-line md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectTile key={project.slug} project={project} />
          ))}
          <ShowMoreTile />
        </div>
      </div>
    </section>
  )
}
