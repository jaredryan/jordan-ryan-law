import Image from 'next/image'
import { Suspense } from 'react'
import { metadata as appMetadata } from '@/app/layout'
import { Metadata } from 'next'

import '@/app/ui/about.css'

import { 
  aboutKeywords,
  russKRyanProfileSummary,
  russKRyanRatingsAndDesignationsSimplifiedWithYears,
  physicalAddressJSON,
  knowsAbout,
} from '@/app/content'
import AboutCarousel from '@/app/ui/about-carousel'
import JsonLDInjector from '@/app/ui/json-ld-injector'
import { WebPage, WithContext, Person } from 'schema-dts'

import penOnNotebook from '@/public/pen-on-notebook.webp'
import squareProfile from '@/public/square-profile.webp'
import superLawyersBadge from '@/public/super-lawyers-badge.png'
import avPreeminent from '@/public/av-preeminent.png'

const baseUrl = process.env.NEXT_PUBLIC_CURRENT_URL || ''
const pageUrl = '/about'
const description = 'Learn more about the Ryan Legal, PC staff, including their education, credentials, experience, and areas of practice.'

export const metadata: Metadata = {
  title: 'About',
  description,
  keywords: aboutKeywords,
  openGraph: {
    ...appMetadata.openGraph,
    description,
    url: pageUrl,
    title: 'About Ryan Legal, PC',
  },
  alternates: {
    canonical: pageUrl,
  },
}

const webpageJsonLd: WithContext<WebPage> = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${baseUrl}/about#webpage`,
  url: `${baseUrl}/about`,
  name: 'About Ryan Legal, PC',
  description,
  keywords: aboutKeywords,
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
      name: 'About',
      item: `${baseUrl}/about`
    }]
  },
  isPartOf: {
    '@id': `${baseUrl}/#website`,
    '@type': 'WebSite',
    url: baseUrl,
  },
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: `${baseUrl}/square-profile.webp`,
    caption: 'Russ Ryan - Founder and Owner of Ryan Legal, PC'
  },
  mainEntity: {
    '@id': `${baseUrl}/about#RussellRyan`,
    '@type': 'Person',
    url: `${baseUrl}/about`,
  },
  about: {
    '@id': `${baseUrl}#RyanLegalPC`,
    '@type': 'LegalService',
    url: baseUrl,
  },
}

const profileJsonLd: WithContext<Person> = {
  '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${baseUrl}/about#RussellRyan`,
    name: 'Russell Ryan',
    alternateName: 'Russ',
    givenName: 'Russell',
    familyName: 'Ryan',
    url: `${baseUrl}/about`,
    image: `${baseUrl}/square-profile.webp`,
    description,
    knowsLanguage: ['English', 'Spanish'],
    award: russKRyanRatingsAndDesignationsSimplifiedWithYears,
    jobTitle: 'Founder and Owner',
    alumniOf: [{
      "@type": "CollegeOrUniversity",
      "name": "University of California, Berkeley School of Law",
      "sameAs": "https://www.law.berkeley.edu"
    }, {
      "@type": "CollegeOrUniversity",
      "name": "Brigham Young University",
      "sameAs": "https://www.byu.edu"
    }],
    memberOf: [{
      '@type': 'Organization',
      name: 'California Bar Association'
    }, {
      '@type': 'Organization',
      name: 'Utah Bar Association'
    }, {
      '@type': 'Organization',
      name: 'Fresno County Bar Association'
    }, {
      '@type': 'Organization',
      name: 'Madera County Bar Association',
      description: 'Secretary/Treasurer (1992-1993), Vice President (1994), President (1995)'
    }, {
      '@type': 'Organization',
      name: 'American Business Trial Lawyers',
      description: 'Board of Directors, Fresno Chapter (2008)'
    }, {
      '@type': 'Organization',
      name: 'Heartland Opportunity Center',
      description: 'Board of Directors, Vice President (2001)'
    }, {
      '@type': 'Organization',
      name: 'Resources for Independence Central Valley',
      description: 'Board of Directors (2009-present)'
    }, {
      '@type': 'Organization',
      name: 'Kimberlite Corporation (dba Sonitrol)',
      description: 'Board Chairperson (2010-present)'
    }, {
      '@type': 'Organization',
      name: 'Center for Disability Innovation at California State University, Fresno',
      description: 'Steering Committee (2008-present)'
    }],
    knowsAbout,
    honorificSuffix: "JD, Esq.",
    worksFor: {
      '@id': `${baseUrl}#RyanLegalPC`,
      '@type': 'LegalService',
      name: 'Ryan Legal, PC',
      url: baseUrl,
      image: `${baseUrl}/opengraph-image.png`,
      address: physicalAddressJSON,
      subjectOf: {
        '@type': 'WebPage',
        '@id': `${baseUrl}/expertise#webpage`,
        url: `${baseUrl}/expertise`,
        name: 'Ryan Legal, PC Expertise'
      },
    },
}


export default async function Page() {
  return <>
    <JsonLDInjector json={webpageJsonLd} />
    <JsonLDInjector json={profileJsonLd} />
    <div className="aboutPage">
      
      <div className="imageContainer">
        <Image
          src={penOnNotebook}
          alt="Pen resting on paper"
          className="bannerImage"
          loading="eager"
          priority={true}
          placeholder="blur"
        />
        <div className="after" />
        <div className="imageText">
          <h1>About Us</h1>
        </div>
      </div>
      <div className="contentSection pagePadding">
        <div className="profile">
          <div className="profileImages">
            <Image
              src={squareProfile}
              alt="Russell K. Ryan"
              className="squareProfileImage"
              loading="eager"
              priority={true}
              placeholder="blur"
            />
            <div className="badgeContainer">
              <Image
                src={superLawyersBadge}
                alt="Super Lawyers Badge"
                className="superLawyersBadge"
                loading="eager"
                priority={true}
                placeholder="blur"
              />
              <Image
                src={avPreeminent}
                alt="AV Preeminent Badge"
                className="avPreeminentBadge"
                loading="eager"
                priority={true}
                placeholder="blur"
              />
            </div>
          </div>  
          <div className="profileInformation">
            <h2>Russell K. Ryan — Founder and Owner</h2>
            <div className="introduction">
              {russKRyanProfileSummary.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="carouselSection pagePadding" id="topic-menu">
        <h2 className="desktop">Click any topic on the left menu below to learn more.</h2>
        <h2 className="mobile">Click any topic on the menu below to learn more.</h2>
        <Suspense>
          <AboutCarousel />
        </Suspense>
      </div>
    </div>
  </>
}
