<script lang="ts">
  import Button from '../../Button.svelte';
  import { gameState } from '../../gameState';
</script>

<main class="flex flex-col items-center justify-center min-h-screen pt-16 gap-8 px-4">
  <h1 class="font-display text-display-lg text-primary leading-normal text-center">
    A Simple Game
  </h1>
  <Button size="l" on:click={() => gameState.advance()}>START</Button>
</main>
