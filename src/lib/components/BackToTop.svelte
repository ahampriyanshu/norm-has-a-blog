<script lang="ts">
  import { onMount } from 'svelte';
  import Icon from '$lib/components/Icon.svelte';

  let visible = false;

  onMount(() => {
    const handleScroll = () => {
      visible = window.scrollY > 500;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>

<aside aria-label="Scroll to Top">
  <button
    id="back-to-top"
    type="button"
    class="btn btn-lg btn-box-shadow"
    class:visible
    on:click={scrollToTop}
  >
    <Icon name="chevron-up" size={24} />
  </button>
</aside>

