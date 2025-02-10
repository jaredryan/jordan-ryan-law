import Image from 'next/image'
import JsonLDInjector from '@/app/ui/json-ld-injector'
import { WebPage, WithContext } from 'schema-dts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRoadBarrier } from '@fortawesome/free-solid-svg-icons'
import '@/app/ui/payment.css'

import penOnSurface from '@/public/pen-on-surface.webp'
import { metadata as appMetadata } from '@/app/layout'

import { Metadata } from 'next'

const description = 'Securely make a payment for legal services provided by Ryan Legal, PC.'
const url = '/payment'
const baseUrl = process.env.NEXT_PUBLIC_CURRENT_URL || ''

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

const webpageJsonLd: WithContext<WebPage> = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${baseUrl}/payment#webpage`,
  url: `${baseUrl}/payment`,
  name: 'Make a Payment',
  description,
  isPartOf: {
    '@id': `${baseUrl}/#website`
  },
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: `${baseUrl}/opengraph-image.png`,
    caption: 'Ryan Legal, PC - Legal Services'
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [{
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${baseUrl}`
    }, {
      '@type': 'ListItem',
      position: 2,
      name: 'Payment',
      item: `${baseUrl}/payment`
    }]
  },
  // Uncomment once LawPay is live 
  // significantLink: 'https://secure.lawpay.com/pages/ryanlegalpc/pay',
  // potentialAction: {
  //   '@type': 'PayAction',
  //   name: 'Make a Payment',
  //   description: 'Securely pay Ryan Legal, PC via LawPay.',
  //   recipient: {
  //     '@id': `${baseUrl}#RyanLegalPC`
  //   },
  //   target: {
  //     '@type': 'EntryPoint',
  //     urlTemplate: 'https://secure.lawpay.com/pages/ryanlegalpc/pay',
  //     actionPlatform: [
  //       'https://schema.org/DesktopWebPlatform',
  //       'https://schema.org/MobileWebPlatform'
  //     ]
  //   }
  // }
}


export default function Page() {
  return (
    <div className="paymentPage">
      <JsonLDInjector json={webpageJsonLd} />
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
