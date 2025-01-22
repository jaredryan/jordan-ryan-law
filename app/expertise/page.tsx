import Image from 'next/image';
import Carousel from '@/app/ui/carousel';

import '@/app/ui/expertise.css';

export default function Page() {
  return (
    <div className="expertisePage">
      <div className="imageContainer">
        <Image
          src="/practice.png"
          width={0}
          height={0}
          sizes="100vw"
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
        <Carousel />
      </div>
    </div>
  );
}
