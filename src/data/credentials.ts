// Jordan Ryan's credentials.

export interface Education {
  institution: string
  degree: string
  rank?: string
  year?: string
}

export const education: Education[] = [
  {
    institution: 'University of California, Davis School of Law',
    degree: 'Juris Doctor',
  },
  {
    institution: 'Brigham Young University',
    degree: 'Bachelor of Science, Accounting',
  },
]

export interface BarAdmission {
  state: string
  year: string
}

export const barAdmissions: BarAdmission[] = [
  { state: 'California', year: '2013' },
  { state: 'Texas', year: '2021' },
]

export interface Certification {
  label: string
  year: string
}

export const certifications: Certification[] = [
  { label: 'Board Certified — Commercial Real Estate Law, Texas', year: '2026' },
]

export const experience: string[] = [
  'Negotiated and closed sale of a $50 million multi-family development, including the assumption of the permanent loan.',
  'Successfully led the negotiation and closing of a $60 million construction loan for a 1,000,000+ square foot logistics center.',
  'Negotiated purchase and sale agreements, including associated title and survey work, for 35 acres in California to permit construction of approximately 700,000 square feet of warehouse and office space, and 1,000+ acres in Georgia to permit construction of approximately 10,000,000 square feet of industrial and office space.',
  'Drafted and negotiated leases for over 4,000,000 square feet of industrial and office space.',
  'Adjunct Professor (Business Taxation & Managerial Accounting), University of California, Davis, Graduate School of Management, 2014-2017.',
]
