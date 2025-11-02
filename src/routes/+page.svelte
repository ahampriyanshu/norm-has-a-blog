<script lang="ts">
  import { base } from '$app/paths';
  import type { PageData } from './$types';
  import { formatDate } from '$lib/utils/posts';
  import Icon from '$lib/components/Icon.svelte';

  export let data: PageData;
</script>

<svelte:head>
  <title>{data.siteConfig.title} - {data.siteConfig.description}</title>
  <meta name="description" content={data.siteConfig.description} />

  <!-- Canonical URL -->
  <link rel="canonical" href="{data.siteConfig.baseURL}{data.siteConfig.subPath}/" />

  <!-- OpenGraph meta tags for homepage -->
  <meta property="og:site_name" content={data.siteConfig.title} />
  <meta property="og:title" content="{data.siteConfig.title} - {data.siteConfig.description}" />
  <meta property="og:description" content={data.siteConfig.description} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="{data.siteConfig.baseURL}{data.siteConfig.subPath}/" />
  <meta
    property="og:image"
    content="{data.siteConfig.baseURL}{data.siteConfig.subPath}/images/hero.jpeg"
  />
  <meta property="og:image:alt" content={data.siteConfig.title} />
  <meta property="og:locale" content={data.siteConfig.lang} />

  <!-- Twitter Card meta tags for homepage -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{data.siteConfig.title} - {data.siteConfig.description}" />
  <meta name="twitter:description" content={data.siteConfig.description} />
  <meta
    name="twitter:image"
    content="{data.siteConfig.baseURL}{data.siteConfig.subPath}/images/hero.jpeg"
  />
  {#if data.siteConfig.twitterHandle}
    <meta name="twitter:site" content="@{data.siteConfig.twitterHandle}" />
    <meta name="twitter:creator" content="@{data.siteConfig.twitterHandle}" />
  {/if}
</svelte:head>

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
          <h1 class="post-title">{post.title}</h1>

          {#if post.description}
            <p class="post-description">{post.description}</p>
          {/if}

          <div class="post-meta">
            <div class="meta-left">
              <Icon name="calendar" size={14} className="me-1" />
              <time datetime={post.date}>{formatDate(post.date)}</time>

              {#if post.tags && post.tags.length > 0}
                <Icon name="tags" size={14} className="ms-3 me-1" />
                <span class="tags">
                  {post.tags.slice(0, 2).join(', ')}
                </span>
              {/if}
            </div>

            {#if post.pin}
              <div class="pin">
                <Icon name="pin" size={14} className="me-1" />
                <span>Pinned</span>
              </div>
            {/if}
          </div>
        </div>
      </a>
    </article>
  {/each}
</div>
