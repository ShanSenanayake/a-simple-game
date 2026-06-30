<script lang="ts">
  export let variant: 'primary' | 'ghost' = 'primary';
</script>

<button
  type="button"
  class="font-display text-display-xs px-4 py-3 border-3 border-ink rounded-block cursor-pointer
    transition duration-100 ease-out
    shadow-pixel-sm shadow-ink
    hover:-translate-x-0.75 hover:-translate-y-0.75 hover:shadow-pixel
    active:-translate-x-0.75 active:-translate-y-0.75 active:shadow-pixel
    {variant === 'primary' ? 'bg-secondary text-secondary-fg' : 'bg-cream text-ink'}"
  on:click
>
  <slot />
</button>
