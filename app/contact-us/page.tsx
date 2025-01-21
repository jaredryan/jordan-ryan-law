'use client'

import ContactUsForm from '@/app/ui/contact-us-form';
import GoogleMapsAddress from '@/app/ui/google-maps-address';
import Image from 'next/image';
import '@/app/ui/contact-us.css';
import { 
  PhoneIcon,
  MapPinIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/solid';

const cards = [{
  icon: <PhoneIcon />,
  name: 'Contact Us',
  content: [
    'Telephone: (559) 439-4000',
    'Facsimile: (559) 439-5654',
    'info@mmwbr.com'
  ]
}, {
  icon: <MapPinIcon />,
  name: 'Address',
  content: [
    '1690 West Shaw Avenue',
    'Suite 200',
    'Fresno, California 93711'
  ]
}, {
  icon: <EnvelopeIcon />,
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
            src="/fp2.png"
            width={0}
            height={0}
            sizes="100vw"
            alt="Attorneys Writing Image"
            className="bannerImage"
            loading="eager"
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
            <ContactUsForm />
          </div>
          {/* <GoogleMapsAddress /> */}
        </div>
      </div>
    </>
  );
}
