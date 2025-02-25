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
    "@chromatic-com/storybook"
  ],

  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },

  docs: {
    autodocs: true,
    defaultName: 'Documentation',
  },

  typescript: {
    reactDocgen: "react-docgen-typescript"
  },
  
  // Add Vite configuration to handle custom elements
  async viteFinal(config) {
    return {
      ...config,
      // Configure esbuild for JSX
      esbuild: {
        ...config.esbuild,
        jsxFactory: 'React.createElement',
        jsxFragment: 'React.Fragment',
      },
      // Optimize dependencies
      optimizeDeps: {
        ...config.optimizeDeps,
        include: [
          ...(config.optimizeDeps?.include || []),
          'react',
          'react-dom',
        ],
      },
      // Resolve configuration
      resolve: {
        ...config.resolve,
        dedupe: [...(config.resolve?.dedupe || []), 'react', 'react-dom'],
        alias: {
          ...config.resolve?.alias,
          '@wireio/ui-library': join(process.cwd(), '../packages/core'),
        },
      },
      // Add plugins to handle Stencil components
      plugins: [
        ...config.plugins || [],
      ],
    };
  },
  
  // Remove the previewAnnotations array since it's causing issues
  // We'll handle the component loading in preview.js instead
};

export default config;

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
} 