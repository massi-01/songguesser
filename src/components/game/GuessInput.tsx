"use client";

import { useState, useEffect } from "react";
import { useTracks } from "@/store/useTracks";
import { useGame } from "@/store/useGame";
import NeonInput from "@/components/ui/NeonInput";
import NeonSuggestionList from "@/components/ui/NeonSuggestionList";


export default function GuessInput({ track }: any) {
  const tracks = useTracks((s) => s.tracks);
  const { nextAttempt, win, isOver, forceResetProgress } = useGame();

  const [guess, setGuess] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  function normalize(text: string) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9 ]/g, "")
      .trim();
  }

  useEffect(() => {
    if (!guess.trim()) {
      setSuggestions([]);
      return;
    }

    const g = normalize(guess);

    const filtered = tracks.filter((t) =>
      normalize(t.name).includes(g)
    );

    setSuggestions(filtered.slice(0, 6));
  }, [guess, tracks]);

  function doAttempt(songName: string) {
    if (normalize(songName) === normalize(track.name)) {
      win();
    } else {
      nextAttempt();
    }

    forceResetProgress(); // 🔥 qui si fissa tutto

    setGuess("");
    setSuggestions([]);
  }

  if (isOver) return null;

  return (
    <div className="relative w-full mt-6">
      <NeonInput value={guess} onChange={(e: any) => setGuess(e.target.value)} />
      <NeonSuggestionList
        suggestions={suggestions}
        onSelect={(s: any) => doAttempt(s.name)}
      />
    </div>
  );
}
