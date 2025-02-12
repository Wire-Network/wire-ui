/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{ts,tsx,html,js,jsx,scss,css}',
    './src/components/**/*.{ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand Colors
        blue: {
          DEFAULT: 'var(--blue)',
          dark: 'var(--blue-dark)',
          light: 'var(--blue-light)',
        },
        purple: {
          DEFAULT: 'var(--purple)',
          dark: 'var(--purple-dark)',
          light: 'var(--purple-light)',
        },
        green: 'var(--green)',
        teal: 'var(--teal)',
        red: 'var(--red)',
        rose: 'var(--rose)',
        gold: 'var(--gold)',
        navy: 'var(--navy)',
        periwinkle: 'var(--periwinkle)',
        'sky-blue': 'var(--sky-blue)',

        // Gray Shades
        'main': 'var(--gray-100)',
        'main-2': 'var(--gray-80)',
        'main-3': 'var(--gray-60)',
        'main-4': 'var(--gray-40)',
        'gray-100': 'var(--gray-100)',
        'gray-95': 'var(--gray-95)',
        'gray-90': 'var(--gray-90)',
        'gray-80': 'var(--gray-80)',
        'gray-70': 'var(--gray-70)',
        'gray-60': 'var(--gray-60)',
        'gray-50': 'var(--gray-50)',
        'gray-40': 'var(--gray-40)',
        'gray-30': 'var(--gray-30)',
        'gray-20': 'var(--gray-20)',
        'gray-10': 'var(--gray-10)',
        'gray-05': 'var(--gray-05)',


        // Ionic Colors
        primary: 'var(--ion-color-primary)',
        secondary: 'var(--ion-color-secondary)',
        tertiary: 'var(--ion-color-tertiary)',
        success: 'var(--ion-color-success)',
        warning: 'var(--ion-color-warning)',
        danger: 'var(--ion-color-danger)',
        light: 'var(--ion-color-light)',
        medium: 'var(--ion-color-medium)',
        dark: 'var(--ion-color-dark)',

        // Background and Borders
        background: 'var(--ion-background-color)',
        border: 'var(--ion-border-color)',
        'toolbar-background': 'var(--ion-toolbar-background)',
        'tab-bar-background': 'var(--ion-tab-bar-background)',
        'item-background': 'var(--ion-item-background)',
        'item-background-hover': 'var(--ion-item-background-hover)',

        // Light background variants for admonitions
        'blue-light': 'rgba(var(--blue-rgb), 0.1)',
        'gold-light': 'rgba(var(--gold-rgb), 0.1)',
        'teal-light': 'rgba(var(--teal-rgb), 0.1)',
        'rose-light': 'rgba(var(--rose-rgb), 0.1)',
        'red-light': 'rgba(var(--red-rgb), 0.1)',
      },
      fontFamily: {
        sora: ['"Sora"', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['10px'],
        xs: ['12px'],
        sm: ['14px'],
        md: ['16px'],
        lg: ['18px'],
        xl: ['20px'],
        '2xl': ['24px'],
        '3xl': ['32px'],
        '4xl': ['48px'],
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      }
    },
    container: {
      center: true,
    },
    screens: {
      'xs': '575px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}; 