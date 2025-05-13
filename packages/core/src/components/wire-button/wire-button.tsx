import { Component, h, Prop, State, Element } from '@stencil/core';
import { ThemeService, ThemeConfig, ThemeState } from '../../utils/theme-service';

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
  @Prop() fullWidth: boolean = false;

  @State() themeState: ThemeState = {
    currentTheme: 'light',
    themeStyles: {}
  };

  private themeService: ThemeService;
  private themeConfig: ThemeConfig;

  constructor() {
    this.themeService = ThemeService.getInstance();
    this.themeConfig = {
      theme: this.theme,
      useSystemPreference: this.useSystemPreference,
      bgLight: this.bgLight,
      bgDark: this.bgDark
    };
  }

  connectedCallback() {
    this.themeService.connect(this, this.el, this.themeConfig, (state) => {
      this.themeState = state;
    });
  }

  disconnectedCallback() {
    this.themeService.disconnect(this);
  }

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

  render() {
    return (
      <button 
        class={{
          'wire-button': true,
          [`wire-button--type-${this.buttonType}`]: true,
          [`wire-button--variant-${this.computedVariant}`]: true,
          [`wire-button--color-${this.computedColor}`]: true,
          [`wire-button--size-${this.size}`]: true,
          'wire-button--disabled': this.disabled,
          'wire-button--loading': this.loading,
          'wire-button--has-icon': !!this.icon,
          [`wire-button--icon-${this.iconPosition}`]: !!this.icon,
          'wire-button--glow': this.computedGlow,
          'wire-button--no-glow': !this.computedGlow,
          'wire-button--theme-dark': this.themeState.currentTheme === 'dark',
          'wire-button--theme-light': this.themeState.currentTheme === 'light',
          'wire-button--full-width': this.fullWidth,
        }} 
        style={this.themeState.themeStyles}
      >
        <div class="wire-button__content">
          {this.icon && this.iconPosition === 'left' && <wire-icon name={this.icon} size={this.size} />}
          {this.label}
          {this.icon && this.iconPosition === 'right' && <wire-icon name={this.icon} size={this.size} />}
        </div>
      </button>
    );
  }
}
