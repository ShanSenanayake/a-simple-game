<script lang="ts">
  import { get } from 'svelte/store';
  import RiddleLayout from '../RiddleLayout.svelte';
  import VictoryOverlay from '../VictoryOverlay.svelte';
  import { gameState, currentStageGuesses } from '../../lib/gameState';

  const ANSWER = 'Njg='; // btoa('68')
  const SCAN_DURATION = 1400;

  let isAnimating = $state(false);
  let victoryAnswer = $state<number | null>(null);

  // 5-row grid: one row revealed per wrong guess
  const FILLED_CELLS = new Set([0, 1, 2, 3, 6, 7, 8, 11, 12, 13, 14]);
  let wrongGuessCount = $derived($currentStageGuesses.filter((g) => !g.correct).length);

  function handleSubmit(value: number): boolean {
    const correct = btoa(String(value)) === ANSWER;
    const countBefore = get(currentStageGuesses).length;
    gameState.addGuess(value, correct);
    const countAfter = get(currentStageGuesses).length;
    gameState.recordAttempt();

    if (correct) {
      gameState.solve();
      victoryAnswer = value;
      return false;
    }

    if (countAfter > countBefore) {
      isAnimating = true;
      setTimeout(() => {
        isAnimating = false;
      }, SCAN_DURATION);
    }

    return true;
  }
</script>

<RiddleLayout riddleNumber={2} guesses={$currentStageGuesses} {isAnimating} onSubmit={handleSubmit}>
  <div class="flex flex-col gap-5">
    <div>
      <p class="font-display text-display-xs text-grape mb-3 tracking-[1px]">CLUE 01</p>
      <div class="flex flex-col gap-1">
        <div class="flex items-center gap-3">
          <span class="font-mono text-lg tracking-widest text-ink">←←↓↓↓↓→→↑↑←</span>
        </div>
        <div class="flex items-center gap-3">
          <span class="font-mono text-lg tracking-widest text-ink">↑←←↓↓→→↓↓←←↑</span>
        </div>
      </div>
    </div>

    {#if wrongGuessCount > 0}
      <div class="mx-auto grid grid-cols-3 border-3 border-ink rounded-block overflow-hidden w-fit">
        {#each { length: wrongGuessCount * 3 }, idx (idx)}
          <div
            class="w-11 h-11 sm:w-14 sm:h-14 animate-row-slide-in
              {FILLED_CELLS.has(idx) ? 'bg-grape' : ''}
              {idx % 3 !== 2 ? 'border-r-3 border-r-ink' : ''}
              {Math.floor(idx / 3) < wrongGuessCount - 1 ? 'border-b-3 border-b-ink' : ''}"
          ></div>
        {/each}
      </div>
    {/if}
  </div>
</RiddleLayout>

{#if victoryAnswer !== null}
  <VictoryOverlay
    answer={victoryAnswer}
    targetSlotId="progress-slot-1"
    onAdvance={() => gameState.advance()}
  />
{/if}
