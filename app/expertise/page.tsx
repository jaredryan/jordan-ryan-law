import Image from 'next/image'
import { Suspense } from 'react'
import ExpertiseCarousel from '@/app/ui/expertise-carousel'

import '@/app/ui/expertise.css'

import practice from '@/public/practice.webp'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Expertise',
  description: 'Learn about which areas of the law Ryan Legal, PC works in, to see if they are a good fit for your needs.',
  keywords: [
    'Law', 'Labor', 'Employment', 'Business', 'Transactions',
    'Finance', 'Health care', 'Technology', 'Litigation', 'Appellate'
  ],
  alternates: {
    canonical: '/expertise',
  },
}

export default function Page() {
  return (
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
  )
}
