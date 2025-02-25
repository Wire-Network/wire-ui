import React from 'react';
// Import the mock helper instead of the actual loader
import { defineCustomElements } from '../../.storybook/mockLoader';
import { fn } from '@storybook/test';

// Register the custom elements
defineCustomElements();

export default {
  title: 'Components/Toast',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'error'],
      description: 'The type of toast notification',
      defaultValue: 'info',
    },
    message: {
      control: { type: 'text' },
      description: 'The message to display in the toast',
    },
    duration: {
      control: { type: 'number' },
      description: 'The duration in milliseconds before the toast auto-dismisses (0 for no auto-dismiss)',
      defaultValue: 3000,
    },
    position: {
      control: { type: 'select' },
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center'],
      description: 'The position of the toast on the screen',
      defaultValue: 'top-right',
    },
    onButtonClick: {
      action: 'button-clicked',
      description: 'Function called when the button is clicked'
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'A toast notification component for displaying temporary messages.',
      },
    },
  },
};

const Template = (args) => {
  const handleClick = () => {
    // Call the provided click handler if it exists
    if (args.onButtonClick) {
      args.onButtonClick();
    }
    
    // Show the toast
    const toastEvent = new CustomEvent('show-toast', {
      detail: {
        type: args.type,
        message: args.message || 'This is a toast notification',
        duration: args.duration,
        position: args.position,
      },
      bubbles: true,
      composed: true
    });
    document.dispatchEvent(toastEvent);
  };

  return (
    <div>
      <wire-button onClick={handleClick}>
        Show Toast
      </wire-button>
      
      <wire-toast></wire-toast>
    </div>
  );
};

export const Info = Template.bind({});
Info.args = {
  type: 'info',
  message: 'This is an information message',
  duration: 3000,
  position: 'top-right',
  onButtonClick: fn(),
};

export const Success = Template.bind({});
Success.args = {
  type: 'success',
  message: 'Operation completed successfully!',
  duration: 3000,
  position: 'top-right',
  onButtonClick: fn(),
};

export const Warning = Template.bind({});
Warning.args = {
  type: 'warning',
  message: 'Warning: This action cannot be undone',
  duration: 3000,
  position: 'top-right',
  onButtonClick: fn(),
};

export const Error = Template.bind({});
Error.args = {
  type: 'error',
  message: 'An error occurred while processing your request',
  duration: 3000,
  position: 'top-right',
  onButtonClick: fn(),
};

export const BottomPosition = Template.bind({});
BottomPosition.args = {
  type: 'info',
  message: 'This toast appears at the bottom of the screen',
  duration: 3000,
  position: 'bottom-center',
  onButtonClick: fn(),
}; 