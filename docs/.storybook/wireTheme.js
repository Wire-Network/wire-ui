import { create } from '@storybook/theming/create';

export default create({
  base: 'light',
  
  // Brand
  brandTitle: 'Wire UI Library',
  brandUrl: 'https://wireio.com',
  brandTarget: '_blank',
  brandImage: './wire-logo.svg', // This will be added later
  
  // UI
  appBg: '#F8F9FA',
  appContentBg: '#FFFFFF',
  appBorderColor: '#E9ECEF',
  appBorderRadius: 8,
  
  // Typography
  fontBase: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontCode: 'Monaco, Consolas, "Courier New", monospace',
  
  // Text colors
  textColor: '#212529',
  textInverseColor: '#FFFFFF',
  
  // Toolbar default and active colors
  barTextColor: '#6C757D',
  barSelectedColor: '#3F51B5',
  barBg: '#FFFFFF',
  
  // Form colors
  inputBg: '#FFFFFF',
  inputBorder: '#CED4DA',
  inputTextColor: '#212529',
  inputBorderRadius: 4,
  
  // Colors
  colorPrimary: '#3F51B5',
  colorSecondary: '#FF4081',
}); 