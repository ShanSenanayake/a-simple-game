<script lang="ts">
  import DesignSystem from './lib/DesignSystem.svelte';
  import ThemeToggle from './lib/ThemeToggle.svelte';
  import Button from './lib/Button.svelte';
  import { theme } from './lib/theme';

  let showDesignSystem = false;
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Space+Mono:wght@400;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div
  data-theme={$theme === 'arcade' ? 'arcade' : undefined}
  class="min-h-screen bg-mint font-mono text-ink transition-colors duration-200"
>
  {#if showDesignSystem}
    <DesignSystem onBack={() => (showDesignSystem = false)} />
  {:else}
    <div class="flex flex-col items-center justify-center min-h-screen gap-8 px-4">
      <h1 class="font-display text-display-lg text-primary leading-normal text-center">
        A Simple Game
      </h1>
      <ThemeToggle />
      <Button variant="ghost" on:click={() => (showDesignSystem = true)}>Design System</Button>
    </div>
  {/if}
</div>
