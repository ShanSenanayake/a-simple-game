<script lang="ts">
  import Header from '../components/Header.svelte';
  import Initial from '../game/Initial/Initial.svelte';
  import Riddle1 from '../game/riddle1/Riddle1.svelte';
  import Riddle2 from '../game/riddle2/Riddle2.svelte';
  import Riddle3 from '../game/riddle3/Riddle3.svelte';
  import { currentStage } from './gameState';

  export let onDesignSystem: () => void;
</script>

<Header {onDesignSystem} />

{#if $currentStage === 0}
  <Initial />
{:else if $currentStage === 1}
  <Riddle1 />
{:else if $currentStage === 2}
  <Riddle2 />
{:else if $currentStage === 3}
  <Riddle3 />
{/if}
