import { Link, useParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { getProject, type ProjectSector } from '../data/projects'

const sectorLabel: Record<ProjectSector, string> = {
  mining: 'Mining',
  industrial: 'Industrial',
  forestry: 'Forestry',
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = slug ? getProject(slug) : undefined

  if (!project) {
    return (
      <>
        <PageHero title="Project not found" image="/projects/kamloops-banner.jpg" backHref="/projects">
          There is no project at this address.
        </PageHero>
        <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
          <Link
            viewTransition
            to="/projects"
            className="font-display text-[11px] font-semibold tracking-[0.16em] text-blue uppercase hover:underline"
          >
            Back to projects
          </Link>
        </div>
      </>
    )
  }

  const facts = [sectorLabel[project.sector], project.region, ...project.services]

  return (
    <>
      <PageHero
        kicker={project.placeholder ? 'Sample' : undefined}
        title={project.title}
        image={project.image.src}
        backHref="/projects"
      >
        {project.summary}
      </PageHero>
      <article className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-mute">
          {project.placeholder ? (
            <span className="font-display text-[11px] font-semibold tracking-[0.16em] text-blue uppercase">
              Sample
            </span>
          ) : null}
          {facts.map((fact, index) => (
            <span key={`${fact}-${index}`} className="inline-flex items-center gap-x-3">
              {project.placeholder || index > 0 ? (
                <span className="h-3 w-px bg-line" aria-hidden="true" />
              ) : null}
              {fact}
            </span>
          ))}
        </p>
        <div className="mt-8 max-w-[65ch] space-y-4">
          {project.body.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="text-[15px] leading-relaxed text-ink">
              {paragraph}
            </p>
          ))}
        </div>
        {project.gallery?.map((frame) => (
          <img
            key={frame.src}
            src={frame.src}
            alt={frame.alt}
            className="mt-10 w-full max-w-[65ch] object-cover"
          />
        ))}
        <div className="mt-10 flex flex-col items-start gap-4">
          <Link
            viewTransition
            to={project.cta.to}
            className="bg-accent px-6 py-3 font-display text-xs font-bold tracking-[0.18em] text-ink uppercase transition-transform duration-150 active:scale-[0.98]"
          >
            {project.cta.label}
          </Link>
          {project.related ? (
            <Link
              viewTransition
              to={project.related.to}
              className="font-display text-[11px] font-semibold tracking-[0.16em] text-blue uppercase hover:underline"
            >
              {project.related.label}
            </Link>
          ) : null}
        </div>
      </article>
    </>
  )
}
