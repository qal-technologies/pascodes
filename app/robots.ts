import { MetadataRoute } from 'next';

const origin = process.env.SITE_URL || 'https://poshcodes.website';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/',
    },
    sitemap: `${origin}/sitemap.xml`,
    host: origin,
    
  };
}
