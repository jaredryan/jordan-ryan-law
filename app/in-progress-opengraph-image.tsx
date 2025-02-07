import { ImageResponse } from 'next/og'
import { join } from 'node:path'
import { readFile } from 'node:fs/promises'

// Image metadata
export const contentType = 'image/png'
export const alt = 'Ryan Legal, PC: Legal Representation for Employers, Health Care Providers and Non-Profits throughout California'
export const size = {
  width: 1200,
  height: 630,
}

const pageContainer = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  alignItems: 'stretch',
}

const contentContainer = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#1E275E',
  width: '100%',
  flex: '1',
}

const topSection = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  backgroundColor: 'white',
  width: '100%',
  padding: '16px',
}

const leftColumn = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '300px',
  height: '100%',
  padding: '16px',
}

const rightColumn = {
  display: 'flex',
  flex: '1',
  flexDirection: 'column',
  height: '100%',
  gap: '16px',
  padding: '16px',
}

const shortLogoContainer = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100px',
  height: '100px',
}

const shortLogoImage = {
  width: '100%',
  height: '100%',
}

const profileContainer = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: '16px',
}

const profileImageContainer = {
  width: '150px',
  height: '150px',
  borderRadius: '50%',
}

const profileImage = {
  width: '150px',
  height: '150px',
  borderRadius: '50%',
}

const profileName = {
  fontSize: '24px',
  color: 'white',
  textAlign: 'center',
}

const title = {
  width: '100%',
  fontSize: '24px',
  color: 'white',
}

const largeDescription = {
  width: '100%',
  fontSize: '36px',
  color: 'white',
  fontWeight: '600',
}

const link = {
  width: '100%',
  fontSize: '24px',
  textDecoration: 'underline',
  color: '#FDB613'
}

// Image generation
export default async function Image() {
  const toBase64 = (buffer: Buffer) => `data:image/png;base64,${buffer.toString('base64')}`

  const squareLogoData = await readFile(join(process.cwd(), 'public', 'web-app-manifest-512x512.png'))
  const squareLogo = toBase64(squareLogoData)

  const squareProfileData = await readFile(join(process.cwd(), 'public', 'square-profile.png'))
  const squareProfile = toBase64(squareProfileData)

  // I'm able to render both images under certain circumstances. There's definitely some issue happening with the JSX, not with the images

  return new ImageResponse(
    (
      <div style={pageContainer}>
        <div style={topSection}>
          <div style={shortLogoContainer}>
            <img
              style={shortLogoImage}
              src={squareLogo}
              alt="Ryan Legal, PC Logo"
            />
          </div>
        </div>
        <div style={contentContainer}>
            <div style={profileContainer}>
              <img
                style={profileImage}
                src={squareProfile}
                alt="Russell K. Ryan"
              />
              <h2 style={profileName}>
                Russ Ryan
              </h2>
            </div>
          <div style={rightColumn}>
            <h2 style={title}>
              Ryan Legal, PC
            </h2>
            <h1 style={largeDescription}>
              Legal Representation for Employers, Health Care Providers and Non-Profits throughout California
            </h1>
            <h3 style={link}>
              ryanlegalpc.com
            </h3>
          </div>
        </div>
      </div>
    ),
    size
  )
 
  return new ImageResponse(
    (
      <div style={pageContainer}>
        <div style={topSection}>
          <div style={shortLogoContainer}>
            <img
              style={shortLogoImage}
              src={squareLogo}
              alt="Ryan Legal, PC Logo"
            />
          </div>
        </div>
        <div style={contentContainer}>
          <div style={leftColumn}>
            <div style={profileContainer}>
              <div style={profileImageContainer}>
                <img
                  style={profileImage}
                  src={squareProfile}
                  alt="Russell K. Ryan"
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
            <h3 style={link}>
              ryanlegalpc.com
            </h3>
          </div>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    }
  )
}