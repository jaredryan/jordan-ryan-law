import Image from 'next/image';
import '@/app/ui/about.css';

import { russKRyanProfileSummary } from '@/app/content';
import AboutCarousel from '@/app/ui/about-carousel';

import penOnNotebook from '@/public/pen-on-notebook.webp'
import squareProfile from '@/public/square-profile.webp'
import superLawyersBadge from '@/public/super-lawyers-badge.png'
import avPreeminent from '@/public/av-preeminent.png'

export default function Page() {
  return (
    <div className="aboutPage">
      <div className="imageContainer">
        <Image
          src={penOnNotebook}
          alt="Attorneys Writing Image"
          className="bannerImage"
          loading="eager"
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
              alt="Russ Ryan Image"
              className="squareProfileImage"
              loading="eager"
            />
            <Image
              src={superLawyersBadge}
              alt="Super Lawyers Badge Image"
              className="superLawyersBadge"
              loading="eager"
            />
            <Image
              src={avPreeminent}
              alt="AV Preeminent Image"
              className="avPreeminentBadge"
              loading="eager"
            />
          </div>  
          <div className="profileInformation">
            <h2>Russell K. Ryan — Partner and Founder</h2>
            <div className="introduction">
              {russKRyanProfileSummary.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              <p>Click any topic on the left menu below to learn more.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="carouselSection pagePadding">
        <AboutCarousel />
      </div>
    </div>
  );
}
