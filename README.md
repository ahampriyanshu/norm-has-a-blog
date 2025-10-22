# norm-has-a-blog

A modern, fast, and feature-rich blog built with SvelteKit. Write your blog posts in Markdown and enjoy automatic static site generation.

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

- Node.js 18 or higher
- npm, pnpm, or yarn

### Installation

1. Clone this repository or download the `sveltekit-blog` folder

2. Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

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

### Post Frontmatter

```markdown
---
title: Your Post Title
description: A brief description of your post
date: '2024-01-15'
updated: '2024-01-16'  # Optional
author: Your Name        # Optional
tags:
  - tag1
  - tag2
  - tag3
pin: false               # Pin to top of home page
image: /path/to/image.jpg # Optional featured image
---

Your content here...
```

### Supported Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ✅ | Post title |
| `description` | string | ✅ | Short description/excerpt |
| `date` | string | ✅ | Publication date (YYYY-MM-DD) |
| `updated` | string | ❌ | Last updated date |
| `author` | string | ❌ | Post author |
| `tags` | array | ❌ | Post tags |
| `pin` | boolean | ❌ | Pin post to homepage |
| `image` | string | ❌ | Featured image URL |
| `math` | boolean | ❌ | Enable math rendering |
| `mermaid` | boolean | ❌ | Enable Mermaid diagrams |

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

## Features Roadmap

- [ ] Full-text search
- [ ] RSS feed generation
- [ ] Comment system integration
- [ ] Analytics integration
- [ ] Social share buttons
- [ ] Related posts
- [ ] Reading progress indicator
- [ ] Math equation support (KaTeX)
- [ ] Mermaid diagrams support

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- Built with [SvelteKit](https://kit.svelte.dev/)
- Markdown processing by [mdsvex](https://mdsvex.pngwn.io/)

---

Made with ❤️ using SvelteKit

