import React from 'react';
// We no longer need to import and call defineCustomElements here
// as it's now handled centrally in preview.js

export default {
  title: 'Components/Logo',
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['full-color', 'light-mode', 'dark-mode'],
      description: 'The mode of the logo',
      defaultValue: 'full-color',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the logo',
      defaultValue: 'medium',
    },
    width: {
      control: { type: 'number' },
      description: 'Optional width override in pixels (height adjusts automatically)',
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'The Wire logo component for consistent brand representation.',
      },
    },
  },
};

const Template = (args) => {
  return (
    <wire-logo
      mode={args.mode}
      size={args.size}
      width={args.width}
    ></wire-logo>
  );
};

export const Default = Template.bind({});
Default.args = {
  mode: 'full-color',
  size: 'medium'
};

export const LightMode = Template.bind({});
LightMode.args = {
  mode: 'light-mode',
  size: 'medium'
};
LightMode.parameters = {
  backgrounds: { default: 'dark' }
};

export const DarkMode = Template.bind({});
DarkMode.args = {
  mode: 'dark-mode',
  size: 'medium'
};

export const CustomWidth = Template.bind({});
CustomWidth.args = {
  mode: 'full-color',
  width: 250
};

export const SizesShowcase = () => {
  const modes = ['full-color', 'light-mode', 'dark-mode'];
  const sizes = ['small', 'medium', 'large'];
  
  return (
    <div>
      {modes.map(mode => (
        sizes.map(size => (
          <div key={`${mode}-${size}`}>
            <wire-logo mode={mode} size={size}></wire-logo>
            <p>
              {mode} - {size} size
            </p>
          </div>
        ))
      ))}
    </div>
  );
}; 