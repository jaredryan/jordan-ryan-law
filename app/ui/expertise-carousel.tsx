'use client'

import { useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { useQueryState } from 'nuqs'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { areasOfPractice } from '@/app/content'
import { transformTextToUrlParams } from '@/app/lib/utils'

import '@/app/ui/expertise-carousel.css'

import { Transition } from 'react-transition-group';

const duration = 1000;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 1, visibility: 'visible' },
  entered:  { opacity: 1, visibility: 'visible' },
  exiting:  { opacity: 0, visibility: 'visible' },
  exited:  { opacity: 0, visibility: 'hidden' },
};

export default function Carousel() {
  const searchParams = useSearchParams()
  const initialSlideTopic = searchParams?.get('topic')
  const [topic, setTopic] = useQueryState('topic')

  const nodeRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ]

  useEffect(() => {
    if (initialSlideTopic) {
      if (setTopic) setTopic(initialSlideTopic)

      const topicMenu = document.getElementById('topic-menu')
      topicMenu?.scrollIntoView({ behavior: 'smooth' })
    } else {
      setTopic(transformTextToUrlParams(areasOfPractice[0].name))
    }

    const tabList = document.querySelector('[role="tablist"]')
    const tabs = document.querySelectorAll('[role="tab"]')

    const handleArrowNavigation = (e: { key: string }) => {
      const activeElement = document.activeElement

      let currentIndex = 0
      for (let i = 0; i < tabs.length; i++) {
        const tab = tabs[i]
        if (tab === activeElement) {
          currentIndex = i
        }
      }

      if (window.innerWidth > 550 && window.innerWidth < 850) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp' ||
            e.key === 'ArrowRight' || e.key === 'ArrowLeft'
        ) {
          if (e.key === 'ArrowDown') {
            currentIndex += 2
  
            if (currentIndex >= tabs.length) {
              currentIndex = currentIndex - tabs.length
            }
          } else if (e.key === 'ArrowUp') {
            currentIndex -= 2
  
            if (currentIndex < 0) {
              currentIndex = currentIndex + tabs.length
            }
          } else if (e.key === 'ArrowRight') {
            currentIndex += 1
  
            if (currentIndex >= tabs.length) {
              currentIndex = 0
            }
          } else if (e.key === 'ArrowLeft') {
            currentIndex -= 1
  
            if (currentIndex < 0) {
              currentIndex = tabs.length - 1
            }
          }

          // @ts-ignore
          tabs[currentIndex].focus()
          // @ts-ignore
          e.preventDefault()
        }
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        if (e.key === 'ArrowDown') {
          currentIndex += 1

          if (currentIndex >= tabs.length) {
            currentIndex = 0
          }
        } else if (e.key === 'ArrowUp') {
          currentIndex -= 1

          if (currentIndex < 0) {
            currentIndex = tabs.length - 1
          }
        }

        // @ts-ignore
        tabs[currentIndex].focus()
        // @ts-ignore
        e.preventDefault()
      }    
    }

    // @ts-ignore
    tabList.addEventListener('keydown', handleArrowNavigation)

    return () => {
      // @ts-ignore
      tabList.removeEventListener('keydown', handleArrowNavigation)
    }
  }, [])

  return <>
    <div className="carouselComponent expertiseCarousel" role="tabs">
      <ul className="customTabs" role="tablist" aria-orientation="vertical">
          {areasOfPractice.map((areaOfPractice, i) => {
            const transformedName = transformTextToUrlParams(areaOfPractice.name)
            const id = `tab-${transformedName}`
            
            return (
              <li role="presentation" key={id}>
                <button
                  className="tab"
                  role="tab"
                  aria-controls={`tabpanel-${transformedName}`}
                  id={id}
                  aria-selected={(topic === transformedName || (!topic && i === 0))
                    ? 'true'
                    : 'false'
                  }
                  onClick={() => setTopic(transformTextToUrlParams(transformedName))}
                >
                  <div className="icon" aria-hidden="true">{areaOfPractice.icon}</div>
                  <p>{areaOfPractice.name}</p>
                </button>
              </li>
            )
          })}
      </ul>
      <div className="tabPanelContainer">
          {areasOfPractice.map((section, i) => {
            const transformedName = transformTextToUrlParams(section.name)
            const nodeRef = nodeRefs[i]

            const tabSettings = {
              className: "slide",
              role: "tabpanel",
              'aria-labelledby': `tab-${transformedName}`,
              id: `tabpanel-${transformedName}`,
            }

            const visible = topic === transformedName

            if (!visible) {
              // @ts-ignore
              tabSettings.hidden = true
              // @ts-ignore
              tabSettings['aria-hidden'] = true
            }

            return (
              <Transition nodeRef={nodeRef} in={visible} timeout={duration} key={section.name}>
                {state => 
                <div key={section.name} {...tabSettings} ref={nodeRef} style={{
                  ...defaultStyle,
                  // @ts-ignore
                  ...transitionStyles[state]
                }}>
                    <h3>{section.name}</h3>
                    <p>{section.content}</p>
                </div>
                }
              </Transition>
            )})}
      </div>
    </div>
  </>
}
