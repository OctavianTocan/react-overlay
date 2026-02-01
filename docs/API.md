# API Reference

Complete API documentation for `@octavian-tocan/react-overlay`.

## Table of Contents

- [BottomSheet](#bottomsheet)
- [Modal](#modal)
- [ModalWrapper](#modalwrapper)
- [ModalHeader](#modalheader)
- [ModalDescription](#modaldescription)
- [DismissButton](#dismissbutton)
- [Hooks](#hooks)
- [Utilities](#utilities)
- [Constants](#constants)
- [Types](#types)

---

## BottomSheet

A draggable bottom sheet component with snap points, spring animations, and gesture support.

### Import

```tsx
import { BottomSheet } from '@octavian-tocan/react-overlay';
import type { BottomSheetProps, BottomSheetRef } from '@octavian-tocan/react-overlay';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | **required** | Whether the sheet is open |
| `onDismiss` | `() => void` | - | Callback when the sheet is dismissed (backdrop tap, swipe down, escape key) |
| `children` | `ReactNode` | **required** | Content to render inside the sheet |
| `snapPoints` | `number[] \| SnapPointsFunction` | `[40%, 85%]` | Snap points as pixel values or a function |
| `defaultSnap` | `number \| DefaultSnapFunction` | last snap point | Initial snap point when opening |
| `header` | `ReactNode` | - | Sticky header content |
| `footer` | `ReactNode` | - | Sticky footer content |
| `sibling` | `ReactNode` | - | Content rendered as sibling to backdrop |
| `blocking` | `boolean` | `true` | Whether to trap focus and manage aria-hidden |
| `scrollLocking` | `boolean` | `true` | Whether to lock body scroll when open |
| `expandOnContentDrag` | `boolean` | `false` | Allow expanding by dragging the content area |
| `skipInitialTransition` | `boolean` | `false` | Skip the initial spring animation when opening |
| `maxHeight` | `number` | `90vh` | Maximum height constraint in pixels |
| `initialFocusRef` | `RefObject<HTMLElement> \| false` | - | Ref for initial focus, pass `false` to disable |
| `className` | `string` | - | CSS class name applied to the root element |
| `style` | `CSSProperties` | - | Inline styles applied to the root element |
| `onSpringStart` | `(event: SpringEvent) => void` | - | Called when spring animation starts |
| `onSpringEnd` | `(event: SpringEvent) => void` | - | Called when spring animation ends |
| `onSpringCancel` | `(event: SpringEvent) => void` | - | Called when spring animation is cancelled |
| `testId` | `string` | - | Test ID for testing |

### Ref Methods

Access via `useRef<BottomSheetRef>()`:

```tsx
interface BottomSheetRef {
  /** Snap to a specific height or calculated position */
  snapTo: (to: number | ((state: SnapPointState) => number), options?: SnapToOptions) => void;
  /** Current snap point height (updated outside render cycle) */
  height: number;
}
```

### Examples

#### Basic Usage

```tsx
import { BottomSheet } from '@octavian-tocan/react-overlay';
import { useState } from 'react';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Sheet</button>
      <BottomSheet open={open} onDismiss={() => setOpen(false)}>
        <p>Sheet content here</p>
      </BottomSheet>
    </>
  );
}
```

#### With Custom Snap Points

```tsx
<BottomSheet
  open={open}
  onDismiss={() => setOpen(false)}
  snapPoints={({ maxHeight }) => [200, maxHeight * 0.5, maxHeight * 0.9]}
  defaultSnap={({ snapPoints }) => snapPoints[1]} // Start at middle snap
>
  <p>Content with custom snap points</p>
</BottomSheet>
```

#### With Header and Footer

```tsx
<BottomSheet
  open={open}
  onDismiss={() => setOpen(false)}
  header={<h2 className="text-lg font-semibold">Sheet Title</h2>}
  footer={
    <div className="flex gap-2">
      <button onClick={() => setOpen(false)}>Cancel</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  }
>
  <p>Main content</p>
</BottomSheet>
```

#### Programmatic Control

```tsx
import { useRef } from 'react';
import { BottomSheet, BottomSheetRef } from '@octavian-tocan/react-overlay';

function App() {
  const sheetRef = useRef<BottomSheetRef>(null);

  const expandToMax = () => {
    sheetRef.current?.snapTo(({ snapPoints }) => snapPoints[snapPoints.length - 1]);
  };

  return (
    <>
      <button onClick={expandToMax}>Expand</button>
      <BottomSheet ref={sheetRef} open={open} onDismiss={() => setOpen(false)}>
        <p>Content</p>
      </BottomSheet>
    </>
  );
}
```

---

## Modal

A high-level modal component with sensible defaults and size presets.

### Import

```tsx
import { Modal } from '@octavian-tocan/react-overlay';
import type { ModalProps, ModalSize } from '@octavian-tocan/react-overlay';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | **required** | Whether the modal is open |
| `onDismiss` | `() => void` | - | Callback when modal should close |
| `children` | `ReactNode` | **required** | Modal content |
| `size` | `ModalSize` | `'md'` | Size preset: `'sm'`, `'md'`, `'lg'`, `'xl'`, `'full'` |
| `className` | `string` | - | Custom class for the content container |
| `overlayClassName` | `string` | - | CSS class for the overlay |
| `padding` | `boolean` | `true` | Whether to add default padding |
| `closeOnOverlayClick` | `boolean` | `true` | Whether clicking outside closes the modal |
| `closeOnEscape` | `boolean` | `true` | Whether Escape key closes the modal |
| `showDismissButton` | `boolean` | `true` | Whether to show the X button |
| `dismissButtonProps` | `DismissButtonProps` | - | Props to pass to the dismiss button |
| `testId` | `string` | - | Test ID for the overlay |
| `ariaLabelledBy` | `string` | - | ID of element that labels the modal |
| `ariaDescribedBy` | `string` | - | ID of element that describes the modal |
| `ariaLabel` | `string` | - | Accessible label for the modal |

### Size Presets

| Size | Max Width |
|------|-----------|
| `sm` | `max-w-sm` (384px) |
| `md` | `max-w-md` (448px) |
| `lg` | `max-w-lg` (512px) |
| `xl` | `max-w-xl` (576px) |
| `full` | `max-w-[90vw]` |

### Examples

#### Basic Modal

```tsx
import { Modal } from '@octavian-tocan/react-overlay';

<Modal open={isOpen} onDismiss={() => setIsOpen(false)}>
  <h2>Modal Title</h2>
  <p>Modal content goes here.</p>
</Modal>
```

#### With Header Components

```tsx
import { Modal, ModalHeader, ModalDescription } from '@octavian-tocan/react-overlay';
import { AlertCircle } from 'lucide-react';

<Modal open={isOpen} onDismiss={() => setIsOpen(false)} size="md">
  <ModalHeader
    icon={<AlertCircle className="w-4 h-4 text-white" />}
    title="Confirm Delete"
  />
  <ModalDescription>
    Are you sure you want to delete this item? This action cannot be undone.
  </ModalDescription>
  <div className="flex gap-2 mt-4">
    <button onClick={() => setIsOpen(false)}>Cancel</button>
    <button onClick={handleDelete}>Delete</button>
  </div>
</Modal>
```

---

## ModalWrapper

Low-level modal component for full customization. Used internally by `Modal`.

### Import

```tsx
import { ModalWrapper } from '@octavian-tocan/react-overlay';
import type { ModalWrapperProps } from '@octavian-tocan/react-overlay';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | Whether the modal is open |
| `onDismiss` | `() => void` | - | Callback when modal should close |
| `children` | `ReactNode` | **required** | Modal content |
| `contentClassName` | `string` | - | CSS class for content wrapper |
| `overlayClassName` | `string` | - | CSS class for overlay |
| `closeOnOverlayClick` | `boolean` | `true` | Close on backdrop click |
| `closeOnEscape` | `boolean` | `true` | Close on Escape key |
| `showDismissButton` | `boolean` | `false` | Show X button |
| `dismissButtonProps` | `DismissButtonProps` | - | Props for dismiss button |
| `scrollable` | `boolean` | `true` | Apply scrollbar styling |
| `testId` | `string` | `'modal-overlay'` | Test ID |
| `ariaLabelledBy` | `string` | - | aria-labelledby attribute |
| `ariaDescribedBy` | `string` | - | aria-describedby attribute |
| `ariaLabel` | `string` | - | aria-label attribute |

### Example

```tsx
<ModalWrapper
  open={isOpen}
  onDismiss={handleClose}
  contentClassName="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-8 max-w-2xl"
  showDismissButton
  dismissButtonProps={{ variant: 'subtle' }}
>
  <div className="text-white">
    <h2>Custom Styled Modal</h2>
    <p>Full control over styling</p>
  </div>
</ModalWrapper>
```

---

## ModalHeader

Reusable header component with icon badge and title.

### Import

```tsx
import { ModalHeader } from '@octavian-tocan/react-overlay';
import type { ModalHeaderProps } from '@octavian-tocan/react-overlay';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `ReactNode` | **required** | Icon to display in the circular badge |
| `title` | `string` | **required** | Title text |
| `className` | `string` | - | Class name overrides for container |
| `titleClassName` | `string` | - | Class name for the title text |
| `iconBadgeClassName` | `string` | - | Class name for the icon badge |

### Example

```tsx
import { ModalHeader } from '@octavian-tocan/react-overlay';
import { Check } from 'lucide-react';

<ModalHeader
  icon={<Check className="w-4 h-4 text-white" />}
  title="Success"
  iconBadgeClassName="bg-green-500"
  titleClassName="text-green-700"
/>
```

---

## ModalDescription

Styled description text component for modals.

### Import

```tsx
import { ModalDescription } from '@octavian-tocan/react-overlay';
import type { ModalDescriptionProps } from '@octavian-tocan/react-overlay';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **required** | Description content |
| `className` | `string` | - | Class name overrides |

### Example

```tsx
<ModalDescription className="text-red-500">
  Warning: This action cannot be undone.
</ModalDescription>
```

---

## DismissButton

Close button for modals and overlays with portal support to avoid overflow clipping.

### Import

```tsx
import { DismissButton } from '@octavian-tocan/react-overlay';
import type { DismissButtonProps, DismissButtonVariant } from '@octavian-tocan/react-overlay';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onClick` | `() => void` | **required** | Called when the button is clicked |
| `size` | `number` | `18` | Icon size in pixels |
| `className` | `string` | - | Class name overrides |
| `aria-label` | `string` | `'Dismiss'` | Accessible label |
| `position` | `string` | `'absolute -top-2 -right-2 z-10'` | Positioning classes |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `variant` | `DismissButtonVariant` | `'default'` | Visual variant: `'default'` or `'subtle'` |
| `testId` | `string` | - | Test ID |
| `avoidOverflowClipping` | `boolean` | `true` | Render in portal to avoid clipping |

### Variants

- **`default`**: Has border, shadow, larger size (28px) - recommended for modals
- **`subtle`**: Borderless, smaller size (24px) - for banners or inline use

### Example

```tsx
<DismissButton
  onClick={handleClose}
  variant="subtle"
  position="absolute top-4 right-4"
  aria-label="Close notification"
  avoidOverflowClipping={false}
/>
```

---

## Hooks

### useBodyScrollLock

Lock body scroll when an overlay is open. Supports multiple concurrent overlays via ref-counting.

```tsx
import { useBodyScrollLock } from '@octavian-tocan/react-overlay';

function MyOverlay({ isOpen }) {
  useBodyScrollLock(isOpen);
  return isOpen ? <div>Overlay content</div> : null;
}
```

### lockBodyScroll / unlockBodyScroll

Imperative functions for manual scroll lock control.

```tsx
import { lockBodyScroll, unlockBodyScroll } from '@octavian-tocan/react-overlay';

// Lock scroll
lockBodyScroll();

// Later, unlock
unlockBodyScroll();
```

---

## Utilities

### cn

Class name utility combining `clsx` and `tailwind-merge` for conditional classes with Tailwind conflict resolution.

```tsx
import { cn } from '@octavian-tocan/react-overlay';

<div className={cn(
  'base-class',
  isActive && 'bg-blue-500',
  isDisabled && 'opacity-50',
  className
)} />
```

---

## Constants

Exported design tokens from BottomSheet:

```tsx
import { COLORS, DURATION, RADIUS, SPACING, SPRING } from '@octavian-tocan/react-overlay';
```

### COLORS

```ts
const COLORS = {
  surface: { card: '#FFFFFF' },
  text: { primary: '#1A1A2E' },
  border: { subtle: '#E5E5E5' },
  neutral: { gray300: '#D1D5DB' },
};
```

### DURATION

```ts
const DURATION = {
  smooth: 200,
  fast: 150,
  slow: 300,
};
```

### SPACING

```ts
const SPACING = {
  sm: 8,
  md: 16,
  lg: 24,
};
```

### RADIUS

```ts
const RADIUS = {
  xl: 16,
  xl2: 24,
};
```

### SPRING

```ts
const SPRING = {
  gentle: { stiffness: 120, damping: 14 },
  snappy: { stiffness: 400, damping: 30 },
};
```

---

## Types

### BottomSheet Types

```tsx
import type {
  BottomSheetProps,
  BottomSheetRef,
  SnapPointMeasurements,
  SnapPointState,
  SnapPointsFunction,
  DefaultSnapFunction,
  SpringEvent,
  SpringEventType,
  ResizeSource,
  SnapToOptions,
} from '@octavian-tocan/react-overlay';
```

#### SnapPointMeasurements

```ts
interface SnapPointMeasurements {
  headerHeight: number;
  footerHeight: number;
  height: number;
  minHeight: number;
  maxHeight: number;
}
```

#### SnapPointState

```ts
interface SnapPointState extends SnapPointMeasurements {
  snapPoints: number[];
  lastSnap: number | null;
}
```

#### SpringEvent

```ts
interface SpringEvent {
  type: 'OPEN' | 'CLOSE' | 'SNAP' | 'RESIZE';
  source?: 'dragging' | 'custom' | 'window' | 'maxheightprop' | 'element';
}
```

### Modal Types

```tsx
import type {
  ModalProps,
  ModalWrapperProps,
  ModalSize,
  ModalHeaderProps,
  ModalDescriptionProps,
  DismissButtonProps,
  DismissButtonVariant,
} from '@octavian-tocan/react-overlay';
```

### Shared Types

```tsx
import type { OverlayBaseProps } from '@octavian-tocan/react-overlay';
```

---

## Scrollbar Customization

The package includes optional CSS for custom scrollbar styling.

### Setup

Import the CSS file in your app entry point:

```tsx
import '@octavian-tocan/react-overlay/styles/scrollbar.css';
```

### Customization

Override CSS variables to customize:

```css
:root {
  --ro-scrollbar-thumb: #your-color;
  --ro-scrollbar-thumb-hover: #your-hover-color;
  --ro-scrollbar-width: 6px;
  --ro-scrollbar-track: transparent;
}
```

### Usage

Elements with `data-ro-scroll` attribute receive the custom scrollbar styling:

- **BottomSheet**: Applied automatically to the scroll container
- **ModalWrapper**: Applied when `scrollable={true}` (default)
- **Custom elements**: Add `data-ro-scroll` attribute manually

```tsx
<div data-ro-scroll className="overflow-auto max-h-96">
  Scrollable content with custom scrollbar
</div>
```

### Data Attribute Constant

```tsx
import { SCROLLBAR_DATA_ATTRIBUTE } from '@octavian-tocan/react-overlay';
// Value: 'data-ro-scroll'
```
