// This file is used to load the Stencil components
// It will be imported by the Storybook preview

// Create a global object to hold the Wire UI components
window.WireUI = window.WireUI || {};

// Define a simple mock implementation for the Stencil components
// This will be used if the actual components can't be loaded
window.WireUI.defineCustomElements = window.WireUI.defineCustomElements || function() {
  console.log('Using mock implementation for Wire UI components');
  return Promise.resolve();
};

// Export an empty object to satisfy module requirements
export default {}; 