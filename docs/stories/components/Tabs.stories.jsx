import React from 'react';
// Import the mock helper instead of the actual loader
import { defineCustomElements } from '../../.storybook/mockLoader';

// Register the custom elements
defineCustomElements();

export default {
  title: 'Components/Tabs',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A tabbed interface component for organizing content into separate views.',
      },
    },
  },
};

const Template = (args) => {
  return (
    <wire-tabs>
      <wire-tab slot="tab" tab="tab1" active={args.activeTab === 'tab1'}>Tab 1</wire-tab>
      <wire-tab slot="tab" tab="tab2" active={args.activeTab === 'tab2'}>Tab 2</wire-tab>
      <wire-tab slot="tab" tab="tab3" active={args.activeTab === 'tab3'}>Tab 3</wire-tab>
      
      <div slot="panel" tab="tab1">
        <h3>Tab 1 Content</h3>
        <p>This is the content for the first tab.</p>
      </div>
      <div slot="panel" tab="tab2">
        <h3>Tab 2 Content</h3>
        <p>This is the content for the second tab.</p>
      </div>
      <div slot="panel" tab="tab3">
        <h3>Tab 3 Content</h3>
        <p>This is the content for the third tab.</p>
      </div>
    </wire-tabs>
  );
};

export const Default = Template.bind({});
Default.args = {
  activeTab: 'tab1',
};

export const SecondTabActive = Template.bind({});
SecondTabActive.args = {
  activeTab: 'tab2',
};

export const ThirdTabActive = Template.bind({});
ThirdTabActive.args = {
  activeTab: 'tab3',
}; 