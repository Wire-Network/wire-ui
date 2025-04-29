import { Component, Prop, Event, EventEmitter, h, State, Watch, Element } from '@stencil/core';
import { ThemeService, ThemeConfig, ThemeState } from '../../utils/theme-service';

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
  @State() private stepContent: any = null;
  @State() private stepKey: string = '';
  @State() themeState: ThemeState = {
    currentTheme: 'light',
    themeStyles: {}
  };

  private themeService: ThemeService;
  private themeConfig: ThemeConfig;

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
    this.updateStepContent();
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
    this.updateStepContent();
  }

  @Watch('_currentStep')
  handleCurrentStepChange(newValue: number) {
    this.updateStepContent();
    this.stepChanged.emit(newValue);
  }

  private updateStepContent() {
    const currentStep = this.steps[this._currentStep];
    if (currentStep) {
      this.stepKey = `${currentStep.id}-${this._currentStep}-${Date.now()}`;
      this.stepContent = this.renderStepContent(currentStep.content, this.stepKey);
    }
  }

  private renderStepContent(content: any, stepKey: string) {
    if (typeof content === 'string') {
      return <div key={`${stepKey}-content`}>{content}</div>;
    }
    
    if (content && typeof content === 'object') {
      const cloneWithKeys = (node: any, parentKey: string, index: number = 0): any => {
        if (!node) return node;
        
        if (typeof node === 'string' || typeof node === 'number') {
          return node;
        }
        
        if (Array.isArray(node)) {
          return node.map((item: any, i: number) => cloneWithKeys(item, `${parentKey}-${i}`, i));
        }
        
        if (node.type) {
          const newProps = { ...node.props };
          if (!newProps.key) {
            newProps.key = `${parentKey}-${node.type}-${index}-${Date.now()}`;
          }
          
          if (newProps.children) {
            if (Array.isArray(newProps.children)) {
              newProps.children = newProps.children.map((child: any, i: number) => 
                cloneWithKeys(child, newProps.key, i)
              );
            } else {
              newProps.children = cloneWithKeys(newProps.children, newProps.key);
            }
          }
          
          return {
            ...node,
            props: newProps
          };
        }
        
        return node;
      };
      
      const clonedContent = cloneWithKeys(content, stepKey);
      
      if (clonedContent.type && clonedContent.type !== 'div') {
        return <div key={`${stepKey}-wrapper-${Date.now()}`}>{clonedContent}</div>;
      }
      
      return clonedContent;
    }
    
    return content;
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
    
    const currentStep = this.steps[this._currentStep];
    if (this.isLinear && currentStep.validate) {
      this.isProcessing = true;
      const isValid = await this.validateStep(currentStep);
      this.isProcessing = false;
      
      if (!isValid) return;
    }

    if (this._currentStep < this.steps.length - 1) {
      this._currentStep++;
      this.updateStepContent();
    } else {
      this.finished.emit();
    }
  }

  private handlePrevious() {
    if (this._currentStep > 0) {
      this._currentStep--;
      this.updateStepContent();
    }
  }

  private handleCancel() {
    this.cancelled.emit();
  }

  render() {
    const currentStep = this.steps[this._currentStep];
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
              key={`step-${step.id}-${index}-${Date.now()}`}
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
          {(() => {
            switch (currentStep.contentType) {
              case 'html':
                return <div key={`${this.stepKey}-html`} innerHTML={currentStep.content}></div>;
              case 'text':
                return <div key={`${this.stepKey}-text`}>{currentStep.content}</div>;
              default: // 'component' or undefined
                return this.stepContent;
            }
          })()}

          <div class="navigation-buttons" data-theme={this.themeState.currentTheme}>
            {this.showCancelButton && (
              <wire-button 
                key={`${this.stepKey}-cancel`}
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
              key={`${this.stepKey}-prev`}
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
              key={`${this.stepKey}-next`}
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