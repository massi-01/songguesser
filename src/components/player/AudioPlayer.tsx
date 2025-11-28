"use client";

import { useRef, useState, useEffect } from "react";
import { playSnippet } from "@/utils/audio";
import SegmentProgressBar from "@/components/ui/SegmentProgressBar";

interface AudioPlayerProps {
  url: string;
  durationMs: number;
  resetSignal: number; // ⬅️ nuovo, cambia quando si deve resettare la barra
}

export default function AudioPlayer({ url, durationMs, resetSignal }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [elapsedMs, setElapsedMs] = useState(0);
  const [playId, setPlayId] = useState(0);

  // ⬅️ Quando resetSignal cambia → reset completo della progress bar
  useEffect(() => {
    setElapsedMs(0);
    setPlayId((x) => x + 1);
  }, [resetSignal]);

  function getChunkIndex() {
    const SNIPPETS = [1000, 2000, 3000, 4000, 8000, 15000];
    return SNIPPETS.indexOf(durationMs) !== -1 ? SNIPPETS.indexOf(durationMs) : 0;
  }

  const chunk = getChunkIndex();

  function handlePlay() {
    if (!audioRef.current) return;

    // reset prima di iniziare il nuovo snippet
    setElapsedMs(0);
    setPlayId((x) => x + 1);

    playSnippet(audioRef.current, durationMs, setElapsedMs);
  }

  return (
    <div className="mt-4">
      <audio ref={audioRef} src={url} />

      <button
        onClick={handlePlay}
        className="px-8 py-6 rounded-full 
        text-white font-bold text-xl
        bg-transparent border-2 border-cyan-400
        hover:bg-cyan-400/20
        animate-neon-pulse
        transition-all w-full"
      >
        ▶ Snippet ({durationMs / 1000}s)
      </button>

      <SegmentProgressBar
        key={playId}
        currentIndex={chunk}
        elapsedMs={elapsedMs}
      />
    </div>
  );
}
