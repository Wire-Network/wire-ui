import { newSpecPage } from '@stencil/core/testing';
import { WireButton } from '../wire-button';

describe('wire-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [WireButton],
      html: `<wire-button></wire-button>`
    });
    expect(page.root).toBeDefined();
  });

  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [WireButton],
      html: `<wire-button></wire-button>`,
    });
    expect(page.root).toEqualLightHtml(`
      <wire-button>
        <button class="my-button button--primary button--filled button--medium"></button>
      </wire-button>
    `);
  });

  it('renders with label', async () => {
    const page = await newSpecPage({
      components: [WireButton],
      html: `<wire-button label="Click me"></wire-button>`,
    });
    expect(page.root).toEqualHtml(`
      <wire-button label="Click me">
        <mock:shadow-root>
          <button class="my-button button--primary button--filled button--medium">
            Click me
          </button>
        </mock:shadow-root>
      </wire-button>
    `);
  });

  it('renders with icon', async () => {
    const page = await newSpecPage({
      components: [WireButton],
      html: `<wire-button label="Settings" icon="gear"></wire-button>`,
    });
    expect(page.root).toEqualHtml(`
      <wire-button label="Settings" icon="gear">
        <mock:shadow-root>
          <button class="my-button button--primary button--filled button--medium button--has-icon button--icon-left">
            <wire-icon name="gear" size="medium"></wire-icon>
            Settings
          </button>
        </mock:shadow-root>
      </wire-button>
    `);
  });
});
