import { Component, Prop, Event, EventEmitter, h, State, Watch } from '@stencil/core';

export interface Step {
  id: string;
  title: string;
  description?: string;
  content: any;
  validate?: () => boolean | Promise<boolean>;
}

@Component({
  tag: 'wire-stepper',
  styleUrl: 'wire-stepper.css',
  shadow: true,
})
export class WireStepper {
  @Prop() steps: Step[] = [];
  @Prop({ mutable: true }) currentStep: number = 0;
  @Prop() nextButtonText: string = 'Next';
  @Prop() prevButtonText: string = 'Back';
  @Prop() finishButtonText: string = 'Finish';
  @Prop() isLinear: boolean = true;
  @Prop() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Prop() customCssClass?: string;
  @Event() stepChanged!: EventEmitter<number>;
  @Event() finished!: EventEmitter<void>;
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
              <div class="step-number">{index + 1}</div>
              <div class="step-info">
                <div class="step-title">{step.title}</div>
                {step.description && <div class="step-description">{step.description}</div>}
              </div>
            </div>
          ))}
        </div>

        <div class="step-content" role="tabpanel">
          {currentStep.content}
        </div>

        <div class="navigation-buttons">
          <button
            class="button prev"
            onClick={() => this.handlePrevious()}
            disabled={this.currentStep === 0 || this.isProcessing}
          >
            {this.prevButtonText}
          </button>
          
          <button
            class="button next"
            onClick={() => this.handleNext()}
            disabled={this.isProcessing}
          >
            {isLastStep ? this.finishButtonText : this.nextButtonText}
          </button>

          <button
            class="button cancel"
            onClick={() => this.handleCancel()}
            disabled={this.isProcessing}
          >
            Cancel
          </button>
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