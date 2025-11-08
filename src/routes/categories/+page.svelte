<script lang="ts">
  import { base } from '$app/paths';
  import type { PageData } from './$types';

  export let data: PageData;
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

  <div class="category-index">
    {#each Array.from(data.categories) as [category, subcategories]}
      <div class="category-section">
        <a href="{base}/categories/{category.toLowerCase()}" class="category-main">
          <h2 class="category-name">{category}</h2>
          <span class="category-count">
            {Array.from(subcategories.values()).reduce((sum, count) => sum + count, 0)} post{Array.from(
              subcategories.values()
            ).reduce((sum, count) => sum + count, 0) !== 1
              ? 's'
              : ''}
          </span>
        </a>

        {#if subcategories.size > 0 && !(subcategories.size === 1 && subcategories.has('_main'))}
          <div class="subcategory-list">
            {#each Array.from(subcategories) as [subcategory, count]}
              {#if subcategory !== '_main'}
                <a
                  href="{base}/categories/{category.toLowerCase()}/{subcategory.toLowerCase()}"
                  class="index-item subcategory-item"
                >
                  <span class="tag-name">{subcategory}</span>
                  <span class="dots"></span>
                  <span class="count">{count}</span>
                </a>
              {/if}
            {/each}
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>

<style>
  .category-section {
    margin-bottom: 2rem;
  }

  .category-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: var(--bg-color-secondary, #f8f9fa);
    border-radius: 8px;
    text-decoration: none;
    color: inherit;
    transition: background-color 0.2s ease;
  }

  .category-main:hover {
    background: var(--bg-color-hover, #e9ecef);
  }

  .category-name {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
  }

  .category-count {
    font-size: 0.9rem;
    color: var(--text-color-secondary, #6c757d);
  }

  .subcategory-list {
    margin-top: 0.5rem;
    padding-left: 2rem;
  }

  .subcategory-item {
    padding: 0.5rem 0;
  }
</style>
