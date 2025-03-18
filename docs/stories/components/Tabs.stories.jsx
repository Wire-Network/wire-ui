import React, { useEffect, useRef } from 'react';
// We no longer need to import and call defineCustomElements here
// as it's now handled centrally in preview.js

export default {
  title: 'Components/Tabs',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A tabbed interface component for organizing content into separate views. This component handles the display and interaction of content in multiple tabs, showing only one tab panel at a time.'
      },
    },
  },
};

// Code examples and additional documentation can be added here
// using special Storybook doc blocks if needed

// A simple version that sets both display style and active attribute
const Template = (args) => {
  const tabsRef = useRef(null);
  
  useEffect(() => {
    const updateContent = (delay) => {
      console.log(`Updating content at ${delay}ms for activeTab=${args.activeTab}`);
      
      if (!tabsRef.current) return;
      
      const wireTabs = tabsRef.current;
      
      // Get the content panels
      const contentDiv = wireTabs.querySelector('[slot="content"]');
      if (!contentDiv) return;
      
      // Directly manipulate the content panels by index
      const panels = contentDiv.querySelectorAll('[data-tab]');
      if (panels.length === 0) return;
      
      // Hide all panels first
      panels.forEach(panel => {
        panel.style.display = 'none';
      });
      
      // Show the active panel
      const activePanel = contentDiv.querySelector(`[data-tab="${args.activeTab}"]`);
      if (activePanel) {
        activePanel.style.display = 'block';
        console.log(`Set ${args.activeTab} panel visible`);
      }
      
      // We can't reliably select tabs by attribute due to Shadow DOM encapsulation,
      // so let's use index-based selection based on our knowledge of the tab order
      const tabIndex = {
        'tab1': 0,
        'tab2': 1, 
        'tab3': 2
      }[args.activeTab] || 0;
      
      // Get all tabs
      const tabs = wireTabs.querySelectorAll('wire-tab');
      if (tabs.length <= tabIndex) return;
      
      // First, remove active from all tabs
      tabs.forEach(tab => {
        tab.removeAttribute('active');
        tab.active = false;
      });
      
      // Then set active on the correct tab
      const activeTab = tabs[tabIndex];
      
      // Multiple approaches to set the active state
      activeTab.setAttribute('active', 'true');
      activeTab.active = true;
      
      // For immediate visual feedback, also apply a class to force styling
      // This is a backup approach in case the component doesn't update visually right away
      tabs.forEach((tab, index) => {
        if (index === tabIndex) {
          tab.classList.add('active-tab');
        } else {
          tab.classList.remove('active-tab');
        }
      });
      
      // Also try clicking it to trigger any internal event handlers
      try {
        console.log(`Clicking tab at index ${tabIndex}`);
        activeTab.click();
      } catch (e) {
        console.error(`Error clicking tab:`, e);
      }
    };
    
    // Try multiple times to ensure it works
    const timers = [
      setTimeout(() => updateContent(100), 100),
      setTimeout(() => updateContent(500), 500),
      setTimeout(() => updateContent(1000), 1000)
    ];
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [args.activeTab]);
  
  return (
    <>
      <style>
        {`
          /* Force styling for active tabs */
          wire-tab.active-tab {
            font-weight: bold;
            color: var(--color-primary);
            border-bottom: 2px solid var(--color-primary);
          }
        `}
      </style>
      <wire-tabs ref={tabsRef}>
        <wire-tab tab="tab1" active={args.activeTab === 'tab1' ? 'true' : undefined}>Tab 1</wire-tab>
        <wire-tab tab="tab2" active={args.activeTab === 'tab2' ? 'true' : undefined}>Tab 2</wire-tab>
        <wire-tab tab="tab3" active={args.activeTab === 'tab3' ? 'true' : undefined}>Tab 3</wire-tab>
        
        <div slot="content">
          <div data-tab="tab1">
            <h3>Tab 1 Content</h3>
            <p>This is the content for the first tab.</p>
          </div>
          <div data-tab="tab2">
            <h3>Tab 2 Content</h3>
            <p>This is the content for the second tab.</p>
          </div>
          <div data-tab="tab3">
            <h3>Tab 3 Content</h3>
            <p>This is the content for the third tab.</p>
          </div>
        </div>
      </wire-tabs>
    </>
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

// For the disabled tab example, we use a simpler index-based approach
export const DisabledTab = () => {
  const tabsRef = useRef(null);
  
  useEffect(() => {
    const updateContent = (delay) => {
      console.log(`Updating disabled tab content at ${delay}ms`);
      
      if (!tabsRef.current) return;
      
      const wireTabs = tabsRef.current;
      
      // Get the content panels
      const contentDiv = wireTabs.querySelector('[slot="content"]');
      if (!contentDiv) return;
      
      // Directly manipulate the content panels
      const panels = contentDiv.querySelectorAll('[data-tab]');
      if (panels.length === 0) return;
      
      // Hide all panels first
      panels.forEach(panel => {
        panel.style.display = 'none';
      });
      
      // Show the first panel
      const activePanel = contentDiv.querySelector('[data-tab="tab1"]');
      if (activePanel) {
        activePanel.style.display = 'block';
        console.log(`Set tab1 panel visible`);
      }
      
      // Get all tabs
      const tabs = wireTabs.querySelectorAll('wire-tab');
      if (tabs.length === 0) return;
      
      // First, remove active from all tabs
      tabs.forEach(tab => {
        tab.removeAttribute('active');
        tab.active = false;
      });
      
      // Then set active on the first tab
      const activeTab = tabs[0];
      
      // Multiple approaches to set the active state
      activeTab.setAttribute('active', 'true');
      activeTab.active = true;
      
      // For immediate visual feedback, also apply a class
      tabs.forEach((tab, index) => {
        if (index === 0) {
          tab.classList.add('active-tab');
        } else {
          tab.classList.remove('active-tab');
        }
      });
      
      try {
        console.log(`Clicking first tab`);
        activeTab.click();
      } catch (e) {
        console.error(`Error clicking tab:`, e);
      }
    };
    
    // Try multiple times to ensure it works
    const timers = [
      setTimeout(() => updateContent(100), 100),
      setTimeout(() => updateContent(500), 500), 
      setTimeout(() => updateContent(1000), 1000)
    ];
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);
  
  return (
    <>
      <style>
        {`
          /* Force styling for active tabs */
          wire-tab.active-tab {
            font-weight: bold;
            color: var(--color-primary);
            border-bottom: 2px solid var(--color-primary);
          }
        `}
      </style>
      <wire-tabs ref={tabsRef}>
        <wire-tab tab="tab1" active="true">Tab 1</wire-tab>
        <wire-tab tab="tab2">Tab 2</wire-tab>
        <wire-tab tab="tab3" disabled>Disabled Tab</wire-tab>
        
        <div slot="content">
          <div data-tab="tab1">
            <h3>Tab 1 Content</h3>
            <p>This is the content for the first tab.</p>
          </div>
          <div data-tab="tab2">
            <h3>Tab 2 Content</h3>
            <p>This is the content for the second tab.</p>
          </div>
          <div data-tab="tab3">
            <h3>Disabled Tab Content</h3>
            <p>This content should not be visible because the tab is disabled.</p>
          </div>
        </div>
      </wire-tabs>
    </>
  );
};
