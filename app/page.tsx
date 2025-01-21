'use client'

import Image from 'next/image';
import Link from 'next/link';
import ContactUsForm from '@/app/ui/contact-us-form';
import GoogleMapsAddress from '@/app/ui/google-maps-address';
import { businessExplanation, businessName, businessSlogan, businessSummary, areasOfPractice } from '@/app/content';

import '@/app/ui/home.css';

export default function Page() {
  return (
    <div className="homePage">
      <div className="imageContainer">
        <Image
          src="/upper-falls.png"
          width={0}
          height={0}
          sizes="100vw"
          alt="Yosemite Waterfall Image"
          className="heroImage"
          loading="eager"
        />
        <div className="after" />
        <div className="imageText pagePadding">
          <h1>{businessName}</h1>
          <h2>{businessSlogan}</h2>
          <Link
            key="Contact Us"
            href="/contact-us"
          >
            <button>Contact Us</button>
          </Link>
        </div>
      </div>
      <div className="contentSection">
        <Image
          src="/full-logo.png"
          width={0}
          height={0}
          sizes="100vw"
          alt="Ryan Legal, PC Logo"
          className="logoTitle"
          loading="eager"
        />
        <h2>{businessSummary}</h2>
        {businessExplanation.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        <h1>Our Practice Areas</h1>
        <div className="practiceAreaContainer">
          {areasOfPractice.map(areaOfPractice => (
            <div key={areaOfPractice.name} className={areaOfPractice.className || ''}>
              <div className="icon">{areaOfPractice.icon}</div>
              <h3>{areaOfPractice.name}</h3>
            </div>
          ))}
          {Array.from({ length: 4 }).map((_, index) => <div key={index} className="fillEmptySpace" />)}
        </div>
      </div>
      <div className="requestConsultation">
        <Image
          src="/attorney-writing.png"
          width={0}
          height={0}
          sizes="100vw"
          alt="Attorneys Writing Image"
          className="bannerImage"
          loading="eager"
        />
        <div className="after" />
        <div className="pagePadding">
          <h1>Request Consultation</h1>
          <ContactUsForm />
        </div>
      </div>
      <GoogleMapsAddress />
    </div>
  );
}
