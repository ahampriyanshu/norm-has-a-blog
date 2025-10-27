<script lang="ts">
  import { siteConfig } from '$lib/config';
  import Icon from '$lib/components/Icon.svelte';

  export let isPostPage = false;
  export let postTitle = '';

  const currentYear = new Date().getFullYear();
</script>

<footer class="site-footer">
  <!-- Enhanced Footer Section -->
  <div class="footer-enhanced">
    <!-- Breadcrumb (only on post pages) -->
    {#if isPostPage && postTitle}
      <nav class="footer-breadcrumb" aria-label="Breadcrumb">
        <ol class="breadcrumb-list">
          <li><a href="/">Home</a></li>
          <li><span class="separator">></span></li>
          <li><a href="/archives">Posts</a></li>
          <li><span class="separator">></span></li>
          <li class="current">{postTitle}</li>
        </ol>
      </nav>
    {/if}

    <!-- Footer Main Content -->
    <div class="footer-main">
      <!-- Company Info -->
      <div class="footer-section footer-brand">
        <div class="brand-logo">
          <Icon name="home" size={32} />
        </div>
        <h3 class="brand-name">{siteConfig.title}</h3>
        <p class="brand-tagline">{siteConfig.tagline}</p>
      </div>

      <!-- Contact Us -->
      <div class="footer-section">
        <h4 class="footer-heading">Contact Us</h4>
        <ul class="footer-links">
          <li>
            <a href={siteConfig.contact.email} class="footer-link">
              <Icon name="link" size={14} />
              <span>Email</span>
            </a>
          </li>
          <li>
            <a href={siteConfig.contact.telegram} target="_blank" rel="noopener noreferrer" class="footer-link">
              <Icon name="telegram" size={14} />
              <span>Telegram</span>
            </a>
          </li>
          <li>
            <a href={siteConfig.contact.github} target="_blank" rel="noopener noreferrer" class="footer-link">
              <Icon name="link" size={14} />
              <span>GitHub</span>
            </a>
          </li>
          <li>
            <a href={siteConfig.contact.linkedin} target="_blank" rel="noopener noreferrer" class="footer-link">
              <Icon name="linkedin" size={14} />
              <span>LinkedIn</span>
            </a>
          </li>
        </ul>
      </div>

      <!-- Projects Links -->
      <div class="footer-section">
        <h4 class="footer-heading">Projects</h4>
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

      <!-- Blog Links -->
      <div class="footer-section">
        <h4 class="footer-heading">Blogs</h4>
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

      <!-- Personal Collection -->
      <div class="footer-section">
        <h4 class="footer-heading">Personal</h4>
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

  <!-- Original Simple Footer -->
  <div class="footer-divider" aria-hidden="true"></div>
  <div class="footer-content">
    <p class="footer-note">
      © {currentYear}
      <a href={siteConfig.aboutUrl} target="_blank" rel="noopener">
        <strong>{siteConfig.author}</strong>
      </a>.
      Some rights reserved.
    </p>
    <p class="footer-credits">
      Made with ❤️ and
      <a href="https://github.com/{siteConfig.githubUsername}/{siteConfig.githubRepo}" target="_blank" rel="noopener">
        <strong>{siteConfig.title}</strong>
      </a>
    </p>
  </div>
</footer>
