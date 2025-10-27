<script lang="ts">
  import { base } from '$app/paths';
  import type { PostMetadata } from '$lib/utils/posts';

  export let recentPosts: PostMetadata[] = [];
</script>

{#if recentPosts.length > 0}
  <div class="recently-updated">
    <h3 class="panel-heading">Recent Posts</h3>
    <ul class="post-list">
      {#each recentPosts as post}
        <li>
          <a href="{base}/posts/{post.slug}" class="post-link">
            {post.title}
          </a>
        </li>
      {/each}
    </ul>
  </div>
{/if}
