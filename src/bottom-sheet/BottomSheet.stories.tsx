import type { Meta, StoryObj } from "@storybook/react";
import { useRef, useState } from "react";
import { BottomSheet } from "./BottomSheet";
import type { BottomSheetRef, SpringEvent } from "./types";

const meta: Meta<typeof BottomSheet> = {
  title: "Components/BottomSheet",
  component: BottomSheet,
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
      description: "Whether the sheet is open",
    },
    blocking: {
      control: "boolean",
      description: "Whether to trap focus and manage aria-hidden",
    },
    scrollLocking: {
      control: "boolean",
      description: "Whether to lock body scroll when open",
    },
    expandOnContentDrag: {
      control: "boolean",
      description: "Allow expanding by dragging the content area",
    },
    skipInitialTransition: {
      control: "boolean",
      description: "Skip the initial spring animation when opening",
    },
    maxHeight: {
      control: { type: "range", min: 200, max: 800, step: 50 },
      description: "Maximum height constraint",
    },
    keyboardBehavior: {
      control: "select",
      options: ["ignore", "snap"],
      description: "How the sheet behaves when virtual keyboard opens",
    },
    keyboardSnapPoint: {
      control: "number",
      description: "Index of snap point to use when keyboard opens",
    },
  },
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof BottomSheet>;

// Interactive wrapper for controlled bottom sheet stories
function BottomSheetDemo({
  children,
  buttonText = "Open Bottom Sheet",
  ...props
}: Omit<React.ComponentProps<typeof BottomSheet>, "open" | "onDismiss"> & {
  buttonText?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        {buttonText}
      </button>
      <BottomSheet open={open} onDismiss={() => setOpen(false)} {...props}>
        {children}
      </BottomSheet>
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <BottomSheetDemo>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Bottom Sheet</h2>
      <p className="text-gray-600">
        This is a basic bottom sheet. Drag the handle to expand or collapse, or swipe down to dismiss.
      </p>
    </BottomSheetDemo>
  ),
};

export const WithHeader: Story = {
  render: () => (
    <BottomSheetDemo
      header={
        <div className="pb-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Sheet Header</h2>
          <p className="text-sm text-gray-500">Sticky header content</p>
        </div>
      }
    >
      <div className="space-y-4 pt-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <p key={i} className="text-gray-600">
            Content paragraph {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        ))}
      </div>
    </BottomSheetDemo>
  ),
};

export const WithStickyHeader: Story = {
  render: () => (
    <BottomSheetDemo
      header={
        <div className="pb-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Sheet Header</h2>
          <p className="text-sm text-gray-500">Static header above the scroll area.</p>
        </div>
      }
      stickyHeader={
        <div className="pb-3 border-b border-gray-200">
          <p className="text-sm font-semibold text-gray-700">Sticky Nav</p>
          <p className="text-xs text-gray-500">Stays visible while you scroll.</p>
        </div>
      }
    >
      <div className="space-y-4 pt-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <p key={i} className="text-gray-600">
            Scrollable content paragraph {i + 1}. Keep scrolling to see the sticky header stay visible.
          </p>
        ))}
      </div>
    </BottomSheetDemo>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <BottomSheetDemo
      footer={
        <div className="flex gap-3 pt-4">
          <button className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
            Cancel
          </button>
          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Confirm
          </button>
        </div>
      }
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-2">With Footer</h2>
      <p className="text-gray-600">This bottom sheet has a sticky footer with action buttons.</p>
    </BottomSheetDemo>
  ),
};

export const WithHeaderAndFooter: Story = {
  render: () => (
    <BottomSheetDemo
      header={
        <div className="pb-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Complete Layout</h2>
        </div>
      }
      footer={
        <div className="flex gap-3 pt-4">
          <button className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">Cancel</button>
          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg">Save</button>
        </div>
      }
    >
      <div className="space-y-4 pt-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <p key={i} className="text-gray-600">
            Scrollable content paragraph {i + 1}. Lorem ipsum dolor sit amet.
          </p>
        ))}
      </div>
    </BottomSheetDemo>
  ),
};

export const CustomSnapPoints: Story = {
  render: () => (
    <BottomSheetDemo snapPoints={[200, 400, 600]} buttonText="Open (Snap: 200, 400, 600)">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Custom Snap Points</h2>
      <p className="text-gray-600 mb-4">
        This sheet has three snap points: 200px, 400px, and 600px. Drag to feel the snapping behavior.
      </p>
      <div className="space-y-2 text-sm text-gray-500">
        <p>• Collapsed: 200px</p>
        <p>• Medium: 400px</p>
        <p>• Expanded: 600px</p>
      </div>
    </BottomSheetDemo>
  ),
};

export const DynamicSnapPoints: Story = {
  render: () => (
    <BottomSheetDemo
      snapPoints={({ maxHeight }) => [maxHeight * 0.3, maxHeight * 0.6, maxHeight * 0.9]}
      buttonText="Open (Dynamic Snap Points)"
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Dynamic Snap Points</h2>
      <p className="text-gray-600">
        Snap points are calculated as percentages of maxHeight (30%, 60%, 90%). These adapt to different screen sizes.
      </p>
    </BottomSheetDemo>
  ),
};

export const DefaultSnapPoint: Story = {
  render: () => (
    <BottomSheetDemo snapPoints={[200, 400, 600]} defaultSnap={400} buttonText="Open at 400px">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Default Snap Point</h2>
      <p className="text-gray-600">
        This sheet opens at the middle snap point (400px) instead of the default behavior.
      </p>
    </BottomSheetDemo>
  ),
};

export const ExpandOnDrag: Story = {
  render: () => (
    <BottomSheetDemo expandOnContentDrag buttonText="Open (Drag Content to Expand)">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Expand on Content Drag</h2>
      <p className="text-gray-600 mb-4">
        With expandOnContentDrag enabled, you can drag anywhere in the content area to expand or collapse the sheet, not
        just the handle.
      </p>
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="p-4 bg-gray-100 rounded-lg">
            <p className="text-gray-700">Draggable content item {i + 1}</p>
          </div>
        ))}
      </div>
    </BottomSheetDemo>
  ),
};

export const NonBlocking: Story = {
  render: () => (
    <BottomSheetDemo blocking={false} buttonText="Open (Non-blocking)">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Non-blocking Sheet</h2>
      <p className="text-gray-600">
        With blocking=false, focus is not trapped and aria-hidden is not managed. The page behind remains interactive.
      </p>
    </BottomSheetDemo>
  ),
};

export const NoScrollLock: Story = {
  render: () => (
    <BottomSheetDemo scrollLocking={false} buttonText="Open (No Scroll Lock)">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">No Scroll Lock</h2>
      <p className="text-gray-600">
        With scrollLocking=false, the body can still be scrolled while the sheet is open. Try scrolling the page behind.
      </p>
    </BottomSheetDemo>
  ),
};

export const SkipAnimation: Story = {
  render: () => (
    <BottomSheetDemo skipInitialTransition buttonText="Open (No Animation)">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Skip Initial Transition</h2>
      <p className="text-gray-600">
        With skipInitialTransition=true, the sheet appears instantly without the opening animation.
      </p>
    </BottomSheetDemo>
  ),
};

export const CustomMaxHeight: Story = {
  render: () => (
    <BottomSheetDemo maxHeight={400} buttonText="Open (Max Height: 400px)">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Custom Max Height</h2>
      <p className="text-gray-600 mb-4">This sheet has a maxHeight of 400px. It cannot expand beyond this limit.</p>
      <div className="space-y-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <p key={i} className="text-gray-600">
            Content paragraph {i + 1} - scroll to see more
          </p>
        ))}
      </div>
    </BottomSheetDemo>
  ),
};

export const WithSibling: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Open with FAB
        </button>
        <BottomSheet
          open={open}
          onDismiss={() => setOpen(false)}
          sibling={
            <button
              onClick={() => alert("FAB clicked!")}
              className="fixed bottom-24 right-4 w-14 h-14 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors flex items-center justify-center text-2xl z-[1001]"
            >
              +
            </button>
          }
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-2">With Sibling Content</h2>
          <p className="text-gray-600">
            The sibling prop renders content outside the sheet but inside the overlay. Notice the floating action button
            (FAB) that stays visible.
          </p>
        </BottomSheet>
      </div>
    );
  },
};

export const WithRef: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const sheetRef = useRef<BottomSheetRef>(null);

    const snapToMin = () => sheetRef.current?.snapTo(200);
    const snapToMid = () => sheetRef.current?.snapTo(400);
    const snapToMax = () => sheetRef.current?.snapTo(600);

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Open with Ref Control
        </button>
        <BottomSheet ref={sheetRef} open={open} onDismiss={() => setOpen(false)} snapPoints={[200, 400, 600]}>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Programmatic Control</h2>
          <p className="text-gray-600 mb-4">Use the ref to programmatically control the sheet's snap position.</p>
          <div className="flex gap-2">
            <button onClick={snapToMin} className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-sm">
              Snap to 200
            </button>
            <button onClick={snapToMid} className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-sm">
              Snap to 400
            </button>
            <button onClick={snapToMax} className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-sm">
              Snap to 600
            </button>
          </div>
        </BottomSheet>
      </div>
    );
  },
};

export const SpringCallbacks: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [events, setEvents] = useState<string[]>([]);

    const logEvent = (name: string, event: SpringEvent) => {
      const timestamp = new Date().toLocaleTimeString();
      setEvents((prev) => [
        ...prev.slice(-4),
        `${timestamp} - ${name}: ${event.type}${event.source ? ` (${event.source})` : ""}`,
      ]);
    };

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-4"
          >
            Open with Callbacks
          </button>
          <div className="bg-white rounded-lg p-4 shadow-md max-w-xs">
            <h3 className="font-semibold text-gray-900 mb-2">Event Log</h3>
            <div className="text-xs text-left space-y-1 font-mono">
              {events.length === 0 ? (
                <p className="text-gray-400">No events yet</p>
              ) : (
                events.map((event, i) => (
                  <p key={i} className="text-gray-600">
                    {event}
                  </p>
                ))
              )}
            </div>
          </div>
        </div>
        <BottomSheet
          open={open}
          onDismiss={() => setOpen(false)}
          onSpringStart={(e) => logEvent("onSpringStart", e)}
          onSpringEnd={(e) => logEvent("onSpringEnd", e)}
          onSpringCancel={(e) => logEvent("onSpringCancel", e)}
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Spring Callbacks</h2>
          <p className="text-gray-600">
            Drag the sheet to see spring events logged. Events include OPEN, CLOSE, SNAP, and RESIZE with their sources.
          </p>
        </BottomSheet>
      </div>
    );
  },
};

export const LongScrollableContent: Story = {
  render: () => (
    <BottomSheetDemo buttonText="Open (Long Content)">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Long Scrollable Content</h2>
      <p className="text-gray-600 mb-4">
        This demonstrates the custom scrollbar styling. Scroll down to see more content.
      </p>
      <div className="space-y-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900">Item {i + 1}</h3>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
            </p>
          </div>
        ))}
      </div>
    </BottomSheetDemo>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <BottomSheetDemo
      className="bg-gradient-to-b from-purple-500/20 to-transparent"
      style={{ backdropFilter: "blur(4px)" }}
      buttonText="Open (Custom Styled)"
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Custom Styling</h2>
      <p className="text-gray-600">
        This sheet uses custom className and style props to add a gradient overlay and blur effect.
      </p>
    </BottomSheetDemo>
  ),
};

export const ListSheet: Story = {
  render: () => {
    const items = [
      { icon: "📷", label: "Take Photo" },
      { icon: "🖼️", label: "Choose from Gallery" },
      { icon: "📁", label: "Browse Files" },
      { icon: "📎", label: "Attach Document" },
      { icon: "🔗", label: "Share Link" },
    ];

    return (
      <BottomSheetDemo snapPoints={[300]} defaultSnap={300} buttonText="Open Action Sheet">
        <div className="space-y-1">
          {items.map((item, i) => (
            <button
              key={i}
              className="w-full flex items-center gap-4 p-4 hover:bg-gray-100 rounded-lg transition-colors text-left"
              onClick={() => alert(`Selected: ${item.label}`)}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-gray-900">{item.label}</span>
            </button>
          ))}
        </div>
      </BottomSheetDemo>
    );
  },
};

export const FormSheet: Story = {
  render: () => (
    <BottomSheetDemo
      header={
        <div className="pb-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Add New Item</h2>
        </div>
      }
      footer={
        <div className="flex gap-3 pt-4">
          <button className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">Cancel</button>
          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg">Add Item</button>
        </div>
      }
      snapPoints={[400, 500]}
      defaultSnap={500}
      buttonText="Open Form Sheet"
    >
      <div className="space-y-4 pt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Enter title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
            rows={3}
            placeholder="Enter description"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
            <option>Select category</option>
            <option>Work</option>
            <option>Personal</option>
            <option>Other</option>
          </select>
        </div>
      </div>
    </BottomSheetDemo>
  ),
};

export const WithTestId: Story = {
  render: () => (
    <BottomSheetDemo testId="custom-bottom-sheet">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">With Test ID</h2>
      <p className="text-gray-600">
        This sheet has testId="custom-bottom-sheet" for testing. Inspect the DOM to see the data-testid attribute.
      </p>
    </BottomSheetDemo>
  ),
};

export const KeyboardAware: Story = {
  render: () => (
    <BottomSheetDemo
      snapPoints={[200, 400, 600]}
      defaultSnap={600}
      keyboardBehavior="snap"
      keyboardSnapPoint={0}
      buttonText="Open (Keyboard Aware)"
      header={
        <div className="pb-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Keyboard-Aware Form</h2>
          <p className="text-sm text-gray-500">Sheet snaps to 200px when keyboard opens</p>
        </div>
      }
    >
      <div className="space-y-4 pt-4">
        <p className="text-gray-600 text-sm">
          On mobile devices, when you focus an input field and the virtual keyboard opens, the sheet will automatically
          snap to the smallest snap point (200px) to ensure content remains visible.
        </p>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Enter your phone"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
            rows={3}
            placeholder="Enter your message"
          />
        </div>
      </div>
    </BottomSheetDemo>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "On mobile devices, when the virtual keyboard opens (input focus), the sheet automatically snaps to a smaller snap point. Test this on a real mobile device or use Chrome DevTools mobile emulation with virtual keyboard enabled.",
      },
    },
  },
};

export const KeyboardAwareCustomSnapPoint: Story = {
  render: () => (
    <BottomSheetDemo
      snapPoints={[150, 300, 500]}
      defaultSnap={500}
      keyboardBehavior="snap"
      keyboardSnapPoint={1}
      buttonText="Open (Snaps to Middle)"
      header={
        <div className="pb-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Custom Keyboard Snap</h2>
          <p className="text-sm text-gray-500">Sheet snaps to 300px (middle) when keyboard opens</p>
        </div>
      }
    >
      <div className="space-y-4 pt-4">
        <p className="text-gray-600 text-sm">
          This example uses keyboardSnapPoint=1 to snap to second snap point (300px) instead of smallest. This gives
          more space for form content while still accommodating keyboard.
        </p>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            type="search"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Search..."
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Snap points:</p>
          <ul className="text-sm text-gray-600 list-disc list-inside">
            <li>150px (smallest)</li>
            <li>300px (keyboard snap target)</li>
            <li>500px (default open)</li>
          </ul>
        </div>
      </div>
    </BottomSheetDemo>
  ),
};

export const WithDismissButtonRight: Story = {
  render: () => (
    <BottomSheetDemo
      dismissButton={{ show: true, position: "right" }}
      header={
        <div className="pb-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Sheet with Dismiss Button</h2>
        </div>
      }
    >
      <div className="space-y-4 pt-4">
        <p className="text-gray-600">
          This sheet has a dismiss button positioned on the right side. Click the X button to close the sheet.
        </p>
        <p className="text-sm text-gray-500">
          The button is absolutely positioned and works independently of the header content.
        </p>
      </div>
    </BottomSheetDemo>
  ),
};

export const WithDismissButtonLeft: Story = {
  render: () => (
    <BottomSheetDemo
      dismissButton={{ show: true, position: "left" }}
      header={
        <div className="pb-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Left-Aligned Dismiss Button</h2>
        </div>
      }
    >
      <div className="space-y-4 pt-4">
        <p className="text-gray-600">
          This sheet has a dismiss button positioned on the left side. This can be useful for left-to-right reading
          patterns or specific design requirements.
        </p>
      </div>
    </BottomSheetDemo>
  ),
};

export const DismissButtonWithCustomProps: Story = {
  render: () => (
    <BottomSheetDemo
      dismissButton={{
        show: true,
        position: "right",
        props: {
          "aria-label": "Close this dialog",
          variant: "subtle",
          size: 20,
        },
      }}
      header={
        <div className="pb-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Custom Dismiss Button</h2>
        </div>
      }
    >
      <div className="space-y-4 pt-4">
        <p className="text-gray-600">
          This example shows how to customize the dismiss button using the <code>props</code> property:
        </p>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          <li>Custom aria-label for accessibility</li>
          <li>Subtle variant (borderless)</li>
          <li>Custom icon size (20px)</li>
        </ul>
      </div>
    </BottomSheetDemo>
  ),
};

export const DismissButtonWithHeader: Story = {
  render: () => (
    <BottomSheetDemo
      dismissButton={{ show: true, position: "right" }}
      header={
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Custom Header</h2>
            <p className="text-sm text-gray-500">With dismiss button overlay</p>
          </div>
        </div>
      }
    >
      <div className="space-y-4 pt-4">
        <p className="text-gray-600">
          The dismiss button renders on top of the header content, positioned absolutely. This means it works regardless
          of whether you provide a custom header or not.
        </p>
      </div>
    </BottomSheetDemo>
  ),
};

export const DismissButtonHidden: Story = {
  render: () => (
    <BottomSheetDemo
      dismissButton={{ show: false }}
      header={
        <div className="pb-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Dismiss Button Hidden</h2>
        </div>
      }
    >
      <div className="space-y-4 pt-4">
        <p className="text-gray-600">
          This sheet has <code>{"dismissButton={{ show: false }}"}</code> explicitly set, so no dismiss button is
          rendered.
        </p>
        <p className="text-sm text-gray-500">
          Users can still close the sheet by clicking the backdrop, dragging down, or pressing Escape.
        </p>
      </div>
    </BottomSheetDemo>
  ),
};
