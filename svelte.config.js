import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';

// Base path for GitHub Pages subdirectory deployment
// This should match siteConfig.basePath in src/lib/config.ts
const basePath = '/norm-has-a-blog';

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
  extensions: ['.md'],
  remarkPlugins: [remarkGfm, remarkToc],
  rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
  layout: {
    post: './src/lib/layouts/PostLayout.svelte',
    _: './src/lib/layouts/DefaultLayout.svelte'
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

