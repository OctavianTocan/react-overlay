/**
 * @fileoverview Type definitions for Modal components.
 */

import type { ReactNode } from "react";
import type { DismissButtonProps } from "./DismissButton";

/**
 * Props for the low-level ModalWrapper component.
 *
 * Supports both new API (open/onDismiss) and legacy API (isOpen/onClose).
 * Components resolve these at runtime for backward compatibility.
 *
 * @example Basic usage
 * ```tsx
 * import { ModalWrapper } from '@octavian-tocan/react-overlay';
 *
 * <ModalWrapper
 *   open={isOpen}
 *   onDismiss={handleClose}
 *   contentClassName="bg-white rounded-xl p-8 max-w-lg"
 *   showDismissButton
 * >
 *   {children}
 * </ModalWrapper>
 * ```
 */
export interface ModalWrapperProps {
  /**
   * Whether the modal is open (preferred)
   * @example
   * ```tsx
   * const [open, setOpen] = useState(false);
   * <ModalWrapper open={open} ... />
   * ```
   */
  open?: boolean;
  /**
   * Callback when modal should close (preferred)
   * @example
   * ```tsx
   * <ModalWrapper onDismiss={() => setOpen(false)} ... />
   * ```
   */
  onDismiss?: () => void;
  /** @deprecated Use open instead */
  isOpen?: boolean;
  /** @deprecated Use onDismiss instead */
  onClose?: () => void;
  /** Modal content */
  children: ReactNode;
  /**
   * Optional CSS class for content wrapper
   * @example
   * ```tsx
   * <ModalWrapper contentClassName="bg-white rounded-xl p-8 max-w-lg" ... />
   * ```
   */
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
  dismissButtonProps?: Omit<DismissButtonProps, "onClick">;
  /** Whether to apply scrollbar styling to content. Default: true */
  scrollable?: boolean;
  /** ID of element that labels the modal (for aria-labelledby) */
  ariaLabelledBy?: string;
  /** ID of element that describes the modal (for aria-describedby) */
  ariaDescribedBy?: string;
  /** Accessible label for the modal */
  ariaLabel?: string;
}

/** Modal size presets */
export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

/**
 * Props for the high-level Modal component.
 *
 * Supports both new API (open/onDismiss) and legacy API (isOpen/onClose).
 *
 * @example Basic usage
 * ```tsx
 * import { Modal, ModalHeader, ModalDescription } from '@octavian-tocan/react-overlay';
 * import { AlertCircle } from 'lucide-react';
 *
 * function App() {
 *   const [open, setOpen] = useState(false);
 *
 *   return (
 *     <Modal open={open} onDismiss={() => setOpen(false)} size="md">
 *       <ModalHeader icon={<AlertCircle className="w-4 h-4 text-white" />} title="Confirm Action" />
 *       <ModalDescription>Are you sure you want to proceed?</ModalDescription>
 *       <div className="flex gap-2 mt-4">
 *         <button onClick={() => setOpen(false)}>Cancel</button>
 *         <button onClick={handleConfirm}>Confirm</button>
 *       </div>
 *     </Modal>
 *   );
 * }
 * ```
 */
export interface ModalProps extends Omit<ModalWrapperProps, "contentClassName"> {
  /**
   * Modal size preset. Default: 'md'
   * @example
   * ```tsx
   * <Modal size="lg" ... />
   * ```
   */
  size?: ModalSize;
  /** Custom class for the content container */
  className?: string;
  /** Whether to add default padding. Default: true */
  padding?: boolean;
}
