<script lang="ts">
  import { page } from '$app/stores';
  import { base } from '$app/paths';
  import { siteConfig } from '$lib/config';
  import { onMount } from 'svelte';
  import type { PostMetadata } from '$lib/utils/posts';
  import Icon from '$lib/components/Icon.svelte';

  let searchVisible = false;
  let searchQuery = '';
  let allPosts: PostMetadata[] = [];
  let searchResults: PostMetadata[] = [];
  let searchInputElement: HTMLInputElement;
  // $: popularPosts = allPosts.slice(0, 6);

  const navItems = siteConfig.navItems;

  function getNavUrl(url: string): string {
    if (url.startsWith('http')) {
      return url;
    }
    return url === '/' ? base || '/' : `${base}${url}`;
  }

  onMount(() => {
    (async () => {
      try {
        const response = await fetch(`${base}/api/blog.json`);
        if (response.ok) {
          allPosts = await response.json();
        }
      } catch (error) {
        console.error('Failed to load blog for search:', error);
      }
    })();

    const handleKeyboard = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleSearch();
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => {
      window.removeEventListener('keydown', handleKeyboard);
    };
  });

  function toggleSearch() {
    searchVisible = !searchVisible;
    if (searchVisible) {
      searchQuery = '';
      searchResults = [];
      setTimeout(() => searchInputElement?.focus(), 100);
    }
  }

  function performSearch() {
    if (!searchQuery.trim()) {
      searchResults = [];
      return;
    }

    const query = searchQuery.toLowerCase();
    searchResults = allPosts.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(query);
      const descMatch = post.description?.toLowerCase().includes(query);
      const tagMatch = post.tags?.some((tag) => tag.toLowerCase().includes(query));

      return titleMatch || descMatch || tagMatch;
    });
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      toggleSearch();
    }
  }

  function handleOverlayKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleSearch();
    }
  }

  $: currentPath = $page.url.pathname;
  $: if (searchQuery !== undefined) {
    performSearch();
  }
</script>

<header class="site-header">
  <div class="header-container">
    <nav class="main-nav">
      {#each navItems as item}
        <a
          href={getNavUrl(item.url)}
          class="nav-link"
          class:active={currentPath === getNavUrl(item.url) ||
            (item.url !== '/' && currentPath.startsWith(getNavUrl(item.url)))}
        >
          {item.name}
        </a>
      {/each}
    </nav>

    <div class="header-actions">
      <button
        type="button"
        class="search-trigger"
        aria-label="Search"
        title="Search (Ctrl/Cmd + K)"
        on:click={toggleSearch}
      >
        <Icon name="search" size={16} className="search-trigger-icon" />
      </button>
    </div>
  </div>
</header>

{#if searchVisible}
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <div
    class="search-overlay"
    on:click={toggleSearch}
    on:keydown={handleOverlayKeydown}
    role="dialog"
    aria-modal="true"
    tabindex="-1"
  >
    <div class="search-modal" on:click|stopPropagation on:keydown={handleKeydown} role="document">
      <div class="search-header">
        <div class="search-input-wrapper">
          <Icon name="search" size={16} className="search-icon" />
          <input
            type="text"
            bind:this={searchInputElement}
            bind:value={searchQuery}
            placeholder="Search posts..."
            class="search-input"
          />
          <button on:click={toggleSearch} class="search-close" aria-label="Close search">
            <Icon name="close" size={16} />
          </button>
        </div>
      </div>

      <div class="search-results">
        {#if searchQuery.trim()}
          {#if searchResults.length > 0}
            <div class="results-list">
              {#each searchResults as post}
                <a href="{base}/blog/{post.slug}" class="result-item" on:click={toggleSearch}>
                  <div class="result-content">
                    <h3 class="result-title">{post.title}</h3>
                    {#if post.description}
                      <p class="result-description">{post.description}</p>
                    {/if}
                  </div>
                </a>
              {/each}
            </div>
          {:else}
            <div class="no-results">
              <p>No articles found for "{searchQuery}"</p>
            </div>
          {/if}
        {:else}
          <div class="search-empty-state">
            <p class="empty-message">Type something to search..</p>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}
