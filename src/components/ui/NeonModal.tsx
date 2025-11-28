"use client";

let fullAudio: HTMLAudioElement | null = null;

export default function NeonModal({
  success,
  title,
  subtitle,
  onRestart,
  trackUrl,
}: {
  success: boolean;
  title: string;
  subtitle: string;
  onRestart: () => void;
  trackUrl: string;
}) {
  function playFullSong() {
    // stop eventuale audio precedente
    if (fullAudio) {
      fullAudio.pause();
      fullAudio.currentTime = 0;
    }

    fullAudio = new Audio(trackUrl);
    fullAudio.play();
  }

  function handleRestart() {
    // stop del full audio quando parte la nuova partita
    if (fullAudio) {
      fullAudio.pause();
      fullAudio.currentTime = 0;
      fullAudio = null;
    }
    onRestart();
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 p-8 rounded-xl text-center border border-cyan-400 shadow-[0_0_15px_#00eaff]">

        <h2 className="text-2xl font-bold text-cyan-400 drop-shadow-[0_0_8px_#00eaff]">
          {title}
        </h2>

        <p className="mt-2 text-white opacity-80">{subtitle}</p>

        <button
          onClick={playFullSong}
          className="mt-6 px-5 py-2 w-full rounded bg-cyan-600 hover:bg-cyan-500 text-white font-semibold shadow-[0_0_10px_#00eaff] transition-all"
        >
          🔊 Ascolta tutta la canzone
        </button>

        <button
          onClick={handleRestart}
          className="mt-3 px-5 py-2 w-full rounded bg-gray-700 hover:bg-gray-600 text-white font-semibold"
        >
          🔁 Nuova partita
        </button>

      </div>
    </div>
  );
}
