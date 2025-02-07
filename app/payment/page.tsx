import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRoadBarrier } from '@fortawesome/free-solid-svg-icons'
import '@/app/ui/payment.css'

import penOnSurface from '@/public/pen-on-surface.webp'
import { metadata as appMetadata } from '@/app/layout'

import { Metadata } from 'next'

const description = 'Access quick and easy payment options serviced rendered.'
const url = '/payment'

export const metadata: Metadata = {
  title: 'Payment',
  description,
  keywords: [
    'Legal', 'California', 'Law', 'Attorney', 'Lawyer',
    'Russ Ryan', 'Russell Ryan', 'Payment', 'Lawpay'
  ],
  alternates: {
    canonical: url,
  },
  openGraph: {
    ...appMetadata.openGraph,
    description,
    url,
  }
}

export default function Page() {
  return (
    <div className="paymentPage">
      <div className="imageContainer">
        <Image
          src={penOnSurface}
          alt="Pen on surface"
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
        <div className="icon" aria-hidden="true">
          <FontAwesomeIcon icon={faRoadBarrier} />
        </div>
        <div className="text">
          <h2>Pay quickly and easily through Lawpay.</h2>
          <p>But it&apos;s not ready yet. We&apos;ll let you know when it is available!</p>
        </div>
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
  )
}
