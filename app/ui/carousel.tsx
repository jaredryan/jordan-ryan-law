'use client'

import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { areasOfPractice } from '@/app/content';

import '@/app/ui/carousel.css';

function BlankArrow(_props: any) {
    return <div style={{ display: "none" }} />
}

export default function Carousel() {
  const settings = {
    customPaging: function(i) {
        const areaOfPractice = areasOfPractice[i]
        return (
          <a className="tab">
            <div className="icon">{areaOfPractice.icon}</div>
            <p>{areaOfPractice.name}</p>
          </a>
        );
      },
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    speed: 500,
    dotsClass: "customThumbnails",
    nextArrow: <BlankArrow />,
    prevArrow: <BlankArrow />,
  }

  return (
    <div className="carouselComponent">
        <Slider {...settings}>
            {areasOfPractice.map(section => (
            <div className="slide" key={section.name}>
                <h2>{section.name}</h2>
                <p>{section.content}</p>
            </div>
            ))}
        </Slider>
    </div>
  )
}
