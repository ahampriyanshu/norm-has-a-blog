export const siteConfig = {
  title: 'norm-has-a-blog',
  description: 'A minimal, responsive, and feature-rich blog theme',
  author: 'Priyanshu Tiwari',
  designation: 'Senior Software Engineer',
  url: 'https://ahampriyanshu.com',
  aboutUrl: 'https://ahampriyanshu.com',
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
  footerLinks: {
    projects: [
      { name: 'Project One', url: '/projects/one' },
      { name: 'Project Two', url: '/projects/two' },
      { name: 'Project Three', url: '/projects/three' },
      { name: 'View All Projects', url: '/projects' }
    ],
    blogs: [
      { name: 'Tech Blog', url: '/blog/tech' },
      { name: 'Life & Philosophy', url: '/blog/life' },
      { name: 'Tutorials', url: '/blog/tutorials' },
      { name: 'All Posts', url: '/archives' }
    ],
    personal: [
      { name: 'Spotify Playlists', url: 'https://open.spotify.com/user/yourprofile' },
      { name: 'YouTube Channel', url: 'https://youtube.com/@yourchannel' },
      { name: 'Goodreads Library', url: 'https://goodreads.com/yourprofile' },
      { name: 'Photography', url: '/gallery' }
    ]
  }
};

export type SiteConfig = typeof siteConfig;
