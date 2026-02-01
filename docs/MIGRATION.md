# Migration Guide

Guide for migrating between versions and from other libraries.

## Migrating from Legacy Props

### Modal Components

The following props have been deprecated in favor of more consistent naming:

| Deprecated | Preferred | Notes |
|------------|-----------|-------|
| `isOpen` | `open` | Aligns with standard HTML attribute |
| `onClose` | `onDismiss` | More accurately describes the action |
| `testID` | `testId` | Consistent casing |

#### Before (Legacy)

```tsx
<Modal isOpen={showModal} onClose={handleClose}>
  Content
</Modal>

<BottomSheet open={showSheet} onClose={handleClose} testID="my-sheet">
  Content
</BottomSheet>
```

#### After (Preferred)

```tsx
<Modal open={showModal} onDismiss={handleClose}>
  Content
</Modal>

<BottomSheet open={showSheet} onDismiss={handleClose} testId="my-sheet">
  Content
</BottomSheet>
```

### BottomSheet Title

The `title` prop has been deprecated in favor of the `header` prop for more flexibility:

#### Before

```tsx
<BottomSheet open={open} onDismiss={handleClose} title="Sheet Title">
  Content
</BottomSheet>
```

#### After

```tsx
<BottomSheet
  open={open}
  onDismiss={handleClose}
  header={<h2 className="text-lg font-semibold">Sheet Title</h2>}
>
  Content
</BottomSheet>
```

---

## Migrating from react-spring-bottom-sheet

If you're migrating from `react-spring-bottom-sheet`, here's a comparison:

### API Mapping

| react-spring-bottom-sheet | @octavian-tocan/react-overlay |
|---------------------------|-------------------------------|
| `open` | `open` |
| `onDismiss` | `onDismiss` |
| `snapPoints` | `snapPoints` |
| `defaultSnap` | `defaultSnap` |
| `header` | `header` |
| `footer` | `footer` |
| `blocking` | `blocking` |
| `scrollLocking` | `scrollLocking` |
| `expandOnContentDrag` | `expandOnContentDrag` |
| `skipInitialTransition` | `skipInitialTransition` |
| `maxHeight` | `maxHeight` |
| `initialFocusRef` | `initialFocusRef` |
| `onSpringStart` | `onSpringStart` |
| `onSpringEnd` | `onSpringEnd` |
| `onSpringCancel` | `onSpringCancel` |

### Ref Methods

Both libraries support similar ref methods:

```tsx
// react-spring-bottom-sheet
sheetRef.current.snapTo(snapIndex);

// @octavian-tocan/react-overlay
sheetRef.current.snapTo(heightOrFunction);
```

**Key difference**: Our `snapTo` accepts a height value or function, not an index.

#### Migration

```tsx
// Before (react-spring-bottom-sheet)
sheetRef.current.snapTo(1); // Snap to second snap point

// After (@octavian-tocan/react-overlay)
sheetRef.current.snapTo(({ snapPoints }) => snapPoints[1]);
```

### Style Differences

`react-spring-bottom-sheet` uses CSS-in-JS with react-spring. Our package uses inline styles for the sheet and supports className overrides:

```tsx
// Our approach
<BottomSheet
  className="custom-overlay"
  style={{ zIndex: 2000 }}
>
```

---

## Migrating from @headlessui/react Dialog

If you're migrating from Headless UI Dialog:

### Basic Migration

#### Before (Headless UI)

```tsx
import { Dialog } from '@headlessui/react'

<Dialog open={isOpen} onClose={setIsOpen}>
  <Dialog.Panel className="...">
    <Dialog.Title>Title</Dialog.Title>
    <Dialog.Description>Description</Dialog.Description>
    Content
  </Dialog.Panel>
</Dialog>
```

#### After

```tsx
import { Modal, ModalHeader, ModalDescription } from '@octavian-tocan/react-overlay';

<Modal open={isOpen} onDismiss={() => setIsOpen(false)}>
  <ModalHeader icon={<Icon />} title="Title" />
  <ModalDescription>Description</ModalDescription>
  Content
</Modal>
```

### Feature Mapping

| Headless UI | @octavian-tocan/react-overlay |
|-------------|-------------------------------|
| `Dialog.Panel` | Built into `Modal`/`ModalWrapper` |
| `Dialog.Title` | `ModalHeader` (with icon) or custom |
| `Dialog.Description` | `ModalDescription` |
| `Dialog.Backdrop` | Built into overlay |
| `Transition` | Built-in Framer Motion animations |

### Key Differences

1. **Animations**: Our modals have built-in Framer Motion animations; Headless UI requires manual Transition setup
2. **Styling**: Our `Modal` has size presets and default styling; Headless UI is unstyled
3. **Icons**: `ModalHeader` includes an icon badge; Headless UI Title is text-only

---

## Migrating from Custom Implementations

### Common Patterns

#### Portal Rendering

If your custom modal uses a portal:

```tsx
// Your implementation
createPortal(<div className="modal">{children}</div>, document.body)

// Our package handles this internally
<Modal open={isOpen} onDismiss={handleClose}>
  {children}
</Modal>
```

#### Escape Key Handling

```tsx
// Your implementation
useEffect(() => {
  const handler = (e) => e.key === 'Escape' && onClose();
  window.addEventListener('keydown', handler);
  return () => window.removeEventListener('keydown', handler);
}, [onClose]);

// Built-in (disable with closeOnEscape={false})
<Modal open={isOpen} onDismiss={handleClose} closeOnEscape={true}>
```

#### Body Scroll Lock

```tsx
// Your implementation
useEffect(() => {
  if (isOpen) document.body.style.overflow = 'hidden';
  return () => { document.body.style.overflow = ''; };
}, [isOpen]);

// Built-in with ref-counting for multiple overlays
<Modal open={isOpen}>  {/* Scroll lock automatic */}
```

---

## Version Changelog

### 1.0.1

- Added scrollbar CSS customization
- Added `scrollable` prop to ModalWrapper
- Exported `SCROLLBAR_DATA_ATTRIBUTE` constant

### 1.0.0

- Initial release
- BottomSheet with snap points
- Modal with size presets
- ModalWrapper for customization
- ModalHeader, ModalDescription, DismissButton components
- useBodyScrollLock hook
- Full TypeScript support
