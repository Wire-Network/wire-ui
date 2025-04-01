import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'wire-button',
  styleUrl: 'wire-button.css',
  shadow: true,
  scoped: false,
  assetsDirs: ['../assets']
})
export class WireButton {
  // The semantic purpose of the button (what it does)
  @Prop() buttonType: 'primary' | 'secondary' | 'tertiary' = 'primary';
  // The visual style (how it looks). Will be computed based on buttonType if not provided.
  @Prop() variant?: 'solid' | 'outline' | 'text' | 'gradient';
  // Optional color override. Defaults are computed based on buttonType.
  @Prop() color?: 'blue' | 'white' | 'gradient';
  // Glow effect. Defaults to true for primary/secondary, false for tertiary.
  @Prop() glow?: boolean;

  @Prop() label?: string;
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';
  @Prop() disabled: boolean = false;
  @Prop() loading: boolean = false;
  @Prop() icon?: string;
  @Prop() iconPosition: 'left' | 'right' = 'left';

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
    if (this.glow !== undefined) return this.glow;
    switch (this.buttonType) {
      case 'primary':
      case 'secondary':
        return true;
      case 'tertiary':
        return false;
      default:
        return true;
    }
  }

  render() {
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
      }}>
        <div class="wire-button__content">
          {this.icon && this.iconPosition === 'left' && <wire-icon name={this.icon} size={this.size} />}
          {this.label}
          {this.icon && this.iconPosition === 'right' && <wire-icon name={this.icon} size={this.size} />}
        </div>
      </button>
    );
  }
}
