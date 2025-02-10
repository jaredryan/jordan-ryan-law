import Image from 'next/image'
import { Suspense } from 'react'
import { metadata as appMetadata } from '@/app/layout'
import { Metadata } from 'next'

import '@/app/ui/about.css'

import { 
  aboutKeywords,
  russKRyanProfileSummary,
} from '@/app/content'
import AboutCarousel from '@/app/ui/about-carousel'
import JsonLDInjector from '@/app/ui/json-ld-injector'
import { WebPage, WithContext } from 'schema-dts'

import penOnNotebook from '@/public/pen-on-notebook.webp'
import squareProfile from '@/public/square-profile.webp'
import superLawyersBadge from '@/public/super-lawyers-badge.png'
import avPreeminent from '@/public/av-preeminent.png'

const baseUrl = process.env.NEXT_PUBLIC_CURRENT_URL || ''
const description = 'Learn more about the Ryan Legal, PC staff, including their education, credentials, experience, and areas of practice.'

export const metadata: Metadata = {
  title: 'About',
  description,
  keywords: aboutKeywords,
  openGraph: {
    ...appMetadata.openGraph,
    description,
  },
}

const webpageJsonLd: WithContext<WebPage> = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${baseUrl}/about#webpage`,
  url: `${baseUrl}/about`,
  name: 'About Ryan Legal, PC',
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
      name: 'About',
      item: `${baseUrl}/about`
    }]
  },
  isPartOf: {
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`
  },
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: `${baseUrl}/square-profile.webp`,
    caption: 'Russ Ryan - Founder and Owner of Ryan Legal, PC'
  },
  about: {
    '@type': 'Person',
    '@id': `${baseUrl}#RussellRyan`
  },
}


export default async function Page() {
  return (
    <div className="aboutPage">
      <JsonLDInjector json={webpageJsonLd} />
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
  )
}
