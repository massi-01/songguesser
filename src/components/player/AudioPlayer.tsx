"use client";

import { useRef, useState } from "react";
import { playSnippet } from "@/utils/audio";
import SegmentProgressBar from "@/components/ui/SegmentProgressBar";

interface AudioPlayerProps {
  url: string;
  durationMs: number;
}

export default function AudioPlayer({ url, durationMs }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [elapsed, setElapsed] = useState(0);


  function getChunkIndex() {
    switch (durationMs) {
      case 1000: return 0;
      case 2000: return 1;
      case 3000: return 2;
      case 4000: return 3;
      case 8000: return 4;
      case 15000: return 5;
      default: return 0;
    }
  }

  const chunk = getChunkIndex();

  function handlePlay() {
    if (audioRef.current) {
      setElapsed(0);
      playSnippet(audioRef.current, durationMs, (ms) => setElapsed(ms));
    }
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

      <SegmentProgressBar currentIndex={chunk} elapsedMs={elapsed} durationMs={durationMs} />
    </div>
  );
}
