import { Component, h, State, Listen, Element } from '@stencil/core';

@Component({
  tag: 'wire-tabs',
  styleUrl: 'wire-tabs.css',
  shadow: true,
  scoped: false,
  assetsDirs: ['../assets']
})
export class WireTabs {
  @Element() el!: HTMLElement;
  @State() activeTab: string = '';

  private updateTabVisibility() {
    
    // If no active tab is set, we can't update visibility
    if (!this.activeTab) {
      return;
    }
    
    // Find the content slot
    const contentSlot = this.el.querySelector('[slot="content"]');
    if (!contentSlot) {
      return;
    }
    
    // Find all content panels
    const tabPanels = contentSlot.querySelectorAll('[data-tab]');
    
    // Show/hide the panels based on active tab
    tabPanels.forEach((panel: Element) => {
      const panelTab = panel.getAttribute('data-tab');
      
      if (panelTab === this.activeTab) {
        panel.setAttribute('style', 'display: block');
      } else {
        panel.setAttribute('style', 'display: none');
      }
    });
  }

  componentDidLoad() {
    
    // First check if any tab is already set as active
    const activeTab = this.el.querySelector('wire-tab[active="true"]') as HTMLWireTabElement;
    
    if (activeTab) {
      // Use the active tab that was explicitly set
      // Try both accessing the property and the attribute
      
      // Use the tab property directly, which should be set by Stencil
      const tabId = activeTab.tab;
      if (tabId) {
        this.activeTab = tabId;
      }
    }
    
    // If we don't have an active tab yet, use the first tab
    if (!this.activeTab) {
      // Otherwise, set first tab as active by default
      const tabs = this.el.querySelectorAll('wire-tab');
      
      if (tabs.length > 0) {
        const firstTab = tabs[0] as HTMLWireTabElement;
        
        // Try both accessing the property and the attribute
        const tabProp = firstTab.tab;
        const tabAttr = firstTab.getAttribute('tab');
        
        // Use the first non-empty value we find
        this.activeTab = tabProp || tabAttr || 'tab1'; // Fallback to tab1 if nothing else works
        
        // Update the tab's active property
        firstTab.active = true;
      } else {
      }
    }
    
    // Update tab visibility
    this.updateTabVisibility();
  }

  @Listen('tabClick')
  handleTabClick(event: CustomEvent<string>) {
    this.activeTab = event.detail;
    this.updateTabVisibility();
  }

  componentDidRender() {
    
    // Update active state of tabs
    const tabs = this.el.querySelectorAll('wire-tab');
    tabs.forEach((tab: HTMLWireTabElement) => {
      tab.active = tab.tab === this.activeTab;
    });
    
    // Only update tab visibility when we have an active tab
    if (this.activeTab) {
      this.updateTabVisibility();
    }
  }

  render() {
    return (
      <div class="wire-tabs">
        <div class="tabs-header">
          <slot></slot>
        </div>
        <div class="tabs-content">
          <slot name="content"></slot>
        </div>
      </div>
    );
  }
}