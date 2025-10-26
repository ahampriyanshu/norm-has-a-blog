<script lang="ts">
  import { siteConfig } from '$lib/config';

  const currentYear = new Date().getFullYear();
</script>

<footer class="site-footer">
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
      Using the
      <a href="https://github.com/ahampriyanshu/norm-has-a-blog" target="_blank" rel="noopener">
        <strong>{siteConfig.title}</strong>
      </a>
      theme for
      <strong>SvelteKit</strong>.
    </p>
  </div>
</footer>
