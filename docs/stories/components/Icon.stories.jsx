import React from 'react';
// Import the mock helper instead of the actual loader
import { defineCustomElements } from '../../.storybook/mockLoader';

// Register the custom elements
defineCustomElements();

export default {
  title: 'Components/Icon',
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: { type: 'select' },
      options: ['home', 'settings', 'user', 'notification', 'search', 'menu'],
      description: 'The name of the icon to display',
      defaultValue: 'home',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the icon',
      defaultValue: 'medium',
    },
    color: {
      control: { type: 'color' },
      description: 'The color of the icon',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'An icon component that displays various SVG icons.',
      },
    },
  },
};

const Template = (args) => {
  return (
    <wire-icon
      name={args.name}
      size={args.size}
      color={args.color}
    ></wire-icon>
  );
};

export const Default = Template.bind({});
Default.args = {
  name: 'home',
  size: 'medium',
};

export const Small = Template.bind({});
Small.args = {
  name: 'home',
  size: 'small',
};

export const Large = Template.bind({});
Large.args = {
  name: 'home',
  size: 'large',
};

export const Colored = Template.bind({});
Colored.args = {
  name: 'notification',
  color: '#ff5722',
};

export const IconGallery = () => {
  const icons = ['home', 'settings', 'user', 'notification', 'search', 'menu'];
  
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
      {icons.map(icon => (
        <div key={icon} style={{ textAlign: 'center', padding: '20px', border: '1px solid #eee', borderRadius: '8px' }}>
          <wire-icon name={icon} size="large"></wire-icon>
          <p style={{ marginTop: '10px' }}>{icon}</p>
        </div>
      ))}
    </div>
  );
}; 