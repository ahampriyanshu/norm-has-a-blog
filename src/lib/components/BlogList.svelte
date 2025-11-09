<script lang="ts">
  import { base } from '$app/paths';
  import type { PostMetadata } from '$lib/utils/posts';

  export let posts: PostMetadata[];

  function formatDateSimple(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
</script>

<ul class="blog-list">
  {#each posts as post}
    <li class="blog-item">
      <time class="blog-date" datetime={post.date}>{formatDateSimple(post.date)}</time>
      <span class="blog-separator">→</span>
      <a href="{base}/blog/{post.slug}" class="blog-link">
        {post.title}
      </a>
    </li>
  {/each}
</ul>
