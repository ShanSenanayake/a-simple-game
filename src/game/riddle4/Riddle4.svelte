<script lang="ts">
  import { get } from 'svelte/store';
  import VictoryOverlay from '../VictoryOverlay.svelte';
  import RiddleProgress from '../RiddleProgress.svelte';
  import RiddleCard from '../RiddleCard.svelte';
  import { gameState, currentStageState } from '../../lib/gameState';

  const GRID = 3;
  const TOTAL = GRID * GRID;
  const EMPTY = TOTAL - 1;

  // Bullseye target — crosshair lines + concentric rings make misalignment obvious
  const svgSrc = `<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#4a3263"/>
      <stop offset="100%" stop-color="#2b2438"/>
    </linearGradient>
  </defs>
  <rect width="300" height="300" fill="url(#g)"/>
  <circle cx="150" cy="150" r="130" fill="none" stroke="#c4f0d4" stroke-width="16"/>
  <circle cx="150" cy="150" r="86" fill="none" stroke="#f2c14e" stroke-width="12"/>
  <circle cx="150" cy="150" r="42" fill="#f08a6c"/>
  <circle cx="150" cy="150" r="18" fill="#2b2438"/>
  <line x1="150" y1="0" x2="150" y2="300" stroke="#c4f0d4" stroke-width="6" opacity="0.35"/>
  <line x1="0" y1="150" x2="300" y2="150" stroke="#c4f0d4" stroke-width="6" opacity="0.35"/>
  <rect x="6" y="6" width="24" height="24" rx="4" fill="#f08a6c"/>
  <rect x="270" y="6" width="24" height="24" rx="4" fill="#f08a6c"/>
  <rect x="6" y="270" width="24" height="24" rx="4" fill="#f08a6c"/>
  <rect x="270" y="270" width="24" height="24" rx="4" fill="#f08a6c"/>
</svg>`;

  const IMAGE_URL = `data:image/svg+xml;base64,${btoa(svgSrc)}`;

  // CSS background-position for tile in its correct slot
  function bgPos(tileValue: number): string {
    const col = tileValue % GRID;
    const row = Math.floor(tileValue / GRID);
    return `${(col / (GRID - 1)) * 100}% ${(row / (GRID - 1)) * 100}%`;
  }

  // Generate a solvable shuffle by making random valid moves from the solved state
  function makeShuffle(): number[] {
    const t = Array.from({ length: TOTAL }, (_, i) => i);
    let empty = TOTAL - 1;
    for (let i = 0; i < 250; i++) {
      const r = Math.floor(empty / GRID);
      const c = empty % GRID;
      const adj: number[] = [];
      if (r > 0) adj.push(empty - GRID);
      if (r < GRID - 1) adj.push(empty + GRID);
      if (c > 0) adj.push(empty - 1);
      if (c < GRID - 1) adj.push(empty + 1);
      const next = adj[Math.floor(Math.random() * adj.length)];
      [t[empty], t[next]] = [t[next], t[empty]];
      empty = next;
    }
    return t;
  }

  const alreadySolved = get(currentStageState).solved;

  let tiles = $state(alreadySolved ? Array.from({ length: TOTAL }, (_, i) => i) : makeShuffle());
  let flipped = $state(alreadySolved);
  let shakingPos = $state<number | null>(null);
  let victoryAnswer = $state<number | null>(alreadySolved ? 0 : null);

  function clickTile(pos: number) {
    if (flipped) return;

    const emptyPos = tiles.indexOf(EMPTY);
    const eRow = Math.floor(emptyPos / GRID);
    const eCol = emptyPos % GRID;
    const tRow = Math.floor(pos / GRID);
    const tCol = pos % GRID;

    const adjacent =
      (Math.abs(eRow - tRow) === 1 && eCol === tCol) ||
      (Math.abs(eCol - tCol) === 1 && eRow === tRow);

    if (!adjacent) {
      shakingPos = pos;
      setTimeout(() => (shakingPos = null), 310);
      return;
    }

    const next = [...tiles];
    [next[emptyPos], next[pos]] = [next[pos], next[emptyPos]];
    tiles = next;

    if (next.every((v, i) => v === i)) {
      gameState.addGuess(0, true);
      gameState.solve();
      setTimeout(() => {
        flipped = true;
        setTimeout(() => (victoryAnswer = 0), 700);
      }, 300);
    }
  }
</script>

<main class="flex flex-col min-h-screen pt-16 pb-8 px-4 sm:px-6 max-w-2xl mx-auto w-full">
  <RiddleProgress riddleNumber={4} totalRiddles={4} />

  <RiddleCard riddleNumber={4}>
    <p class="font-mono text-[14px] sm:text-[15px] leading-[1.7] text-ink">
      Restore the image. The answer lies beneath.
    </p>
  </RiddleCard>

  <div class="flex justify-center mt-6">
    <!-- perspective wrapper -->
    <div class="w-full max-w-xs aspect-square" style="perspective: 900px;">
      <!-- flip container -->
      <div
        class="relative w-full h-full transition-[transform] duration-700 ease-in-out"
        style="transform-style: preserve-3d; transform: {flipped
          ? 'rotateY(180deg)'
          : 'rotateY(0deg)'};"
      >
        <!-- FRONT: sliding puzzle -->
        <div
          class="absolute inset-0 grid gap-1"
          style="backface-visibility: hidden; -webkit-backface-visibility: hidden;
                 grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(3, 1fr);"
        >
          {#each tiles as tileValue, pos}
            {#if tileValue === EMPTY}
              <div class="rounded-sm bg-ink/10"></div>
            {:else}
              <button
                type="button"
                aria-label="Tile {tileValue + 1}"
                class="rounded-sm border-2 border-ink/30 transition-transform duration-75 active:scale-95
                  {shakingPos === pos ? 'animate-shake' : ''}"
                style="background-image: url('{IMAGE_URL}');
                       background-size: {GRID * 100}% {GRID * 100}%;
                       background-position: {bgPos(tileValue)};
                       cursor: pointer;"
                onclick={() => clickTile(pos)}
              ></button>
            {/if}
          {/each}
        </div>

        <!-- BACK: revealed answer -->
        <div
          class="absolute inset-0 flex items-center justify-center bg-mint-deep border-3 border-ink rounded-card"
          style="backface-visibility: hidden; -webkit-backface-visibility: hidden;
                 transform: rotateY(180deg);"
        >
          <span
            class="font-display text-ink leading-none select-none"
            style="font-size: clamp(80px, 28vw, 160px);"
          >
            0
          </span>
        </div>
      </div>
    </div>
  </div>
</main>

{#if victoryAnswer !== null}
  <VictoryOverlay
    answer={victoryAnswer}
    targetSlotId="progress-slot-3"
    onAdvance={() => gameState.advance()}
  />
{/if}
