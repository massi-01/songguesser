export function playSnippet(audio: HTMLAudioElement, durationMs: number, onProgress?: (ms: number) => void) {
  audio.currentTime = 0;
  audio.play();

  const start = performance.now();

  function tick(now: number) {
    const diff = now - start;
    onProgress?.(diff);

    if (diff < durationMs) requestAnimationFrame(tick);
    else audio.pause();
  }

  requestAnimationFrame(tick);
}
