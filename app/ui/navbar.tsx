'use client';

import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import '@/app/ui/navbar.css';

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
          className={clsx(
            'homeLink',
            {
              'highlighted': pathname === homeLink.href,
            }
          )}
        >
          <Image
            src="/logo-white.png"
            width={46.39}
            height={28}
            alt="Screenshots of the dashboard project showing desktop version"
            style={{ margin: '-4px 0' }}
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
              className={clsx({
                'highlighted': pathname === link.href,
              })}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
