// Practice-area names shown on Home. No per-area detail copy exists yet
// (the Expertise page that used to hold it has been removed) — this is
// intentionally just a name list until that content is written.

export interface PracticeArea {
  slug: string
  name: string
}

export const areasOfPractice: PracticeArea[] = [
  { slug: 'acquisition-and-disposition', name: 'Acquisition & Disposition' },
  { slug: 'leasing', name: 'Leasing' },
  { slug: 'real-estate-finance', name: 'Real Estate Finance' },
  { slug: 'due-diligence', name: 'Due Diligence' },
  { slug: 'entity-formation-and-joint-ventures', name: 'Entity Formation & Joint Ventures' },
  { slug: 'development', name: 'Development' },
]
