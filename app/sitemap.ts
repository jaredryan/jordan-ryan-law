import type { MetadataRoute } from 'next'
import { transformTextToUrlParams } from '@/app/lib/utils'
import { aboutTopics, areasOfPractice } from '@/app/content'

const url = process.env.NEXT_PUBLIC_CURRENT_URL || ''

const aboutMetadata: MetadataRoute.Sitemap = {
    // @ts-ignore
    url: `${url}/about`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.9,
    images: [
        `${url}/logo-white.webp`,
        `${url}/full-logo-white.webp`,
        `${url}/pen-on-notebook.webp`,
        `${url}/square-profile.webp`,
        `${url}/super-lawyers-badge.png`,
        `${url}/av-preeminent.png`
    ]
}

const expertiseMetadata: MetadataRoute.Sitemap = {
    // @ts-ignore
    url: `${url}/expertise`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.9,
    images: [
        `${url}/logo-white.webp`,
        `${url}/full-logo-white.webp`,
        `${url}/practice.webp`
    ]
}

export default function sitemap(): MetadataRoute.Sitemap {
    return [{
        url: `${url}`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 1,
        images: [
            `${url}/logo-white.webp`,
            `${url}/full-logo-white.webp`,
            `${url}/upper-falls.webp`,
            `${url}/full-logo.webp`,
            `${url}/attorney-writing.webp`
        ]
    }, 
    // @ts-ignore
    aboutMetadata,
    // @ts-ignore
    ...aboutTopics.map(topic => ({
        ...aboutMetadata,
        url: `${url}/about?expanded=true&amp;topic=${transformTextToUrlParams(topic)}`
    })), 
    // @ts-ignore
    {
        url: `${url}/contact-us`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.4,
        images: [
            `${url}/logo-white.webp`,
            `${url}/full-logo-white.webp`,
            `${url}/writing-on-paper.webp`
        ]
    },
    // @ts-ignore
    expertiseMetadata,
    // @ts-ignore
    ...areasOfPractice.map(section => ({
        ...expertiseMetadata,
        url: `${url}/expertise?topic=${transformTextToUrlParams(section.name)}`
    })), 
    // @ts-ignore
    {
        url: `${url}/payment`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.2,
        images: [
            `${url}/logo-white.webp`,
            `${url}/full-logo-white.webp`
        ]
    }]
}
