import { ThemeObserver } from './theme-observer';

export interface ThemeConfig {
  theme?: 'light' | 'dark';
  useSystemPreference?: boolean;
  bgLight?: string;
  bgDark?: string;
}

export interface ThemeState {
  currentTheme: 'light' | 'dark';
  themeStyles: Record<string, string>;
}

export class ThemeService {
  private static instance: ThemeService;
  private themeObserver: ThemeObserver;
  private mediaQuery: MediaQueryList | null = null;
  private mediaQueryListener: (() => void) | null = null;

  private constructor() {
    this.themeObserver = ThemeObserver.getInstance();
    
    if (window.matchMedia) {
      this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this.mediaQueryListener = () => {
        this.notifyAllComponents();
      };
      this.mediaQuery.addEventListener('change', this.mediaQueryListener);
    }
  }

  public static getInstance(): ThemeService {
    if (!ThemeService.instance) {
      ThemeService.instance = new ThemeService();
    }
    return ThemeService.instance;
  }

  private notifyAllComponents() {
    // The ThemeObserver will handle notifying all components
  }

  public connect(component: any, element: HTMLElement, config: ThemeConfig, callback: (state: ThemeState) => void) {
    // Set initial state
    const initialState = this.computeThemeState(element, config);
    callback(initialState);

    // Observe theme changes
    this.themeObserver.observe(component, element, () => {
      const newState = this.computeThemeState(element, config);
      callback(newState);
    });

    // Handle system preference changes if enabled
    if (config.useSystemPreference && window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        const newState = this.computeThemeState(element, config);
        callback(newState);
      });
    }
  }

  public disconnect(component: any) {
    this.themeObserver.disconnect(component);
  }

  private computeThemeState(element: HTMLElement, config: ThemeConfig): ThemeState {
    const currentTheme = this.computeTheme(element, config);
    const themeStyles = this.computeThemeStyles(currentTheme, config);

    return {
      currentTheme,
      themeStyles
    };
  }

  private computeTheme(element: HTMLElement, config: ThemeConfig): 'light' | 'dark' {
    console.log('Computing theme with config:', config);
    
    // Priority: explicit prop > data-theme attribute > parent theme classes > system preference
    if (config.theme) {
      console.log('Using explicit theme:', config.theme);
      return config.theme;
    }
    
    // Check for data-theme attribute on element or any parent
    const elementWithTheme = element.closest('[data-theme]');
    if (elementWithTheme) {
      const theme = elementWithTheme.getAttribute('data-theme');
      if (theme === 'dark' || theme === 'light') {
        console.log('Using data-theme attribute from parent:', theme);
        return theme;
      }
    }

    // Check for Ionic dark mode
    const ionApp = document.querySelector('ion-app');
    if (ionApp?.classList.contains('dark-theme')) {
      console.log('Using Ionic dark theme');
      return 'dark';
    }

    // Check for parent theme classes
    const parentElement = element.closest('.dark-theme, .dark, .light-theme, .light');
    if (parentElement) {
      const theme = parentElement.classList.contains('dark-theme') || parentElement.classList.contains('dark') ? 'dark' : 'light';
      console.log('Using parent theme class:', theme);
      return theme;
    }

    // Only use system theme if useSystemPreference is true
    if (config.useSystemPreference && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      console.log('Using system preference: dark');
      return 'dark';
    }

    console.log('Using default theme: light');
    return 'light';
  }

  private computeThemeStyles(currentTheme: 'light' | 'dark', config: ThemeConfig): Record<string, string> {
    const overrideRgb = currentTheme === 'light' && config.bgLight 
      ? this.hexToRgb(config.bgLight)
      : currentTheme === 'dark' && config.bgDark
      ? this.hexToRgb(config.bgDark)
      : null;

    return overrideRgb ? { '--wire-component-bg-override-rgb': overrideRgb } : {};
  }

  private hexToRgb(hex: string): string {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `${r}, ${g}, ${b}`;
  }
} 