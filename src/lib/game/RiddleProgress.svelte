<script lang="ts">
  interface Props {
    riddleNumber: number;
    totalRiddles: number;
  }

  let { riddleNumber, totalRiddles }: Props = $props();
</script>

<section class="mt-2 mb-6">
  <div class="flex gap-2 flex-wrap">
    {#each { length: totalRiddles }, i}
      <div
        class="w-8 h-8 sm:w-9 sm:h-9 border-3 rounded-block flex items-center justify-center font-display text-display-xs
          {i + 1 < riddleNumber
          ? 'bg-mint-deep border-ink text-ink'
          : i + 1 === riddleNumber
            ? 'bg-mustard border-ink text-ink shadow-pixel-sm shadow-ink'
            : 'bg-cream border-ink text-ink/40'}"
      >
        {i + 1}
      </div>
    {/each}
  </div>
</section>
