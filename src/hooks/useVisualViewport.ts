/**
 * @fileoverview Hook to track the visual viewport and detect virtual keyboard state.
 * @description Uses the Visual Viewport API to detect when the virtual keyboard opens
 * on mobile devices, enabling responsive UI adjustments.
 */

import { useCallback, useEffect, useRef, useState } from "react";

/** Threshold in pixels to consider the keyboard as "open" */
const KEYBOARD_HEIGHT_THRESHOLD = 150;

/** State returned by the useVisualViewport hook */
export interface VisualViewportState {
  /** Current visual viewport height in pixels */
  height: number;
  /** Current visual viewport width in pixels */
  width: number;
  /** Whether the virtual keyboard is likely open (based on viewport height reduction) */
  isKeyboardOpen: boolean;
  /** The estimated height of the keyboard when open, 0 otherwise */
  keyboardHeight: number;
}

/**
 * Hook to track the visual viewport and detect virtual keyboard state.
 *
 * Uses the Visual Viewport API (well-supported: Chrome 61+, Safari 13+, Firefox 91+)
 * with a fallback to window.innerHeight for older browsers.
 *
 * @returns The current visual viewport state including keyboard detection
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const viewport = useVisualViewport();
 *
 *   useEffect(() => {
 *     if (viewport.isKeyboardOpen) {
 *       // Adjust UI for keyboard
 *     }
 *   }, [viewport.isKeyboardOpen]);
 *
 *   return <div>Viewport height: {viewport.height}px</div>;
 * }
 * ```
 */
export function useVisualViewport(): VisualViewportState {
  // Store the initial viewport height to detect keyboard-related changes
  const initialHeightRef = useRef<number>(
    typeof window !== "undefined" ? (window.visualViewport?.height ?? window.innerHeight) : 800
  );

  const [state, setState] = useState<VisualViewportState>(() => {
    if (typeof window === "undefined") {
      return {
        height: 800,
        width: 400,
        isKeyboardOpen: false,
        keyboardHeight: 0,
      };
    }

    const height = window.visualViewport?.height ?? window.innerHeight;
    const width = window.visualViewport?.width ?? window.innerWidth;

    return {
      height,
      width,
      isKeyboardOpen: false,
      keyboardHeight: 0,
    };
  });

  const updateViewport = useCallback(() => {
    if (typeof window === "undefined") return;

    const currentHeight = window.visualViewport?.height ?? window.innerHeight;
    const currentWidth = window.visualViewport?.width ?? window.innerWidth;

    // Calculate height difference from initial
    const heightDelta = initialHeightRef.current - currentHeight;

    // Consider keyboard open if height reduced significantly
    const isKeyboardOpen = heightDelta > KEYBOARD_HEIGHT_THRESHOLD;
    const keyboardHeight = isKeyboardOpen ? heightDelta : 0;

    setState({
      height: currentHeight,
      width: currentWidth,
      isKeyboardOpen,
      keyboardHeight,
    });
  }, []);

  // Reset initial height when the component mounts or keyboard is fully closed
  const resetInitialHeight = useCallback(() => {
    if (typeof window === "undefined") return;

    const currentHeight = window.visualViewport?.height ?? window.innerHeight;
    const heightDelta = initialHeightRef.current - currentHeight;

    // If viewport expanded back (keyboard closed), update initial height
    // This handles orientation changes and other non-keyboard resizes
    if (heightDelta < 0 || Math.abs(heightDelta) < 50) {
      initialHeightRef.current = currentHeight;
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const visualViewport = window.visualViewport;

    if (visualViewport) {
      // Use Visual Viewport API
      const handleResize = () => {
        updateViewport();
      };

      // Also listen for scroll events on visual viewport (iOS scrolls viewport when keyboard opens)
      const handleScroll = () => {
        updateViewport();
      };

      visualViewport.addEventListener("resize", handleResize);
      visualViewport.addEventListener("scroll", handleScroll);

      // Initial update
      updateViewport();

      return () => {
        visualViewport.removeEventListener("resize", handleResize);
        visualViewport.removeEventListener("scroll", handleScroll);
      };
    } else {
      // Fallback for browsers without Visual Viewport API
      // Use focus/blur events combined with resize to detect keyboard
      const handleResize = () => {
        updateViewport();
      };

      const handleFocusIn = () => {
        // Small delay to allow keyboard to appear
        setTimeout(updateViewport, 300);
      };

      const handleFocusOut = () => {
        // Small delay to allow keyboard to dismiss
        setTimeout(() => {
          resetInitialHeight();
          updateViewport();
        }, 300);
      };

      window.addEventListener("resize", handleResize);
      window.addEventListener("focusin", handleFocusIn);
      window.addEventListener("focusout", handleFocusOut);

      // Initial update
      updateViewport();

      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("focusin", handleFocusIn);
        window.removeEventListener("focusout", handleFocusOut);
      };
    }
  }, [updateViewport, resetInitialHeight]);

  // Handle orientation changes - reset initial height
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleOrientationChange = () => {
      // Wait for orientation change to complete
      setTimeout(() => {
        initialHeightRef.current = window.visualViewport?.height ?? window.innerHeight;
        updateViewport();
      }, 100);
    };

    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, [updateViewport]);

  return state;
}
