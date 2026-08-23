export const SITE_CONFIG = {
  // Personal & Contact Info
  name: 'PoshCodes',
  whatsappNumber: '2349016561308',
  email: 'poshcodes.dev@gmail.com',
  location: 'Calabar, Nigeria. Remote Worldwide.',
  socials: {
    github: 'https://github.com/poshcodes',
    linkedin: 'https://www.linkedin.com/in/paschal-ngaoka-693859280',
    youtube: 'https://youtube.com/@poshcodes',
    twitter: 'https://twitter.com/PoshCodes',
    whatsapp: 'https://wa.me/2349016561308',
    instagram: 'https://instagram.com/poshcodes.dev',
    email: 'mailto:poshcodes.dev@gmail.com',
    facebook: 'https://facebook.com/poshcodes.dev',
    stackoverflow: 'https://stackoverflow.com/users/poshcodes',
    reddit: 'https://reddit.com/user/poshcodes',
  },

  // Pricing Constants
  pricing: {
    basePrice: 100,
    pricePerPage: 50,
    currency: 'USD',
  },

  // Email Configuration (For the rotation system later)
  emailServices: [
    { name: 'Service A', active: true },
    { name: 'Service B', active: true },
  ],

  plans:[
    {
      title: 'Basic / Portfolio',
      basePrice: 150,
      description: 'Perfect for personal brands and portfolios.',
      features: ['4+ Pages', 'Responsive Design', 'Contact Form', 'Basic SEO'],
      type: 'portfolio',
      pages: 4,
      cta: 'Get Started',
    },
    {
      title: 'Business / Corporate',
      basePrice: 600,
      description: 'Scalable solutions for growing businesses.',
      features: [
        '8+ Pages',
        'CMS Integration',
        'Analytics',
        'Priority Support',
        'Email Setup',
      ],
      type: 'business',
      pages: 8,
      color: 'rgba(255, 100, 255)',
      cta: 'Choose Plan',
    },
    {
      title: 'E-Commerce / Web App',
      basePrice: 1200,
      description: 'Full-featured online stores and applications.',
      features: [
        'Unlimited Pages',
        'Payment Gateway',
        'User Auth',
        'Database Integration',
        'Admin Panel',
      ],
      type: 'e-commerce',
      pages: 10,
      color: 'rgba(255, 150, 50)',
      cta: 'Start Building',
    },
  ],
};

export const KEYWORD_PRICES: { [key: string]: number } = {
  // Core Functional
  database: 300,
  auth: 90,
  authentication: 110,
  login: 90,
  payment: 100,
  stripe: 60,
  paypal: 60,
  api: 20,
  dashboard: 200,
  admin: 200,

  // Advanced Tech
  ai: 800,
  'artificial intelligence': 800,
  'machine learning': 1000,
  realtime: 500,
  socket: 400,
  chat: 400,
  video: 300,
  streaming: 600,

  // E-commerce
  product: 100,
  cart: 80,
  checkout: 120,
  inventory: 120,

  // CMS / Blog
  blog: 300,
  cms: 400,
  'content management': 400,

  // Mobile / PWA
  mobile: 500,
  pwa: 400,
  responsive: 100, // Should be standard, but maybe for extra tuning
  app: 600,
};

export const PROJECT_TYPE_MULTIPLIERS: { [key: string]: number } = {
  'e-commerce': 1.5,
  webapp: 1.4,
  business: 1.1,
  portfolio: 1.0,
  'data-modeling': 1.3,
  'project-config': 1.0,
  'website-management': 0.8,
  'tools-integration': 1.2,
};
