<script lang="ts">
  import { base } from '$app/paths';
  import type { PageData } from './$types';
  import { formatDate } from '$lib/utils/posts';

  export let data: PageData;
</script>

<svelte:head>
  <title>Archives | {data.siteConfig.title}</title>
</svelte:head>

<div class="archives-page">
  <h1 class="page-title">Archives</h1>

  <div class="timeline">
    {#each Array.from(data.archives) as [year, months]}
      <div class="year-section">
        <h2 class="year">{year}</h2>

        {#each Array.from(months) as [month, posts]}
          <div class="month-section">
            <h3 class="month">{month}</h3>

            <ul class="post-list">
              {#each posts as post}
                <li>
                  <time datetime={post.date}>{formatDate(post.date)}</time>
                  <a href="{base}/posts/{post.slug}">{post.title}</a>
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    {/each}
  </div>
</div>

