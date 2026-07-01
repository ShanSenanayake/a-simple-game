<script lang="ts">
  import RiddleLayout from '../RiddleLayout.svelte';
  import { gameState, currentStageGuesses } from '../../lib/gameState';

  const clues = [
    { label: 'CLUE 01', content: 'Beware the leopard' },
    { label: 'CLUE 02', content: 'Vogon Poetry' },
    { label: 'CLUE 03', content: 'Always pack a towel' },
    { label: 'CLUE 04', content: 'So long and thanks for all the fish' },
    {
      label: 'CLUE 05',
      content: 'The Answer to the Ultimate Question of Life, the Universe, and Everything is: ',
    },
  ];

  let revealed = $state(clues.map(() => false));
  let guessCount = $derived($currentStageGuesses.length);

  function handleSubmit(value: number): boolean {
    const correct = false; // TODO: check against hashed answer
    gameState.addGuess(value, correct);
    gameState.recordAttempt();
    if (correct) gameState.solve();
    return !correct;
  }
</script>

<RiddleLayout riddleNumber={1} guesses={$currentStageGuesses} onSubmit={handleSubmit}>
  <div class="flex flex-col gap-4">
    {#each clues as clue, i}
      <div>
        <p class="font-display text-display-xs text-grape mb-2 tracking-[1px]">{clue.label}</p>
        {#if i > 0 && guessCount < i}
          <div
            class="w-full h-14 bg-grape rounded-block flex items-center justify-center overflow-hidden
              bg-[repeating-linear-gradient(-45deg,transparent,transparent_8px,rgba(0,0,0,0.2)_8px,rgba(0,0,0,0.2)_16px)]"
          >
            <div class="bg-ink rounded px-3 py-1.5 flex items-center gap-2 shrink-0">
              <span class="text-[14px]">🔒</span>
              <span class="font-display text-display-xs text-cream/70">
                {i - guessCount} GUESS{i - guessCount !== 1 ? 'ES' : ''} TO UNLOCK
              </span>
            </div>
          </div>
        {:else if revealed[i]}
          <p class="font-mono text-[14px] sm:text-[15px] leading-[1.7] text-ink animate-flip">
            {clue.content}
          </p>
        {:else}
          <button
            aria-label="Reveal {clue.label}"
            class="w-full h-9 bg-grape rounded-block cursor-pointer
              hover:bg-grape/70 transition-colors duration-150"
            onclick={() => (revealed[i] = true)}
          ></button>
        {/if}
      </div>
    {/each}
  </div>
</RiddleLayout>
