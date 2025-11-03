<script lang="ts">
  import { base } from '$app/paths';
  import { siteConfig } from '$lib/config';
  import Icon from '$lib/components/Icon.svelte';

  export let isPostPage = false;
  export let postTitle = '';

  const startYear = 2022;
  const currentYear = new Date().getFullYear();

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>

<footer class="site-footer">
  <div class="footer-enhanced">
    {#if isPostPage && postTitle}
      <nav class="footer-breadcrumb" aria-label="Breadcrumb">
        <ol class="breadcrumb-list">
          <li><a href={base || '/'}>Home</a></li>
          <li><span class="separator">></span></li>
          <li><a href="{base}/archives">Posts</a></li>
          <li><span class="separator">></span></li>
          <li class="current">{postTitle}</li>
        </ol>
      </nav>
    {/if}

    <div class="footer-main">
      <div class="footer-left">
        <div class="profile-image-wrapper">
          <div class="profile-image">
            <img src="{base}/logo.png" alt={siteConfig.author} />
          </div>

          <button
            class="footer-cta"
            on:click={() =>
              (window.location.href = `${siteConfig.contact.email}?subject=Let's Collaborate!`)}
          >
            Let's collaborate!
          </button>
        </div>

        <div class="profile-info">
          <h3 class="profile-name">{siteConfig.author}</h3>
          <p class="profile-title">{siteConfig.designation}</p>

          <div class="social-icons">
            <a
              href={siteConfig.contact.twitter}
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon"
              aria-label="X (Twitter)"
            >
              <Icon name="twitter" size={18} />
            </a>
            <a
              href={siteConfig.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon"
              aria-label="GitHub"
            >
              <Icon name="github" size={18} />
            </a>
            <a
              href={siteConfig.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon"
              aria-label="LinkedIn"
            >
              <Icon name="linkedin" size={18} />
            </a>
            <a
              href={siteConfig.contact.resume}
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon"
              aria-label="Resume"
            >
              <Icon name="file-text" size={18} />
            </a>
          </div>
        </div>
      </div>

      <div class="footer-right">
        <div class="footer-section">
          <h4 class="footer-section-title">Projects</h4>
          <ul class="footer-links">
            {#each siteConfig.footerLinks.projects as link}
              <li>
                <a href={link.url} class="footer-link">
                  {link.name}
                </a>
              </li>
            {/each}
          </ul>
        </div>

        <div class="footer-section">
          <h4 class="footer-section-title">Blogs</h4>
          <ul class="footer-links">
            {#each siteConfig.footerLinks.blogs as link}
              <li>
                <a href={link.url} class="footer-link">
                  {link.name}
                </a>
              </li>
            {/each}
          </ul>
        </div>

        <div class="footer-section">
          <h4 class="footer-section-title">Personal</h4>
          <ul class="footer-links">
            {#each siteConfig.footerLinks.personal as link}
              <li>
                <a
                  href={link.url}
                  class="footer-link"
                  target={link.url.startsWith('http') ? '_blank' : undefined}
                  rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {link.name}
                </a>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div class="footer-divider" aria-hidden="true"></div>
  <div class="footer-content">
    <div class="footer-credits">
      <p class="footer-credits-norm">
        Made with
        <a href="https://github.com/ahampriyanshu/norm-has-a-blog" target="_blank" rel="noopener">
          <strong>norm-has-a-blog</strong>
        </a>
      </p>
      <p class="footer-credits-license">
        Copyright © {startYear} - {currentYear}. Distributed under
        <a
          href="https://github.com/ahampriyanshu/norm-has-a-blog/blob/main/LICENSE"
          target="_blank"
          rel="noopener">MIT</a
        >
        license.
      </p>
    </div>
    <div class="footer-actions">
      <a href="{base}/rss.xml" class="subscribe-link" aria-label="Subscribe to RSS feed">
        <Icon name="rss" size={16} />
        <span>Subscribe</span>
      </a>
      <button class="scroll-to-top" on:click={scrollToTop} aria-label="Scroll to top">
        <Icon name="chevron-up" size={16} />
      </button>
    </div>
  </div>
</footer>
