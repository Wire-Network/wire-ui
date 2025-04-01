import { Component, h, State, Element } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {
  @State() toastCount = 0;
  @Element() el!: HTMLElement;

  private showToast() {
    const toast = document.body.querySelector('wire-toast') as HTMLWireToastElement;
    if (toast) {
      toast.addToast({
        header: `Toast ${++this.toastCount}`,
        message: 'This is a test toast message',
        color: 'primary',
        icon: 'bell'
      });
    }
  }

  render() {
    return <div>
      <div class="my-grid-header">
        <wire-logo mode="full-color"></wire-logo>
      </div>
      <div class="my-grid-header">
        <h2>Toast</h2>
      </div>
      <div class="my-grid">
        <wire-button 
          label="Show Toast" 
          color="blue" 
          onClick={() => this.showToast()}
        ></wire-button>
      </div>

      <div class="my-grid-header">
        <h2>Cards</h2>
      </div>
      <div class="my-grid-header">
        <wire-card heading="Card Title" icon="stack">
          <div slot="actions">
            <wire-button label="Button" color="blue" variant="outline" size="small"></wire-button>
          </div>
          Card content…
        </wire-card>
      </div>

      <div class="my-grid-header">
        <h2>Large</h2>
      </div>
      <div class="my-container light">
        <div class="new-button">
          <div class="new-button-inner">New Button</div>
        </div>
      </div>

      <div class="my-container dark">
        <div class="new-button">
          <div class="new-button-inner">New Button</div>
        </div>
      </div>
      
      <div class="my-grid">
        <wire-button label="New Button" role="primary" size="small" color="gradient"></wire-button>
        <wire-button label="New Button" role="primary" size="medium" color="gradient"></wire-button>
        <wire-button label="New Button" role="primary" size="large" color="gradient"></wire-button>
        
        <wire-button label="New Button" role="primary" size="small"></wire-button>
        <wire-button label="New Button" role="primary"></wire-button>
        <wire-button label="New Button" role="primary" size="large"></wire-button>

        <wire-button label="New Button" role="secondary" size="small" color="gradient"></wire-button>
        <wire-button label="New Button" role="secondary" size="medium" color="gradient"></wire-button>
        <wire-button label="New Button" role="secondary" size="large" color="gradient"></wire-button>

        <wire-button label="New Button" role="secondary" size="small"></wire-button>
        <wire-button label="New Button" role="secondary"></wire-button>
        <wire-button label="New Button" role="secondary" size="large"></wire-button>

        <wire-button label="New Button" role="tertiary" size="small"></wire-button>
        <wire-button label="New Button" role="tertiary"></wire-button>
        <wire-button label="New Button" role="tertiary" size="large"></wire-button>

        <wire-button label="New Button" role="primary" size="small" color="gradient" icon="search"></wire-button>
        <wire-button label="New Button" role="primary" size="medium" color="gradient" icon="stack"></wire-button>
        <wire-button label="New Button" role="primary" size="large" color="gradient" icon="stack"></wire-button>

        <wire-button label="New Button" role="secondary" size="small" color="gradient" icon="stack" iconPosition="right"></wire-button>
        <wire-button label="New Button" role="secondary" size="medium" color="gradient" icon="stack" iconPosition="right"></wire-button>
        <wire-button label="New Button" role="secondary" size="large" color="gradient" icon="stack" iconPosition="right"></wire-button>
        
        {/* <wire-button label="Button" color="blue" size="large"></wire-button>
        <wire-button label="Button" color="blue" size="large" icon="coin" iconPosition="left"></wire-button>
        <wire-button label="Button" color="blue" size="large" icon="stack" iconPosition="right"></wire-button> */}

        {/* <wire-button label="Button" color="secondary" size="large"></wire-button>
        <wire-button label="Button" color="secondary" size="large" icon="stack" iconPosition="left"></wire-button>
        <wire-button label="Button" color="secondary" size="large" icon="stack" iconPosition="right"></wire-button>

        <wire-button label="Button" color="tertiary" size="large"></wire-button>
        <wire-button label="Button" color="tertiary" size="large" icon="stack" iconPosition="left"></wire-button>
        <wire-button label="Button" color="tertiary" size="large" icon="stack" iconPosition="right"></wire-button>

        <wire-button label="Button" color="primary" variant="outline" size="large"></wire-button>
        <wire-button label="Button" color="primary" variant="outline" size="large" icon="stack" iconPosition="left"></wire-button>
        <wire-button label="Button" color="primary" variant="outline" size="large" icon="stack" iconPosition="right"></wire-button>

        <wire-button label="Button" color="secondary" variant="outline" size="large"></wire-button>
        <wire-button label="Button" color="secondary" variant="outline" size="large" icon="stack" iconPosition="left"></wire-button>
        <wire-button label="Button" color="secondary" variant="outline" size="large" icon="stack" iconPosition="right"></wire-button>

        <wire-button label="Button" color="tertiary" variant="outline" size="large"></wire-button>
        <wire-button label="Button" color="tertiary" variant="outline" size="large" icon="stack" iconPosition="left"></wire-button>
        <wire-button label="Button" color="tertiary" variant="outline" size="large" icon="stack" iconPosition="right"></wire-button> */}
      </div>

      {/* <div class="my-grid-header">
        <h2>Medium (default)</h2>
      </div>
      <div class="my-grid">
        <wire-button label="Button" color="primary" size="medium"></wire-button>
        <wire-button label="Button" color="primary" size="medium" icon="stack" iconPosition="left"></wire-button>
        <wire-button label="Button" color="primary" size="medium" icon="stack" iconPosition="right"></wire-button>

        <wire-button label="Button" color="secondary" size="medium"></wire-button>
        <wire-button label="Button" color="secondary" size="medium" icon="stack" iconPosition="left"></wire-button>
        <wire-button label="Button" color="secondary" size="medium" icon="stack" iconPosition="right"></wire-button>

        <wire-button label="Button" color="tertiary" size="medium"></wire-button>
        <wire-button label="Button" color="tertiary" size="medium" icon="stack" iconPosition="left"></wire-button>
        <wire-button label="Button" color="tertiary" size="medium" icon="stack" iconPosition="right"></wire-button>

        <wire-button label="Button" color="primary" variant="outline" size="medium"></wire-button>
        <wire-button label="Button" color="primary" variant="outline" size="medium" icon="stack" iconPosition="left"></wire-button>
        <wire-button label="Button" color="primary" variant="outline" size="medium" icon="stack" iconPosition="right"></wire-button>

        <wire-button label="Button" color="secondary" variant="outline" size="medium"></wire-button>
        <wire-button label="Button" color="secondary" variant="outline" size="medium" icon="stack" iconPosition="left"></wire-button>
        <wire-button label="Button" color="secondary" variant="outline" size="medium" icon="stack" iconPosition="right"></wire-button>

        <wire-button label="Button" color="tertiary" variant="outline" size="medium"></wire-button>
        <wire-button label="Button" color="tertiary" variant="outline" size="medium" icon="stack" iconPosition="left"></wire-button>
        <wire-button label="Button" color="tertiary" variant="outline" size="medium" icon="stack" iconPosition="right"></wire-button>
      </div>

      <div class="my-grid-header">
        <h2>Small</h2>
      </div>
      <div class="my-grid">
        <wire-button label="Button" color="primary" size="small"></wire-button>
        <wire-button label="Button" color="primary" size="small" icon="stack" iconPosition="left"></wire-button>
        <wire-button label="Button" color="primary" size="small" icon="stack" iconPosition="right"></wire-button>

        <wire-button label="Button" color="secondary" size="small"></wire-button>
        <wire-button label="Button" color="secondary" size="small" icon="stack" iconPosition="left"></wire-button>
        <wire-button label="Button" color="secondary" size="small" icon="stack" iconPosition="right"></wire-button>

        <wire-button label="Button" color="tertiary" size="small"></wire-button>
        <wire-button label="Button" color="tertiary" size="small" icon="stack" iconPosition="left"></wire-button>
        <wire-button label="Button" color="tertiary" size="small" icon="stack" iconPosition="right"></wire-button>

        <wire-button label="Button" color="primary" variant="outline" size="small"></wire-button>
        <wire-button label="Button" color="primary" variant="outline" size="small" icon="stack" iconPosition="left"></wire-button>
        <wire-button label="Button" color="primary" variant="outline" size="small" icon="stack" iconPosition="right"></wire-button>

        <wire-button label="Button" color="secondary" variant="outline" size="small"></wire-button>
        <wire-button label="Button" color="secondary" variant="outline" size="small" icon="stack" iconPosition="left"></wire-button>
        <wire-button label="Button" color="secondary" variant="outline" size="small" icon="stack" iconPosition="right"></wire-button>

        <wire-button label="Button" color="tertiary" variant="outline" size="small"></wire-button>
        <wire-button label="Button" color="tertiary" variant="outline" size="small" icon="stack" iconPosition="left"></wire-button>
        <wire-button label="Button" color="tertiary" variant="outline" size="small" icon="stack" iconPosition="right"></wire-button>
      </div> */}

      <div class="my-grid-header">
        <h2>Icons</h2>
      </div>
      <div class="icons-grid">
        <wire-icon name="arrows-left-right" size="large"></wire-icon>
        <wire-icon name="arrows-left-right" size="medium"></wire-icon>
        <wire-icon name="arrows-left-right" size="small"></wire-icon>

        <wire-icon name="bell" size="large"></wire-icon>
        <wire-icon name="bell" size="medium"></wire-icon>
        <wire-icon name="bell" size="small"></wire-icon>

        <wire-icon name="cardholder" size="large"></wire-icon>
        <wire-icon name="cardholder" size="medium"></wire-icon>
        <wire-icon name="cardholder" size="small"></wire-icon>

        <wire-icon name="chat" size="large"></wire-icon>
        <wire-icon name="chat" size="medium"></wire-icon>
        <wire-icon name="chat" size="small"></wire-icon>

        <wire-icon name="coin-vertical" size="large"></wire-icon>
        <wire-icon name="coin-vertical" size="medium"></wire-icon>
        <wire-icon name="coin-vertical" size="small"></wire-icon>

        <wire-icon name="coin" size="large"></wire-icon>
        <wire-icon name="coin" size="medium"></wire-icon>
        <wire-icon name="coin" size="small"></wire-icon>

        <wire-icon name="coins" size="large"></wire-icon>
        <wire-icon name="coins" size="medium"></wire-icon>
        <wire-icon name="coins" size="small"></wire-icon>

        <wire-icon name="copy" size="large"></wire-icon>
        <wire-icon name="copy" size="medium"></wire-icon>
        <wire-icon name="copy" size="small"></wire-icon>

        <wire-icon name="cube" size="large"></wire-icon>
        <wire-icon name="cube" size="medium"></wire-icon>
        <wire-icon name="cube" size="small"></wire-icon>

        <wire-icon name="currency-btc" size="large"></wire-icon>
        <wire-icon name="currency-btc" size="medium"></wire-icon>
        <wire-icon name="currency-btc" size="small"></wire-icon>

        <wire-icon name="currency-eth" size="large"></wire-icon>
        <wire-icon name="currency-eth" size="medium"></wire-icon>
        <wire-icon name="currency-eth" size="small"></wire-icon>

        <wire-icon name="database" size="large"></wire-icon>
        <wire-icon name="database" size="medium"></wire-icon>
        <wire-icon name="database" size="small"></wire-icon>

        <wire-icon name="dots-horizontal" size="large"></wire-icon>
        <wire-icon name="dots-horizontal" size="medium"></wire-icon>
        <wire-icon name="dots-horizontal" size="small"></wire-icon>

        <wire-icon name="dots-vertical" size="large"></wire-icon>
        <wire-icon name="dots-vertical" size="medium"></wire-icon>
        <wire-icon name="dots-vertical" size="small"></wire-icon>
        
        <wire-icon name="filter" size="large"></wire-icon>
        <wire-icon name="filter" size="medium"></wire-icon>
        <wire-icon name="filter" size="small"></wire-icon>
        
        <wire-icon name="gear" size="large"></wire-icon>
        <wire-icon name="gear" size="medium"></wire-icon>
        <wire-icon name="gear" size="small"></wire-icon>

        <wire-icon name="globe" size="large"></wire-icon>
        <wire-icon name="globe" size="medium"></wire-icon>
        <wire-icon name="globe" size="small"></wire-icon>

        <wire-icon name="guage" size="large"></wire-icon>
        <wire-icon name="guage" size="medium"></wire-icon>
        <wire-icon name="guage" size="small"></wire-icon>
        
        <wire-icon name="hard-drives" size="large"></wire-icon>
        <wire-icon name="hard-drives" size="medium"></wire-icon>
        <wire-icon name="hard-drives" size="small"></wire-icon>

        <wire-icon name="list" size="large"></wire-icon>
        <wire-icon name="list" size="medium"></wire-icon>
        <wire-icon name="list" size="small"></wire-icon>

        <wire-icon name="money" size="large"></wire-icon>
        <wire-icon name="money" size="medium"></wire-icon>
        <wire-icon name="money" size="small"></wire-icon>

        <wire-icon name="play-circle" size="large"></wire-icon>
        <wire-icon name="play-circle" size="medium"></wire-icon>
        <wire-icon name="play-circle" size="small"></wire-icon>

        <wire-icon name="qr-code" size="large"></wire-icon>
        <wire-icon name="qr-code" size="medium"></wire-icon>
        <wire-icon name="qr-code" size="small"></wire-icon>

        <wire-icon name="search" size="large"></wire-icon>
        <wire-icon name="search" size="medium"></wire-icon>
        <wire-icon name="search" size="small"></wire-icon>

        <wire-icon name="stack-minus" size="large"></wire-icon>
        <wire-icon name="stack-minus" size="medium"></wire-icon>
        <wire-icon name="stack-minus" size="small"></wire-icon>

        <wire-icon name="stack-plus" size="large"></wire-icon>
        <wire-icon name="stack-plus" size="medium"></wire-icon>
        <wire-icon name="stack-plus" size="small"></wire-icon>

        <wire-icon name="stack" size="large"></wire-icon>
        <wire-icon name="stack" size="medium"></wire-icon>
        <wire-icon name="stack" size="small"></wire-icon>

        <wire-icon name="star" size="large"></wire-icon>
        <wire-icon name="star" size="medium"></wire-icon>
        <wire-icon name="star" size="small"></wire-icon>

        <wire-icon name="support" size="large"></wire-icon>
        <wire-icon name="support" size="medium"></wire-icon>
        <wire-icon name="support" size="small"></wire-icon>
      </div>

      <div class="my-grid-header">
        <h2>Tabs</h2>
      </div>
      <div class="my-container">
        <wire-tabs>
          <wire-tab tab="tab1" active={true}>First Tab</wire-tab>
          <wire-tab tab="tab2">Second Tab</wire-tab>
          <wire-tab tab="tab3" disabled>Disabled Tab</wire-tab>
          
          <div slot="content">
            <div data-tab="tab1">
              <h3>First Tab Content</h3>
              <p>This is the content for the first tab.</p>
            </div>
            <div data-tab="tab2">
              <h3>Second Tab Content</h3>
              <p>This is the content for the second tab.</p>
            </div>
            <div data-tab="tab3">
              <h3>Disabled Tab Content</h3>
              <p>This content should not be visible.</p>
            </div>
          </div>
        </wire-tabs>
      </div>
    </div>;
  }
}
