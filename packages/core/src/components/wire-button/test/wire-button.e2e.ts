import { newE2EPage } from '@stencil/core/testing';

describe('wire-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<wire-button label="Click me"></wire-button>');

    const element = await page.find('wire-button');
    expect(element).toBeDefined();
  });

  it('handles click events', async () => {
    const page = await newE2EPage();
    await page.setContent('<wire-button label="Click me"></wire-button>');

    const element = await page.find('wire-button >>> button');
    const spy = await page.spyOnEvent('click');

    await element.click();
    expect(spy).toHaveReceivedEvent();
  });

  it('respects disabled state', async () => {
    const page = await newE2EPage();
    await page.setContent('<wire-button label="Click me" disabled="true"></wire-button>');

    const button = await page.find('wire-button >>> button');
    expect(button).toHaveClass('button--disabled');
  });
});
