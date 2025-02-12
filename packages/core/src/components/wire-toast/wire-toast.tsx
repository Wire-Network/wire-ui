import { Component, h, Prop, State } from '@stencil/core';

declare global {
  interface HTMLWireToastElement extends HTMLElement {
    addToast: (options: Omit<WireToastOptions, 'id'>) => void;
  }
  interface HTMLElementTagNameMap {
    'wire-toast': HTMLWireToastElement;
  }
}

export interface WireToastOptions {
  id: number;
  header?: string;
  message?: string;
  icon?: string;
  color?: 'success' | 'danger' | 'warning' | 'primary' | 'secondary' | 'tertiary' | 'dark' | 'medium' | 'light' | 'default';
  closable?: boolean;
}

@Component({
  tag: 'wire-toast',
  styleUrl: 'wire-toast.css',
  shadow: true
})
export class WireToast {
  @State() toasts: WireToastOptions[] = [];
  
  @Prop() position: 'bottom-right' | 'center' = 'bottom-right';

  private removeToast(id: number) {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
  }

  // Method to add a new toast (can be called externally)
  public addToast(options: Omit<WireToastOptions, 'id'>) {
    const newToast: WireToastOptions = {
      id: Date.now(),
      closable: true,
      color: 'default',
      ...options
    };
    
    this.toasts = [...this.toasts, newToast];

    // Auto remove toast after 3 seconds if not manually closed
    if (newToast.closable) {
      setTimeout(() => {
        this.removeToast(newToast.id);
      }, 3000);
    }
  }

  render() {
    return (
      <div class={{
        'toast-container': true,
        'center': this.position === 'center'
      }}>
        {this.toasts.map(toast => (
          <div 
            key={toast.id}
            class={{
              'toast': true,
              [toast.color || 'default']: !!toast.color
            }}
            data-id={toast.id}
          >
            {toast.icon && (
              <div class="start">
                <wire-icon name={toast.icon}></wire-icon>
              </div>
            )}
            
            <div class="body">
              {toast.header && <div class="header">{toast.header}</div>}
              {toast.message && <div class="message">{toast.message}</div>}
            </div>

            {toast.closable && (
              <div class="end">
                <wire-icon 
                  name="close" 
                  class="close-icon" 
                  onClick={() => this.removeToast(toast.id)}
                ></wire-icon>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
}
