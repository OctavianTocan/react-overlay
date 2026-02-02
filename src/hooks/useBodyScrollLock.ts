/**
 * @fileoverview Centralized body scroll lock with ref-counting.
 *
 * Why ref-counting:
 * - Multiple overlays (modals, bottom sheets, sidebars) may be open simultaneously
 * - Each overlay locks scroll on open and unlocks on close
 * - Without ref-counting, closing one overlay would unlock scroll for all
 *
 * Behavior:
 * - On first lock: sets overflow: hidden on body
 * - On final unlock: restores original overflow value
 *
 * Note: Layout stability is typically handled by `scrollbar-gutter: stable both-edges`
 * in the app's global CSS, which reserves space for the scrollbar.
 */

import { useEffect } from "react";

let lockCount = 0;
let originalOverflow: string | null = null;

/**
 * Lock body scroll by setting overflow: hidden.
 * Uses ref-counting to support multiple concurrent locks.
 */
export function lockBodyScroll(): void {
  if (typeof window === "undefined") return;

  lockCount += 1;
  if (lockCount > 1) return;

  // Save original overflow value
  originalOverflow = document.body.style.overflow;

  // Simply hide overflow - scrollbar-gutter handles layout stability
  document.body.style.overflow = "hidden";
}

/**
 * Unlock body scroll by restoring original overflow value.
 * Only unlocks when all locks have been released (ref-counting).
 */
export function unlockBodyScroll(): void {
  if (typeof window === "undefined") return;
  if (lockCount === 0) return;

  lockCount -= 1;
  if (lockCount > 0) return;

  // Restore original overflow
  document.body.style.overflow = originalOverflow ?? "";
  originalOverflow = null;
}

/**
 * React hook wrapper around the centralized lock/unlock functions.
 *
 * @param enabled - Whether scroll lock should be active
 *
 * @example
 * ```tsx
 * function Modal({ isOpen }) {
 *   useBodyScrollLock(isOpen);
 *   return isOpen ? <div>Modal content</div> : null;
 * }
 * ```
 */
export function useBodyScrollLock(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return;
    lockBodyScroll();
    return () => {
      unlockBodyScroll();
    };
  }, [enabled]);
}
