<script lang="ts">
  import { base } from '$app/paths';
  import type { PageData } from './$types';
  import { formatDate } from '$lib/utils/posts';
  import Icon from '$lib/components/Icon.svelte';

  export let data: PageData;
</script>

<svelte:head>
  <title>{data.siteConfig.title}</title>
</svelte:head>

<div class="post-list">
  {#each data.posts as post}
    <article class="card-wrapper card">
      <a href="{base}/posts/{post.slug}" class="post-preview">
        {#if post.image}
          <div class="post-image">
            <img src={post.image} alt={post.title} loading="lazy">
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

