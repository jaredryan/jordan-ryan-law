import Image from 'next/image';
import '@/app/ui/payment.css';

export default function Page() {
  return (
    <div className="paymentPage">
      <div className="imageContainer">
        <Image
          src="/pens2.webp"
          width={1920}
          height={682}
          alt="Classy pen image"
          className="bannerImage"
          loading="eager"
        />
        <div className="after" />
        <div className="imageText">
          <h1>Payment</h1>
        </div>
      </div>
      <div className="contentSection">
        <p>We are partnering with Lawpay to make payment quick and easy, but it is not ready yet.</p>
        <br />
        <p>We will let you know when it is available!</p>
        {/* <a href="https://www.lawpay.com">
          <button>
            Pay Now
          </button>
        </a> */}
      </div>
    </div>
  );
}
