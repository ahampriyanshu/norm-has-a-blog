<script lang="ts">
  import { base } from '$app/paths';
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
          <li><a href="{base || '/'}">Home</a></li>
          <li><span class="separator">></span></li>
          <li><a href="{base}/archives">Posts</a></li>
          <li><span class="separator">></span></li>
          <li class="current">{postTitle}</li>
        </ol>
      </nav>
    {/if}

    <!-- Footer Main Content -->
    <div class="footer-main">
      <!-- Left Section: Profile & Contact -->
      <div class="footer-left">
        <div class="profile-image">
          <img src="{base}/logo.png" alt={siteConfig.author} />
        </div>
        
        <div class="profile-info">
          <h3 class="profile-name">{siteConfig.author}</h3>
          <p class="profile-title">{siteConfig.designation}</p>
          
          <div class="social-icons">
            <a href={siteConfig.contact.email} class="social-icon" aria-label="Email">
              <Icon name="mail" size={20} />
            </a>
            <a href={siteConfig.contact.telegram} target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Telegram">
              <Icon name="telegram" size={20} />
            </a>
            <a href={siteConfig.contact.github} target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="GitHub">
              <Icon name="github" size={20} />
            </a>
            <a href={siteConfig.contact.linkedin} target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="LinkedIn">
              <Icon name="linkedin" size={20} />
            </a>
          </div>
        </div>
      </div>

      <!-- Right Section: Link Columns -->
      <div class="footer-right">
        <!-- Projects Links -->
        <div class="footer-section">
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

  <!-- Original Simple Footer -->
  <div class="footer-divider" aria-hidden="true"></div>
  <div class="footer-content">
    <p class="footer-note">
      © {currentYear}
      <a href={siteConfig.aboutUrl} target="_blank" rel="noopener">
        <strong>{siteConfig.author}</strong>
      </a>  
    </p>
    <p class="footer-credits">
      Made with
      <a href="https://github.com/ahampriyanshu/norm-has-a-blog" target="_blank" rel="noopener">
        <strong>norm-has-a-blog</strong>
      </a>
    </p>
  </div>
</footer>
