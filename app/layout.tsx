import { openSans, prata } from '@/app/ui/fonts';
import Navbar from '@/app/ui/navbar'
import Footer from '@/app/ui/footer'

import '@/app/ui/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
