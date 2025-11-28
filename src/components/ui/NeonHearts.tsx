"use client";

import { useGame } from "@/store/useGame";

export default function NeonHearts() {
  const { attempt } = useGame();
  const lives = 6 - attempt;

  return (
    <div className="flex gap-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className={`w-5 h-5 rounded-full ${
            i < lives
              ? "bg-pink-500 animate-neon-magenta"
              : "bg-gray-700"
          }`}
        ></div>
      ))}
    </div>
  );
}
