// Practice-area copy, verbatim from the pre-migration app. Icon is a stable
// key (not a rendered icon) so the redesign phase can pick its own icon set.
//
// `whatThisCovers`, `clientTypes`, and `proof` are new for the Milestone 1
// Expertise rebuild — each is either lifted verbatim from `content` below
// (recomposed as a scannable list, not new facts) or a real figure already
// present in src/data/credentials.ts. Areas without a verifiable standalone
// credential intentionally leave `proof` undefined rather than inventing
// one — the Expertise page renders no proof callout in that case.

export interface PracticeAreaProof {
  label: string
  body: string
  linkLabel: string
  linkHref: string
}

export interface PracticeArea {
  slug: string
  name: string
  icon: string
  /** One-line teaser for compact contexts (e.g. the Home practice grid) —
   * hand-written so it never mid-sentence truncates `content` at "Mr." */
  teaser: string
  content: string
  /** Exact case-name substrings of `content` to italicize per legal-citation
   * convention (e.g. "Church v. Jamison") — only Appeals needs this. */
  citedCases?: string[]
  whatThisCovers: string[]
  clientTypes?: string[]
  /** Heading for the clientTypes list — defaults to "Client Types". Business
   * Litigation uses "Forums" since courts, arbitration panels, and
   * administrative agencies — not client categories — are the more useful
   * left-column fact for that area. */
  clientTypesLabel?: string
  proof?: PracticeAreaProof
}

export const areasOfPractice: PracticeArea[] = [
  {
    slug: 'labor-and-employment',
    name: 'Labor and Employment',
    icon: 'briefcase',
    teaser: 'Advising, policies, and litigation for employers across California.',
    content: `Ryan Legal comprehensively serves the needs of employers in all aspects of employment law, from day-to-day advising, workplace training, corporate compliance and the development of personnel policies and procedures to representation in employment-related disputes and litigation before federal and state courts and administrative agencies such as the California Civil Rights Department, the Equal Employment Opportunity Commission, the Department of Labor, the California Labor Commissioner and the Employment Development Department. Ryan Legal represents many of the largest employers in Central California in cutting edge disputes such as class action litigation, wrongful termination, sexual harassment and other discrimination claims, unfair competition and trade secret litigation. Ryan Legal is also actively involved in the representation of employers in union organizational efforts and elections, negotiations and the prosecution and defense of claims of unfair labor practice matters.`,
    whatThisCovers: [
      'Day-to-day advising, workplace training, and corporate compliance',
      'Personnel policies, procedures, and employment agreements',
      'Employment disputes and litigation before federal and state courts and agencies',
      'Class actions, wrongful termination, harassment, and discrimination defense',
      'Union organizing, elections, negotiations, and unfair labor practice matters',
    ],
    clientTypes: ['Many of the largest employers in Central California'],
    proof: {
      label: 'Training delivered',
      body: 'More than 150,000 participants trained on employment law topics, in English and Spanish, over three decades.',
      linkLabel: 'See the training record',
      linkHref: '/about#training',
    },
  },
  {
    slug: 'health-care',
    name: 'Health Care',
    icon: 'hand-holding-medical',
    teaser: 'Compliance, HIPAA, and provider matters for health care organizations.',
    content: `Ryan Legal represents federal qualified health centers, rural health clinics, skilled nursing facilities as well as private practice health care providers with regard to corporate compliance, peer review proceedings, operational and organizational issues, fraud and abuse, HIPAA compliance, litigation, mediation and arbitration, and provider reimbursement and payment.`,
    whatThisCovers: [
      'Corporate compliance and peer review proceedings',
      'Operational and organizational issues, including fraud and abuse and HIPAA compliance',
      'Litigation, mediation, and arbitration',
      'Provider reimbursement and payment matters',
    ],
    clientTypes: ['Federally qualified health centers', 'Rural health clinics', 'Skilled nursing facilities', 'Private practice health care providers'],
    proof: {
      label: 'Compliance training delivered',
      body: 'More than 100 training sessions for employees, physicians, and boards across dozens of California clinics, covering HIPAA, compliance, and workplace conduct.',
      linkLabel: 'See the training record',
      linkHref: '/about#training',
    },
  },
  {
    slug: 'business-litigation',
    name: 'Business Litigation',
    icon: 'scale-balanced',
    teaser: 'Contract, trade secret, and construction disputes before trial courts.',
    content: `Ryan Legal represents clients in complex business litigation (including contract litigation, trade secret, confidentiality and unfair competition disputes, real estate disputes and construction litigation). The firm represents clients before all state and federal trial courts, as well as governmental and administrative entities.`,
    whatThisCovers: [
      'Contract litigation and trade secret, confidentiality, and unfair competition disputes',
      'Real estate disputes and construction litigation',
      'Representation before all state and federal trial courts and administrative entities',
    ],
    clientTypesLabel: 'Forums',
    clientTypes: ['State superior courts', 'Federal district courts', 'Arbitration panels', 'Administrative agencies'],
    proof: {
      label: 'Trial record',
      body: 'More than 150 major hearings, arbitrations, and jury trials to conclusion, prevailing in at least 90% of those cases.',
      linkLabel: 'See the litigation record',
      linkHref: '/about#litigation-record',
    },
  },
  {
    slug: 'business-transactions-and-finance',
    name: 'Business Transactions and Finance',
    icon: 'file-invoice-dollar',
    teaser: 'Outside general counsel for formation, financing, and mergers.',
    content: `In his role as outside general counsel for many of his clients, Mr. Ryan has provided representation all aspects of formation, organization, financing and merging of both for-profit and non-profit entities. This includes borrower representation in secured and unsecured financial transactions, including loan commitments and credit line renewals from $1 million to more than $200 million, and assistance with the merging of health care entities and complex structuring such as those involving new market tax credits. Having taught commercial and secured transactions as an adjunct professor at a local law school for eight years has given Mr. Ryan unique insights into such transactions.`,
    whatThisCovers: [
      'Formation, organization, financing, and merging of for-profit and non-profit entities',
      'Borrower representation in secured and unsecured financing, from $1 million to more than $200 million',
      'Mergers of health care entities and complex structuring, including new market tax credits',
    ],
    clientTypes: ['For-profit entities', 'Non-profit entities', 'Health care entities'],
    proof: {
      label: 'Teaching credential',
      body: 'Adjunct professor of commercial and secured transactions law for eight years at San Joaquin College of Law.',
      linkLabel: 'See prior positions',
      linkHref: '/about#positions',
    },
  },
  {
    slug: 'technology',
    name: 'Technology',
    icon: 'laptop',
    teaser: 'Trade secret, confidentiality, and software agreement counsel.',
    content: `Ryan Legal advises on and litigates IT matters, including claims of unfair competition, trade secret misappropriation and interference with business relationships. The firm also advises tech companies in the areas of confidentiality and nondisclosure agreements, complex compensation arrangements, software agreements, trademark licensing and related issues.`,
    whatThisCovers: [
      'Unfair competition, trade secret misappropriation, and interference with business relationships',
      'Confidentiality and nondisclosure agreements',
      'Complex compensation arrangements and software agreements',
      'Trademark licensing and related issues',
    ],
  },
  {
    slug: 'appellate-litigation',
    name: 'Appeals',
    icon: 'gavel',
    teaser: 'Nine reported decisions before California and federal appellate courts.',
    content: `Russ has successfully briefed and argued precedent-setting matters before the California Supreme Court, the California appellate courts, and the Ninth and Tenth Circuit Courts of Appeal. His published decisions include landmark cases involving zoning and land-use regulation (Hernandez v. City of Hanford), EB-5 investor-visa law (Spencer Enterprises v. INS), employee vacation-pay rights (Church v. Jamison), California's prohibition against noncompete agreements (Kelton v. Stravinski), arbitration law (United Health Centers v. Superior Court), public-employee due process (Pinheiro v. Civil Service Commission), and judicial-disqualification procedures (Urias v. Harris Farms).`,
    citedCases: [
      'Hernandez v. City of Hanford',
      'Spencer Enterprises v. INS',
      'Church v. Jamison',
      'Kelton v. Stravinski',
      'United Health Centers v. Superior Court',
      'Pinheiro v. Civil Service Commission',
      'Urias v. Harris Farms',
    ],
    clientTypesLabel: 'Areas of Precedent',
    clientTypes: ['Zoning and land use', 'Immigration law', 'Noncompete law', 'Arbitration law'],
    whatThisCovers: [
      'California Supreme Court',
      'California Courts of Appeal',
      'Ninth Circuit Court of Appeals',
      'Tenth Circuit Court of Appeals',
    ],
    proof: {
      label: 'Reported decisions',
      body: 'Nine reported appellate decisions, including Church v. Jamison, which changed how California employers accrue vacation pay.',
      linkLabel: 'See reported decisions',
      linkHref: '/about#litigation-record',
    },
  },
]
