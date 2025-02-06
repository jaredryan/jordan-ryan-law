import { Metadata } from 'next'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { WebSite, WithContext } from 'schema-dts'
import { metadata as homeMetadata } from '@/app/page'

import { openSans, charlesSil } from '@/app/ui/fonts'
import Navbar from '@/app/ui/navbar'
import Footer from '@/app/ui/footer'

import '@/app/ui/global.css'

export const metadata: Metadata = {
  title: {
    template: '%s | Ryan Legal, PC',
    default: 'Ryan Legal, PC',
  },
  keywords: ['Legal', 'California', 'Law', 'Attorney', 'Lawyer', 'Fresno', 'Central California', 'Central Valley'],
  metadataBase: new URL('https://ryanlegalpc.com'),
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
    url: 'https://ryanlegalpc.com',
    title: 'Ryan Legal, PC',
    description: homeMetadata.description as string,
    siteName: 'Ryan Legal, PC',
    images: [{
      url: 'https://ryanlegalpc.com/upper-falls.webp',
      alt: 'Yosemite waterfall, located in central California',
      width: 1960,
      height: 840,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{
      url: 'https://ryanlegalpc.com/upper-falls.webp',
      alt: 'Yosemite waterfall, located in central California',
    }],
  },
}

const jsonLd: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Ryan Legal, PC',
  alternateName: "Ryan Legal",
  url: "https://ryanlegalpc.com",
  image: 'https://nextjs.org/imgs/sticker.png',
  description: 'Dynamic at the speed of static.',
}

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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
