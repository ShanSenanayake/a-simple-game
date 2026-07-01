<script lang="ts">
  export let variant: 'primary' | 'ghost' = 'primary';
  export let size: 's' | 'm' | 'l' = 'm';
  let extraClass = '';
  export { extraClass as class };

  const sizeClasses = {
    s: 'text-display-xs px-3 py-2 min-h-11',
    m: 'text-display-xs px-4 py-3 min-h-11',
    l: 'text-display-sm px-6 py-5 min-h-14',
  };
</script>

<button
  type="button"
  class="font-display {sizeClasses[size]} border-3 border-ink rounded-block cursor-pointer
    transition duration-100 ease-out
    shadow-pixel-sm shadow-ink
    hover:-translate-x-0.75 hover:-translate-y-0.75 hover:shadow-pixel
    active:-translate-x-0.75 active:-translate-y-0.75 active:shadow-pixel
    {variant === 'primary' ? 'bg-secondary' : 'bg-cream text-ink'}
    {extraClass}"
  on:click
>
  <slot />
</button>
