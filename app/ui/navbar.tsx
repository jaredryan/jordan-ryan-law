'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import '@/app/ui/navbar.css';

import logoWhite from '@/public/logo-white.webp'

const homeLink = {
  name: 'Home',
  href: '/',
}

const links = [{
  name: 'Expertise',
  href: '/expertise',
},
{
  name: 'About Us',
  href: '/about'
},
{
  name: 'Contact Us',
  href: '/contact-us'
},
{
  name: 'Payment',
  href: '/payment'
}]

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav>
      <div className='home'>
        <Link
          key={homeLink.name}
          href={homeLink.href}
          className={`homeLink${pathname === homeLink.href ? ' highlighted' : ''}`}
        >
          <Image
            src={logoWhite}
            alt="Screenshots of the dashboard project showing desktop version"
            loading="eager"
            priority={true}
            placeholder="blur"
          />
          Ryan Legal, PC
        </Link>
      </div>
      <div className='menu'>
        {links.map((link) => {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`${pathname === link.href ? 'highlighted' : ''}`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
