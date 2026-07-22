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

// Vision/mission copy provided directly by Russ (per Jared, 2026-07-21) — not
// legacy content, do not rewrite without checking with him first.
export const valuesAndMission: string[] = [
  `Our vision is to be a trusted partner for our clients facing legal challenges, providing expert guidance and unwavering support through every legal challenge—whether it be in the nature of a health care, employment or business process or transaction, or involve litigation, arbitration, administrative or an informal dispute. In every matter, we provide strong representation focused on achieving successful outcomes.`,
  `At the core of our practice is a simple but powerful mission: to provide exceptional, client-centered legal representation. Russ is passionate about making legal processes and compliance as clear, efficient, and stress-free as possible, allowing clients to focus on what matters most—moving their organizations and people forward in pursuit of their goals, missions, and values while remaining legally compliant.`,
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
  'Appeals',
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
  { name: 'About', href: '/about' },
  { name: 'Expertise', href: '/expertise' },
  { name: 'Contact', href: '/contact' },
  { name: 'Payment', href: '/payment' },
] as const
