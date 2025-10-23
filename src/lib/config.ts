export const siteConfig = {
  title: 'norm-has-a-blog',
  description: 'A minimal, responsive, and feature-rich blog theme',
  author: 'Priyanshu Tiwari',
  url: 'https://ahampriyanshu.com',
  lang: 'en',
  timezone: 'Asia/Kolkata',
  theme: {
    mode: 'dual', // 'light', 'dark', or 'dual'
  },

  analytics: {
    google: {
      id: ''
    }
  },

  paginate: 10,
};

export type SiteConfig = typeof siteConfig;

