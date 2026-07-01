<script lang="ts">
  import Button from '../components/Button.svelte';

  interface Props {
    onSubmit: (value: number) => boolean;
    isAnimating?: boolean;
  }

  let { onSubmit, isAnimating = false }: Props = $props();

  let inputValue = $state<number | ''>('');
  let inputError = $state(false);

  function handleSubmit() {
    const num = Number(inputValue);
    if (inputValue === '' || !Number.isInteger(num) || num < 0 || num > 99) {
      inputError = true;
      setTimeout(() => (inputError = false), 400);
      return;
    }
    if (onSubmit(num)) {
      inputError = true;
      setTimeout(() => (inputError = false), 400);
    }
    inputValue = '';
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      handleSubmit();
      return;
    }
    const passthrough = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if (!passthrough.includes(e.key) && !/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  }

  function handleInput() {
    if (inputValue === '') return;
    const num = Number(inputValue);
    if (num > 99) inputValue = 99;
    if (num < 0) inputValue = 0;
  }
</script>

<div class="flex justify-center gap-2 {inputError ? 'animate-shake' : ''}">
  <input
    class="w-20 text-center font-mono text-3xl font-bold px-2 min-h-14 border-3 rounded-block bg-cream text-ink
      caret-transparent [caret-shape:block] focus:animate-terminal-blink outline-none
      {inputError ? 'border-coral' : 'border-ink'}
      {isAnimating ? 'opacity-40 cursor-not-allowed' : ''}"
    type="number"
    min="0"
    max="99"
    disabled={isAnimating}
    bind:value={inputValue}
    onkeydown={handleKeydown}
    oninput={handleInput}
    placeholder="00"
  />
  <Button on:click={handleSubmit} disabled={isAnimating}>SUBMIT</Button>
</div>
