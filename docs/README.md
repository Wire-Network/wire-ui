# Wire UI Library Documentation

This is the documentation site for the Wire UI Library, built with Storybook. It provides interactive examples and documentation for all the components in the library.

## Getting Started

### Installation

```bash
# Navigate to the docs directory
cd docs

# Install dependencies
npm install
```

### Development

```bash
# Start the Storybook development server
npm run storybook
```

This will start the Storybook server at http://localhost:6006.

### Building for Production

```bash
# Build the static site
npm run build-storybook
```

This will generate a static site in the `storybook-static` directory, which can be deployed to any static hosting service.

## Deployment

The documentation site can be deployed to any static hosting service, such as:

- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Firebase Hosting

To deploy, simply run:

```bash
npm run deploy
```

## Structure

- `.storybook/` - Storybook configuration
- `stories/` - Component stories and documentation
  - `Introduction.mdx` - Introduction page
  - `components/` - Component-specific stories

## Adding New Components

To add documentation for a new component:

1. Create a new story file in `stories/components/`
2. Import the component from the UI library
3. Define the component's props and examples
4. Add the story to Storybook

## Contributing

Contributions to improve the documentation are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request
