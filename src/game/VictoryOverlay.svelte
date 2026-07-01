<script lang="ts">
  interface Props {
    answer: number;
    targetSlotId: string;
    onAdvance: () => void;
  }
  let { answer, targetSlotId, onAdvance }: Props = $props();

  let numberEl: HTMLElement | undefined = $state();
  let phase = $state<'entering' | 'idle' | 'flying'>('entering');

  function handleAnimationEnd() {
    if (phase === 'entering') phase = 'idle';
  }

  function handleClick() {
    if (phase !== 'idle' || !numberEl) return;

    const targetEl = document.getElementById(targetSlotId);
    if (!targetEl) {
      onAdvance();
      return;
    }

    const targetRect = targetEl.getBoundingClientRect();
    const sourceRect = numberEl.getBoundingClientRect();

    const dx = targetRect.left + targetRect.width / 2 - (sourceRect.left + sourceRect.width / 2);
    const dy = targetRect.top + targetRect.height / 2 - (sourceRect.top + sourceRect.height / 2);
    const scale = targetRect.height / sourceRect.height;

    phase = 'flying';

    requestAnimationFrame(() => {
      if (!numberEl) return;
      numberEl.style.transition =
        'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease-in 0.1s';
      requestAnimationFrame(() => {
        if (!numberEl) return;
        numberEl.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
        numberEl.style.opacity = '0';
        setTimeout(onAdvance, 650);
      });
    });
  }
</script>

<div class="fixed inset-0 z-50">
  <div
    class="absolute inset-0 bg-ink/75 transition-opacity duration-400
      {phase === 'flying' ? 'opacity-0' : 'opacity-100'}"
  ></div>

  <div
    class="absolute inset-0 flex flex-col items-center justify-center
      {phase === 'flying' ? 'pointer-events-none' : 'cursor-pointer'}"
    onclick={handleClick}
    role="button"
    tabindex="0"
    aria-label="Continue to next riddle"
    onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick()}
  >
    <div
      bind:this={numberEl}
      class="font-display text-cream leading-none select-none
        {phase === 'entering' ? 'animate-victory-pop' : ''}"
      style="font-size: clamp(80px, 28vw, 180px);"
      onanimationend={handleAnimationEnd}
    >
      {answer}
    </div>

    {#if phase !== 'flying'}
      <p class="font-display text-display-xs text-cream/50 mt-8 tracking-[2px] animate-blink-block">
        TAP TO CONTINUE
      </p>
    {/if}
  </div>
</div>
