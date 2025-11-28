"use client";

export default function NeonButton({ children, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="
        px-8 py-6 rounded-full 
        text-white font-bold text-xl
        bg-transparent border-2 border-cyan-400
        hover:bg-cyan-400/20
        animate-neon-pulse
        transition-all
      "
    >
      {children}
    </button>
  );
}
