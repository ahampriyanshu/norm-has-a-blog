<script lang="ts">
  import { base } from '$app/paths';
  import type { PageData } from './$types';

  export let data: PageData;

  // Sort categories alphabetically
  $: sortedCategories = Array.from(data.categories).sort((a, b) => a[0].localeCompare(b[0]));
</script>

<svelte:head>
  <title>Categories | {data.siteConfig.title}</title>
  <meta name="description" content="Browse all categories on {data.siteConfig.title}" />

  <!-- Canonical URL -->
  <link rel="canonical" href="{data.siteConfig.baseURL}{data.siteConfig.subPath}/categories" />

  <!-- OpenGraph meta tags -->
  <meta property="og:site_name" content={data.siteConfig.title} />
  <meta property="og:title" content="Categories | {data.siteConfig.title}" />
  <meta property="og:description" content="Browse all categories on {data.siteConfig.title}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="{data.siteConfig.baseURL}{data.siteConfig.subPath}/categories" />
  <meta
    property="og:image"
    content="{data.siteConfig.baseURL}{data.siteConfig.subPath}/images/hero.jpeg"
  />

  <!-- Twitter Card meta tags -->
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="Categories | {data.siteConfig.title}" />
  <meta name="twitter:description" content="Browse all categories on {data.siteConfig.title}" />
  <meta
    name="twitter:image"
    content="{data.siteConfig.baseURL}{data.siteConfig.subPath}/images/hero.jpeg"
  />
  {#if data.siteConfig.twitterHandle}
    <meta name="twitter:site" content="@{data.siteConfig.twitterHandle}" />
  {/if}
</svelte:head>

<div class="tags-page">
  <h1 class="page-title">Categories</h1>

  <div class="tag-index">
    {#each sortedCategories as [category, subcategories]}
      <a href="{base}/categories/{category.toLowerCase()}" class="index-item">
        <span class="tag-name">{category}</span>
        <span class="dots"></span>
        <span class="count">
          {Array.from(subcategories.values()).reduce((sum, count) => sum + count, 0)}
        </span>
      </a>
    {/each}
  </div>
</div>
