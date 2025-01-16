import Link from 'next/link';
import { inter } from '@/app/ui/fonts';
import Navbar from '@/app/ui/navbar'

import '@/app/ui/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Navbar />
        <main>
          {children}
        </main>
        <footer>
          Footer
        </footer>
      </body>
    </html>
  );
}
