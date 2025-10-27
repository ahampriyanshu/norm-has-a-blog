<script lang="ts">
  import { page } from '$app/stores';
  import { siteConfig } from '$lib/config';
  import { onMount } from 'svelte';
  import type { PostMetadata } from '$lib/utils/posts';
  import Icon from '$lib/components/Icon.svelte';

  export let theme: string = 'dark';
  export let toggleTheme: () => void;

  let searchVisible = false;
  let searchQuery = '';
  let allPosts: PostMetadata[] = [];
  let searchResults: PostMetadata[] = [];
  let searchInputElement: HTMLInputElement;
  let isMac = false;
  let themeToggleIcon: 'sun' | 'moon' = 'moon';
  $: themeToggleIcon = theme === 'dark' ? 'sun' : 'moon';
  $: popularPosts = allPosts.slice(0, 6);

  const navItems = [
    { name: 'Home', url: '/' },
    { name: 'About', url: siteConfig.aboutUrl },
    { name: 'Tags', url: '/tags' },
    { name: 'Archives', url: '/archives' }
  ];

  onMount(async () => {
    // Detect Mac for keyboard shortcut display
    isMac = /Mac|iPhone|iPod|iPad/i.test(navigator.userAgent);

    // Load all posts for search
    try {
      const response = await fetch('/api/posts.json');
      if (response.ok) {
        allPosts = await response.json();
      }
    } catch (error) {
      console.error('Failed to load posts for search:', error);
    }

    // Add keyboard shortcut listener
    const handleKeyboard = (e: KeyboardEvent) => {
      // Cmd+K on Mac or Ctrl+K on Windows/Linux
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
    searchResults = allPosts.filter(post => {
      const titleMatch = post.title.toLowerCase().includes(query);
      const descMatch = post.description?.toLowerCase().includes(query);
      const tagMatch = post.tags?.some(tag => tag.toLowerCase().includes(query));

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
          href={item.url}
          class="nav-link"
          class:active={currentPath === item.url || (item.url !== '/' && currentPath.startsWith(item.url))}
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
        on:click={toggleSearch}
      >
        <Icon name="search" size={16} className="search-trigger-icon" />
        <span class="search-trigger-text">{isMac ? '⌘K' : 'Ctrl+K'}</span>
      </button>

      <button
        type="button"
        class="theme-toggle"
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        on:click={toggleTheme}
      >
        <Icon name={themeToggleIcon} size={20} />
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
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="search-modal" on:click|stopPropagation on:keydown={handleKeydown} role="document">
      <div class="search-header">
        <div class="search-input-wrapper">
          <Icon name="search" size={20} className="search-icon" />
          <input
            type="text"
            bind:this={searchInputElement}
            bind:value={searchQuery}
            placeholder="Search posts..."
            class="search-input"
          />
          <button on:click={toggleSearch} class="search-close" aria-label="Close search">
            <Icon name="close" size={24} />
          </button>
        </div>
      </div>

      <div class="search-results">
        {#if searchQuery.trim()}
          {#if searchResults.length > 0}
            <div class="results-header">
              <span class="results-count">{searchResults.length} result{searchResults.length !== 1 ? 's' : ''}</span>
            </div>
            <div class="results-list">
              {#each searchResults as post}
                <a href="/posts/{post.slug}" class="result-item" on:click={toggleSearch}>
                  <div class="result-content">
                    <h3 class="result-title">{post.title}</h3>
                    {#if post.description}
                      <p class="result-description">{post.description}</p>
                    {/if}
                    <div class="result-meta">
                      {#if post.tags && post.tags.length > 0}
                        <span class="result-tags">
                          <Icon name="tags" size={12} />
                          {post.tags.slice(0, 3).join(', ')}
                        </span>
                      {/if}
                    </div>
                  </div>
                </a>
              {/each}
            </div>
          {:else}
            <div class="no-results">
              <p>No posts found for "{searchQuery}"</p>
            </div>
          {/if}
        {:else}
          <div class="search-empty-state">
            <p class="empty-message">Type something to search..</p>
          </div>
          <div class="search-shortcuts">
            <div class="shortcut-item">
              <svg class="shortcut-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 19 6 12 18 12 12 19"></polygon>
              </svg>
              <svg class="shortcut-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 5 6 12 18 12 12 5"></polygon>
              </svg>
              <span>to navigate</span>
            </div>
            <div class="shortcut-item">
              <svg class="shortcut-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span>to select</span>
            </div>
            <div class="shortcut-item esc-shortcut">
              <button class="esc-btn">ESC</button>
              <span>to close</span>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}
