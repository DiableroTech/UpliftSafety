export type Testimonial = {
  id: string
  placeholder: boolean
  quote: string
  rating: 1 | 2 | 3 | 4 | 5
  attribution: string
  detail?: string
  date?: string
  source?: 'google'
  sourceUrl?: string
}

export const testimonials: Testimonial[] = [
  {
    id: 'sample-site-supervisor',
    placeholder: true,
    rating: 5,
    attribution: 'Site supervisor',
    date: 'June 2018',
    quote:
      'They showed up ready to work with the crew, not to hand us a binder and leave.',
  },
  {
    id: 'sample-mill-lead',
    placeholder: true,
    rating: 5,
    attribution: 'Mill safety lead',
    date: 'March 2019',
    quote:
      'Lockout questions got a straight answer. The visit stayed on the work in front of us.',
  },
  {
    id: 'sample-training',
    placeholder: true,
    rating: 5,
    attribution: 'Training coordinator',
    date: 'October 2020',
    quote: 'The session matched the work our people actually do on the floor.',
  },
  {
    id: 'sample-hygiene',
    placeholder: true,
    rating: 5,
    attribution: 'Hygiene contact',
    date: 'February 2021',
    quote:
      'Sampling was explained in plain language, including what the numbers do and do not say.',
  },
  {
    id: 'sample-shift',
    placeholder: true,
    rating: 5,
    attribution: 'Shift supervisor',
    date: 'August 2022',
    quote: 'Procedures came back in a form the crew would use.',
  },
  {
    id: 'sample-plant',
    placeholder: true,
    rating: 5,
    attribution: 'Plant contact',
    date: 'January 2023',
    quote:
      'They were on time, they left the area as they found it, and the notes were clear.',
  },
  {
    id: 'sample-shutdown',
    placeholder: true,
    rating: 5,
    attribution: 'Contractor coordinator',
    date: 'May 2024',
    quote: 'A useful second set of eyes on the program before a shutdown week.',
  },
  {
    id: 'sample-crew',
    placeholder: true,
    rating: 5,
    attribution: 'Crew lead',
    date: 'November 2026',
    quote: 'Questions were welcome. The advice was specific to our site.',
  },
]

export function getTestimonialSummary(items: readonly Testimonial[]): {
  average: number
  count: number
  hasPlaceholder: boolean
} {
  const count = items.length
  if (count === 0) {
    return { average: 0, count: 0, hasPlaceholder: false }
  }

  const total = items.reduce((sum, item) => sum + item.rating, 0)
  return {
    average: Math.round((total * 10) / count) / 10,
    count,
    hasPlaceholder: items.some((item) => item.placeholder),
  }
}
