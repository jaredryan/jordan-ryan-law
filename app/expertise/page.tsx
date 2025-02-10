import Image from 'next/image'
import { Suspense } from 'react'
import { WebPage, WithContext } from 'schema-dts'
import JsonLDInjector from '@/app/ui/json-ld-injector'

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
  }
}

const webpageJsonLd: WithContext<WebPage> = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${baseUrl}/expertise#webpage`,
  url: `${baseUrl}/expertise`,
  name: 'Expertise Ryan Legal, PC',
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
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`
  },
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: `${baseUrl}/opengraph-image.png`,
    caption: 'Ryan Legal, PC - Legal Services'
  },
}

export default function Page() {
  return (
    <div className="expertisePage">
      <JsonLDInjector json={webpageJsonLd} />
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
  )
}
