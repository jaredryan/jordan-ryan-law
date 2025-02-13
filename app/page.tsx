import { Suspense } from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ContactUsForm from '@/app/ui/contact-us-form'
import { transformTextToUrlParams } from '@/app/lib/utils'
import {
  businessExplanation, businessName, businessSlogan,
  businessSummary, areasOfPractice, physicalAddressJSON,
  mailingAddressJSON, contactDetailsJSON
} from '@/app/content'
import { metadata as appMetadata } from '@/app/layout'

import '@/app/ui/home.css'

import upperFalls from '@/public/upper-falls.webp'
import fullLogo from '@/public/full-logo.webp'
import fullLogoWhite from '@/public/full-logo-white.webp'
import attorneyWriting from '@/public/attorney-writing.webp'
import { description, keywords } from '@/app/layout'

import {
  russKRyanRatingsAndDesignationsSimplified,
  knowsAbout,
} from '@/app/content'
import { LegalService, WebSite, WebPage, WithContext } from 'schema-dts'
import JsonLDInjector from '@/app/ui/json-ld-injector'

const url = process.env.NEXT_PUBLIC_CURRENT_URL || ''
const pageUrl = '/'

export const metadata: Metadata = {
  description,
  keywords,
  openGraph: {
    ...appMetadata.openGraph,
    description,
    url: pageUrl,
  },
  alternates: {
    canonical: pageUrl,
  },
}

const businessJsonLd: WithContext<LegalService> = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  '@id': `${url}#RyanLegalPC`,
  name: 'Ryan Legal, PC',
  alternateName: 'Ryan Legal',
  url,
  image: `${url}/opengraph-image.png`,
  description,
  currenciesAccepted: 'USD',
  subjectOf: {
    '@type': 'WebPage',
    '@id': `${url}/expertise#webpage`,
    url: `${url}/expertise`,
    name: 'Ryan Legal, PC Expertise'
  },
  address: [
    physicalAddressJSON,
    mailingAddressJSON,
  ],
  ...contactDetailsJSON,
  serviceArea: [{
    '@type': 'AdministrativeArea',
    name: 'California',
  }, {
    '@type': 'AdministrativeArea',
    name: 'Utah',
  }],
  knowsLanguage: ['English', 'Spanish'],
  logo: `${url}/full-logo.webp`,
  knowsAbout,
  keywords,
  award: russKRyanRatingsAndDesignationsSimplified,
  founder: {
    '@id': `${url}/about#RussellRyan`,
    '@type': 'Person',
    url: `${url}/about`
  },

  // TO-DO In Future:

  // Once Lawpay is integrated, I'll need to add those payment methods.
  // @ts-ignore
  acceptedPaymentMethod: [
    { '@type': 'PaymentMethod', name: 'Cash' },
    { '@type': 'PaymentMethod', name: 'Check' },
  ],
  // If Dad wants to upload photos of the staff/office...
  // photo: [
  //   "https://ryanlegalpc.com/office-exterior.jpg",
  //   "https://ryanlegalpc.com/interior-lobby.jpg",
  //   "https://ryanlegalpc.com/staff.jpg",
  // ]
}

const websiteJsonLd: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@id': `${url}/#website`,
  '@type': 'WebSite',
  url,
  name: 'Ryan Legal, PC',
  alternateName: 'Ryan Legal',
  description: 'The official website of Ryan Legal, PC, providing information about its areas of practice, attorney profiles, and how to get in touch to get started.',
  mainEntity: {
    '@id': `${url}#RyanLegalPC`,
    '@type': 'LegalService',
  },
  publisher: {
    '@id': `${url}#RyanLegalPC`,
    '@type': 'LegalService',
  },
  inLanguage: 'en',
  thumbnailUrl: `${url}/thumbnail.webp`,
  datePublished: '2024-02-01',
  dateModified: '2024-02-09',
}

const webpageJsonLd: WithContext<WebPage> = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${url}/#webpage`,
  url,
  name: 'Ryan Legal, PC - California Employment & Business Law Firm',
  description: 'Ryan Legal, PC provides premier legal representation for employers, health care providers, and non-profits throughout California. Expert legal services in employment law, business transactions, and litigation.',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [{
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: url
    }]
  },
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: `${url}/opengraph-image.png`,
    caption: 'Ryan Legal, PC - Legal Services'
  },
  isPartOf: {
    '@id': `${url}/#website`,
    '@type': 'WebSite',
  },
  mainEntity: {
    '@id': `${url}#RyanLegalPC`,
    '@type': 'LegalService',
  },
  potentialAction: {
    '@type': 'CommunicateAction',
    name: 'Request Consultation',
    description: 'Submit a consultation request form including name, email, phone, and a message.',
    agent: {
      '@type': 'Person'
    },
    recipient: {
      '@id': `${url}#RyanLegalPC`,
      '@type': 'LegalService',
      name: 'Ryan Legal, PC',
      url,
      image: `${url}/opengraph-image.png`,
      address: physicalAddressJSON,
    },
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${url}/#request-consultation`,
      actionPlatform: [
        'https://schema.org/DesktopWebPlatform',
        'https://schema.org/MobileWebPlatform'
      ]
    }
  }
}

export default function Page() {
  return <>
    <JsonLDInjector json={businessJsonLd} />
    <JsonLDInjector json={websiteJsonLd} />
    <JsonLDInjector json={webpageJsonLd} />
    <div className="homePage">
      <div className="imageContainer">
        <Image
          src={upperFalls}
          alt="Yosemite waterfall, located in central California"
          className="heroImage"
          loading="eager"
          priority={true}
          placeholder="blur"
        />
        <div className="after" />
        <div className="imageText pagePadding">
          <h1>{businessName}</h1>
          <h2>{businessSlogan}</h2>
          <Link
            key="Contact Us"
            href="/contact-us"
            className="button"
          >
            Contact Us
          </Link>
        </div>
      </div>
      <div className="contentSection primary">
        <div className="pagePadding">
          <Image
            src={fullLogo}
            alt="Ryan Legal, PC Logo"
            className="logoTitle light"
            loading="eager"
            priority={true}
            placeholder="blur"
          />
          <Image
            src={fullLogoWhite}
            alt="Ryan Legal, PC Logo"
            className="logoTitle dark"
            loading="eager"
            priority={true}
            placeholder="blur"
          />
          <h2>{businessSummary}</h2>
          {businessExplanation.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>
      </div>
      <div className="contentSection secondary">
        <div className="pagePadding">
          <h1>Our Practice Areas</h1>
          <ul className="practiceAreaContainer">
            {areasOfPractice.map(areaOfPractice => (
              <li key={areaOfPractice.name}>
                <Link
                  href={{
                    pathname: '/expertise',
                    query: { topic: transformTextToUrlParams(areaOfPractice.name) },
                  }}
                  className={areaOfPractice.className || ''}
                >
                  <div className="icon" aria-hidden="true">{areaOfPractice.icon}</div>
                  <h2>{areaOfPractice.name}</h2>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="requestConsultation">
        <Image
          src={attorneyWriting}
          alt="Writing on paper"
          className="bannerImage"
          loading="eager"
          aria-hidden="true"
        />
        <div className="after" />
        <div className="pagePadding">
          <h1>Request Consultation</h1>
          <Suspense>
            <ContactUsForm />
          </Suspense>
        </div>
      </div>
    </div>
  </>
}
