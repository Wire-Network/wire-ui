import { Component, Prop, h, Event, EventEmitter, Element, State } from '@stencil/core';

@Component({
  tag: 'wire-step',
  styleUrl: 'wire-step.css',
  shadow: false,
})
export class WireStep {
  @Element() el!: HTMLElement;

  /** The title of the step */
  @Prop() title!: string;

  /** Optional description for the step */
  @Prop() description?: string;

  /** Unique identifier for the step */
  @Prop() id!: string;

  /** Whether the step is disabled */
  @Prop() disabled: boolean = false;

  /** Whether the step is currently active */
  @Prop() active: boolean = false;

  /** Whether the step has been completed */
  @Prop() completed: boolean = false;

  /** Validation function for the step */
  @Prop() validate?: () => boolean | Promise<boolean>;

  /** Event emitted when the step is validated */
  @Event() stepValidated!: EventEmitter<{ id: string; isValid: boolean }>;

  /** Event emitted when the step is completed */
  @Event() stepCompleted!: EventEmitter<string>;

  @State() private isValid: boolean = true;
  @State() private isProcessing: boolean = false;

  componentWillLoad() {
    // Generate an ID if none provided
    if (!this.id) {
      this.id = `step-${Math.random().toString(36).substr(2, 9)}`;
    }
  }

  async validateStep(): Promise<boolean> {
    if (!this.validate) return true;
    
    this.isProcessing = true;
    try {
      const result = await this.validate();
      this.isValid = result;
      this.stepValidated.emit({ id: this.id, isValid: result });
      return result;
    } catch (error) {
      console.error('Step validation failed:', error);
      this.isValid = false;
      this.stepValidated.emit({ id: this.id, isValid: false });
      return false;
    } finally {
      this.isProcessing = false;
    }
  }

  markAsCompleted() {
    this.completed = true;
    this.stepCompleted.emit(this.id);
  }

  render() {
    return (
      <div
        class={{
          'wire-step': true,
          'active': this.active,
          'completed': this.completed,
          'disabled': this.disabled,
          'invalid': !this.isValid,
          'processing': this.isProcessing
        }}
        role="tabpanel"
        aria-labelledby={`step-${this.id}-title`}
        aria-hidden={!this.active}
      >
        <div class="step-content">
          <slot></slot>
        </div>
      </div>
    );
  }
} 