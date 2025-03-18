import React from 'react';
// We no longer need to import and call defineCustomElements here
// as it's now handled centrally in preview.js

export default {
  title: 'Components/Icon',
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: { type: 'select' },
      options: [
        'arrows-left-right', 
        'bell', 
        'cardholder', 
        'chat', 
        'coin', 
        'coin-vertical', 
        'coins', 
        'copy', 
        'cube', 
        'currency-btc', 
        'currency-eth', 
        'database', 
        'dots-horizontal', 
        'dots-vertical', 
        'filter', 
        'gear', 
        'globe', 
        'guage', 
        'hard-drives', 
        'list', 
        'money', 
        'play', 
        'play-circle', 
        'qr-code', 
        'search', 
        'stack', 
        'stack-minus', 
        'stack-plus', 
        'star', 
        'support'
      ],
      description: 'The name of the icon to display',
      defaultValue: 'database',
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
  // Create a key that changes when any prop changes to force re-rendering
  const key = `${args.name}-${args.size}-${args.color || 'default'}`;
  
  return (
    <wire-icon
      key={key}
      name={args.name}
      size={args.size}
      color={args.color}
    ></wire-icon>
  );
};

export const Default = Template.bind({});
Default.args = {
  name: 'stack',
  size: 'medium',
};

export const Small = Template.bind({});
Small.args = {
  name: 'stack',
  size: 'small',
};

export const Large = Template.bind({});
Large.args = {
  name: 'stack',
  size: 'large',
};

export const Colored = Template.bind({});
Colored.args = {
  name: 'stack',
  color: 'var(--blue)',
};

export const IconGallery = () => {
  const icons = [
    'arrows-left-right', 
    'bell', 
    'cardholder', 
    'chat', 
    'coin', 
    'coin-vertical', 
    'coins', 
    'copy', 
    'cube', 
    'currency-btc', 
    'currency-eth', 
    'database', 
    'dots-horizontal', 
    'dots-vertical', 
    'filter', 
    'gear', 
    'globe', 
    'guage', 
    'hard-drives', 
    'list', 
    'money', 
    'play', 
    'play-circle', 
    'qr-code', 
    'search', 
    'stack', 
    'stack-minus', 
    'stack-plus', 
    'star', 
    'support'
  ];
  
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', textAlign: 'center' }}>
      {icons.map(icon => (
        <div key={icon} style={{ padding: '15px', border: '1px solid #eee', borderRadius: '5px' }}>
          <wire-icon name={icon} size="large"></wire-icon>
          <p style={{ marginTop: '10px', fontSize: '12px' }}>{icon}</p>
        </div>
      ))}
    </div>
  );
}; 