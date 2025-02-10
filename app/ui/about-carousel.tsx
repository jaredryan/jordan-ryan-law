'use client'

import Slider from 'react-slick'
import { useEffect, useRef, useState, RefObject, ReactNode } from 'react'
import { useSearchParams } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { CSSTransition } from 'react-transition-group'
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
} from '@/app/content'

import '@/app/ui/about-carousel.css'
import { transformTextToUrlParams } from '@/app/lib/utils'

import CanonLinkInjector from '@/app/ui/canon-link-injector'
import JsonLDInjector from '@/app/ui/json-ld-injector'

import { Person, WithContext } from 'schema-dts'

import {
  russKRyanRatingsAndDesignationsSimplifiedWithYears,
  knowsAbout,
} from '@/app/content'

const baseUrl = process.env.NEXT_PUBLIC_CURRENT_URL || ''
const description = 'Learn more about the Ryan Legal, PC staff, including their education, credentials, experience, and areas of practice.'
const getPageUrl = (topicParams: string | undefined | null) => 
  `/about?expanded=true${topicParams ? `&topic=${topicParams}` : ''}`


const aboutJsonId = (topicParams: string | undefined | null): WithContext<Person> => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${baseUrl}#RussellRyan`,
  name: 'Russell Ryan',
  alternateName: 'Russ',
  givenName: 'Russell',
  familyName: 'Ryan',
  url: `${baseUrl}${getPageUrl(topicParams)}`,
  image: `${baseUrl}/square-profile.webp`,
  description,
  knowsLanguage: ['English', 'Spanish'],
  award: russKRyanRatingsAndDesignationsSimplifiedWithYears,
  jobTitle: 'Founder and Owner',
  alumniOf: [{
    "@type": "CollegeOrUniversity",
    "name": "University of California, Berkeley School of Law",
    "sameAs": "https://www.law.berkeley.edu"
  }, {
    "@type": "CollegeOrUniversity",
    "name": "Brigham Young University",
    "sameAs": "https://www.byu.edu"
  }],
  memberOf: [{
    '@type': 'Organization',
    name: 'California Bar Association'
  }, {
    '@type': 'Organization',
    name: 'Utah Bar Association'
  }, {
    '@type': 'Organization',
    name: 'Fresno County Bar Association'
  }, {
    '@type': 'Organization',
    name: 'Madera County Bar Association',
    description: 'Secretary/Treasurer (1992-1993), Vice President (1994), President (1995)'
  }, {
    '@type': 'Organization',
    name: 'American Business Trial Lawyers',
    description: 'Board of Directors, Fresno Chapter (2008)'
  }, {
    '@type': 'Organization',
    name: 'Heartland Opportunity Center',
    description: 'Board of Directors, Vice President (2001)'
  }, {
    '@type': 'Organization',
    name: 'Resources for Independence Central Valley',
    description: 'Board of Directors (2009-present)'
  }, {
    '@type': 'Organization',
    name: 'Kimberlite Corporation (dba Sonitrol)',
    description: 'Board Chairperson (2010-present)'
  }, {
    '@type': 'Organization',
    name: 'Center for Disability Innovation at California State University, Fresno',
    description: 'Steering Committee (2008-present)'
  }],
  knowsAbout,
  honorificSuffix: "JD, Esq.",
  worksFor: {
    '@type': 'LegalService',
    '@id': `${baseUrl}#RyanLegalPC`,
    name: 'Ryan Legal, PC',
    url: `${baseUrl}`
  },
  // TO-DO -- whatever other specific Profile / Person fields I need to do
})



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

const sections = [
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

const allSections = sections.slice()
sections.splice(4, 1)

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
        timeout={500}
        classNames="fade-bounce-down"
      >
        <div role="presentation">
          {/* @ts-ignore */}
          <button
            className={`tab ${className}`}
            ref={nodeRef}
            onClick={toggleSlide}
            hidden={!expanded}
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
      <div role="presentation">
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
    <div role="presentation">
      <button
        className="tab neverChosen"
        onClick={(e) => {
          if (!expanded) {
            setTimeout(() => {
              // @ts-ignore
              document.querySelector('button.nested')?.focus()
            }, 100)
          }
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
  title: string,
  content: string,
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
  const componentRef = useRef(null)
  const searchParams = useSearchParams()
  const initialSlideTopic = searchParams?.get('topic')
  const initialExpanded = searchParams?.get('expanded')
  const [topic, setTopic] = useQueryState('topic')
  const [expanded, setExpanded] = useQueryState('expanded', { defaultValue: 'false' })
  const [slide, setSlide] = useState<boolean | string>(false)

  const nodeRef5 = useRef(null)
  const nodeRef6 = useRef(null)
  const nodeRef7 = useRef(null)
  const nodeRef8 = useRef(null)
  const nodeRefSlideMenu = useRef(null)
  const nodeRefSlideDisplay0 = useRef(null)
  const nodeRefSlideDisplay1 = useRef(null)
  const nodeRefSlideDisplay2 = useRef(null)
  const nodeRefSlideDisplay4 = useRef(null)
  const nodeRefSlideDisplay5 = useRef(null)
  const nodeRefSlideDisplay6 = useRef(null)
  const nodeRefSlideDisplay7 = useRef(null)
  const nodeRefSlideDisplay8 = useRef(null)
  const nodeRefSlideDisplay9 = useRef(null)
  const nodeRefSlideDisplay10 = useRef(null)
  const nodeRefSlideDisplay11 = useRef(null)

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
    draggable: false,
    swipe: false,
    customPaging: function(i: number) {
      return renderSideNavItem(
        sections[i],
        expanded === 'true',
        toggleExpanded,
        topicMenuNodeRefs[i.toString() as keyof typeof topicMenuNodeRefs] || null,
        () => {
          if (window.innerWidth < 850) {
            setSlide('loading')
            setTimeout(() => {
              // @ts-ignore
              document.querySelector('div.slick-active').querySelector('button.backIconContainer.top')?.focus()
            }, 1000 + 100)
          }
        },
        topic,
        i
      )
    },
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1000,
    fade: true,
    // dotsClass: "customTabs",
    nextArrow: <BlankArrow />,
    prevArrow: <BlankArrow />,
    appendDots: (dots: ReactNode) => (
      <CSSTransition 
        nodeRef={nodeRefSlideMenu}
        in={slide === false}
        timeout={1000}
        classNames="fade-bounce-left"
        onExited={() => window.innerWidth < 850 && setSlide(true)}
      >
        <ul
          className="customTabs"
          ref={nodeRefSlideMenu}
          role="tablist"
          aria-orientation="vertical"
          id="custom-tabs"
          hidden={slide === true}
        >
          {dots}
        </ul>
      </CSSTransition>
    ),
    beforeChange: (_current: number, next: number) =>
      setTopic(transformTextToUrlParams(sections[next].title)),
  }

  if (initialSlideTopic) {
    const initialSlideIndex = sections
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
          setTopic(null)
          setSlide('loading')
          setTimeout(() => {
            document.querySelector('li.slick-active')?.querySelector('button')?.focus()
          }, 1000 + 100)
        }}
        aria-controls="custom-tabs"
        aria-expanded={slide === false ? 'true' : 'false'}
        aria-haspopup="menu"
      >
        <FontAwesomeIcon className="icon" icon={faCircleArrowLeft} aria-hidden="true" />
        <span>See Menu</span>
      </button>
    )
    : (
      <button
        className={`backIconContainer ${location}`}
        onClick={() => {
          const timeToScroll = 750

          setTopic(null)
          setTimeout(() => setSlide('loading'), timeToScroll)
          setTimeout(() => {
            document.querySelector('li.slick-active')?.querySelector('button')?.focus()
          }, 1000 + 100 + 750)

          const element = document.getElementById('topic-menu')
          element?.scrollIntoView({ behavior: 'smooth' })
        }}
        aria-controls="custom-tabs"
        aria-expanded={slide === false ? 'true' : 'false'}
        aria-haspopup="menu"
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
      if (setExpanded) setExpanded('true')
    }
  }, [])

  useEffect(() => {
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

          while (tabs[currentIndex] && tabs[currentIndex].hasAttribute('hidden')) {
            currentIndex += 1
          }

          if (currentIndex >= tabs.length) {
            currentIndex = 0
          }
        } else if (e.key === 'ArrowUp') {
          currentIndex -= 1

          while (tabs[currentIndex] && tabs[currentIndex].hasAttribute('hidden')) {
            currentIndex -= 1
          }

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
  }, [expanded])

  return <>
    <CanonLinkInjector url={getPageUrl(topic)} />
    <JsonLDInjector json={aboutJsonId(topic)} />
    <div className="aboutCarousel carouselComponent" ref={componentRef} role="tabs">
        <Slider {...settings} className={slide !== false ? 'slideTrue' : 'slideFalse'}>
          {sections.map((section, index) => {
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
                appear={slide === true}
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
  </>
}
