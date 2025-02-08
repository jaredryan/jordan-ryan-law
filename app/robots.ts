import type { MetadataRoute } from 'next'

const url = process.env.CURRENT_URL || ''
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/about',
        '/expertise',
        '/contact-us',
        '/payment',
      ],
      disallow: [
        '/?*',
        '/contact-us?*',
        '/about?expanded=false',
        '/about?expanded=false&topic=*',
        '/about?topic=*&expanded=false',
      ],
    },
    sitemap: `${url}/sitemap.xml`,
  }
}
