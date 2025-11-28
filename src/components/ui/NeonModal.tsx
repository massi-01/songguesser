"use client";

export default function NeonModal({ success, title, subtitle, onRestart }: any) {
  return (
    <div
      className="
        fixed inset-0 flex items-center justify-center
        bg-black/60 backdrop-blur-sm
        z-50
      "
    >
      <div
        className={`
          p-8 rounded-xl text-center animate-neon-pop
          border-2 shadow-2xl
          ${
            success
              ? "border-green-400 shadow-[0_0_15px_#0aff0a]"
              : "border-red-500 shadow-[0_0_15px_#ff0044]"
          }
        `}
      >
        <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
        <p className="text-gray-300 mb-6">{subtitle}</p>

        <button
          onClick={onRestart}
          className="
            px-6 py-3 rounded-md bg-cyan-400
            hover:bg-cyan-300 text-black font-bold
            shadow-[0_0_10px_#00eaff]
          "
        >
          🔄 Nuova partita
        </button>
      </div>
    </div>
  );
}
