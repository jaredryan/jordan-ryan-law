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
          <Image
            src="/profile.jpg"
            width={0}
            height={0}
            sizes="100vw"
            alt="Russ Ryan Image"
            className="profileImage"
          />
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
        <div className='information'>
          <h3>Introduction</h3>
          <p className="introduction">
            {russKRyanProfileSummary}
          </p>
          <h3>Education</h3>
          <div className="educationContainer">
            {russKRyanEducation.map(education => (
              <div className="education" key={education.institution}>
                <p>{education.institution}</p>
                <p>{education.degree}</p>
                <p>{education.rank}</p>
              </div>
            ))}
          </div>
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
          <h3>Ratings and Designations</h3>
          <ul className="ratingsAndDesignationsContainer">
            {russKRyanRatingsAndDesignations.map(ratingOrDesignation => (
              <li
                key={ratingOrDesignation}
                className="ratingOrDesignation"
              >
                {ratingOrDesignation}
              </li>
            ))}
          </ul>
          <h3>Experience</h3>
          <div className="experienceContainer">
            {russKRyanPriorExperience.map(experience => (
              <div className="experience" key={experience.years}>
                <p>{experience.position}</p>
                <p>{experience.institution}</p>
                <p>{experience.years}</p>
              </div>
            ))}
          </div>
          <h3>Public and Community Service</h3>
          <div className="serviceContainer">
            {russKRyanPublicAndCommunityService.map(service => (
              <div className="service" key={service.years}>
                <p>{service.position}</p>
                <p>{service.institution}</p>
                <p>{service.years}</p>
              </div>
            ))}
          </div>
          <h3>Affiliations</h3>
          <ul className="affiliationsContainer">
            {russKRyanRatingsAndDesignations.map(affiliation => (
              <li
                key={affiliation}
                className="affiliation"
              >
                {affiliation}
              </li>
            ))}
          </ul>
          <h3>Expertise</h3>
          <div className="expertiseContainer">
            {russKRyanExpertise.map(expertise => (
              <div className="expertise" key={expertise.name}>
                <h4>{expertise.name}</h4>
                <div className="expertiseContentContainer">
                  {expertise.content.map(paragraph => (
                    typeof paragraph == 'string' 
                      ? <p key={paragraph}>{paragraph}</p>
                      : <ul key={paragraph[0]}>
                        {paragraph.map(bullet => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <h3>Clients</h3>
          <h4>Past</h4>
          <ul className="affiliationsContainer">
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
          <ul className="affiliationsContainer">
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
