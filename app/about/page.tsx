import Image from 'next/image'
import { Suspense } from 'react'
import { metadata as appMetadata } from '@/app/layout'
import { Person, WithContext } from 'schema-dts'

import '@/app/ui/about.css'

import { 
  russKRyanProfileSummary,
  russKRyanRatingsAndDesignationsSimplifiedWithYears,
  contactCards,
  knowsAbout
} from '@/app/content'
import AboutCarousel from '@/app/ui/about-carousel'

import penOnNotebook from '@/public/pen-on-notebook.webp'
import squareProfile from '@/public/square-profile.webp'
import superLawyersBadge from '@/public/super-lawyers-badge.png'
import avPreeminent from '@/public/av-preeminent.png'

import { Metadata } from 'next'

type SearchParams = Promise<{ topic?: string }>

const description = 'Learn more about the Ryan Legal, PC staff, including their education, credentials, experience, and areas of practice.'
const getPageUrl = (topicParams: string | undefined | null) => 
  `/about?expanded=true${topicParams ? `&topic=${topicParams}` : ''}`
const keywords = [
  'Ratings', 'Designations', 'Russ Ryan', 'Russell Ryan', 'Training',
  'Affiliations', 'Clients', 'Lawyer', 'Attorney', 'Education'
]

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const params = await searchParams
  const url = getPageUrl(params.topic)

  return {
    title: 'About',
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
}

// Need to get url dynamically
const profileJsonLd = (topicParams: string): WithContext<Person> => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Russell Ryan',
  alternateName: 'Russ Ryan',
  url: getPageUrl(topicParams),
  image: [
    '/square-profile.webp',
    '/super-lawyers-badge.png',
    '/av-preeminent.png',
  ],
  description,
  address: [{
    '@type': 'PostalAddress',
    addressLocality: contactCards[1].content[2].split(',')[0],
    addressRegion: 'CA',
    postalCode: contactCards[1].content[2].split(' ')[2],
    streetAddress: contactCards[1].content[0]
  }, {
    '@type': 'PostalAddress',
    postOfficeBoxNumber: contactCards[2].content[0].split(' ')[3],
    addressLocality: contactCards[2].content[1].split(',')[0],
    addressRegion: 'CA',
    postalCode: contactCards[2].content[1].split(' ')[2],
  }],
  email: contactCards[0].content[2],
  telephone: contactCards[0].content[0].split(':')[1].slice(1),
  faxNumber: contactCards[0].content[1].split(':')[1].slice(1),
  knowsLanguage: ['English', 'Spanish'],
  award: russKRyanRatingsAndDesignationsSimplifiedWithYears,
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
    '@type': 'LegalService',
    name: 'California Bar Association'
  }, {
    '@type': 'LegalService',
    name: 'Utah Bar Association'
  }, {
    '@type': 'LegalService',
    name: 'Fresno County Bar Association'
  }, {
    '@type': 'LegalService',
    name: 'Madera County Bar Association',
    'description': 'Secretary/Treasurer (1992-1993), Vice President (1994), President (1995)'
  }, {
    '@type': 'Organization',
    name: 'American Business Trial Lawyers',
    'description': 'Board of Directors, Fresno Chapter (2008)'
  }, {
    '@type': 'Organization',
    name: 'Heartland Opportunity Center',
    'description': 'Board of Directors, Vice President (2001)'
  }, {
    '@type': 'Organization',
    name: 'Resources for Independence Central Valley',
    'description': 'Board of Directors (2009-present)'
  }, {
    '@type': 'Corporation',
    name: 'Kimberlite Corporation (dba Sonitrol)',
    'description': 'Board Chairperson (2010-present)'
  }, {
    '@type': 'EducationalOrganization',
    name: 'Center for Disability Innovation at California State University, Fresno',
    'description': 'Steering Committee (2008-present)'
  }],
  knowsAbout,
  // TO-DO -- whatever other specific Profile / Person fields I need to do
})

type Props = {
  searchParams: {
    topic: string;
    expanded: string;
  };
}

export default function Page(props: Props) {
  const { topic } = props.searchParams

  return (
    <div className="aboutPage">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd(topic)) }}
        />
        <meta property="fb:app_id" content="553360804417837" />
      </head>
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
            <h2>Russell K. Ryan — Partner and Founder</h2>
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
