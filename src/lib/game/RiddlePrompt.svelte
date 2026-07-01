<script lang="ts">
  interface Props {
    onSubmit: (value: number) => void;
  }

  let { onSubmit }: Props = $props();

  let inputValue = $state('');
  let inputError = $state(false);

  function handleSubmit() {
    const num = parseInt(inputValue, 10);
    if (isNaN(num) || inputValue.trim() === '' || num < 0 || num > 99) {
      inputError = true;
      setTimeout(() => (inputError = false), 400);
      return;
    }
    onSubmit(num);
    inputValue = '';
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') handleSubmit();
  }
</script>

<div class="flex items-center gap-2 {inputError ? 'animate-shake' : ''}">
  <input
    class="w-20 text-center font-mono text-3xl font-bold px-2 min-h-14 border-3 rounded-block bg-cream text-ink
      caret-transparent [caret-shape:block] focus:animate-terminal-blink
      {inputError ? 'border-coral' : 'border-ink'}"
    type="number"
    min="0"
    max="99"
    bind:value={inputValue}
    onkeydown={handleKeydown}
    placeholder="00"
  />
  <button
    class="font-display text-display-xs px-4 min-h-11 bg-secondary border-3 border-ink rounded-block
      cursor-pointer shadow-pixel-sm shadow-ink whitespace-nowrap shrink-0
      hover:-translate-x-0.75 hover:-translate-y-0.75 hover:shadow-pixel
      active:translate-x-0 active:translate-y-0 active:shadow-pixel-sm
      transition duration-100"
    onclick={handleSubmit}
  >
    SUBMIT
  </button>
</div>
