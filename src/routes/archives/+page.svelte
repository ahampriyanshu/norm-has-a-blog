<script lang="ts">
  import type { PageData } from './$types';
  import BlogList from '$lib/components/BlogList.svelte';

  export let data: PageData;
</script>

<svelte:head>
  <title>Archives | {data.siteConfig.title}</title>
  <meta
    name="description"
    content="Browse all articles in the archives on {data.siteConfig.title}"
  />

  <!-- Canonical URL -->
  <link rel="canonical" href="{data.siteConfig.baseURL}{data.siteConfig.subPath}/archives" />

  <!-- OpenGraph meta tags -->
  <meta property="og:site_name" content={data.siteConfig.title} />
  <meta property="og:title" content="Archives | {data.siteConfig.title}" />
  <meta
    property="og:description"
    content="Browse all articles in the archives on {data.siteConfig.title}"
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="{data.siteConfig.baseURL}{data.siteConfig.subPath}/archives" />
  <meta
    property="og:image"
    content="{data.siteConfig.baseURL}{data.siteConfig.subPath}/images/hero.jpeg"
  />

  <!-- Twitter Card meta tags -->
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="Archives | {data.siteConfig.title}" />
  <meta
    name="twitter:description"
    content="Browse all articles in the archives on {data.siteConfig.title}"
  />
  <meta
    name="twitter:image"
    content="{data.siteConfig.baseURL}{data.siteConfig.subPath}/images/hero.jpeg"
  />
  {#if data.siteConfig.twitterHandle}
    <meta name="twitter:site" content="@{data.siteConfig.twitterHandle}" />
  {/if}
</svelte:head>

<div class="archives-page">
  <h1 class="page-title">Archives</h1>

  <div class="timeline">
    {#each Array.from(data.archives) as [year, months]}
      <div class="year-section">
        <h2 class="year">{year}</h2>

        {#each Array.from(months) as [month, posts]}
          <div class="month-section">
            <h3 class="month">{month}</h3>
            <BlogList {posts} />
          </div>
        {/each}
      </div>
    {/each}
  </div>
</div>
