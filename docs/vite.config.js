import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Base configuration for Vite
  base: './',
  
  // Configure server options
  server: {
    port: 6006,
    open: false,
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
  },
  
  // Configure build options
  build: {
    outDir: 'storybook-static',
    emptyOutDir: true,
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom'],
    // Don't exclude the loader - we need it for Stencil components
  },
  
  // Configure plugins if needed
  plugins: [],
  
  // Resolve aliases for the UI library
  resolve: {
    alias: {
      '@wireio/ui-library': resolve(__dirname, '../packages/core'),
    },
    dedupe: ['react', 'react-dom'],
  },
}); 