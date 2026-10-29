export type EditorialShowcaseItem = {
  id: string
  title: string
  description: string
  to: string
  image: {
    src: string
    alt: string
    objectPosition?: string
  }
}

export type EditorialShowcase = {
  id: 'services' | 'training'
  eyebrow: string
  title: string
  intro: string
  cta: {
    label: string
    to: string
  }
  imageSide: 'left' | 'right'
  items: readonly EditorialShowcaseItem[]
}

export const homeEditorialShowcases: readonly EditorialShowcase[] = [
  {
    id: 'services',
    eyebrow: 'Safety services',
    title: 'Safety support built around the work',
    intro:
      'Programs, field support, and practical advice shaped around the hazards, people, and pace of your operation.',
    cta: {
      label: 'Explore safety services',
      to: '/services',
    },
    imageSide: 'left',
    items: [
      {
        id: 'industrial-hygiene',
        title: 'Industrial hygiene',
        description:
          'Exposure monitoring, air quality, welding fume, ergonomics, and hazardous materials.',
        to: '/services/hygiene',
        image: {
          src: '/home-showcases/industrial-hygiene.jpg',
          alt: 'A worker wearing a respirator inside an operating industrial plant.',
          objectPosition: '42% center',
        },
      },
      {
        id: 'safety-programs',
        title: 'Safety programs',
        description:
          'Procedures, lockout, confined space, and programs built for the way the site operates.',
        to: '/services',
        image: {
          src: '/home-showcases/safety-programs.jpg',
          alt: 'A worker standing beside a lockout procedure board in a mill.',
          objectPosition: '46% center',
        },
      },
      {
        id: 'audits-compliance',
        title: 'Audits and compliance',
        description:
          'Hazard assessments, COR and OSSE audits, and clear priorities for improvement.',
        to: '/services',
        image: {
          src: '/home-showcases/audits-compliance.jpg',
          alt: 'A safety professional assessing equipment inside a processing facility.',
          objectPosition: 'center 48%',
        },
      },
      {
        id: 'on-site-advisors',
        title: 'On-site advisors',
        description:
          'Experienced safety support for projects, shutdowns, leadership, and daily operations.',
        to: '/services',
        image: {
          src: '/home-showcases/on-site-advisors.jpg',
          alt: 'A safety professional at a snow-covered industrial site.',
          objectPosition: 'center 45%',
        },
      },
    ],
  },
  {
    id: 'training',
    eyebrow: 'Safety training',
    title: 'Training that holds up on site',
    intro:
      'Practical instruction for the work people are expected to lead, supervise, and complete safely.',
    cta: {
      label: 'Explore safety training',
      to: '/training',
    },
    imageSide: 'right',
    items: [
      {
        id: 'asbestos-certification',
        title: 'Asbestos certification',
        description:
          'WorkSafeBC Level 1 and Level 2 training for awareness and abatement work.',
        to: '/training',
        image: {
          src: '/home-showcases/asbestos-certification.jpg',
          alt: 'Workers wearing protective equipment on an industrial slope.',
          objectPosition: 'center 38%',
        },
      },
      {
        id: 'leadership-supervision',
        title: 'Leadership and supervision',
        description:
          'Training for supervisors, managers, committees, and leaders responsible for safety performance.',
        to: '/training',
        image: {
          src: '/home-showcases/leadership-supervision.jpg',
          alt: 'An instructor leading a classroom of workers in high-visibility clothing.',
          objectPosition: 'center center',
        },
      },
      {
        id: 'hazard-incident-training',
        title: 'Hazard and incident training',
        description:
          'Confined space, risk assessment, investigations, fall protection, and safeguarding.',
        to: '/training',
        image: {
          src: '/home-showcases/hazard-incident-training.jpg',
          alt: 'A safety professional wearing a hard hat at an industrial site.',
          objectPosition: 'center 35%',
        },
      },
      {
        id: 'equipment-training',
        title: 'Equipment training',
        description:
          'Practical mobile-equipment instruction for operators working in industrial environments.',
        to: '/training/equipment',
        image: {
          src: '/home-showcases/equipment-training.jpg',
          alt: 'An industrial facility operating at sunset.',
          objectPosition: 'center 42%',
        },
      },
    ],
  },
]
