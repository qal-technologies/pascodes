import { MetadataRoute } from 'next';

const origin = process.env.SITE_URL || 'https://pascodez.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: origin,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
      
    },
    {
      url: `${origin}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${origin}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${origin}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${origin}/courses`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${origin}/build`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}
