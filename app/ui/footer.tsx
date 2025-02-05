import Image from 'next/image'
import Link from 'next/link'
import '@/app/ui/footer.css'
import { homeLink, links } from '@/app/content'

import fullLogoWhite from '@/public/full-logo-white.webp'

export default function Footer() {
  return (
    <footer>
      <div className="contentContainer pagePadding">
        <div className="imageContainer">
          <Link
            href={homeLink.href}
            aria-label="Home Link"
          >
            <Image
              src={fullLogoWhite}
              alt="Ryan Legal, PC Logo"
              className="logoTitle"
              loading="eager"
              priority={true}
              placeholder="blur"
            />
          </Link>
        </div>
        <ul role="menu" className="linksMenu">
          {[homeLink, ...links].map((link) => {
            return (
              <li key={link.name} role="presentation">
                <Link
                  href={link.href}
                  role="menuitem"
                >
                  {link.name}
                </Link>
              </li>
            )
          })}
        </ul>
        <div className="contactUsContainer">
          <h2>Ready to get started?</h2>
          <Link
            href="/contact-us"
            className="button"  
          >
            Contact Us
          </Link>
        </div>
      </div>
      <p>&copy; Ryan Legal, PC, a Professional Corporation. All Rights Reserved.</p>
    </footer>
  )
}
