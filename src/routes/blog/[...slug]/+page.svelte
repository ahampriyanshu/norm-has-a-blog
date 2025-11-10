<script lang="ts">
  import type { ComponentType } from 'svelte';
  import type { PageData } from './$types';
  import { formatDate } from '$lib/utils/posts';
  import Toast from '$lib/components/Toast.svelte';
  import CopyDropdown, { type DropdownAction } from '$lib/components/CopyDropdown.svelte';
  import { base } from '$app/paths';
  import { browser } from '$app/environment';

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

  function showToastMessage(message: string) {
    toastMessage = message;
    showToast = true;
  }

  function handleToastClose() {
    showToast = false;
  }

  function getPostUrl(): string {
    if (browser) {
      return window.location.href;
    }
    return '';
  }

  async function copyPostContent() {
    if (!browser) return;
    const articleElement = document.querySelector('.post-article .content');

    if (articleElement) {
      const text = articleElement.textContent?.trim() ?? '';
      await navigator.clipboard.writeText(text);
      showToastMessage('Post content copied to clipboard!');
    }
  }

  async function copyUrl() {
    if (!browser) return;
    await navigator.clipboard.writeText(getPostUrl());
    showToastMessage('Link copied to clipboard!');
  }

  function viewAsMarkdown() {
    if (!browser) return;
    const url = `https://raw.githubusercontent.com/${siteConfig.githubUsername}/${siteConfig.githubRepo}/refs/heads/main/src/blog/${metadata.slug}.md`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  $: repoBaseUrl = `https://github.com/${siteConfig.githubUsername}/${siteConfig.githubRepo}`;

  $: copyPrimaryAction = {
    label: 'Copy Page',
    icon: 'copy',
    ariaLabel: 'Copy post content',
    onClick: copyPostContent
  } satisfies DropdownAction;

  $: copyDropdownItems = [
    { label: 'Copy URL', icon: 'link', onClick: copyUrl },
    { label: 'Raw Markdown', icon: 'code', onClick: viewAsMarkdown }
  ] satisfies DropdownAction[];
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
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <ol class="breadcrumb-list">
      <li><a href="{base}/">Home</a></li>
      <li><span class="separator">></span></li>
      <li><a href="{base}/blog">Blog</a></li>
      {#if metadata.categories && metadata.categories.length > 0}
        {@const category = metadata.categories[0]}
        {@const parentCategory = category.split('/')[0]}
        <li><span class="separator">></span></li>
        <li><a href="{base}/categories/{parentCategory.toLowerCase()}">{parentCategory}</a></li>
      {/if}
    </ol>
  </nav>

  <div class="post-title-wrapper">
    <h1 class="post-title-main">{metadata.title}</h1>
  </div>

  <div class="post-meta-inline">
    <span class="meta-item">
      <time datetime={metadata.date}>Posted on {formatDate(metadata.date)}</time>
    </span>
    {#if metadata.commitInfo}
      <span class="meta-separator">•</span>
      <span class="meta-item">
        Updated on {formatDate(metadata.commitInfo.date)}
        <a
          href={metadata.commitInfo.url}
          target="_blank"
          rel="noopener noreferrer"
          class="commit-link"
        >
          #{metadata.commitInfo.hash}
        </a>
      </span>
    {/if}
  </div>

  <div class="post-actions-widget">
    <CopyDropdown primaryAction={copyPrimaryAction} dropdownItems={copyDropdownItems} />
  </div>
</div>

<article class="post-article">
  <div class="content prose">
    {#if Content}
      <svelte:component this={Content} />
    {/if}
  </div>

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

  {#if metadata.tags && metadata.tags.length > 0}
    <div class="post-tail-wrapper">
      <div class="post-tags-inline">
        {#each metadata.tags as tag}
          <a href="{base}/tags/{tag.toLowerCase()}">
            #{tag}
          </a>
        {/each}
      </div>
      <div class="post-license">
        <span class="license-text">
          This post is licensed under
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer">CC BY 4.0</a
          >
        </span>
        <span class="license-actions">
          <a
            href="{repoBaseUrl}/edit/main/src/blog/{metadata.slug}.md"
            target="_blank"
            rel="noopener noreferrer">Edit this page</a
          >
          <span class="separator">|</span>
          <a href="{repoBaseUrl}/issues/new" target="_blank" rel="noopener noreferrer"
            >Report an issue</a
          >
        </span>
      </div>
    </div>
  {/if}
</article>

{#if showToast}
  <Toast message={toastMessage} onClose={handleToastClose} />
{/if}
