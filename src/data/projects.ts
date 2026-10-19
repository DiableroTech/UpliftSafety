export type ProjectSector = 'mining' | 'industrial' | 'forestry'

export type ProjectImage = {
  src: string
  alt: string
}

export type Project = {
  slug: string
  placeholder: boolean
  title: string
  sector: ProjectSector
  region: string
  services: string[]
  summary: string
  body: string[]
  image: ProjectImage
  gallery?: ProjectImage[]
  related?: { label: string; to: string }
  cta: { label: string; to: string }
}

const talk = { label: 'Talk about a similar job', to: '/contact' }

export const projects: Project[] = [
  {
    slug: 'sample-open-pit',
    placeholder: true,
    title: 'Field support through a winter pit season',
    sector: 'mining',
    region: 'Interior British Columbia',
    services: ['Safety programs', 'On-site advisors'],
    summary:
      'Seasonal field support for an open pit: programs, crew contact, and a consultant on the ground through winter.',
    body: [
      'A pit does not pause for the season. Crews keep moving, contractors come and go, and the safety program has to hold up in the cold. This sample shows how a mining engagement would read on the site.',
      'Uplift is on site for the work itself: procedures the crew will actually use, time with supervisors, and a clear line back to the people who own the program. Names, dates, and outcomes go here when the real job replaces this sample.',
    ],
    image: {
      src: '/projects/sample-open-pit.jpg',
      alt: 'A person in high-visibility gear stands above a snowy open pit.',
    },
    gallery: [
      {
        src: '/projects/sample-open-pit-gallery.jpg',
        alt: 'Two workers in yellow protective suits on a dark industrial slope.',
      },
    ],
    related: { label: 'Safety services', to: '/services' },
    cta: talk,
  },
  {
    slug: 'sample-mill-lockout',
    placeholder: true,
    title: 'Lockout program on a processing line',
    sector: 'industrial',
    region: 'Western Canada',
    services: ['Lockout procedures', 'Safety programs'],
    summary:
      'A lockout program for a processing line, built so crews can isolate equipment before the work starts.',
    body: [
      'Processing lines run close to people. Guards, energy sources, and shift change all sit in the same aisle. This sample shows how an industrial lockout engagement would read on the site.',
      'Uplift writes the lockout steps for the equipment that is actually there, then walks them with the people who use them. Names, dates, and outcomes go here when the real job replaces this sample.',
    ],
    image: {
      src: '/projects/sample-mill-lockout.jpg',
      alt: 'A person in a hard hat stands beside a lockout board in a mill.',
    },
    gallery: [
      {
        src: '/projects/sample-mill-lockout-gallery.jpg',
        alt: 'A person in a respirator and hard hat inside a plant.',
      },
    ],
    related: { label: 'Safety services', to: '/services' },
    cta: talk,
  },
  {
    slug: 'sample-forest-mill',
    placeholder: true,
    title: 'Safety programs for a forest-products mill',
    sector: 'forestry',
    region: 'British Columbia',
    services: ['Safety programs', 'Audits'],
    summary:
      'Safety programs for a forest-products mill, from the yard to the line, shaped for the way that site runs.',
    body: [
      'A mill sits between the bush and the product. Contractors, mobile equipment, and a fixed line share one yard. This sample shows how a forestry engagement would read on the site.',
      'Uplift builds the programs the mill will run: procedures, responsibilities, and the audits those programs have to survive. Names, dates, and outcomes go here when the real job replaces this sample.',
    ],
    image: {
      src: '/projects/sample-forest-mill.jpg',
      alt: 'A mill at dusk beyond an open field.',
    },
    related: { label: 'Safety services', to: '/services' },
    cta: talk,
  },
  {
    slug: 'sample-plant-sampling',
    placeholder: true,
    title: 'Exposure monitoring inside an operating plant',
    sector: 'industrial',
    region: 'British Columbia',
    services: ['Hygiene monitoring'],
    summary:
      'Exposure monitoring inside an operating plant, so the site knows what people are breathing and what to change.',
    body: [
      'Plants keep running while the measurements are taken. Sampling has to fit the shift, the task, and the people doing the work. This sample shows how a hygiene engagement would read on the site.',
      'Uplift sets the monitors, reads the results, and turns them into controls the site can use. Names, dates, and outcomes go here when the real job replaces this sample.',
    ],
    image: {
      src: '/projects/sample-plant-sampling.jpg',
      alt: 'A person crouches on a plant floor beside sampling equipment.',
    },
    gallery: [
      {
        src: '/projects/sample-plant-sampling-gallery.jpg',
        alt: 'A person at a desk with air-sampling pumps and a laptop.',
      },
    ],
    related: { label: 'Hygiene services', to: '/services/hygiene' },
    cta: talk,
  },
  {
    slug: 'sample-crew-training',
    placeholder: true,
    title: 'Crew training ahead of a site mobilization',
    sector: 'mining',
    region: 'Kamloops',
    services: ['Safety training'],
    summary:
      'Crew training before a mobilization, so people arrive on site knowing the work and their part in it.',
    body: [
      'Training happens in a room before it happens on the ground. Supervisors and crews sit together and work through the job they are about to do. This sample shows how a training engagement would read on the site.',
      'Uplift teaches the course in plain language and leaves the site with people who can run it again. Names, dates, and outcomes go here when the real job replaces this sample.',
    ],
    image: {
      src: '/projects/sample-crew-training.jpg',
      alt: 'A trainer stands with a class of workers in high-visibility vests.',
    },
    related: { label: 'Safety Training', to: '/training' },
    cta: talk,
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
