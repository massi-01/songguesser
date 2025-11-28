"use client";

import { useEffect } from "react";
import { useTracks } from "@/store/useTracks";
import { useGame } from "@/store/useGame";
import AudioPlayer from "@/components/player/AudioPlayer";
import NeonSkipButton from "@/components/ui/NeonSkipButton";
import NeonHearts from "@/components/ui/NeonHearts";
import GuessInput from "./GuessInput";
import NeonModal from "@/components/ui/NeonModal";

export default function GameController() {
  const tracks = useTracks((s) => s.tracks);
  const { currentTrackId, snippetMs, setTrack, isOver, isGuessed, resetGame } =
    useGame();

  // 🔥 AVVIO AUTOMATICO DEL GIOCO
  useEffect(() => {
    if (tracks.length > 0 && !currentTrackId) {
      const random = Math.floor(Math.random() * tracks.length);
      setTrack(tracks[random].id);
    }
  }, [tracks, currentTrackId, setTrack]);

  // fallback nel raro caso tracks sia vuoto
  if (tracks.length === 0)
    return <div className="text-gray-400 mt-4">Nessuna canzone nel database.</div>;

  // Se non ha ancora selezionato una canzone, non renderizzare nulla
  if (!currentTrackId) return null;

  const track = tracks.find((t) => t.id === currentTrackId)!;

  return (
    <div className="text-white w-full max-w-lg mx-auto mt-10 space-y-8">

      {/* Header */}
      <div className="flex justify-between items-center">
        <NeonHearts />
        <NeonSkipButton />
      </div>

      {/* Snippet */}
      <AudioPlayer url={track.url} durationMs={snippetMs} />

      {/* Input */}
      {!isOver && <GuessInput track={track} />}

      {/* Modal risultato */}
      {isOver && (
        <NeonModal
          success={isGuessed}
          title={isGuessed ? "🎉 Hai indovinato!" : "❌ Hai perso!"}
          subtitle={isGuessed ? track.name : `La risposta era: ${track.name}`}
          onRestart={resetGame}
        />
      )}
    </div>
  );
}
