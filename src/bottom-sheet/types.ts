/**
 * @fileoverview Type definitions for BottomSheet component.
 */

import type { DismissButtonProps } from "../modal/DismissButton";

/** Placement options for dismiss button */
export type DismissButtonPlacement = "left" | "right";

/** Configuration for dismiss button */
export type BottomSheetDismissButton =
  | { show: false }
  | { show: true; position: DismissButtonPlacement; props?: Omit<DismissButtonProps, "onClick"> };

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
 *
 * @example Basic usage
 * ```tsx
 * import { BottomSheet } from '@octavian-tocan/react-overlay';
 *
 * function App() {
 *   const [open, setOpen] = useState(false);
 *
 *   return (
 *     <BottomSheet open={open} onDismiss={() => setOpen(false)}>
 *       <p>Sheet content here</p>
 *     </BottomSheet>
 *   );
 * }
 * ```
 *
 * @example With snap points
 * ```tsx
 * <BottomSheet
 *   open={open}
 *   onDismiss={() => setOpen(false)}
 *   snapPoints={({ maxHeight }) => [200, maxHeight * 0.5, maxHeight * 0.9]}
 *   defaultSnap={({ snapPoints }) => snapPoints[1]}
 * >
 *   <p>Content</p>
 * </BottomSheet>
 * ```
 */
export interface BottomSheetProps {
  // Core props
  /**
   * Whether the sheet is open
   * @example
   * ```tsx
   * const [open, setOpen] = useState(false);
   * <BottomSheet open={open} ... />
   * ```
   */
  open: boolean;
  /**
   * Callback when the sheet is dismissed (backdrop tap, swipe, escape key)
   * @example
   * ```tsx
   * <BottomSheet onDismiss={() => setOpen(false)} ... />
   * ```
   */
  onDismiss?: () => void;
  /** @deprecated Use onDismiss instead. Callback when the sheet is closed. */
  onClose?: () => void;
  /** Content to render inside the sheet */
  children: React.ReactNode;

  // Snap points
  /**
   * Snap points function or array. Defaults to minHeight.
   * @example Array of fixed heights
   * ```tsx
   * <BottomSheet snapPoints={[200, 400, 600]} ... />
   * ```
   * @example Function with measurements
   * ```tsx
   * <BottomSheet
   *   snapPoints={({ maxHeight, minHeight }) => [minHeight, maxHeight * 0.5, maxHeight * 0.9]}
   *   ...
   * />
   * ```
   */
  snapPoints?: SnapPointsFunction | number[];
  /**
   * Initial snap point when opening. Defaults to first snap point.
   * @example
   * ```tsx
   * <BottomSheet defaultSnap={({ snapPoints }) => snapPoints[1]} ... />
   * ```
   */
  defaultSnap?: number | DefaultSnapFunction;

  // Header/Footer
  /**
   * Header content rendered above the scrollable area
   * @example
   * ```tsx
   * <BottomSheet header={<h2>Sheet Title</h2>} ... />
   * ```
   */
  header?: React.ReactNode;
  /**
   * Sticky header content rendered inside the scrollable area.
   * Useful for in-sheet sticky navigation that stays visible while scrolling.
   * @example
   * ```tsx
   * <BottomSheet stickyHeader={<Tabs />} ... />
   * ```
   */
  stickyHeader?: React.ReactNode;
  /**
   * Sticky footer content
   * @example
   * ```tsx
   * <BottomSheet footer={<button>Submit</button>} ... />
   * ```
   */
  footer?: React.ReactNode;
  /**
   * Whether to show the header border.
   * - `true` (default): Shows the default border (#E5E5E5)
   * - `false`: No border
   * - `string`: Custom border color
   * @default true
   * @example Hide border
   * ```tsx
   * <BottomSheet header={<h2>Title</h2>} headerBorder={false} ... />
   * ```
   * @example Custom border color
   * ```tsx
   * <BottomSheet header={<h2>Title</h2>} headerBorder="#FF0000" ... />
   * ```
   */
  headerBorder?: boolean | string;
  /**
   * Whether to show the footer border.
   * - `true` (default): Shows the default border (#E5E5E5)
   * - `false`: No border
   * - `string`: Custom border color
   * @default true
   * @example Hide border
   * ```tsx
   * <BottomSheet footer={<button>Submit</button>} footerBorder={false} ... />
   * ```
   * @example Custom border color
   * ```tsx
   * <BottomSheet footer={<button>Submit</button>} footerBorder="#FF0000" ... />
   * ```
   */
  footerBorder?: boolean | string;
  /** @deprecated Use header prop instead. Optional title displayed at the top of the sheet */
  title?: string;

  // Dismiss Button
  /**
   * Configuration for dismiss/close button
   *
   * @example Show button on right side
   * ```tsx
   * <BottomSheet dismissButton={{ show: true, position: 'right' }} />
   * ```
   *
   * @example Show button on left side with custom aria-label
   * ```tsx
   * <BottomSheet
   *   dismissButton={{
   *     show: true,
   *     position: 'left',
   *     props: { "aria-label": "Close dialog" }
   *   }}
   * />
   * ```
   *
   * @example Hide button (default)
   * ```tsx
   * <BottomSheet dismissButton={{ show: false }} />
   * ```
   */
  dismissButton?: BottomSheetDismissButton;

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
  /** CSS class name applied to the sheet container */
  sheetClassName?: string;
  /** Inline styles applied to the sheet container */
  sheetStyle?: React.CSSProperties;
  /** CSS class name applied to the handle zone */
  handleClassName?: string;
  /** Inline styles applied to the handle pill element */
  handleStyle?: React.CSSProperties;
  /** CSS class name applied to the scrollable content area */
  contentClassName?: string;
  /** Inline styles applied to the scrollable content area */
  contentStyle?: React.CSSProperties;

  /**
   * Remove default styling for full customization.
   * - `true`: Remove all default backgrounds and padding
   * - Object: Selectively remove styling per section
   * @example Full unstyled
   * ```tsx
   * <BottomSheet unstyled>
   *   <div className="bg-gradient-to-b from-blue-400 to-blue-600 p-6">
   *     Content with custom gradient
   *   </div>
   * </BottomSheet>
   * ```
   * @example Selective unstyled
   * ```tsx
   * <BottomSheet unstyled={{ sheet: true, content: true }}>
   *   ...
   * </BottomSheet>
   * ```
   */
  unstyled?:
    | boolean
    | {
        /** Remove sheet background color */
        sheet?: boolean;
        /** Remove content padding */
        content?: boolean;
        /** Remove handle default styling */
        handle?: boolean;
      };

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
