<p align="center"><img height="128" src="https://user-images.githubusercontent.com/54521023/134810563-8e34fea4-4250-4e8b-9ddb-5f163bd68e85.jpg"></p>
<p align="center"><em>RIP Norm ❤️</em></p>

# norm-has-a-blog

[![CI](https://img.shields.io/github/actions/workflow/status/ahampriyanshu/norm-has-a-blog/deploy.yml?logo=github)](https://github.com/ahampriyanshu/norm-has-a-blog/actions/workflows/deploy.yml)&nbsp;
[![GitHub license](https://img.shields.io/github/license/ahampriyanshu/norm-has-a-blog?color=green)](https://github.com/ahampriyanshu/norm-has-a-blog/blob/main/LICENSE)&nbsp;
[![Website status](https://img.shields.io/website-up-down-green-red/http/ahampriyanshu.com/norm-has-a-blog)](https://ahampriyanshu.com/norm-has-a-blog)
[![Node.js](https://img.shields.io/badge/node-%3E%3D22-brightgreen?logo=node.js)](https://nodejs.org/)&nbsp;
[![Last Commit](https://img.shields.io/github/last-commit/ahampriyanshu/norm-has-a-blog?logo=github)](https://github.com/ahampriyanshu/norm-has-a-blog/commits)&nbsp;
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?logo=prettier)](https://github.com/prettier/prettier)&nbsp;
[![Linted: ESLint](https://img.shields.io/badge/linted-ESLint-4B32C3?logo=eslint)](https://eslint.org/)&nbsp;
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/ahampriyanshu/norm-has-a-blog/pulls)&nbsp;

**norm-has-a-blog** is a simple, static, and zero config blog built with SvelteKit. It's designed for developers who want to save and share the stuff they're discovering.(but can be used by anyone for anything)

## Features

This blog comes packed with powerful features out of the box:

- **Modern Stack**: Built with [SvelteKit 2.0](https://svelte.dev/) and [Vite](https://vite.dev/) for blazing-fast performance
- **Markdown Support**: Write posts in Markdown(GFM is also supported) with [MDSveX](https://mdsvex.pngwn.io/).
- **Syntax Highlighting**: Beautiful code blocks powered by [Shiki](https://shiki.matsu.io/).
- **Math Equations**: Full support for LaTeX/KaTeX mathematical expressions powered by [MathJax](https://www.mathjax.org/).
- **Static Site Generation**: Deploy anywhere with zero runtime dependencies(and zero cost).
- **Table of Contents**: Interactive table of contents for easy navigation.
- **Responsive Design**: Looks great on all devices.
- **Dark/Light Theme**: Built-in theme support.
- **SEO Friendly**: RSS/Atom feeds, sitemap, OG tags and canonical URLs.
- **Tags & Categories**: Organize posts with hierarchical categories and tags.
- **Featured Posts**: Pin important posts to the homepage.
- **Enhanced Footer**: Customizable footer with projects, blogs, and social links.
- **Archives**: Browse posts by date.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **yarn** (or any other package manager)
- **Git** 
- A code editor.

## Getting Started

> 📚 **For a comprehensive guide**, check out the [Getting Started Guide](https://ahampriyanshu.com/norm-has-a-blog/posts/getting-started) with detailed setup, configuration, and deployment instructions.

### Quick Setup

1. Clone/fork this repository.
```bash
git clone https://github.com/ahampriyanshu/norm-has-a-blog.git my-new-blog
cd my-new-blog
```

2. Install dependencies:

```bash
yarn
```

3. Start the development server:

```bash
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build Commands

Build the static site:

```bash
yarn build
```

Preview the production build:

```bash
yarn preview
```

## Configuration

Edit `src/lib/config.ts` to customize your blog:

```typescript
export const siteConfig = {
  title: 'Your Blog Title',
  description: 'Your blog description',
  author: 'Your Name',
  url: 'https://yourdomain.com',
  subPath: '/your-subdirectory',
  lang: 'en',
  social: {
    github: 'yourusername',
    twitter: 'yourusername',
    email: 'your@email.com',
    rss: true
  },
  theme: 'light'
};
```

## Writing a new article

1. Create a new `.md` file in the `src/posts` directory
2. Add frontmatter with metadata
3. Write your content in Markdown

## Deployment

This blog can be deployed to any static hosting service. But it's recommended to use [GitHub Pages](https://pages.github.com/) for free hosting. In order to deploy to GitHub Pages:

1. Push the changes to a public github repository.
2. Enable GitHub Pages in repository settings.
3. Deploy the site to GitHub Pages.
4. The site will be available at `https://<username>.github.io/<repository-name>`.

Note: If required, you can add CNAME record to use custom domain.

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
- Post layout: `src/routes/blog/[slug]/+page.svelte`
- Markdown layouts: `src/lib/layouts/`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- Built with [SvelteKit](https://kit.svelte.dev/) and  [Vite](https://vite.dev/)
- Markdown processing by [mdsvex](https://mdsvex.pngwn.io/)
- Code highlighting by [Shiki](https://shiki.gitbook.io/)
- Math rendering by [MathJax](https://www.mathjax.org/)
- Deployed on [GitHub Pages](https://pages.github.com/)
