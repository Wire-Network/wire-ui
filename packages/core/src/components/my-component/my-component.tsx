import { Component, h, State, Element } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {
  @State() toastCount = 0;
  @State() isDarkMode = false;
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

  private toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    const root = this.el.closest('.dark, .light');
    if (root) {
      root.classList.remove('dark', 'light');
      root.classList.add(this.isDarkMode ? 'dark' : 'light');
    }
  }

  render() {
    return <div class={this.isDarkMode ? 'dark' : 'light'}>
      <div class="my-grid-header">
        <wire-logo mode="full-color"></wire-logo>
        <wire-button 
          label={this.isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'} 
          buttonType="secondary"
          onClick={() => this.toggleTheme()}
        ></wire-button>
      </div>

      <div class="my-grid-header">
        <h2>Stepper - Horizontal (Numbers)</h2>
      </div>
      <div class="my-grid-header">
        <wire-stepper
          orientation="horizontal"
          stepNumberStyle="numbers"
          nextButtonText="Continue"
          prevButtonText="Previous"
          finishButtonText="Complete"
          showCancelButton={true}
          cancelButtonText="Cancel"
        >
          <wire-step id="horizontal-numbers-step1" title="Personal Info" description="Please enter your name and email address">
            <div>
              <h3>Personal Information</h3>
              <p>Please enter your name and email address.</p>
            </div>
          </wire-step>
          <wire-step id="horizontal-numbers-step2" title="Account Setup" description="Choose a username and password for your account">
            <div>
              <h3>Account Setup</h3>
              <p>Choose a username and password for your account.</p>
            </div>
          </wire-step>
          <wire-step id="horizontal-numbers-step3" title="Preferences" description="Select your preferred settings and notifications">
            <div>
              <h3>Preferences</h3>
              <p>Select your preferred settings and notifications.</p>
            </div>
          </wire-step>
        </wire-stepper>
      </div>

      <div class="my-grid-header">
        <h2>Stepper - Horizontal (Circles)</h2>
      </div>
      <div class="my-grid-header">
        <wire-stepper
          orientation="horizontal"
          stepNumberStyle="circles"
          nextButtonText="Continue"
          prevButtonText="Previous"
          finishButtonText="Complete"
        >
          <wire-step id="horizontal-circles-step1" title="Personal Info" description="Please enter your name and email address">
            <div>
              <h3>Personal Information</h3>
              <p>Please enter your name and email address.</p>
            </div>
          </wire-step>
          <wire-step id="horizontal-circles-step2" title="Account Setup" description="Choose a username and password for your account">
            <div>
              <h3>Account Setup</h3>
              <p>Choose a username and password for your account.</p>
            </div>
          </wire-step>
          <wire-step id="horizontal-circles-step3" title="Preferences" description="Select your preferred settings and notifications">
            <div>
              <h3>Preferences</h3>
              <p>Select your preferred settings and notifications.</p>
            </div>
          </wire-step>
        </wire-stepper>
      </div>

      <div class="my-grid-header">
        <h2>Stepper - Vertical (Numbers)</h2>
      </div>
      <div class="my-grid-header">
        <wire-stepper
          orientation="vertical"
          stepNumberStyle="numbers"
          nextButtonText="Continue"
          prevButtonText="Previous"
          finishButtonText="Complete"
        >
          <wire-step id="vertical-numbers-step1" title="Personal Info" description="Please enter your name and email address">
            <div>
              <h3>Personal Information</h3>
              <p>Please enter your name and email address.</p>
            </div>
          </wire-step>
          <wire-step id="vertical-numbers-step2" title="Account Setup" description="Choose a username and password for your account">
            <div>
              <h3>Account Setup</h3>
              <p>Choose a username and password for your account.</p>
            </div>
          </wire-step>
          <wire-step id="vertical-numbers-step3" title="Preferences" description="Select your preferred settings and notifications">
            <div>
              <h3>Preferences</h3>
              <p>Select your preferred settings and notifications.</p>
            </div>
          </wire-step>
        </wire-stepper>
      </div>

      <div class="my-grid-header">
        <h2>Stepper - Vertical (Circles)</h2>
      </div>
      <div class="my-grid-header">
        <wire-stepper
          orientation="vertical"
          stepNumberStyle="circles"
          nextButtonText="Continue"
          prevButtonText="Previous"
          finishButtonText="Complete"
        >
          <wire-step id="vertical-circles-step1" title="Personal Info" description="Please enter your name and email address">
            <div>
              <h3>Personal Information</h3>
              <p>Please enter your name and email address.</p>
            </div>
          </wire-step>
          <wire-step id="vertical-circles-step2" title="Account Setup" description="Choose a username and password for your account">
            <div>
              <h3>Account Setup</h3>
              <p>Choose a username and password for your account.</p>
            </div>
          </wire-step>
          <wire-step id="vertical-circles-step3" title="Preferences" description="Select your preferred settings and notifications">
            <div>
              <h3>Preferences</h3>
              <p>Select your preferred settings and notifications.</p>
            </div>
          </wire-step>
        </wire-stepper>
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
        <h2>Buttons</h2>
      </div>
      
      <div class="my-grid">
        <wire-button label="New Button" buttonType="primary" size="small" color="gradient"></wire-button>
        <wire-button label="New Button" buttonType="primary" size="medium" color="gradient"></wire-button>
        <wire-button label="New Button" buttonType="primary" size="large" color="gradient"></wire-button>
        
        <wire-button label="New Button" buttonType="primary" size="small"></wire-button>
        <wire-button label="New Button" buttonType="primary"></wire-button>
        <wire-button label="New Button" buttonType="primary" size="large"></wire-button>

        <wire-button label="New Button" buttonType="secondary" size="small" color="gradient"></wire-button>
        <wire-button label="New Button" buttonType="secondary" size="medium" color="gradient"></wire-button>
        <wire-button label="New Button" buttonType="secondary" size="large" color="gradient"></wire-button>

        <wire-button label="New Button" buttonType="secondary" size="small"></wire-button>
        <wire-button label="New Button" buttonType="secondary" size="medium"></wire-button>
        <wire-button label="New Button" buttonType="secondary" size="large"></wire-button>

        <wire-button label="New Button" buttonType="secondary" size="small" glow={true}></wire-button>
        <wire-button label="New Button" buttonType="secondary" size="medium" glow={true}></wire-button>
        <wire-button label="New Button" buttonType="secondary" size="large" glow={true}></wire-button>

        <wire-button label="New Button" buttonType="tertiary" size="small"></wire-button>
        <wire-button label="New Button" buttonType="tertiary"></wire-button>
        <wire-button label="New Button" buttonType="tertiary" size="large"></wire-button>

        <wire-button label="New Button" buttonType="primary" size="small" color="gradient" icon="search"></wire-button>
        <wire-button label="New Button" buttonType="primary" size="medium" color="gradient" icon="stack"></wire-button>
        <wire-button label="New Button" buttonType="primary" size="large" color="gradient" icon="stack"></wire-button>

        <wire-button label="New Button" buttonType="secondary" size="small" color="gradient" icon="stack" iconPosition="right"></wire-button>
        <wire-button label="New Button" buttonType="secondary" size="medium" color="gradient" icon="stack" iconPosition="right"></wire-button>
        <wire-button label="New Button" buttonType="secondary" size="large" color="gradient" icon="stack" iconPosition="right"></wire-button>

        <wire-button label="New Button" buttonType="secondary" size="small" color="gradient" icon="stack" iconPosition="right" glow={true}></wire-button>
        <wire-button label="New Button" buttonType="secondary" size="medium" color="gradient" icon="stack" iconPosition="right" glow={true}></wire-button>
        <wire-button label="New Button" buttonType="secondary" size="large" color="gradient" icon="stack" iconPosition="right" glow={true}></wire-button>
      </div>

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
