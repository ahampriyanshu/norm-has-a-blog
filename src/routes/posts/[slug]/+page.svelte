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

<article class="px-1">
  <header>
    <h1>{metadata.title}</h1>
    {#if metadata.description}
      <p class="post-desc fw-light mb-4">{metadata.description}</p>
    {/if}

    <div class="post-meta text-muted">
      <span>
        Posted
        <time datetime={metadata.date}>{formatDate(metadata.date)}</time>
      </span>

      {#if metadata.updated && metadata.updated !== metadata.date}
        <span>
          Updated
          <time datetime={metadata.updated}>{formatDate(metadata.updated)}</time>
        </span>
      {/if}

      {#if metadata.image}
        <div class="mt-3 mb-3">
          <img src={metadata.image} alt={metadata.title} class="preview-img" loading="lazy">
        </div>
      {/if}

      <div class="d-flex justify-content-between">
        <span>
          By
          <em>
            {#if metadata.author}
              {metadata.author}
            {:else}
              {data.siteConfig.author}
            {/if}
          </em>
        </span>

        <div>
          <span>{metadata.readingTime}</span>
        </div>
      </div>
    </div>
  </header>

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

