<script lang="ts">
  import DesignSystem from './lib/DesignSystem.svelte';

  let showDesignSystem = false;
</script>

{#if showDesignSystem}
  <DesignSystem onBack={() => (showDesignSystem = false)} />
{:else}
  <div class="flex flex-col items-center justify-center min-h-screen gap-6">
    <h1 class="text-4xl font-bold">A Simple Game</h1>
    <button
      class="px-4 py-2 border-2 border-gray-800 rounded cursor-pointer hover:bg-gray-100"
      on:click={() => (showDesignSystem = true)}
    >Design System</button>
  </div>
{/if}
