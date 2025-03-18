// Import the mockLoader (which handles loading CSS and components)
import { defineCustomElements } from './mockLoader';

// Initialize the components once when Storybook loads
defineCustomElements().catch(error => {
  console.error('Preview.js: Failed to load Wire UI components:', error);
});

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: {
      argTypesRegex: '^on[A-Z].*',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      // Ensure custom elements are properly rendered in docs
      source: {
        type: 'dynamic',
        excludeDecorators: true,
      },
    },
  },
};

export default preview;
