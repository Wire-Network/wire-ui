import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'wire-icon',
  styleUrl: 'wire-icon.css',
  shadow: true,
  assetsDirs: ['../../assets']
})
export class WireIcon {
  @Prop() name!: string;
  @Prop() size: 'small' | 'medium' | 'large' | number = 'medium';
  @Prop() color?: string;
  
  @State() private svgContent: string = '';

  async componentWillLoad() {
    try {
      // Use a consistent path strategy that works in all environments
      // This will work with Storybook's staticDirs configuration
      const iconPath = `/assets/icons/${this.name}.svg`;
      
      const response = await fetch(iconPath);
      
      if (response.ok) {
        this.svgContent = await response.text();
      } else {
        console.error(`Icon not found: ${this.name} (path: ${iconPath})`);
        // Set a default "not found" SVG
        this.svgContent = '<svg viewBox="0 0 24 24"><rect width="24" height="24" fill="none" stroke="currentColor" stroke-width="1"/><text x="50%" y="50%" font-size="8" text-anchor="middle" dominant-baseline="middle" fill="currentColor">?</text></svg>';
      }
    } catch (error) {
      console.error(`Failed to load icon: ${this.name}`, error);
      this.svgContent = '<svg viewBox="0 0 24 24"><text x="50%" y="50%" font-size="6" text-anchor="middle" dominant-baseline="middle" fill="currentColor">Error</text></svg>';
    }
  }

  render() {
    const style = this.color ? { color: this.color } : {};
    const sizeClass = typeof this.size === 'number' ? 'icon--custom' : `icon--${this.size}`;
    const customStyle = typeof this.size === 'number' ? { width: `${this.size}px`, height: `${this.size}px` } : {};
    
    return (
      <div class={`icon ${sizeClass}`} innerHTML={this.svgContent} style={{ ...style, ...customStyle }}></div>
    );
  }
}
