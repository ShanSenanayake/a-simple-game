<script lang="ts">
  import Button from '../components/Button.svelte';

  interface Props {
    title: string;
    body: string;
    onDismiss: () => void;
  }
  let { title, body, onDismiss }: Props = $props();
</script>

<div class="fixed inset-0 z-50 flex items-center justify-center p-4">
  <div class="absolute inset-0 bg-ink/70" onclick={onDismiss} role="presentation"></div>
  <div
    class="relative bg-cream border-3 border-ink rounded-block shadow-pixel shadow-ink max-w-sm w-full p-6 animate-victory-pop"
  >
    <p class="font-display text-display-xs text-grape mb-4 tracking-[1px]">{title}</p>
    <p class="font-mono text-[14px] leading-[1.7] text-ink mb-6">{body}</p>
    <Button on:click={onDismiss}>CONTINUE</Button>
  </div>
</div>
