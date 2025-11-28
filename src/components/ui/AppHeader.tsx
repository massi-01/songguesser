"use client";

export default function AppHeader() {
  return (
    <header className="w-full py-6 flex flex-col items-center select-none">
      <h1 className="text-4xl font-bold tracking-wider text-cyan-400 drop-shadow-[0_0_10px_#00eaff]">
        Song Guesser
      </h1>

      <div className="mt-2 flex items-center gap-1 w-56">
        <div className="h-1 flex-1 bg-cyan-400/40 rounded"></div>
        <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_8px_#00eaff] animate-pulse"></div>
        <div className="h-1 flex-1 bg-cyan-400/40 rounded"></div>
      </div>

      <div className="mt-3 flex gap-1">
        { [6, 10, 14, 18, 14, 10, 6].map((h, i) => (
          <div
            key={i}
            className="w-1 bg-cyan-400 rounded-sm shadow-[0_0_6px_#00eaff] neon-wave"
            style={{ height: `${h}px`, animationDelay: `${i * 0.08}s` }}
          />
        ))}
      </div>
    </header>
  );
}
