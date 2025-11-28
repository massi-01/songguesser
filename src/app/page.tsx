"use client";

import GameController from "@/components/game/GameController";
import AppHeader from "@/components/ui/AppHeader";

export default function Home() {
  return (
    <main className="min-h-screen bg-cyberpunk p-6 text-white">
      <AppHeader/>
      <GameController />
    </main>
  );
}
