import { Suspense } from 'react'
import ContactUsForm from '@/app/ui/contact-us-form'
import GoogleMapsAddress from '@/app/ui/google-maps-address'
import { contactCards } from '@/app/content'
import Image from 'next/image'
import '@/app/ui/contact-us.css'

import writingOnPaper from '@/public/writing-on-paper.webp'

import { Metadata } from 'next'

export const metadata: Metadata = {
  description: 'Premier Representation of Employers, Health Care Providers and Non-Profits throughout California',
}

export default function Page() {
  return (
    <>
      <div className="contactUsPage">
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
    </>
  )
}
