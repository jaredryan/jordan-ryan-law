import Image from 'next/image';
import '@/app/ui/about.css';

import { russKRyanProfileSummary } from '@/app/content';
import AboutCarousel from '@/app/ui/about-carousel';

export default function Page() {
  return (
    <div className="aboutPage">
      <div className="imageContainer">
        <Image
          src="/pen-on-notebook.webp"
          width={1920}
          height={802}
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
              src="/square-profile.webp"
              // width={200}
              // height={200}
              width={833}
              height={833}
              alt="Russ Ryan Image"
              className="squareProfileImage"
              loading="eager"
            />
            <Image
              src="/super-lawyers-badge.png"
              // width={120}
              // height={100}
              width={180}
              height={150}
              alt="Super Lawyers Badge Image"
              className="superLawyersBadge"
              loading="eager"
            />
            <Image
              src="/av-preeminent.png"
              // width={200}
              // height={59.18}
              width={250}
              height={74}
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
