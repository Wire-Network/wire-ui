import React from 'react';
import { fn } from '@storybook/test';
// We no longer need to import and call defineCustomElements here
// as it's now handled centrally in preview.js

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
    label: {
      control: { type: 'text' },
      description: 'The text displayed on the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Button' },
      },
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      description: 'The color of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outline'],
      description: 'The visual style of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'filled' },
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
    icon: {
      control: { type: 'select' },
      options: ['arrows-left-right', 'bell', 'cardholder', 'chat', 'coin-vertical', 'coin', 'coins', 'copy', 'cube', 'currency-btc', 'currency-eth', 'currency', 'database', 'dots-horizontal', 'dots-vertical'],
      description: 'The icon to display on the button',
      table: {
        type: { summary: 'string' },
      },
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: 'The position of the icon on the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'left' },
      },
    },
    children: {
      table: {
        disable: true
      }
    }
  },
};

const Template = (args) => {
  const { ...props } = args;
  
  // Handle the onClick event
  const handleClick = (event) => {
    if (props.onClick) {
      props.onClick(event);
    }
  };
  
  return (
    <wire-button
      color={props.color}
      variant={props.variant}
      size={props.size}
      icon={props.icon}
      iconPosition={props.iconPosition}
      disabled={props.disabled}
      label={props.label || 'Button'}
      onClick={handleClick}
    />
  );
};

export const Primary = Template.bind({});
Primary.args = {
  color: 'primary',
  children: 'Primary Button',
  onClick: fn(),
};

export const Secondary = Template.bind({});
Secondary.args = {
  color: 'secondary',
  children: 'Secondary Button',
  onClick: fn(),
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  color: 'tertiary',
  children: 'Tertiary Button',
  onClick: fn(),
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  children: 'Small Button',
  onClick: fn(),
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'medium',
  children: 'Medium Button',
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