<script lang="ts">
  import { onMount } from 'svelte';
  import RiddleProgress from './RiddleProgress.svelte';
  import Button from '../components/Button.svelte';
  import { gameState } from '../lib/gameState';

  const TOTAL = 4;
  const BASE = 'https://store.steampowered.com/app/';

  let solvedAnswers = $derived(
    Array.from(
      { length: TOTAL },
      (_, i) => $gameState.stages[i + 1]?.guesses?.find((g) => g.correct)?.value ?? 0
    )
  );

  let urlSuffix = $state('');
  let isComplete = $state(false);
  let flyLabel = $state('');
  let flyEl: HTMLElement | undefined = $state(undefined);
  let urlAnchorEl: HTMLElement | undefined = $state(undefined);

  const raf = (n = 2) =>
    new Promise<void>((resolve) => {
      let count = 0;
      const tick = () => (++count >= n ? resolve() : requestAnimationFrame(tick));
      requestAnimationFrame(tick);
    });

  const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

  async function flyAnswer(idx: number) {
    const slotEl = document.getElementById(`progress-slot-${idx}`);
    const val = String(solvedAnswers[idx]);

    if (!slotEl || !flyEl || !urlAnchorEl) {
      urlSuffix += val;
      return;
    }

    flyLabel = val;

    const slotRect = slotEl.getBoundingClientRect();
    flyEl.style.width = `${slotRect.width}px`;
    flyEl.style.height = `${slotRect.height}px`;
    Object.assign(flyEl.style, {
      transition: 'none',
      left: `${slotRect.left + slotRect.width / 2}px`,
      top: `${slotRect.top + slotRect.height / 2}px`,
      transform: 'translate(-50%, -50%)',
      opacity: '1',
    });

    await raf(2);

    const anchorRect = urlAnchorEl.getBoundingClientRect();
    const dx = anchorRect.left - (slotRect.left + slotRect.width / 2);
    const dy = anchorRect.top + anchorRect.height / 2 - (slotRect.top + slotRect.height / 2);
    const scale = Math.max(0.15, anchorRect.height / slotRect.height);

    Object.assign(flyEl.style, {
      transition: 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-in 0.2s',
      transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(${scale})`,
      opacity: '0',
    });

    await sleep(650);
    urlSuffix += val;
    flyLabel = '';
    flyEl.style.opacity = '0';
  }

  onMount(async () => {
    await sleep(700);
    for (let i = 0; i < TOTAL; i++) {
      await flyAnswer(i);
      await sleep(300);
    }
    await sleep(150);
    isComplete = true;
  });
</script>

<main class="flex flex-col items-center px-6 pb-12 pt-20 gap-8">
  <div class="flex flex-col items-center gap-4 text-center">
    <p class="font-display text-display-xs text-grape tracking-[2px] animate-blink-block">
      MISSION COMPLETE
    </p>
    <h1 class="font-display text-display-lg text-ink leading-normal animate-victory-pop">
      YOU WIN
    </h1>
  </div>

  <div class="w-full max-w-sm">
    <RiddleProgress riddleNumber={5} totalRiddles={4} />
  </div>

  <div class="w-full max-w-sm flex flex-col gap-3">
    <p class="font-display text-display-xs text-grape tracking-[1px]">YOUR PRIZE</p>
    <div class="border-3 border-ink rounded-block bg-grape p-4">
      <p class="font-mono text-[13px] sm:text-[14px] text-cream leading-relaxed break-all">
        {BASE}{urlSuffix}{#if isComplete}/<span></span>{/if}<span
          bind:this={urlAnchorEl}
          class="inline-block w-0.5 h-[1.2em] bg-cream/70 align-middle {isComplete
            ? 'hidden'
            : 'animate-blink-block'}"
        ></span>
      </p>
    </div>

    {#if isComplete}
      <a href="{BASE}{urlSuffix}/" target="_blank" rel="noopener noreferrer" class="block">
        <Button size="l" class="w-full">CLAIM YOUR PRIZE</Button>
      </a>
    {/if}
  </div>

  {#if isComplete}
    <Button size="m" on:click={() => gameState.reset()}>PLAY AGAIN</Button>
  {/if}
</main>

<!-- Flying element styled to match the progress slots -->
<div
  bind:this={flyEl}
  class="fixed pointer-events-none z-50 font-display text-display-sm text-ink bg-mint-deep border-3 border-ink rounded-block flex items-center justify-center"
  style="opacity: 0; left: 0; top: 0;"
  aria-hidden="true"
>
  {flyLabel}
</div>
