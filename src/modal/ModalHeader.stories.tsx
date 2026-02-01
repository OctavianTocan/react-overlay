import type { Meta, StoryObj } from "@storybook/react";
import { AlertCircle, Info, CheckCircle, AlertTriangle, Mail, Settings, User, Bell } from "lucide-react";
import { ModalHeader } from "./ModalHeader";

const meta = {
  title: "Components/ModalHeader",
  component: ModalHeader,
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Title text",
    },
    className: {
      control: "text",
      description: "Optional className overrides for the container",
    },
    titleClassName: {
      control: "text",
      description: "Optional className for the title text",
    },
    iconBadgeClassName: {
      control: "text",
      description: "Optional className for the icon badge",
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
} satisfies Meta<typeof ModalHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <Info className="w-4 h-4 text-white" />,
    title: "Information",
  },
};

export const WithAlertIcon: Story = {
  args: {
    icon: <AlertCircle className="w-4 h-4 text-white" />,
    title: "Alert",
  },
};

export const WithSuccessIcon: Story = {
  args: {
    icon: <CheckCircle className="w-4 h-4 text-white" />,
    title: "Success",
    iconBadgeClassName: "bg-green-600",
  },
};

export const WithWarningIcon: Story = {
  args: {
    icon: <AlertTriangle className="w-4 h-4 text-white" />,
    title: "Warning",
    iconBadgeClassName: "bg-amber-500",
  },
};

export const WithErrorIcon: Story = {
  args: {
    icon: <AlertCircle className="w-4 h-4 text-white" />,
    title: "Error",
    iconBadgeClassName: "bg-red-600",
  },
};

export const CustomIcon: Story = {
  render: () => (
    <div className="space-y-4">
      <ModalHeader
        icon={<Mail className="w-4 h-4 text-white" />}
        title="New Message"
        iconBadgeClassName="bg-blue-600"
      />
      <ModalHeader
        icon={<Settings className="w-4 h-4 text-white" />}
        title="Settings"
        iconBadgeClassName="bg-gray-600"
      />
      <ModalHeader
        icon={<User className="w-4 h-4 text-white" />}
        title="User Profile"
        iconBadgeClassName="bg-purple-600"
      />
      <ModalHeader
        icon={<Bell className="w-4 h-4 text-white" />}
        title="Notifications"
        iconBadgeClassName="bg-orange-500"
      />
    </div>
  ),
};

export const CustomTitleStyle: Story = {
  args: {
    icon: <Info className="w-4 h-4 text-white" />,
    title: "Custom Title Style",
    titleClassName: "text-purple-600 text-xl font-bold",
  },
};

export const CustomBadgeStyle: Story = {
  args: {
    icon: <CheckCircle className="w-4 h-4 text-green-900" />,
    title: "Custom Badge",
    iconBadgeClassName: "bg-green-200 size-10",
  },
};

export const LongTitle: Story = {
  args: {
    icon: <Info className="w-4 h-4 text-white" />,
    title: "This is a very long title that demonstrates how the component handles text wrapping behavior",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <ModalHeader icon={<Info className="w-4 h-4 text-white" />} title="Information" />
      <ModalHeader
        icon={<CheckCircle className="w-4 h-4 text-white" />}
        title="Success"
        iconBadgeClassName="bg-green-600"
      />
      <ModalHeader
        icon={<AlertTriangle className="w-4 h-4 text-white" />}
        title="Warning"
        iconBadgeClassName="bg-amber-500"
      />
      <ModalHeader
        icon={<AlertCircle className="w-4 h-4 text-white" />}
        title="Error"
        iconBadgeClassName="bg-red-600"
      />
    </div>
  ),
};

export const WithCustomContainer: Story = {
  args: {
    icon: <Info className="w-4 h-4 text-white" />,
    title: "Custom Container",
    className: "mb-6 pb-4 border-b border-gray-200",
  },
};

export const LargeIcon: Story = {
  args: {
    icon: <AlertCircle className="w-6 h-6 text-white" />,
    title: "Large Icon Badge",
    iconBadgeClassName: "size-12 bg-red-600",
    titleClassName: "text-xl",
  },
};
