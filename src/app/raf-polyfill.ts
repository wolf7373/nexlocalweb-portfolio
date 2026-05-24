if (typeof window !== "undefined") {
  window.requestAnimationFrame ??= ((callback: FrameRequestCallback) =>
    window.setTimeout(() => callback(Date.now()), 16));
  window.cancelAnimationFrame ??= ((handle: number) => window.clearTimeout(handle));
}

export {};
