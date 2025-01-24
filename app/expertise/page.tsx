import Image from 'next/image';
import ExpertiseCarousel from '@/app/ui/expertise-carousel';

import '@/app/ui/expertise.css';

export default function Page() {
  return (
    <div className="expertisePage">
      <div className="imageContainer">
        <Image
          src="/practice.webp"
          width={1920}
          height={823}
          alt="Legal System Image"
          className="bannerImage"
          loading="eager"
        />
        <div className="after" />
        <div className="imageText">
          <h1>Expertise</h1>
        </div>
      </div>
      <div className="contentSection">
        <ExpertiseCarousel />
      </div>
    </div>
  );
}
