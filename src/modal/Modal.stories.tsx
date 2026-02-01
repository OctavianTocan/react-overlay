import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { AlertCircle, Info, CheckCircle, Trash2 } from "lucide-react";
import { Modal } from "./Modal";
import { ModalHeader } from "./ModalHeader";
import { ModalDescription } from "./ModalDescription";

const meta = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
      description: "Modal size preset",
    },
    padding: {
      control: "boolean",
      description: "Whether to add default padding",
    },
    closeOnOverlayClick: {
      control: "boolean",
      description: "Whether clicking outside closes the modal",
    },
    closeOnEscape: {
      control: "boolean",
      description: "Whether Escape key closes the modal",
    },
    showDismissButton: {
      control: "boolean",
      description: "Whether to show the dismiss (X) button",
    },
    open: {
      control: "boolean",
      description: "Whether the modal is open",
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper for controlled modal stories
function ModalDemo({ children, ...props }: Omit<React.ComponentProps<typeof Modal>, "open" | "onDismiss">) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Open Modal
      </button>
      <Modal open={open} onDismiss={() => setOpen(false)} {...props}>
        {children}
      </Modal>
    </>
  );
}

export const Default: Story = {
  render: () => (
    <ModalDemo>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Modal Title</h2>
      <p className="text-gray-600">
        This is a basic modal with default settings. Click outside or press Escape to close.
      </p>
    </ModalDemo>
  ),
};

export const SizeSmall: Story = {
  render: () => (
    <ModalDemo size="sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Small Modal</h2>
      <p className="text-gray-600">This modal uses the small size preset (max-w-sm).</p>
    </ModalDemo>
  ),
};

export const SizeMedium: Story = {
  render: () => (
    <ModalDemo size="md">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Medium Modal</h2>
      <p className="text-gray-600">This modal uses the medium size preset (max-w-md). This is the default size.</p>
    </ModalDemo>
  ),
};

export const SizeLarge: Story = {
  render: () => (
    <ModalDemo size="lg">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Large Modal</h2>
      <p className="text-gray-600">
        This modal uses the large size preset (max-w-lg). Good for forms and detailed content.
      </p>
    </ModalDemo>
  ),
};

export const SizeExtraLarge: Story = {
  render: () => (
    <ModalDemo size="xl">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Extra Large Modal</h2>
      <p className="text-gray-600">
        This modal uses the extra large size preset (max-w-xl). Ideal for complex layouts.
      </p>
    </ModalDemo>
  ),
};

export const SizeFull: Story = {
  render: () => (
    <ModalDemo size="full">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Full Modal</h2>
      <p className="text-gray-600">
        This modal uses the full size preset (max-w-[90vw]). Takes up most of the viewport.
      </p>
    </ModalDemo>
  ),
};

export const WithHeader: Story = {
  render: () => (
    <ModalDemo showDismissButton>
      <ModalHeader icon={<Info className="w-4 h-4 text-white" />} title="Information" />
      <ModalDescription>This modal uses the ModalHeader component with an icon badge and title.</ModalDescription>
    </ModalDemo>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <ModalDemo>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Important Notice</h2>
      <ModalDescription>
        This modal uses the ModalDescription component for styled description text. It provides consistent typography
        and spacing.
      </ModalDescription>
    </ModalDemo>
  ),
};

export const WithDismissButton: Story = {
  render: () => (
    <ModalDemo showDismissButton>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">With Dismiss Button</h2>
      <p className="text-gray-600">
        This modal shows the built-in dismiss button in the top-right corner. The button uses the subtle variant by
        default.
      </p>
    </ModalDemo>
  ),
};

export const CustomDismissButton: Story = {
  render: () => (
    <ModalDemo
      showDismissButton
      dismissButtonProps={{
        variant: "default",
        size: 20,
        "aria-label": "Close dialog",
      }}
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Custom Dismiss Button</h2>
      <p className="text-gray-600">
        This modal uses custom dismiss button props: default variant (with border), larger size, and custom aria-label.
      </p>
    </ModalDemo>
  ),
};

export const NoPadding: Story = {
  render: () => (
    <ModalDemo padding={false}>
      <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-2xl">
        <h2 className="text-lg font-semibold">Custom Header</h2>
      </div>
      <div className="p-6">
        <p className="text-gray-600">
          This modal has padding disabled, allowing for custom layouts like this full-width header.
        </p>
      </div>
    </ModalDemo>
  ),
};

export const NoCloseOnOverlay: Story = {
  render: () => (
    <ModalDemo closeOnOverlayClick={false} showDismissButton>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Persistent Modal</h2>
      <p className="text-gray-600">
        This modal cannot be closed by clicking the overlay. You must use the dismiss button or press Escape.
      </p>
    </ModalDemo>
  ),
};

export const NoCloseOnEscape: Story = {
  render: () => (
    <ModalDemo closeOnEscape={false} showDismissButton>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">No Escape Close</h2>
      <p className="text-gray-600">
        This modal cannot be closed with the Escape key. Click outside or use the dismiss button.
      </p>
    </ModalDemo>
  ),
};

export const WithAccessibility: Story = {
  render: () => (
    <ModalDemo ariaLabel="Confirmation dialog" ariaLabelledBy="modal-title" ariaDescribedBy="modal-description">
      <h2 id="modal-title" className="text-lg font-semibold text-gray-900 mb-2">
        Accessible Modal
      </h2>
      <p id="modal-description" className="text-gray-600">
        This modal uses aria attributes for improved accessibility: ariaLabel, ariaLabelledBy, and ariaDescribedBy.
      </p>
    </ModalDemo>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <ModalDemo
      className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200"
      overlayClassName="bg-indigo-900/60"
    >
      <h2 className="text-lg font-semibold text-indigo-900 mb-2">Custom Styled Modal</h2>
      <p className="text-indigo-700">This modal uses custom className and overlayClassName for a unique look.</p>
    </ModalDemo>
  ),
};

export const FullExample: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Delete Item
        </button>
        <Modal
          open={open}
          onDismiss={() => setOpen(false)}
          size="sm"
          showDismissButton
          ariaLabelledBy="delete-title"
          ariaDescribedBy="delete-description"
        >
          <ModalHeader
            icon={<AlertCircle className="w-4 h-4 text-white" />}
            title="Confirm Delete"
            iconBadgeClassName="bg-red-600"
          />
          <ModalDescription className="mb-4">
            <span id="delete-description">
              Are you sure you want to delete this item? This action cannot be undone.
            </span>
          </ModalDescription>
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                alert("Deleted!");
                setOpen(false);
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </Modal>
      </>
    );
  },
};

export const SuccessModal: Story = {
  render: () => (
    <ModalDemo showDismissButton>
      <ModalHeader
        icon={<CheckCircle className="w-4 h-4 text-white" />}
        title="Success!"
        iconBadgeClassName="bg-green-600"
      />
      <ModalDescription>Your changes have been saved successfully.</ModalDescription>
      <div className="mt-4">
        <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          Continue
        </button>
      </div>
    </ModalDemo>
  ),
};
