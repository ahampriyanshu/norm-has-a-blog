<script lang="ts">
  import { base } from '$app/paths';
  import type { PageData } from './$types';
  import { formatDate } from '$lib/utils/posts';
  import Icon from '$lib/components/Icon.svelte';

  export let data: PageData;
</script>

<svelte:head>
  <title>{data.tag} | {data.siteConfig.title}</title>
  <meta name="description" content="Posts tagged with {data.tag} on {data.siteConfig.title}" />

  <!-- Canonical URL -->
  <link
    rel="canonical"
    href="{data.siteConfig.baseURL}{data.siteConfig.subPath}/tags/{data.tag.toLowerCase()}"
  />

  <!-- OpenGraph meta tags -->
  <meta property="og:site_name" content={data.siteConfig.title} />
  <meta property="og:title" content="{data.tag} | {data.siteConfig.title}" />
  <meta
    property="og:description"
    content="Posts tagged with {data.tag} on {data.siteConfig.title}"
  />
  <meta property="og:type" content="website" />
  <meta
    property="og:url"
    content="{data.siteConfig.baseURL}{data.siteConfig.subPath}/tags/{data.tag.toLowerCase()}"
  />
  <meta
    property="og:image"
    content="{data.siteConfig.baseURL}{data.siteConfig.subPath}/images/hero.jpeg"
  />

  <!-- Twitter Card meta tags -->
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="{data.tag} | {data.siteConfig.title}" />
  <meta
    name="twitter:description"
    content="Posts tagged with {data.tag} on {data.siteConfig.title}"
  />
  <meta
    name="twitter:image"
    content="{data.siteConfig.baseURL}{data.siteConfig.subPath}/images/hero.jpeg"
  />
  {#if data.siteConfig.twitterHandle}
    <meta name="twitter:site" content="@{data.siteConfig.twitterHandle}" />
  {/if}
</svelte:head>

<div class="tag-page">
  <h1 class="page-title">Tag: {data.tag}</h1>
  <p class="tag-count">{data.posts.length} post{data.posts.length !== 1 ? 's' : ''}</p>

  <div class="post-list">
    {#each data.posts as post}
      <article class="card-wrapper card">
        <a href="{base}/posts/{post.slug}" class="post-preview">
          {#if post.image}
            <div class="post-image">
              <img src={post.image} alt={post.title} loading="lazy" />
            </div>
          {/if}

          <div class="post-content">
            <h2 class="post-title">{post.title}</h2>

            {#if post.description}
              <p class="post-description">{post.description}</p>
            {/if}

            <div class="post-meta">
              <div class="meta-left">
                <Icon name="calendar" size={14} className="me-1" />
                <time datetime={post.date}>{formatDate(post.date)}</time>
              </div>
            </div>
          </div>
        </a>
      </article>
    {/each}
  </div>
</div>
