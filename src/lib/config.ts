export const siteConfig = {
  title: 'norm-has-a-blog',
  description: 'A minimal, responsive, and feature-rich blog theme',
  author: 'Priyanshu Tiwari',
  designation: 'Senior Software Engineer',
  bio: [
    "I'm a software engineer passionate about building elegant solutions to complex problems. I write about technology, software development, and my journey in tech.",
    'Currently exploring the intersection of machine learning and web development, with a focus on creating performant and accessible applications.',
    "When I'm not coding, you'll find me contributing to open source, writing technical blog posts, or exploring new technologies.",
    "This blog includes my notes on programming, personal finance, and whatever else I'm figuring out."
  ],
  baseURL: 'https://ahampriyanshu.com',
  subPath: '/norm-has-a-blog',
  githubUsername: 'ahampriyanshu',
  githubRepo: 'norm-has-a-blog',
  twitterHandle: 'ahampriyanshu',
  lang: 'en',
  timezone: 'Asia/Kolkata',
  theme: 'dark',
  analytics: {
    ga_id: 'G-VSNH6EH1RX',
    gtag_id: 'GTM-M4FTVQ3'
  },
  paginate: 10,
  contact: {
    github: 'https://github.com/ahampriyanshu',
    linkedin: 'https://linkedin.com/in/ahampriyanshu',
    resume: 'https://resume.ahampriyanshu.com',
    twitter: 'https://twitter.com/ahampriyanshu',
    email: 'mailto:vayampriyanshu@gmail.com'
  },
  navItems: [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: 'Categories', url: '/categories' },
    { name: 'Tags', url: '/tags' },
    { name: 'Archives', url: '/archives' }
  ],
  footerLinks: {
    projects: [
      { name: 'o1on', url: 'https://github.com/ahampriyanshu/o1on' },
      { name: 'Zmail', url: 'https://portfolio.ahampriyanshu.com' },
      { name: 'Algo 101', url: 'https://github.com/ahampriyanshu/algo-ds-101' },
      {
        name: 'Indian Elections Dataset',
        url: 'https://www.kaggle.com/datasets/ahampriyanshu/lok-sabha'
      }
    ],
    blogs: [
      { name: 'Stocks', url: 'https://github.com/ahampriyanshu' },
      { name: 'Insurance', url: 'https://github.com/ahampriyanshu' },
      { name: 'Mutual Funds', url: 'https://github.com/ahampriyanshu' },
      { name: 'System Design', url: 'https://github.com/ahampriyanshu' }
    ],
    personal: [
      { name: 'SuperTrips', url: 'https://supertrips.ahampriyanshu.com' },
      { name: '9AM Playlist', url: 'https://open.spotify.com/user/yourprofile' },
      { name: '9PM Playlist', url: 'https://youtube.com/@yourchannel' },
      { name: 'Bookshelf', url: 'https://goodreads.com/yourprofile' }
    ]
  }
};

export type SiteConfig = typeof siteConfig;

export function getSiteUrl(): string {
  return siteConfig.baseURL + siteConfig.subPath;
}
