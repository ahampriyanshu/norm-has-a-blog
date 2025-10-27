<script lang="ts">
  import { getPosts } from '$lib/utils/posts';
  import { onMount } from 'svelte';
  import type { PostMetadata } from '$lib/utils/posts';

  let recentPosts: PostMetadata[] = [];

  onMount(async () => {
    const allPosts = await getPosts();
    recentPosts = allPosts.slice(0, 3);
  });
</script>

{#if recentPosts.length > 0}
  <div class="recently-updated">
    <h3 class="panel-heading">Recent Posts</h3>
    <ul class="post-list">
      {#each recentPosts as post}
        <li>
          <a href="/posts/{post.slug}" class="post-link">
            {post.title}
          </a>
        </li>
      {/each}
    </ul>
  </div>
{/if}

