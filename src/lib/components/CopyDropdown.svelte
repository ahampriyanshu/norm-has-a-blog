<script lang="ts">
  import Icon from '$lib/components/Icon.svelte';
  import { browser } from '$app/environment';
  import { createEventDispatcher, onMount } from 'svelte';
  import type { SiteConfig } from '$lib/config';
  import type { PostMetadata } from '$lib/utils/posts';

  type ToastDetail = {
    message: string;
  };

  export let metadata: Pick<PostMetadata, 'slug'>;
  export let siteConfig: SiteConfig;
  export let contentSelector = '.post-article .content';
  export let markdownRoot = 'src/blog';
  export let primaryLabel = 'Copy Page';

  const dispatch = createEventDispatcher<{ toast: ToastDetail }>();

  let dropdownOpen = false;
  let dropdownButton: HTMLDivElement | null = null;

  function toggleDropdown() {
    dropdownOpen = !dropdownOpen;
  }

  function notify(message: string) {
    dispatch('toast', { message });
  }

  function getPostUrl(): string {
    if (browser) {
      return window.location.href;
    }
    return '';
  }

  async function copyPostContent() {
    if (!browser) return;
    const articleElement = document.querySelector(contentSelector);

    if (articleElement) {
      const text = articleElement.textContent?.trim() ?? '';
      await navigator.clipboard.writeText(text);
      notify('Post content copied to clipboard!');
    }
  }

  async function copyUrl() {
    if (!browser) return;
    await navigator.clipboard.writeText(getPostUrl());
    notify('Link copied to clipboard!');
    dropdownOpen = false;
  }

  function getMarkdownUrl(): string {
    return `https://raw.githubusercontent.com/${siteConfig.githubUsername}/${siteConfig.githubRepo}/refs/heads/main/${markdownRoot}/${metadata.slug}.md`;
  }

  function viewAsMarkdown() {
    if (browser) {
      window.open(getMarkdownUrl(), '_blank');
    }
    dropdownOpen = false;
  }

  onMount(() => {
    if (!browser) {
      return;
    }

    function handleClickOutside(event: MouseEvent) {
      if (dropdownOpen && dropdownButton && !dropdownButton.contains(event.target as Node)) {
        dropdownOpen = false;
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<div class="copy-dropdown-container" bind:this={dropdownButton}>
  <div class="copy-dropdown-wrapper">
    <button class="action-btn copy-btn" on:click={copyPostContent} aria-label="Copy post content">
      <Icon name="copy" size={16} />
      <span>{primaryLabel}</span>
    </button>
    <button
      class="action-btn copy-dropdown-arrow"
      on:click={toggleDropdown}
      aria-label="More options"
    >
      <Icon name="chevron-down" size={16} />
    </button>
  </div>
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
        <span>Raw Markdown</span>
      </button>
    </div>
  {/if}
</div>
