"use client";

import { useRef, useState, useEffect } from "react";
import { playSnippet } from "@/utils/audio";
import SegmentProgressBar from "@/components/ui/SegmentProgressBar";

interface AudioPlayerProps {
  url: string;
  durationMs: number;
  resetSignal: number;
}

export default function AudioPlayer({ url, durationMs, resetSignal }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [elapsedMs, setElapsedMs] = useState(0);
  const [playId, setPlayId] = useState(0);

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

    setElapsedMs(0);
    setPlayId((x) => x + 1);

    playSnippet(audioRef.current, durationMs, setElapsedMs);
  }

  return (
    <div className="mt-4 w-full flex flex-col items-center gap-6">
      {/* Progress bar sopra */}
      <SegmentProgressBar
        key={playId}
        currentIndex={chunk}
        elapsedMs={elapsedMs}
      />

      {/* Player audio */}
      <audio ref={audioRef} src={url} />

      {/* Pulsante play SOTTO e centrato */}
      <button
        onClick={handlePlay}
        className="
          w-20 h-20
          flex items-center justify-center
          rounded-full border-2 border-cyan-400
          text-cyan-400 text-3xl
          bg-transparent
          shadow-[0_0_12px_#00eaff]
          hover:bg-cyan-400/20 hover:shadow-[0_0_20px_#00eaff]
          transition-all
        "
      >
        ▶
      </button>
    </div>
  );
}
