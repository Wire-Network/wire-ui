export class ThemeObserver {
  private static instance: ThemeObserver;
  private observers: Map<any, MutationObserver> = new Map();
  private mediaQuery: MediaQueryList | null = null;
  private mediaQueryListener: (() => void) | null = null;

  private constructor() {
    // Initialize system preference listener
    if (window.matchMedia) {
      this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this.mediaQueryListener = () => {
        this.notifyAllComponents();
      };
      this.mediaQuery.addEventListener('change', this.mediaQueryListener);
    }
  }

  public static getInstance(): ThemeObserver {
    if (!ThemeObserver.instance) {
      ThemeObserver.instance = new ThemeObserver();
    }
    return ThemeObserver.instance;
  }

  private notifyAllComponents() {
    this.observers.forEach((observer) => {
      const callback = (observer as any).callback;
      if (callback) {
        callback();
      }
    });
  }

  public observe(component: any, element: HTMLElement, callback: () => void) {
    // First, find the nearest parent with theme classes or data-theme
    const parentElement = element.closest('.dark-theme, .dark, .light-theme, .light, [data-theme]');
    
    // Also check for Ionic's theme
    const ionApp = document.querySelector('ion-app');
    const targetElement = parentElement || ionApp || document.documentElement;

    // Create observer with callback
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && 
            (mutation.attributeName === 'class' || mutation.attributeName === 'data-theme')) {
          callback();
        }
      });
    });

    // Store callback for system preference changes
    (observer as any).callback = callback;

    // Start observing
    observer.observe(targetElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme']
    });

    // Store observer
    this.observers.set(component, observer);

    // Trigger initial callback
    callback();
  }

  public disconnect(component: any) {
    const observer = this.observers.get(component);
    if (observer) {
      observer.disconnect();
      this.observers.delete(component);
    }
  }

  public destroy() {
    // Clean up all observers
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();

    // Clean up media query listener
    if (this.mediaQuery && this.mediaQueryListener) {
      this.mediaQuery.removeEventListener('change', this.mediaQueryListener);
    }
  }
} 