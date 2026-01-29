/**
 * Image size constants for consistent image optimization
 */

export const IMAGE_SIZES = {
  logo: {
    small: { width: 120, height: 60 },
    medium: { width: 220, height: 80 },
    large: { width: 300, height: 80 },
  },
  hero: {
    width: 800,
    height: 600,
  },
  thumbnail: {
    width: 400,
    height: 300,
  },
  card: {
    width: 600,
    height: 400,
  },
  gallery: {
    small: { width: 400, height: 400 },
    medium: { width: 800, height: 600 },
    large: { width: 1200, height: 1200 },
  },
  portfolio: {
    thumbnail: { width: 800, height: 800 },
    full: { width: 1600, height: 1600 },
  },
  icon: {
    small: { width: 24, height: 24 },
    medium: { width: 32, height: 32 },
    large: { width: 48, height: 48 },
  },
  certificate: {
    width: 200,
    height: 80,
  },
  post: {
    featured: { width: 1200, height: 1200 },
    thumbnail: { width: 800, height: 600 },
  },
} as const;

/**
 * Image quality settings for Next.js Image component
 */
export const IMAGE_QUALITY = {
  low: 50,
  medium: 75,
  high: 90,
  max: 100,
} as const;

/**
 * Default image props for common use cases
 */
export const DEFAULT_IMAGE_PROPS = {
  hero: {
    ...IMAGE_SIZES.hero,
    quality: IMAGE_QUALITY.high,
    priority: true,
  },
  logo: {
    ...IMAGE_SIZES.logo.medium,
    quality: IMAGE_QUALITY.high,
    priority: false,
  },
  gallery: {
    ...IMAGE_SIZES.gallery.medium,
    quality: IMAGE_QUALITY.medium,
    priority: false,
  },
} as const;
