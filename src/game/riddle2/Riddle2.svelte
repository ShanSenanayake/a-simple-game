<script lang="ts">
  import { get } from 'svelte/store';
  import RiddleLayout from '../RiddleLayout.svelte';
  import VictoryOverlay from '../VictoryOverlay.svelte';
  import { gameState, currentStageGuesses } from '../../lib/gameState';

  const ANSWER = 'Njg='; // btoa('68')
  const SCAN_DURATION = 1400;

  let isAnimating = $state(false);
  let victoryAnswer = $state<number | null>(null);

  type Dir = 'u' | 'd' | 'l' | 'r';

  const ROW1: Dir[] = ['l', 'l', 'd', 'd', 'd', 'd', 'r', 'r', 'u', 'u', 'l'];
  const ROW2: Dir[] = ['u', 'l', 'l', 'd', 'd', 'r', 'r', 'd', 'd', 'l', 'l', 'u'];

  // Up arrow is the base; rotate for other directions
  const ROTATION: Record<Dir, number> = { u: 0, r: 90, d: 180, l: 270 };

  // Per-arrow coloring order: the number is the wrong-guess count needed to color that arrow.
  // null = never colored. Indices match ROW1/ROW2 positions.
  // ROW1: l  l  d  d  d  d  r  r  u  u  l
  const ROW1_ORDER: number[] = [1, 1, 2, 3, 4, 5, 5, 5, 4, 3, 3];
  // ROW2: u  l  l  d  d  r  r  d  d  l  l  u
  const ROW2_ORDER: number[] = [1, 1, 1, 2, 3, 3, 3, 4, 5, 5, 5, 4];

  function arrowClass(order: number | null, wrongCount: number): string {
    return order !== null && wrongCount >= order ? 'text-grape' : 'text-ink';
  }

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

      {#snippet arrowSvg(dir: Dir, cls: string)}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.25em"
          height="1.25em"
          viewBox="0 0 24 24"
          class="inline-block shrink-0 {cls}"
          style="transform: rotate({ROTATION[dir]}deg);"
          aria-hidden="true"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            fill="currentColor"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linejoin="round"
            stroke-linecap="round"
            d="M11 20V7.75L5.75 13L5 12.34l6.5-6.5l6.5 6.5l-.75.66L12 7.75V20z"
          />
        </svg>
      {/snippet}

      <div class="flex flex-col gap-2">
        <div class="grid grid-cols-11 gap-1">
          {#each ROW1 as dir, i}
            {@render arrowSvg(dir, arrowClass(ROW1_ORDER[i], wrongGuessCount))}
          {/each}
        </div>
        <div class="grid grid-cols-12 gap-1">
          {#each ROW2 as dir, i}
            {@render arrowSvg(dir, arrowClass(ROW2_ORDER[i], wrongGuessCount))}
          {/each}
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
