import { HTMLStencilElement } from '@stencil/core/internal';

export interface HTMLWireStepElement extends HTMLStencilElement {
  title: string;
  description?: string;
  id: string;
  disabled: boolean;
  active: boolean;
  completed: boolean;
  validate?: () => boolean | Promise<boolean>;
  validateStep: () => Promise<boolean>;
  markAsCompleted: () => void;
}

declare global {
  interface HTMLElementTagNameMap {
    'wire-step': HTMLWireStepElement;
  }
} 