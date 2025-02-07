import Image from 'next/image'
import squareProfile from '@/public/square-profile.webp'
import fullLogo from '@/public/full-logo.webp'

const pageContainer = {
  margin: '42px',
  display: 'flex',
  flexDirection: 'column',
  minWidth: '614px',
  maxWidth: '614px',
  minHeight: '307px',
  maxHeight: '307px',
  alignItems: 'stretch',
  flex: 1,
  boxShadow: '0 0 10px 10px black',
  backgroundColor: 'black',
  padding: '25px',
}

const contentContainer = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'stretch',
  backgroundColor: '#1E275E',
  padding: '21px',
  gap: '21px',
  width: '100%',
  height: '100%',
  flex: '1',
  paddingLeft: '27px',
  paddingTop: '32px',
  paddingBottom: '15px',
}

const topSection = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  backgroundColor: 'white',
  width: '100%',
  height: '100%',
  padding: '7px',
  paddingLeft: '33px',
}

const bottomSection = {
  ...topSection,
  backgroundColor: '#1E275E',
  paddingLeft: '42px',
  paddingBottom: '32px',
}

const leftColumn = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  padding: '7px',
}

const rightColumn = {
  display: 'flex',
  flex: '1',
  flexDirection: 'column',
  height: '100%',
  gap: '7px',
  padding: '7px',
}

const shortLogoContainer = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '42px',
}

const shortLogoImage = {
  objectFit: 'cover',
  objectPosition: 'left',
  width: '100%',
  height: '100%',
}

const profileContainer = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: '3px',
}

const profileImageContainer = {
  width: '84px',
  height: '84px',
  borderRadius: '50%',
}

const profileImage = {
  width: '100%',
  height: '100%',
  borderRadius: '50%',
}

const profileName = {
  width: '100%',
  fontSize: '15px',
  color: 'white',
  textAlign: 'center',
}

const title = {
  width: '100%',
  fontSize: '15px',
  color: 'white',
}

const largeDescription = {
  width: '100%',
  fontSize: '16px',
  color: 'white',
  fontWeight: '600',
}

const link = {
  width: '100%',
  fontSize: '15px',
  textDecoration: 'underline',
  color: '#FDB613'
}

const button = {
  width: 'max-content',
  padding: '5px 10px',
  fontSize: '15px',
  backgroundColor: 'var(--accent-color)',
  color: 'var(--primary-color)',
  marginTop: '3px',
}

export default function Page() {
  return (
    <div style={pageContainer}>
      <div style={topSection}>
        <div style={shortLogoContainer}>
          <Image
            style={shortLogoImage}
            src={fullLogo}
            alt="Ryan Legal, PC Logo"
            loading="eager"
            priority={true}
            placeholder="blur"
          />
        </div>
      </div>
      <div style={contentContainer}>
        <div style={leftColumn}>
          <div style={profileContainer}>
            <div style={profileImageContainer}>
              <Image
                style={profileImage}
                src={squareProfile}
                alt="Russell K. Ryan"
                loading="eager"
                priority={true}
                placeholder="blur"
              />
            </div>
            <h2 style={profileName}>
              Russ Ryan
            </h2>
          </div>
        </div>
        <div style={rightColumn}>
          <h2 style={title}>
            Ryan Legal, PC
          </h2>
          <h1 style={largeDescription}>
            Legal Representation for Employers, Health Care Providers and Non-Profits throughout California
          </h1>
          <button style={button}>
            See More
          </button>
        </div>
      </div>
      <div style={bottomSection}>
        <h3 style={link}>
          ryanlegalpc.com
        </h3>
      </div>
    </div>
  )
}
