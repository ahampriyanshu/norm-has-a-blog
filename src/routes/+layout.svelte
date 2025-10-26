<script lang="ts">
  import { page } from '$app/stores';
  import { siteConfig } from '$lib/config';
  import Topbar from '$lib/components/Topbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import BackToTop from '$lib/components/BackToTop.svelte';
  import TOC from '$lib/components/TOC.svelte';
  import RecentlyUpdated from '$lib/components/RecentlyUpdated.svelte';
  import '$lib/styles/louie.scss';
  import { onMount } from 'svelte';

  let theme = 'dark';

  onMount(() => {
    // Check for saved theme preference or default to 'dark' mode
    const savedTheme = localStorage.getItem('theme') || 'dark';
    theme = savedTheme;
    document.documentElement.setAttribute('data-mode', theme);
  });

  function toggleTheme() {
    theme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-mode', theme);
    localStorage.setItem('theme', theme);
  }

  // Check if we're on a post page
  $: isPostPage = $page.url.pathname.startsWith('/posts/');
</script>

<svelte:head>
  <title>{siteConfig.title} - {siteConfig.description}</title>
  <meta name="description" content={siteConfig.description} />
  <meta name="author" content={siteConfig.author} />
</svelte:head>

<div class="app-container">
  <div class="main-wrapper">
    <div class="content-area">
    

      <div class="content-wrapper" class:has-sidebar={isPostPage}>
        {#if isPostPage}
          <aside aria-label="Panel" class="sidebar-panel">
            <!-- Recent Posts - scrolls away -->
            <div class="panel-recent">
              <RecentlyUpdated />
            </div>
            
            <!-- TOC - becomes sticky -->
            <div class="panel-toc-sticky">
              <TOC />
            </div>
          </aside>
        {/if}

        <main aria-label="Main Content" class="main-content" class:full-width={!isPostPage}>
          <Topbar {theme} {toggleTheme} />
          <slot />
        </main>
      </div>

      <Footer />
    </div>
  </div>

  <BackToTop />
</div>
