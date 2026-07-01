<script lang="ts">
  interface Props {
    onSubmit: (value: number) => void;
  }

  let { onSubmit }: Props = $props();

  let inputValue = $state('');
  let inputError = $state(false);

  function handleSubmit() {
    const num = parseInt(inputValue, 10);
    if (isNaN(num) || inputValue.trim() === '') {
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
  <span class="font-mono text-[13px] text-grape-deep whitespace-nowrap shrink-0 hidden sm:inline">
    user@system:~$
  </span>
  <span class="font-mono text-[13px] text-grape-deep whitespace-nowrap shrink-0 sm:hidden">$</span>
  <input
    class="flex-1 font-mono text-[14px] px-3 min-h-11 border-3 rounded-block bg-white min-w-0
      {inputError ? 'border-coral' : 'border-ink'}"
    type="number"
    bind:value={inputValue}
    onkeydown={handleKeydown}
    placeholder="enter a number..."
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
