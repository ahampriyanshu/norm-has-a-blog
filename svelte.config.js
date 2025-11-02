import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import remarkMath from 'remark-math';
import { rehypeEscapeMath } from './src/lib/utils/rehype-escape-math.js';
import { createCodeHighlighter } from './src/lib/utils/code-highlighter.js';

const basePath = '/norm-has-a-blog';

const mdsvexOptions = {
  extensions: ['.md'],
  remarkPlugins: [remarkGfm, remarkToc, remarkMath],
  rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, rehypeEscapeMath],
  layout: {
    post: './src/lib/layouts/PostLayout.svelte',
    _: './src/lib/layouts/DefaultLayout.svelte'
  },
  highlight: {
    highlighter: await createCodeHighlighter()
  }
};

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
