<script lang="ts">
  import { theme } from '../lib/theme';
</script>

<button
  class="relative inline-flex h-11 border-3 border-ink rounded-block shadow-pixel-sm shadow-ink overflow-hidden bg-cream cursor-pointer"
  on:click={() => theme.set($theme === 'mint' ? 'arcade' : 'mint')}
>
  <!-- sliding thumb -->
  <div
    class="absolute inset-y-0 left-0 w-1/2 bg-secondary pointer-events-none transition-transform duration-200 ease-in-out {$theme ===
    'arcade'
      ? 'translate-x-full'
      : 'translate-x-0'}"
  ></div>
  <!-- labels -->
  <div
    class="relative w-full z-10 font-display flex justify-center items-center px-1 text-display-xs transition-colors duration-200 {$theme ===
    'mint'
      ? 'text-secondary-fg'
      : 'text-ink'}"
  >
    TOGGLE THEME
  </div>
</button>
