/**
 * @file ModalWrapper.tsx
 * @description Reusable modal wrapper with overlay, animations, and keyboard handling.
 */

"use client";

import React, { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useBodyScrollLock } from "../hooks";
import { cn } from "../utils";
import { DismissButton } from "./DismissButton";
import type { ModalWrapperProps } from "./types";

/**
 * ModalWrapper Component
 *
 * Reusable modal wrapper that handles:
 * - Overlay with backdrop
 * - Escape key handling
 * - Click-outside-to-close
 * - Body scroll locking
 * - Entry/exit animations (respects reduced motion preference)
 *
 * @example
 * ```tsx
 * <ModalWrapper
 *   open={isOpen}
 *   onDismiss={() => setIsOpen(false)}
 *   contentClassName="w-[1046px] h-[771px]"
 * >
 *   <YourContentComponent />
 * </ModalWrapper>
 * ```
 */
export function ModalWrapper({
  open,
  onDismiss,
  isOpen,
  onClose,
  children,
  contentClassName,
  overlayClassName,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  testId = "modal-overlay",
  showDismissButton = false,
  dismissButtonProps,
  scrollable = true,
  ariaLabelledBy,
  ariaDescribedBy,
  ariaLabel,
}: ModalWrapperProps) {
  // Support both new (open/onDismiss) and deprecated (isOpen/onClose) props
  const resolvedOpen = open ?? isOpen ?? false;
  const resolvedOnDismiss = useMemo(() => onDismiss ?? onClose ?? (() => {}), [onDismiss, onClose]);

  // Centralized body scroll lock (ref-counted, preserves scrollbar gutter).
  useBodyScrollLock(resolvedOpen);

  /**
   * Handles Escape key when modal is open.
   */
  useEffect(() => {
    if (!resolvedOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === "Escape") {
        event.preventDefault();
        resolvedOnDismiss();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [resolvedOpen, resolvedOnDismiss, closeOnEscape]);

  /**
   * Animation config.
   */
  const overlayAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const contentAnimation = {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 20 },
  };

  /**
   * Handles clicking on overlay background to close modal.
   */
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      resolvedOnDismiss();
    }
  };

  return (
    <AnimatePresence>
      {resolvedOpen && (
        <motion.div
          key="modal-overlay"
          className={cn(
            "fixed inset-0 w-screen bg-black/50 flex items-center justify-center z-[1000] cursor-default",
            overlayClassName
          )}
          data-testid={testId}
          {...overlayAnimation}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          aria-label={ariaLabel}
        >
          <motion.div
            className={cn("relative", contentClassName)}
            {...contentAnimation}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            {...(scrollable ? { "data-ro-scroll": true } : {})}
          >
            {showDismissButton && (
              <DismissButton
                onClick={resolvedOnDismiss}
                avoidOverflowClipping={false}
                position="absolute top-3 right-3 z-10"
                variant="subtle"
                {...dismissButtonProps}
              />
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
