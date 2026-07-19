// JSON-LD builders. Shapes preserved from the pre-migration app's schema-dts
// literals, but as plain typed objects (schema-dts itself was dropped — see
// docs/legacy-content-inventory.md) and rendered server-side in
// BaseLayout.astro instead of client-injected via useEffect, which means
// crawlers that don't execute JS now actually see this data.

import { siteUrl, businessName, defaultDescription, defaultKeywords, contact, address, knowsAbout } from '@/data/site'
import { ratingsAndDesignations } from '@/data/credentials'
import { russRyan } from '@/data/people'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type JsonLd = Record<string, any>

const ratingsSimplified = ratingsAndDesignations.map((r) => r.simplified)

export function legalServiceJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': `${siteUrl}#RyanLegalPC`,
    name: businessName,
    alternateName: 'Ryan Legal',
    url: siteUrl,
    image: `${siteUrl}/opengraph-image.png`,
    description: defaultDescription,
    currenciesAccepted: 'USD',
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.state,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    telephone: contact.phoneHref,
    email: [contact.emails.russ, contact.emails.crystal],
    openingHours: 'Mo-Fr 08:00-17:00',
    serviceArea: [
      { '@type': 'AdministrativeArea', name: 'California' },
      { '@type': 'AdministrativeArea', name: 'Utah' },
    ],
    knowsLanguage: ['English', 'Spanish'],
    logo: `${siteUrl}/full-logo.webp`,
    knowsAbout,
    keywords: defaultKeywords,
    award: ratingsSimplified,
    founder: {
      '@id': `${siteUrl}/about#RussellRyan`,
      '@type': 'Person',
      url: `${siteUrl}/about`,
    },
    acceptedPaymentMethod: [
      { '@type': 'PaymentMethod', name: 'Cash' },
      { '@type': 'PaymentMethod', name: 'Check' },
    ],
  }
}

export function websiteJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@id': `${siteUrl}/#website`,
    '@type': 'WebSite',
    url: siteUrl,
    name: businessName,
    alternateName: 'Ryan Legal',
    description:
      'The official website of Ryan Legal, PC, providing information about its areas of practice, attorney profile, and how to get in touch to get started.',
    mainEntity: { '@id': `${siteUrl}#RyanLegalPC`, '@type': 'LegalService' },
    publisher: { '@id': `${siteUrl}#RyanLegalPC`, '@type': 'LegalService' },
    inLanguage: 'en',
  }
}

export function webPageJsonLd(opts: {
  path: string
  name: string
  description: string
  breadcrumbs: { name: string; path: string }[]
}): JsonLd {
  const url = `${siteUrl}${opts.path}`
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: opts.name,
    description: opts.description,
    isPartOf: { '@id': `${siteUrl}/#website`, '@type': 'WebSite' },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: opts.breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: `${siteUrl}${crumb.path}`,
      })),
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: `${siteUrl}/opengraph-image.png`,
      caption: 'Ryan Legal, PC - Legal Services',
    },
    mainEntity: { '@id': `${siteUrl}#RyanLegalPC`, '@type': 'LegalService' },
  }
}

export function russRyanPersonJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}/about#RussellRyan`,
    name: russRyan.name,
    alternateName: russRyan.alternateName,
    givenName: russRyan.givenName,
    familyName: russRyan.familyName,
    url: `${siteUrl}/about`,
    image: `${siteUrl}/square-profile.webp`,
    jobTitle: russRyan.jobTitle,
    honorificSuffix: russRyan.honorificSuffix,
    knowsLanguage: russRyan.languages,
    knowsAbout,
    award: ratingsAndDesignations.map((r) => `${r.simplified} — ${r.years}`),
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'University of California, Berkeley School of Law' },
      { '@type': 'CollegeOrUniversity', name: 'Brigham Young University' },
    ],
    worksFor: {
      '@id': `${siteUrl}#RyanLegalPC`,
      '@type': 'LegalService',
      name: businessName,
      url: siteUrl,
    },
  }
}
