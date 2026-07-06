/**
 * Animation constants for consistent motion design across the application
 */

export const ANIMATION_DURATIONS = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.8,
  slower: 1.0,
} as const;

export const ANIMATION_DELAYS = {
  none: 0,
  short: 0.2,
  medium: 0.4,
  long: 0.6,
  longer: 0.8,
} as const;

export const ANIMATION_EASINGS = {
  easeOut: "easeOut",
  easeIn: "easeIn",
  easeInOut: "easeInOut",
  linear: "linear",
} as const;

export const ANIMATION_DISTANCES = {
  short: 20,
  medium: 50,
  long: 100,
} as const;

/**
 * Common animation presets for consistent UX
 */
export const ANIMATION_PRESETS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: ANIMATION_DURATIONS.normal, ease: ANIMATION_EASINGS.easeOut },
  },
  fadeInUp: {
    initial: { opacity: 0, y: ANIMATION_DISTANCES.short },
    animate: { opacity: 1, y: 0 },
    transition: { duration: ANIMATION_DURATIONS.normal, ease: ANIMATION_EASINGS.easeOut },
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -ANIMATION_DISTANCES.medium },
    animate: { opacity: 1, x: 0 },
    transition: { duration: ANIMATION_DURATIONS.slow, ease: ANIMATION_EASINGS.easeOut },
  },
  fadeInRight: {
    initial: { opacity: 0, x: ANIMATION_DISTANCES.medium },
    animate: { opacity: 1, x: 0 },
    transition: { duration: ANIMATION_DURATIONS.slow, ease: ANIMATION_EASINGS.easeOut },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: ANIMATION_DURATIONS.normal, ease: ANIMATION_EASINGS.easeOut },
  },
} as const;
