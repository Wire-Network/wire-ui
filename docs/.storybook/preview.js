/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { 
      // Remove argTypesRegex and use fn() in your stories instead
      // For example: args: { onClick: fn() } 
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