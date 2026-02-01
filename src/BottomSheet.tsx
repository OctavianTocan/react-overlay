/**
 * @fileoverview BottomSheet - Custom bottom sheet modal with snap points.
 * @description Inspired by react-spring-bottom-sheet API, this component provides
 * a draggable bottom sheet with snap points, spring animations, and keyboard support.
 */

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { GestureResponderEvent, ViewStyle } from 'react-native';

import {
  ANIMATION_DURATION_MS,
  COLORS,
  DISMISS_THRESHOLD_PX,
  HANDLE_HEIGHT,
  RADIUS,
  SNAP_VELOCITY_THRESHOLD,
  SPACING,
  SPRING,
  VELOCITY_THRESHOLD,
} from './constants';
import type {
  BottomSheetProps,
  BottomSheetRef,
  SnapPointMeasurements,
  SnapPointState,
} from './types';
import { useBodyScrollLock } from './useBodyScrollLock';

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

function findSnapPointInDirection(
  currentHeight: number,
  velocity: number,
  snapPoints: number[]
): number {
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

// ============================================================================
// AnimatedView (inline to avoid external dependency)
// ============================================================================

const AnimatedView = Animated.View;

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
  onSpringCancel,
  testID,
  sheetRef,
}: BottomSheetContentProps): React.JSX.Element | null {
  // ========== State ==========
  const [isVisible, setIsVisible] = useState(false);
  const [windowHeight, setWindowHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 800
  );

  // ========== Refs ==========
  const currentHeightRef = useRef<number>(0);
  const lastSnapRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const dragStartYRef = useRef(0);
  const dragStartHeightRef = useRef(0);
  const dragStartTimeRef = useRef(0);
  // Initialize to false so first mount with open=true triggers visibility
  const prevOpenRef = useRef(false);

  // ========== Animated Values ==========
  const heightAnim = useRef(new Animated.Value(0)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;

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

    if (typeof snapPointsProp === 'function') {
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

    if (typeof defaultSnap === 'function') {
      return findClosestSnapPoint(defaultSnap(state), snapPoints);
    }
    if (typeof defaultSnap === 'number') {
      return findClosestSnapPoint(defaultSnap, snapPoints);
    }
    // Default to LAST (largest) snap point for better UX
    return snapPoints[snapPoints.length - 1]!;
  }, [defaultSnap, snapPoints, maxH]);

  // ========== Dismiss Handler ==========
  const handleDismiss = useCallback(() => {
    onDismiss?.() ?? onClose?.();
  }, [onDismiss, onClose]);

  // ========== Animation Helpers ==========
  const animateToHeight = useCallback(
    (toHeight: number, source: 'dragging' | 'custom' = 'custom') => {
      const clampedHeight = clamp(
        toHeight,
        snapPoints[0] ?? 100,
        snapPoints[snapPoints.length - 1] ?? maxH
      );

      lastSnapRef.current = currentHeightRef.current;
      currentHeightRef.current = clampedHeight;

      onSpringStart?.({ type: 'SNAP', source });

      Animated.spring(heightAnim, {
        toValue: clampedHeight,
        useNativeDriver: false,
        tension: SPRING.snappy.stiffness,
        friction: SPRING.snappy.damping,
      }).start((() => {
        onSpringEnd?.({ type: 'SNAP', source });
      }) as () => void);
    },
    [snapPoints, maxH, heightAnim, onSpringStart, onSpringEnd]
  );

  const animateOpen = useCallback(() => {
    const targetHeight = defaultSnapHeight;
    currentHeightRef.current = targetHeight;

    if (skipInitialTransition) {
      heightAnim.setValue(targetHeight);
      backdropAnim.setValue(1);
      onSpringEnd?.({ type: 'OPEN' });
      return;
    }

    onSpringStart?.({ type: 'OPEN' });

    heightAnim.setValue(0);
    backdropAnim.setValue(0);

    Animated.parallel([
      Animated.spring(heightAnim, {
        toValue: targetHeight,
        useNativeDriver: false,
        tension: SPRING.gentle.stiffness,
        friction: SPRING.gentle.damping,
      }),
      Animated.timing(backdropAnim, {
        toValue: 1,
        duration: ANIMATION_DURATION_MS,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }),
    ]).start((() => {
      onSpringEnd?.({ type: 'OPEN' });
      if (
        Platform.OS === 'web' &&
        blocking &&
        initialFocusRef !== false &&
        initialFocusRef?.current
      ) {
        initialFocusRef.current.focus();
      }
    }) as () => void);
  }, [
    defaultSnapHeight,
    skipInitialTransition,
    heightAnim,
    backdropAnim,
    onSpringStart,
    onSpringEnd,
    blocking,
    initialFocusRef,
  ]);

  const animateClose = useCallback(
    (source: 'dragging' | 'custom' = 'custom') => {
      onSpringStart?.({ type: 'CLOSE', source });

      Animated.parallel([
        Animated.timing(heightAnim, {
          toValue: 0,
          duration: ANIMATION_DURATION_MS,
          easing: Easing.out(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(backdropAnim, {
          toValue: 0,
          duration: ANIMATION_DURATION_MS,
          easing: Easing.out(Easing.ease),
          useNativeDriver: false,
        }),
      ]).start((() => {
        onSpringEnd?.({ type: 'CLOSE', source });
        setIsVisible(false);
        handleDismiss();
      }) as () => void);
    },
    [heightAnim, backdropAnim, onSpringStart, onSpringEnd, handleDismiss]
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
        const targetHeight = typeof to === 'function' ? to(state) : to;
        animateToHeight(findClosestSnapPoint(targetHeight, snapPoints), 'custom');
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
  }, []);

  const handleDragMove = useCallback(
    (y: number) => {
      if (!isDraggingRef.current) return;

      const deltaY = dragStartYRef.current - y;
      const newHeight = clamp(
        dragStartHeightRef.current + deltaY,
        50,
        maxH + 50
      );

      heightAnim.setValue(newHeight);
      currentHeightRef.current = newHeight;
    },
    [heightAnim, maxH]
  );

  const handleDragEnd = useCallback(
    (y: number) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;

      const deltaY = dragStartYRef.current - y;
      const deltaTime = Date.now() - dragStartTimeRef.current;
      const velocity = deltaTime > 0 ? deltaY / deltaTime : 0;
      const currentHeight = currentHeightRef.current;
      const minSnap = snapPoints[0] ?? 100;

      const draggedDownDistance = dragStartHeightRef.current - currentHeight;
      const shouldDismiss =
        (draggedDownDistance > DISMISS_THRESHOLD_PX && currentHeight < minSnap + 50) ||
        (velocity < -VELOCITY_THRESHOLD && currentHeight < minSnap + 100);

      if (shouldDismiss) {
        animateClose('dragging');
        return;
      }

      let targetSnap: number;
      if (Math.abs(velocity) > SNAP_VELOCITY_THRESHOLD) {
        targetSnap = findSnapPointInDirection(currentHeight, velocity, snapPoints);
      } else {
        targetSnap = findClosestSnapPoint(currentHeight, snapPoints);
      }

      animateToHeight(targetSnap, 'dragging');
    },
    [snapPoints, animateClose, animateToHeight]
  );

  // ========== Touch Event Handlers (Web) ==========
  useEffect(() => {
    if (Platform.OS !== 'web' || !isVisible) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;

      const target = e.target as HTMLElement;
      if (
        target.closest('[data-bottom-sheet-handle]') ||
        target.closest('[data-bottom-sheet-drag-zone]')
      ) {
        handleDragStart(touch.clientY);
      } else if (expandOnContentDrag && target.closest('[data-bottom-sheet-content]')) {
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

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isVisible, expandOnContentDrag, handleDragStart, handleDragMove, handleDragEnd]);

  // ========== Pointer Event Handlers (Web Desktop) ==========
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      handleDragStart(e.clientY);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [handleDragStart]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      handleDragMove(e.clientY);
    },
    [handleDragMove]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      handleDragEnd(e.clientY);
    },
    [handleDragEnd]
  );

  // ========== Native Gesture Handlers ==========
  const handleResponderGrant = useCallback(
    (e: GestureResponderEvent) => {
      const y = e.nativeEvent.pageY;
      handleDragStart(y);
    },
    [handleDragStart]
  );

  const handleResponderMove = useCallback(
    (e: GestureResponderEvent) => {
      const y = e.nativeEvent.pageY;
      handleDragMove(y);
    },
    [handleDragMove]
  );

  const handleResponderRelease = useCallback(
    (e: GestureResponderEvent) => {
      const y = e.nativeEvent.pageY;
      handleDragEnd(y);
    },
    [handleDragEnd]
  );

  // ========== Open/Close Effects ==========
  useEffect(() => {
    if (open && !prevOpenRef.current) {
      setIsVisible(true);
    }
    prevOpenRef.current = open;
  }, [open]);

  useEffect(() => {
    if (isVisible && open) {
      const timer = setTimeout(animateOpen, 16);
      return () => clearTimeout(timer);
    }
    if (!open && isVisible) {
      animateClose('custom');
    }
    return undefined;
  }, [isVisible, open, animateOpen, animateClose]);

  // ========== Keyboard Handler ==========
  useEffect(() => {
    if (Platform.OS !== 'web' || !isVisible || !blocking) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        animateClose('custom');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, blocking, animateClose]);

  // ========== Window Resize ==========
  useEffect(() => {
    if (Platform.OS !== 'web') return;

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      onSpringStart?.({ type: 'RESIZE', source: 'window' });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [onSpringStart]);

  // ========== Body Scroll Lock ==========
  useBodyScrollLock(Platform.OS === 'web' && isVisible && scrollLocking);

  // ========== Early Return ==========
  if (!isVisible) return null;

  // ========== Render ==========
  const headerContent = header ?? (title ? (
    <View style={styles.legacyHeader}>
      <Text style={styles.title}>{title}</Text>
    </View>
  ) : null);

  // Web needs fixed positioning for portal rendering
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const webFixedStyle = Platform.OS === 'web' ? ({ position: 'fixed' } as any) : {};
  const overlayStyle: ViewStyle[] = [styles.overlay, webFixedStyle];

  const rootStyle =
    Platform.OS === 'web' && style
      ? [...overlayStyle, style as unknown as ViewStyle]
      : overlayStyle;

  return (
    <View
      style={rootStyle}
      testID={testID}
      // @ts-expect-error web className
      className={Platform.OS === 'web' ? className : undefined}
    >
      {sibling}

      {/* Backdrop */}
      <AnimatedView style={[styles.backdrop, { opacity: backdropAnim as unknown as number }]}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={() => animateClose('custom')}
          accessibilityRole="button"
          accessibilityLabel={title ? `Close ${title}` : 'Close bottom sheet'}
          testID={testID ? `${testID}-backdrop` : undefined}
        />
      </AnimatedView>

      {/* Sheet */}
      <AnimatedView
        style={[
          styles.sheet,
          {
            height: heightAnim as unknown as number,
            maxHeight: maxH,
          },
        ]}
      >
        {/* Drag Handle Zone */}
        <View
          style={styles.handleZone}
          // @ts-expect-error web data attribute
          dataSet={{ bottomSheetDragZone: true }}
        >
          <View
            style={styles.handleArea}
            // @ts-expect-error web data attribute
            dataSet={{ bottomSheetHandle: true }}
            accessibilityRole="button"
            accessibilityLabel={title ? `Drag handle for ${title}` : 'Drag handle'}
            {...(Platform.OS === 'web'
              ? {
                  onPointerDown: handlePointerDown,
                  onPointerMove: handlePointerMove,
                  onPointerUp: handlePointerUp,
                }
              : {
                  onStartShouldSetResponder: () => true,
                  onMoveShouldSetResponder: () => true,
                  onResponderGrant: handleResponderGrant,
                  onResponderMove: handleResponderMove,
                  onResponderRelease: handleResponderRelease,
                })}
          >
            <View style={styles.handle} />
          </View>
        </View>

        {/* Header (Sticky) */}
        {headerContent && <View style={styles.headerContainer}>{headerContent}</View>}

        {/* Scrollable Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          {...({ bounces: false, dataSet: { bottomSheetContent: true } } as object)}
        >
          {children}
        </ScrollView>

        {/* Footer (Sticky) */}
        {footer && <View style={styles.footerContainer}>{footer}</View>}

        {/* Safe Area Spacer */}
        <View style={styles.safeAreaSpacer} />
      </AnimatedView>
    </View>
  );
}

// ============================================================================
// BottomSheet (exported)
// ============================================================================

export const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  function BottomSheet(props: BottomSheetProps, ref: React.ForwardedRef<BottomSheetRef>) {
    if (Platform.OS !== 'web') {
      return <BottomSheetContent {...props} sheetRef={ref} />;
    }

    if (typeof document === 'undefined') {
      return null;
    }

    type CreatePortal = typeof import('react-dom').createPortal;
    let createPortal: CreatePortal | null = null;

    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      createPortal = require('react-dom').createPortal as CreatePortal;
    } catch {
      // react-dom not available
    }

    if (!createPortal) {
      return <BottomSheetContent {...props} sheetRef={ref} />;
    }

    return createPortal(<BottomSheetContent {...props} sheetRef={ref} />, document.body);
  }
);

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  sheet: {
    backgroundColor: COLORS.surface.card,
    borderTopLeftRadius: RADIUS.xl2,
    borderTopRightRadius: RADIUS.xl2,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 16,
  },
  handleZone: {
    height: HANDLE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  handleArea: {
    width: '100%',
    height: HANDLE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    // Web-only cursor style
    ...({ cursor: 'grab' } as object),
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.neutral.gray300,
  },
  headerContainer: {
    flexShrink: 0,
    paddingHorizontal: SPACING.lg,
  },
  legacyHeader: {
    paddingBottom: SPACING.sm,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  footerContainer: {
    flexShrink: 0,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.border.subtle,
  },
  safeAreaSpacer: {
    paddingBottom: SPACING.md,
  },
});
