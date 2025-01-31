'use client'

import Slider from 'react-slick'
import { useEffect, useRef, useState, RefObject, ReactNode } from 'react'
import { useSearchParams } from 'next/navigation'
import { useQueryState } from 'nuqs'
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
  faStar,
  faBuildingColumns,
  faFileLines,
  faPenFancy,
  faPeopleGroup,
  faPeopleCarryBox,
  faHandshakeSimple,
  faCircleArrowLeft,
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
import { transformTextToUrlParams } from '@/app/lib/utils'

const subSections = [
  {
    title: 'Employment',
    icon: <FontAwesomeIcon icon={faBriefcase} />,
    content: (bottomArrow: ReactNode) => <>
      <div className="expertiseContainer">
        {mapExpertise(russKRyanExpertise[0])}
      </div>
      {bottomArrow}
    </>,
  }, {
    title: 'Training',
    icon: <FontAwesomeIcon icon={faPersonChalkboard} />,
    content: (bottomArrow: ReactNode) => <>
      <div className="expertiseContainer">
        {mapExpertise(russKRyanExpertise[1])}
      </div>
      {bottomArrow}
    </>,
  }, {
    title: 'Health Care, Business and Real Estate',
    icon: <FontAwesomeIcon icon={faHospital} />,
    content: () => <>
      <div className="expertiseContainer">
        {mapExpertise(russKRyanExpertise[2])}
      </div>
    </>,
  }, {
    title: 'Litigation',
    icon: <FontAwesomeIcon icon={faGavel} />,
    content: (bottomArrow: ReactNode) => <>
      <div className="expertiseContainer">
        {mapExpertise(russKRyanExpertise[3])}
      </div>
      {bottomArrow}
    </>,
}]

const section = [
  {
    title: 'Education',
    icon: <FontAwesomeIcon icon={faGraduationCap} />,
    content: () => <>
      <ul className="educationContainer">
        {russKRyanEducation.map(education => (
          <li className="education" key={education.institution}>
            {education.degree} - {education.rank} — {education.institution} — {education.year}
          </li>
        ))}
      </ul>
    </>,
  }, {
    title: 'Bar and Court Admissions',
    icon: <FontAwesomeIcon icon={faBuildingColumns} />,
    content: () => <>
      <h4>Bar Admissions</h4>
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
      <h4>Court Admissions</h4>
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
    </>,
  }, {
    title: 'Ratings and Designations',
    icon: <FontAwesomeIcon icon={faStar} />,
    content: (bottomArrow: ReactNode) => <>
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
      {bottomArrow}
    </>,
  }, {
    title: 'Positions',
    icon: <FontAwesomeIcon icon={faFileLines} />,
    content: (bottomArrow: ReactNode) => <>
      <ul className="experienceContainer">
        {russKRyanPriorExperience.map(experience => (
          <li className="experience" key={experience.years}>
            {experience.position} — {experience.institution} — {experience.years}
          </li>
        ))}
      </ul>      
      {bottomArrow}
    </>,
  }, {
    title: 'Professional Practice',
    icon: <FontAwesomeIcon icon={faPenFancy} />,
  }, 
  ...subSections,
  {
    title: 'Affiliations',
    icon: <FontAwesomeIcon icon={faPeopleGroup} />,
    content: (bottomArrow: ReactNode) => <>
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
      {bottomArrow}
    </>,
  }, {
    title: 'Public and Community Service',
    icon: <FontAwesomeIcon icon={faPeopleCarryBox} />,
    content: () => <>
      <ul className="serviceContainer">
        {russKRyanPublicAndCommunityService.map(service => (
          <li className="service" key={service.years}>
            {service.position} — {service.institution} — {service.years}
          </li>
        ))}
      </ul>
    </>,
  }, {
    title: 'Clients',
    icon: <FontAwesomeIcon icon={faHandshakeSimple} />,
    content: (bottomArrow: ReactNode) => <>
      <h4>Present</h4>
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
      <h4>Past</h4>
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
      {bottomArrow}
    </>,
}]

const allSections = section.slice()
section.splice(4, 1)

function BlankArrow(_props: any) {
    return <></>
}

const renderSideNavItem = (
  header: { title: string, icon: ReactNode },
  expanded: boolean,
  toggleExpanded: () => void,
  nodeRef: RefObject<null> | null,
  toggleSlide: () => void,
  topic: string | null,
  index: number
) => {
  let tab
  let className

  const title = header.title
  const transformedTitle = transformTextToUrlParams(title)
  const icon = header.icon

  const commonProps = {
    role: "tab",
    'aria-controls': `tabpanel-${transformedTitle}`,
    id: `tab-${transformedTitle}`,
    'aria-selected': (topic === transformedTitle || (!topic && index === 0))
      ? 'true'
      : 'false'
  }

  if (subSections.map(thisHeader => thisHeader.title).includes(title)) {
    className = !expanded
      ? 'hidden'
      : 'nested'

    tab = (
      <CSSTransition 
        nodeRef={nodeRef}
        in={expanded}
        timeout={1000}
        classNames="fade-bounce-down"
      >
        <div>
          {/* @ts-ignore */}
          <button
            className={`tab ${className}`}
            ref={nodeRef}
            onClick={toggleSlide}
            aria-hidden={!expanded}
            {...commonProps}
          >
            <div className="icon" aria-hidden="true">{icon}</div>
            <p>{title}</p>
          </button>
        </div>
      </CSSTransition>
    )
  } else {
    tab = (
      <div>
        {/* @ts-ignore */}
        <button className="tab" onClick={toggleSlide} {...commonProps}>
          <div className="icon" aria-hidden="true">{icon}</div>
          <p>{title}</p>
        </button>
      </div>
    )
  }

  if (title !== 'Employment') {
    return tab
  }

  const experienceSection = allSections[4]

  return (
    <div>
      <button
        className="tab neverChosen"
        onClick={(e) => { 
          toggleExpanded()
          e.stopPropagation()
        }}
        aria-expanded={expanded ? 'true' : 'false'}
        aria-label={`${expanded ? 'Close' : 'Open'} menu for Professional Practice topics`}
        aria-controls={subSections.map(header => transformTextToUrlParams(header.title)).join(' ')}
        aria-haspopup="menu"
      >
        <div className="icon" aria-hidden="true">{experienceSection.icon}</div>
        <p>{experienceSection.title}</p>
        <div className="dropdownIcon" aria-hidden="true">
          {expanded
            ? <FontAwesomeIcon icon={faCaretUp} />
            : <FontAwesomeIcon icon={faCaretDown} />}
        </div>
      </button>
      {tab}
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
  const componentRef = useRef(null);
  const searchParams = useSearchParams()
  const initialSlideTopic = searchParams.get('topic')
  const initialExpanded = searchParams.get('expanded')
  const [topic, setTopic] = useQueryState('topic')
  const [expanded, setExpanded] = useQueryState('expanded', { defaultValue: 'false' })
  const [slide, setSlide] = useState<boolean | string>(false)

  const nodeRef5 = useRef(null);
  const nodeRef6 = useRef(null);
  const nodeRef7 = useRef(null);
  const nodeRef8 = useRef(null);
  const nodeRefSlideMenu = useRef(null);
  const nodeRefSlideDisplay0 = useRef(null);
  const nodeRefSlideDisplay1 = useRef(null);
  const nodeRefSlideDisplay2 = useRef(null);
  const nodeRefSlideDisplay4 = useRef(null);
  const nodeRefSlideDisplay5 = useRef(null);
  const nodeRefSlideDisplay6 = useRef(null);
  const nodeRefSlideDisplay7 = useRef(null);
  const nodeRefSlideDisplay8 = useRef(null);
  const nodeRefSlideDisplay9 = useRef(null);
  const nodeRefSlideDisplay10 = useRef(null);
  const nodeRefSlideDisplay11 = useRef(null);

  const toggleExpanded = () => setExpanded(expanded === 'true' ? 'false' : 'true')

  const topicMenuNodeRefs = {
    '4': nodeRef5,
    '5': nodeRef6,
    '6': nodeRef7,
    '7': nodeRef8,
  }

  const slideNodeRefs = [
    nodeRefSlideDisplay0,
    nodeRefSlideDisplay1,
    nodeRefSlideDisplay2,
    nodeRefSlideDisplay4,
    nodeRefSlideDisplay5,
    nodeRefSlideDisplay6,
    nodeRefSlideDisplay7,
    nodeRefSlideDisplay8,
    nodeRefSlideDisplay9,
    nodeRefSlideDisplay10,
    nodeRefSlideDisplay11,
  ]
  
  const settings = {
    customPaging: function(i: number) {
      return renderSideNavItem(
        section[i],
        expanded === 'true',
        toggleExpanded,
        topicMenuNodeRefs[i.toString() as keyof typeof topicMenuNodeRefs] || null,
        () => setSlide('loading'),
        topic,
        i
      )
    },
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    speed: 1000,
    // dotsClass: "customThumbnails",
    nextArrow: <BlankArrow />,
    prevArrow: <BlankArrow />,
    appendDots: (dots: ReactNode) => (
      <CSSTransition 
        nodeRef={nodeRefSlideMenu}
        in={slide === false}
        timeout={1000}
        classNames="fade-bounce-left"
        onExited={() => setSlide(true)}
      >
        <ul className="customThumbnails" ref={nodeRefSlideMenu} role="tablist" aria-orientation="vertical">
          {dots}
        </ul>
      </CSSTransition>
    ),
    beforeChange: (_current: number, next: number) =>
      setTopic(transformTextToUrlParams(section[next].title)),
  }

  if (initialSlideTopic) {
    const initialSlideIndex = section
      .findIndex(sectionHeader => 
        transformTextToUrlParams(sectionHeader.title) === topic
      )
    // @ts-ignore
    settings.initialSlide = initialSlideIndex
  }

  const GoBackArrow = (location: 'top' | 'bottom' = 'top') => location === 'top'
    ? (
      <button
        className={`backIconContainer ${location}`}
        onClick={() => { 
          setSlide('loading')
          setTopic(null)
        }}
      >
        <FontAwesomeIcon className="icon" icon={faCircleArrowLeft} aria-hidden="true" />
        <span>See Menu</span>
      </button>
    )
    : (
      <button
        className={`backIconContainer ${location}`}
        onClick={() => {
          setTimeout(() => setSlide('loading'), 750)
          setTopic(null)
          const element = document.getElementById('topic-menu')
          element?.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        <FontAwesomeIcon className="icon" icon={faCircleArrowLeft} aria-hidden="true" />
        <span>See Menu</span>
      </button>
    )

  useEffect(() => {
    if (initialSlideTopic) {
      const topicMenu = document.getElementById('topic-menu')
      topicMenu?.scrollIntoView({ behavior: 'smooth' })

      const topicButton = document.getElementById(`tab-${initialSlideTopic}`)
      topicButton?.click()
    }

    if (initialExpanded === 'true' ||
        (initialSlideTopic && subSections.some(header => 
          transformTextToUrlParams(header.title) === initialSlideTopic
        ))
    ) {
      setExpanded('true')
    }

    const tabList = document.querySelector('[role="tablist"]')
    const tabs = document.querySelectorAll('.tab')

    const handleArrowNavigation = (e: { key: string }) => {
      const activeElement = document.activeElement

      let currentIndex = 0
      for (let i = 0; i < tabs.length; i++) {
        const tab = tabs[i]
        if (tab === activeElement) {
          currentIndex = i
        }
      }

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
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
        tabs[currentIndex].focus();
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
  }, []);

  return (
    <div className="aboutCarousel carouselComponent" ref={componentRef} role="tabs">
        <Slider {...settings} className={slide !== false ? 'slideTrue' : 'slideFalse'}>
          {section.map((section, index) => {
            const nodeRef = slideNodeRefs[index]

            const transformedTitle = transformTextToUrlParams(section.title)

            const tabSettings = {
              className: "slide",
              role: "tabpanel",
              'aria-labelledby': `tab-${transformedTitle}`,
              id: `tabpanel-${transformedTitle}`,
              ref: nodeRef
            }

            if (topic !== transformedTitle) {
              // @ts-ignore
              tabSettings.hidden = true
            }

            return (
              <CSSTransition 
                nodeRef={nodeRef}
                in={slide === true}
                timeout={1000}
                classNames="fade-bounce-left"
                onExited={() => setSlide(false)}
                key={transformedTitle}
              >
                <div {...tabSettings}>
                  {GoBackArrow()}
                  <h3>{section.title}</h3>
                  {/* @ts-ignore */}
                  {section.content(GoBackArrow('bottom'))}
                </div>
              </CSSTransition>
            )
          })}
        </Slider>
    </div>
  )
}
