/**
 * @fileoverview Type definitions for Modal components.
 */

import type { ReactNode } from 'react';
import type { DismissButtonProps } from './DismissButton';

/**
 * Props for the low-level ModalWrapper component.
 *
 * Supports both new API (open/onDismiss) and legacy API (isOpen/onClose).
 * Components resolve these at runtime for backward compatibility.
 */
export interface ModalWrapperProps {
  /** Whether the modal is open (preferred) */
  open?: boolean;
  /** Callback when modal should close (preferred) */
  onDismiss?: () => void;
  /** @deprecated Use open instead */
  isOpen?: boolean;
  /** @deprecated Use onDismiss instead */
  onClose?: () => void;
  /** Modal content */
  children: ReactNode;
  /** Optional CSS class for content wrapper */
  contentClassName?: string;
  /** Optional CSS class for overlay */
  overlayClassName?: string;
  /** Whether clicking outside closes the modal. Default: true */
  closeOnOverlayClick?: boolean;
  /** Whether Escape key closes the modal. Default: true */
  closeOnEscape?: boolean;
  /** Test ID for the overlay */
  testId?: string;
  /** Whether to show the standard dismiss (X) button. Default: false */
  showDismissButton?: boolean;
  /** Props to pass to the dismiss button */
  dismissButtonProps?: Omit<DismissButtonProps, 'onClick'>;
  /** ID of element that labels the modal (for aria-labelledby) */
  ariaLabelledBy?: string;
  /** ID of element that describes the modal (for aria-describedby) */
  ariaDescribedBy?: string;
  /** Accessible label for the modal */
  ariaLabel?: string;
}

/** Modal size presets */
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Props for the high-level Modal component.
 *
 * Supports both new API (open/onDismiss) and legacy API (isOpen/onClose).
 */
export interface ModalProps extends Omit<ModalWrapperProps, 'contentClassName'> {
  /** Modal size preset. Default: 'md' */
  size?: ModalSize;
  /** Custom class for the content container */
  className?: string;
  /** Whether to add default padding. Default: true */
  padding?: boolean;
}
