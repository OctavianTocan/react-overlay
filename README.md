# @octavian-tocan/react-overlay

Unified overlay components for React: BottomSheet with snap points and Modal with animations.

[![npm version](https://img.shields.io/npm/v/@octavian-tocan/react-overlay.svg)](https://www.npmjs.com/package/@octavian-tocan/react-overlay)
[![license](https://img.shields.io/npm/l/@octavian-tocan/react-overlay.svg)](https://github.com/OctavianTocan/react-overlay/blob/main/LICENSE)

## Installation

```bash
npm install @octavian-tocan/react-overlay
# or
pnpm add @octavian-tocan/react-overlay
# or
yarn add @octavian-tocan/react-overlay
```

### Peer Dependencies

```bash
npm install react react-dom motion clsx tailwind-merge
# Optional: lucide-react (for DismissButton icon)
npm install lucide-react
```

## Quick Start (Copy & Paste)

### BottomSheet

```tsx
import { useState } from "react";
import { BottomSheet } from "@octavian-tocan/react-overlay";

export function MyBottomSheet() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Sheet</button>
      <BottomSheet
        open={open}
        onDismiss={() => setOpen(false)}
        snapPoints={({ maxHeight }) => [200, maxHeight * 0.5, maxHeight * 0.9]}
      >
        <div className="p-4">
          <h2>Sheet Content</h2>
          <p>Drag to resize or swipe down to dismiss.</p>
        </div>
      </BottomSheet>
    </>
  );
}
```

### Modal

```tsx
import { useState } from "react";
import { Modal, ModalHeader, ModalDescription } from "@octavian-tocan/react-overlay";
import { AlertCircle } from "lucide-react";

export function MyModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <Modal open={open} onDismiss={() => setOpen(false)} size="md">
        <ModalHeader icon={<AlertCircle className="w-4 h-4 text-white" />} title="Confirm Action" />
        <ModalDescription>Are you sure you want to proceed?</ModalDescription>
        <div className="flex gap-2 mt-4 justify-end">
          <button onClick={() => setOpen(false)}>Cancel</button>
          <button
            onClick={() => {
              /* handle confirm */ setOpen(false);
            }}
          >
            Confirm
          </button>
        </div>
      </Modal>
    </>
  );
}
```

## Documentation

- [Live Storybook](https://octaviantocan.github.io/react-overlay) <!-- TODO: Update after deployment -->
- [API Reference](./docs/API.md)
- [Examples](./docs/EXAMPLES.md)
- [Architecture](./docs/ARCHITECTURE.md)
- [Migration Guide](./docs/MIGRATION.md)

## Components

### BottomSheet

A draggable bottom sheet with snap points, spring animations, and swipe-to-dismiss.

```tsx
import { BottomSheet } from "@octavian-tocan/react-overlay";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <BottomSheet
      open={open}
      onDismiss={() => setOpen(false)}
      snapPoints={({ maxHeight }) => [200, maxHeight * 0.5, maxHeight * 0.9]}
    >
      <p>Sheet content here</p>
    </BottomSheet>
  );
}
```

#### BottomSheet Props

| Prop            | Type                   | Default      | Description                    |
| --------------- | ---------------------- | ------------ | ------------------------------ |
| `open`          | `boolean`              | required     | Whether the sheet is open      |
| `onDismiss`     | `() => void`           | required     | Called when sheet is dismissed |
| `children`      | `ReactNode`            | required     | Content to render              |
| `snapPoints`    | `number[] \| Function` | `[40%, 85%]` | Snap points for the sheet      |
| `defaultSnap`   | `number \| Function`   | last point   | Initial snap point             |
| `header`        | `ReactNode`            | -            | Header content above the scroll area |
| `stickyHeader`  | `ReactNode`            | -            | Sticky header inside the scroll area |
| `footer`        | `ReactNode`            | -            | Sticky footer content          |
| `scrollLocking` | `boolean`              | `true`       | Lock body scroll when open     |
| `testId`        | `string`               | -            | Test ID for testing            |

### Modal

A centered modal dialog with size presets and Motion animations.

```tsx
import { Modal, ModalHeader, ModalDescription } from "@octavian-tocan/react-overlay";
import { AlertCircle } from "lucide-react";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <Modal open={open} onDismiss={() => setOpen(false)} size="md">
      <ModalHeader icon={<AlertCircle className="w-4 h-4 text-white" />} title="Confirm Action" />
      <ModalDescription>Are you sure you want to proceed?</ModalDescription>
      {/* Your content */}
    </Modal>
  );
}
```

#### Modal Props

| Prop                  | Type                                     | Default  | Description                    |
| --------------------- | ---------------------------------------- | -------- | ------------------------------ |
| `open`                | `boolean`                                | required | Whether the modal is open      |
| `onDismiss`           | `() => void`                             | required | Called when modal is dismissed |
| `children`            | `ReactNode`                              | required | Content to render              |
| `size`                | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'`   | Size preset                    |
| `padding`             | `boolean`                                | `true`   | Add default padding            |
| `closeOnOverlayClick` | `boolean`                                | `true`   | Close on backdrop click        |
| `closeOnEscape`       | `boolean`                                | `true`   | Close on Escape key            |
| `showDismissButton`   | `boolean`                                | `true`   | Show X button                  |
| `testId`              | `string`                                 | -        | Test ID for testing            |

### ModalWrapper

Low-level modal component for full customization.

```tsx
import { ModalWrapper } from "@octavian-tocan/react-overlay";

<ModalWrapper
  open={isOpen}
  onDismiss={handleClose}
  contentClassName="bg-white rounded-xl p-8 max-w-lg"
  showDismissButton
>
  {children}
</ModalWrapper>;
```

### Helper Components

#### ModalHeader

Header with icon badge and title.

```tsx
import { ModalHeader } from "@octavian-tocan/react-overlay";
import { AlertCircle } from "lucide-react";

<ModalHeader icon={<AlertCircle className="w-4 h-4 text-white" />} title="Confirm Delete" />;
```

#### ModalDescription

Styled description text.

```tsx
import { ModalDescription } from "@octavian-tocan/react-overlay";

<ModalDescription>This action cannot be undone.</ModalDescription>;
```

#### DismissButton

Close button for overlays.

```tsx
import { DismissButton } from "@octavian-tocan/react-overlay";

<DismissButton
  onClick={handleClose}
  variant="default" // or "subtle"
  position="absolute top-3 right-3"
/>;
```

## Hooks

### useBodyScrollLock

Lock body scroll when an overlay is open. Supports multiple concurrent overlays via ref-counting.

```tsx
import { useBodyScrollLock } from "@octavian-tocan/react-overlay";

function MyOverlay({ isOpen }) {
  useBodyScrollLock(isOpen);
  return isOpen ? <div>Overlay content</div> : null;
}
```

## Utilities

### cn

Class name utility (clsx + tailwind-merge) for conditional classes.

```tsx
import { cn } from "@octavian-tocan/react-overlay";

<div className={cn("base-class", isActive && "active-class", className)} />;
```

## TypeScript

Full TypeScript support with exported types:

```tsx
import type {
  BottomSheetProps,
  BottomSheetRef,
  ModalProps,
  ModalWrapperProps,
  ModalSize,
  ModalHeaderProps,
  ModalDescriptionProps,
  DismissButtonProps,
} from "@octavian-tocan/react-overlay";
```

## Custom Scrollbar Styling

The package includes optional CSS for custom scrollbar styling on scrollable content.

### Setup

Import the CSS file once in your app entry point:

```tsx
// In your app entry (e.g., main.tsx, App.tsx)
import "@octavian-tocan/react-overlay/styles/scrollbar.css";
```

### Customization

Override CSS variables to match your theme:

```css
:root {
  --ro-scrollbar-thumb: #6366f1; /* Scrollbar color */
  --ro-scrollbar-thumb-hover: #4f46e5; /* Hover color */
  --ro-scrollbar-width: 6px; /* Width */
  --ro-scrollbar-track: transparent; /* Track color */
}
```

### Usage

- **BottomSheet**: Scrollbar styling applied automatically
- **ModalWrapper**: Applied when `scrollable={true}` (default)
- **Custom elements**: Add `data-ro-scroll` attribute

```tsx
<div data-ro-scroll className="overflow-auto max-h-96">
  Scrollable content with custom styling
</div>
```

## License

MIT © [Octavian Tocan](https://github.com/OctavianTocan)
