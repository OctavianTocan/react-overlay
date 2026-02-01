/**
 * @file Modal.tsx
 * @description High-level modal component with sensible defaults for common use cases.
 * Wraps ModalWrapper with standard styling.
 */

'use client';

import React from 'react';
import { ModalWrapper } from './ModalWrapper';
import { cn } from '../utils';
import type { ModalProps, ModalSize } from './types';

const sizeClasses: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-[90vw]',
};

/**
 * Modal Component
 *
 * A high-level modal with sensible defaults. Uses ModalWrapper internally
 * for consistent behavior across the app.
 *
 * @example Basic usage
 * ```tsx
 * <Modal open={isOpen} onDismiss={handleClose}>
 *   <div>Your content here</div>
 * </Modal>
 * ```
 *
 * @example With size
 * ```tsx
 * <Modal open={isOpen} onDismiss={handleClose} size="lg">
 *   <div>Larger modal content</div>
 * </Modal>
 * ```
 *
 * @example Without default padding
 * ```tsx
 * <Modal open={isOpen} onDismiss={handleClose} padding={false}>
 *   <div className="custom-padding">Custom padded content</div>
 * </Modal>
 * ```
 */
export function Modal({
  open,
  onDismiss,
  isOpen,
  onClose,
  children,
  size = 'md',
  className,
  overlayClassName,
  padding = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  testId,
  showDismissButton = true,
  dismissButtonProps,
  ariaLabelledBy,
  ariaDescribedBy,
  ariaLabel,
}: ModalProps) {
  const contentClassName = cn('bg-white rounded-2xl shadow-xl w-full', sizeClasses[size], padding && 'p-6', className);

  return (
    <ModalWrapper
      open={open}
      onDismiss={onDismiss}
      isOpen={isOpen}
      onClose={onClose}
      contentClassName={contentClassName}
      overlayClassName={overlayClassName}
      closeOnOverlayClick={closeOnOverlayClick}
      closeOnEscape={closeOnEscape}
      testId={testId}
      showDismissButton={showDismissButton}
      dismissButtonProps={dismissButtonProps}
      ariaLabelledBy={ariaLabelledBy}
      ariaDescribedBy={ariaDescribedBy}
      ariaLabel={ariaLabel}
    >
      {children}
    </ModalWrapper>
  );
}
