// Russ Ryan's credentials, verbatim from the pre-migration app.

export interface Education {
  institution: string
  degree: string
  rank: string
  year: string
}

export const education: Education[] = [
  {
    institution: 'University of California, Berkeley',
    degree: 'Juris Doctorate',
    rank: 'Top 25% (Approximate) of Class',
    year: '1988',
  },
  {
    institution: 'Brigham Young University',
    degree: 'Bachelor of Science, Psychology',
    rank: 'Cum Laude',
    year: '1985',
  },
]

export interface BarAdmission {
  state: string
  year: string
}

export const barAdmissions: BarAdmission[] = [
  { state: 'California', year: '1989' },
  { state: 'Utah', year: '2001' },
]

export const courtAdmissions: string[] = [
  'United States Supreme Court',
  'Ninth Circuit Court of Appeal',
  'Tenth Circuit Court of Appeal',
  'U.S. District Court, Northern District of California',
  'U.S. District Court, Southern District of California',
  'U.S. District Court, Eastern District of California',
  'U.S. District Court, Central District of California',
  'U.S. District Court, District of Utah',
]

export interface RatingOrDesignation {
  title: string
  simplified: string
  years: string
}

export const ratingsAndDesignations: RatingOrDesignation[] = [
  {
    title: `Designated "Super Lawyer" in California as selected by Super Lawyers Magazine, which uses a patented third party nomination and selection process to rate the top 5% of attorneys in each state`,
    simplified: `"Super Lawyer" in California, as selected by Super Lawyers Magazine`,
    years: '2014-present',
  },
  {
    title: `"AV Preeminent" rated attorney signifying the highest possible rating of professional excellence in both legal ability and ethical standards, which is Martindale-Hubbell Law Directory's highest accolade afforded to only the top 5% of all attorneys and law firms nationwide, based on peer review ratings provided by the area's judges and attorneys`,
    simplified: `"AV Preeminent" rated attorney, as selected by Martindale-Hubbell`,
    years: '2012-present',
  },
  {
    title: `Martindale-Hubbell Top Rated Lawyers in Labor and Employment`,
    simplified: `Martindale-Hubbell Top Rated Lawyers in Labor and Employment`,
    years: '2016-present',
  },
  {
    title: `Martindale-Hubbell Top Rated Lawyers in Litigation`,
    simplified: `Martindale-Hubbell Top Rated Lawyers in Litigation`,
    years: '2016-present',
  },
  {
    title: `America's Most Honored Lawyers - Top 1%`,
    simplified: `America's Most Honored Lawyers - Top 1%`,
    years: '2016-Present',
  },
  {
    title: `Designated as one of "Top Lawyers in California" by The Legal Network from 2014 to the present as Highest in Ethical Standards and Professional Excellence.`,
    simplified: `"Top Lawyers in California", as selected by The Legal Network`,
    years: '2014-present',
  },
]

export interface PriorPosition {
  position: string
  institution: string
  years: string
}

export const priorExperience: PriorPosition[] = [
  { position: 'Partner', institution: 'Motschiedler, Michaelides, Wishon, Brewer & Ryan, LLP', years: '2002-2025' },
  {
    position: 'Shareholder / Partner',
    institution: `Parr, Brown, Loveless and Gee, Salt Lake City Utah and Holland & Hart, LLP, Salt Lake City, Utah`,
    years: '2001-2002',
  },
  { position: 'Partner', institution: 'Motschiedler, Michaelides, Wishon, Brewer & Ryan, LLP', years: '1994-2001' },
  {
    position: 'Adjunct Professor',
    institution: 'San Joaquin College of Law (Employment, Insurance, and Commercial Transactions Law)',
    years: '1992-2000',
  },
  { position: 'Associate Attorney', institution: 'Littler Mendelson, Fresno, California', years: '1992-1994' },
  {
    position: 'Associate Attorney',
    institution: 'Brobeck, Phleger & Harrison, San Francisco, California',
    years: '1989-1991',
  },
  { position: 'Judicial Clerkship', institution: 'Honorable Aldon J. Anderson, District of Utah', years: '1988-1989' },
]

export const publicAndCommunityService: PriorPosition[] = [
  { position: 'Commissioner', institution: 'Madera County Civil Service Commission', years: '1997' },
  {
    position: 'Missionary',
    institution: 'Church of Jesus Christ of Latter Day Saints, Buenos Aires, Argentina',
    years: '1980-1982',
  },
]

export const affiliations: string[] = [
  `California, Utah and Fresno County Bar Associations`,
  `Madera County Bar Association — Secretary/Treasurer, 1992-1993; Vice President, 1994; President, 1995`,
  `American Business Trial Lawyers — Board of Directors, Fresno Chapter, 2008`,
  `Heartland Opportunity Center — Board of Directors, Vice President, 2001`,
  `Resources for Independence Central Valley — Board of Directors, 2009-present`,
  `Kimberlite Corporation (dba Sonitrol) — Board Chairperson, 2010-present`,
  `Center for Disability Innovation at California State University, Fresno — Steering Committee 2008-present`,
]

export interface TrainingEngagement {
  title: string
  content: string
}

export interface ExpertiseSection {
  name: string
  paragraphs: string[]
  trainingEngagements?: TrainingEngagement[]
  reportedDecisions?: string[]
}

export const expertise: ExpertiseSection[] = [
  {
    name: 'Employment',
    paragraphs: [
      `A primary focus of his practice is employment law, representing employers (and the occasional employee) in all aspects of the employment relationship. This includes providing training on all aspects of federal and state rules and regulations, drafting employment policies, handbooks, employment agreements, confidentiality agreements, severance agreements, etc., advising clients on employment issues and representing clients in litigation.`,
      `Russ has represented clients on issues involving gender, race and age discrimination, sexual harassment, Title VII, drug testing, wiretapping, unfair competition, privacy, negligent hiring and retention, wrongful termination and demotion, FMLA, ADA, labor code violations and employment-related torts such as fraud and slander. His counseling emphasizes reducing the risk of litigation through planning and strategy.`,
    ],
  },
  {
    name: 'Training',
    paragraphs: [
      `He has provided training to more than 150,000 participants on all phases of the employment relationship in all aspects of employment law. These training sessions have ranged from groups of 5-10 employees and managers to more than 1,000 participants and have been conducted in English and Spanish. He is fluent in Spanish. A sampling of these training sessions include the following:`,
    ],
    trainingEngagements: [
      {
        title: `Council on Education in Management`,
        content: `Moderator and presenter of full and part day programs on sexual harassment, employment discrimination under state and federal law, FMLA, CFRA, ADA, violence in the workplace, and numerous other programs (1993-2002) (more than 30 programs involving thousands of participants).`,
      },
      {
        title: `National Business Institute`,
        content: `Moderator and presenter on employment law and OSHA programs.`,
      },
      {
        title: `Littler Mendelson`,
        content: `Presenter on various programs on sexual harassment, employment, restrictive covenants, trade secrets and employees, FMLA, CFRA, ADA, violence in the workplace and other programs (more than 25 presentations involving thousands of participants).`,
      },
      {
        title: `Head Start Programs`,
        content: `Presenter and trainer at numerous sessions, in English and Spanish, to employees, members of boards of directors, and members of parent policy council and committees on sexual harassment violence in the workplace, employment discrimination, Brown Act and Roberts Rules of Order. These trainings have been provided to participants from more than 50 Head Start Centers over the last 30 years (involving more than 100 trainings and thousands of participants).`,
      },
      {
        title: `Federally Qualified Health Centers`,
        content: `Presenter and trainer at numerous sessions to employees, members of boards of directors, and physicians on topics such as sexual harassment, violence in the workplace, employment discrimination, Brown Act, Roberts Rules of Order, Board Governance, Corporate and HIPAA compliance. These trainings have been provided to employees of dozens of clinics throughout California (involving more than 100 trainings and thousands of participants).`,
      },
      {
        title: `Various Non-Profit and Service Organizations`,
        content: `Presenter and trainer to numerous non-profit organizations such as the Centers for Independent Living, Heartland Opportunity Center, Boys and Girls Clubs, Save the Children, Rotary Clubs, Lions Clubs, Kiwanis Clubs, Medical Group Management Association, various hospitals and health clinics on various topics ranging from sexual harassment, violence in the workplace, employment discrimination, Title VII, FMLA, ADA, the Brown Act, Roberts Rules of Order, Board Governance, HIPAA compliance and annual legal updates. These trainings have been provided to numerous organizations throughout California (involving more than 100 trainings and thousands of participants).`,
      },
      {
        title: `Client Training`,
        content: `Presenter and trainer at hundreds of training sessions to employees and managers for various clients, large and small, including hotels, hotel management companies, restaurants, manufacturers, automobile dealerships, agricultural concerns, construction companies, health clinics, physician groups, hospitals, skilled nursing facilities, beverage distributors and alarm companies on various topics ranging from sexual harassment, violence in the workplace, employment discrimination, FMLA, ADA, the Brown Act, Roberts Rules of Order to HIPAA compliance.`,
      },
    ],
  },
  {
    name: 'Health Care, Business and Real Estate',
    paragraphs: [
      `He represents federal qualified health centers, rural health clinics, skilled nursing facilities as well as private practice health care providers with regard to transactions and litigation, corporate compliance, peer review proceedings, operational and organizational issues, fraud and abuse, HIPAA compliance, litigation, mediation and arbitration, and provider reimbursement and payment.`,
    ],
  },
  {
    name: 'Litigation',
    paragraphs: [
      `He has conducted more than 150 major hearings, arbitrations, court and jury trials to conclusion, prevailing in at least 90% of those cases.`,
      `Reported appellate decisions include:`,
    ],
    reportedDecisions: [
      `Hernandez v. City of Hanford, 41 Cal. 4th 279 (2007)`,
      `Kelton v. Stravinski, 138 Cal.App.4th 941 (2006)`,
      `Church v. Jamison, 143 Cal.App.4th 1568 (2006)`,
      `QC Constr. Prods. v. Cohills Building Spec., Inc., 423 F. Supp.2d 1008 (D.Az. 2006)`,
      `Spencer Enters. v. United States, 229 F. Supp. 2d 1025 (E.D. Cal. 2001)`,
      `Urias v. Harris Farms, 234 Cal.App.3d 415 (1991)`,
    ],
  },
]
