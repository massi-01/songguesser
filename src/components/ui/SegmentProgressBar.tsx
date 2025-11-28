"use client";

interface SegmentProgressBarProps {
  currentIndex: number;
  elapsedMs: number;
  durationMs: number;
}

const DURATIONS = [1000, 2000, 3000, 4000, 8000, 15000];

export default function SegmentProgressBar({
  currentIndex,
  elapsedMs,
  durationMs,
}: SegmentProgressBarProps) {
  // percentuale dentro il segmento attivo
  const localProgress = Math.min(1, elapsedMs / durationMs);

  return (
    <div className="relative flex w-full mt-4 gap-[3px]">
      {DURATIONS.map((duration, i) => {
        const isActive = i === currentIndex;
        const isPast = i < currentIndex;
        const isFuture = i > currentIndex;

        return (
          <div
            key={i}
            className={`
              h-3 rounded-[3px] relative overflow-hidden
              ${isActive
                ? "bg-gray-700" // sfondo del segmento attivo
                : isPast
                ? "bg-cyan-700/40 shadow-[0_0_4px_#00eaff]"
                : "bg-gray-700"
              }
            `}
            style={{ flexGrow: duration }}
          >
            {/* Riempimento del segmento attivo */}
            {isActive && (
              <div
                className="
                  absolute inset-0
                  bg-cyan-400 shadow-[0_0_10px_#00eaff]
                  transition-all
                "
                style={{
                  width: `${localProgress * 100}%`,
                }}
              />
            )}

            {/* Segmenti passati vengono riempiti al 100% */}
            {isPast && (
              <div
                className="
                  absolute inset-0 
                  bg-cyan-500 shadow-[0_0_8px_#00eaff]
                "
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
