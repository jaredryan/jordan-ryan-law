import { Metadata } from 'next';
import Head from 'next/head';

import { openSans, prata } from '@/app/ui/fonts';
import Navbar from '@/app/ui/navbar'
import Footer from '@/app/ui/footer'

import '@/app/ui/global.css';

export const metadata: Metadata = {
  title: 'Ryan Legal, PC',
  description: 'Premier Representation of Employers, Health Care Providers and Non-Profits throughout California',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          href="/icon.png"
          type="image/png"
          sizes="96x96"
        />
        <link
          rel="icon"
          href="/icon.svg"
          type="image/svg+xml"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-icon.png"
          type="image/png"
          sizes="180x180"
        />
        <meta name="apple-mobile-web-app-title" content="Ryan Legal" />
      </head>
      <body className={`${openSans.variable} ${prata.variable}`}>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
