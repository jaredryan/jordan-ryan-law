'use client'

import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'


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

const sectionHeaders = [
  'Education',
  'Bar Admissions',
  'Ratings and Designations',
  'Court Admissions',
  'Positions',
  'Experience',
  'Affiliations',
  'Public and Community Service',
  'Clients',
]

function BlankArrow(_props: any) {
    return <div style={{ display: "none" }} />
}

const renderSideNavItem = (header) => {
  // if (header === 'Experience') {
  //   return (
  //     <Accordion>
  //       <AccordionSummary
  //         expandIcon={<FontAwesomeIcon icon={faCaretDown} />}
  //         aria-controls="panel2-content"
  //         id="panel2-header"
  //       >
  //         <p>{header}</p>
  //       </AccordionSummary>
  //       <AccordionDetails>
  //         {russKRyanExpertise.map(expertise => (
  //           <p>{expertise.name}</p>
  //         ))}
  //       </AccordionDetails>
  //     </Accordion>
  //   )
  // } else if (header === 'Clients') {
  //   return (
  //     <Accordion>
  //       <AccordionSummary
  //         expandIcon={<FontAwesomeIcon icon={faCaretDown} />}
  //         aria-controls="panel2-content"
  //         id="panel2-header"
  //       >
  //         <p>{header}</p>
  //       </AccordionSummary>
  //       <AccordionDetails>
  //         <p>Present</p>
  //         <p>Past</p>
  //       </AccordionDetails>
  //     </Accordion>
  //   )
  // }
  return <p>{header}</p>
}

export default function Carousel() {
  const settings = {
    customPaging: function(i: number) {
      const header = sectionHeaders[i]
      return (
        <a className="tab">
          {renderSideNavItem(header)}
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
    <div className="aboutCarousel carouselComponent">
      <Slider {...settings}>
        <div className="slide">
          <h2>{sectionHeaders[0]}</h2>
          <ul className="educationContainer">
            {russKRyanEducation.map(education => (
              <li className="education" key={education.institution}>
                {education.degree} - {education.rank} — {education.institution} — {education.year}
              </li>
            ))}
          </ul>
        </div>
        <div className="slide">
          <h2>{sectionHeaders[1]}</h2>
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
          <h2>{sectionHeaders[2]}</h2>
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
          <h2>{sectionHeaders[3]}</h2>
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
          <h2>{sectionHeaders[4]}</h2>
          <ul className="experienceContainer">
            {russKRyanPriorExperience.map(experience => (
              <li className="experience" key={experience.years}>
                {experience.position} — {experience.institution} — {experience.years}
              </li>
            ))}
          </ul>      
        </div>  
        <div className="slide">
          <h2>{sectionHeaders[5]}</h2>
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
        <div className="slide">
          <h2>{sectionHeaders[6]}</h2>
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
          <h2>{sectionHeaders[7]}</h2>
          <ul className="serviceContainer">
            {russKRyanPublicAndCommunityService.map(service => (
              <li className="service" key={service.years}>
                {service.position} — {service.institution} — {service.years}
              </li>
            ))}
          </ul>
        </div>
        <div className="slide">
          <h2>{sectionHeaders[8]}</h2>
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
