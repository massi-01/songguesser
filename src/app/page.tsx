"use client";

import GameController from "@/components/game/GameController";

export default function Home() {
  return (
    <main className="min-h-screen bg-cyberpunk p-6 text-white">
      <h1 className="text-center text-4xl font-bold mb-10 text-cyan-400">
        Songless Neon ⚡
      </h1>
      <GameController />
    </main>
  );
}
