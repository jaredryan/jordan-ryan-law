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

function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
}

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
  const windowWidth = useWindowWidth();

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

  useEffect(() => {
    // @ts-ignore
    let desktopList
    // @ts-ignore
    let handleDesktopArrowNavigation

    // @ts-ignore
    let mobileList
    // @ts-ignore
    let handleMobileMenuArrowNavigation

    if (windowWidth && windowWidth > 850) {
      desktopList = document.querySelector('[role="menubar"]')

      handleDesktopArrowNavigation = (e: { key: string }) => {
        // @ts-ignore
        const desktopLinks = desktopList?.querySelectorAll('[role="menuitem"]')
        const linksLength = 5
        const activeElement = document.activeElement

        let currentIndex = 0
        for (let i = 0; i < linksLength; i++) {
          // @ts-ignore
          const link = desktopLinks[i]
          if (link === activeElement) {
            currentIndex = i
          }
        }

        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          if (e.key === 'ArrowRight') {
            currentIndex += 1

            if (currentIndex >= linksLength) {
              currentIndex = 0
            }
          } else if (e.key === 'ArrowLeft') {
            currentIndex -= 1

            if (currentIndex < 0) {
              currentIndex = linksLength - 1
            }
          }
          
          // @ts-ignore
          desktopLinks[currentIndex].focus()
          // @ts-ignore
          e.preventDefault()
        }
      }
    } else if (windowWidth && windowWidth <= 850) {
      mobileList = document.querySelector('[role="menubar"]')

      handleMobileMenuArrowNavigation = (e: { key: string }) => {
        // @ts-ignore
        const mobileLinks = mobileList?.querySelectorAll('[role="menuitem"]')
        const mobileLinksLength = 6
        // @ts-ignore
        const mobileMenu = mobileList?.querySelector('[role="menu"]')
        const mobileMenuItems = mobileMenu?.querySelectorAll('[role="menuitem"]')

        const activeElement = document.activeElement

        let currentNavIndex
        for (let i = 0; i < mobileLinks?.length; i++) {
          // @ts-ignore
          const link = mobileLinks[i]
          if (link === activeElement) {
            currentNavIndex = i
          }
        }

        if (currentNavIndex === 0 || currentNavIndex === (mobileLinksLength - 1)) {
          if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            currentNavIndex = currentNavIndex === 0
              ? currentNavIndex = mobileLinksLength - 1
              : currentNavIndex = 0
            
            // @ts-ignore
            mobileLinks[currentNavIndex].focus()
            // @ts-ignore
            e.preventDefault()
          }
        }

        // 5, 6, 7, 8, 9
        if (currentNavIndex !== undefined && currentNavIndex !== 0) {
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            const startingIndex = 5
            const lastIndex = 9
            if (e.key === 'ArrowDown') {
              currentNavIndex += 1
    
              if (currentNavIndex > lastIndex) {
                currentNavIndex = startingIndex
              }
            } else if (e.key === 'ArrowUp') {
              currentNavIndex -= 1
    
              if (currentNavIndex < startingIndex) {
                currentNavIndex = lastIndex
              }
            }
            
            // @ts-ignore
            mobileLinks[currentNavIndex].focus()
            // @ts-ignore
            e.preventDefault()
          }
        }
      }
    }
    
    if (desktopList && handleDesktopArrowNavigation) {
      // @ts-ignore
      desktopList?.addEventListener('keydown', handleDesktopArrowNavigation)
    }

    if (mobileList && handleMobileMenuArrowNavigation) {
      // @ts-ignore
      mobileList?.addEventListener('keydown', handleMobileMenuArrowNavigation)
    }

    return () => {
      // @ts-ignore
      if (desktopList && handleDesktopArrowNavigation) {
        // @ts-ignore
        desktopList?.removeEventListener('keydown', handleDesktopArrowNavigation)
      }
  
      // @ts-ignore
      if (mobileList && handleMobileMenuArrowNavigation) {
        // @ts-ignore
        mobileList?.removeEventListener('keydown', handleMobileMenuArrowNavigation)
      }
    }
  }, [windowWidth]);

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
            role="menuitem"
          >
            <FontAwesomeIcon icon={faBars} aria-hidden="true" />
          </button>
          <CSSTransition
            nodeRef={nodeRef}
            in={isOpen}
            mountOnEnter
            unmountOnExit
            timeout={500}
            classNames="fade-bounce-down"
          >
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
