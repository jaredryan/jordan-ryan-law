import { Suspense } from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ContactUsForm from '@/app/ui/contact-us-form'
import { transformTextToUrlParams } from '@/app/lib/utils'
import {
  businessExplanation, businessName, businessSlogan,
  businessSummary, areasOfPractice
} from '@/app/content'

import '@/app/ui/home.css'

import upperFalls from '@/public/upper-falls.webp'
import fullLogo from '@/public/full-logo.webp'
import fullLogoWhite from '@/public/full-logo-white.webp'
import attorneyWriting from '@/public/attorney-writing.webp'
import { description, keywords } from '@/app/layout'

import {
  contactCards,
  russKRyanRatingsAndDesignationsSimplified,
  knowsAbout,
} from '@/app/content'
import { LegalService, WebSite, WebPage, WithContext } from 'schema-dts'
import JsonLDInjector from '@/app/ui/json-ld-injector'

const url = process.env.NEXT_PUBLIC_CURRENT_URL || ''

export const metadata: Metadata = {
  openGraph: {
    url: '/',
  },
  alternates: {
    canonical: '/',
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
  openingHours: 'Mo-Fr 08:00-17:00',
  address: [{
    '@type': 'PostalAddress',
    addressLocality: contactCards[1].content[2].split(',')[0],
    addressRegion: 'CA',
    addressCountry: 'US',
    postalCode: contactCards[1].content[2].split(' ')[2],
    streetAddress: contactCards[1].content[0]
  }, {
    '@type': 'PostalAddress',
    postOfficeBoxNumber: contactCards[2].content[0].split(' ')[3],
    addressLocality: contactCards[2].content[1].split(',')[0],
    addressRegion: 'CA',
    addressCountry: 'US',
    postalCode: contactCards[2].content[1].split(' ')[2],
  }],
  email: contactCards[0].content[2],
  telephone: contactCards[0].content[0].split(':')[1].slice(1),
  serviceArea: [{
    '@type': 'AdministrativeArea',
    name: 'California',
  }, {
    '@type': 'AdministrativeArea',
    name: 'Utah',
  }],
  faxNumber: contactCards[0].content[1].split(':')[1].slice(1),
  knowsLanguage: ['English', 'Spanish'],
  logo: `${url}/full-logo.webp`,
  knowsAbout,
  keywords,
  award: russKRyanRatingsAndDesignationsSimplified,
  founder: {
    "@type": 'Person',
    '@id': `${url}#RussellRyan`,
    name: 'Russell Ryan',
    url: `${url}/about?expanded=true`,
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
  publisher: {
    '@type': 'LegalService',
    '@id': `${url}#RyanLegalPC`,
    name: 'Ryan Legal, PC'
  },
  isPartOf: {
    '@id': `${url}#RyanLegalPC`,
  },
  inLanguage: 'en',
  thumbnailUrl: `${url}/thumbnail.webp`,
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
  },
  about: {
    '@id': `${url}#RyanLegalPC`,
  },
  datePublished: '2024-02-01',
  dateModified: '2024-02-09',
  inLanguage: 'en',
  publisher: {
    '@id': `${url}#RyanLegalPC`
  },
  potentialAction: {
    '@type': 'CommunicateAction',
    name: 'Request Consultation',
    description: 'Submit a consultation request form including name, email, phone, and a message.',
    agent: {
      '@type': 'Person'
    },
    recipient: {
      '@id': `${url}#RyanLegalPC`
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
  return (
    <div className="homePage">
      <JsonLDInjector json={businessJsonLd} />
      <JsonLDInjector json={websiteJsonLd} />
      <JsonLDInjector json={webpageJsonLd} />
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
  )
}
