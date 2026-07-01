<script lang="ts">
  import RiddleLayout from '../RiddleLayout.svelte';
  import { gameState, currentStageGuesses } from '../../lib/gameState';

  function handleSubmit(value: number): boolean {
    const correct = false; // TODO: check against hashed answer
    gameState.addGuess(value, correct);
    gameState.recordAttempt();
    if (correct) gameState.solve();
    return !correct;
  }
</script>

<RiddleLayout riddleNumber={1} guesses={$currentStageGuesses} onSubmit={handleSubmit}>
  <p class="font-mono text-[15px] sm:text-[16px] leading-[1.8] text-ink">Coming soon...</p>
</RiddleLayout>
