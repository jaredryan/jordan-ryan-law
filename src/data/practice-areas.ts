// Practice-area copy, verbatim from the pre-migration app. Icon is a stable
// key (not a rendered icon) so the redesign phase can pick its own icon set.

export interface PracticeArea {
  slug: string
  name: string
  icon: string
  content: string
}

export const areasOfPractice: PracticeArea[] = [
  {
    slug: 'labor-and-employment',
    name: 'Labor and Employment',
    icon: 'briefcase',
    content: `Ryan Legal comprehensively serves the needs of employers in all aspects of employment law, from day-to-day advising, workplace training, corporate compliance and the development of personnel policies and procedures to representation in employment-related disputes and litigation before federal and state courts and administrative agencies such as the California Civil Rights Department, the Equal Employment Opportunity Commission, the Department of Labor, the California Labor Commissioner and the Employment Development Department. Ryan Legal represents many of the largest employers in Central California in cutting edge disputes such as class action litigation, wrongful termination, sexual harassment and other discrimination claims, unfair competition and trade secret litigation. Ryan Legal is also actively involved in the representation of employers in union organizational efforts and elections, negotiations and the prosecution and defense of claims of unfair labor practice matters.`,
  },
  {
    slug: 'business-transactions-and-finance',
    name: 'Business Transactions and Finance',
    icon: 'file-invoice-dollar',
    content: `In his role as outside general counsel for many of his clients, Mr. Ryan has provided representation all aspects of formation, organization, financing and merging of both for-profit and non-profit entities. This includes borrower representation in secured and unsecured financial transactions, including loan commitments and credit line renewals from $1 million to more than $200 million, and assistance with the merging of health care entities and complex structuring such as those involving new market tax credits. Having taught commercial and secured transactions as an adjunct professor at a local law school for eight years has given Mr. Ryan unique insights into such transactions.`,
  },
  {
    slug: 'health-care',
    name: 'Health Care',
    icon: 'hand-holding-medical',
    content: `Ryan Legal represents federal qualified health centers, rural health clinics, skilled nursing facilities as well as private practice health care providers with regard to corporate compliance, peer review proceedings, operational and organizational issues, fraud and abuse, HIPAA compliance, litigation, mediation and arbitration, and provider reimbursement and payment.`,
  },
  {
    slug: 'technology',
    name: 'Technology',
    icon: 'laptop',
    content: `Ryan Legal advises on and litigates IT matters, including claims of unfair competition, trade secret misappropriation and interference with business relationships. The firm also advises tech companies in the areas of confidentiality and nondisclosure agreements, complex compensation arrangements, software agreements, trademark licensing and related issues.`,
  },
  {
    slug: 'business-litigation',
    name: 'Business Litigation',
    icon: 'scale-balanced',
    content: `Ryan Legal represents clients in complex business litigation (including contract litigation, trade secret, confidentiality and unfair competition disputes, real estate disputes and construction litigation). The firm represents clients before all state and federal trial courts, as well as governmental and administrative entities.`,
  },
  {
    slug: 'appellate-litigation',
    name: 'Appellate Litigation',
    icon: 'gavel',
    content: `Ryan Legal successfully represents clients in appellate matters in the California Courts of Appeal, the California Supreme Court, the Ninth and Tenth Circuit Courts of Appeal and the United States Supreme Court. Mr. Ryan has nine reported appellate decisions to his credit, including: (1) the case that changed the way all California employers are now required to accrue vacation pay for employees in light of technological advances (Church v. Jamison, 143 Cal.App.4th 1568 (2006)); and (2) the first case to hold that California laws prohibiting anti-competitive restraints such as Business and Professions Code Section 16600 applies to partnerships.`,
  },
]
