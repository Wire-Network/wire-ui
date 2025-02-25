import React from 'react';
import { fn } from '@storybook/test';

// Add custom styles for the button component
const buttonStyles = `
  wire-button {
    display: inline-block;
    padding: 8px 16px;
    border-radius: 4px;
    font-family: sans-serif;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  wire-button[variant="primary"] {
    background-color: #0066cc;
    color: white;
    border: none;
  }
  
  wire-button[variant="secondary"] {
    background-color: #f0f0f0;
    color: #333;
    border: 1px solid #ccc;
  }
  
  wire-button[variant="tertiary"] {
    background-color: transparent;
    color: #0066cc;
    border: none;
  }
  
  wire-button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  wire-button[size="small"] {
    font-size: 12px;
    padding: 4px 8px;
  }
  
  wire-button[size="medium"] {
    font-size: 14px;
    padding: 8px 16px;
  }
  
  wire-button[size="large"] {
    font-size: 16px;
    padding: 12px 24px;
  }
`;

// No need to define the custom element - we'll use the one from Stencil
// The defineButtonElement function is removed

export default {
  title: 'Components/Button',
  component: 'wire-button',
  parameters: {
    docs: {
      description: {
        component: 'A customizable button component with various styles and sizes.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      description: 'The visual style of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Called when the button is clicked',
      table: {
        type: { summary: 'function' },
      },
    },
    children: {
      control: { type: 'text' },
      description: 'The content of the button',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

const Template = (args) => {
  const { children, ...props } = args;
  
  // Handle the onClick event
  const handleClick = (event) => {
    if (props.onClick) {
      props.onClick(event);
    }
  };
  
  return (
    <>
      <style>{buttonStyles}</style>
      <wire-button
        variant={props.variant}
        size={props.size}
        disabled={props.disabled}
        onClick={handleClick}
      >
        {children || 'Button'}
      </wire-button>
    </>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  children: 'Primary Button',
  onClick: fn(),
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  children: 'Secondary Button',
  onClick: fn(),
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  variant: 'tertiary',
  children: 'Tertiary Button',
  onClick: fn(),
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  children: 'Small Button',
  onClick: fn(),
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  children: 'Large Button',
  onClick: fn(),
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  children: 'Disabled Button',
  onClick: fn(),
}; 