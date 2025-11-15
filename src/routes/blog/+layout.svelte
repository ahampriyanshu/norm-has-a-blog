<script lang="ts">
  import type { LayoutData } from './$types';

  export let data: LayoutData;
  export let params: Record<string, string>;

  const __layoutProps = { data, params };
  void __layoutProps;
</script>

<slot />
