import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import { angularOutputTarget } from '@stencil/angular-output-target';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'wire-ui',
  globalStyle: 'src/global/variables.css',
  plugins: [
    postcss({
      plugins: require('./postcss.config.js').plugins
    })
  ],
  outputTargets: [
    // Main distribution output
    {
      type: 'dist',
      esmLoaderPath: 'loader',
      copy: [
        { src: 'assets/fonts', dest: 'wire-ui/fonts' }
      ]
    },
    // Custom elements bundle
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
      generateTypeDeclarations: true,
      includeGlobalScripts: true,
      minify: true
    },
    // Angular output target
    angularOutputTarget({
      componentCorePackage: '@wireio/ui-library',
      directivesProxyFile: '../angular/projects/wire-ui/src/lib/stencil-generated/components.ts',
      directivesArrayFile: '../angular/projects/wire-ui/src/lib/stencil-generated/index.ts',
      valueAccessorConfigs: [],
      excludeComponents: [
        'my-component'
      ]
    }),
    // React output target
    reactOutputTarget({
      componentCorePackage: '@wireio/ui-library',
      proxiesFile: '../react/src/components/proxies.ts'
    }),
    // Documentation
    {
      type: 'docs-readme',
    },
    // Development server output
    {
      type: 'www',
      serviceWorker: null,
      buildDir: 'build',
      copy: [
        { src: 'components/assets', dest: 'build/assets' },
        { src: 'assets/fonts', dest: 'build/wire-ui/fonts' }
      ]
    }
  ],
  testing: {
    browserHeadless: true,
    moduleDirectories: ['node_modules']
  },
  devServer: {
    reloadStrategy: 'pageReload',
    openBrowser: false,
    port: 3333
  },
  extras: {
    enableImportInjection: true
  },
  buildEs5: 'prod',
  sourceMap: false
};
