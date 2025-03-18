# Wire UI Library

A modern, customizable UI component library built with Stencil.js. Wire UI provides a set of reusable web components that work across frameworks including React, Angular, Vue, and vanilla JavaScript.

## Features

- **Framework Agnostic**: Use with any framework or no framework at all
- **Customizable**: Easily theme components with CSS variables
- **Accessible**: Built with accessibility in mind
- **Responsive**: Components work across device sizes
- **TypeScript Support**: Full TypeScript definitions included

## Installation

```bash
npm install @wireio/ui-library
```

For framework-specific wrappers:

<!-- # React
npm install @wireio/ui-library-react -->

```bash
# Angular
npm install @wireio/ui-library-angular
```

## Quick Start

### Vanilla JavaScript

```html
<!DOCTYPE html>
<html>
  <head>
    <script type="module">
      import { defineCustomElements } from '@wireio/ui-library/dist/loader';
      defineCustomElements();
    </script>
  </head>
  <body>
    <wire-button variant="primary">Click Me</wire-button>
  </body>
</html>
```

<!-- ### React

```jsx
import React from 'react';
import { WireButton } from '@wireio/ui-library-react';

function App() {
  return <WireButton variant="primary">Click Me</WireButton>;
}
``` -->

### Angular

```typescript
// In your module
import { WireUiModule } from '@wireio/ui-library-angular';

@NgModule({
  imports: [WireUiModule],
})
export class AppModule {}

// In your component template
<wire-button variant="primary">Click Me</wire-button>;
```

## Documentation

For full documentation, visit our [documentation site](https://wireio.github.io/ui-library).

To run the documentation site locally:

```bash
# Clone the repository
git clone https://github.com/wireio/ui-library.git
cd ui-library

# Install dependencies
npm install

# Start the documentation site
npm run docs:dev
```

## Available Components

- Button
- Card
- Icon
- Logo
- Tabs
- Toast
- ...and more

## Project Structure

This is a monorepo containing:

- `packages/core`: Stencil.js components
- `packages/react`: React wrappers
- `packages/angular`: Angular wrappers
- `docs`: Documentation site built with Storybook

## Development

```bash
# Install dependencies
npm install

# Build all packages
npm run build

# Run tests
npm test

# Start development server for core components
npm run build:core -- --watch
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
