import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex, escapeSvelte } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import { bundledLanguages, createHighlighter } from 'shiki';

const basePath = '/norm-has-a-blog';

let highlighter;

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

      let validLang = lang || 'text';
      let filename = '';

      if (lang) {
        const colonMatch = lang.match(/^(\w+):(.+)$/);
        const braceMatch = lang.match(/^(\w+)\s*\{(.+)\}$/);

        if (colonMatch) {
          validLang = colonMatch[1];
          filename = colonMatch[2].trim();
        } else if (braceMatch) {
          validLang = braceMatch[1];
          filename = braceMatch[2].trim();
        }
      }

      const loadedLanguages = highlighter.getLoadedLanguages();
      if (!loadedLanguages.includes(validLang)) {
        validLang = 'text';
      }

      let html = highlighter.codeToHtml(code, {
        lang: validLang,
        themes: {
          light: 'gruvbox-dark-hard',
          dark: 'gruvbox-dark-hard'
        }
      });

      const escapedCode = code.replace(/"/g, '&quot;').replace(/'/g, '&#39;');

      let headerText = '';
      if (filename) {
        headerText = filename;
      } else if (validLang && validLang !== 'text') {
        headerText = validLang;
      } else {
        headerText = 'text file';
      }

      const finalHtml = `<div class="code-block-wrapper"><div class="code-filename"><div class="filename-left"><span class="code-filename-text">${headerText}</span></div><button class="copy-code-btn" onclick="
        const code = this.getAttribute('data-code');
        navigator.clipboard.writeText(code).then(() => {
          const btn = this;
          btn.classList.add('copied');
          setTimeout(() => {
            btn.classList.remove('copied');
          }, 2000);
        });
      " data-code="${escapedCode}" title="Copy code"><svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg><svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg></button></div>${html}</div>`;

      return `{@html \`${escapeSvelte(finalHtml)}\` }`;
    }
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
