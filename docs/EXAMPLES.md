# Examples

Practical examples and recipes for common use cases.

## Table of Contents

- [BottomSheet Examples](#bottomsheet-examples)
- [Modal Examples](#modal-examples)
- [Advanced Patterns](#advanced-patterns)

---

## BottomSheet Examples

### Basic Sheet

```tsx
import { useState } from 'react';
import { BottomSheet } from '@octavian-tocan/react-overlay';

function BasicSheet() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Sheet</button>

      <BottomSheet open={open} onDismiss={() => setOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Hello World</h2>
        <p>This is a basic bottom sheet.</p>
      </BottomSheet>
    </>
  );
}
```

### Sheet with Custom Snap Points

```tsx
import { BottomSheet } from '@octavian-tocan/react-overlay';

function CustomSnapSheet() {
  const [open, setOpen] = useState(false);

  return (
    <BottomSheet
      open={open}
      onDismiss={() => setOpen(false)}
      snapPoints={({ maxHeight }) => [
        150,                    // Collapsed: just header visible
        maxHeight * 0.5,        // Half screen
        maxHeight * 0.9,        // Almost full screen
      ]}
      defaultSnap={({ maxHeight }) => maxHeight * 0.5}
    >
      <div className="space-y-4">
        <h2>Expandable Content</h2>
        <p>Drag the handle to expand or collapse.</p>
        {/* Long content */}
        {Array.from({ length: 20 }).map((_, i) => (
          <p key={i}>Item {i + 1}</p>
        ))}
      </div>
    </BottomSheet>
  );
}
```

### Sheet with Header and Footer

```tsx
import { BottomSheet } from '@octavian-tocan/react-overlay';

function SheetWithHeaderFooter() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<string[]>([]);

  return (
    <BottomSheet
      open={open}
      onDismiss={() => setOpen(false)}
      header={
        <div className="flex items-center justify-between py-2">
          <h2 className="text-lg font-semibold">Select Items</h2>
          <span className="text-sm text-gray-500">{items.length} selected</span>
        </div>
      }
      stickyHeader={
        <div className="border-b pb-2">
          <p className="text-sm font-semibold text-gray-700">Sticky Filters</p>
        </div>
      }
      footer={
        <div className="flex gap-2 py-2">
          <button
            className="flex-1 py-2 px-4 border rounded-lg"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg"
            onClick={() => {
              console.log('Selected:', items);
              setOpen(false);
            }}
          >
            Confirm
          </button>
        </div>
      }
    >
      <div className="space-y-2">
        {['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'].map((item) => (
          <label key={item} className="flex items-center gap-2 p-2 rounded hover:bg-gray-50">
            <input
              type="checkbox"
              checked={items.includes(item)}
              onChange={(e) => {
                setItems(prev =>
                  e.target.checked
                    ? [...prev, item]
                    : prev.filter(i => i !== item)
                );
              }}
            />
            {item}
          </label>
        ))}
      </div>
    </BottomSheet>
  );
}
```

### Programmatic Control with Ref

```tsx
import { useRef, useState } from 'react';
import { BottomSheet, BottomSheetRef } from '@octavian-tocan/react-overlay';

function ProgrammaticSheet() {
  const [open, setOpen] = useState(false);
  const sheetRef = useRef<BottomSheetRef>(null);

  const expandFull = () => {
    sheetRef.current?.snapTo(({ snapPoints }) => snapPoints[snapPoints.length - 1]);
  };

  const collapse = () => {
    sheetRef.current?.snapTo(({ snapPoints }) => snapPoints[0]);
  };

  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>

      <BottomSheet
        ref={sheetRef}
        open={open}
        onDismiss={() => setOpen(false)}
        snapPoints={[200, 400, 600]}
      >
        <div className="flex gap-2 mb-4">
          <button onClick={collapse} className="px-3 py-1 bg-gray-200 rounded">
            Collapse
          </button>
          <button onClick={expandFull} className="px-3 py-1 bg-gray-200 rounded">
            Expand Full
          </button>
        </div>
        <p>Current height: {sheetRef.current?.height ?? 'N/A'}px</p>
      </BottomSheet>
    </>
  );
}
```

### Sheet with Animation Callbacks

```tsx
import { BottomSheet } from '@octavian-tocan/react-overlay';

function AnimationCallbackSheet() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('closed');

  return (
    <>
      <p>Status: {status}</p>
      <button onClick={() => setOpen(true)}>Open</button>

      <BottomSheet
        open={open}
        onDismiss={() => setOpen(false)}
        onSpringStart={(event) => {
          setStatus(`${event.type} started (${event.source ?? 'system'})`);
        }}
        onSpringEnd={(event) => {
          setStatus(`${event.type} completed`);
        }}
      >
        <p>Drag and watch the status change!</p>
      </BottomSheet>
    </>
  );
}
```

---

## Modal Examples

### Confirmation Dialog

```tsx
import { Modal, ModalHeader, ModalDescription } from '@octavian-tocan/react-overlay';
import { AlertTriangle } from 'lucide-react';

function ConfirmationDialog() {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    console.log('Deleted!');
    setOpen(false);
  };

  return (
    <>
      <button onClick={() => setOpen(true)}>Delete Item</button>

      <Modal open={open} onDismiss={() => setOpen(false)} size="sm">
        <ModalHeader
          icon={<AlertTriangle className="w-4 h-4 text-white" />}
          title="Delete Item"
          iconBadgeClassName="bg-red-500"
        />
        <ModalDescription>
          Are you sure you want to delete this item? This action cannot be undone.
        </ModalDescription>

        <div className="flex gap-3 mt-6">
          <button
            className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
}
```

### Form Modal

```tsx
import { useState } from 'react';
import { Modal, ModalHeader } from '@octavian-tocan/react-overlay';
import { User } from 'lucide-react';

function FormModal() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', formData);
    setOpen(false);
  };

  return (
    <>
      <button onClick={() => setOpen(true)}>Add User</button>

      <Modal open={open} onDismiss={() => setOpen(false)} size="md">
        <ModalHeader
          icon={<User className="w-4 h-4 text-white" />}
          title="Add New User"
        />

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add User
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
```

### Image Gallery Modal

```tsx
import { useState } from 'react';
import { ModalWrapper } from '@octavian-tocan/react-overlay';

function ImageGalleryModal() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    'https://picsum.photos/800/600?random=1',
    'https://picsum.photos/800/600?random=2',
    'https://picsum.photos/800/600?random=3',
  ];

  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Image ${i + 1}`}
            className="cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setSelectedImage(src)}
          />
        ))}
      </div>

      <ModalWrapper
        open={!!selectedImage}
        onDismiss={() => setSelectedImage(null)}
        contentClassName="max-w-4xl"
        showDismissButton
        dismissButtonProps={{ variant: 'default' }}
      >
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Full size"
            className="w-full h-auto rounded-lg"
          />
        )}
      </ModalWrapper>
    </>
  );
}
```

### Custom Styled Modal

```tsx
import { ModalWrapper } from '@octavian-tocan/react-overlay';

function CustomStyledModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Custom Modal</button>

      <ModalWrapper
        open={open}
        onDismiss={() => setOpen(false)}
        contentClassName="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-8 max-w-lg shadow-2xl"
        overlayClassName="bg-black/70 backdrop-blur-sm"
        showDismissButton
        dismissButtonProps={{
          variant: 'subtle',
          className: 'text-white hover:text-white/80',
        }}
      >
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Welcome!</h2>
          <p className="text-white/80 mb-6">
            This is a fully customized modal with gradient background.
          </p>
          <button
            className="px-6 py-2 bg-white text-purple-600 rounded-full font-semibold hover:bg-white/90"
            onClick={() => setOpen(false)}
          >
            Get Started
          </button>
        </div>
      </ModalWrapper>
    </>
  );
}
```

---

## Advanced Patterns

### Nested Modals

```tsx
import { useState } from 'react';
import { Modal, ModalHeader, ModalDescription } from '@octavian-tocan/react-overlay';
import { Info, AlertTriangle } from 'lucide-react';

function NestedModals() {
  const [mainOpen, setMainOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <button onClick={() => setMainOpen(true)}>Open Settings</button>

      <Modal open={mainOpen} onDismiss={() => setMainOpen(false)} size="lg">
        <ModalHeader
          icon={<Info className="w-4 h-4 text-white" />}
          title="Settings"
        />

        <div className="space-y-4 mt-4">
          <p>Make changes to your settings here.</p>

          <button
            className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
            onClick={() => setConfirmOpen(true)}
          >
            Delete Account
          </button>
        </div>
      </Modal>

      {/* Nested confirmation modal */}
      <Modal
        open={confirmOpen}
        onDismiss={() => setConfirmOpen(false)}
        size="sm"
      >
        <ModalHeader
          icon={<AlertTriangle className="w-4 h-4 text-white" />}
          title="Confirm Delete"
          iconBadgeClassName="bg-red-500"
        />
        <ModalDescription>
          Are you sure? This will permanently delete your account.
        </ModalDescription>

        <div className="flex gap-3 mt-6">
          <button
            className="flex-1 py-2 border rounded-lg"
            onClick={() => setConfirmOpen(false)}
          >
            Cancel
          </button>
          <button
            className="flex-1 py-2 bg-red-600 text-white rounded-lg"
            onClick={() => {
              console.log('Account deleted');
              setConfirmOpen(false);
              setMainOpen(false);
            }}
          >
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
}
```

### Modal with Scrollable Content

```tsx
import { Modal } from '@octavian-tocan/react-overlay';
// Don't forget to import the scrollbar CSS in your app entry point:
// import '@octavian-tocan/react-overlay/styles/scrollbar.css';

function ScrollableModal() {
  const [open, setOpen] = useState(false);

  return (
    <Modal open={open} onDismiss={() => setOpen(false)} size="md">
      <h2 className="text-xl font-bold mb-4">Terms of Service</h2>

      {/* Add data-ro-scroll for custom scrollbar styling */}
      <div
        data-ro-scroll
        className="max-h-[400px] overflow-y-auto pr-2"
      >
        {Array.from({ length: 50 }).map((_, i) => (
          <p key={i} className="mb-4 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        ))}
      </div>

      <div className="flex justify-end mt-4 pt-4 border-t">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          onClick={() => setOpen(false)}
        >
          Accept
        </button>
      </div>
    </Modal>
  );
}
```

### Sheet to Modal Transition (Responsive)

```tsx
import { useState, useEffect } from 'react';
import { BottomSheet, Modal } from '@octavian-tocan/react-overlay';

function ResponsiveOverlay({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>

      {isMobile ? (
        <BottomSheet open={open} onDismiss={() => setOpen(false)}>
          {children}
        </BottomSheet>
      ) : (
        <Modal open={open} onDismiss={() => setOpen(false)}>
          {children}
        </Modal>
      )}
    </>
  );
}

// Usage
function App() {
  return (
    <ResponsiveOverlay>
      <h2>Responsive Content</h2>
      <p>Shows as BottomSheet on mobile, Modal on desktop.</p>
    </ResponsiveOverlay>
  );
}
```

### Loading State in Modal

```tsx
import { useState } from 'react';
import { Modal, ModalHeader } from '@octavian-tocan/react-overlay';
import { Upload } from 'lucide-react';

function UploadModal() {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = async () => {
    setUploading(true);
    setProgress(0);

    // Simulate upload
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(r => setTimeout(r, 200));
      setProgress(i);
    }

    setUploading(false);
    setOpen(false);
  };

  return (
    <>
      <button onClick={() => setOpen(true)}>Upload File</button>

      <Modal
        open={open}
        onDismiss={() => !uploading && setOpen(false)}
        closeOnOverlayClick={!uploading}
        closeOnEscape={!uploading}
        showDismissButton={!uploading}
      >
        <ModalHeader
          icon={<Upload className="w-4 h-4 text-white" />}
          title="Upload File"
        />

        {uploading ? (
          <div className="mt-4">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-center text-sm text-gray-500 mt-2">
              Uploading... {progress}%
            </p>
          </div>
        ) : (
          <>
            <div className="mt-4 p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
              <p className="text-gray-500">Drag and drop or click to select</p>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                className="flex-1 py-2 border rounded-lg"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg"
                onClick={handleUpload}
              >
                Upload
              </button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
```

### Accessible Modal with ARIA

```tsx
import { Modal, ModalDescription } from '@octavian-tocan/react-overlay';

function AccessibleModal() {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      open={open}
      onDismiss={() => setOpen(false)}
      ariaLabelledBy="modal-title"
      ariaDescribedBy="modal-description"
    >
      <h2 id="modal-title" className="text-xl font-bold">
        Accessible Modal
      </h2>

      <p id="modal-description" className="mt-2 text-gray-600">
        This modal has proper ARIA attributes for screen readers.
      </p>

      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        onClick={() => setOpen(false)}
      >
        Close
      </button>
    </Modal>
  );
}
```
