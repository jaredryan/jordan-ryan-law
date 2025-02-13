import Image from 'next/image'
import { Suspense } from 'react'
import { WebPage, WithContext, LegalService } from 'schema-dts'
import JsonLDInjector from '@/app/ui/json-ld-injector'
import { physicalAddressJSON } from '@/app/content'

import ExpertiseCarousel from '@/app/ui/expertise-carousel'
import { metadata as appMetadata } from '@/app/layout'

import '@/app/ui/expertise.css'

import practice from '@/public/practice.webp'

import { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_CURRENT_URL || ''
const description = `Explore Ryan Legal, PC's expertise in employment law, business transactions, health care law, technology law, and litigation.`
const keywords = [
  "Employment Law",
  "Business Law",
  "Healthcare Law",
  "Technology Law",
  "Litigation",
  "Appellate Law",
  "Corporate Transactions",
  "Real Estate Law",
  "Regulatory Compliance",
  "Trade Secret Protection"
]

export const metadata: Metadata = {
  title: 'Expertise',
  description,
  keywords,
  openGraph: {
    ...appMetadata.openGraph,
    description,
  },
  alternates: {
    canonical: '/expertise',
  },
}

const webpageJsonLd: WithContext<WebPage> = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${baseUrl}/expertise#webpage`,
  url: `${baseUrl}/expertise`,
  name: 'Ryan Legal, PC Expertise',
  description,
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [{
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${baseUrl}`
    }, {
      '@type': 'ListItem',
      position: 2,
      name: 'Expertise',
      item: `${baseUrl}/expertise`
    }]
  },
  isPartOf: {
    '@id': `${baseUrl}/#website`,
    '@type': 'WebSite',
    url: baseUrl,
  },
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: `${baseUrl}/opengraph-image.png`,
    caption: 'Ryan Legal, PC - Legal Services'
  },
  keywords,
  mainEntity: {
    '@id': `${baseUrl}#RyanLegalPC`,
    '@type': 'LegalService',
    url: baseUrl,
  },
}

const expertiseJsonLd: WithContext<LegalService> = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  '@id': `${baseUrl}#RyanLegalPC`,
  name: 'Ryan Legal, PC',
  alternateName: 'Ryan Legal',
  url: baseUrl,
  subjectOf: {
    '@type': 'WebPage',
    '@id': `${baseUrl}/expertise#webpage`,
    url: `${baseUrl}/expertise`,
    name: 'Ryan Legal, PC Expertise'
  },
  image: `${baseUrl}/opengraph-image.png`,
  description,
  address: physicalAddressJSON,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Legal Services Offered',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Labor and Employment Law',
        description: 'Providing legal counsel to employers on workplace policies, disputes, and compliance with state and federal labor laws.'
      },
      {
        '@type': 'Offer',
        name: 'Business Transactions and Finance',
        description: 'Advising businesses on contracts, corporate governance, mergers, acquisitions, and financial structuring.'
      },
      {
        '@type': 'Offer',
        name: 'Healthcare Law',
        description: 'Assisting healthcare providers with regulatory compliance, risk management, and contractual matters.'
      },
      {
        '@type': 'Offer',
        name: 'Technology Law',
        description: 'Guiding businesses on data privacy, intellectual property protection, software agreements, and tech-related disputes.'
      },
      {
        '@type': 'Offer',
        name: 'Business Litigation',
        description: 'Representing clients in commercial disputes, contract enforcement, and corporate litigation.'
      },
      {
        '@type': 'Offer',
        name: 'Appellate Litigation',
        description: 'Handling appeals in state and federal courts to challenge or defend prior legal decisions.'
      },
    ]
  }
}

export default function Page() {
  return <>
    <JsonLDInjector json={webpageJsonLd} />
    <JsonLDInjector json={expertiseJsonLd} />
    <div className="expertisePage">
      <div className="imageContainer">
        <Image
          src={practice}
          alt="Legal system"
          className="bannerImage"
          loading="eager"
          priority={true}
          placeholder="blur"
        />
        <div className="after" />
        <div className="imageText">
          <h1>Expertise</h1>
        </div>
      </div>
      <div className="contentSection" id="topic-menu">
        <h2 className="desktop">Click any topic on the left menu below to learn more.</h2>
        <h2 className="mobile">Click any topic on the menu below to learn more.</h2>
        <Suspense>
          <ExpertiseCarousel />
        </Suspense>
      </div>
    </div>
  </>
}
