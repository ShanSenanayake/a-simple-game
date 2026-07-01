<script lang="ts">
  import { get } from 'svelte/store';
  import RiddleLayout from '../RiddleLayout.svelte';
  import VictoryOverlay from '../VictoryOverlay.svelte';
  import HintPopup from '../HintPopup.svelte';
  import { gameState, currentStageGuesses } from '../../lib/gameState';
  import type { Guess } from '../../lib/gameState';

  const ANSWER = 'NTk='; // btoa('59')
  const DELAY = 1400;

  let isProcessing = $state(false);
  let victoryAnswer = $state<number | null>(null);
  let hintMessage = $state<{ title: string; body: string } | null>(null);

  let isAnimating = $derived(isProcessing);

  function computeHint(value: number, prev: Guess[]): { title: string; body: string } | null {
    const had16 = prev.some((g) => g.value === 16);
    const had32 = prev.some((g) => g.value === 32);
    const newWrongCount = prev.filter((g) => !g.correct).length + 1;
    const newHas16 = had16 || value === 16;
    const newHas32 = had32 || value === 32;

    if (newHas16 && newHas32 && newWrongCount >= 5) {
      return {
        title: 'A CLEARER HINT.',
        body: 'Count every word in the riddle text. Each one matters. That total is your answer.',
      };
    }

    if (value === 16 && !had16) {
      return {
        title: 'WELL REASONED.',
        body: "The math checks out perfectly. But something else is hidden in this riddle — look closely at what's highlighted. It might point you somewhere unexpected.",
      };
    }

    if (value === 32 && !had16) {
      return {
        title: 'NOT QUITE.',
        body: 'The answer is there in the riddle itself. Try reading it more carefully from the beginning.',
      };
    }

    if (newHas16 && newHas32 && (value === 16 || value === 32)) {
      return {
        title: 'NEITHER IS CORRECT.',
        body: "You've found the mathematical solution and its double. Neither is the true answer. Have you tried counting something in the text?",
      };
    }

    return null;
  }

  function handleSubmit(value: number): boolean {
    const correct = btoa(String(value)) === ANSWER;
    const prevGuesses = get(currentStageGuesses);
    const countBefore = prevGuesses.length;

    gameState.addGuess(value, correct);
    const countAfter = get(currentStageGuesses).length;
    gameState.recordAttempt();

    if (correct) {
      gameState.solve();
      victoryAnswer = value;
      return false;
    }

    if (countAfter > countBefore) {
      const hint = computeHint(value, prevGuesses);
      if (hint) {
        hintMessage = hint;
      } else {
        isProcessing = true;
        setTimeout(() => {
          isProcessing = false;
        }, DELAY);
      }
    }

    return true;
  }
</script>

<RiddleLayout riddleNumber={3} guesses={$currentStageGuesses} {isAnimating} onSubmit={handleSubmit}>
  <div class="flex flex-col gap-4">
    <p class="font-mono text-[14px] sm:text-[15px] leading-[1.9] text-ink">
      <span class="text-coral">T</span>hey say time improves a fine wine, and
      <span class="text-coral">I</span>
      am no exception. Curren<span class="text-coral">t</span>ly, I am twice as old as my younger
      brot<span class="text-coral">h</span>er. <span class="text-coral">T</span>ime stops for no
      one, however.
      <span class="text-coral">W</span>hen next year arrives, the unive<span class="text-coral"
        >r</span
      >se dic<span class="text-coral">t</span>ates that our combined ages will equal exactl<span
        class="text-coral">y</span
      >
      twenty-six. Every decade I become wiser, n<span class="text-coral">o</span>w tell me my
      friend: What is my current age today?
    </p>

    {#if isProcessing}
      <div class="flex items-center gap-2 pt-1">
        <span class="font-display text-display-xs text-grape/60 animate-blink-block tracking-[1px]">
          PROCESSING...
        </span>
      </div>
    {/if}
  </div>
</RiddleLayout>

{#if hintMessage !== null}
  <HintPopup
    title={hintMessage.title}
    body={hintMessage.body}
    onDismiss={() => (hintMessage = null)}
  />
{/if}

{#if victoryAnswer !== null}
  <VictoryOverlay
    answer={victoryAnswer}
    targetSlotId="progress-slot-2"
    onAdvance={() => gameState.advance()}
  />
{/if}
