import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'wire-logo',
  styleUrl: 'wire-logo.css',
  shadow: true,
  assetsDirs: ['../assets']
})
export class WireLogo {
  /**
   * The mode of the logo to display
   * - 'full-color': The full color version of the logo
   * - 'light-mode': Light mode version of the logo (for dark backgrounds)
   * - 'dark-mode': Dark mode version of the logo (for light backgrounds)
   */
  @Prop() mode: 'full-color' | 'light-mode' | 'dark-mode' = 'full-color';

  /**
   * The size of the logo
   * - 'small': Small size logo (100px width)
   * - 'medium': Medium size logo (150px width)
   * - 'large': Large size logo (200px width)
   */
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Optional width override in pixels
   * Height will automatically adjust to maintain aspect ratio
   */
  @Prop() width?: number;

  @State() private svgContent: string = '';
  @State() private aspectRatio: number = 3.5; // Default aspect ratio (width/height)

  // Size presets in pixels (width)
  private readonly sizeMap = {
    small: 100,
    medium: 150,
    large: 200
  };

  async componentWillLoad() {
    await this.loadLogo();
  }

  async componentWillUpdate() {
    await this.loadLogo();
  }

  private async loadLogo() {
    try {
      // Use the correct path for assets based on how they're copied in stencil.config.ts
      const logoFile = `/assets/logo-${this.mode}.svg`;
      const response = await fetch(logoFile);
      this.svgContent = await response.text();
      
      // Extract viewBox from SVG to calculate aspect ratio
      const viewBoxMatch = this.svgContent.match(/viewBox="([^"]+)"/);
      if (viewBoxMatch && viewBoxMatch[1]) {
        const [, , svgWidth, svgHeight] = viewBoxMatch[1].split(/\s+/).map(Number);
        if (svgWidth && svgHeight) {
          this.aspectRatio = svgWidth / svgHeight;
        }
      }
    } catch (error) {
      console.error(`Failed to load logo: ${this.mode}`, error);
    }
  }

  render() {
    // Determine width based on size preset or custom width
    const logoWidth = this.width || this.sizeMap[this.size];
    
    // Calculate height based on width and aspect ratio
    const logoHeight = logoWidth / this.aspectRatio;
    
    const style = {
      width: `${logoWidth}px`,
      height: `${logoHeight}px`
    };

    return (
      <div class="logo-container" style={style} innerHTML={this.svgContent}></div>
    );
  }
}
