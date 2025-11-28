"use client";

interface SegmentProgressBarProps {
  currentIndex: number; // 0..5
  elapsedMs: number;    // tempo dall'inizio dello snippet corrente
}

// Durate DEGLI snippet in ms (devono combaciare con useGame)
const DURATIONS = [1000, 2000, 3000, 4000, 8000, 15000];

export default function SegmentProgressBar({
  currentIndex,
  elapsedMs,
}: SegmentProgressBarProps) {
  // durata dello snippet corrente
  const currentDuration = DURATIONS[currentIndex] ?? DURATIONS[0];

  // tempo totale (somma durate) fino alla fine dello snippet corrente
  const totalUntilCurrent = DURATIONS.slice(0, currentIndex + 1).reduce(
    (acc, d) => acc + d,
    0
  );

  // tempo effettivo di "riempimento globale" lungo la barra
  // 0   -> barra vuota
  // totalUntilCurrent -> barra piena fino alla fine dello snippet corrente
  const clampedElapsed = Math.max(0, Math.min(elapsedMs, currentDuration));
  const globalTime = (totalUntilCurrent * clampedElapsed) / currentDuration;

  // utile per i calcoli per-segmento
  const cumulative = DURATIONS.reduce<number[]>((acc, d, i) => {
    const prev = acc[i - 1] ?? 0;
    acc[i] = prev + d;
    return acc;
  }, []);

  const totalSegments = DURATIONS.length;

  return (
    <div className="relative flex w-full mt-4 gap-[3px]">
      {DURATIONS.map((segmentDuration, i) => {
        const segmentStart = i === 0 ? 0 : cumulative[i - 1];
        const segmentEnd = cumulative[i];

        // Quanto del globalTime cade dentro questo segmento
        let fillRatio = 0;

        if (globalTime <= segmentStart) {
          fillRatio = 0;
        } else if (globalTime >= segmentEnd) {
          fillRatio = 1;
        } else {
          const inside = globalTime - segmentStart;
          fillRatio = inside / segmentDuration;
        }

        return (
          <div
            key={i}
            className="h-3 rounded-[3px] relative overflow-hidden bg-gray-800"
            style={{ flexGrow: segmentDuration }}
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
  );
}
