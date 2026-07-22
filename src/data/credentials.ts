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

export interface ExpertiseSection {
  name: string
  paragraphs: string[]
  reportedDecisions?: ReportedDecision[]
}

export interface ReportedDecision {
  court: string
  caseName: string
  citation: string
  description: string
}

// Training is presented on About with its own editorial structure (intro +
// "at a glance" summary + selected engagements) rather than the generic
// paragraphs/reportedDecisions shape above, so it's modeled separately
// instead of living inside `expertise`.

export const trainingIntro = `Russ has trained more than 150,000 participants on employment law, workplace compliance, and organizational governance. His programs have ranged from small sessions for 5–10 employees and managers to audiences of more than 1,000, and he has presented in both English and Spanish.`

export interface TrainingAtAGlanceGroup {
  heading: string
  items: string[]
}

export const trainingAtAGlance: TrainingAtAGlanceGroup[] = [
  {
    heading: 'Audiences',
    items: [
      'Employees',
      'Managers',
      'Executives',
      'Physicians',
      'Boards of directors',
      'Parent policy councils',
      'Nonprofit leaders',
      'Professional associations',
    ],
  },
  {
    heading: 'Employment topics',
    items: [
      'Sexual harassment',
      'Workplace discrimination',
      'Title VII',
      'FMLA',
      'CFRA',
      'ADA',
      'OSHA',
      'Workplace violence',
      'Restrictive covenants',
      'Trade secrets',
      'Annual legal updates',
    ],
  },
  {
    heading: 'Governance and compliance topics',
    items: ['The Brown Act', "Robert's Rules of Order", 'Board governance', 'Corporate compliance', 'HIPAA compliance'],
  },
]

export interface TrainingExperienceEntry {
  organization: string
  description: string
  /** Substring of `description` to give selective emphasis, matched verbatim. */
  highlight?: string
}

export const trainingExperience: TrainingExperienceEntry[] = [
  {
    organization: 'Council on Education in Management',
    description: `Moderator and presenter for more than 30 full- and half-day employment-law programs between 1993 and 2002, reaching thousands of participants.`,
    highlight: 'more than 30',
  },
  {
    organization: 'National Business Institute',
    description: `Moderator and presenter for programs covering employment law and OSHA compliance.`,
  },
  {
    organization: 'Littler Mendelson',
    description: `Presenter for more than 25 programs on employment law, harassment, restrictive covenants, trade secrets, leave laws, disability law, and workplace violence, reaching thousands of participants.`,
    highlight: 'more than 25',
  },
  {
    organization: 'Head Start programs',
    description: `More than 100 training sessions over the past 30 years for employees, boards of directors, parent policy councils, and committees across more than 50 Head Start centers. Programs have been delivered in English and Spanish and have reached thousands of participants.`,
    highlight: 'More than 100',
  },
  {
    organization: 'Federally Qualified Health Centers',
    description: `More than 100 sessions for employees, physicians, and boards across dozens of California clinics, covering employment law, workplace conduct, governance, corporate compliance, and HIPAA.`,
    highlight: 'More than 100',
  },
  {
    organization: 'Nonprofit and service organizations',
    description: `More than 100 programs for organizations including Centers for Independent Living, Heartland Opportunity Center, Boys & Girls Clubs, Save the Children, Rotary, Lions and Kiwanis clubs, hospitals, health clinics, and the Medical Group Management Association.`,
    highlight: 'More than 100',
  },
  {
    organization: 'Client training',
    description: `Hundreds of customized sessions for employees and managers across industries including hospitality, restaurants, manufacturing, automobile dealerships, agriculture, construction, health care, skilled nursing, beverage distribution, and security services.`,
    highlight: 'Hundreds',
  },
]

export const expertise: ExpertiseSection[] = [
  {
    name: 'Employment',
    paragraphs: [
      `A primary focus of his practice is employment law, representing employers (and the occasional employee) in all aspects of the employment relationship. This includes providing training on all aspects of federal and state rules and regulations, drafting employment policies, handbooks, employment agreements, confidentiality agreements, severance agreements, etc., advising clients on employment issues and representing clients in litigation.`,
      `Russ has represented clients on issues involving gender, race and age discrimination, sexual harassment, Title VII, drug testing, wiretapping, unfair competition, privacy, negligent hiring and retention, wrongful termination and demotion, FMLA, ADA, labor code violations and employment-related torts such as fraud and slander. His counseling emphasizes reducing the risk of litigation through planning and strategy.`,
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
    // Court groupings and citations per Russ, 2026-07-21. QC Construction
    // Products is filed under California Courts of Appeal per his email even
    // though its citation (D. Ariz.) reads as a federal district court — see
    // the open pre-launch TODO to confirm this with him.
    reportedDecisions: [
      {
        court: 'California Supreme Court',
        caseName: 'Hernandez v. City of Hanford',
        citation: '41 Cal.4th 279 (2007)',
        description: `Represented the parties in a significant California Supreme Court zoning case that advanced a commercial-zoning dispute to the California Supreme Court, resulting in a published opinion that remains an important authority on economic-development zoning and municipal land-use powers, reinforcing local governments' authority to use zoning regulations to protect and shape commercial districts. Widely regarded by legal writers as the most important land-use and zoning decision of 2007.`,
      },
      {
        court: 'Ninth Circuit Court of Appeals',
        caseName: 'Spencer Enterprises, Inc. v. United States (INS)',
        citation: '345 F.3d 683 (9th Cir. 2003)',
        description: `Successfully litigated this landmark Ninth Circuit EB-5 immigration case, which helped shape the modern legal framework governing immigrant-investor visa adjudications and remains one of the most frequently cited federal appellate decisions in immigration jurisprudence.`,
      },
      {
        court: 'California Courts of Appeal',
        caseName: 'Church v. Jamison',
        citation: '143 Cal.App.4th 1568 (2006)',
        description: `Obtained a published Court of Appeal decision that became a leading authority on Labor Code section 227.3, clarifying when claims for unpaid vacation accrue and expanding employees' ability to recover vested vacation benefits upon termination. The case reversed a contrary interpretation previously supported by another appellate decision and by the Division of Labor Standards Enforcement, reinforcing California's policy that earned vacation benefits cannot be forfeited and must be fully paid upon termination.`,
      },
      {
        court: 'California Courts of Appeal',
        caseName: 'Kelton v. Stravinski',
        citation: '138 Cal.App.4th 941 (2006)',
        description: `Won a leading decision confirming that Business and Professions Code section 16600 applies to partnerships and broadly restricts noncompetition agreements, including those arising in ongoing business-partnership relationships. The case became the leading authority interpreting section 16600 to reject noncompetition covenants arising from partnership relationships, reinforcing that California's anti-noncompete policy extends beyond employment agreements to restrictive covenants among business owners, partners, and joint venturers.`,
      },
      {
        court: 'California Courts of Appeal',
        caseName: 'United Health Centers v. Superior Court (Vradenburg-Haworth)',
        citation: '229 Cal.App.4th 63 (2014)',
        description: `Prevailed in a landmark arbitration case reinforcing the finality of arbitration awards and limiting post-award challenges based on arbitrator-disclosure issues that could have been raised earlier. The decision holds that parties may forfeit post-award challenges based on alleged arbitrator-disclosure defects when they fail to timely investigate and raise those objections during the arbitration process.`,
      },
      {
        court: 'California Courts of Appeal',
        caseName: 'Pinheiro v. Civil Service Commission for the County of Fresno',
        citation: '245 Cal.App.4th 1458 (2016)',
        description: `Successfully argued a published decision reinforcing due-process protections in administrative proceedings, holding that disciplinary decisions must rest solely on the evidentiary record and that a civil service commission may not rely on evidence outside the record when upholding employee discipline.`,
      },
      {
        court: 'California Courts of Appeal',
        caseName: 'Urias v. Harris Farms, Inc.',
        citation: '234 Cal.App.3d 415 (1991)',
        description: `Represented a major agricultural employer in a precedent-setting matter that clarified judicial-disqualification procedures and became a frequently cited authority interpreting Code of Civil Procedure section 170.3, helping define the procedural rules governing recusal challenges and the validity of rulings issued by disqualified judges.`,
      },
      {
        court: 'California Courts of Appeal',
        caseName: `QC Construction Products, LLC v. Cohill's Building Specialties, Inc.`,
        citation: '423 F. Supp. 2d 1008 (D. Ariz. 2006)',
        description: `Represented a national construction-products manufacturer in significant federal litigation involving exclusive distributorship rights, complex contract interpretation, and commercial business-tort claims arising from a multi-state distribution relationship in the construction-products industry.`,
      },
      {
        court: 'Tenth Circuit Court of Appeals',
        caseName: 'United States ex rel. Trujillo v. Group 4 Falck',
        citation: `244 F. App'x 853 (10th Cir. 2007)`,
        description: `Successfully defended Group 4 Falck (Wackenhut Corporation) before the U.S. Court of Appeals for the Tenth Circuit, securing affirmance of a complete defense judgment involving RICO, whistleblower, and employment-discrimination claims in complex multi-plaintiff litigation.`,
      },
    ],
  },
]
