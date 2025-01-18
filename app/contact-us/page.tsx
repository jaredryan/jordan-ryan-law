import ContactUsForm from '@/app/ui/contact-us-form';
import Image from 'next/image';
import '@/app/ui/contact-us.css';

export default function Page() {
  return (
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
        <ContactUsForm />
      </div>
    </div>
  );
}
