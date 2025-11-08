<script lang="ts">
  import { base } from '$app/paths';
  import type { PageData } from './$types';

  export let data: PageData;

  function formatDateSimple(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
</script>

<svelte:head>
  <title>Blog | {data.siteConfig.title}</title>
  <meta name="description" content="Browse all blog posts on {data.siteConfig.title}" />

  <!-- Canonical URL -->
  <link rel="canonical" href="{data.siteConfig.baseURL}{data.siteConfig.subPath}/blog" />

  <!-- OpenGraph meta tags -->
  <meta property="og:site_name" content={data.siteConfig.title} />
  <meta property="og:title" content="Blog | {data.siteConfig.title}" />
  <meta property="og:description" content="Browse all blog posts on {data.siteConfig.title}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="{data.siteConfig.baseURL}{data.siteConfig.subPath}/blog" />
  <meta
    property="og:image"
    content="{data.siteConfig.baseURL}{data.siteConfig.subPath}/images/hero.jpeg"
  />

  <!-- Twitter Card meta tags -->
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="Blog | {data.siteConfig.title}" />
  <meta name="twitter:description" content="Browse all blog posts on {data.siteConfig.title}" />
  <meta
    name="twitter:image"
    content="{data.siteConfig.baseURL}{data.siteConfig.subPath}/images/hero.jpeg"
  />
  {#if data.siteConfig.twitterHandle}
    <meta name="twitter:site" content="@{data.siteConfig.twitterHandle}" />
  {/if}
</svelte:head>

<div class="blog-page">
  <h1 class="page-title">Articles</h1>
  <p class="tag-count">{data.posts.length} post{data.posts.length !== 1 ? 's' : ''}</p>

  <ul class="blog-list">
    {#each data.posts as post}
      <li class="blog-item">
        <time class="blog-date" datetime={post.date}>{formatDateSimple(post.date)}</time>
        <a href="{base}/blog/{post.slug}" class="blog-link">
          {post.title}
        </a>
      </li>
    {/each}
  </ul>
</div>
