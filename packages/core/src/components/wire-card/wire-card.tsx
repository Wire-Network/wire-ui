import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'wire-card',
  styleUrl: 'wire-card.css',
  shadow: true,
})
export class WireCard {
  @Prop() heading?: string;
  @Prop() icon?: string;
  @Prop() actions?: HTMLElement;

  render() {
    return (
      <Host>
        <div class="wire-card">
          <header>
              <h3 class="title">
                {this.icon && <wire-icon name={this.icon} size="medium" />}
                {this.heading}
              </h3>
              <div class="actions">
                <slot name="actions"></slot>
              </div>
          </header>
          <div class="body">
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
