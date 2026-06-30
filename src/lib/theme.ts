import { writable } from 'svelte/store';

export type ThemeName = 'mint' | 'arcade';

const STORAGE_KEY = 'riddle-theme';

const stored = (
  typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
) as ThemeName | null;

const store = writable<ThemeName>(stored ?? 'mint');

export const theme = {
  subscribe: store.subscribe,
  set(value: ThemeName) {
    store.set(value);
    localStorage.setItem(STORAGE_KEY, value);
  },
};
