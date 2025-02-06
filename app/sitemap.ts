import type { MetadataRoute } from 'next'
import { transformTextToUrlParams } from '@/app/lib/utils'
import { aboutTopics, areasOfPractice } from '@/app/content'

const aboutMetadata: MetadataRoute.Sitemap = {
    // @ts-ignore
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
        'https://ryanlegalpc.com/av-preeminent.png'
    ]
}

const expertiseMetadata: MetadataRoute.Sitemap = {
    // @ts-ignore
    url: 'https://ryanlegalpc.com/expertise',
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.9,
    images: [
        'https://ryanlegalpc.com/logo-white.webp',
        'https://ryanlegalpc.com/full-logo-white.webp',
        'https://ryanlegalpc.com/practice.webp'
    ]
}

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
            'https://ryanlegalpc.com/attorney-writing.webp'
        ]
    }, 
    // @ts-ignore
    aboutMetadata,
    // @ts-ignore
    ...aboutTopics.map(topic => ({
        ...aboutMetadata,
        url: `https://ryanlegalpc.com/about?expanded=true&amp;topic=${transformTextToUrlParams(topic)}`
    })), 
    // @ts-ignore
    {
        url: 'https://ryanlegalpc.com/contact-us',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.4,
        images: [
            'https://ryanlegalpc.com/logo-white.webp',
            'https://ryanlegalpc.com/full-logo-white.webp',
            'https://ryanlegalpc.com/writing-on-paper.webp'
        ]
    },
    // @ts-ignore
    expertiseMetadata,
    // @ts-ignore
    ...areasOfPractice.map(section => ({
        ...expertiseMetadata,
        url: `https://ryanlegalpc.com/expertise?topic=${transformTextToUrlParams(section.name)}`
    })), 
    // @ts-ignore
    {
        url: 'https://ryanlegalpc.com/payment',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.2,
        images: [
            'https://ryanlegalpc.com/logo-white.webp',
            'https://ryanlegalpc.com/full-logo-white.webp'
        ]
    }]
}
