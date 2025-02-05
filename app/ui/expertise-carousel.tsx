'use client'

import { useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Slider from 'react-slick'
import { useQueryState } from 'nuqs'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { areasOfPractice } from '@/app/content'
import { transformTextToUrlParams } from '@/app/lib/utils'

import '@/app/ui/expertise-carousel.css'

function BlankArrow(_props: any) {
    return <></>
}

export default function Carousel() {
  const componentRef = useRef(null)
  const sliderRef = useRef(null)
  const searchParams = useSearchParams()
  const initialSlideTopic = searchParams?.get('topic')
  const [topic, setTopic] = useQueryState('topic')

  const settings = {
    customPaging: function(i: number) {
        const areaOfPractice = areasOfPractice[i]
        const transformedName = transformTextToUrlParams(areaOfPractice.name)
        return (
          <button
            className="tab"
            role="tab"
            aria-controls={`tabpanel-${transformedName}`}
            id={`tab-${transformedName}`}
            aria-selected={(topic === transformedName || (!topic && i === 0))
              ? 'true'
              : 'false'
            }
          >
            <div className="icon" aria-hidden="true">{areaOfPractice.icon}</div>
            <p>{areaOfPractice.name}</p>
          </button>
        )
      },
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    speed: 1000,
    appendDots: (dots: any) => (
      <ul className="customTabs" role="tablist" aria-orientation="vertical">
        {dots}
      </ul>
    ),
    nextArrow: <BlankArrow />,
    prevArrow: <BlankArrow />,
    beforeChange: (_current: number, next: number) =>
      setTopic(transformTextToUrlParams(areasOfPractice[next].name)),
  }

  if (initialSlideTopic) {
    const initialSlideIndex = areasOfPractice
      .findIndex(areaOfPractice => 
        transformTextToUrlParams(areaOfPractice.name) === topic
      )
    // @ts-ignore
    settings.initialSlide = initialSlideIndex
  }

  useEffect(() => {
    if (initialSlideTopic) {
      if (setTopic) setTopic(initialSlideTopic)

      const topicMenu = document.getElementById('topic-menu')
      topicMenu?.scrollIntoView({ behavior: 'smooth' })
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

  return (
    <div className="expertiseCarousel carouselComponent" ref={componentRef} role="tabs">
      <Slider 
        ref={sliderRef}
        {...settings}
      >
        {areasOfPractice.map(section => {
          const transformedName = transformTextToUrlParams(section.name)

          const tabSettings = {
            className: "slide",
            role: "tabpanel",
            'aria-labelledby': `tab-${transformedName}`,
            id: `tabpanel-${transformedName}`,
          }

          if (topic !== transformedName) {
            // @ts-ignore
            tabSettings.hidden = true
          }

          return (
            <div key={section.name} {...tabSettings}>
                <h2>{section.name}</h2>
                <p>{section.content}</p>
            </div>
          )})}
      </Slider>
    </div>
  )
}
