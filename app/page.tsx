'use client'

import Image from 'next/image';
import Link from 'next/link';
import ContactUsForm from '@/app/ui/contact-us-form';
import GoogleMapsAddress from '@/app/ui/google-maps-address';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faLaptop, faFileInvoiceDollar, faGavel, faScaleBalanced, faHandHoldingMedical } from '@fortawesome/free-solid-svg-icons'
import '@/app/ui/home.css';

const areasOfPractice = [{
  name: 'Labor and Employment',
  icon: <FontAwesomeIcon icon={faBriefcase} />,
}, {
  name: 'Health Care',
  icon: <FontAwesomeIcon icon={faHandHoldingMedical} />,
}, {
  name: 'Technology',
  icon: <FontAwesomeIcon icon={faLaptop} />,
}, {
  name: 'Business Transactions and Finance',
  icon: <FontAwesomeIcon icon={faFileInvoiceDollar} />,
  className: 'businessTransactions',
}, {
  name: 'Business Litigation',
  icon: <FontAwesomeIcon icon={faScaleBalanced} />,
}, {
  name: 'Appellate Litigation',
  icon: <FontAwesomeIcon icon={faGavel} />,
}]

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
          <h1>Ryan Legal, PC</h1>
          <h2>Premier Representation of Employers, Health Care Providers and Non-Profits throughout California</h2>
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
        <h2>Premier Representation of Employers, Health Care Providers and Non-Profits throughout California</h2>
        <p>Ryan Legal, PC, is a Central California full-service law firm whose practice focuses on labor and employment, health care, non-profit representation and business litigation. For more than 35 years Russ Ryan and his legal team has provided the highest quality of legal representation for local and national clients.</p>
        <p>Ryan Legal has particular expertise in working with Federally Qualified Health Centers and health clinics, Community Action Agencies, Head Start Programs and both California and out-of-state employers navigating California’s complex employment and wage and hour laws and regulations.</p>
        <p>Whether it’s the defense of “bet the company” class action litigation, strategic counseling and development of best practices personnel policies and employment agreements, or litigation of employment or business matters, Ryan Legal will provide the best possible representation in a timely, responsive and efficient manner.</p>
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
