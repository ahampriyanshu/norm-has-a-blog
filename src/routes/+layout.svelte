<script lang="ts">
  import type { LayoutData } from './$types';
  import { page } from '$app/stores';
  import { siteConfig } from '$lib/config';
  import Topbar from '$lib/components/Topbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import BackToTop from '$lib/components/BackToTop.svelte';
  import TOC from '$lib/components/TOC.svelte';
  import RecentlyUpdated from '$lib/components/RecentlyUpdated.svelte';
  import '$lib/styles/louie.scss';
  import { onMount } from 'svelte';

  export let data: LayoutData;
  let theme = 'dark';
  let recentPosts = data.recentPosts ?? [];

  onMount(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    theme = savedTheme;
    document.documentElement.setAttribute('data-mode', theme);
  });

  function toggleTheme() {
    theme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-mode', theme);
    localStorage.setItem('theme', theme);
  }

  $: isPostPage = $page.url.pathname.includes('/posts/');
  $: postTitle = $page.data?.metadata?.title || '';
  $: recentPosts = data.recentPosts ?? [];
  $: headings = $page.data?.headings ?? [];
</script>

<svelte:head>
  <title>{siteConfig.title} - {siteConfig.description}</title>
  <meta name="description" content={siteConfig.description} />
  <meta name="author" content={siteConfig.author} />
</svelte:head>

<div class="app-container">
  <div class="main-wrapper">
    <div class="content-area">
      <Topbar {theme} {toggleTheme} />

      <div class="content-wrapper" class:has-sidebar={isPostPage}>
        {#if isPostPage}
          <aside aria-label="Panel" class="sidebar-panel">
            <div class="panel-recent">
              <RecentlyUpdated {recentPosts} />
            </div>

            <div class="panel-toc-sticky">
              <TOC {headings} />
            </div>
          </aside>
        {/if}

        <main aria-label="Main Content" class="main-content" class:full-width={!isPostPage}>
          <slot />
        </main>
      </div>

      <Footer {isPostPage} {postTitle} />
    </div>
  </div>

  <BackToTop />
</div>
