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
    const contentSlot = this.el.querySelector('[slot="content"]');
    const tabPanels = contentSlot?.children;
    
    if (tabPanels) {
      Array.from(tabPanels).forEach((panel: Element) => {
        if (panel.getAttribute('data-tab') === this.activeTab) {
          panel.setAttribute('style', 'display: block');
        } else {
          panel.setAttribute('style', 'display: none');
        }
      });
    }
  }

  componentDidLoad() {
    // Set first tab as active by default if no active tab
    if (!this.activeTab) {
      const firstTab = this.el.querySelector('wire-tab');
      if (firstTab) {
        const firstTabId = firstTab.getAttribute('tab') || '';
        this.activeTab = firstTabId;
        firstTab.active = true;
        this.updateTabVisibility();
      }
    }
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
    
    // Update content visibility
    this.updateTabVisibility();
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