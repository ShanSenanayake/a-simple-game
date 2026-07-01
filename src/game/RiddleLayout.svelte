<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { Guess } from './types';
  import RiddleProgress from './RiddleProgress.svelte';
  import RiddleCard from './RiddleCard.svelte';
  import GuessHistory from './GuessHistory.svelte';
  import RiddlePrompt from './RiddlePrompt.svelte';

  export type { Guess };

  interface Props {
    riddleNumber: number;
    guesses?: Guess[];
    onSubmit: (value: number) => boolean;
    isAnimating?: boolean;
    children: Snippet;
  }
  const totalRiddles = 4;
  let { riddleNumber, guesses = [], onSubmit, isAnimating = false, children }: Props = $props();
</script>

<main class="flex flex-col min-h-screen pt-16 pb-8 px-4 sm:px-6 max-w-2xl mx-auto w-full">
  <RiddleProgress {riddleNumber} {totalRiddles} />
  <RiddleCard {riddleNumber}>{@render children()}</RiddleCard>
  <section>
    <GuessHistory {guesses} />
    <RiddlePrompt {onSubmit} {isAnimating} />
  </section>
</main>
