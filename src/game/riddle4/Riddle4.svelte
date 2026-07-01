<script lang="ts">
  import { get } from 'svelte/store';
  import RiddleLayout from '../RiddleLayout.svelte';
  import VictoryOverlay from '../VictoryOverlay.svelte';
  import { gameState, currentStageGuesses } from '../../lib/gameState';

  const clues = [{ label: 'CLUE 01', content: '...' }];

  type ClueState = 'locked' | 'scanning' | 'revealed';

  const ANSWER = ''; // TODO: btoa('<answer>')
  const SCAN_DURATION = 1400;

  const initialCount = get(currentStageGuesses).length;
  let clueState = $state<ClueState[]>(
    clues.map((_, i) => (i === 0 || initialCount >= i ? 'revealed' : 'locked'))
  );

  let guessCount = $derived($currentStageGuesses.length);
  let isAnimating = $derived(clueState.some((s) => s === 'scanning'));
  let victoryAnswer = $state<number | null>(null);

  function handleSubmit(value: number): boolean {
    const correct = ANSWER !== '' && btoa(String(value)) === ANSWER;
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
      const newlyUnlockedIdx = countAfter;
      if (newlyUnlockedIdx < clues.length && clueState[newlyUnlockedIdx] === 'locked') {
        clueState[newlyUnlockedIdx] = 'scanning';
        setTimeout(() => {
          clueState[newlyUnlockedIdx] = 'revealed';
        }, SCAN_DURATION);
      }
    }

    return true;
  }
</script>

<RiddleLayout riddleNumber={4} guesses={$currentStageGuesses} {isAnimating} onSubmit={handleSubmit}>
  <div class="flex flex-col gap-4">
    {#each clues as clue, i}
      <div>
        <p class="font-display text-display-xs text-grape mb-2 tracking-[1px]">{clue.label}</p>
        {#if clueState[i] === 'locked'}
          <div
            class="w-full h-14 bg-grape rounded-block flex items-center justify-center overflow-hidden
              bg-[repeating-linear-gradient(-45deg,transparent,transparent_8px,rgba(0,0,0,0.2)_8px,rgba(0,0,0,0.2)_16px)]"
          >
            <div class="bg-ink rounded px-3 py-1.5 flex items-center gap-2 shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 text-cream/70 shrink-0"
                viewBox="0 0 24 24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  fill="currentColor"
                  d="M6 22q-.825 0-1.412-.587T4 20V10q0-.825.588-1.412T6 8h1V6q0-2.075 1.463-3.537T12 1t3.538 1.463T17 6v2h1q.825 0 1.413.588T20 10v10q0 .825-.587 1.413T18 22zm0-2h12V10H6zm7.413-3.588Q14 15.826 14 15t-.587-1.412T12 13t-1.412.588T10 15t.588 1.413T12 17t1.413-.587M9 8h6V6q0-1.25-.875-2.125T12 3t-2.125.875T9 6zM6 20V10z"
                />
              </svg>
              <span class="font-display text-display-xs text-cream/70">
                {i - guessCount} GUESS{i - guessCount !== 1 ? 'ES' : ''} TO UNLOCK
              </span>
            </div>
          </div>
        {:else if clueState[i] === 'scanning'}
          <div
            class="w-full h-14 bg-grape rounded-block overflow-hidden relative flex items-center justify-center"
          >
            <div
              class="absolute bottom-0 left-0 h-1 bg-cream/40 animate-[progress-fill_1.4s_linear_forwards]"
            ></div>
            <span
              class="font-display text-display-xs text-cream/80 animate-blink-block tracking-[1px]"
            >
              DECRYPTING...
            </span>
          </div>
        {:else}
          <p class="font-mono text-[14px] sm:text-[15px] leading-[1.7] text-ink animate-flip">
            {clue.content}
          </p>
        {/if}
      </div>
    {/each}
  </div>
</RiddleLayout>

{#if victoryAnswer !== null}
  <VictoryOverlay
    answer={victoryAnswer}
    targetSlotId="progress-slot-3"
    onAdvance={() => gameState.advance()}
  />
{/if}
