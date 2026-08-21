export const MOTION_EASE = [0.22, 1, 0.36, 1] as const;

export const MOTION_DURATION = {
  micro: 0.16,
  fast: 0.22,
  standard: 0.3,
  section: 0.5,
  hero: 0.8,
} as const;

/** Viewport settings shared by every scroll-triggered reveal on the page. */
export const revealViewport = { once: true, amount: 0.2 } as const;
