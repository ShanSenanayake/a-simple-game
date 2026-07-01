<script lang="ts">
  import RiddleLayout from '../RiddleLayout.svelte';
  import type { Guess } from '../types.ts';
  import { gameState } from '../../lib/gameState';

  let guesses = $state<Guess[]>([]);

  function handleSubmit(value: number) {
    const correct = false; // TODO: check against hashed answer
    guesses = [...guesses, { value, correct }];
    gameState.recordAttempt();
    if (correct) gameState.solve();
  }
</script>

<RiddleLayout riddleNumber={1} {guesses} onSubmit={handleSubmit}>
  <p class="font-mono text-[15px] sm:text-[16px] leading-[1.8] text-ink">Coming soon...</p>
</RiddleLayout>
