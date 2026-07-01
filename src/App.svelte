<script lang="ts">
  import DesignSystem from './lib/DesignSystem.svelte';
  import Game from './lib/Game.svelte';
  import { theme } from './lib/theme';

  let showDesignSystem = false;
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Space+Mono:wght@400;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<section
  data-theme={$theme === 'arcade' ? 'arcade' : undefined}
  class="min-h-screen bg-mint font-mono text-ink transition-colors duration-200"
>
  {#if showDesignSystem}
    <DesignSystem onBack={() => (showDesignSystem = false)} />
  {:else}
    <Game onDesignSystem={() => (showDesignSystem = true)} />
  {/if}
</section>
