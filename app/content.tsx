import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBriefcase, faLaptop, faFileInvoiceDollar,
  faGavel, faScaleBalanced, faHandHoldingMedical,
  faPhone, faLocationDot,
} from '@fortawesome/free-solid-svg-icons'
import { PostalAddress } from 'schema-dts'

export const businessName = `Ryan Legal, PC`
export const businessSlogan = `Premier Representation of Employers, Health Care Providers
  and Non-Profits throughout California`
export const businessSummary = `Premier Representation of Employers, Health Care Providers
  and Non-Profits throughout California`

export const businessExplanation = [
  `Ryan Legal, PC, is a Central California full-service law firm whose practice focuses
    on labor and employment, health care, non-profit representation and business litigation.
    For more than 35 years Russ Ryan and his legal team has provided the highest quality of
    legal representation for local and national clients.`,
  `Ryan Legal has particular expertise in working with Federally Qualified Health Centers
    and health clinics, Community Action Agencies, Head Start Programs and both California
    and out-of-state employers navigating California’s complex employment and wage and hour
    laws and regulations.`,
  `Whether it’s the defense of “bet the company” class action litigation, strategic
    counseling and development of best practices personnel policies and employment agreements,
    or litigation of employment or business matters, Ryan Legal will provide the best possible
    representation in a timely, responsive and efficient manner.`,
]

export const areasOfPractice = [{
  name: 'Labor and Employment',
  icon: <FontAwesomeIcon icon={faBriefcase} />,
  content: `Ryan Legal comprehensively serves the needs of employers in all aspects of
    employment law, from day-to-day advising, workplace training, corporate
    compliance and the development of personnel policies and procedures to
    representation in employment-related disputes and litigation before federal and
    state courts and administrative agencies such as the California Civil Rights Department,
    the Equal Employment Opportunity Commission, the Department of
    Labor, the California Labor Commissioner and the Employment Development
    Department. Ryan Legal represents many of the largest employers in Central
    California in cutting edge disputes such as class action litigation, wrongful
    termination, sexual harassment and other discrimination claims, unfair
    competition and trade secret litigation. Ryan Legal is also actively involved in the
    representation of employers in union organizational efforts and elections,
    negotiations and the prosecution and defense of claims of unfair labor practice
    matters.`,
}, {
  name: 'Business Transactions and Finance',
  icon: <FontAwesomeIcon icon={faFileInvoiceDollar} />,
  className: 'businessTransactions',
  content: `In his role as outside general counsel for many of his clients, Mr. Ryan has
    provided representation all aspects of formation, organization, financing and
    merging of both for-profit and non-profit entities. This includes borrower
    representation in secured and unsecured financial transactions, including loan
    commitments and credit line renewals from $1 million to more than $200 million,
    and assistance with the merging of health care entities and complex structuring
    such as those involving new market tax credits. Having taught commercial and
    secured transactions as an adjunct professor at a local law school for eight years
    has given Mr. Ryan unique insights into such transactions.`
}, {
  name: 'Health Care',
  icon: <FontAwesomeIcon icon={faHandHoldingMedical} />,
  content: `Ryan Legal represents federal qualified health centers, rural health clinics,
    skilled nursing facilities as well as private practice health care providers with regard
    to corporate compliance, peer review proceedings, operational and organizational
    issues, fraud and abuse, HIPAA compliance, litigation, mediation and arbitration,
    and provider reimbursement and payment.`
}, {
  name: 'Technology',
  icon: <FontAwesomeIcon icon={faLaptop} />,
  content: `Ryan Legal advises on and litigates IT matters, including claims of unfair
    competition, trade secret misappropriation and interference with business
    relationships. The firm also advises tech companies in the areas of confidentiality
    and nondisclosure agreements, complex compensation arrangements, software
    agreements, trademark licensing and related issues.`
}, {
  name: 'Business Litigation',
  icon: <FontAwesomeIcon icon={faScaleBalanced} />,
  content: `Ryan Legal represents clients in complex business litigation (including contract
    litigation, trade secret, confidentiality and unfair competition disputes, real estate
    disputes and construction litigation). The firm represents clients before all state
    and federal trial courts, as well as governmental and administrative entities.`
}, {
  name: 'Appellate Litigation',
  icon: <FontAwesomeIcon icon={faGavel} />,
  content: `Ryan Legal successfully represents clients in appellate matters in the California
    Courts of Appeal, the California Supreme Court, the Ninth and Tenth Circuit
    Courts of Appeal and the United States Supreme Court. Mr. Ryan has nine
    reported appellate decisions to his credit, including: (1) the case that changed the
    way all California employers are now required to accrue vacation pay for
    employees in light of technological advances (Church v. Jamison, 143
    Cal.App.4th 1568 (2006)); and (2) the first case to hold that California laws
    prohibiting anti-competitive restraints such as Business and Professions Code
    Section 16600 applies to partnerships.`
}]

export const russKRyanProfileSummary = [
  `Russ Ryan is an attorney who focuses his practice on labor and employment, health care,
    non-profit representation and business litigation. He represents employers (and the occasional
    employee) in all aspects of employment law, from day-to-day advising, workplace training, corporate
    compliance and the development of personnel policies and procedures to representation in
    employment-related disputes and litigation before federal and state courts through trial and appeal,
    and administrative agencies such as the California Civil Rights Department, the Equal Employment
    Opportunity Commission, the Department of Labor, the California Labor Commissioner and the
    Employment Development Department.`,
  `His clients include national, regional and local companies
    and individuals involved in many different industries, with a particular emphasis on health care
    entities and non-profit organizations. He also assists out-of-town law firms as local counsel on
    matters pending in state and federal court.`,
]

export const russKRyanEducation = [{
  institution: 'University of California, Berkeley',
  degree: 'Juris Doctorate',
  rank: 'Top 25% (Approximate) of Class',
  year: '1988',
}, {
  institution: 'Brigham Young University',
  degree: 'Bachelor of Science, Psychology',
  rank: 'Cum Laude',
  year: '1985',
}]

export const russKRyanBarAdmissions = [{
  state: 'California',
  year: '1989',
}, {
  state: 'Utah',
  year: '2001',
}]

export const russKRyanCourtAdmissions = [
  'United States Supreme Court',
  'Ninth Circuit Court of Appeal',
  'Tenth Circuit Court of Appeal',
  'U.S. District Court, Northern District of California',
  'U.S. District Court, Southern District of California',
  'U.S. District Court, Eastern District of California',
  'U.S. District Court, Central District of California',
  'U.S. District Court, District of Utah',
]

export const russKRyanRatingsAndDesignations = [{
  title: `Designated "Super Lawyer" in California as selected by Super Lawyers Magazine, which uses a patented
    third party nomination and selection process to rate the top 5% of attorneys in each state`,
  simplified: `"Super Lawyer" in California, as selected by Super Lawyers Magazine`,
  years: '2014-present',
}, {
  title: `"AV Preeminent" rated attorney signifying the highest possible rating of professional
    excellence in both legal ability and ethical standards, which is Martindale-Hubbell Law Directory's highest
    accolade afforded to only the top 5% of all attorneys and law firms nationwide, based on peer
    review ratings provided by the area's judges and attorneys`,
  simplified: `"AV Preeminent" rated attorney, as selected by Martindale-Hubbell`,
  years: '2012-present',
}, {
  title: `Martindale-Hubbell Top Rated Lawyers in Labor and Employment`,
  simplified: `Martindale-Hubbell Top Rated Lawyers in Labor and Employment`,
  years: '2016-present',
}, {
  title: `Martindale-Hubbell Top Rated Lawyers in Litigation`,
  simplified: `Martindale-Hubbell Top Rated Lawyers in Litigation`,
  years: '2016-present',
}, {
  title: `America's Most Honored Lawyers - Top 1%`,
  simplified: `America's Most Honored Lawyers - Top 1%`,
  years: '2016-Present',
}, {
  title: `Designated as one of "Top Lawyers in California" by The Legal Network from 2014 to the present as
    Highest in Ethical Standards and Professional Excellence.`,
  simplified: `"Top Lawyers in California", as selected by The Legal Network`,
  years: '2014-present'
}]

// If the awards are significant and represent the business, list them.
export const russKRyanRatingsAndDesignationsSimplified = russKRyanRatingsAndDesignations
  .map(ratingOrDesignation => ratingOrDesignation.simplified)

export const russKRyanRatingsAndDesignationsSimplifiedWithYears = russKRyanRatingsAndDesignations
  .map(ratingOrDesignation => `${ratingOrDesignation.simplified} — ${ratingOrDesignation.years}`)

export const russKRyanPriorExperience = [{
  position: 'Partner',
  institution: 'Motschiedler, Michaelides, Wishon, Brewer & Ryan, LLP',
  years: '2002-2025',
}, {
  position: 'Shareholder / Partner',
  institution: `Parr, Brown, Loveless and Gee, Salt Lake City Utah and Holland & Hart,
    LLP, Salt Lake City, Utah`,
  years: '2001-2002',
}, {
  position: 'Partner',
  institution: 'Motschiedler, Michaelides, Wishon, Brewer & Ryan, LLP',
  years: '1994-2001',
}, {
  position: 'Adjunct Professor',
  institution: 'San Joaquin College of Law (Employment, Insurance, and Commercial Transactions Law)',
  years: '1992-2000',
}, {
  position: 'Associate Attorney',
  institution: 'Littler Mendelson, Fresno, California',
  years: '1992-1994',
}, {
  position: 'Associate Attorney',
  institution: 'Brobeck, Phleger & Harrison, San Francisco, California',
  years: '1989-1991',
}, {
  position: 'Judicial Clerkskip',
  institution: 'Honorable Aldon J. Anderson, District of Utah',
  years: '1988-1989',
}]

export const russKRyanPublicAndCommunityService = [{
  position: 'Commissioner',
  institution: 'Madera County Civil Service Commission',
  years: '1997'
}, {
  position: 'Missionary',
  institution: 'Church of Jesus Christ of Latter Day Saints, Buenos Aires, Argentina',
  years: '1980-1982'
}]

export const russKRyanAffiliations = [
  `California, Utah and Fresno County Bar Associations`,
  `Madera County Bar Association — Secretary/Treasurer, 1992-1993; Vice President, 1994;
    President, 1995`,
  `American Business Trial Lawyers — Board of Directors, Fresno Chapter, 2008`,
  `Heartland Opportunity Center — Board of Directors, Vice President, 2001`,
  `Resources for Independence Central Valley — Board of Directors, 2009-present`,
  `Kimberlite Corporation (dba Sonitrol) — Board Chairperson, 2010-present`,
  `Center for Disability Innovation at California State University, Fresno — Steering Committee
    2008-present`,
]

export const russKRyanExpertise = [{
  name: 'Employment',
  content: [
    `A primary focus of his practice is employment law, representing employers (and the occasional
      employee) in all aspects of the employment relationship. This includes providing training on all
      aspects of federal and state rules and regulations, drafting employment policies, handbooks,
      employment agreements, confidentiality agreements, severance agreements, etc., advising clients
      on employment issues and representing clients in litigation.`,
    `Russ has represented clients on issues involving gender, race and age discrimination, sexual
      harassment, Title VII, drug testing, wiretapping, unfair competition, privacy, negligent hiring and
      retention, wrongful termination and demotion, FMLA, ADA, labor code violations and employment-
      related torts such as fraud and slander. My counseling emphasizes reducing the risk of litigation
      through planning and strategy.`,
  ]
}, {
  name: 'Training',
  content: [
    `He has provided training to more than 150,000 participants on all phases of the employment
      relationship in all aspects of employment law. These training sessions have ranged from groups of
      5-10 employees and managers to more than 1,000 participants and have been conducted in English
      and Spanish. He is fluent in Spanish. A sampling of these training sessions include the following:`,
    [{
      title: `Council on Education in Management`,
      content: `Moderator and presenter of full and part day programs on
      sexual harassment, employment discrimination under state and federal law, FMLA, CFRA, ADA,
      violence in the workplace, and numerous other programs (1993-2002) (more than 30 programs
      involving thousands of participants).`
    },
    {
      title: `National Business Institute`,
      content: `Moderator and presenter on employment law and OSHA programs.`,
    },{
      title: `Littler Mendelson`,
      content: `Presenter on various programs on sexual harassment, employment, restrictive
        covenants, trade secrets and employees, FMLA, CFRA, ADA, violence in the workplace and
        other programs (more than 25 presentations involving thousands of participants).`,
    }, {
      title: `Head Start Programs`,
      content: `Presenter and trainer at numerous sessions, in English and Spanish, to
      employees, members of boards of directors, and members of parent policy council and committees
      on sexual harassment violence in the workplace, employment discrimination, Brown Act and
      Roberts Rules of Order. These trainings have been provided to participants from more than 50
      Head Start Centers over the last 30 years (involving more than 100 trainings and thousands of
      participants).`,
    }, {
      title: `Federally Qualified Health Centers`,
      content: `Presenter and trainer at numerous sessions to employees,
      members of boards of directors, and physicians on topics such as sexual harassment, violence in
      the workplace, employment discrimination, Brown Act, Roberts Rules of Order, Board
      Governance, Corporate and HIPAA compliance. These trainings have been provided to employees
      of dozens of clinics throughout California (involving more than 100 trainings and thousands of
      participants).`,
    }, {
      title: `Various Non-Profit and Service Organizations`,
      content: `Presenter and trainer to numerous non-profit
        organizations such as the Centers for Independent Living, Heartland Opportunity Center, Boys and
        Girls Clubs, Save the Children, Rotary Clubs, Lions Clubs, Kiwanis Clubs, Medical Group
        Management Association, various hospitals and health clinics on various topics ranging from
        sexual harassment, violence in the workplace, employment discrimination, Title VII, FMLA, ADA,
        the Brown Act, Roberts Rules of Order, Board Governance, HIPAA compliance and annual legal
        updates (. These trainings have been provided to numerous organizations throughout California
        (involving more than 100 trainings and thousands of participants).`,
    }, {
      title: `Client Training`,
      content: `Presenter and trainer at hundreds of training sessions to employees and
        managers for various clients, large and small, including hotels, hotel management companies,
        restaurants, manufacturers, automobile dealerships, agricultural concerns, construction
        companies, health clinics, physician groups, hospitals, skilled nursing facilities, beverage
        distributors and alarm companies on various topics ranging from sexual harassment, violence in
        the workplace, employment discrimination, FMLA, ADA, the Brown Act, Roberts Rules of Order to
        HIPAA compliance.`,
    }]
  ]
}, {
  name: 'Health Care, Business and Real Estate',
  content: [
    `He represents federal qualified health centers, rural health clinics, skilled nursing facilities as well as
      private practice health care providers with regard to transactions and litigation, corporate
      compliance, peer review proceedings, operational and organizational issues, fraud and abuse,
      HIPAA compliance, litigation, mediation and arbitration, and provider reimbursement and payment.`,
  ]
}, {
  name: 'Litigation',
  content: [
    `He has conducted more than 150 major hearings, arbitrations, court and jury trials to conclusion,
      prevailing in at least 90% of those cases.`,
    `Reported appellate decisions include:`,
    [
      `Hernandez v. City of Hanford, 41 Cal. 4th 279 (2007)`,
      `Kelton v. Stravinski, 138 Cal.App.4th 941 (2006)`,
      `Church v. Jamison, 143 Cal.App.4th 1568 (2006)`,
      `QC Constr. Prods. v. Cohills Building Spec., Inc., 423 F. Supp.2d 1008 (D.Az. 2006)`,
      `Spencer Enters. v. United States, 229 F. Supp. 2d 1025 (E.D. Cal. 2001)`,
      `Urias v. Harris Farms, 234 Cal.App.3d 415 (1991)`,
    ],
  ]
}]

export const russKRyanClients = {
  current: [
    'Agriland Farming, Inc.',
    'Altura Centers for Health',
    'Berry & Berry',
    'Camarena Health',
    'Central Cal Metals',
    'Central California Child Development Services, Inc.',
    'Chowchilla Memorial Healthcare District',
    'Community Action Partnership of Madera County',
    'DMP Development Corporation',
    'Donaghy Sales, LLC',
    'Dutchman Doors',
    'Honeyville, Inc.',
    'Industrial and Commercial Contractors, Inc.',
    'Landmark Irrigation',
    'Layton and Abbott Construction Companies',
    'Livingston Community Health',
    'Mountain View Staging',
    'Natural Vision',
    `Pitman Farms (Mary's Chicken and Norbest)`,
    'Resources for Independence — Central Valley',
    'Sonitrol Alarm Systems',
    'Stravinski Development Group',
    'United Health Centers of the San Joaquin Valley, Inc.',
    'Valley Health Team, Inc.'
  ],
  past: [
    'Sun-Maid',
    'Snap Finance',
    'United Parcel Service',
    'Dole',
    'Varsity Contractors',
  ]
}

// contactCards

export const contactCards = [{
  icon: <FontAwesomeIcon icon={faPhone} />,
  name: 'Contact Us',
  content: [
    'Telephone: (559) 439-4000',
    'russ@ryanlegalpc.com',
    'crystal@ryanlegalpc.com'
  ]
}, {
  icon: <FontAwesomeIcon icon={faLocationDot} />,
  name: 'Address',
  content: [
    '5200 North Palm Avenue',
    'Suite 306',
    'Fresno, California 93704'
  ]
}]

export const homeLink = {
  name: 'Home',
  href: '/',
}

export const links = [{
  name: 'Expertise',
  href: '/expertise',
},
{
  name: 'About Us',
  href: '/about'
},
{
  name: 'Contact Us',
  href: '/contact-us'
},
{
  name: 'Payment',
  href: '/payment'
}]

export const aboutTopics = [
  'Education',
  'Bar and Court Admissions',
  'Ratings and Designations',
  'Positions',
  'Employment',
  'Training',
  'Health Care, Business and Real Estate',
  'Litigation',
  'Affiliations',
  'Public and Community Service',
  'Clients',
]

export const knowsAbout = [
  "Labor and Employment Law",
  "Business Transactions and Finance",
  "Health Care Law",
  "Technology Law",
  "Business Litigation",
  "Appellate Litigation",
  "Real Estate Law"
]

export const skills = [
  'Workplace Training & Employment Policies',
  'Employment Litigation',
  'Corporate Compliance & Business Transactions',
  'Health Care Compliance & HIPAA',
  'Mediation & Arbitration',
  'Jury Trials & Appellate Litigation',
  'Business Formation & Mergers',
  'Financial Transaction Representation',
  'Trade Secrets & Intellectual Property Law',
  'Software Agreements & Trademark Licensing'
]

export const aboutKeywords = [
  'Russell Ryan Attorney',
  'Labor and Employment Lawyer',
  'Business Litigation Attorney',
  'Health Care Legal Expert',
  'California Employment Law',
  'Corporate Compliance Attorney',
  'Trade Secret Lawyer',
  'Real Estate Legal Counsel',
  'Arbitration and Mediation Expert',
  'Appellate Litigation Attorney'
]

export const physicalAddressJSON = {
  '@type': 'PostalAddress',
  addressLocality: contactCards[1].content[2].split(',')[0],
  addressRegion: 'CA',
  addressCountry: 'US',
  postalCode: contactCards[1].content[2].split(' ')[2],
  streetAddress: contactCards[1].content[0]
} as PostalAddress

export const contactDetailsJSON = {
  openingHours: 'Mo-Fr 08:00-17:00',
  email: [
    contactCards[0].content[1],
    contactCards[0].content[2],
  ],
  telephone: contactCards[0].content[0].split(':')[1].slice(1),
}
