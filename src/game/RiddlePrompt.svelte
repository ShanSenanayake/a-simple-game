<script lang="ts">
  import Button from '../components/Button.svelte';

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
    const num = parseInt(inputValue, 10);
    if (!isNaN(num) && num > 99) inputValue = '99';
    if (!isNaN(num) && num < 0) inputValue = '0';
  }
</script>

<div class="flex items-center gap-2 {inputError ? 'animate-shake' : ''}">
  <input
    class="w-20 text-center font-mono text-3xl font-bold px-2 min-h-14 border-3 rounded-block bg-cream text-ink
      caret-transparent [caret-shape:block] focus:animate-terminal-blink outline-none
      {inputError ? 'border-coral' : 'border-ink'}"
    type="number"
    min="0"
    max="99"
    bind:value={inputValue}
    onkeydown={handleKeydown}
    oninput={handleInput}
    placeholder="00"
  />
  <Button on:click={handleSubmit}>SUBMIT</Button>
</div>
