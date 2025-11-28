import { create } from "zustand";

const SNIPPETS = [1000, 2000, 3000, 4000, 8000, 15000];

interface GameStore {
  currentTrackId: string | null;
  attempt: number;
  snippetMs: number;
  isOver: boolean;
  isGuessed: boolean;

  resetSignal: number;                   // 🔥 nuovo
  forceResetProgress: () => void;        // 🔥 nuovo

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

  resetSignal: 0,
  forceResetProgress: () =>
    set((s) => ({ resetSignal: s.resetSignal + 1 })),

  setTrack: (id) =>
    set({
      currentTrackId: id,
      attempt: 0,
      snippetMs: SNIPPETS[0],
      isOver: false,
      isGuessed: false,
      resetSignal: Date.now(), // reset avvio track
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
          resetSignal: Date.now(), // reset barra
        };
      }

      return {
        ...state,
        attempt: next,
        snippetMs: SNIPPETS[next],
        resetSignal: Date.now(), // reset barra
      };
    }),

  skip: () =>
    set((state) => {
      const next = state.attempt + 1;

      if (next >= SNIPPETS.length) {
        return {
          ...state,
          attempt: SNIPPETS.length - 1,
          snippetMs: SNIPPETS[SNIPPETS.length - 1],
          isOver: true,
          isGuessed: false,
          resetSignal: Date.now(),
        };
      }

      return {
        ...state,
        attempt: next,
        snippetMs: SNIPPETS[next],
        resetSignal: Date.now(),
      };
    }),

  win: () =>
    set({
      isGuessed: true,
      isOver: true,
      resetSignal: Date.now(), // reset vincita
    }),

  resetGame: () =>
    set({
      currentTrackId: null,
      attempt: 0,
      snippetMs: SNIPPETS[0],
      isOver: false,
      isGuessed: false,
      resetSignal: Date.now(),
    }),
}));
