# @twinmind/bottom-sheet

A custom draggable bottom sheet component with snap points, inspired by [react-spring-bottom-sheet](https://github.com/stipsan/react-spring-bottom-sheet).

## Features

- **Snap Points**: Define multiple heights the sheet can snap to
- **Drag to Dismiss**: Swipe down to close the sheet
- **Spring Animations**: Smooth, physics-based animations
- **Sticky Header/Footer**: Keep actions visible while scrolling
- **Keyboard Support**: Escape key dismisses (when blocking)
- **Programmatic Control**: Use ref to snap to positions
- **Cross-Platform**: Works on React Native and React Native Web

## Installation

```bash
pnpm add @twinmind/bottom-sheet
```

## Usage

### Basic

```tsx
import { useState } from 'react';
import { BottomSheet } from '@twinmind/bottom-sheet';

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

### With Snap Points

```tsx
import { useRef, useState } from 'react';
import { BottomSheet, type BottomSheetRef } from '@twinmind/bottom-sheet';

function App() {
  const [open, setOpen] = useState(true);
  const ref = useRef<BottomSheetRef>(null);

  return (
    <BottomSheet
      ref={ref}
      open={open}
      onDismiss={() => setOpen(false)}
      snapPoints={({ maxHeight }) => [200, maxHeight * 0.5, maxHeight * 0.9]}
      defaultSnap={({ snapPoints }) => snapPoints[1]}
    >
      <button onClick={() => ref.current?.snapTo(200)}>Small</button>
      <button onClick={() => ref.current?.snapTo(({ maxHeight }) => maxHeight * 0.5)}>
        Medium
      </button>
      <button onClick={() => ref.current?.snapTo(({ maxHeight }) => maxHeight * 0.9)}>
        Large
      </button>
    </BottomSheet>
  );
}
```

### With Header and Footer

```tsx
<BottomSheet
  open={open}
  onDismiss={() => setOpen(false)}
  header={<h2>Edit Profile</h2>}
  footer={
    <div>
      <button onClick={() => setOpen(false)}>Cancel</button>
      <button onClick={handleSave}>Save</button>
    </div>
  }
>
  <form>{/* Form fields */}</form>
</BottomSheet>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | required | Whether the sheet is open |
| `onDismiss` | `() => void` | - | Called when dismissed (backdrop tap, swipe, escape) |
| `children` | `ReactNode` | required | Content to render inside the sheet |
| `snapPoints` | `number[] \| Function` | - | Snap point heights or function |
| `defaultSnap` | `number \| Function` | - | Initial snap point |
| `header` | `ReactNode` | - | Sticky header content |
| `footer` | `ReactNode` | - | Sticky footer content |
| `title` | `string` | - | *(deprecated)* Use `header` instead |
| `sibling` | `ReactNode` | - | Content rendered outside the overlay |
| `blocking` | `boolean` | `true` | Enable focus trap and escape key |
| `scrollLocking` | `boolean` | `true` | Lock body scroll when open |
| `expandOnContentDrag` | `boolean` | `false` | Allow dragging from content area |
| `skipInitialTransition` | `boolean` | `false` | Skip opening animation |
| `maxHeight` | `number` | - | Maximum height constraint |
| `onSpringStart` | `(event) => void` | - | Called when animation starts |
| `onSpringEnd` | `(event) => void` | - | Called when animation ends |
| `testID` | `string` | - | Test ID for testing |

## Ref Methods

```tsx
interface BottomSheetRef {
  snapTo: (height: number | ((state) => number), options?) => void;
  height: number; // Current height
}
```

## License

MIT
