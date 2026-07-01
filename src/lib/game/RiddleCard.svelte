<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    riddleNumber: number;
    children: Snippet;
  }

  let { riddleNumber, children }: Props = $props();
</script>

<section class="mb-6">
  <div class="bg-cream border-4 border-ink rounded-card p-4 sm:p-6 shadow-pixel shadow-grape-deep">
    <p class="font-display text-display-xs text-coral mb-4 tracking-[1px]">
      RIDDLE {String(riddleNumber).padStart(2, '0')}
    </p>
    {@render children()}
  </div>
</section>
