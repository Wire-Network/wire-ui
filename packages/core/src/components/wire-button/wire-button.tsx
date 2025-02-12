import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'wire-button',
  styleUrl: 'wire-button.css',
  shadow: true,
  scoped: false,
  assetsDirs: ['../assets']
})
export class WireButton {
  @Prop() label?: string;
  @Prop() color: 'primary' | 'secondary' | 'tertiary' = 'primary';
  @Prop() variant: 'filled' | 'outline' = 'filled';
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';
  @Prop() disabled: boolean = false;
  @Prop() loading: boolean = false;
  @Prop() icon?: string;
  @Prop() iconPosition: 'left' | 'right' = 'left';

  render() {
    return (
      <button class={{
        'wire-button': true,
        [`wire-button--${this.color}`]: true,
        [`wire-button--${this.variant}`]: true,
        [`wire-button--${this.size}`]: true,
        'wire-button--disabled': this.disabled,
        'wire-button--loading': this.loading,
        'wire-button--has-icon': !!this.icon,
        [`wire-button--icon-${this.iconPosition}`]: !!this.icon
      }}>
        {this.icon && this.iconPosition === 'left' && <wire-icon name={this.icon} size={this.size} />}
        {this.label}
        {this.icon && this.iconPosition === 'right' && <wire-icon name={this.icon} size={this.size} />}
      </button>
    );
  }
}
