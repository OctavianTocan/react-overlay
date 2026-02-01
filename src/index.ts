/**
 * @fileoverview @octavian-tocan/react-overlay - Unified overlay components
 *
 * A package providing BottomSheet and Modal components with consistent APIs.
 *
 * | Export | Description |
 * |--------|-------------|
 * | BottomSheet | Draggable bottom sheet with snap points |
 * | Modal | Centered modal dialog with size presets |
 * | ModalWrapper | Low-level modal with full customization |
 * | ModalHeader | Header with icon badge and title |
 * | ModalDescription | Styled description text |
 * | DismissButton | Close button for overlays |
 * | useBodyScrollLock | Hook to lock body scroll |
 *
 * @example BottomSheet usage
 * ```tsx
 * import { BottomSheet } from '@octavian-tocan/react-overlay';
 *
 * function App() {
 *   const [open, setOpen] = useState(false);
 *   return (
 *     <BottomSheet open={open} onDismiss={() => setOpen(false)}>
 *       <p>Sheet content</p>
 *     </BottomSheet>
 *   );
 * }
 * ```
 *
 * @example Modal usage
 * ```tsx
 * import { Modal, ModalHeader, ModalDescription } from '@octavian-tocan/react-overlay';
 *
 * function App() {
 *   const [open, setOpen] = useState(false);
 *   return (
 *     <Modal open={open} onDismiss={() => setOpen(false)} size="md">
 *       <ModalHeader icon={<AlertIcon />} title="Confirm" />
 *       <ModalDescription>Are you sure?</ModalDescription>
 *     </Modal>
 *   );
 * }
 * ```
 */

// BottomSheet feature
export { BottomSheet, COLORS, DURATION, RADIUS, SPACING, SPRING } from "./bottom-sheet";

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
} from "./bottom-sheet";

// Modal feature
export { Modal, ModalWrapper, ModalHeader, ModalDescription, DismissButton } from "./modal";

export type {
  ModalProps,
  ModalWrapperProps,
  ModalSize,
  ModalHeaderProps,
  ModalDescriptionProps,
  DismissButtonProps,
  DismissButtonVariant,
} from "./modal";

// Shared hooks
export { useBodyScrollLock, lockBodyScroll, unlockBodyScroll } from "./hooks";

// Shared utilities
export { cn } from "./utils";

// Shared types
export type { OverlayBaseProps } from "./types";

// Scrollbar styling - data attribute for applying custom scrollbar styles
export const SCROLLBAR_DATA_ATTRIBUTE = "data-ro-scroll" as const;
