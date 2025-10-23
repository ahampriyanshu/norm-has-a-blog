<script lang="ts">
  import { siteConfig } from '$lib/config';

  const currentYear = new Date().getFullYear();
</script>

<footer class="site-footer">
  <div class="footer-content">
    <p>
      © {currentYear} <a href="/">{siteConfig.title}</a>
    </p>
    <p class="footer-credits">
      Powered by <a href="https://github.com/ahampriyanshu/norm-has-a-blog" target="_blank" rel="noopener">Norm Has A Blog</a>
    </p>
  </div>
</footer>

