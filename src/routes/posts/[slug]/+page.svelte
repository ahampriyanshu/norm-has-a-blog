<script lang="ts">
  import type { PageData } from './$types';
  import { formatDate } from '$lib/utils/posts';
  import RelatedPosts from '$lib/components/RelatedPosts.svelte';
  import Icon from '$lib/components/Icon.svelte';

  export let data: PageData;

  const { metadata, content } = data;
</script>

<svelte:head>
  <title>{metadata.title} | {data.siteConfig.title}</title>
  {#if metadata.description}
    <meta name="description" content={metadata.description} />
  {/if}
</svelte:head>

<!-- Post Title Section - Outside main content area -->
<div class="post-header-section">
  <h1 class="post-title-main">{metadata.title}</h1>
  <div class="post-meta-inline text-muted">
    <span>Posted <time datetime={metadata.date}>{formatDate(metadata.date)}</time></span>
    <span class="meta-separator">|</span>
    <span>{metadata.readingTime}</span>
  </div>
</div>

<!-- Main Article Content -->
<article class="post-article">
  <div class="content prose">
    <svelte:component this={content} />
  </div>

  <div class="post-tail-wrapper text-muted">
    {#if metadata.tags && metadata.tags.length > 0}
      <div class="post-tags">
        <Icon name="tags" size={14} className="me-1" />
        {#each metadata.tags as tag}
          <a href="/tags/{tag.toLowerCase()}" class="post-tag no-text-decoration">
            {tag}
          </a>
        {/each}
      </div>
    {/if}
  </div>

  <RelatedPosts
    currentSlug={metadata.slug}
    tags={metadata.tags || []}
  />
</article>

