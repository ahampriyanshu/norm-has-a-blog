const aboutUrl = 'https://ahampriyanshu.com';

export const siteConfig = {
  title: 'norm-has-a-blog',
  description: 'A minimal, responsive, and feature-rich blog theme',
  author: 'Priyanshu Tiwari',
  designation: 'Senior Software Engineer',
  url: 'https://ahampriyanshu.com',
  aboutUrl,
  githubUsername: 'ahampriyanshu',
  githubRepo: 'norm-has-a-blog',
  lang: 'en',
  timezone: 'Asia/Kolkata',
  theme: 'dark',
  analytics: {
    google: {
      id: ''
    }
  },
  paginate: 10,
  contact: {
    email: 'mailto:contact@example.com',
    telegram: 'https://t.me/yourusername',
    github: 'https://github.com/ahampriyanshu',
    linkedin: 'https://linkedin.com/in/yourprofile'
  },
  navItems: [
    { name: 'Home', url: '/' },
    { name: 'About', url: aboutUrl },
    { name: 'Tags', url: '/tags' },
    { name: 'Archives', url: '/archives' }
  ],
  footerLinks: {
    projects: [
      { name: 'Indian Elections EDA', url: 'https://www.kaggle.com/datasets/ahampriyanshu/lok-sabha' },
      { name: 'iGnez', url: 'https://ahampriyanshu.com/ignez/' },
      { name: 'Algo 101', url: 'https://github.com/ahampriyanshu/algo-ds-101/' },
      { name: 'View All Projects', url: 'https://github.com/ahampriyanshu' }
    ],
    blogs: [
      { name: 'Tech Blog', url: 'https://github.com/ahampriyanshu' },
      { name: 'Life & Philosophy', url: 'https://github.com/ahampriyanshu' },
      { name: 'Tutorials', url: 'https://github.com/ahampriyanshu' },
      { name: 'All Posts', url: 'https://github.com/ahampriyanshu' }
    ],
    personal: [
      { name: 'Spotify Playlists', url: 'https://open.spotify.com/user/yourprofile' },
      { name: 'YouTube Channel', url: 'https://youtube.com/@yourchannel' },
      { name: 'Goodreads Library', url: 'https://goodreads.com/yourprofile' },
      { name: 'Photography', url: 'https://ahampriyanshu.com' }
    ]
  }
};

export type SiteConfig = typeof siteConfig;
