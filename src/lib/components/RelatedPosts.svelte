<script lang="ts">
  import { getPosts, formatDate } from '$lib/utils/posts';
  import { onMount } from 'svelte';
  import type { PostMetadata } from '$lib/utils/posts';

  export let currentSlug: string;
  export let tags: string[] = [];

  let relatedPosts: PostMetadata[] = [];

  onMount(async () => {
    const allPosts = await getPosts();

    // Filter out current post and find related posts
    const otherPosts = allPosts.filter(post => post.slug !== currentSlug);

    // Score posts based on matching tags
    const scoredPosts = otherPosts.map(post => {
      let score = 0;

      // Add points for matching tags
      if (post.tags && tags) {
        const matchingTags = post.tags.filter(tag =>
          tags.includes(tag)
        ).length;
        score += matchingTags * 2;
      }

      return { post, score };
    });

    // Sort by score and get top 3, or just get latest 3 if no matches
    relatedPosts = scoredPosts
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(item => item.post);
  });
</script>

{#if relatedPosts.length > 0}
  <section class="related-posts">
    <h2 class="section-title">Further Reading</h2>

    <div class="posts-grid">
      {#each relatedPosts as post}
        <a href="/posts/{post.slug}" class="post-card">
          <div class="post-date">
            {formatDate(post.date)}
          </div>

          <h3 class="post-title">{post.title}</h3>

          {#if post.description}
            <p class="post-description">{post.description}</p>
          {/if}
        </a>
      {/each}
    </div>
  </section>
{/if}

