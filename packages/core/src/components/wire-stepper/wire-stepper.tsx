import { Component, Prop, Event, EventEmitter, h, State, Watch, Element } from '@stencil/core';

export interface Step {
  id: string;
  title: string;
  description?: string;
  content: any;
  contentType?: 'html' | 'component' | 'text';
  validate?: () => boolean | Promise<boolean>;
}

@Component({
  tag: 'wire-stepper',
  styleUrl: 'wire-stepper.css',
  shadow: true,
})
export class WireStepper {
  @Element() el!: HTMLElement;

  /** Array of step objects */
  @Prop() steps: Step[] = [];

  /** Active step index */
  @Prop({ mutable: true }) currentStep: number = 0;

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

  /** Step change event */
  @Event() stepChanged!: EventEmitter<number>;

  /** Flow finished event */
  @Event() finished!: EventEmitter<void>;

  /** Cancellation event */
  @Event() cancelled!: EventEmitter<void>;

  @State() private isProcessing: boolean = false;

  @Watch('currentStep')
  handleCurrentStepChange(newValue: number) {
    this.stepChanged.emit(newValue);
  }

  private async validateStep(step: Step): Promise<boolean> {
    if (!step.validate) return true;
    
    try {
      const result = await step.validate();
      return result;
    } catch (error) {
      console.error('Step validation failed:', error);
      return false;
    }
  }

  private async handleNext() {
    if (this.isProcessing) return;
    
    const currentStep = this.steps[this.currentStep];
    if (this.isLinear && currentStep.validate) {
      this.isProcessing = true;
      const isValid = await this.validateStep(currentStep);
      this.isProcessing = false;
      
      if (!isValid) return;
    }

    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    } else {
      this.finished.emit();
    }
  }

  private handlePrevious() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  private handleCancel() {
    this.cancelled.emit();
  }

  render() {
    const currentStep = this.steps[this.currentStep];
    const isLastStep = this.currentStep === this.steps.length - 1;

    return (
      <div class={`wire-stepper ${this.orientation} ${this.customCssClass || ''}`}>
        <div class="step-indicators">
          {this.steps.map((step, index) => (
            <div
              class={`step-indicator ${index === this.currentStep ? 'active' : ''} ${
                index < this.currentStep ? 'completed' : ''
              }`}
              role="listitem"
              aria-current={index === this.currentStep ? 'step' : undefined}
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

        <div class="step-content" role="tabpanel">
          {(() => {
            switch (currentStep.contentType) {
              case 'html':
                return <div innerHTML={currentStep.content}></div>;
              case 'text':
                return <div>{currentStep.content}</div>;
              default: // 'component' or undefined
                return currentStep.content;
            }
          })()}

          <div class="navigation-buttons">
            {this.showCancelButton && (
              <wire-button 
                label={this.cancelButtonText}
                buttonType="tertiary"
                onClick={() => this.handleCancel()}
                disabled={this.isProcessing}
              ></wire-button>
            )}

            <wire-button 
              label={this.prevButtonText}
              color="gradient"
              buttonType="secondary"
              onClick={() => this.handlePrevious()}
              disabled={this.currentStep === 0 || this.isProcessing}
            ></wire-button>

            <wire-button
              label={isLastStep ? this.finishButtonText : this.nextButtonText}
              color="gradient"
              buttonType="primary"
              onClick={() => this.handleNext()}
              disabled={this.isProcessing}
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