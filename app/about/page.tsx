import Image from 'next/image';
import '@/app/ui/about.css';

import {
  russKRyanProfileSummary,
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

export default function Page() {
  return (
    <div className="aboutPage">
      <div className="imageContainer">
        <Image
          src="/pen-on-notebook.jpg"
          width={0}
          height={0}
          sizes="100vw"
          alt="Attorneys Writing Image"
          className="bannerImage"
          loading="eager"
        />
        <div className="after" />
        <div className="imageText">
          <h1>About Us</h1>
        </div>
      </div>
      <div className="contentSection">
        <h2>Russell K. Ryan — Partner and Founder</h2>
        <div className="images">
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}> 
            <Image
              src="/old-profile.jpg"
              width={0}
              height={0}
              sizes="100vw"
              alt="Russ Ryan Image"
              className="profileImage"
            />
            <Image
              src="/posed-profile.jpg"
              width={0}
              height={0}
              sizes="100vw"
              alt="Russ Ryan Image"
              className="profileImage"
            />
            <Image
              src="/profile.jpg"
              width={0}
              height={0}
              sizes="100vw"
              alt="Russ Ryan Image"
              className="profileImage"
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>   
            <Image
              src="/walking-profile.jpg"
              width={0}
              height={0}
              sizes="100vw"
              alt="Russ Ryan Image"
              className="profileImage"
            />
            <Image
              src="/relaxed-profile.jpg"
              width={0}
              height={0}
              sizes="100vw"
              alt="Russ Ryan Image"
              className="profileImage"
            />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Image
                src="/av-preeminent.png"
                width={0}
                height={0}
                sizes="100vw"
                alt="AV Preeminent Image"
                className="avPreeminentBadge"
              />
              <Image
                src="/super-lawyers-badge.png"
                width={0}
                height={0}
                sizes="100vw"
                alt="Super Lawyers Badge Image"
                className="superLawyersBadge"
              />
            </div>
          </div>
          
        </div>
        <div className='information'>
          <h3>Introduction</h3>
          <p className="introduction">
            {russKRyanProfileSummary}
          </p>
          <h3>Education</h3>
          <ul className="educationContainer">
            {russKRyanEducation.map(education => (
              <li className="education" key={education.institution}>
                {education.degree} - {education.rank} — {education.institution} — {education.year}
              </li>
            ))}
          </ul>
          <h3>Bar Admissions</h3>
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
          <h3>Ratings and Designations</h3>
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
          <h3>Court Admissions</h3>
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
          <h3>Positions</h3>
          <ul className="experienceContainer">
            {russKRyanPriorExperience.map(experience => (
              <li className="experience" key={experience.years}>
                {experience.position} — {experience.institution} — {experience.years}
              </li>
            ))}
          </ul>        
          <h3>Experience</h3>
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
          <h3>Affiliations</h3>
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
          <h3>Public and Community Service</h3>
          <ul className="serviceContainer">
            {russKRyanPublicAndCommunityService.map(service => (
              <li className="service" key={service.years}>
                {service.position} — {service.institution} — {service.years}
              </li>
            ))}
          </ul>
          <h3>Clients</h3>
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
        </div>
      </div>
    </div>
  );
}
