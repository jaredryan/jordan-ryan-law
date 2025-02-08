import { Metadata } from 'next'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { LegalService, WithContext } from 'schema-dts'

import { openSans, charlesSil } from '@/app/ui/fonts'
import Navbar from '@/app/ui/navbar'
import Footer from '@/app/ui/footer'
import {
  contactCards,
  russKRyanRatingsAndDesignationsSimplified,
  knowsAbout,
} from '@/app/content'

import '@/app/ui/global.css'

const description = 'Premier Legal Representation of Employers, Health Care Providers and Non-Profits throughout California'
const url = process.env.CURRENT_URL || ''
const opengraphImageAlt = 'Ryan Legal, PC at ryanlegalpc.com, legal representation for employers, health care providers and non-profits throughout California'
const keywords = [
  'Legal', 'California', 'Law', 'Attorney', 'Lawyer',
  'Fresno', 'Central California', 'Central Valley'
]

export const metadata: Metadata = {
  title: {
    template: '%s | Ryan Legal, PC',
    default: 'Ryan Legal, PC',
  },
  description,
  keywords,
  metadataBase: new URL(url),
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: "image/png", sizes: "96x96" },
      { url: '/icon.svg', type: "image/svg+xml" },
    ],
    other: [{
      rel: 'apple-touch-icon',
      url: '/apple-icon.png',
      type: 'image/png',
      sizes: '180x180'
    }]
  },
  appleWebApp: {
    title: 'Ryan Legal'
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Ryan Legal, PC',
    description: description,
    siteName: 'Ryan Legal, PC',
    images: [{
      url: '/opengraph-image.png',
      alt: opengraphImageAlt,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{
      url: '/twitter-image.png',
      alt: opengraphImageAlt,
    }],
  },
  alternates: {
    canonical: '/',
  },
}

const businessJsonLd: WithContext<LegalService> = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: 'Ryan Legal, PC',
  alternateName: 'Ryan Legal',
  url,
  image: `${url}/opengraph-image.png`,
  description,
  currenciesAccepted: 'USD',
  openingHours: 'Mo-Fr 8:00-17:00',
  address: [{
    '@type': 'PostalAddress',
    addressLocality: contactCards[1].content[2].split(',')[0],
    addressRegion: 'CA',
    postalCode: contactCards[1].content[2].split(' ')[2],
    streetAddress: contactCards[1].content[0]
  }, {
    '@type': 'PostalAddress',
    postOfficeBoxNumber: contactCards[2].content[0].split(' ')[3],
    addressLocality: contactCards[2].content[1].split(',')[0],
    addressRegion: 'CA',
    postalCode: contactCards[2].content[1].split(' ')[2],
  }],
  email: contactCards[0].content[2],
  telephone: contactCards[0].content[0].split(':')[1].slice(1),
  serviceArea: [{
    '@type': 'AdministrativeArea',
    name: 'California',
  }, {
    '@type': 'AdministrativeArea',
    name: 'Utah',
  }],
  faxNumber: contactCards[0].content[1].split(':')[1].slice(1),
  knowsLanguage: ['English', 'Spanish'],
  logo: `${url}/full-logo.webp`,
  knowsAbout,
  keywords,
  award: russKRyanRatingsAndDesignationsSimplified,

  // TO-DO In Future:

  // Once Lawpay is integrated, I'll need to add those payment methods.
  // @ts-ignore
  acceptedPaymentMethod: [
    { '@type': 'PaymentMethod', name: 'Cash' },
    { '@type': 'PaymentMethod', name: 'Check' },
  ],
  // If Dad wants to upload photos of the staff/office...
  // photo: [
  //   "https://ryanlegalpc.com/office-exterior.jpg",
  //   "https://ryanlegalpc.com/interior-lobby.jpg",
  //   "https://ryanlegalpc.com/staff.jpg",
  // ]
}

// const websiteJsonLd: WithContext<WebSite> = {

// }

// const webpageJsonLd: WithContext<WebSite> = {

// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
        <meta property="fb:app_id" content="553360804417837" />
      </head>
      <body className={`${openSans.variable} ${charlesSil.variable}`}>
        <Navbar />
        <main>
          <NuqsAdapter>
            {children}
          </NuqsAdapter>
        </main>
        <Footer />
      </body>
    </html>
  )
}
