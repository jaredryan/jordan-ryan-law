import Image from 'next/image';
import '@/app/ui/about.css';

import { russKRyanProfileSummary } from '@/app/content';
import AboutCarousel from '@/app/ui/about-carousel';

// 9 items...best way to display?

export default function Page() {
  return (
    <div className="aboutPage">
      <div className="imageContainer">
        <Image
          src="/pen-on-notebook.jpg"
          width={0}
          height={0}
          sizes="100vw"
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
              src="/square-profile.jpg"
              width={200}
              height={200}
              alt="Russ Ryan Image"
              className="squareProfileImage"
            />
            <Image
              src="/super-lawyers-badge.png"
              width={120}
              height={100}
              alt="Super Lawyers Badge Image"
              className="superLawyersBadge"
            />
            <Image
              src="/av-preeminent.png"
              width={200}
              height={59.18}
              alt="AV Preeminent Image"
              className="avPreeminentBadge"
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
