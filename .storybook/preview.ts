import type { Preview } from "@storybook/react";
import "../src/styles/tailwind.css";
import "../src/styles/scrollbar.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
  },
};

export default preview;
