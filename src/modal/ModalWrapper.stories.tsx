import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ModalWrapper } from "./ModalWrapper";

const meta = {
  title: "Components/ModalWrapper",
  component: ModalWrapper,
  tags: ["autodocs"],
  argTypes: {
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
    scrollable: {
      control: "boolean",
      description: "Whether to apply scrollbar styling to content",
    },
    testId: {
      control: "text",
      description: "Test ID for the overlay",
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ModalWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper for controlled modal stories
function ModalWrapperDemo({
  children,
  ...props
}: Omit<React.ComponentProps<typeof ModalWrapper>, "open" | "onDismiss">) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Open Modal
      </button>
      <ModalWrapper open={open} onDismiss={() => setOpen(false)} {...props}>
        {children}
      </ModalWrapper>
    </>
  );
}

export const Default: Story = {
  render: () => (
    <ModalWrapperDemo contentClassName="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">ModalWrapper Basic</h2>
      <p className="text-gray-600">
        ModalWrapper is the low-level component that handles overlay, animations, and keyboard events. You must provide
        your own content styling.
      </p>
    </ModalWrapperDemo>
  ),
};

export const WithContentClass: Story = {
  render: () => (
    <ModalWrapperDemo contentClassName="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl shadow-2xl p-8 max-w-lg w-full text-white">
      <h2 className="text-xl font-bold mb-3">Custom Content Class</h2>
      <p className="text-purple-100">
        The contentClassName prop allows you to fully customize the modal container styling. This example uses a
        gradient background and custom border radius.
      </p>
    </ModalWrapperDemo>
  ),
};

export const WithOverlayClass: Story = {
  render: () => (
    <ModalWrapperDemo
      contentClassName="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full"
      overlayClassName="bg-blue-900/80"
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Custom Overlay</h2>
      <p className="text-gray-600">
        The overlayClassName prop lets you customize the backdrop. This example uses a blue-tinted overlay instead of
        the default black.
      </p>
    </ModalWrapperDemo>
  ),
};

export const Scrollable: Story = {
  render: () => (
    <ModalWrapperDemo
      contentClassName="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full max-h-[400px] overflow-y-auto"
      scrollable
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Scrollable Content</h2>
      <div className="space-y-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <p key={i} className="text-gray-600">
            Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua.
          </p>
        ))}
      </div>
    </ModalWrapperDemo>
  ),
};

export const NotScrollable: Story = {
  render: () => (
    <ModalWrapperDemo contentClassName="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full" scrollable={false}>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Non-Scrollable</h2>
      <p className="text-gray-600">
        When scrollable is false, the data-ro-scroll attribute is not added, so custom scrollbar styling won't be
        applied.
      </p>
    </ModalWrapperDemo>
  ),
};

export const CustomTestId: Story = {
  render: () => (
    <ModalWrapperDemo
      contentClassName="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full"
      testId="custom-modal-overlay"
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Custom Test ID</h2>
      <p className="text-gray-600">
        This modal uses testId="custom-modal-overlay" for testing purposes. Inspect the DOM to see the data-testid
        attribute.
      </p>
    </ModalWrapperDemo>
  ),
};

export const WithDismissButton: Story = {
  render: () => (
    <ModalWrapperDemo contentClassName="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full" showDismissButton>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">With Dismiss Button</h2>
      <p className="text-gray-600">
        ModalWrapper can also show a dismiss button. Unlike Modal, you need to explicitly enable it with
        showDismissButton.
      </p>
    </ModalWrapperDemo>
  ),
};

export const CustomDismissButton: Story = {
  render: () => (
    <ModalWrapperDemo
      contentClassName="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full"
      showDismissButton
      dismissButtonProps={{
        variant: "default",
        position: "absolute top-4 right-4 z-10",
        size: 16,
      }}
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Custom Dismiss Button</h2>
      <p className="text-gray-600">
        You can customize the dismiss button with dismissButtonProps. This example uses the default variant and custom
        positioning.
      </p>
    </ModalWrapperDemo>
  ),
};

export const WithAccessibility: Story = {
  render: () => (
    <ModalWrapperDemo
      contentClassName="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full"
      ariaLabel="Example dialog"
      ariaLabelledBy="wrapper-title"
      ariaDescribedBy="wrapper-desc"
    >
      <h2 id="wrapper-title" className="text-lg font-semibold text-gray-900 mb-2">
        Accessible Modal Wrapper
      </h2>
      <p id="wrapper-desc" className="text-gray-600">
        ModalWrapper supports all ARIA attributes: ariaLabel, ariaLabelledBy, and ariaDescribedBy for proper screen
        reader support.
      </p>
    </ModalWrapperDemo>
  ),
};

export const FullyCustomized: Story = {
  render: () => (
    <ModalWrapperDemo
      contentClassName="bg-gray-900 rounded-none shadow-2xl p-8 max-w-xl w-full border-4 border-yellow-400"
      overlayClassName="bg-black/90"
      showDismissButton
      dismissButtonProps={{
        variant: "subtle",
        className: "text-yellow-400 hover:text-yellow-300",
      }}
    >
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">Fully Customized</h2>
      <p className="text-gray-300">
        ModalWrapper is designed to be the building block for custom modal implementations. You have full control over
        every aspect of the appearance.
      </p>
      <div className="mt-6 flex gap-4">
        <button className="px-6 py-2 bg-yellow-400 text-gray-900 font-semibold rounded hover:bg-yellow-300 transition-colors">
          Primary Action
        </button>
        <button className="px-6 py-2 border border-yellow-400 text-yellow-400 font-semibold rounded hover:bg-yellow-400/10 transition-colors">
          Secondary
        </button>
      </div>
    </ModalWrapperDemo>
  ),
};
