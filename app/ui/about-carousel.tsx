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
    title: 'Bar and Court Admissions',
    icon: <FontAwesomeIcon icon={faBuildingColumns} />,
  }, {
    title: 'Ratings and Designations',
    icon: <FontAwesomeIcon icon={faStar} />,
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
sectionHeaders.splice(4, 1)

function BlankArrow(_props: any) {
    return <></>
}

const renderSideNavItem = (
  header: { title: string, icon: ReactNode },
  expanded: boolean,
  toggleExpanded: () => void,
  nodeRef: RefObject<null> | null,
  toggleSlide: () => void,
) => {
  let tab
  let className

  const title = header.title
  const icon = header.icon

  if (subSectionHeaders.map(thisHeader => thisHeader.title).includes(title)) {
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
          <button
            className={`tab ${className}`}
            ref={nodeRef}
            onClick={toggleSlide}
            id={transformTextToUrlParams(title)}
            aria-hidden={!expanded}
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
        <button className="tab" onClick={toggleSlide} id={transformTextToUrlParams(title)}>
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
        aria-label='Menu for Professional Practice topics'
        aria-controls={subSectionHeaders.map(header => transformTextToUrlParams(header.title)).join(' ')}
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

  const nodeRefs = {
    '4': nodeRef5,
    '5': nodeRef6,
    '6': nodeRef7,
    '7': nodeRef8,
  }
  
  const settings = {
    customPaging: function(i: number) {
      return renderSideNavItem(
        sectionHeaders[i],
        expanded === 'true',
        toggleExpanded,
        nodeRefs[i.toString() as keyof typeof nodeRefs] || null,
        () => setSlide('loading')
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
        <ul className="customThumbnails" ref={nodeRefSlideMenu}>
          {dots}
        </ul>
      </CSSTransition>
    ),
    beforeChange: (_current: number, next: number) =>
      setTopic(transformTextToUrlParams(sectionHeaders[next].title)),
  }

  if (initialSlideTopic) {
    const initialSlideIndex = sectionHeaders
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

      const topicButton = document.getElementById(initialSlideTopic)
      topicButton?.click()
    }
    if (initialExpanded === 'true' ||
        (initialSlideTopic && subSectionHeaders.some(header => 
          transformTextToUrlParams(header.title) === initialSlideTopic
        ))
    ) {
      setExpanded('true')
    }
  }, []);

  return (
    <div className="aboutCarousel carouselComponent" ref={componentRef}>
        <Slider {...settings} className={slide !== false ? 'slideTrue' : 'slideFalse'}>
          <CSSTransition 
            nodeRef={nodeRefSlideDisplay0}
            in={slide === true}
            timeout={1000}
            classNames="fade-bounce-left"
            onExited={() => setSlide(false)}
          >
            <div className="slide" ref={nodeRefSlideDisplay0}>
              {GoBackArrow()}
              <h3>{sectionHeaders[0].title}</h3>
              <ul className="educationContainer">
                {russKRyanEducation.map(education => (
                  <li className="education" key={education.institution}>
                    {education.degree} - {education.rank} — {education.institution} — {education.year}
                  </li>
                ))}
              </ul>
            </div>
          </CSSTransition>
          <CSSTransition 
            nodeRef={nodeRefSlideDisplay1}
            in={slide === true}
            timeout={1000}
            classNames="fade-bounce-left"
            onExited={() => setSlide(false)}
          >
          <div className="slide" ref={nodeRefSlideDisplay1}>
            {GoBackArrow()}
            <h3>{sectionHeaders[1].title}</h3>
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
          </div>
          </CSSTransition>
          <CSSTransition 
            nodeRef={nodeRefSlideDisplay2}
            in={slide === true}
            timeout={1000}
            classNames="fade-bounce-left"
            onExited={() => setSlide(false)}
          >
          <div className="slide" ref={nodeRefSlideDisplay2}>
            {GoBackArrow()}
            <h3>{sectionHeaders[2].title}</h3>
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
            {GoBackArrow('bottom')}
          </div>
          </CSSTransition>
          <CSSTransition 
            nodeRef={nodeRefSlideDisplay4}
            in={slide === true}
            timeout={1000}
            classNames="fade-bounce-left"
            onExited={() => setSlide(false)}
          >
          <div className="slide" ref={nodeRefSlideDisplay4}>
            {GoBackArrow()}
            <h3>{sectionHeaders[3].title}</h3>
            <ul className="experienceContainer">
              {russKRyanPriorExperience.map(experience => (
                <li className="experience" key={experience.years}>
                  {experience.position} — {experience.institution} — {experience.years}
                </li>
              ))}
            </ul>      
            {GoBackArrow('bottom')}
          </div>
          </CSSTransition>
          {/* <CSSTransition 
            nodeRef={nodeRefSlideDisplay}
            in={slide === true}
            timeout={1000}
            classNames="fade-bounce-left"
            onExited={() => setSlide(false)}
          >
          <div className="slide" ref={nodeRefSlideDisplay}>
            <h3>{sectionHeaders[8].title}</h3>
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
          </div>
          </CSSTransition> */}
          <CSSTransition 
            nodeRef={nodeRefSlideDisplay5}
            in={slide === true}
            timeout={1000}
            classNames="fade-bounce-left"
            onExited={() => setSlide(false)}
          >
            <div className="slide" ref={nodeRefSlideDisplay5}>
              {GoBackArrow()}
              <h3>{sectionHeaders[4].title}</h3>
              <div className="expertiseContainer">
                {mapExpertise(russKRyanExpertise[0])}
              </div>
              {GoBackArrow('bottom')}
            </div>
          </CSSTransition>
          <CSSTransition 
            nodeRef={nodeRefSlideDisplay6}
            in={slide === true}
            timeout={1000}
            classNames="fade-bounce-left"
            onExited={() => setSlide(false)}
          >
          <div className="slide" ref={nodeRefSlideDisplay6}>
            {GoBackArrow()}
            <h3>{sectionHeaders[5].title}</h3>
            <div className="expertiseContainer">
              {mapExpertise(russKRyanExpertise[1])}
            </div>
            {GoBackArrow('bottom')}
          </div>
          </CSSTransition>
          <CSSTransition 
            nodeRef={nodeRefSlideDisplay7}
            in={slide === true}
            timeout={1000}
            classNames="fade-bounce-left"
            onExited={() => setSlide(false)}
          >
          <div className="slide" ref={nodeRefSlideDisplay7}>
            {GoBackArrow()}
            <h3>{sectionHeaders[6].title}</h3>
            <div className="expertiseContainer">
              {mapExpertise(russKRyanExpertise[2])}
            </div>
          </div>
          </CSSTransition>
          <CSSTransition 
            nodeRef={nodeRefSlideDisplay8}
            in={slide === true}
            timeout={1000}
            classNames="fade-bounce-left"
            onExited={() => setSlide(false)}
          >
          <div className="slide" ref={nodeRefSlideDisplay8}>
            {GoBackArrow()}
            <h3>{sectionHeaders[7].title}</h3>
            <div className="expertiseContainer">
              {mapExpertise(russKRyanExpertise[3])}
            </div>
            {GoBackArrow('bottom')}
          </div>
          </CSSTransition>
          <CSSTransition 
            nodeRef={nodeRefSlideDisplay9}
            in={slide === true}
            timeout={1000}
            classNames="fade-bounce-left"
            onExited={() => setSlide(false)}
          >
          <div className="slide" ref={nodeRefSlideDisplay9}>
            {GoBackArrow()}
            <h3>{sectionHeaders[8].title}</h3>
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
            {GoBackArrow('bottom')}
          </div>
          </CSSTransition>
          <CSSTransition 
            nodeRef={nodeRefSlideDisplay10}
            in={slide === true}
            timeout={1000}
            classNames="fade-bounce-left"
            onExited={() => setSlide(false)}
          >
          <div className="slide" ref={nodeRefSlideDisplay10}>
            {GoBackArrow()}
            <h3>{sectionHeaders[9].title}</h3>
            <ul className="serviceContainer">
              {russKRyanPublicAndCommunityService.map(service => (
                <li className="service" key={service.years}>
                  {service.position} — {service.institution} — {service.years}
                </li>
              ))}
            </ul>
          </div>
          </CSSTransition>
          <CSSTransition
            nodeRef={nodeRefSlideDisplay11}
            in={slide === true}
            timeout={1000}
            classNames="fade-bounce-left"
            onExited={() => setSlide(false)}
          >
          <div className="slide" ref={nodeRefSlideDisplay11}>
            {GoBackArrow()}
            <h3>{sectionHeaders[10].title}</h3>
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
            {GoBackArrow('bottom')}
          </div>
          </CSSTransition>
        </Slider>
      
    </div>
  )
}
