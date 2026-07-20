// JSON-LD builders. Shapes preserved from the pre-migration app's schema-dts
// literals, but as plain typed objects (schema-dts itself was dropped — see
// docs/legacy-content-inventory.md) and rendered server-side in
// BaseLayout.astro instead of client-injected via useEffect, which means
// crawlers that don't execute JS now actually see this data.

import { siteUrl, businessName, defaultDescription, defaultKeywords, contact, address, knowsAbout } from '@/data/site'
import { education, ratingsAndDesignations } from '@/data/credentials'
import { russRyan, crystalBrightwell } from '@/data/people'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type JsonLd = Record<string, any>

// Stable @id conventions (all resolve against the production siteUrl, never
// a preview/branch/localhost origin — see SITE_URL in src/data/site.ts):
//   firm:    `${siteUrl}#RyanLegalPC`
//   website: `${siteUrl}/#website`
//   people:  `${siteUrl}/about#<PersonSlug>` (About is their canonical page,
//            referenced by @id — never redefined — from other pages)
//   pages:   `${siteUrl}<path>#webpage`
export const firmId = `${siteUrl}#RyanLegalPC`
export const websiteId = `${siteUrl}/#website`
export const russRyanId = `${siteUrl}/about#RussellRyan`
export const crystalBrightwellId = `${siteUrl}/about#CrystalBrightwell`

const ratingsSimplified = ratingsAndDesignations.map((r) => r.simplified)

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
    // Bar admissions (src/data/credentials.ts) cover both CA and UT — no
    // opening-hours claim, since none is published anywhere on the site.
    serviceArea: [
      { '@type': 'AdministrativeArea', name: 'California' },
      { '@type': 'AdministrativeArea', name: 'Utah' },
    ],
    knowsLanguage: ['English', 'Spanish'],
    logo: `${siteUrl}/full-logo.webp`,
    knowsAbout,
    keywords: defaultKeywords,
    award: ratingsSimplified,
    founder: { '@id': russRyanId },
    // Matches the /payment page verbatim ("Major credit and debit cards,
    // processed securely by LawPay") — the previous Cash/Check claim wasn't
    // supported by any visible content.
    acceptedPaymentMethod: [
      { '@type': 'PaymentMethod', name: 'Credit Card' },
      { '@type': 'PaymentMethod', name: 'Debit Card' },
    ],
    employee: [{ '@id': crystalBrightwellId }],
  }
}

export function websiteJsonLd(): JsonLd {
  return {
    '@id': websiteId,
    '@type': 'WebSite',
    url: siteUrl,
    name: businessName,
    alternateName: 'Ryan Legal',
    description:
      'The official website of Ryan Legal, PC, providing information about its areas of practice, attorney profile, and how to get in touch to get started.',
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
      caption: 'Ryan Legal, PC - Legal Services',
    },
    mainEntity: opts.mainEntity ?? [{ '@id': firmId }],
    ...(opts.mentions && opts.mentions.length > 0 ? { mentions: opts.mentions } : {}),
  }
}

export function russRyanPersonJsonLd(): JsonLd {
  return {
    '@type': 'Person',
    '@id': russRyanId,
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
    // Institution names match src/data/credentials.ts verbatim.
    alumniOf: education.map((e) => ({ '@type': 'CollegeOrUniversity', name: e.institution })),
    worksFor: { '@id': firmId },
  }
}

// Crystal is support staff, never an attorney — she must never be typed as
// Attorney/LegalService, given credentials Russ holds, or given contact
// details/imagery/biography beyond what's already published (see
// src/data/people.ts and docs/legacy-content-inventory.md).
export function crystalBrightwellPersonJsonLd(): JsonLd {
  return {
    '@type': 'Person',
    '@id': crystalBrightwellId,
    name: crystalBrightwell.name,
    url: `${siteUrl}/about`,
    jobTitle: crystalBrightwell.workingTitle,
    // Tenure is published on both Home and About (e.g. "24 years with Ryan
    // Legal") — restating it here doesn't introduce a new claim.
    description: `${crystalBrightwell.workingTitle}, with ${businessName} for over ${crystalBrightwell.tenureYears} years.`,
    email: contact.emails.crystal,
    worksFor: { '@id': firmId },
  }
}
