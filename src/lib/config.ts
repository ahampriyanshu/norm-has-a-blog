export const siteConfig = {
  title: 'norm-has-a-blog',
  description: 'A minimal, responsive, and feature-rich blog theme',
  author: 'Priyanshu Tiwari',
  designation: 'Senior Software Engineer',
  baseURL: 'https://ahampriyanshu.com',
  subPath: '/norm-has-a-blog',
  githubUsername: 'ahampriyanshu',
  githubRepo: 'norm-has-a-blog',
  lang: 'en',
  timezone: 'Asia/Kolkata',
  theme: 'dark',
  analytics: {
    google: {
      id: 'G-VSNH6EH1RX'
    }
  },
  paginate: 10,
  contact: {
    email: 'mailto:vayampriyanshu@gmail.com',
    telegram: 'https://t.me/ahampriyanshu',
    github: 'https://github.com/ahampriyanshu',
    linkedin: 'https://linkedin.com/in/ahampriyanshu'
  },
  navItems: [
    { name: 'Home', url: '/' },
    { name: 'Tags', url: '/tags' },
    { name: 'Archives', url: '/archives' },
    { name: 'About', url: 'https://portfolio.ahampriyanshu.com' },
  ],
  footerLinks: {
    projects: [
      { name: 'Indian Elections EDA', url: 'https://www.kaggle.com/datasets/ahampriyanshu/lok-sabha' },
      { name: 'iGnez', url: 'https://ahampriyanshu.com/ignez/' },
      { name: 'Algo 101', url: 'https://github.com/ahampriyanshu/algo-ds-101/' },
      { name: 'View All Projects', url: 'https://github.com/ahampriyanshu' }
    ],
    blogs: [
      { name: 'Stocks', url: 'https://github.com/ahampriyanshu' },
      { name: 'Mutual Funds', url: 'https://github.com/ahampriyanshu' },
      { name: 'Insurance', url: 'https://github.com/ahampriyanshu' },
      { name: 'All Posts', url: 'https://github.com/ahampriyanshu' }
    ],
    personal: [
      { name: 'Playlist 1', url: 'https://open.spotify.com/user/yourprofile' },
      { name: 'Playlist 2', url: 'https://youtube.com/@yourchannel' },
      { name: 'Goodreads Library', url: 'https://goodreads.com/yourprofile' },
      { name: 'SuperTrip', url: 'https://ahampriyanshu.com' }
    ]
  }
};

export type SiteConfig = typeof siteConfig;

export function getSiteUrl(): string {
  return siteConfig.baseURL + siteConfig.subPath;
}
