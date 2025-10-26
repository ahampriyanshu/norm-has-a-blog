<script lang="ts">
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>Error | Page Not Found</title>
</svelte:head>

<div class="error-page">
  <div class="error-content">
    <h1>{$page.status}</h1>
    <h2>{$page.error?.message || 'Page Not Found'}</h2>
    <p>
      {#if $page.status === 404}
        The page you're looking for doesn't exist.
      {:else}
        An error occurred while processing your request.
      {/if}
    </p>
    <a href="/" class="btn btn-primary">
      Go Home
    </a>
  </div>
</div>

