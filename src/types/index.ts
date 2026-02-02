/**
 * @fileoverview Shared type definitions for overlay components.
 */

import type { ReactNode } from "react";

/**
 * Base props shared by all overlay components (Modal, BottomSheet).
 * Individual components extend this with their specific props.
 */
export interface OverlayBaseProps {
  /** Whether the overlay is visible */
  open: boolean;
  /** Callback when overlay is dismissed (backdrop click, escape key, swipe) */
  onDismiss: () => void;
  /** Content to render inside the overlay */
  children: ReactNode;
  /** Whether clicking the backdrop closes the overlay. Default: true */
  closeOnBackdropClick?: boolean;
  /** Whether pressing Escape closes the overlay. Default: true */
  closeOnEscape?: boolean;
  /** Whether to lock body scroll when open. Default: true */
  scrollLocking?: boolean;
  /** Test ID for testing */
  testId?: string;
  /** CSS class name applied to the root element */
  className?: string;
}
