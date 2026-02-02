/**
 * @fileoverview Default constants for BottomSheet component.
 * These can be overridden via props or custom styling.
 */

/** Animation durations in milliseconds */
export const DURATION = {
  smooth: 200,
  fast: 150,
  slow: 300,
} as const;

/** Spring animation configuration */
export const SPRING = {
  gentle: {
    stiffness: 120,
    damping: 14,
  },
  snappy: {
    stiffness: 400,
    damping: 30,
  },
} as const;

/** Default spacing values */
export const SPACING = {
  sm: 8,
  md: 16,
  lg: 24,
} as const;

/** Default border radius values */
export const RADIUS = {
  xl: 16,
  xl2: 24,
} as const;

/** Default colors */
export const COLORS = {
  surface: {
    card: "#FFFFFF",
  },
  text: {
    primary: "#1A1A2E",
  },
  border: {
    subtle: "#E5E5E5",
  },
  neutral: {
    gray300: "#D1D5DB",
  },
} as const;

/** Drag behavior constants */
export const ANIMATION_DURATION_MS = DURATION.smooth;
export const DISMISS_THRESHOLD_PX = 80;
export const VELOCITY_THRESHOLD = 0.4;
export const HANDLE_HEIGHT = 32;
export const SNAP_VELOCITY_THRESHOLD = 0.25;
