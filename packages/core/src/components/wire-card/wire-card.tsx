import { Component, h, Prop, Element } from '@stencil/core';

@Component({
  tag: 'wire-card',
  styleUrl: 'wire-card.css',
  shadow: true,
})
export class WireCard {
  @Element() el!: HTMLElement;
  @Prop() heading?: string;
  @Prop() icon?: string;
  @Prop() actions?: HTMLElement;
  @Prop() theme?: 'light' | 'dark';

  private get computedTheme(): 'light' | 'dark' {
    // Priority: explicit prop > data attribute > parent theme classes
    if (this.theme) {
      return this.theme;
    }
    
    // Check for data-theme attribute
    const parentTheme = document.documentElement.getAttribute('data-theme');
    if (parentTheme === 'dark' || parentTheme === 'light') {
      return parentTheme;
    }

    // Check for parent theme classes
    const parentElement = this.el.closest('.dark-theme, .dark, .light-theme, .light');
    if (parentElement) {
      return parentElement.classList.contains('dark-theme') || parentElement.classList.contains('dark') ? 'dark' : 'light';
    }

    return 'light';
  }

  render() {
    return (
      <div class={{
        'wire-card': true,
        'wire-card--theme-light': this.computedTheme === 'light',
        'wire-card--theme-dark': this.computedTheme === 'dark'
      }}>
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
    );
  }
}
