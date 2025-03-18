/**
 * Stencil Component Loader for Storybook
 * This file handles loading Stencil custom elements from the npm package
 */

// Import CSS from the npm package 
import '@wireio/ui-library/dist/wire-ui/wire-ui.css';

/**
 * Define custom elements by dynamically loading the loader module
 * Uses dynamic imports to avoid Vite build-time resolution issues
 */
export const defineCustomElements = async () => {
  try {
    console.log('Attempting to load Wire UI components...');
    
    // Use a dynamic import which is more compatible with Vite
    const module = await import('@wireio/ui-library/dist/loader');
    
    // Call the component loader with the window object
    await module.defineCustomElements(window);
    
    console.log('Successfully loaded Wire UI components');
    
    // Setup navigation helper to refresh components when changing stories
    setupNavigationHelper();
    
    return Promise.resolve();
  } catch (error) {
    console.error('Failed to load Wire UI components:', error);
    return Promise.reject(error);
  }
};

/**
 * Setup helper to detect navigation between stories and refresh components
 */
function setupNavigationHelper() {
  if (window.storyNavHelper) return;
  
  window.storyNavHelper = true;
  
  // Listen for Storybook's internal events
  window.addEventListener('storybook-channel-created', () => {
    console.log('Storybook channel created, setting up navigation helper');
    
    // Patch history.pushState to detect navigation
    const originalPushState = history.pushState;
    history.pushState = function() {
      originalPushState.apply(this, arguments);
      
      // Small delay to let the story render first
      setTimeout(() => {
        // Force a small layout shift to trigger re-render
        document.body.style.minHeight = '100.01vh';
        setTimeout(() => {
          document.body.style.minHeight = '';
        }, 10);
      }, 200);
    };
  });
}