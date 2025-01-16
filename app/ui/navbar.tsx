'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

const homeLink = {
  name: 'Home',
  href: '/',
}

const links = [{
  name: 'Expertise',
  href: '/expertise',
},
{
  name: 'About',
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
      <div>
        <Link
          key={homeLink.name}
          href={homeLink.href}
          className={clsx({
            'bg-sky-100 text-blue-600': pathname === homeLink.href,
          })}
        >
          <p>{homeLink.name}</p>
        </Link>
      </div>
      <div>
        {links.map((link) => {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx({
              'bg-sky-100 text-blue-600': pathname === link.href,
              })}
            >
              <p>{link.name}</p>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
