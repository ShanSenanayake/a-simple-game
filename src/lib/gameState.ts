import { writable, derived } from 'svelte/store';

export type Guess = { value: number; correct: boolean };

export type StageState = {
  solved: boolean;
  attempts: number;
  hintsUsed: number;
  guesses: Guess[];
};

export type GameState = {
  currentStage: number;
  stages: Record<number, StageState>;
};

const STORAGE_KEY = 'riddle-game-state';

const DEFAULT_STATE: GameState = {
  currentStage: 0,
  stages: {},
};

const DEFAULT_STAGE_STATE: StageState = {
  solved: false,
  attempts: 0,
  hintsUsed: 0,
  guesses: [],
};

function load(): GameState {
  if (typeof localStorage === 'undefined') return DEFAULT_STATE;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as GameState) : DEFAULT_STATE;
  } catch {
    return DEFAULT_STATE;
  }
}

const store = writable<GameState>(load());

// Persist every change automatically
store.subscribe((state) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
});

function stageOf(state: GameState, index: number): StageState {
  return state.stages[index] ?? { ...DEFAULT_STAGE_STATE };
}

export const gameState = {
  subscribe: store.subscribe,

  goToStage(index: number) {
    store.update((s) => ({ ...s, currentStage: index }));
  },

  advance() {
    store.update((s) => ({ ...s, currentStage: s.currentStage + 1 }));
  },

  recordAttempt() {
    store.update((s) => {
      const stage = stageOf(s, s.currentStage);
      return {
        ...s,
        stages: { ...s.stages, [s.currentStage]: { ...stage, attempts: stage.attempts + 1 } },
      };
    });
  },

  addGuess(value: number, correct: boolean) {
    store.update((s) => {
      const stage = stageOf(s, s.currentStage);
      const existing = stage.guesses ?? [];
      if (existing.some((g) => g.value === value)) return s;
      const updated = [...existing, { value, correct }].slice(-5);
      return {
        ...s,
        stages: { ...s.stages, [s.currentStage]: { ...stage, guesses: updated } },
      };
    });
  },

  solve() {
    store.update((s) => {
      const stage = stageOf(s, s.currentStage);
      return {
        ...s,
        stages: { ...s.stages, [s.currentStage]: { ...stage, solved: true } },
      };
    });
  },

  useHint() {
    store.update((s) => {
      const stage = stageOf(s, s.currentStage);
      return {
        ...s,
        stages: { ...s.stages, [s.currentStage]: { ...stage, hintsUsed: stage.hintsUsed + 1 } },
      };
    });
  },

  reset() {
    store.set({ ...DEFAULT_STATE });
  },
};

// Convenience derived stores
export const currentStage = derived(gameState, ($g) => $g.currentStage);
export const currentStageState = derived(gameState, ($g) => stageOf($g, $g.currentStage));
export const currentStageGuesses = derived(gameState, ($g) => stageOf($g, $g.currentStage).guesses);
