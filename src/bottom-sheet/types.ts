/**
 * @fileoverview Type definitions for BottomSheet component.
 */

/** Measurements available to snap point calculations */
export interface SnapPointMeasurements {
  /** Height of the sticky header, if present */
  headerHeight: number;
  /** Height of the sticky footer, if present */
  footerHeight: number;
  /** Current height of the sheet */
  height: number;
  /** Minimum height needed to avoid scroll overflow */
  minHeight: number;
  /** Maximum available height (window height or maxHeight prop) */
  maxHeight: number;
}

/** Extended measurements for defaultSnap and snapTo callbacks */
export interface SnapPointState extends SnapPointMeasurements {
  /** Array of resolved snap points */
  snapPoints: number[];
  /** The last snap point the sheet was at, if any */
  lastSnap: number | null;
}

/** Function type for calculating snap points */
export type SnapPointsFunction = (measurements: SnapPointMeasurements) => number | number[];

/** Function type for calculating default snap */
export type DefaultSnapFunction = (state: SnapPointState) => number;

/** Spring event types */
export type SpringEventType = "OPEN" | "CLOSE" | "SNAP" | "RESIZE";

/** Source of resize events */
export type ResizeSource = "window" | "maxheightprop" | "element" | "keyboard";

/** Spring event object */
export interface SpringEvent {
  type: SpringEventType;
  source?: "dragging" | "custom" | ResizeSource;
}

/** Options for snapTo method */
export interface SnapToOptions {
  /** Source identifier for the snap action */
  source?: string;
  /** Velocity to use for the animation */
  velocity?: number;
}

/** Ref handle for programmatic control */
export interface BottomSheetRef {
  /** Snap to a specific height or calculated position */
  snapTo: (to: number | ((state: SnapPointState) => number), options?: SnapToOptions) => void;
  /** Current snap point height (updated outside render cycle) */
  height: number;
}

/**
 * Props for the BottomSheet component.
 */
export interface BottomSheetProps {
  // Core props
  /** Whether the sheet is open */
  open: boolean;
  /** Callback when the sheet is dismissed (backdrop tap, swipe, escape key) */
  onDismiss?: () => void;
  /** @deprecated Use onDismiss instead. Callback when the sheet is closed. */
  onClose?: () => void;
  /** Content to render inside the sheet */
  children: React.ReactNode;

  // Snap points
  /** Snap points function or array. Defaults to minHeight. */
  snapPoints?: SnapPointsFunction | number[];
  /** Initial snap point when opening. Defaults to first snap point. */
  defaultSnap?: number | DefaultSnapFunction;

  // Header/Footer
  /** Sticky header content */
  header?: React.ReactNode;
  /** Sticky footer content */
  footer?: React.ReactNode;
  /** @deprecated Use header prop instead. Optional title displayed at the top of the sheet */
  title?: string;

  // Sibling content
  /** Content rendered as sibling to backdrop, outside the overlay */
  sibling?: React.ReactNode;

  // Behavior
  /** Whether to trap focus and manage aria-hidden. Default: true */
  blocking?: boolean;
  /** Whether to lock body scroll when open. Default: true */
  scrollLocking?: boolean;
  /** Allow expanding by dragging the content area. Default: false */
  expandOnContentDrag?: boolean;
  /** Skip the initial spring animation when opening. Default: false */
  skipInitialTransition?: boolean;
  /** Maximum height constraint */
  maxHeight?: number;
  /** Ref for initial focus. Pass false to disable auto-focus. */
  initialFocusRef?: React.RefObject<HTMLElement> | false;

  // Styling (web only)
  /** CSS class name applied to the root element */
  className?: string;
  /** Inline styles applied to the root element */
  style?: React.CSSProperties;

  // Events
  /** Called when spring animation starts */
  onSpringStart?: (event: SpringEvent) => void | Promise<void>;
  /** Called when spring animation ends */
  onSpringEnd?: (event: SpringEvent) => void;
  /** Called when spring animation is cancelled */
  onSpringCancel?: (event: SpringEvent) => void;

  // Testing
  /** Test ID for testing */
  testId?: string;
  /** @deprecated Use testId instead */
  testID?: string;

  // Keyboard behavior
  /**
   * How the sheet should behave when the virtual keyboard opens on mobile.
   * - 'snap': Snap to a smaller snap point to fit within visible viewport
   * - 'ignore': (default) Sheet maintains its size
   * @default 'ignore'
   */
  keyboardBehavior?: "snap" | "ignore";

  /**
   * Which snap point to use when keyboard opens. Can be:
   * - A number (index into snapPoints array, 0 = smallest)
   * - A function receiving current state and returning target height
   * Only applies when keyboardBehavior is 'snap'.
   * @default 0 (smallest snap point)
   */
  keyboardSnapPoint?: number | ((state: SnapPointState) => number);
}
