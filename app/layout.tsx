import { Metadata } from 'next'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import { openSans, charlesSil } from '@/app/ui/fonts'
import Navbar from '@/app/ui/navbar'
import Footer from '@/app/ui/footer'

import '@/app/ui/global.css'

const opengraphImageAlt = 'Ryan Legal, PC at ryanlegalpc.com, legal representation for employers, health care providers and non-profits throughout California'
export const description = 'Premier Legal Representation of Employers, Health Care Providers and Non-Profits throughout California'
const url = process.env.NEXT_PUBLIC_CURRENT_URL || ''

export const keywords = [
  'Employment Lawyer Fresno',
  'Business Attorney California',
  'Health Care Legal Services',
  'Litigation Attorney Central Valley',
  'Real Estate Attorney California',
  'Corporate Compliance Lawyer',
  'Trade Secret Litigation',
  'Technology Attorney California',
  'Workplace Disputes Legal Help',
  'HR Compliance Lawyer'
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
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
