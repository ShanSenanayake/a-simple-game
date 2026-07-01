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

  {#if guesses.length === 0}
    <p class="font-mono text-[12px] text-ink/40 px-3 py-3">no guesses yet...</p>
  {:else}
    <div class="divide-y divide-ink/10 max-h-40 overflow-y-auto">
      {#each guesses as guess, i}
        <div class="flex items-center gap-3 px-3 py-2 font-mono text-[13px]">
          <span class="text-grape text-[11px] w-12 shrink-0">#{i + 1}</span>
          <span class="text-ink font-bold tabular-nums w-16 shrink-0">{guess.value}</span>
          {#if guess.correct}
            <span class="font-display text-display-xs text-mint-deep">✓ CORRECT</span>
          {:else}
            <span class="font-display text-display-xs text-coral">✗ WRONG</span>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>
