import { Component, h, Prop, Element, State } from '@stencil/core';
import { ThemeObserver } from '../../utils/theme-observer';

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

  @State() currentTheme: 'light' | 'dark' = 'light';

  private get computedTheme(): 'light' | 'dark' {
    // Priority: explicit prop > data attribute > Ionic theme > parent theme classes
    if (this.theme) {
      return this.theme;
    }
    
    // Check for data-theme attribute
    const parentTheme = document.documentElement.getAttribute('data-theme');
    if (parentTheme === 'dark' || parentTheme === 'light') {
      return parentTheme;
    }

    // Check for Ionic dark mode
    const ionApp = document.querySelector('ion-app');
    if (ionApp?.classList.contains('dark-theme')) {
      return 'dark';
    }

    // Check for parent theme classes
    const parentElement = this.el.closest('.dark-theme, .dark, .light-theme, .light');
    if (parentElement) {
      return parentElement.classList.contains('dark-theme') || parentElement.classList.contains('dark') ? 'dark' : 'light';
    }

    return 'light';
  }

  connectedCallback() {
    // Set initial theme
    this.currentTheme = this.computedTheme;

    // Use the shared theme observer
    ThemeObserver.getInstance().observe(this, this.el, () => {
      this.currentTheme = this.computedTheme;
    });
  }

  disconnectedCallback() {
    // Disconnect from the shared theme observer
    ThemeObserver.getInstance().disconnect(this);
  }

  render() {
    return (
      <div class={{
        'wire-card': true,
        'wire-card--theme-light': this.currentTheme === 'light',
        'wire-card--theme-dark': this.currentTheme === 'dark'
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
