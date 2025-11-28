"use client";

import { useEffect, useState } from "react";
import { useTracks } from "@/store/useTracks";
import { useGame } from "@/store/useGame";
import AudioPlayer from "@/components/player/AudioPlayer";
import NeonSkipButton from "@/components/ui/NeonSkipButton";
import NeonHearts from "@/components/ui/NeonHearts";
import GuessInput from "./GuessInput";
import NeonModal from "@/components/ui/NeonModal";

export default function GameController() {
  const tracks = useTracks((s) => s.tracks);
  const {
    currentTrackId,
    snippetMs,
    setTrack,
    isOver,
    isGuessed,
    resetGame,
    nextAttempt,
    skip,
  } = useGame();

  // 🔥 Progress bar reset marker
  const [resetSignal, setResetSignal] = useState(0);

  // 🔥 Sceglie una traccia casuale all'avvio (solo la prima volta)
  useEffect(() => {
    if (tracks.length > 0 && !currentTrackId) {
      const random = Math.floor(Math.random() * tracks.length);
      setTrack(tracks[random].id);
    }
  }, [tracks, currentTrackId, setTrack]);

  // ❗ Se non abbiamo ancora una traccia, NON facciamo return null
  //    Mostriamo uno scheletro minimo per evitare che scompaia tutto
  if (!currentTrackId) {
    return (
      <div className="text-center text-cyan-300">
        Caricamento brano...
      </div>
    );
  }

  const track = tracks.find((t) => t.id === currentTrackId);
  if (!track) {
    return (
      <div className="text-center text-red-300">
        Errore: traccia non trovata.
      </div>
    );
  }

  // 🔥 SKIP handler → reset progress bar + avanza snippet
  function handleSkip() {
    skip();
    setResetSignal((x) => x + 1); // forza reset progress bar
  }

  return (
    <div className="text-white w-full max-w-lg mx-auto mt-10 space-y-8">

      {/* Header (vite + skip) */}
      <div className="flex justify-between items-center">
        <NeonHearts />
        <button
          onClick={handleSkip}
          className="px-4 py-2 rounded-md font-bold
            text-black bg-yellow-400
            hover:bg-yellow-300
            shadow-[0_0_10px_#ffe066]
            transition"
        >
          ⏭ Skip
        </button>
      </div>

      {/* Audio + progress bar */}
      <AudioPlayer
        url={track.url}
        durationMs={snippetMs}
        resetSignal={resetSignal}   // 🔥 Reset progress bar on skip
      />

      {/* Input */}
      {!isOver && <GuessInput track={track} />}

      {/* Modal risultato */}
      {isOver && (
        <NeonModal
          success={isGuessed}
          title={isGuessed ? "🎉 Hai indovinato!" : "❌ Hai perso!"}
          subtitle={
            isGuessed ? track.name : `La risposta era: ${track.name}`
          }
          onRestart={() => {
            resetGame();
            setResetSignal((x) => x + 1); // reset progress bar anche al riavvio
          }}
        />
      )}
    </div>
  );
}
