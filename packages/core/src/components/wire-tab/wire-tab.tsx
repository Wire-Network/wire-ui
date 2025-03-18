import { Component, Prop, h, Event, EventEmitter, Element } from '@stencil/core';

@Component({
  tag: 'wire-tab',
  styleUrl: 'wire-tab.css',
  shadow: true
})
export class WireTab {
  @Element() el!: HTMLElement;
  @Prop() tab!: string;
  @Prop() active: boolean = false;
  @Prop() disabled: boolean = false;
  @Event() tabClick!: EventEmitter<string>;

  componentWillLoad() {
    console.log('Tab will load, tab value:', this.tab);
    // Ensure tab property is populated
    if (!this.tab) {
      const tabAttr = this.el.getAttribute('tab');
      if (tabAttr) {
        this.tab = tabAttr;
        console.log('Set tab from attribute:', this.tab);
      }
    }
  }

  private handleClick = (e: Event) => {
    if (!this.disabled) {
      console.log('Tab clicked:', this.tab);
      e.preventDefault();
      e.stopPropagation();
      this.tabClick.emit(this.tab);
    }
  };

  render() {
    return (
      <div 
        class={{
          'wire-tab': true,
          'active': this.active,
          'disabled': this.disabled
        }}
        onClick={this.handleClick}
      >
        <slot></slot>
      </div>
    );
  }
} 