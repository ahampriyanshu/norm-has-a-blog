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

      // Parse language and filename (supports formats like "javascript:file.js" or "javascript {file.js}")
      let validLang = lang || 'text';
      let filename = '';

      if (lang) {
        // Match patterns like "javascript:file.js" or "js:file.js"
        const colonMatch = lang.match(/^(\w+):(.+)$/);
        // Match patterns like "javascript {file.js}" or "js {file.js}"
        const braceMatch = lang.match(/^(\w+)\s*\{(.+)\}$/);

        if (colonMatch) {
          validLang = colonMatch[1];
          filename = colonMatch[2].trim();
        } else if (braceMatch) {
          validLang = braceMatch[1];
          filename = braceMatch[2].trim();
        }
      }

      // Default to plaintext if language is not recognized
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

      // Escape the code for the data attribute
      const escapedCode = code.replace(/"/g, '&quot;').replace(/'/g, '&#39;');

      // Determine what to display in the header
      let headerText = '';
      if (filename) {
        // Show filename if provided
        headerText = filename;
      } else if (validLang && validLang !== 'text') {
        // Show language code
        headerText = validLang;
      } else {
        headerText = 'text file';
      }

      // Always wrap with header
      const finalHtml = `<div class="code-block-wrapper"><div class="code-filename"><div class="filename-left"><span class="code-filename-text">${headerText}</span></div><button class="copy-code-btn" onclick="
        const code = this.getAttribute('data-code');
        navigator.clipboard.writeText(code).then(() => {
          const btn = this;
          const originalText = btn.innerHTML;
          btn.innerHTML = '✓ Copied';
          btn.classList.add('copied');
          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove('copied');
          }, 2000);
        });
      " data-code="${escapedCode}">📋 Copy</button></div>${html}</div>`;

      // Use escapeSvelte to properly handle Svelte syntax in the output
      return `{@html \`${escapeSvelte(finalHtml)}\` }`;
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
