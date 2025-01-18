import Image from 'next/image';
import Link from 'next/link';
import '@/app/ui/home.css';
import { 
  BriefcaseIcon,
  HomeIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

const areasOfPractice = [{
  name: 'Real Estate',
  icon: <HomeIcon />,
}, {
  name: 'Labor and Employment',
  icon: <BriefcaseIcon />
}, {
  name: 'Healthcare',
  icon: <PlusIcon />
}]

export default function Page() {
  return (
    <div className="homePage">
      <div className="imageContainer">
        <Image
          src="/upper-falls.png"
          width={0}
          height={0}
          sizes="100vw"
          alt="Yosemite Waterfall Image"
          className="heroImage"
        />
        <div className="after" />
        <div className="imageText">
          <h1>Ryan Legal, PC</h1>
          <h2>Premier provider of the highest quality legal services in Central California</h2>
          <Link
            key="Contact Us"
            href="/contact-us"
          >
            <button>Contact Us</button>
          </Link>
        </div>
      </div>
      <div className="contentSection">
        <Image
          src="/full-logo.png"
          width={0}
          height={0}
          sizes="100vw"
          alt="Ryan Legal, PC Logo"
          className="logoTitle"
        />
        <h2>Premier provider of the highest quality legal services in Central California</h2>
        <p>Ryan Legal, PC, is a Fresno, California, full-service law firm whose practice emphasizes real estate, labor and employment, business litigation, finance, business transactions, health care and estate planning. For more than 35 years, Ryan Legal, PC has provided the highest caliber of legal representation for local and national clients using the most efficient and economical means to achieve the best possible result.</p>
        <p>Founded by lawyers from the best law schools in the country, the firm was created to deliver the highest caliber legal representation to businesses and individuals throughout the San Joaquin Valley, the States of California and Utah, and beyond. Whether it is “bet the company” litigation, strategic counseling, commercial or employment litigation, structuring companies or business deals, Ryan Legal, PC will provide the best possible representation in a timely, responsive and efficient manner. We take pride in the excellence of the services we provide, the quality of our clients and the caliber of our attorneys.</p>
        <h1>Our Practice Areas</h1>
        <div className="practiceAreaContainer">
          {areasOfPractice.map(areaOfPractice => (
            <div key={areaOfPractice.name}>
              <div className="icon">{areaOfPractice.icon}</div>
              <h3>{areaOfPractice.name}</h3>
            </div>
          ))}
          {Array.from({ length: 10 }).map((_, index) => <div key={index} className="fillEmptySpace" />)}
        </div>
      </div>
    </div>
  );
}
