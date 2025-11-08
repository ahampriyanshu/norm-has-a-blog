<script lang="ts">
  import { base } from '$app/paths';
  import type { PageData } from './$types';
  import { formatDate } from '$lib/utils/posts';

  export let data: PageData;
</script>

<svelte:head>
  <title>{data.category} | {data.siteConfig.title}</title>
  <meta
    name="description"
    content="Articles in category {data.category} on {data.siteConfig.title}"
  />

  <!-- Canonical URL -->
  <link
    rel="canonical"
    href="{data.siteConfig.baseURL}{data.siteConfig
      .subPath}/categories/{data.category.toLowerCase()}"
  />

  <!-- OpenGraph meta tags -->
  <meta property="og:site_name" content={data.siteConfig.title} />
  <meta property="og:title" content="{data.category} | {data.siteConfig.title}" />
  <meta
    property="og:description"
    content="Articles in category {data.category} on {data.siteConfig.title}"
  />
  <meta property="og:type" content="website" />
  <meta
    property="og:url"
    content="{data.siteConfig.baseURL}{data.siteConfig
      .subPath}/categories/{data.category.toLowerCase()}"
  />
  <meta
    property="og:image"
    content="{data.siteConfig.baseURL}{data.siteConfig.subPath}/images/hero.jpeg"
  />

  <!-- Twitter Card meta tags -->
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="{data.category} | {data.siteConfig.title}" />
  <meta
    name="twitter:description"
    content="Articles in category {data.category} on {data.siteConfig.title}"
  />
  <meta
    name="twitter:image"
    content="{data.siteConfig.baseURL}{data.siteConfig.subPath}/images/hero.jpeg"
  />
  {#if data.siteConfig.twitterHandle}
    <meta name="twitter:site" content="@{data.siteConfig.twitterHandle}" />
  {/if}
</svelte:head>

<div class="tags-page">
  <h1 class="page-title">Category: {data.category}</h1>
  <p class="tag-count">{data.posts.length} post{data.posts.length !== 1 ? 's' : ''}</p>

  <div class="tag-index">
    {#each data.posts as post}
      <a href="{base}/blog/{post.slug}" class="index-item">
        <span class="tag-name">{post.title}</span>
        <span class="dots"></span>
        <span class="count">{formatDate(post.date)}</span>
      </a>
    {/each}
  </div>
</div>
