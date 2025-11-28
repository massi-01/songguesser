"use client";

import { useRef, useState, useEffect } from "react";
import { playSnippet } from "@/utils/audio";
import SegmentProgressBar from "@/components/ui/SegmentProgressBar";
import { useGame } from "@/store/useGame";

interface AudioPlayerProps {
  url: string;
  durationMs: number;
  resetSignal: number;
}

export default function AudioPlayer({ url, durationMs, resetSignal }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const volume = useGame((s) => s.volume);
  const setVolume = useGame((s) => s.setVolume);

  const [elapsedMs, setElapsedMs] = useState(0);
  const [playId, setPlayId] = useState(0);

  function handleVolume(e: React.ChangeEvent<HTMLInputElement>) {
    const v = Number(e.target.value);
    setVolume(v);

    if (audioRef.current) {
      audioRef.current.volume = v;
    }
  }

  useEffect(() => {
    setElapsedMs(0);
    setPlayId((x) => x + 1);

    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [resetSignal]);

  function getChunkIndex() {
    const SNIPPETS = [1000, 2000, 3000, 4000, 8000, 15000];
    return SNIPPETS.indexOf(durationMs) !== -1 ? SNIPPETS.indexOf(durationMs) : 0;
  }

  const chunk = getChunkIndex();

  function handlePlay() {
    if (!audioRef.current) return;

    audioRef.current.volume = volume;
    setElapsedMs(0);
    setPlayId((x) => x + 1);

    playSnippet(audioRef.current, durationMs, setElapsedMs);
  }

  return (
    <div className="mt-4 w-full flex flex-col items-center gap-6">

      {/* Barra progressi */}
      <SegmentProgressBar key={playId} currentIndex={chunk} elapsedMs={elapsedMs} />

      <audio ref={audioRef} src={url} />

      {/* ▶ PLAY + 🔊 SLIDER AFFIANCATI */}
      <div className="flex items-center justify-center gap-10">

        {/* Pulsante play */}
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

        {/* Slider volume */}
        <div className="flex items-center justify-center gap-4">

          {/* Icona volume basso */}
          <span className="text-cyan-400 text-sm drop-shadow-[0_0_6px_#00eaff]">
            🔉
          </span>

          {/* Barra volume */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolume}
            className="
              w-36 
              accent-cyan-400 
              cursor-pointer
              appearance-none 
              h-[4px] 
              bg-gray-700 
              rounded-full

              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-[14px]
              [&::-webkit-slider-thumb]:h-[14px]
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-cyan-400
              [&::-webkit-slider-thumb]:shadow-[0_0_6px_#00eaff]

              [&::-moz-range-thumb]:w-[14px]
              [&::-moz-range-thumb]:h-[14px]
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-cyan-400
              [&::-moz-range-thumb]:shadow-[0_0_6px_#00eaff]
            "
          />

          {/* Icona volume alto */}
          <span className="text-cyan-400 text-lg drop-shadow-[0_0_6px_#00eaff]">
            🔊
          </span>

        </div>
      </div>
    </div>
  );
}
