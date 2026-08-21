// JSON-LD builders, rendered server-side in BaseLayout.astro.

import { siteUrl, businessName, defaultDescription, defaultKeywords, contact, address, knowsAbout } from '@/data/site'
import { certifications } from '@/data/credentials'
import { jordanRyan } from '@/data/people'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type JsonLd = Record<string, any>

// Stable @id conventions (all resolve against the production siteUrl, never
// a preview/branch/localhost origin — see SITE_URL in src/data/site.ts):
//   firm:    `${siteUrl}#JordanRyanLaw`
//   website: `${siteUrl}/#website`
//   people:  `${siteUrl}/about/#<PersonSlug>` (About is their canonical page,
//            referenced by @id — never redefined — from other pages)
//   pages:   `${siteUrl}<path>#webpage`
export const firmId = `${siteUrl}#JordanRyanLaw`
export const websiteId = `${siteUrl}/#website`
export const jordanRyanId = `${siteUrl}/about/#JordanRyan`

// Combines already-built entities into one connected @graph rather than
// several isolated top-level JSON-LD objects. Per-entity `@context` is
// dropped since only the graph root needs one (JSON-LD spec).
export function buildGraph(entities: JsonLd[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@graph': entities.map(({ '@context': _drop, ...rest }) => rest),
  }
}

export function legalServiceJsonLd(): JsonLd {
  return {
    '@type': 'LegalService',
    '@id': firmId,
    name: businessName,
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
    email: contact.email,
    serviceArea: [{ '@type': 'AdministrativeArea', name: 'Texas' }],
    knowsLanguage: jordanRyan.languages,
    logo: `${siteUrl}/full-logo.webp`,
    knowsAbout,
    keywords: defaultKeywords,
    founder: { '@id': jordanRyanId },
  }
}

export function websiteJsonLd(): JsonLd {
  return {
    '@id': websiteId,
    '@type': 'WebSite',
    url: siteUrl,
    name: businessName,
    description: `The official website of ${businessName}, providing information about its areas of practice, attorney profile, and how to get in touch to get started.`,
    mainEntity: { '@id': firmId },
    publisher: { '@id': firmId },
    inLanguage: 'en',
  }
}

export function webPageJsonLd(opts: {
  path: string
  name: string
  description: string
  /** Omit for pages that don't warrant a breadcrumb trail (e.g. Home alone). */
  breadcrumbs?: { name: string; path: string }[]
  /** Defaults to 'WebPage'; use a more specific type only where it adds real value. */
  pageType?: 'WebPage' | 'AboutPage' | 'ContactPage'
  /** Defaults to the firm entity. Pass an explicit list for pages primarily about specific people. */
  mainEntity?: { '@id': string }[]
  /** Lightweight @id-only references to entities discussed on the page, without redefining them. */
  mentions?: { '@id': string }[]
}): JsonLd {
  const url = `${siteUrl}${opts.path}`
  return {
    '@type': opts.pageType ?? 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: opts.name,
    description: opts.description,
    inLanguage: 'en',
    isPartOf: { '@id': websiteId },
    ...(opts.breadcrumbs && opts.breadcrumbs.length > 1
      ? {
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: opts.breadcrumbs.map((crumb, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: crumb.name,
              item: `${siteUrl}${crumb.path}`,
            })),
          },
        }
      : {}),
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: `${siteUrl}/opengraph-image.png`,
      caption: `${businessName} - Legal Services`,
    },
    mainEntity: opts.mainEntity ?? [{ '@id': firmId }],
    ...(opts.mentions && opts.mentions.length > 0 ? { mentions: opts.mentions } : {}),
  }
}

export function jordanRyanPersonJsonLd(): JsonLd {
  return {
    '@type': 'Person',
    '@id': jordanRyanId,
    name: jordanRyan.name,
    alternateName: jordanRyan.alternateName,
    givenName: jordanRyan.givenName,
    familyName: jordanRyan.familyName,
    url: `${siteUrl}/about/`,
    image: `${siteUrl}/square-profile.webp`,
    jobTitle: jordanRyan.jobTitle,
    honorificSuffix: jordanRyan.honorificSuffix,
    knowsLanguage: jordanRyan.languages,
    knowsAbout,
    award: certifications.map((c) => `${c.label} — ${c.year}`),
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'University of California, Davis, School of Law' },
      { '@type': 'CollegeOrUniversity', name: 'Brigham Young University' },
    ],
    worksFor: { '@id': firmId },
  }
}
