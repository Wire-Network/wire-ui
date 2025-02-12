import { newE2EPage } from '@stencil/core/testing';

describe('wire-icon', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<wire-icon></wire-icon>');

    const element = await page.find('wire-icon');
    expect(element).toHaveClass('hydrated');
  });
});
