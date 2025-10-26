<script lang="ts">
  import type { PageData } from './$types';
  import { formatDate } from '$lib/utils/posts';
  import RelatedPosts from '$lib/components/RelatedPosts.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Toast from '$lib/components/Toast.svelte';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  export let data: PageData;

  const { metadata, content } = data;
  const { previousPost, nextPost, siteConfig } = data;
  
  let showToast = false;
  let toastMessage = '';
  let dropdownOpen = false;
  let dropdownButton: HTMLDivElement;

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

  function toggleDropdown() {
    dropdownOpen = !dropdownOpen;
  }

  function copyPostContent() {
    if (browser) {
      const articleElement = document.querySelector('.post-article .content');
      if (articleElement) {
        const text = articleElement.textContent || '';
        navigator.clipboard.writeText(text).then(() => {
          toastMessage = 'Post content copied to clipboard!';
          showToast = true;
        });
      }
    }
  }

  function copyUrl() {
    copyLink();
    dropdownOpen = false;
  }

  function getMarkdownUrl(): string {
    return `https://github.com/${siteConfig.githubUsername}/${siteConfig.githubRepo}/blob/main/src/posts/${metadata.slug}.md`;
  }

  function viewAsMarkdown() {
    if (browser) {
      window.open(getMarkdownUrl(), '_blank');
    }
    dropdownOpen = false;
  }

  // Close dropdown when clicking outside
  onMount(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownOpen && dropdownButton && !dropdownButton.contains(event.target as Node)) {
        dropdownOpen = false;
      }
    }

    if (browser) {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  });
</script>

<svelte:head>
  <title>{metadata.title} | {data.siteConfig.title}</title>
  {#if metadata.description}
    <meta name="description" content={metadata.description} />
  {/if}
</svelte:head>

<!-- Post Title Section - Outside main content area -->
<div class="post-header-section">
  <div class="post-title-wrapper">
    <h1 class="post-title-main">{metadata.title}</h1>
    
    <!-- Action Widget -->
    <div class="post-actions-widget">
      <!-- Copy and Dropdown Buttons -->
      <div class="copy-dropdown-wrapper" bind:this={dropdownButton}>
        <button class="action-btn copy-btn" on:click={copyPostContent} aria-label="Copy post content">
          <Icon name="copy" size={16} />
          <span>Copy Page</span>
        </button>
        <button class="action-btn copy-dropdown-arrow" on:click|stopPropagation={toggleDropdown} aria-label="More options">
          <Icon name="chevron-down" size={16} />
        </button>
        {#if dropdownOpen}
          <div class="dropdown-menu">
            <button class="dropdown-item" on:click={copyUrl}>
              <Icon name="link" size={14} />
              <span>Copy URL</span>
            </button>
            <button class="dropdown-item" on:click={viewAsMarkdown}>
              <Icon name="code" size={14} />
              <span>View as Markdown</span>
            </button>
          </div>
        {/if}
      </div>

      <!-- Navigation Buttons -->
      {#if previousPost}
        <a href="/posts/{previousPost.slug}" class="action-btn nav-btn" aria-label="Previous post" title="{previousPost.title}">
          <Icon name="chevron-left" size={20} />
        </a>
      {:else}
        <button class="action-btn nav-btn" disabled aria-label="No previous post">
          <Icon name="chevron-left" size={20} />
        </button>
      {/if}
      
      {#if nextPost}
        <a href="/posts/{nextPost.slug}" class="action-btn nav-btn" aria-label="Next post" title="{nextPost.title}">
          <Icon name="chevron-right" size={20} />
        </a>
      {:else}
        <button class="action-btn nav-btn" disabled aria-label="No next post">
          <Icon name="chevron-right" size={20} />
        </button>
      {/if}
    </div>
  </div>
  
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

