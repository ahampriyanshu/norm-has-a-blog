<script lang="ts">
  import { base } from '$app/paths';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>Tags | {data.siteConfig.title}</title>
</svelte:head>

<div class="tags-page">
  <h1 class="page-title">Tags</h1>

  <div class="tag-cloud">
    {#each Array.from(data.tags) as [tag, count]}
      <a
        href="{base}/tags/{tag.toLowerCase()}"
        class="tag-item"
        style="font-size: {Math.min(1 + count * 0.2, 2)}rem"
      >
        {tag}
        <span class="count">({count})</span>
      </a>
    {/each}
  </div>
</div>

