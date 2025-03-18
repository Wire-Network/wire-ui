#!/usr/bin/env node

/**
 * Simple deployment script for the Wire UI Library documentation site.
 * This script builds the Storybook site and can be extended to deploy to various platforms.
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Configuration
const config = {
  buildCommand: 'npm run build-storybook',
  outputDir: 'storybook-static',
  deployTarget: process.env.DEPLOY_TARGET || 'local', // Options: local, github, netlify, etc.
};

// Ensure we're in the docs directory
const docsDir = path.resolve(__dirname, '..');
process.chdir(docsDir);

console.log('📚 Deploying Wire UI Library Documentation');
console.log(`🔧 Target: ${config.deployTarget}`);

// Build the site
console.log('\n🏗️  Building Storybook site...');
try {
  execSync(config.buildCommand, { stdio: 'inherit' });
  console.log('✅ Build completed successfully');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Check if the output directory exists
const outputPath = path.resolve(docsDir, config.outputDir);
if (!fs.existsSync(outputPath)) {
  console.error(`❌ Output directory not found: ${outputPath}`);
  process.exit(1);
}

// Deploy based on target
switch (config.deployTarget) {
  case 'local':
    console.log(`\n✅ Build completed. The static site is available at: ${outputPath}`);
    console.log('To deploy to a hosting service, set the DEPLOY_TARGET environment variable.');
    break;
    
  case 'github':
    console.log('\n🚀 Deploying to GitHub Pages...');
    // This can be extended to use gh-pages or other GitHub Pages deployment tools
    console.log('⚠️  GitHub Pages deployment not implemented yet.');
    console.log('You can manually deploy the contents of the storybook-static directory.');
    break;
    
  case 'netlify':
    console.log('\n🚀 Deploying to Netlify...');
    // This can be extended to use the Netlify CLI
    console.log('⚠️  Netlify deployment not implemented yet.');
    console.log('You can manually deploy using the Netlify CLI or drag and drop the storybook-static directory to Netlify.');
    break;
    
  default:
    console.log(`\n⚠️  Unknown deployment target: ${config.deployTarget}`);
    console.log(`Available targets: local, github, netlify`);
}

console.log('\n📚 Deployment process completed'); 