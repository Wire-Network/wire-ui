import React from 'react';

export default {
  title: 'Components/Card',
  tags: ['autodocs'],
  component: 'wire-card',
  argTypes: {
    heading: {
      control: 'text',
      description: 'The heading text for the card',
    },
    icon: {
      control: 'text',
      description: 'The name of the icon to display next to the heading',
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
  const { children, actions, ...props } = args;
  
  return (
    <wire-card
      heading={props.heading}
      icon={props.icon}
    >
      {actions && <div slot="actions">{actions}</div>}
      {children || (
        <div>
          <p>This is some sample content inside a card component.</p>
        </div>
      )}
    </wire-card>
  );
};

// Place the complete example at the top - it will be shown as the primary example
export const FeatureExample = Template.bind({});
FeatureExample.args = {
  heading: 'Card Title',
  icon: 'stack',
  actions: (
    <wire-button 
      color="primary"
      variant="outline"
      size="small" 
      label="Action"
    />
  ),
};
FeatureExample.storyName = 'Complete Card Example';

export const Default = Template.bind({});
Default.args = {
  heading: 'Simple Card',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  heading: 'Card with Icon',
  icon: 'bell',
};

export const WithActions = Template.bind({});
WithActions.args = {
  heading: 'Card with Actions',
  actions: (
    <div style={{ display: 'flex', gap: '8px' }}>
      <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3C7.04 3 3 7.04 3 12C3 16.96 7.04 21 12 21C16.96 21 21 16.96 21 12C21 7.04 16.96 3 12 3ZM12 19.5C7.86 19.5 4.5 16.14 4.5 12C4.5 7.86 7.86 4.5 12 4.5C16.14 4.5 19.5 7.86 19.5 12C19.5 16.14 16.14 19.5 12 19.5ZM13 7.5H11V13H16.5V11.5H13V7.5Z" fill="currentColor"/>
        </svg>
      </button>
      <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z" fill="currentColor"/>
        </svg>
      </button>
    </div>
  ),
};

export const WithCustomContent = Template.bind({});
WithCustomContent.args = {
  heading: 'Custom Content',
  children: (
    <div>
      <p>This is a card with custom content.</p>
      <button>Click me</button>
    </div>
  ),
};

export const NoHeading = Template.bind({});
NoHeading.args = {
  children: (
    <div>
      <h3>Card Without Wire Heading</h3>
      <p>This card doesn't use the built-in heading property and instead includes a heading in the slot content.</p>
    </div>
  ),
};
