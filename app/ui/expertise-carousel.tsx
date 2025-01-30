'use client'

import { useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Slider from 'react-slick'
import { useQueryState } from 'nuqs'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { areasOfPractice } from '@/app/content';
import { transformTextToUrlParams } from '@/app/lib/utils'

import '@/app/ui/expertise-carousel.css';

function BlankArrow(_props: any) {
    return <></>
}

export default function Carousel() {
  const componentRef = useRef(null);
  const sliderRef = useRef(null);
  const searchParams = useSearchParams()
  const initialSlideTopic = searchParams.get('topic')
  const [topic, setTopic] = useQueryState('topic', { defaultValue: initialSlideTopic || '' })

  const settings = {
    customPaging: function(i: number) {
        const areaOfPractice = areasOfPractice[i]
        return (
          <button className="tab">
            <div className="icon">{areaOfPractice.icon}</div>
            <p>{areaOfPractice.name}</p>
          </button>
        );
      },
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    speed: 1000,
    appendDots: (dots: any) => (
      <ul className="customThumbnails">
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
    if (initialSlideTopic && componentRef.current) {
      // @ts-ignore
      componentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="expertiseCarousel carouselComponent" ref={componentRef}>
      <Slider 
        ref={sliderRef}
        {...settings}
      >
        {areasOfPractice.map(section => (
          <div
            className="slide"
            key={section.name}
          >
              <h2>{section.name}</h2>
              <p>{section.content}</p>
          </div>
        ))}
      </Slider>
    </div>
  )
}
