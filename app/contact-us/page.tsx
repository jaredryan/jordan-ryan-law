import { Suspense } from 'react'
import ContactUsForm from '@/app/ui/contact-us-form'
import GoogleMapsAddress from '@/app/ui/google-maps-address'
import { 
  contactCards, contactDetailsJSON, 
  physicalAddressJSON, mailingAddressJSON
} from '@/app/content'
import { metadata as appMetadata } from '@/app/layout'
import Image from 'next/image'
import { WebPage, WithContext } from 'schema-dts'
import JsonLDInjector from '@/app/ui/json-ld-injector'

import '@/app/ui/contact-us.css'

import writingOnPaper from '@/public/writing-on-paper.webp'

import { Metadata } from 'next'

const description = 'How to get in touch with Ryan Legal, PC: phone, address, email, or request a consultation through our website.'
const url = '/contact-us'
const baseUrl = process.env.NEXT_PUBLIC_CURRENT_URL || ''
const keywords = [
  "Contact Ryan Legal PC",
  "Schedule Legal Consultation",
  "Employment Lawyer Consultation",
  "Business Attorney Contact",
  "Legal Services California",
  "Legal Services Utah"
]

export const metadata: Metadata = {
  title: 'Contact Us',
  description,
  keywords,
  alternates: {
    canonical: url,
  },
  openGraph: {
    ...appMetadata.openGraph,
    description,
    url,
  }
}

const webpageJsonLd: WithContext<WebPage> = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${baseUrl}/contact-us#webpage`,
  url: `${baseUrl}/contact-us`,
  name: 'Contact Ryan Legal, PC',
  keywords,
  description: 'Get in touch with Ryan Legal, PC. Schedule a consultation or ask about our legal services.',
  isPartOf: {
    '@id': `${baseUrl}/#website`,
    '@type': 'WebSite',
    url: baseUrl,
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Contact Us',
        item: `${baseUrl}/contact-us`
      }
    ]
  },
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: `${baseUrl}/opengraph-image.png`,
    caption: 'Ryan Legal, PC - Legal Services'
  },
  potentialAction: {
    '@type': 'CommunicateAction',
    name: 'Request Consultation',
    description: 'Submit a consultation request form including name, email, phone, and a message.',
    agent: {
      '@type': 'Person'
    },
    recipient: {
      '@id': `${baseUrl}#RyanLegalPC`,
      '@type': 'LegalService',
      name: 'Ryan Legal, PC',
      url: baseUrl,
      image: `${baseUrl}/opengraph-image.png`,
      address: [
        physicalAddressJSON,
        mailingAddressJSON,
      ],
      ...contactDetailsJSON,
      subjectOf: {
        '@type': 'WebPage',
        '@id': `${baseUrl}/expertise#webpage`,
        url: `${baseUrl}/expertise`,
        name: 'Ryan Legal, PC Expertise'
      },
    },
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${baseUrl}/contact-us#request-consultation`,
      actionPlatform: [
        'https://schema.org/DesktopWebPlatform',
        'https://schema.org/MobileWebPlatform'
      ]
    }
  }
}


export default function Page() {
  return (
    <div className="contactUsPage">
      <JsonLDInjector json={webpageJsonLd} />
      <div className="imageContainer">
        <Image
          src={writingOnPaper}
          alt="Writing on paper"
          className="bannerImage"
          loading="eager"
          priority={true}
          placeholder="blur"
        />
        <div className="after" />
        <div className="imageText">
          <h1>Contact Us</h1>
        </div>
      </div>
      <div className="contentSection">
        <ul className="cardsContainer pagePadding">
          {contactCards.map(card => (
            <li className="card" key={card.name}>
              <div className="icon" aria-hidden="true">{card.icon}</div>
              <h2>{card.name}</h2>
              <ul>
                {card.content.map(item => <li key={item}>{item}</li>)}
              </ul>
            </li>
          ))}
        </ul>
        <div className="pagePadding primary">
          <div className="contactFormContainer">
            <h2>Request Consultation</h2>
            <Suspense>
              <ContactUsForm />
            </Suspense>
          </div>
        </div>
        <Suspense>
          <GoogleMapsAddress />
        </Suspense>
      </div>
    </div>
  )
}
