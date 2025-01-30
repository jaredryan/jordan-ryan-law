'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group';
import '@/app/ui/navbar.css';

import logoWhite from '@/public/logo-white.webp'

import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
  const [isOpen, setIsOpen] = useState(false)
  const nodeRef = useRef(null)
  const barsRef = useRef(null)

  useEffect(() => {
      const closeMenuOnOutsideClick = (e: { target: string })=> {
          // @ts-ignore — weird "window" code in React
          if (isOpen && !nodeRef.current?.contains(e.target) && !barsRef.current?.contains(e.target)) {
              setIsOpen(false)
          }
      }

      // @ts-ignore — weird "window" code in React
      window.addEventListener('mousedown', closeMenuOnOutsideClick);
      // @ts-ignore — weird "window" code in React
      return () => window.removeEventListener('mousedown', closeMenuOnOutsideClick);
  }, [isOpen]);

  return (
    <nav>
      <div className="pagePadding">
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
        <ul className="desktopMenu">  
          {links.map((link) => {
            return (
              <li key={link.name}>
                <Link                
                  href={link.href}
                  className={`${pathname === link.href ? 'highlighted' : ''}`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className={`barsContainer ${isOpen ? 'open' : 'closed'}`}>
          <button
            ref={barsRef}
            className="barsIconContainer"
            aria-label="Open or close link menu button"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FontAwesomeIcon icon={faBars} />
            <label id="menulabel" className="sr-only">Link Menu</label>
          </button>
          <CSSTransition nodeRef={nodeRef} in={isOpen} mountOnEnter unmountOnExit timeout={500} classNames="fade-bounce-down">
              <ul ref={nodeRef} className={`dropdownContent ${isOpen ? "open" : "closed"}`}>
                {links.map((link) => {
                  return (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className={`${pathname === link.href ? 'highlighted' : ''}`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
          </CSSTransition>
        </div>
      </div>
    </nav>
  );
}
