import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
    return [{
        url: 'https://ryanlegalpc.com',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 1,
        images: [
            'https://ryanlegalpc.com/logo-white.webp',
            'https://ryanlegalpc.com/full-logo-white.webp',
            'https://ryanlegalpc.com/upper-falls.webp',
            'https://ryanlegalpc.com/full-logo.webp',
            'https://ryanlegalpc.com/attorney-writing.webp',
        ]
    }, {
        url: 'https://ryanlegalpc.com/about',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.9,
        images: [
            'https://ryanlegalpc.com/logo-white.webp',
            'https://ryanlegalpc.com/full-logo-white.webp',
            'https://ryanlegalpc.com/pen-on-notebook.webp',
            'https://ryanlegalpc.com/square-profile.webp',
            'https://ryanlegalpc.com/super-lawyers-badge.png',
            'https://ryanlegalpc.com/av-preeminent.png',
        ],
    }, {
        url: 'https://ryanlegalpc.com/contact-us',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.4,
        images: [
            'https://ryanlegalpc.com/logo-white.webp',
            'https://ryanlegalpc.com/full-logo-white.webp',
            'https://ryanlegalpc.com/writing-on-paper.webp'
        ],
    }, {
        url: 'https://ryanlegalpc.com/expertise',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.9,
        images: [
            'https://ryanlegalpc.com/logo-white.webp',
            'https://ryanlegalpc.com/full-logo-white.webp',
            'https://ryanlegalpc.com/practice.webp',
        ],
    }, {
        url: 'https://ryanlegalpc.com/payment',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.2,
        images: [
            'https://ryanlegalpc.com/logo-white.webp',
            'https://ryanlegalpc.com/full-logo-white.webp',
        ],
    }]
}