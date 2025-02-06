import Image from 'next/image'
import { Suspense } from 'react'
import '@/app/ui/about.css'

import { russKRyanProfileSummary } from '@/app/content'
import AboutCarousel from '@/app/ui/about-carousel'

import penOnNotebook from '@/public/pen-on-notebook.webp'
import squareProfile from '@/public/square-profile.webp'
import superLawyersBadge from '@/public/super-lawyers-badge.png'
import avPreeminent from '@/public/av-preeminent.png'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about the Ryan Legal, PC staff, including their education, credentials, experience, and areas of practice.',
  keywords: [
    'Ratings', 'Designations', 'Russ Ryan', 'Russell Ryan', 'Training',
    'Affiliations', 'Clients', 'Lawyer', 'Attorney', 'Education'
  ],
  alternates: {
    canonical: '/about',
  },
}

export default function Page() {
  return (
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
