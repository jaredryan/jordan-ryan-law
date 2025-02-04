import Image from 'next/image';
import { Suspense } from 'react';
import ExpertiseCarousel from '@/app/ui/expertise-carousel';


import '@/app/ui/expertise.css';

import practice from '@/public/practice.webp'

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
  );
}
