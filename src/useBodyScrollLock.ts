/**
 * @fileoverview Hook to prevent body scroll when bottom sheet is open.
 */

import { useEffect } from 'react';

/**
 * Lock body scroll when enabled.
 * Used to prevent background scrolling when bottom sheet is open.
 *
 * @param enabled - Whether to lock body scroll
 */
export function useBodyScrollLock(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return;

    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalWidth = document.body.style.width;
    const scrollY = window.scrollY;

    // Lock body scroll
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${scrollY}px`;

    return () => {
      // Restore original styles
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.width = originalWidth;
      document.body.style.top = '';
      window.scrollTo(0, scrollY);
    };
  }, [enabled]);
}
