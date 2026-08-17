// Firm-level facts: identity, contact details, and page-level SEO defaults.

export const siteUrl = import.meta.env.SITE_URL || 'https://jordanryanlaw.netlify.app'

export const businessName = 'Jordan Ryan Law, PLLC'

// TODO: placeholder — swap for real firm positioning copy once available.
export const businessSlogan = 'Commercial Real Estate Counsel for Acquisitions, Development, and Finance Transactions'

export const businessSummary = businessSlogan

// TODO: placeholder — swap for real firm positioning copy once available.
export const defaultDescription =
  'Commercial real estate legal counsel serving McKinney, Texas and beyond — acquisitions, leasing, finance, due diligence, entity formation, and development.'

export const valuesAndMission: string[] = [
  `With experience spanning private practice and service as chief legal officer for a national industrial and multi-family developer, Jordan Ryan Law provides practical, business-minded legal counsel tailored to commercial real estate and business transactions. The firm represents developers, investors, and business owners in acquisitions, dispositions, leasing, financing, development, entity formation, contract negotiations, and general business matters, delivering strategic solutions designed to help clients achieve their goals efficiently and confidently.`,
]

// TODO: placeholder — swap for real SEO keywords once available.
export const defaultKeywords: string[] = [
  'Commercial Real Estate Attorney McKinney',
  'Real Estate Finance Lawyer Texas',
  'Acquisition and Disposition Attorney',
  'Commercial Leasing Lawyer',
  'Due Diligence Attorney Texas',
  'Entity Formation Lawyer',
  'Joint Ventures Attorney',
  'Real Estate Development Counsel',
]

export const knowsAbout: string[] = [
  'Acquisition & Disposition',
  'Leasing',
  'Real Estate Finance',
  'Due Diligence',
  'Entity Formation & Joint Ventures',
  'Development',
]

export const contact = {
  phoneDisplay: '(972) 302-2429',
  // E.164-ish, digits only, used for tel: links.
  phoneHref: '+19723022429',
  email: 'jordanryan@jordanryanlaw.com',
}

export const address = {
  street: '7300 State Hwy 121',
  suite: 'Suite 300',
  city: 'McKinney',
  state: 'TX',
  postalCode: '75070',
  country: 'US',
  lat: 33.134435,
  lng: -96.708602,
  googleMapsDirectionsUrl:
    'https://www.google.com/maps/place/7300+State+Hwy+121+%23300,+McKinney,+TX+75070/@33.134435,-96.708602,17z',
}

export const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
] as const
