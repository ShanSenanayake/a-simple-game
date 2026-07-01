<script lang="ts">
  import Header from './Header.svelte';
  import Initial from './game/Initial/Initial.svelte';
  import Riddle1 from './game/riddle1/Riddle1.svelte';
  import { currentStage } from './gameState';

  export let onDesignSystem: () => void;
</script>

<Header {onDesignSystem} />

{#if $currentStage === 0}
  <Initial />
{:else if $currentStage === 1}
  <Riddle1 />
{/if}
