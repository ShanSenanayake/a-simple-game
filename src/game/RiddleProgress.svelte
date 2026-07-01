<script lang="ts">
  interface Props {
    riddleNumber: number;
    totalRiddles: number;
  }

  let { riddleNumber, totalRiddles }: Props = $props();
</script>

<section class="mt-2 mb-6">
  <div class="grid gap-2 grid-cols-4">
    {#each { length: totalRiddles }, i}
      <div
        class="sm:h-16 h-8 border-3 rounded-block flex items-center justify-center font-display text-display-xs
          {i + 1 < riddleNumber
          ? 'bg-mint-deep border-ink text-ink'
          : i + 1 === riddleNumber
            ? 'bg-grape border-ink text-ink shadow-pixel-sm shadow-ink'
            : 'bg-cream border-ink text-ink/40'}"
      >
        {i + 1}
      </div>
    {/each}
  </div>
</section>
