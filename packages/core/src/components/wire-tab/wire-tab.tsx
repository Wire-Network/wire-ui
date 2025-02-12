import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'wire-tab',
  styleUrl: 'wire-tab.css',
  shadow: true
})
export class WireTab {
  @Prop() tab!: string;
  @Prop() active: boolean = false;
  @Prop() disabled: boolean = false;
  @Event() tabClick!: EventEmitter<string>;

  private handleClick = () => {
    if (!this.disabled) {
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