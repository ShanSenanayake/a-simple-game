<script lang="ts">
  import { gameState } from '../lib/gameState';

  interface Props {
    riddleNumber: number;
    totalRiddles: number;
  }

  let { riddleNumber, totalRiddles }: Props = $props();

  function solvedAnswer(riddleIndex: number): number | undefined {
    // riddleIndex is 0-based; stage index = riddleIndex + 1 (stage 0 is Initial)
    return $gameState.stages[riddleIndex + 1]?.guesses?.find((g) => g.correct)?.value;
  }
</script>

<section class="mt-2 mb-6">
  <div class="grid gap-2 grid-cols-4">
    {#each { length: totalRiddles }, i}
      {@const completed = i + 1 < riddleNumber}
      {@const answer = completed ? solvedAnswer(i) : undefined}
      <div
        id="progress-slot-{i}"
        class="sm:h-16 h-8 border-3 rounded-block flex items-center justify-center font-display text-display-xs
          {completed
          ? 'bg-mint-deep border-ink text-ink'
          : i + 1 === riddleNumber
            ? 'bg-grape border-ink text-ink shadow-pixel-sm shadow-ink'
            : 'bg-cream border-ink text-ink/40'}"
      >
        {#if completed && answer !== undefined}
          {answer}
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              fill="currentColor"
              d="M10.6 16q0-2.025.363-2.912T12.5 11.15q1.025-.9 1.563-1.562t.537-1.513q0-1.025-.687-1.7T12 5.7q-1.275 0-1.937.775T9.125 8.05L6.55 6.95q.525-1.6 1.925-2.775T12 3q2.625 0 4.038 1.463t1.412 3.512q0 1.25-.537 2.138t-1.688 2.012Q14 13.3 13.738 13.913T13.475 16zm1.4 6q-.825 0-1.412-.587T10 20t.588-1.412T12 18t1.413.588T14 20t-.587 1.413T12 22"
            />
          </svg>
        {/if}
      </div>
    {/each}
  </div>
</section>
