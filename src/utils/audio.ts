// utils/audio.ts

export function playSnippet(
  audio: HTMLAudioElement,
  durationMs: number,
  onProgress?: (ms: number) => void
) {
  const doPlay = () => {
    audio.currentTime = 0;

    const start = performance.now();

    audio
      .play()
      .then(() => {
        const tick = (now: number) => {
          const elapsed = now - start;
          const clamped = Math.min(elapsed, durationMs);

          if (onProgress) onProgress(clamped);

          if (elapsed < durationMs) {
            requestAnimationFrame(tick);
          } else {
            audio.pause();
          }
        };

        requestAnimationFrame(tick);
      })
      .catch((err) => {
        console.error("Errore nella riproduzione audio:", err);
      });
  };

  if (audio.readyState >= 2) {
    doPlay();
  } else {
    const onLoaded = () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      doPlay();
    };
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.load();
  }
}
