import { Metadata } from 'next'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
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
