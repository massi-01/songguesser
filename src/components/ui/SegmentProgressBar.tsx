"use client";

interface SegmentProgressBarProps {
  currentIndex: number;
  elapsedMs: number;
}

const DURATIONS = [1000, 2000, 3000, 4000, 8000, 15000];

export default function SegmentProgressBar({
  currentIndex,
  elapsedMs,
}: SegmentProgressBarProps) {
  const currentDuration = DURATIONS[currentIndex] ?? DURATIONS[0];

  const totalUntilCurrent = DURATIONS.slice(0, currentIndex + 1).reduce(
    (acc, d) => acc + d,
    0
  );

  const clampedElapsed = Math.max(0, Math.min(elapsedMs, currentDuration));
  const globalTime = (totalUntilCurrent * clampedElapsed) / currentDuration;

  const cumulative = DURATIONS.reduce<number[]>((acc, d, i) => {
    const prev = acc[i - 1] ?? 0;
    acc[i] = prev + d;
    return acc;
  }, []);

  return (
  <div className="relative w-full mt-8">

    {/* LABEL + TRIANGOLINO, posizionati insieme e sopra la barra */}
    <div className="absolute -top-10 left-0 w-full flex gap-[3px] pointer-events-none">
      {DURATIONS.map((duration, i) => (
        <div
          key={i}
          className="relative flex flex-col items-center"
          style={{ flexGrow: duration, flexBasis: 0 }}
        >
          {i === currentIndex && (
            <>
              <span className="text-cyan-400 text-sm font-semibold drop-shadow-[0_0_6px_#00eaff]">
                {duration / 1000}s
              </span>

              <span className="text-cyan-400 text-xl leading-none drop-shadow-[0_0_6px_#00eaff] mt-1">
                ▼
              </span>
            </>
          )}
        </div>
      ))}
    </div>

    {/* PROGRESS BAR */}
    <div className="flex w-full gap-[3px] mt-2">
      {DURATIONS.map((segmentDuration, i) => {
        const segmentStart = i === 0 ? 0 : cumulative[i - 1];
        const segmentEnd = cumulative[i];

        let fillRatio = 0;

        if (globalTime > segmentStart && globalTime < segmentEnd) {
          fillRatio = (globalTime - segmentStart) / segmentDuration;
        } else if (globalTime >= segmentEnd) {
          fillRatio = 1;
        }

        return (
          <div
            key={i}
            className="h-3 rounded-[3px] relative overflow-hidden bg-gray-800"
            style={{ flexGrow: segmentDuration, flexBasis: 0 }}
          >
            <div
              className="
                absolute inset-0
                bg-cyan-400 shadow-[0_0_10px_#00eaff]
                transition-[width] duration-75
              "
              style={{ width: `${fillRatio * 100}%` }}
            />
          </div>
        );
      })}
    </div>
  </div>
);
}
