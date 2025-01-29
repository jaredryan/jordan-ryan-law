import Image from 'next/image';
import '@/app/ui/payment.css';

import pens from '@/public/pens2.webp'

export default function Page() {
  return (
    <div className="paymentPage">
      <div className="imageContainer">
        <Image
          src={pens}
          alt="Classy pen image"
          className="bannerImage"
          loading="eager"
          priority={true}
          placeholder="blur"
        />
        <div className="after" />
        <div className="imageText">
          <h1>Payment</h1>
        </div>
      </div>
      <div className="contentSection">
        <p>We are partnering with Lawpay to make payment quick and easy, but it's not ready yet.</p>
        <br />
        <p>We'll let you know when it is available!</p>
        {/* <a
          href="https://www.lawpay.com"
          className="button"
          target='_blank'
          aria-label='Go to our payment portal, provided by Lawpay.'   
        >
          Pay Now
        </a> */}
      </div>
    </div>
  );
}
