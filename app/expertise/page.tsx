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
          alt="Legal System Image"
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
      <div className="contentSection">
        <Suspense>
          <ExpertiseCarousel />
        </Suspense>
      </div>
    </div>
  );
}
