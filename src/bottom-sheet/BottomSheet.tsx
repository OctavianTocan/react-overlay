/**
 * @fileoverview BottomSheet - Custom bottom sheet modal with snap points.
 * @description Inspired by react-spring-bottom-sheet API, this component provides
 * a draggable bottom sheet with snap points, spring animations, and keyboard support.
 */

import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import {
  ANIMATION_DURATION_MS,
  COLORS,
  DISMISS_THRESHOLD_PX,
  HANDLE_HEIGHT,
  RADIUS,
  SNAP_VELOCITY_THRESHOLD,
  SPACING,
  VELOCITY_THRESHOLD,
} from "./constants";
import type { BottomSheetProps, BottomSheetRef, SnapPointMeasurements, SnapPointState } from "./types";
import { useBodyScrollLock, useVisualViewport } from "../hooks";
import { DismissButton } from "../modal/DismissButton";

// ============================================================================
// Helper functions
// ============================================================================

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function findClosestSnapPoint(height: number, snapPoints: number[]): number {
  if (snapPoints.length === 0) return height;
  return snapPoints.reduce((closest, point) =>
    Math.abs(point - height) < Math.abs(closest - height) ? point : closest
  );
}

function findSnapPointInDirection(currentHeight: number, velocity: number, snapPoints: number[]): number {
  if (snapPoints.length === 0) return currentHeight;
  const sorted = [...snapPoints].sort((a, b) => a - b);

  // Negative velocity = dragging down = want smaller height
  if (velocity < 0) {
    for (let i = sorted.length - 1; i >= 0; i--) {
      if (sorted[i]! < currentHeight - 5) return sorted[i]!;
    }
    return sorted[0]!;
  }
  // Positive velocity = dragging up = want larger height
  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i]! > currentHeight + 5) return sorted[i]!;
  }
  return sorted[sorted.length - 1]!;
}

function getProtectedHeight(
  headerRef: React.RefObject<HTMLDivElement | null>,
  footerRef: React.RefObject<HTMLDivElement | null>,
  handleHeight: number
): number {
  const headerH = headerRef.current?.offsetHeight ?? 0;
  const footerH = footerRef.current?.offsetHeight ?? 0;
  return headerH + footerH + handleHeight;
}

// ============================================================================
// BottomSheetContent (internal)
// ============================================================================

interface BottomSheetContentProps extends BottomSheetProps {
  sheetRef: React.ForwardedRef<BottomSheetRef>;
}

function BottomSheetContent({
  open,
  onDismiss,
  onClose,
  children,
  snapPoints: snapPointsProp,
  defaultSnap,
  header,
  footer,
  headerBorder = true,
  title,
  sibling,
  blocking = true,
  scrollLocking = true,
  expandOnContentDrag = false,
  skipInitialTransition = false,
  maxHeight: maxHeightProp,
  initialFocusRef,
  className,
  style,
  onSpringStart,
  onSpringEnd,
  onSpringCancel: _onSpringCancel,
  testId,
  testID,
  sheetRef,
  keyboardBehavior = "ignore",
  keyboardSnapPoint = 0,
  dismissButton,
}: BottomSheetContentProps): React.JSX.Element | null {
  // Support both testId (new) and testID (deprecated) with testId taking precedence
  const resolvedTestId = testId ?? testID;
  // ========== State ==========
  const [isVisible, setIsVisible] = useState(false);
  const [windowHeight, setWindowHeight] = useState(typeof window !== "undefined" ? window.innerHeight : 800);
  const [sheetHeight, setSheetHeight] = useState(0);
  const [backdropOpacity, setBackdropOpacity] = useState(0);
  const [_isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDuration, setTransitionDuration] = useState<number | null>(null);
  const [sheetOffsetY, setSheetOffsetY] = useState(0);

  // ========== Refs ==========
  const currentHeightRef = useRef<number>(0);
  const lastSnapRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const dragStartYRef = useRef(0);
  const dragStartHeightRef = useRef(0);
  const dragStartTimeRef = useRef(0);
  // Initialize to false so first mount with open=true triggers visibility
  const prevOpenRef = useRef(false);
  const sheetElementRef = useRef<HTMLDivElement>(null);
  const backdropElementRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerContainerRef = useRef<HTMLDivElement>(null);
  const footerContainerRef = useRef<HTMLDivElement>(null);

  // ========== Computed Values ==========
  const maxH = maxHeightProp ?? windowHeight * 0.9;

  // Calculate snap points
  const snapPoints = useMemo(() => {
    const measurements: SnapPointMeasurements = {
      headerHeight: 0,
      footerHeight: 0,
      height: currentHeightRef.current || maxH * 0.85,
      minHeight: 200,
      maxHeight: maxH,
    };

    if (!snapPointsProp) {
      // Default: two snap points - collapsed (40%) and expanded (85%)
      return [maxH * 0.4, maxH * 0.85];
    }

    if (typeof snapPointsProp === "function") {
      const result = snapPointsProp(measurements);
      const points = Array.isArray(result) ? result : [result];
      return points.map((p) => clamp(p, 100, maxH)).sort((a, b) => a - b);
    }

    return snapPointsProp.map((p) => clamp(p, 100, maxH)).sort((a, b) => a - b);
  }, [snapPointsProp, maxH]);

  // Calculate default snap point
  const defaultSnapHeight = useMemo(() => {
    if (snapPoints.length === 0) return maxH * 0.85;

    const state: SnapPointState = {
      headerHeight: 0,
      footerHeight: 0,
      height: snapPoints[snapPoints.length - 1]!,
      minHeight: snapPoints[0]!,
      maxHeight: snapPoints[snapPoints.length - 1]!,
      snapPoints,
      lastSnap: lastSnapRef.current,
    };

    if (typeof defaultSnap === "function") {
      return findClosestSnapPoint(defaultSnap(state), snapPoints);
    }
    if (typeof defaultSnap === "number") {
      return findClosestSnapPoint(defaultSnap, snapPoints);
    }
    // Default to LAST (largest) snap point for better UX
    return snapPoints[snapPoints.length - 1]!;
  }, [defaultSnap, snapPoints, maxH]);

  // ========== Dismiss Handler ==========
  const handleDismiss = useCallback(() => {
    if (onDismiss) {
      onDismiss();
    } else {
      onClose?.();
    }
  }, [onDismiss, onClose]);

  // ========== Animation Helpers ==========
  const setHeightImmediate = useCallback((height: number) => {
    currentHeightRef.current = height;
    // Disable transition immediately via DOM to avoid React batching issues
    if (sheetElementRef.current) {
      sheetElementRef.current.style.transition = "none";
    }
    setTransitionDuration(null);
    setSheetHeight(height);
  }, []);

  const setHeightWithTransition = useCallback((height: number, duration: number = ANIMATION_DURATION_MS) => {
    currentHeightRef.current = height;
    setTransitionDuration(duration);
    setSheetHeight(height);
    // Ensure transition is applied after state update
    requestAnimationFrame(() => {
      if (sheetElementRef.current) {
        sheetElementRef.current.style.transition = `height ${duration}ms cubic-bezier(0.4, 0.0, 0.2, 1)`;
      }
    });
  }, []);

  const setBackdropOpacityImmediate = useCallback((opacity: number) => {
    setBackdropOpacity(opacity);
  }, []);

  const setBackdropOpacityWithTransition = useCallback((opacity: number, _duration: number = ANIMATION_DURATION_MS) => {
    setBackdropOpacity(opacity);
  }, []);

  const animateToHeight = useCallback(
    (toHeight: number, source: "dragging" | "custom" = "custom") => {
      setSheetOffsetY(0); // Reset offset when snapping

      const clampedHeight = clamp(toHeight, snapPoints[0] ?? 100, snapPoints[snapPoints.length - 1] ?? maxH);

      lastSnapRef.current = currentHeightRef.current;
      currentHeightRef.current = clampedHeight;

      onSpringStart?.({ type: "SNAP", source });

      setIsTransitioning(true);
      // Use spring-like timing for snappy feel
      const springDuration = Math.max(200, Math.abs(clampedHeight - currentHeightRef.current) * 0.5);
      setHeightWithTransition(clampedHeight, springDuration);

      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
      transitionTimeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
        onSpringEnd?.({ type: "SNAP", source });
      }, springDuration);
    },
    [snapPoints, maxH, onSpringStart, onSpringEnd, setHeightWithTransition]
  );

  const animateOpen = useCallback(() => {
    const targetHeight = defaultSnapHeight;
    currentHeightRef.current = targetHeight;

    if (skipInitialTransition) {
      setHeightImmediate(targetHeight);
      setBackdropOpacityImmediate(1);
      onSpringEnd?.({ type: "OPEN" });
      return;
    }

    onSpringStart?.({ type: "OPEN" });

    setHeightImmediate(0);
    setBackdropOpacityImmediate(0);

    // Trigger transition after a frame to ensure initial values are set
    requestAnimationFrame(() => {
      setIsTransitioning(true);
      // Use spring-like timing for opening
      const springDuration = Math.max(300, targetHeight * 0.3);
      setHeightWithTransition(targetHeight, springDuration);
      setBackdropOpacityWithTransition(1, ANIMATION_DURATION_MS);

      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
      transitionTimeoutRef.current = setTimeout(
        () => {
          setIsTransitioning(false);
          onSpringEnd?.({ type: "OPEN" });
          if (blocking && initialFocusRef !== false && initialFocusRef?.current) {
            // Use preventScroll to avoid page jumping when focusing elements
            initialFocusRef.current.focus({ preventScroll: true });
          }
        },
        Math.max(springDuration, ANIMATION_DURATION_MS)
      );
    });
  }, [
    defaultSnapHeight,
    skipInitialTransition,
    onSpringStart,
    onSpringEnd,
    blocking,
    initialFocusRef,
    setHeightImmediate,
    setBackdropOpacityImmediate,
    setHeightWithTransition,
    setBackdropOpacityWithTransition,
  ]);

  const animateClose = useCallback(
    (source: "dragging" | "custom" = "custom") => {
      onSpringStart?.({ type: "CLOSE", source });

      setIsTransitioning(true);
      setHeightWithTransition(0, ANIMATION_DURATION_MS);
      setBackdropOpacityWithTransition(0, ANIMATION_DURATION_MS);

      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
      transitionTimeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
        setSheetOffsetY(0); // Reset for next open
        onSpringEnd?.({ type: "CLOSE", source });
        setIsVisible(false);
        handleDismiss();
      }, ANIMATION_DURATION_MS);
    },
    [onSpringStart, onSpringEnd, handleDismiss, setHeightWithTransition, setBackdropOpacityWithTransition]
  );

  // ========== Imperative Handle ==========
  useImperativeHandle(
    sheetRef,
    () => ({
      snapTo: (to, _options) => {
        const state: SnapPointState = {
          headerHeight: 0,
          footerHeight: 0,
          height: currentHeightRef.current,
          minHeight: snapPoints[0] ?? 100,
          maxHeight: snapPoints[snapPoints.length - 1] ?? maxH,
          snapPoints,
          lastSnap: lastSnapRef.current,
        };
        const targetHeight = typeof to === "function" ? to(state) : to;
        animateToHeight(findClosestSnapPoint(targetHeight, snapPoints), "custom");
      },
      get height() {
        return currentHeightRef.current;
      },
    }),
    [snapPoints, maxH, animateToHeight]
  );

  // ========== Drag Handlers ==========
  const handleDragStart = useCallback((y: number) => {
    isDraggingRef.current = true;
    dragStartYRef.current = y;
    dragStartHeightRef.current = currentHeightRef.current;
    dragStartTimeRef.current = Date.now();
    setIsTransitioning(false);
    // Disable transitions during drag - use ref to ensure it happens immediately
    if (sheetElementRef.current) {
      sheetElementRef.current.style.transition = "none";
    }
    setTransitionDuration(null);
  }, []);

  const handleDragMove = useCallback(
    (y: number) => {
      if (!isDraggingRef.current) return;

      const deltaY = dragStartYRef.current - y;
      const rawHeight = dragStartHeightRef.current + deltaY;
      const protectedH = getProtectedHeight(headerContainerRef, footerContainerRef, HANDLE_HEIGHT);

      if (rawHeight >= protectedH) {
        // Content is still collapsing, no offset needed
        const newHeight = clamp(rawHeight, protectedH, maxH + 50);
        setHeightImmediate(newHeight);
        setSheetOffsetY(0);
      } else {
        // Content fully collapsed, start moving sheet down
        const offset = protectedH - rawHeight;
        setHeightImmediate(protectedH);
        setSheetOffsetY(Math.max(0, offset));
      }
    },
    [maxH, setHeightImmediate]
  );

  const handleDragEnd = useCallback(
    (y: number) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;

      const deltaY = dragStartYRef.current - y;
      const deltaTime = Date.now() - dragStartTimeRef.current;
      const velocity = deltaTime > 0 ? deltaY / deltaTime : 0;

      // Effective height accounts for the Y offset
      const effectiveHeight = currentHeightRef.current - sheetOffsetY;
      const minSnap = snapPoints[0] ?? 100;

      const draggedDownDistance = dragStartHeightRef.current - effectiveHeight;
      const shouldDismiss =
        (draggedDownDistance > DISMISS_THRESHOLD_PX && effectiveHeight < minSnap + 50) ||
        (velocity < -VELOCITY_THRESHOLD && effectiveHeight < minSnap + 100) ||
        sheetOffsetY > DISMISS_THRESHOLD_PX;

      // Reset offset before animating
      setSheetOffsetY(0);

      if (shouldDismiss) {
        animateClose("dragging");
        return;
      }

      let targetSnap: number;
      if (Math.abs(velocity) > SNAP_VELOCITY_THRESHOLD) {
        targetSnap = findSnapPointInDirection(currentHeightRef.current, velocity, snapPoints);
      } else {
        targetSnap = findClosestSnapPoint(currentHeightRef.current, snapPoints);
      }

      animateToHeight(targetSnap, "dragging");
    },
    [snapPoints, animateClose, animateToHeight, sheetOffsetY]
  );

  // ========== Touch Event Handlers ==========
  useEffect(() => {
    if (!isVisible) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;

      const target = e.target as HTMLElement;
      if (target.closest("[data-bottom-sheet-handle]") || target.closest("[data-bottom-sheet-drag-zone]")) {
        handleDragStart(touch.clientY);
      } else if (expandOnContentDrag && target.closest("[data-bottom-sheet-content]")) {
        handleDragStart(touch.clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current) return;
      const touch = e.touches[0];
      if (!touch) return;
      e.preventDefault();
      handleDragMove(touch.clientY);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isDraggingRef.current) return;
      const touch = e.changedTouches[0];
      if (!touch) return;
      handleDragEnd(touch.clientY);
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isVisible, expandOnContentDrag, handleDragStart, handleDragMove, handleDragEnd]);

  // ========== Pointer Event Handlers ==========
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      handleDragStart(e.clientY);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [handleDragStart]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (isDraggingRef.current) {
        handleDragMove(e.clientY);
      }
    },
    [handleDragMove]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (isDraggingRef.current) {
        handleDragEnd(e.clientY);
      }
    },
    [handleDragEnd]
  );

  // ========== Open/Close Effects ==========
  // Track if we've already animated open to prevent re-animating on dependency changes
  const hasAnimatedOpenRef = useRef(false);

  useEffect(() => {
    if (open && !prevOpenRef.current) {
      setIsVisible(true);
      hasAnimatedOpenRef.current = false; // Reset when transitioning to open
    }
    if (!open && prevOpenRef.current) {
      hasAnimatedOpenRef.current = false; // Reset when closing
    }
    prevOpenRef.current = open;
  }, [open]);

  useEffect(() => {
    // Only animate open once when transitioning from closed to open
    if (isVisible && open && !hasAnimatedOpenRef.current) {
      hasAnimatedOpenRef.current = true;
      const timer = setTimeout(animateOpen, 16);
      return () => clearTimeout(timer);
    }
    if (!open && isVisible) {
      animateClose("custom");
    }
    return undefined;
  }, [isVisible, open, animateOpen, animateClose]);

  // ========== Keyboard Handler ==========
  useEffect(() => {
    if (!isVisible || !blocking) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        animateClose("custom");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, blocking, animateClose]);

  // ========== Window Resize ==========
  // Ignore resize events caused by virtual keyboard on mobile.
  // When an input is focused and height decreases, it's likely the keyboard appearing.
  // We use a ref to track initial height to detect keyboard-related resizes.
  const initialHeightRef = useRef(typeof window !== "undefined" ? window.innerHeight : 800);

  useEffect(() => {
    const handleResize = () => {
      const newHeight = window.innerHeight;
      const activeElement = document.activeElement;
      const isInputFocused =
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        activeElement?.getAttribute("contenteditable") === "true";

      // If an input is focused and the height decreased significantly (keyboard appeared),
      // ignore this resize to prevent the bottom sheet from re-animating.
      // Also ignore when height increases back (keyboard dismissed) while input is still focused.
      const heightDelta = Math.abs(newHeight - initialHeightRef.current);
      const isKeyboardRelatedResize = isInputFocused && heightDelta > 100;

      if (isKeyboardRelatedResize) {
        return;
      }

      // Update initial height ref when not keyboard-related
      initialHeightRef.current = newHeight;
      setWindowHeight(newHeight);
      onSpringStart?.({ type: "RESIZE", source: "window" });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [onSpringStart]);

  // ========== Body Scroll Lock ==========
  useBodyScrollLock(isVisible && scrollLocking);

  // ========== Visual Viewport / Keyboard Detection ==========
  const visualViewport = useVisualViewport();
  const wasKeyboardOpenRef = useRef(false);

  useEffect(() => {
    // Only handle keyboard behavior if enabled and sheet is visible
    if (keyboardBehavior !== "snap" || !isVisible) {
      wasKeyboardOpenRef.current = visualViewport.isKeyboardOpen;
      return;
    }

    // Detect keyboard opening (transition from closed to open)
    const keyboardJustOpened = visualViewport.isKeyboardOpen && !wasKeyboardOpenRef.current;
    wasKeyboardOpenRef.current = visualViewport.isKeyboardOpen;

    if (!keyboardJustOpened) return;

    // Calculate target snap point
    let targetHeight: number;

    if (typeof keyboardSnapPoint === "function") {
      const state: SnapPointState = {
        headerHeight: 0,
        footerHeight: 0,
        height: currentHeightRef.current,
        minHeight: snapPoints[0] ?? 100,
        maxHeight: snapPoints[snapPoints.length - 1] ?? maxH,
        snapPoints,
        lastSnap: lastSnapRef.current,
      };
      targetHeight = keyboardSnapPoint(state);
    } else {
      // keyboardSnapPoint is an index into snapPoints array
      const sortedSnapPoints = [...snapPoints].sort((a, b) => a - b);
      const index = clamp(keyboardSnapPoint, 0, sortedSnapPoints.length - 1);
      targetHeight = sortedSnapPoints[index] ?? sortedSnapPoints[0] ?? 200;
    }

    // Only snap if current height is larger than target
    if (currentHeightRef.current > targetHeight) {
      onSpringStart?.({ type: "RESIZE", source: "keyboard" });
      animateToHeight(targetHeight, "custom");
    }
  }, [
    visualViewport.isKeyboardOpen,
    keyboardBehavior,
    keyboardSnapPoint,
    isVisible,
    snapPoints,
    maxH,
    onSpringStart,
    animateToHeight,
  ]);

  // ========== Cleanup ==========
  useEffect(() => {
    const animationFrameId = animationFrameRef.current;
    const transitionTimeoutId = transitionTimeoutRef.current;
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (transitionTimeoutId) {
        clearTimeout(transitionTimeoutId);
      }
    };
  }, []);

  // ========== Early Return ==========
  if (!isVisible) return null;

  // ========== Render ==========
  const headerContent =
    header ??
    (title ? (
      <div style={styles.legacyHeader}>
        <h2 style={styles.title}>{title}</h2>
      </div>
    ) : null);

  const overlayStyle: React.CSSProperties = {
    ...styles.overlay,
    position: "fixed",
    ...style,
  };

  return (
    <div style={overlayStyle} className={className} data-testid={resolvedTestId}>
      {sibling}

      {/* Backdrop */}
      <div
        ref={backdropElementRef}
        style={{
          ...styles.backdrop,
          opacity: backdropOpacity,
          transition: `opacity ${ANIMATION_DURATION_MS}ms ease-out`,
        }}
      >
        <button
          type="button"
          style={styles.backdropButton}
          onClick={() => animateClose("custom")}
          aria-label={title ? `Close ${title}` : "Close bottom sheet"}
          data-testid={resolvedTestId ? `${resolvedTestId}-backdrop` : undefined}
        />
      </div>

      {/* Sheet */}
      <div
        ref={sheetElementRef}
        style={{
          ...styles.sheet,
          height: `${sheetHeight}px`,
          maxHeight: `${maxH}px`,
          transform: `translateY(${sheetOffsetY}px)`,
          transition:
            transitionDuration !== null
              ? `height ${transitionDuration}ms cubic-bezier(0.4, 0.0, 0.2, 1), transform ${transitionDuration}ms cubic-bezier(0.4, 0.0, 0.2, 1)`
              : "none",
        }}
      >
        {dismissButton?.show && (
          <DismissButton
            onClick={() => animateClose("custom")}
            position={dismissButton.position === "left" ? "absolute top-4 left-4 z-10" : "absolute top-4 right-4 z-10"}
            avoidOverflowClipping={false}
            {...dismissButton.props}
          />
        )}

        {/* Drag Handle Zone */}
        <div style={styles.handleZone} data-bottom-sheet-drag-zone>
          <div
            style={styles.handleArea}
            data-bottom-sheet-handle
            role="button"
            aria-label={title ? `Drag handle for ${title}` : "Drag handle"}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            <div style={styles.handle} />
          </div>
        </div>

        {/* Header (Sticky) */}
        {headerContent && (
          <div
            ref={headerContainerRef}
            style={{
              ...styles.headerContainer,
              ...(headerBorder === false
                ? { borderBottomWidth: 0 }
                : typeof headerBorder === "string"
                  ? { borderBottomColor: headerBorder }
                  : {}),
            }}
          >
            {headerContent}
          </div>
        )}

        {/* Scrollable Content */}
        <div style={styles.scrollView} data-bottom-sheet-content data-ro-scroll>
          <div style={styles.scrollContent}>{children}</div>
        </div>

        {/* Footer (Sticky) */}
        {footer && (
          <div ref={footerContainerRef} style={styles.footerContainer}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// BottomSheet (exported)
// ============================================================================

export const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(function BottomSheet(
  props: BottomSheetProps,
  ref: React.ForwardedRef<BottomSheetRef>
) {
  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(<BottomSheetContent {...props} sheetRef={ref} />, document.body);
});

// ============================================================================
// Styles
// ============================================================================

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "flex-end",
    zIndex: 1000,
    pointerEvents: "auto",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    pointerEvents: "auto",
    zIndex: 1,
  },
  backdropButton: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    border: "none",
    background: "transparent",
    cursor: "default",
    padding: 0,
  },
  sheet: {
    backgroundColor: COLORS.surface.card,
    borderTopLeftRadius: `${RADIUS.xl2}px`,
    borderTopRightRadius: `${RADIUS.xl2}px`,
    overflow: "hidden",
    boxShadow: "0 -4px 12px rgba(0, 0, 0, 0.15)",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    pointerEvents: "auto",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  handleZone: {
    height: `${HANDLE_HEIGHT}px`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  handleArea: {
    width: "100%",
    height: `${HANDLE_HEIGHT}px`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "grab",
    flexShrink: 0,
  },
  handle: {
    width: "36px",
    height: "4px",
    borderRadius: "2px",
    backgroundColor: COLORS.neutral.gray300,
  },
  headerContainer: {
    flexShrink: 0,
    paddingLeft: `${SPACING.lg}px`,
    paddingRight: `${SPACING.lg}px`,
    paddingBottom: `${SPACING.sm}px`,
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: COLORS.border.subtle,
  },
  legacyHeader: {
    paddingBottom: `${SPACING.sm}px`,
  },
  title: {
    fontSize: "18px",
    fontWeight: 600,
    color: COLORS.text.primary,
    margin: 0,
  },
  scrollView: {
    flex: 1,
    overflowY: "auto",
    overflowX: "hidden",
    WebkitOverflowScrolling: "touch",
  },
  scrollContent: {
    paddingLeft: `${SPACING.lg}px`,
    paddingRight: `${SPACING.lg}px`,
    // Use calc() to add safe area inset to base padding
    paddingBottom: `calc(${SPACING.md}px + env(safe-area-inset-bottom, 0px))`,
  },
  footerContainer: {
    flexShrink: 0,
    paddingLeft: `${SPACING.lg}px`,
    paddingRight: `${SPACING.lg}px`,
    paddingTop: `${SPACING.sm}px`,
    // Use calc() to add safe area inset to base padding (footer handles its own safe area)
    paddingBottom: `calc(${SPACING.sm}px + env(safe-area-inset-bottom, 0px))`,
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: COLORS.border.subtle,
  },
};
