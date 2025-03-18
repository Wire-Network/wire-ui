import { dirname, join } from "path";

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],

  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@storybook/addon-mdx-gfm"),
    getAbsolutePath("@chromatic-com/storybook")
  ],

  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },

  docs: {
    autodocs: true,
    defaultName: 'Documentation'
  },

  typescript: {
    reactDocgen: "react-docgen-typescript"
  },
  
  staticDirs: [
    // Serve package assets at the /assets path
    { from: '../node_modules/@wireio/ui-library/dist/assets', to: '/assets' }
  ],
  
  // Add viteFinal to handle custom elements/web components properly
  viteFinal: async (config) => {
    // Ensure Vite correctly handles custom elements
    if (!config.optimizeDeps) config.optimizeDeps = {};
    if (!config.optimizeDeps.exclude) config.optimizeDeps.exclude = [];
    
    // Exclude Stencil-generated web components from optimization
    // This helps avoid issues with Vite's optimization process
    config.optimizeDeps.exclude.push('@wireio/ui-library');
    
    return config;
  }
};

export default config;

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
} 