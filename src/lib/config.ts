export const siteConfig = {
  title: 'norm-has-a-blog',
  description: 'A minimal, responsive, and feature-rich blog theme',
  author: 'Your Name',
  url: 'https://ahampriyanshu.com',
  lang: 'en',
  timezone: 'America/New_York',

  // Theme settings
  theme: {
    mode: 'dual', // 'light', 'dark', or 'dual'
  },

  // Analytics (optional)
  analytics: {
    google: {
      id: ''
    }
  },

  // Pagination
  paginate: 10,
};

export type SiteConfig = typeof siteConfig;

