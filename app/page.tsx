'use client'

import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ContactUsForm from '@/app/ui/contact-us-form';
import { transformTextToUrlParams } from '@/app/lib/utils'
import {
  businessExplanation, businessName, businessSlogan,
  businessSummary, areasOfPractice
} from '@/app/content';

import '@/app/ui/home.css';

import upperFalls from '@/public/upper-falls.webp'
import fullLogo from '@/public/full-logo.webp'
import fullLogoWhite from '@/public/full-logo-white.webp'
import attorneyWriting from '@/public/attorney-writing.webp'

export default function Page() {
  return (
    <div className="homePage">
      <div className="imageContainer">
        <Image
          src={upperFalls}
          alt="Yosemite Waterfall Image"
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
      <div className="contentSection">
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
                <div className="icon">{areaOfPractice.icon}</div>
                <h2>{areaOfPractice.name}</h2>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="requestConsultation">
        <Image
          src={attorneyWriting}
          alt="Attorneys Writing Image"
          className="bannerImage"
          loading="eager"
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
  );
}
