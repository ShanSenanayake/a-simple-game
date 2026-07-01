<script lang="ts">
  import ThemeToggle from './ThemeToggle.svelte';
  import Button from './Button.svelte';
  import { gameState } from '../lib/gameState';

  export let onDesignSystem: () => void;
</script>

<header
  class="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 h-16 bg-mint-deep border-b-3 border-ink"
>
  <div class="flex items-center gap-2">
    <Button variant="ghost" on:click={onDesignSystem}>D</Button>
    <Button variant="ghost" on:click={() => gameState.reset()}>RST</Button>
  </div>
  <ThemeToggle />
</header>
