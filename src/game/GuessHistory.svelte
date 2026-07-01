<script lang="ts">
  import type { Guess } from './types';

  interface Props {
    guesses: Guess[];
  }

  let { guesses }: Props = $props();
</script>

<div class="mb-4 bg-cream border-3 border-ink rounded-block overflow-hidden">
  <div class="px-3 pt-3 pb-2 border-b-3 border-ink/20">
    <p class="font-display text-display-xs text-grape tracking-[1px]">GUESSES</p>
  </div>

  <div class="grid grid-cols-5 gap-1 p-3 ivide-y divide-ink/10 max-h-40 overflow-y-auto">
    {#if guesses.length === 0}
      <p class="font-mono text-xl col-span-5 text-ink/40">no guesses yet...</p>
    {:else}
      {#each guesses as guess}
        <span class="text-ink text-center text-xl font-bold tabular-nums w-16 shrink-0"
          >{guess.value}</span
        >
      {/each}
    {/if}
  </div>
</div>
