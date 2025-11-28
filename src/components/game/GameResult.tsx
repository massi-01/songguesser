"use client";

import { useGame } from "@/store/useGame";
import type { Track } from "@/store/useTracks";

export default function GameResult({ track }: { track: Track }) {
  const { isGuessed, attempt, resetGame } = useGame();

  return (
    <div className="mt-6 bg-gray-800 p-4 rounded-lg text-center">
      {isGuessed ? (
        <>
          <h2 className="text-xl font-bold text-green-400">🎉 Hai indovinato!</h2>
          <p className="mt-2">Era: <strong>{track.name}</strong></p>
          <p>Vite usate: {attempt + 1} / 6</p>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold text-red-400">❌ Hai perso!</h2>
          <p className="mt-2">La canzone era: <strong>{track.name}</strong></p>
        </>
      )}

      <button
        onClick={resetGame}
        className="mt-4 px-4 py-2 rounded bg-green-600 text-white"
      >
        🔄 Nuova partita
      </button>
    </div>
  );
}
