<script lang="ts">
  type ThemeName = 'mint' | 'arcade';

  const themes: Record<ThemeName, { label: string; hex: Record<string, string> }> = {
    mint: {
      label: 'design system — retro mint & grape',
      hex: {
        mint: '#C4F0D4',
        'mint-deep': '#8FDAAB',
        grape: '#6B4C8A',
        'grape-deep': '#4A3263',
        mustard: '#F2C14E',
        coral: '#F08A6C',
      },
    },
    arcade: {
      label: 'design system — candy arcade',
      hex: {
        mint: '#1A1730',
        'mint-deep': '#2C2650',
        grape: '#FF4FD8',
        'grape-deep': '#00E5FF',
        mustard: '#FFE14D',
        coral: '#FF4FD8',
      },
    },
  };

  export let onBack: (() => void) | undefined = undefined;

  let theme: ThemeName = 'mint';

  $: current = themes[theme];

  const swatches: { key: string; name: string }[] = [
    { key: 'mint', name: 'mint' },
    { key: 'mint-deep', name: 'mint deep' },
    { key: 'grape', name: 'grape' },
    { key: 'grape-deep', name: 'grape deep' },
    { key: 'mustard', name: 'mustard' },
    { key: 'coral', name: 'coral' },
  ];
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Space+Mono:wght@400;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="bg-mint font-mono text-ink min-h-screen px-4 pt-20 pb-10 sm:px-6 sm:pt-24 sm:pb-12 transition-colors duration-200" data-theme={theme}>
  <div class="fixed top-4 right-4 sm:top-6 sm:right-6 flex gap-2 z-10">
    {#if onBack}
      <button
        class="font-display text-display-xs px-3 py-3 sm:px-3.5 sm:py-2.5 border-3 border-ink rounded-block bg-cream text-ink cursor-pointer"
        on:click={onBack}
      >← BACK</button>
    {/if}
    <button
      class="font-display text-display-xs px-3 py-3 sm:px-3.5 sm:py-2.5 border-3 border-ink rounded-block text-ink cursor-pointer {theme === 'mint' ? 'bg-mustard' : 'bg-cream'}"
      on:click={() => (theme = 'mint')}
    >MINT</button>
    <button
      class="font-display text-display-xs px-3 py-3 sm:px-3.5 sm:py-2.5 border-3 border-ink rounded-block text-ink cursor-pointer {theme === 'arcade' ? 'bg-mustard' : 'bg-cream'}"
      on:click={() => (theme = 'arcade')}
    >ARCADE</button>
  </div>

  <div class="max-w-220 mx-auto">
    <h1 class="font-display text-display-lg text-grape-deep leading-normal mb-2">RIDDLE&nbsp;QUEST</h1>
    <p class="text-[13px] sm:text-[15px] text-grape mb-8 sm:mb-12">{current.label}</p>

    <section class="mb-10 sm:mb-14">
      <h2 class="font-display text-display-sm text-grape-deep mb-4 tracking-[1px]">PALETTE</h2>
      <div class="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {#each swatches as s}
          <div
            class="rounded-block p-2 sm:p-3 min-h-17.5 flex flex-col justify-end border-3 border-ink"
            style="background: var(--color-{s.key}); color: var(--color-{s.key}-fg);"
          >
            <span class="text-[10px] block">{s.name}</span>
            <span class="text-[10px] font-bold block">{current.hex[s.key]}</span>
          </div>
        {/each}
      </div>
    </section>

    <section class="mb-10 sm:mb-14">
      <h2 class="font-display text-display-sm text-grape-deep mb-4 tracking-[1px]">TYPOGRAPHY</h2>
      <div class="bg-cream border-3 border-ink rounded-block p-4 sm:p-6">
        <p class="font-display text-display-sm sm:text-display-md text-grape-deep mb-3">A PIXEL TITLE</p>
        <p class="text-[14px] sm:text-[15px] leading-[1.6] mb-2">
          Body copy uses Space Mono — readable at riddle length, still feels like a terminal. "I
          have keys but no locks..."
        </p>
        <p class="text-display-sm text-grape">small mono caption / hint text</p>
      </div>
    </section>

    <section class="mb-10 sm:mb-14">
      <h2 class="font-display text-display-sm text-grape-deep mb-4 tracking-[1px]">RIDDLE CARD COMPONENT</h2>
      <div class="bg-cream border-4 border-ink rounded-card p-4 sm:p-7 shadow-pixel shadow-grape-deep">
        <p class="font-display text-[11px] text-coral mb-4">RIDDLE 03</p>
        <p class="text-[14px] sm:text-[16px] leading-[1.8] mb-6">
          I have keys but no locks. I have space but no room. You can enter, but you can't go
          inside. What am I?
        </p>
        <div class="flex gap-1.5 flex-wrap mb-6">
          <div class="w-7 h-7 bg-mint-deep text-ink flex items-center justify-center font-display text-[12px] border-2 border-ink rounded-block">K</div>
          <div class="w-7 h-7 bg-mint-deep text-ink flex items-center justify-center font-display text-[12px] border-2 border-ink rounded-block">E</div>
          <div class="w-7 h-7 bg-mint-deep text-ink flex items-center justify-center font-display text-[12px] border-2 border-ink rounded-block">Y</div>
          <div class="w-7 h-7 bg-grape rounded-block"></div>
          <div class="w-7 h-7 bg-grape rounded-block"></div>
          <div class="w-7 h-7 bg-grape rounded-block"></div>
          <div class="w-7 h-7 bg-grape rounded-block"></div>
          <div class="w-7 h-7 bg-grape rounded-block"></div>
        </div>
        <div class="flex gap-2.5">
          <input
            class="flex-1 font-mono text-[14px] px-3 py-3 sm:px-3.5 border-3 border-ink rounded-block bg-white min-w-0"
            type="text"
            placeholder="type your guess..."
          />
          <button class="font-display text-[11px] px-4 py-3 bg-mustard border-3 border-ink rounded-block cursor-pointer shadow-pixel-sm shadow-ink whitespace-nowrap">GUESS</button>
        </div>
      </div>
    </section>

    <section class="mb-10 sm:mb-14">
      <h2 class="font-display text-display-sm text-grape-deep mb-4 tracking-[1px]">FEEDBACK STATES</h2>
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1 border-3 border-ink rounded-block p-4 text-[13px] bg-mint-deep">
          <span class="font-display text-[10px] mb-2 inline-block">CORRECT</span>
          <div>blocks flip to mint, riddle text revealed</div>
        </div>
        <div class="flex-1 border-3 border-ink rounded-block p-4 text-[13px] bg-[#f3c9c0]">
          <span class="font-display text-[10px] mb-2 inline-block">WRONG GUESS</span>
          <div>card shakes, border flashes coral</div>
        </div>
        <div class="flex-1 border-3 border-ink rounded-block p-4 text-[13px] bg-grape-light">
          <span class="font-display text-[10px] mb-2 inline-block">HINT USED</span>
          <div>one block reveals early, grape tint</div>
        </div>
      </div>
    </section>
  </div>
</div>
