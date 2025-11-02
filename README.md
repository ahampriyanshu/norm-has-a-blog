# Norm has a blog

A modern, fast, and feature-rich blog built with SvelteKit.

[![CI](https://img.shields.io/github/actions/workflow/status/ahampriyanshu/norm-has-a-blog/ci.yml?logo=github)][ci]&nbsp;
[![GitHub license](https://img.shields.io/github/license/ahampriyanshu/norm-has-a-blog?color=goldenrod)][license]&nbsp;
[![Website status](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://ahampriyanshu.com/norm-has-a-blog)
[![Release](https://img.shields.io/github/v/release/ahampriyanshu/norm-has-a-blog?logo=github)][release]&nbsp;

## Features

- ✍️ **Markdown Support** - Write posts in Markdown with full mdsvex integration
- 🎨 **Dark/Light Theme** - Automatic theme switching with user preference
- 📱 **Responsive Design** - Beautiful on all devices
- 🏷️ **Tags** - Organize your content efficiently
- 📅 **Archives** - Browse posts by date
- 🔍 **Search** - Find what you're looking for quickly
- ⚡ **Static Site Generation** - Lightning-fast page loads
- 🎯 **SEO Optimized** - Built-in SEO best practices
- 📊 **Table of Contents** - Automatic TOC generation for posts
- 🚀 **Zero Config** - Works out of the box

## Getting Started

### Prerequisites

- Node.js 22
- npm

### Installation

1. Clone this repository

2. Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

Build the static site:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Writing Posts

### Creating a New Post

1. Create a new `.md` file in the `src/posts` directory
2. Add frontmatter with metadata
3. Write your content in Markdown


## Configuration

Edit `src/lib/config.ts` to customize your blog:

```typescript
export const siteConfig = {
  title: 'Your Blog Title',
  description: 'Your blog description',
  author: 'Your Name',
  url: 'https://yourdomain.com',
  lang: 'en',
  
  social: {
    github: 'yourusername',
    twitter: 'yourusername',
    email: 'your@email.com',
    rss: true
  },
  
  theme: {
    mode: 'dual', // 'light', 'dark', or 'dual'
  },
  
  paginate: 10,
};
```

## Deployment

This blog can be deployed to any static hosting service:

### Vercel

```bash
npm i -g vercel
vercel
```

### Netlify

1. Connect your repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `build`

### GitHub Pages

1. Install the GitHub Pages adapter:
```bash
npm i -D @sveltejs/adapter-static
```

2. Push your code to GitHub

3. Enable GitHub Pages in repository settings

### Cloudflare Pages

1. Connect your repository
2. Build command: `npm run build`
3. Build output directory: `build`

## Project Structure

```
sveltekit-blog/
├── src/
│   ├── lib/
│   │   ├── components/     # Svelte components
│   │   ├── layouts/        # mdsvex layouts
│   │   ├── styles/         # SCSS styles
│   │   ├── utils/          # Utility functions
│   │   └── config.ts       # Site configuration
│   ├── posts/              # Your blog posts (.md files)
│   ├── routes/             # SvelteKit routes
│   │   ├── +layout.svelte  # Main layout
│   │   ├── +page.svelte    # Home page
│   │   ├── posts/          # Post pages
│   │   ├── tags/           # Tags pages
│   │   ├── archives/       # Archives page
│   │   └── api/            # API endpoints
│   ├── app.html            # HTML template
│   └── app.d.ts            # TypeScript declarations
├── static/                 # Static assets
├── svelte.config.js        # Svelte configuration
├── vite.config.ts          # Vite configuration
├── package.json            # Dependencies
└── README.md              # This file
```

## Customization

### Styling

The theme uses SCSS for styling. Main styles are in `src/lib/styles/louie.scss`.

CSS variables control the theme colors:
- Light theme: defined in `:root`
- Dark theme: defined in `:root[data-mode='dark']`

### Adding Custom Components

Create Svelte components in `src/lib/components/` and import them where needed.

### Modifying Layouts

- Main layout: `src/routes/+layout.svelte`
- Post layout: `src/routes/posts/[slug]/+page.svelte`
- Markdown layouts: `src/lib/layouts/`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- Built with [SvelteKit](https://kit.svelte.dev/)
- Markdown processing by [mdsvex](https://mdsvex.pngwn.io/)
- Math rendering by [MathJax](https://www.mathjax.org/)
- Code highlighting by [Shiki](https://shiki.gitbook.io/)
- Deployed on [GitHub Pages](https://pages.github.com/)

