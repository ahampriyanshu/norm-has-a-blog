<script context="module" lang="ts">
  export type DropdownAction = {
    label: string;
    icon?: string;
    ariaLabel?: string;
    onClick?: () => void | Promise<void>;
    href?: string;
    target?: string;
    rel?: string;
  };
</script>

<script lang="ts">
  import Icon from '$lib/components/Icon.svelte';
  import { onMount } from 'svelte';

  export let primaryAction: DropdownAction;
  export let dropdownItems: DropdownAction[] = [];
  export let dropdownAriaLabel = 'More options';

  let dropdownOpen = false;
  let dropdownButton: HTMLDivElement | null = null;

  function toggleDropdown() {
    dropdownOpen = !dropdownOpen;
  }

  async function handleAction(action: DropdownAction, closeAfter = false) {
    if (action.onClick) {
      await action.onClick();
    }

    if (closeAfter) {
      dropdownOpen = false;
    }
  }

  onMount(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownOpen && dropdownButton && !dropdownButton.contains(event.target as Node)) {
        dropdownOpen = false;
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<div class="copy-dropdown-container" bind:this={dropdownButton}>
  <div class="copy-dropdown-wrapper">
    {#if primaryAction.href}
      <a
        class="action-btn copy-btn"
        href={primaryAction.href}
        target={primaryAction.target}
        rel={primaryAction.rel}
        aria-label={primaryAction.ariaLabel ?? primaryAction.label}
        on:click={() => handleAction(primaryAction)}
      >
        {#if primaryAction.icon}
          <Icon name={primaryAction.icon} size={16} />
        {/if}
        <span>{primaryAction.label}</span>
      </a>
    {:else}
      <button
        type="button"
        class="action-btn copy-btn"
        on:click={() => handleAction(primaryAction)}
        aria-label={primaryAction.ariaLabel ?? primaryAction.label}
      >
        {#if primaryAction.icon}
          <Icon name={primaryAction.icon} size={16} />
        {/if}
        <span>{primaryAction.label}</span>
      </button>
    {/if}
    {#if dropdownItems.length > 0}
      <button
        type="button"
        class="action-btn copy-dropdown-arrow"
        on:click={toggleDropdown}
        aria-label={dropdownAriaLabel}
      >
        <Icon name="chevron-down" size={16} />
      </button>
    {/if}
  </div>
  {#if dropdownOpen && dropdownItems.length > 0}
    <div
      class="dropdown-menu"
      role="menu"
      tabindex="-1"
      on:click|stopPropagation
      on:keydown|stopPropagation
    >
      {#each dropdownItems as item (item.label)}
        {#if item.href}
          <a
            class="dropdown-item"
            href={item.href}
            target={item.target}
            rel={item.rel}
            aria-label={item.ariaLabel ?? item.label}
            on:click={() => handleAction(item, true)}
          >
            {#if item.icon}
              <Icon name={item.icon} size={14} />
            {/if}
            <span>{item.label}</span>
          </a>
        {:else}
          <button
            type="button"
            class="dropdown-item"
            on:click={() => handleAction(item, true)}
            aria-label={item.ariaLabel ?? item.label}
          >
            {#if item.icon}
              <Icon name={item.icon} size={14} />
            {/if}
            <span>{item.label}</span>
          </button>
        {/if}
      {/each}
    </div>
  {/if}
</div>
