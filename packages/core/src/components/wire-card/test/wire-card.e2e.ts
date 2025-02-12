import { newE2EPage } from '@stencil/core/testing';

describe('wire-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<wire-card></wire-card>');

    const element = await page.find('wire-card');
    expect(element).toHaveClass('hydrated');
  });
});
