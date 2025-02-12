import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'wire-icon',
  styleUrl: 'wire-icon.css',
  shadow: true,
  assetsDirs: ['../../assets']
})
export class WireIcon {
  @Prop() name!: string;
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';
  
  @State() private svgContent: string = '';

  async componentWillLoad() {
    try {
      const response = await fetch(`../../assets/icons/${this.name}.svg`);
      this.svgContent = await response.text();
    } catch (error) {
      console.error(`Failed to load icon: ${this.name}`, error);
    }
  }

  render() {
    return (
      <div class={`icon icon--${this.size}`} innerHTML={this.svgContent}></div>
    );
  }
}
