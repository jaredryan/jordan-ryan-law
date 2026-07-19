// Firm-level facts: identity, contact details, and page-level SEO defaults.
// Verbatim content preserved from the pre-migration Next.js app — see
// docs/legacy-content-inventory.md.

export const siteUrl = import.meta.env.SITE_URL || 'https://ryanlegalpc.com'

export const businessName = 'Ryan Legal, PC'

export const businessSlogan =
  'Premier Representation of Employers, Health Care Providers and Non-Profits throughout California'

export const businessSummary = businessSlogan

export const defaultDescription =
  'Premier Legal Representation of Employers, Health Care Providers and Non-Profits throughout California'

export const businessExplanation: string[] = [
  `Ryan Legal, PC, is a Central California full-service law firm whose practice focuses on labor and employment, health care, non-profit representation and business litigation. For more than 35 years Russ Ryan and his legal team has provided the highest quality of legal representation for local and national clients.`,
  `Ryan Legal has particular expertise in working with Federally Qualified Health Centers and health clinics, Community Action Agencies, Head Start Programs and both California and out-of-state employers navigating California's complex employment and wage and hour laws and regulations.`,
  `Whether it's the defense of "bet the company" class action litigation, strategic counseling and development of best practices personnel policies and employment agreements, or litigation of employment or business matters, Ryan Legal will provide the best possible representation in a timely, responsive and efficient manner.`,
]

export const defaultKeywords: string[] = [
  'Employment Lawyer Fresno',
  'Business Attorney California',
  'Health Care Legal Services',
  'Litigation Attorney Central Valley',
  'Real Estate Attorney California',
  'Corporate Compliance Lawyer',
  'Trade Secret Litigation',
  'Technology Attorney California',
  'Workplace Disputes Legal Help',
  'HR Compliance Lawyer',
]

export const knowsAbout: string[] = [
  'Labor and Employment Law',
  'Business Transactions and Finance',
  'Health Care Law',
  'Technology Law',
  'Business Litigation',
  'Appellate Litigation',
  'Real Estate Law',
]

export const contact = {
  phoneDisplay: '(559) 499-4000',
  // E.164-ish, digits only, used for tel: links.
  phoneHref: '+15594994000',
  emails: {
    russ: 'russ@ryanlegalpc.com',
    crystal: 'crystal@ryanlegalpc.com',
  },
}

export const address = {
  street: '5200 North Palm Avenue',
  suite: 'Suite 306',
  city: 'Fresno',
  state: 'CA',
  postalCode: '93704',
  country: 'US',
  // Preserved from the previous @vis.gl/react-google-maps marker.
  lat: 36.81224531879936,
  lng: -119.80423819568016,
  googleMapsDirectionsUrl:
    'https://www.google.com/maps/place/5200+N+Palm+Ave+%23306,+Fresno,+CA+93704/@36.8115688,-119.8070387,17z',
}

export const lawPayUrl = 'https://secure.lawpay.com/pages/ryanlegalpc/operating'

export const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Expertise', href: '/expertise' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Payment', href: '/payment' },
] as const
