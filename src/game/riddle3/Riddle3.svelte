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

<RiddleLayout riddleNumber={3} guesses={$currentStageGuesses} onSubmit={handleSubmit}>
  <div class="flex flex-col gap-4">
    <p>
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
  </div>
</RiddleLayout>

{#if victoryAnswer !== null}
  <VictoryOverlay
    answer={victoryAnswer}
    targetSlotId="progress-slot-2"
    onAdvance={() => gameState.advance()}
  />
{/if}
