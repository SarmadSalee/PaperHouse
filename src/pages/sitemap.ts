import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://paper-house.vercel.app',
            lastModified: new Date(),
        },
    ]
}