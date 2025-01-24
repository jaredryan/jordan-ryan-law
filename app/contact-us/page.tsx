'use client'

import ContactUsForm from '@/app/ui/contact-us-form';
import GoogleMapsAddress from '@/app/ui/google-maps-address';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faLocationDot, faEnvelope, } from '@fortawesome/free-solid-svg-icons'
import '@/app/ui/contact-us.css';

import fp2 from '@/public/fp2.webp'

const cards = [{
  icon: <FontAwesomeIcon icon={faPhone} />,
  name: 'Contact Us',
  content: [
    'Telephone: (559) 439-4000',
    'Facsimile: (559) 439-5654',
    'info@mmwbr.com'
  ]
}, {
  icon: <FontAwesomeIcon icon={faLocationDot} />,
  name: 'Address',
  content: [
    '1690 West Shaw Avenue',
    'Suite 200',
    'Fresno, California 93711'
  ]
}, {
  icon: <FontAwesomeIcon icon={faEnvelope} />,
  name: 'Mail',
  content: [
    'Post Office Box 9099',
    'Fresno, California 93790-9099',
  ]
}]

export default function Page() {
  return (
    <>
      <div className="contactUsPage">
        <div className="imageContainer">
          <Image
            src={fp2}
            alt="Attorneys Writing Image"
            className="bannerImage"
            loading="eager"
            priority={true}
          />
          <div className="after" />
          <div className="imageText">
            <h1>Contact Us</h1>
          </div>
        </div>
        <div className="contentSection">
          <div className="cardsContainer pagePadding">
            {cards.map(card => (
              <div className="card" key={card.name}>
                <div className="icon">{card.icon}</div>
                <h2>{card.name}</h2>
                <ul>
                  {card.content.map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="pagePadding">
            <h2>Request a Consultation</h2>
            <ContactUsForm />
          </div>
          <GoogleMapsAddress />
        </div>
      </div>
    </>
  );
}
