'use client'

import Slider from 'react-slick'
import { useRef, useState, RefObject, ReactNode } from 'react'
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faBriefcase,
  faGavel,
  faCaretDown,
  faCaretUp,
  faHospital,
  faPersonChalkboard,
  faGraduationCap,
  faFilePen,
  faStar,
  faBuildingColumns,
  faFileLines,
  faPenFancy,
  faPeopleGroup,
  faPeopleCarryBox,
  faHandshakeSimple,
} from '@fortawesome/free-solid-svg-icons'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import {
  russKRyanEducation,
  russKRyanBarAdmissions,
  russKRyanCourtAdmissions,
  russKRyanRatingsAndDesignations,
  russKRyanPriorExperience,
  russKRyanPublicAndCommunityService,
  russKRyanAffiliations,
  russKRyanExpertise,
  russKRyanClients,
} from '@/app/content';

import '@/app/ui/about-carousel.css';
import React from 'react'
import { TransitionChildren } from 'react-transition-group/Transition';

const subSectionHeaders = [
  {
    title: 'Employment',
    icon: <FontAwesomeIcon icon={faBriefcase} />,
  }, {
    title: 'Training',
    icon: <FontAwesomeIcon icon={faPersonChalkboard} />,
  }, {
    title: 'Health Care, Business and Real Estate',
    icon: <FontAwesomeIcon icon={faHospital} />,
  }, {
    title: 'Litigation',
    icon: <FontAwesomeIcon icon={faGavel} />,
}]

const sectionHeaders = [
  {
    title: 'Education',
    icon: <FontAwesomeIcon icon={faGraduationCap} />,
  }, {
    title: 'Bar Admissions',
    icon: <FontAwesomeIcon icon={faFilePen} />,
  }, {
    title: 'Ratings and Designations',
    icon: <FontAwesomeIcon icon={faStar} />,
  }, {
    title: 'Court Admissions',
    icon: <FontAwesomeIcon icon={faBuildingColumns} />,
  }, {
    title: 'Positions',
    icon: <FontAwesomeIcon icon={faFileLines} />,
  }, {
    title: 'Professional Practice',
    icon: <FontAwesomeIcon icon={faPenFancy} />,
  }, 
  ...subSectionHeaders,
  {
    title: 'Affiliations',
    icon: <FontAwesomeIcon icon={faPeopleGroup} />,
  }, {
    title: 'Public and Community Service',
    icon: <FontAwesomeIcon icon={faPeopleCarryBox} />,
  }, {
    title: 'Clients',
    icon: <FontAwesomeIcon icon={faHandshakeSimple} />,
}]

const allSections = sectionHeaders.slice()
sectionHeaders.splice(5, 1)

function BlankArrow(_props: any) {
    return <div style={{ display: "none" }} />
}

const renderSideNavItem = (header: { title: string, icon: ReactNode }, open: boolean, setOpen: (open: boolean) => void, nodeRef: RefObject<null> | null) => {
  let tab
  let className

  const title = header.title
  const icon = header.icon

  if (subSectionHeaders.map(header => header.title).includes(header.title)) {
    className = !open
      ? 'hidden'
      : 'nested'

    tab = (
      <CSSTransition 
        nodeRef={nodeRef}
        in={open}
        timeout={500}
        classNames="fade-bounce-down"
      >
        <a className={`tab ${className} mobile`} ref={nodeRef}>
          <div className="icon">{icon}</div>
          <p>{title}</p>
        </a>
      </CSSTransition>
    )
  } else {
    tab = (
      <a className="tab">
        <div className="icon">{icon}</div>
        <p>{title}</p>
      </a>
    )
  }

  if (title !== 'Employment') {
    return tab
  }

  const experienceSection = allSections[5]

  return (
    <div>
      <a
        className="tab neverChosen desktop"
        onClick={(e) => { 
          setOpen(!open)
          e.stopPropagation()
        }}
      >
        <div className="icon">{experienceSection.icon}</div>
        <p>{experienceSection.title}</p>
        {open
          ? <FontAwesomeIcon icon={faCaretUp} />
          : <FontAwesomeIcon icon={faCaretDown} />}
      </a>
      <CSSTransition 
        nodeRef={nodeRef}
        in={open}
        timeout={500}
        classNames="fade-bounce-down"
      >
        {tab}
      </CSSTransition>
    </div>
  )
}

const mapExpertise = (expertise: { name: string, content: (string | string[] | {
  title: string;
  content: string;
}[])[]}) => (
  <div className="expertise" key={expertise.name}>
    <div className="expertiseContentContainer">
      {expertise.content.map((paragraphOrList)  => (
        typeof paragraphOrList == 'string' 
          ? <p key={paragraphOrList}>{paragraphOrList}</p>
          : <ul key={typeof paragraphOrList[0] === 'string' ? paragraphOrList[0] : paragraphOrList[0].title}>
            {paragraphOrList.map(item => (
              typeof item === 'string'
                ? <li key={item}>{item}</li>
                : <li key={item.title}>
                    {item.title}
                    <ul className="nested"><li key={item.content}>{item.content}</li></ul>
                  </li>
            ))}
          </ul>
      ))}
    </div>
  </div>
)

export default function Carousel() {
  const [open, setOpen] = useState(false)
  const [slide, setSlide] = useState(true)
  const nodeRef5 = useRef(null);
  const nodeRef6 = useRef(null);
  const nodeRef7 = useRef(null);
  const nodeRef8 = useRef(null);
  const nodeRefSlide = useRef(null);

  const nodeRefs = {
    '5': nodeRef5,
    '6': nodeRef6,
    '7': nodeRef7,
    '8': nodeRef8,
  }
  
  const settings = {
    customPaging: function(i: number) {
      return renderSideNavItem(
        sectionHeaders[i],
        open,
        setOpen,
        nodeRefs[i.toString() as keyof typeof nodeRefs] || null,
      )
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
    appendDots: (dots: ReactNode) => (
      <CSSTransition 
        nodeRef={nodeRefSlide}
        in={open}
        timeout={500}
        classNames="fade-bounce-left"
      >
        <ul>
          {dots}
        </ul>
      </CSSTransition>
    ),
  }

  return (
    <div className="aboutCarousel carouselComponent">
      <Slider {...settings}>
        <div className="slide">
          <h2>{sectionHeaders[0].title}</h2>
          <ul className="educationContainer">
            {russKRyanEducation.map(education => (
              <li className="education" key={education.institution}>
                {education.degree} - {education.rank} — {education.institution} — {education.year}
              </li>
            ))}
          </ul>
        </div>
        <div className="slide">
          <h2>{sectionHeaders[1].title}</h2>
          <ul className="barAdmissionsContainer">
            {russKRyanBarAdmissions.map(barAdmission => (
              <li
                key={barAdmission.state}
                className="barAdmission"
              >
                {barAdmission.state}, {barAdmission.year}
              </li>
            ))}
          </ul>
        </div>
        <div className="slide">
          <h2>{sectionHeaders[2].title}</h2>
          <ul className="ratingsAndDesignationsContainer">
            {russKRyanRatingsAndDesignations.map(ratingOrDesignation => (
              <li
                key={ratingOrDesignation.title}
                className="ratingOrDesignation"
              >
                {ratingOrDesignation.title} — {ratingOrDesignation.years}
              </li>
            ))}
          </ul>
        </div>
        <div className="slide">
          <h2>{sectionHeaders[3].title}</h2>
          <ul className="courtAdmissionsContainer">
            {russKRyanCourtAdmissions.map(courtAdmission => (
              <li
                key={courtAdmission}
                className="courtAdmission"
              >
                {courtAdmission}
              </li>
            ))}
          </ul>
        </div>
        <div className="slide">
          <h2>{sectionHeaders[4].title}</h2>
          <ul className="experienceContainer">
            {russKRyanPriorExperience.map(experience => (
              <li className="experience" key={experience.years}>
                {experience.position} — {experience.institution} — {experience.years}
              </li>
            ))}
          </ul>      
        </div>
        {/* <div className="slide">
          <h2>{sectionHeaders[8].title}</h2>
          <div className="expertiseContainer">
            {russKRyanExpertise.map(expertise => (
              <div className="expertise" key={expertise.name}>
                <h4>{expertise.name}</h4>
                <div className="expertiseContentContainer">
                  {expertise.content.map(paragraphOrList => (
                    typeof paragraphOrList == 'string' 
                      ? <p key={paragraphOrList}>{paragraphOrList}</p>
                      : <ul key={typeof paragraphOrList[0] === 'string' ? paragraphOrList[0] : paragraphOrList[0].title}>
                        {paragraphOrList.map(item => (
                          typeof item === 'string'
                            ? <li key={item}>{item}</li>
                            : <li key={item.title}>
                                {item.title}
                                <ul className="nested"><li key={item.content}>{item.content}</li></ul>
                              </li>
                        ))}
                      </ul>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div> */}
        <div className="slide">
          <h2>{sectionHeaders[5].title}</h2>
          <div className="expertiseContainer">
            {mapExpertise(russKRyanExpertise[0])}
          </div>
        </div>
        <div className="slide">
          <h2>{sectionHeaders[6].title}</h2>
          <div className="expertiseContainer">
            {mapExpertise(russKRyanExpertise[1])}
          </div>
        </div>
        <div className="slide">
          <h2>{sectionHeaders[7].title}</h2>
          <div className="expertiseContainer">
            {mapExpertise(russKRyanExpertise[2])}
          </div>
        </div>
        <div className="slide">
          <h2>{sectionHeaders[8].title}</h2>
          <div className="expertiseContainer">
            {mapExpertise(russKRyanExpertise[3])}
          </div>
        </div>
        <div className="slide">
          <h2>{sectionHeaders[9].title}</h2>
          <ul className="affiliationsContainer">
            {russKRyanAffiliations.map(affiliation => (
              <li
                key={affiliation}
                className="affiliation"
              >
                {affiliation}
              </li>
            ))}
          </ul>
        </div>
        <div className="slide">
          <h2>{sectionHeaders[10].title}</h2>
          <ul className="serviceContainer">
            {russKRyanPublicAndCommunityService.map(service => (
              <li className="service" key={service.years}>
                {service.position} — {service.institution} — {service.years}
              </li>
            ))}
          </ul>
        </div>
        <div className="slide">
          <h2>{sectionHeaders[11].title}</h2>
          <h3>Present</h3>
          <ul className="clientsContainer past">
            {russKRyanClients.current.map(client => (
              <li
                key={client}
                className="client"
              >
                {client}
              </li>
            ))}
          </ul>
          <h3>Past</h3>
          <ul className="clientsContainer present">
            {russKRyanClients.past.map(client => (
              <li
                key={client}
                className="client"
              >
                {client}
              </li>
            ))}
          </ul>
        </div>
      </Slider>
    </div>
  )
}
