import { Component, h, Prop, State, Element } from '@stencil/core';
import { ThemeObserver } from '../../utils/theme-observer';

@Component({
  tag: 'wire-button',
  styleUrl: 'wire-button.css',
  shadow: true,
  scoped: false,
  assetsDirs: ['../assets']
})
export class WireButton {
  @Element() el!: HTMLElement;

  // The semantic purpose of the button (what it does)
  @Prop() buttonType: 'primary' | 'secondary' | 'tertiary' = 'primary';
  // The visual style (how it looks). Will be computed based on buttonType if not provided.
  @Prop() variant?: 'solid' | 'outline' | 'text' | 'gradient';
  // Optional color override. Defaults are computed based on buttonType.
  @Prop() color?: 'blue' | 'white' | 'gradient';
  // Glow effect. Defaults to true for primary/secondary, false for tertiary.
  @Prop() glow?: boolean;
  // Theme override. Can be 'light' or 'dark'
  @Prop() theme?: 'light' | 'dark';
  @Prop() bgLight?: string;
  @Prop() bgDark?: string;
  @Prop() useSystemPreference: boolean = false;
  @Prop() label?: string;
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';
  @Prop() disabled: boolean = false;
  @Prop() loading: boolean = false;
  @Prop() icon?: string;
  @Prop() iconPosition: 'left' | 'right' = 'left';

  @State() currentTheme: 'light' | 'dark' = 'light';

  private get computedTheme(): 'light' | 'dark' {
    // Priority: explicit prop > data attribute > Ionic theme > parent theme classes > system preference
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

    // Only use system theme if useSystemPreference is true
    if (this.useSystemPreference && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  }

  connectedCallback() {
    // Set initial theme
    this.currentTheme = this.computedTheme;

    if (this.useSystemPreference) {
      this.updateSystemTheme();
      if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', this.updateSystemTheme);
      }
    }

    // Use the shared theme observer
    ThemeObserver.getInstance().observe(this, this.el, () => {
      this.currentTheme = this.computedTheme;
    });
  }

  disconnectedCallback() {
    if (this.useSystemPreference && window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', this.updateSystemTheme);
    }

    // Disconnect from the shared theme observer
    ThemeObserver.getInstance().disconnect(this);
  }

  private updateSystemTheme = () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.currentTheme = 'dark';
    } else {
      this.currentTheme = 'light';
    }
  };

  // Determine the variant based on the buttonType if not explicitly set.
  private get computedVariant(): 'solid' | 'outline' | 'text' | 'gradient' {
    if (this.variant) return this.variant;
    switch (this.buttonType) {
      case 'primary':
        return 'solid';
      case 'secondary':
        return 'outline';
      case 'tertiary':
        return 'text';
      default:
        return 'solid';
    }
  }

  // Determine the color based on the buttonType if not explicitly set.
  private get computedColor(): 'blue' | 'white' | 'gradient' | 'gray' {
    if (this.color) return this.color;
    switch (this.buttonType) {
      case 'primary':
      case 'secondary':
        return 'blue';
      case 'tertiary':
        return 'gray';
      default:
        return 'blue';
    }
  }

  // Determine if glow is enabled based on the variant.
  private get computedGlow(): boolean {
    // Tertiary buttons never have glow
    if (this.buttonType === 'tertiary') return false;
    
    // Gradient color defaults to true
    if (this.color === 'gradient') {
      return this.glow ?? true;
    }
    
    // Default to false for all other cases
    return this.glow ?? false;
  }

  // Helper method to convert hex to RGB
  private hexToRgb(hex: string): string {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Parse the hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `${r}, ${g}, ${b}`;
  }

  render() {
    const overrideRgb = this.currentTheme === 'light' && this.bgLight 
      ? this.hexToRgb(this.bgLight)
      : this.currentTheme === 'dark' && this.bgDark
      ? this.hexToRgb(this.bgDark)
      : null;

    return (
      <button class={{
        'wire-button': true,
        // Semantic buttonType class: makes it clear what the button's purpose is.
        [`wire-button--type-${this.buttonType}`]: true,
        // Visual treatment based on computed variant.
        [`wire-button--variant-${this.computedVariant}`]: true,
        // Color class: either the default (computed) or the override.
        [`wire-button--color-${this.computedColor}`]: true,
        [`wire-button--size-${this.size}`]: true,
        'wire-button--disabled': this.disabled,
        'wire-button--loading': this.loading,
        'wire-button--has-icon': !!this.icon,
        [`wire-button--icon-${this.iconPosition}`]: !!this.icon,
        'wire-button--glow': this.computedGlow,
        'wire-button--no-glow': !this.computedGlow,
        // Theme class
        'wire-button--theme-dark': this.currentTheme === 'dark',
        'wire-button--theme-light': this.currentTheme === 'light',
      }} {...(overrideRgb ? { style: { '--wire-button-bg-override-rgb': overrideRgb } } : {})}>
        <div class="wire-button__content">
          {this.icon && this.iconPosition === 'left' && <wire-icon name={this.icon} size={this.size} />}
          {this.label}
          {this.icon && this.iconPosition === 'right' && <wire-icon name={this.icon} size={this.size} />}
        </div>
      </button>
    );
  }
}
