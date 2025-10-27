<script lang="ts">
  import type { ComponentType } from 'svelte';
  import type { PageData } from './$types';
  import { formatDate } from '$lib/utils/posts';
  import Icon from '$lib/components/Icon.svelte';
  import Toast from '$lib/components/Toast.svelte';
  import { browser } from '$app/environment';
  import { base } from '$app/paths';
  import { onMount } from 'svelte';

  export let data: PageData;

  const { metadata } = data;
  const { previousPost, nextPost, siteConfig } = data;
  const postModules = import.meta.glob('../../../posts/**/*.md', { eager: true }) as Record<
    string,
    { default: ComponentType }
  >;
  const contentEntry = Object.entries(postModules).find(([path]) =>
    path.endsWith(`/${metadata.slug}.md`)
  );
  const Content = contentEntry?.[1]?.default;

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

  {#if metadata.commitInfo}
    <div class="post-update-info text-muted">
      <span>
        Updated on {formatDate(metadata.commitInfo.date)} via
        <a
          href={metadata.commitInfo.url}
          target="_blank"
          rel="noopener noreferrer"
          class="commit-link"
        >
          {metadata.commitInfo.message}
        </a>
      </span>
    </div>
  {/if}

  <!-- Action Widget -->
  <div class="post-actions-widget">
    <!-- Copy and Dropdown Buttons -->
    <div class="copy-dropdown-wrapper" bind:this={dropdownButton}>
      <button class="action-btn copy-btn" on:click={copyPostContent} aria-label="Copy post content">
        <Icon name="copy" size={16} />
        <span>Copy Page</span>
      </button>
      <button
        class="action-btn copy-dropdown-arrow"
        on:click={toggleDropdown}
        aria-label="More options"
      >
        <Icon name="chevron-down" size={16} />
      </button>
      {#if dropdownOpen}
        <div
          class="dropdown-menu"
          role="menu"
          tabindex="-1"
          on:click|stopPropagation
          on:keydown|stopPropagation
        >
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
      <a
        href="{base}/posts/{previousPost.slug}"
        class="action-btn nav-btn"
        aria-label="Previous post"
        title={previousPost.title}
      >
        <Icon name="chevron-left" size={20} />
      </a>
    {:else}
      <button class="action-btn nav-btn" disabled aria-label="No previous post">
        <Icon name="chevron-left" size={20} />
      </button>
    {/if}

    {#if nextPost}
      <a
        href="{base}/posts/{nextPost.slug}"
        class="action-btn nav-btn"
        aria-label="Next post"
        title={nextPost.title}
      >
        <Icon name="chevron-right" size={20} />
      </a>
    {:else}
      <button class="action-btn nav-btn" disabled aria-label="No next post">
        <Icon name="chevron-right" size={20} />
      </button>
    {/if}
  </div>
</div>

<!-- Main Article Content -->
<article class="post-article">
  <div class="content prose">
    {#if Content}
      <svelte:component this={Content} />
    {/if}
  </div>

  <!-- Post Action Links -->
  <div class="post-action-links">
    <a
      href="https://github.com/{siteConfig.githubUsername}/{siteConfig.githubRepo}/edit/main/src/posts/{metadata.slug}.md"
      target="_blank"
      rel="noopener noreferrer"
      class="action-link"
    >
      <Icon name="pencil" size={16} />
      <span>Edit this page</span>
    </a>
    <a
      href="https://github.com/{siteConfig.githubUsername}/{siteConfig.githubRepo}/issues/new"
      target="_blank"
      rel="noopener noreferrer"
      class="action-link"
    >
      <Icon name="alert" size={16} />
      <span>Report Issue</span>
    </a>
    <a
      href="https://github.com/{siteConfig.githubUsername}/{siteConfig.githubRepo}/compare"
      target="_blank"
      rel="noopener noreferrer"
      class="action-link"
    >
      <Icon name="git-pull-request" size={16} />
      <span>Suggest New Page</span>
    </a>
  </div>

  <div class="post-tail-wrapper text-muted">
    {#if metadata.tags && metadata.tags.length > 0}
      <div class="post-tags">
        <Icon name="tags" size={14} className="me-1" />
        {#each metadata.tags as tag}
          <a href="{base}/tags/{tag.toLowerCase()}" class="post-tag no-text-decoration">
            {tag}
          </a>
        {/each}
      </div>
    {/if}
  </div>
</article>

{#if showToast}
  <Toast message={toastMessage} onClose={handleToastClose} />
{/if}
