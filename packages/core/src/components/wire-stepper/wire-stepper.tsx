import { Component, Prop, Event, EventEmitter, h, State, Watch, Element, Listen } from '@stencil/core';
import { ThemeService, ThemeConfig, ThemeState } from '../../utils/theme-service';

@Component({
  tag: 'wire-stepper',
  styleUrl: 'wire-stepper.css',
  shadow: true,
})
export class WireStepper {
  @Element() el!: HTMLElement;

  /** Initial step index */
  @Prop() currentStep: number = 0;

  /** Button label customization */
  @Prop() nextButtonText: string = 'Next';
  @Prop() prevButtonText: string = 'Back';
  @Prop() finishButtonText: string = 'Finish';
  @Prop() cancelButtonText: string = 'Cancel';
  @Prop() showCancelButton: boolean = false;

  /** Navigation mode: linear or non-linear */
  @Prop() isLinear: boolean = true;

  /** Orientation mode: horizontal or vertical */
  @Prop() orientation: 'horizontal' | 'vertical' = 'horizontal';

  /** Step number style: 'numbers' or 'circles' */
  @Prop() stepNumberStyle: 'numbers' | 'circles' = 'numbers';

  /** Optional custom CSS class */
  @Prop() customCssClass?: string;

  /** Theme configuration */
  @Prop() theme?: 'light' | 'dark';
  @Prop() useSystemPreference: boolean = false;
  @Prop() bgLight?: string;
  @Prop() bgDark?: string;

  /** Step change event */
  @Event() stepChanged!: EventEmitter<number>;

  /** Flow finished event */
  @Event() finished!: EventEmitter<void>;

  /** Cancellation event */
  @Event() cancelled!: EventEmitter<void>;

  @State() private isProcessing: boolean = false;
  @State() private _currentStep: number = 0;
  @State() themeState: ThemeState = {
    currentTheme: 'light',
    themeStyles: {}
  };

  private themeService: ThemeService;
  private themeConfig: ThemeConfig;
  private steps: HTMLWireStepElement[] = [];

  constructor() {
    this.themeService = ThemeService.getInstance();
    this.themeConfig = {
      theme: this.theme,
      useSystemPreference: this.useSystemPreference,
      bgLight: this.bgLight,
      bgDark: this.bgDark
    };
  }

  componentWillLoad() {
    this._currentStep = this.currentStep;
    this.collectSteps();
  }

  connectedCallback() {
    this.themeService.connect(this, this.el, this.themeConfig, (state) => {
      this.themeState = state;
    });
  }

  disconnectedCallback() {
    this.themeService.disconnect(this);
  }

  @Watch('currentStep')
  handleCurrentStepPropChange(newValue: number) {
    this._currentStep = newValue;
    this.updateActiveStep();
  }

  @Watch('_currentStep')
  handleCurrentStepChange(newValue: number) {
    this.updateActiveStep();
    this.stepChanged.emit(newValue);
  }

  private collectSteps() {
    this.steps = Array.from(this.el.querySelectorAll('wire-step'));
    this.updateActiveStep();
  }

  private updateActiveStep() {
    this.steps.forEach((step, index) => {
      step.active = index === this._currentStep;
    });
  }

  @Listen('stepValidated')
  handleStepValidated(event: CustomEvent<{ id: string; isValid: boolean }>) {
    const step = this.steps.find(s => s.id === event.detail.id);
    if (step) {
      step.completed = event.detail.isValid;
    }
  }

  private async validateCurrentStep(): Promise<boolean> {
    const currentStep = this.steps[this._currentStep];
    if (!currentStep) return true;

    if (this.isLinear && currentStep.validate) {
      this.isProcessing = true;
      const isValid = await currentStep.validate();
      this.isProcessing = false;
      return isValid;
    }

    return true;
  }

  private async handleNext() {
    if (this.isProcessing) return;
    
    const isValid = await this.validateCurrentStep();
    if (!isValid) return;

    if (this._currentStep < this.steps.length - 1) {
      this._currentStep++;
    } else {
      this.finished.emit();
    }
  }

  private handlePrevious() {
    if (this._currentStep > 0) {
      this._currentStep--;
    }
  }

  private handleCancel() {
    this.cancelled.emit();
  }

  render() {
    const isLastStep = this._currentStep === this.steps.length - 1;

    return (
      <div 
        class={`wire-stepper ${this.orientation} ${this.customCssClass || ''} ${
          this.themeState.currentTheme === 'dark' ? 'wire-stepper--dark' : ''
        }`}
        style={this.themeState.themeStyles}
        data-theme={this.themeState.currentTheme}
      >
        <div class="step-indicators">
          {this.steps.map((step, index) => (
            <div
              key={`step-${step.id}-${index}`}
              class={`step-indicator ${index === this._currentStep ? 'active' : ''} ${
                index < this._currentStep ? 'completed' : ''
              }`}
              role="listitem"
              aria-current={index === this._currentStep ? 'step' : undefined}
              data-theme={this.themeState.currentTheme}
            >
              <div class={`step-number ${this.stepNumberStyle}`}>
                <div class="step-number-inner">
                  {this.stepNumberStyle === 'numbers' ? index + 1 : ''}
                </div>
              </div>
              <div class="step-info">
                <div class="step-title">{step.title}</div>
                {step.description && <div class="step-description">{step.description}</div>}
              </div>
            </div>
          ))}
        </div>

        <div class="step-content" role="tabpanel" data-theme={this.themeState.currentTheme}>
          <slot></slot>

          <div class="navigation-buttons" data-theme={this.themeState.currentTheme}>
            {this.showCancelButton && (
              <wire-button 
                label={this.cancelButtonText}
                buttonType="tertiary"
                onClick={() => this.handleCancel()}
                disabled={this.isProcessing}
                useSystemPreference={this.useSystemPreference}
                bgLight={this.bgLight}
                bgDark={this.bgDark}
              ></wire-button>
            )}

            <wire-button 
              label={this.prevButtonText}
              color="gradient"
              buttonType="secondary"
              onClick={() => this.handlePrevious()}
              disabled={this._currentStep === 0 || this.isProcessing}
              useSystemPreference={this.useSystemPreference}
              bgLight={this.bgLight}
              bgDark={this.bgDark}
            ></wire-button>

            <wire-button
              label={isLastStep ? this.finishButtonText : this.nextButtonText}
              color="gradient"
              buttonType="primary"
              onClick={() => this.handleNext()}
              disabled={this.isProcessing}
              useSystemPreference={this.useSystemPreference}
              bgLight={this.bgLight}
              bgDark={this.bgDark}
            ></wire-button>
          </div>
        </div>

        {this.isProcessing && (
          <div class="processing-overlay">
            <div class="spinner"></div>
          </div>
        )}
      </div>
    );
  }
}