/**
 * @fileoverview @twinmind/bottom-sheet - Custom bottom sheet component
 *
 * A draggable bottom sheet modal with snap points, inspired by react-spring-bottom-sheet.
 *
 * | Export | Description |
 * |--------|-------------|
 * | BottomSheet | Main component |
 * | BottomSheetRef | Ref type for programmatic control |
 * | BottomSheetProps | Props interface |
 * | SnapPointMeasurements | Measurements available to snap point callbacks |
 * | SnapPointState | Extended state for defaultSnap and snapTo callbacks |
 *
 * @example Basic usage
 * ```tsx
 * import { BottomSheet, type BottomSheetRef } from '@twinmind/bottom-sheet';
 *
 * function App() {
 *   const [open, setOpen] = useState(false);
 *
 *   return (
 *     <BottomSheet open={open} onDismiss={() => setOpen(false)}>
 *       <p>Sheet content here</p>
 *     </BottomSheet>
 *   );
 * }
 * ```
 *
 * @example With snap points
 * ```tsx
 * import { useRef } from 'react';
 * import { BottomSheet, type BottomSheetRef } from '@twinmind/bottom-sheet';
 *
 * function App() {
 *   const ref = useRef<BottomSheetRef>(null);
 *
 *   return (
 *     <BottomSheet
 *       ref={ref}
 *       open={true}
 *       onDismiss={() => {}}
 *       snapPoints={({ maxHeight }) => [200, maxHeight * 0.5, maxHeight * 0.9]}
 *       defaultSnap={({ snapPoints }) => snapPoints[1]}
 *     >
 *       <button onClick={() => ref.current?.snapTo(200)}>
 *         Snap to 200px
 *       </button>
 *     </BottomSheet>
 *   );
 * }
 * ```
 */

// Component
export { BottomSheet } from './BottomSheet';

// Types
export type {
  BottomSheetProps,
  BottomSheetRef,
  DefaultSnapFunction,
  ResizeSource,
  SnapPointMeasurements,
  SnapPointsFunction,
  SnapPointState,
  SnapToOptions,
  SpringEvent,
  SpringEventType,
} from './types';

// Hooks (for advanced use cases)
export { useBodyScrollLock } from './useBodyScrollLock';

// Constants (for customization)
export { COLORS, DURATION, RADIUS, SPACING, SPRING } from './constants';
