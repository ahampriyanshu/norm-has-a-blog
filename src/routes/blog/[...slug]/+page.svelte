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

  const blogModules = import.meta.glob('../../../blog/**/*.md', { eager: true }) as Record<
    string,
    { default: ComponentType }
  >;

  // Make these reactive so they update when data changes
  $: metadata = data.metadata;
  $: previousPost = data.previousPost;
  $: nextPost = data.nextPost;
  $: siteConfig = data.siteConfig;

  $: contentEntry = Object.entries(blogModules).find(([path]) =>
    path.endsWith(`/${metadata.slug}.md`)
  );
  $: Content = contentEntry?.[1]?.default;

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
    return `https://raw.githubusercontent.com/${siteConfig.githubUsername}/${siteConfig.githubRepo}/refs/heads/main/src/blog/${metadata.slug}.md`;
  }

  function viewAsMarkdown() {
    if (browser) {
      window.open(getMarkdownUrl(), '_blank');
    }
    dropdownOpen = false;
  }

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

  <!-- Canonical URL -->
  <link
    rel="canonical"
    href="{data.siteConfig.baseURL}{data.siteConfig.subPath}/blog/{metadata.slug}"
  />

  <!-- OpenGraph meta tags for articles -->
  <meta property="og:site_name" content={data.siteConfig.title} />
  <meta property="og:title" content={metadata.title} />
  {#if metadata.description}
    <meta property="og:description" content={metadata.description} />
  {/if}
  <meta property="og:type" content="article" />
  <meta
    property="og:url"
    content="{data.siteConfig.baseURL}{data.siteConfig.subPath}/blog/{metadata.slug}"
  />
  {#if metadata.image}
    <meta
      property="og:image"
      content="{data.siteConfig.baseURL}{data.siteConfig.subPath}{metadata.image}"
    />
    <meta property="og:image:alt" content={metadata.title} />
  {:else}
    <meta
      property="og:image"
      content="{data.siteConfig.baseURL}{data.siteConfig.subPath}/images/hero.jpeg"
    />
    <meta property="og:image:alt" content={metadata.title} />
  {/if}
  <meta property="og:locale" content={data.siteConfig.lang} />
  <meta property="article:published_time" content={metadata.date} />
  {#if metadata.updated}
    <meta property="article:modified_time" content={metadata.updated} />
  {/if}
  <meta property="article:author" content={data.siteConfig.author} />
  {#if metadata.tags && metadata.tags.length > 0}
    {#each metadata.tags as tag}
      <meta property="article:tag" content={tag} />
    {/each}
  {/if}

  <!-- Twitter Card meta tags for articles -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={metadata.title} />
  {#if metadata.description}
    <meta name="twitter:description" content={metadata.description} />
  {/if}
  {#if metadata.image}
    <meta
      name="twitter:image"
      content="{data.siteConfig.baseURL}{data.siteConfig.subPath}{metadata.image}"
    />
  {:else}
    <meta
      name="twitter:image"
      content="{data.siteConfig.baseURL}{data.siteConfig.subPath}/images/hero.jpeg"
    />
  {/if}
  {#if data.siteConfig.twitterHandle}
    <meta name="twitter:site" content="@{data.siteConfig.twitterHandle}" />
    <meta name="twitter:creator" content="@{data.siteConfig.twitterHandle}" />
  {/if}
  <meta name="twitter:label1" content="Reading time" />
  <meta name="twitter:data1" content={metadata.readingTime} />
  {#if metadata.tags && metadata.tags.length > 0}
    <meta name="twitter:label2" content="Tags" />
    <meta name="twitter:data2" content={metadata.tags.join(', ')} />
  {/if}
  {#if data.metadata.math}
    <script>
      window.MathJax = {
        tex: {
          inlineMath: [
            ['$', '$'],
            ['\\(', '\\)']
          ],
          displayMath: [
            ['$$', '$$'],
            ['\\[', '\\]']
          ],
          processEscapes: true,
          processEnvironments: true
        },
        options: {
          skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
          ignoreHtmlClass: 'tex2jax_ignore',
          processHtmlClass: 'tex2jax_process'
        },
        svg: {
          fontCache: 'global'
        }
      };
    </script>
    <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js" async></script>
  {/if}
</svelte:head>

<div class="post-header-section">
  <div class="post-title-wrapper">
    <h1 class="post-title-main">{metadata.title}</h1>
  </div>

  <div class="post-meta-inline text-muted">
    <span class="meta-item">
      <time datetime={metadata.date}>Posted on {formatDate(metadata.date)}</time>
    </span>
    {#if metadata.tags && metadata.tags.length > 0}
      <span class="meta-item">
        <Icon name="tag" size={16} />
      </span>
      <span class="meta-item">
        <span>{metadata.readingTime}</span>
      </span>
    {/if}
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

  <div class="post-actions-widget">
    <div class="copy-dropdown-container" bind:this={dropdownButton}>
      <div class="copy-dropdown-wrapper">
        <button
          class="action-btn copy-btn"
          on:click={copyPostContent}
          aria-label="Copy post content"
        >
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

    <a
      href="https://github.com/{siteConfig.githubUsername}/{siteConfig.githubRepo}/edit/main/src/blog/{metadata.slug}.md"
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
</div>

<article class="post-article">
  <div class="content prose">
    {#if Content}
      <svelte:component this={Content} />
    {/if}
  </div>

  {#if metadata.tags && metadata.tags.length > 0}
    <div class="post-tail-wrapper">
      <div class="post-tags-inline">
        {#each metadata.tags as tag}
          <a href="{base}/tags/{tag.toLowerCase()}">
            #{tag}
          </a>
        {/each}
      </div>
    </div>
  {/if}

  <nav class="post-navigation" aria-label="Post navigation">
    <a href="{base}/blog/{previousPost.slug}" class="nav-item nav-previous">
      <span class="nav-label">PREVIOUS</span>
      <span class="nav-title">{previousPost.title}</span>
    </a>
    <a href="{base}/blog/{nextPost.slug}" class="nav-item nav-next">
      <span class="nav-label">NEXT</span>
      <span class="nav-title">{nextPost.title}</span>
    </a>
  </nav>
</article>

{#if showToast}
  <Toast message={toastMessage} onClose={handleToastClose} />
{/if}
