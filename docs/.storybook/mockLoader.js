/**
 * Custom loader for Stencil components
 * This file provides a mock implementation to handle Stencil components in Storybook
 * since direct imports from the dist/loader may cause issues.
 */

// Create a mock implementation that doesn't rely on direct imports
export const defineCustomElements = async () => {
  // Check if custom elements are already defined
  const alreadyDefined = customElements.get('wire-button');
  
  if (alreadyDefined) {
    console.log('Wire UI custom elements are already defined');
    return Promise.resolve();
  }

  console.log('Attempting to register Wire UI custom elements');
  
  try {
    // Try to dynamically import the loader if available
    if (window.WireUI && window.WireUI.defineCustomElements) {
      await window.WireUI.defineCustomElements();
      console.log('Successfully loaded Wire UI components from global object');
      return Promise.resolve();
    }
    
    // Fallback to mock implementation
    console.log('Using fallback mock implementation for Wire UI components');
    return Promise.resolve();
  } catch (error) {
    console.error('Error loading Wire UI components:', error);
    return Promise.reject(error);
  }
}; 