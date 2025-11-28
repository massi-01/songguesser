"use client";

import { useGame } from "@/store/useGame";

export default function NeonSkipButton() {
  const { skip, isOver } = useGame();

  if (isOver) return null;

  return (
    <button
      onClick={skip}
      className="
        px-4 py-2 rounded-md font-bold
        text-black bg-yellow-400
        hover:bg-yellow-300
        shadow-[0_0_10px_#ffe066,0_0_20px_#ffe066]
        transition
      "
    >
      ⏭ Skip
    </button>
  );
}
