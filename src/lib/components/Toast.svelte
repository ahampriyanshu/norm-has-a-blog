<script lang="ts">
  import { onMount } from 'svelte';
  
  export let message: string;
  export let duration: number = 3000;
  export let onClose: () => void;

  let visible = false;

  onMount(() => {
    // Trigger animation
    setTimeout(() => {
      visible = true;
    }, 10);

    // Auto-hide after duration
    const timer = setTimeout(() => {
      visible = false;
      setTimeout(onClose, 300); // Wait for fade out animation
    }, duration);

    return () => clearTimeout(timer);
  });
</script>

<div class="toast-container">
  <div class="toast" class:visible>
    <svg class="toast-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span class="toast-message">{message}</span>
  </div>
</div>

<style>
  .toast-container {
    position: fixed;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    pointer-events: none;
  }

  .toast {
    background: var(--heading-color);
    color: var(--main-bg);
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    opacity: 0;
    transform: translateY(-20px);
    transition: all 0.3s ease;
    font-size: 0.875rem;
    font-weight: 500;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .toast.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .toast-icon {
    flex-shrink: 0;
  }

  .toast-message {
    line-height: 1.4;
  }
</style>

