import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex, escapeSvelte } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import { bundledLanguages, createHighlighter } from 'shiki';

// Base path for GitHub Pages subdirectory deployment
// This should match siteConfig.basePath in src/lib/config.ts
const basePath = '/norm-has-a-blog';

// Create highlighter instance
let highlighter;

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
  extensions: ['.md'],
  remarkPlugins: [remarkGfm, remarkToc],
  rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
  layout: {
    post: './src/lib/layouts/PostLayout.svelte',
    _: './src/lib/layouts/DefaultLayout.svelte'
  },
  highlight: {
    highlighter: async (code, lang = 'text') => {
      if (!highlighter) {
        highlighter = await createHighlighter({
          themes: ['gruvbox-dark-hard'],
          langs: Object.keys(bundledLanguages)
        });
      }

      // Default to plaintext if language is not recognized
      let validLang = lang;
      const loadedLanguages = highlighter.getLoadedLanguages();
      if (!loadedLanguages.includes(lang)) {
        validLang = 'text';
      }

      const html = highlighter.codeToHtml(code, {
        lang: validLang,
        themes: {
          light: 'gruvbox-dark-hard',
          dark: 'gruvbox-dark-hard'
        }
      });

      // Use escapeSvelte to properly handle Svelte syntax in the output
      return `{@html \`${escapeSvelte(html)}\` }`;
    }
  }
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],

  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '404.html',
      precompress: false,
      strict: true
    }),
    paths: {
      base: process.env.NODE_ENV === 'production' ? basePath : ''
    },
    prerender: {
      handleMissingId: 'warn',
      entries: ['*']
    }
  }
};

export default config;
