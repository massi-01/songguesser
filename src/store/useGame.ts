import { create } from "zustand";

// Durate snippet progressive (ms)
const SNIPPETS = [1000, 2000, 3000, 4000, 8000, 15000];

interface GameStore {
  currentTrackId: string | null;
  attempt: number; // 0–5
  snippetMs: number;
  isOver: boolean;
  isGuessed: boolean;

  setTrack: (id: string) => void;
  nextAttempt: () => void;
  skip: () => void;
  resetGame: () => void;
  win: () => void;
}

export const useGame = create<GameStore>((set) => ({
  currentTrackId: null,
  attempt: 0,
  snippetMs: SNIPPETS[0],
  isOver: false,
  isGuessed: false,

  setTrack: (id) =>
    set({
      currentTrackId: id,
      attempt: 0,
      snippetMs: SNIPPETS[0],
      isOver: false,
      isGuessed: false,
    }),

  nextAttempt: () =>
    set((state) => {
      const next = state.attempt + 1;

      if (next >= SNIPPETS.length) {
        return {
          ...state,
          attempt: SNIPPETS.length - 1,
          snippetMs: SNIPPETS[SNIPPETS.length - 1],
          isOver: true,
          isGuessed: false,
        };
      }

      return {
        ...state,
        attempt: next,
        snippetMs: SNIPPETS[next],
      };
    }),

  skip: () =>
    set((state) => {
      const next = state.attempt + 1;

      if (next >= SNIPPETS.length) {
        // skip sull'ultimo = game over
        return {
          ...state,
          attempt: SNIPPETS.length - 1,
          snippetMs: SNIPPETS[SNIPPETS.length - 1],
          isOver: true,
          isGuessed: false,
        };
      }

      return {
        ...state,
        attempt: next,
        snippetMs: SNIPPETS[next],
      };
    }),

  win: () => set({ isGuessed: true, isOver: true }),

  resetGame: () =>
    set({
      currentTrackId: null,
      attempt: 0,
      snippetMs: SNIPPETS[0],
      isOver: false,
      isGuessed: false,
    }),
}));
