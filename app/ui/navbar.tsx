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
    <nav role="menubar">
      <div className="pagePadding" role="presentation">
        <div className='home' role="presentation">
          <Link
            key={homeLink.name}
            href={homeLink.href}
            className={`homeLink${pathname === homeLink.href ? ' highlighted' : ''}`}
            aria-label="Ryan Legal, PC home"
            role="menuitem"
          >
            <Image
              src={logoWhite}
              alt="Ryan Legal, PC logo"
              loading="eager"
              priority={true}
              placeholder="blur"
              aria-hidden="true"
            />
            Ryan Legal, PC
          </Link>
        </div>
        <ul className="desktopMenu" role="presentation">  
          {links.map((link) => {
            return (
              <li key={link.name} role="presentation">
                <Link                
                  href={link.href}
                  className={`${pathname === link.href ? 'highlighted' : ''}`}
                  role="menuitem"
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
            aria-label={`${isOpen ? 'Close' : 'Open'} link menu`}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen ? 'true' : 'false'}
            aria-controls="link-menu"
            aria-haspopup="menu"
          >
            <FontAwesomeIcon icon={faBars} aria-hidden="true" />
          </button>
          <CSSTransition nodeRef={nodeRef} in={isOpen} mountOnEnter unmountOnExit timeout={500} classNames="fade-bounce-down">
              <ul ref={nodeRef} className={`dropdownContent ${isOpen ? "open" : "closed"}`} id="link-menu" role="menu">
                {links.map((link) => {
                  return (
                    <li key={link.name} role="presentation">
                      <Link
                        href={link.href}
                        className={`${pathname === link.href ? 'highlighted' : ''}`}
                        role="menuitem"
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
