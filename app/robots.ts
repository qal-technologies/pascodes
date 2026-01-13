import { MetadataRoute } from 'next';

const origin = process.env.SITE_URL || 'https://pascodes.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/',
    },
    sitemap: `${origin}/sitemap.xml`,
  };
}
