<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>About | {data.siteConfig.title}</title>
</svelte:head>

<article class="about-page prose">
  <h1>About</h1>

  <p>Welcome to {data.siteConfig.title}!</p>

  <p>
    This is a blog built with SvelteKit.
    It features a clean, responsive design perfect for technical writing and blogging.
  </p>

  <h2>Features</h2>

  <ul>
    <li>📝 Write posts in Markdown</li>
    <li>🎨 Dark/Light theme support</li>
    <li>📱 Fully responsive design</li>
    <li>🏷️ Tags for organization</li>
    <li>📅 Archives by date</li>
    <li>🔍 Search functionality</li>
    <li>⚡ Fast static site generation</li>
    <li>🎯 SEO optimized</li>
  </ul>

  <h2>Getting Started</h2>

  <p>
    To start blogging, create markdown files in the <code>src/posts</code> directory.
    Each post should have frontmatter with metadata like title, date, and tags.
  </p>

  <p>
    Customize the site configuration in <code>src/lib/config.ts</code> to personalize
    your blog.
  </p>
</article>

