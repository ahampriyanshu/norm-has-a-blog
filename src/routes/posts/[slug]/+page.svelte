<script lang="ts">
  import type { PageData } from './$types';
  import { formatDate } from '$lib/utils/posts';
  import RelatedPosts from '$lib/components/RelatedPosts.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Toast from '$lib/components/Toast.svelte';
  import { browser } from '$app/environment';

  export let data: PageData;

  const { metadata, content } = data;
  let showToast = false;
  let toastMessage = '';

  function getPostUrl(): string {
    if (browser) {
      return window.location.href;
    }
    return '';
  }

  function sharePost(platform: string) {
    const url = encodeURIComponent(getPostUrl());
    const text = encodeURIComponent(metadata.description || metadata.title);
    let shareUrl = '';

    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${text}%20${url}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://x.com/share?url=${url}&text=${text}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
    }
  }

  function copyLink() {
    if (browser) {
      navigator.clipboard.writeText(getPostUrl()).then(() => {
        toastMessage = 'Link copied to clipboard!';
        showToast = true;
      });
    }
  }

  function handleToastClose() {
    showToast = false;
  }
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
    <span class="meta-item">
      <Icon name="calendar" size={16} />
      <time datetime={metadata.date}>{formatDate(metadata.date)}</time>
    </span>
    <span class="meta-item">
      <Icon name="clock" size={16} />
      <span>{metadata.readingTime}</span>
    </span>
  </div>

  <div class="post-share-buttons">
    <button class="share-btn share-whatsapp" on:click={() => sharePost('whatsapp')} aria-label="Share on WhatsApp">
      <Icon name="whatsapp" size={18} />
    </button>
    <button class="share-btn share-facebook" on:click={() => sharePost('facebook')} aria-label="Share on Facebook">
      <Icon name="facebook" size={20} />
    </button>
    <button class="share-btn share-twitter" on:click={() => sharePost('twitter')} aria-label="Share on X (Twitter)">
      <Icon name="twitter" />
    </button>
    <button class="share-btn share-linkedin" on:click={() => sharePost('linkedin')} aria-label="Share on LinkedIn">
      <Icon name="linkedin" />
    </button>
    <button class="share-btn share-telegram" on:click={() => sharePost('telegram')} aria-label="Share on Telegram">
      <Icon name="telegram" size={20} />
    </button>
    <button class="share-btn share-copy" on:click={copyLink} aria-label="Copy link">
      <Icon name="copy" />
    </button>
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
</article>

<RelatedPosts
currentSlug={metadata.slug}
tags={metadata.tags || []}
/>

{#if showToast}
  <Toast message={toastMessage} onClose={handleToastClose} />
{/if}

