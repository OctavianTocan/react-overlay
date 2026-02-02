import type { Meta, StoryObj } from "@storybook/react";
import { DismissButton } from "./DismissButton";

const meta: Meta<typeof DismissButton> = {
  title: "Components/DismissButton",
  component: DismissButton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "subtle"],
      description: "Visual variant: default has border, subtle is borderless",
    },
    size: {
      control: { type: "range", min: 12, max: 32, step: 2 },
      description: "Icon size in pixels",
    },
    position: {
      control: "text",
      description: "Positioning classes for the button",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
    avoidOverflowClipping: {
      control: "boolean",
      description: "When true, renders in a portal to avoid being clipped by parent overflow",
    },
    "aria-label": {
      control: "text",
      description: "Accessible label for screen readers",
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof DismissButton>;

// Wrapper to demonstrate button in context
function ButtonDemo({
  containerStyle,
  ...props
}: React.ComponentProps<typeof DismissButton> & {
  containerStyle?: React.CSSProperties;
}) {
  return (
    <div className="relative bg-white rounded-lg shadow-lg p-8 min-w-[200px] min-h-[120px]" style={containerStyle}>
      <DismissButton {...props} />
      <p className="text-gray-600 text-sm">Content area</p>
    </div>
  );
}

export const Default: Story = {
  args: {
    onClick: () => alert("Dismissed!"),
    variant: "default",
  },
  render: (args) => <ButtonDemo {...args} />,
};

export const Subtle: Story = {
  args: {
    onClick: () => alert("Dismissed!"),
    variant: "subtle",
  },
  render: (args) => <ButtonDemo {...args} />,
};

export const VariantComparison: Story = {
  render: () => (
    <div className="flex gap-8">
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">Default (with border)</p>
        <div className="relative bg-white rounded-lg shadow-lg p-6 w-48 h-24">
          <DismissButton onClick={() => {}} variant="default" avoidOverflowClipping={false} />
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">Subtle (borderless)</p>
        <div className="relative bg-white rounded-lg shadow-lg p-6 w-48 h-24">
          <DismissButton
            onClick={() => {}}
            variant="subtle"
            avoidOverflowClipping={false}
            position="absolute top-2 right-2 z-10"
          />
        </div>
      </div>
    </div>
  ),
};

export const CustomSize: Story = {
  render: () => (
    <div className="flex gap-8">
      {[12, 16, 18, 24, 28].map((size) => (
        <div key={size} className="text-center">
          <p className="text-sm text-gray-600 mb-2">{size}px</p>
          <div className="relative bg-white rounded-lg shadow-lg p-6 w-32 h-20">
            <DismissButton onClick={() => {}} size={size} avoidOverflowClipping={false} />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const CustomPosition: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8">
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">Top Right (default)</p>
        <div className="relative bg-white rounded-lg shadow-lg p-6 w-48 h-32">
          <DismissButton onClick={() => {}} position="absolute -top-2 -right-2 z-10" avoidOverflowClipping={false} />
          <p className="text-gray-400 text-xs">Content</p>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">Top Left</p>
        <div className="relative bg-white rounded-lg shadow-lg p-6 w-48 h-32">
          <DismissButton onClick={() => {}} position="absolute -top-2 -left-2 z-10" avoidOverflowClipping={false} />
          <p className="text-gray-400 text-xs">Content</p>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">Inside Top Right</p>
        <div className="relative bg-white rounded-lg shadow-lg p-6 w-48 h-32">
          <DismissButton
            onClick={() => {}}
            position="absolute top-2 right-2 z-10"
            variant="subtle"
            avoidOverflowClipping={false}
          />
          <p className="text-gray-400 text-xs">Content</p>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">Inside Top Left</p>
        <div className="relative bg-white rounded-lg shadow-lg p-6 w-48 h-32">
          <DismissButton
            onClick={() => {}}
            position="absolute top-2 left-2 z-10"
            variant="subtle"
            avoidOverflowClipping={false}
          />
          <p className="text-gray-400 text-xs">Content</p>
        </div>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    onClick: () => alert("This won't fire"),
    disabled: true,
  },
  render: (args) => (
    <div className="flex gap-8">
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">Disabled (default)</p>
        <div className="relative bg-white rounded-lg shadow-lg p-6 w-48 h-24">
          <DismissButton {...args} variant="default" avoidOverflowClipping={false} />
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">Disabled (subtle)</p>
        <div className="relative bg-white rounded-lg shadow-lg p-6 w-48 h-24">
          <DismissButton
            {...args}
            variant="subtle"
            avoidOverflowClipping={false}
            position="absolute top-2 right-2 z-10"
          />
        </div>
      </div>
    </div>
  ),
};

export const WithPortal: Story = {
  render: () => (
    <div className="text-center">
      <p className="text-sm text-gray-600 mb-4">avoidOverflowClipping=true (default) - Button renders in portal</p>
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-64 h-32" style={{ overflow: "hidden" }}>
        <DismissButton onClick={() => {}} avoidOverflowClipping={true} position="absolute -top-2 -right-2 z-10" />
        <p className="text-gray-400 text-xs">Container has overflow: hidden but button is still visible</p>
      </div>
    </div>
  ),
};

export const WithoutPortal: Story = {
  render: () => (
    <div className="text-center">
      <p className="text-sm text-gray-600 mb-4">avoidOverflowClipping=false - Button can be clipped</p>
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-64 h-32" style={{ overflow: "hidden" }}>
        <DismissButton onClick={() => {}} avoidOverflowClipping={false} position="absolute -top-2 -right-2 z-10" />
        <p className="text-gray-400 text-xs">Container has overflow: hidden - button is clipped!</p>
      </div>
    </div>
  ),
};

export const PortalComparison: Story = {
  render: () => (
    <div className="flex gap-8">
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">With Portal (default)</p>
        <div className="relative bg-white rounded-lg shadow-lg p-6 w-48 h-24" style={{ overflow: "hidden" }}>
          <DismissButton onClick={() => {}} avoidOverflowClipping={true} position="absolute -top-2 -right-2 z-10" />
          <p className="text-gray-400 text-xs">overflow: hidden</p>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">Without Portal</p>
        <div className="relative bg-white rounded-lg shadow-lg p-6 w-48 h-24" style={{ overflow: "hidden" }}>
          <DismissButton onClick={() => {}} avoidOverflowClipping={false} position="absolute -top-2 -right-2 z-10" />
          <p className="text-gray-400 text-xs">overflow: hidden</p>
        </div>
      </div>
    </div>
  ),
};

export const WithTestId: Story = {
  args: {
    onClick: () => {},
    testId: "custom-dismiss-button",
    avoidOverflowClipping: false,
  },
  render: (args) => (
    <div className="text-center">
      <p className="text-sm text-gray-600 mb-4">Inspect element to see data-testid="custom-dismiss-button"</p>
      <ButtonDemo {...args} />
    </div>
  ),
};

export const CustomAriaLabel: Story = {
  args: {
    onClick: () => {},
    "aria-label": "Close notification panel",
    avoidOverflowClipping: false,
  },
  render: (args) => (
    <div className="text-center">
      <p className="text-sm text-gray-600 mb-4">Custom aria-label for screen readers: "Close notification panel"</p>
      <ButtonDemo {...args} />
    </div>
  ),
};

export const CustomClassName: Story = {
  args: {
    onClick: () => {},
    className: "bg-purple-100 text-purple-600 hover:bg-purple-200",
    avoidOverflowClipping: false,
  },
  render: (args) => (
    <div className="text-center">
      <p className="text-sm text-gray-600 mb-4">Custom colors via className</p>
      <ButtonDemo {...args} />
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    onClick: () => alert("Button clicked!"),
    variant: "default",
    size: 18,
    disabled: false,
    avoidOverflowClipping: false,
    "aria-label": "Dismiss",
  },
  render: (args) => <ButtonDemo {...args} />,
};
