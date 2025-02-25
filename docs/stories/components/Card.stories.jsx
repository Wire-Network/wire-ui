import React from 'react';
// Import the mock helper instead of the actual loader
import { defineCustomElements } from '../../.storybook/mockLoader';

// Register the custom elements
defineCustomElements();

export default {
  title: 'Components/Card',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'elevated', 'outlined'],
      description: 'The visual style of the card',
      defaultValue: 'default',
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'small', 'medium', 'large'],
      description: 'The padding inside the card',
      defaultValue: 'medium',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'A versatile card component for grouping related content.',
      },
    },
  },
};

const Template = (args) => {
  const { children, ...props } = args;
  return (
    <wire-card
      variant={props.variant}
      padding={props.padding}
    >
      {children || (
        <div style={{ padding: '20px' }}>
          <h3>Card Title</h3>
          <p>This is some sample content inside a card component.</p>
        </div>
      )}
    </wire-card>
  );
};

export const Default = Template.bind({});
Default.args = {
  variant: 'default',
};

export const Elevated = Template.bind({});
Elevated.args = {
  variant: 'elevated',
};

export const Outlined = Template.bind({});
Outlined.args = {
  variant: 'outlined',
};

export const NoPadding = Template.bind({});
NoPadding.args = {
  padding: 'none',
  children: (
    <div style={{ padding: '0' }}>
      <img src="https://via.placeholder.com/300x150" alt="Placeholder" style={{ width: '100%', display: 'block' }} />
      <div style={{ padding: '16px' }}>
        <h3>Card with No Padding</h3>
        <p>This card has no built-in padding, allowing content to extend to the edges.</p>
      </div>
    </div>
  ),
};

export const LargePadding = Template.bind({});
LargePadding.args = {
  padding: 'large',
}; 