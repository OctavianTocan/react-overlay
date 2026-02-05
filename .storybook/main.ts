import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [],
  framework: "@storybook/react-vite",
  docs: {
    autodocs: "tag",
  },
};

export default config;
