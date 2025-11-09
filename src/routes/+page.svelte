<script lang="ts">
  import { base } from '$app/paths';
  import type { PageData } from './$types';

  export let data: PageData;

  function formatDateSimple(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
</script>

<svelte:head>
  <title>{data.siteConfig.author}</title>
  <meta name="description" content={data.siteConfig.description} />

  <!-- Canonical URL -->
  <link rel="canonical" href="{data.siteConfig.baseURL}{data.siteConfig.subPath}/" />

  <!-- OpenGraph meta tags for homepage -->
  <meta property="og:site_name" content={data.siteConfig.title} />
  <meta property="og:title" content={data.siteConfig.author} />
  <meta property="og:description" content={data.siteConfig.description} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="{data.siteConfig.baseURL}{data.siteConfig.subPath}/" />
  <meta property="og:image" content="{data.siteConfig.baseURL}{data.siteConfig.subPath}/user.jpg" />
  <meta property="og:image:alt" content={data.siteConfig.author} />
  <meta property="og:locale" content={data.siteConfig.lang} />

  <!-- Twitter Card meta tags for homepage -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={data.siteConfig.author} />
  <meta name="twitter:description" content={data.siteConfig.description} />
  <meta
    name="twitter:image"
    content="{data.siteConfig.baseURL}{data.siteConfig.subPath}/user.jpg"
  />
  {#if data.siteConfig.twitterHandle}
    <meta name="twitter:site" content="@{data.siteConfig.twitterHandle}" />
    <meta name="twitter:creator" content="@{data.siteConfig.twitterHandle}" />
  {/if}
</svelte:head>

<div class="homepage">
  <div class="hero-section">
    <div class="profile-image-wrapper">
      <img src="{base}/user.jpg" alt={data.siteConfig.author} class="profile-image" />
    </div>

    <div class="hero-content">
      <h1 class="hero-title">Hi, I'm Priyanshu 👋</h1>

      <div class="bio-section">
        <p class="bio-text">
          I'm a full stack developer and history buff, currently working as a Senior Software
          Engineer at HackerRank. In my current team, we are building <a
            href="https://skillup.hackerrank.com"
            rel="noopener noreferrer"
            target="_blank">SkillUp</a
          > from scratch.
        </p>
        <p class="bio-text">
          Apart from programming, I am interested in history, which I tried pursuing academically
          before and after my engineering gradution(but dropped both the times, will try again in
          the future).
        </p>
        <p class="bio-text">
          I lived as nomad for the 3 years, stayed(and worked) in <a
            href="https://supertrips.ahampriyanshu.com"
            rel="noopener noreferrer"
            target="_blank">100+ cities</a
          > across India. Something I would like to do internationally in the next decade.
        </p>
        <p class="bio-text">
          This blog includes my notes on programming, personal finance, and whatever else I'm
          figuring out. To collaborate on something interesting, feel free to <a
            href="mailto:vayampriyanshu@gmail.com&subject=Hey"
            rel="noopener noreferrer"
            target="_blank">reach out to me</a
          >
        </p>
      </div>
    </div>
  </div>

  {#if data.pinnedPosts && data.pinnedPosts.length > 0}
    <div class="featured-section blog-page">
      <h2 class="featured-heading">Featured Posts</h2>
      <ul class="blog-list">
        {#each data.pinnedPosts as post}
          <li class="blog-item">
            <time class="blog-date" datetime={post.date}>{formatDateSimple(post.date)}</time>
            <a href="{base}/blog/{post.slug}" class="blog-link">
              {post.title}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>

<style lang="scss">
  .homepage {
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .hero-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    text-align: center;
  }

  .profile-image-wrapper {
    width: 200px;
    height: 200px;
    overflow: hidden;
    border-radius: 24px;
    box-shadow: var(--card-shadow);
  }

  .profile-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .hero-content {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .hero-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0;
    color: var(--heading-color);
  }

  .bio-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
  }

  .bio-text {
    font-size: 1.1rem;
    line-height: 1.7;
    color: var(--text-color);
    margin: 0;
    text-align: left;
  }

  @media (min-width: 768px) {
    .homepage {
      padding: 0rem 0rem 4rem;
    }

    .hero-section {
      gap: 3rem;
    }

    .profile-image-wrapper {
      margin-top: 90px;
      width: 250px;
      height: 250px;
    }

    .hero-title {
      font-size: 3rem;
    }
  }

  @media (min-width: 1024px) {
    .hero-section {
      flex-direction: row;
      text-align: left;
      align-items: flex-start;
    }

    .profile-image-wrapper {
      order: 2;
    }

    .hero-content {
      order: 1;
    }
  }

  .featured-section {
    margin-top: 4rem;

    .blog-item {
      gap: 0.5rem;
    }
  }

  .featured-heading {
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 1rem 0;
    color: var(--heading-color);
  }
</style>
