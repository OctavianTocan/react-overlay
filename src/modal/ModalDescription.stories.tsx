import type { Meta, StoryObj } from "@storybook/react";
import { ModalDescription } from "./ModalDescription";

const meta = {
  title: "Components/ModalDescription",
  component: ModalDescription,
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Optional className overrides",
    },
    children: {
      control: "text",
      description: "Description content",
    },
  },
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ModalDescription>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "This is a description text that provides additional context for the modal content.",
  },
};

export const LongText: Story = {
  render: () => (
    <ModalDescription>
      <span>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </span>
      <br />
      <br />
      <span>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </span>
    </ModalDescription>
  ),
};

export const CustomStyle: Story = {
  args: {
    children: "This description has custom styling applied via className.",
    className: "text-blue-600 text-base font-medium italic",
  },
};

export const WithLinks: Story = {
  render: () => (
    <ModalDescription>
      By continuing, you agree to our{" "}
      <a href="#" className="text-blue-600 hover:underline">
        Terms of Service
      </a>{" "}
      and{" "}
      <a href="#" className="text-blue-600 hover:underline">
        Privacy Policy
      </a>
      .
    </ModalDescription>
  ),
};

export const WithEmphasis: Story = {
  render: () => (
    <ModalDescription>
      <strong>Important:</strong> This action cannot be undone. Please make sure you have backed up your data before
      proceeding.
    </ModalDescription>
  ),
};

export const MultipleDescriptions: Story = {
  render: () => (
    <div className="space-y-2">
      <ModalDescription>Your account has been created successfully.</ModalDescription>
      <ModalDescription className="text-green-600">
        You can now access all features of the application.
      </ModalDescription>
    </div>
  ),
};

export const WithList: Story = {
  render: () => (
    <ModalDescription className="space-y-2">
      <span>Before you proceed, please ensure:</span>
      <ul className="list-disc list-inside mt-2 space-y-1">
        <li>All required fields are filled</li>
        <li>Your email address is verified</li>
        <li>You have read the documentation</li>
      </ul>
    </ModalDescription>
  ),
};

export const ErrorDescription: Story = {
  args: {
    children: "Something went wrong. Please try again or contact support if the issue persists.",
    className: "text-red-600",
  },
};

export const SuccessDescription: Story = {
  args: {
    children: "Your changes have been saved successfully!",
    className: "text-green-600",
  },
};

export const WarningDescription: Story = {
  args: {
    children: "This feature is currently in beta and may not work as expected.",
    className: "text-amber-600",
  },
};
