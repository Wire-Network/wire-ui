import { newSpecPage } from '@stencil/core/testing';
import { WireCard } from '../wire-card';

describe('wire-card', () => {
  it('renders empty card', async () => {
    const page = await newSpecPage({
      components: [WireCard],
      html: `<wire-card></wire-card>`,
    });
    expect(page.root).toEqualHtml(`
      <wire-card>
        <mock:shadow-root>
          <div class="wire-card">
            <header>
              <h3 class="title"></h3>
              <div class="actions">
                <slot name="actions"></slot>
              </div>
            </header>
            <div class="body">
              <slot></slot>
            </div>
          </div>
        </mock:shadow-root>
      </wire-card>
    `);
  });

  it('renders with heading', async () => {
    const page = await newSpecPage({
      components: [WireCard],
      html: `<wire-card heading="Card Title"></wire-card>`,
    });
    expect(page.root).toEqualHtml(`
      <wire-card heading="Card Title">
        <mock:shadow-root>
          <div class="wire-card">
            <header>
              <h3 class="title">Card Title</h3>
              <div class="actions">
                <slot name="actions"></slot>
              </div>
            </header>
            <div class="body">
              <slot></slot>
            </div>
          </div>
        </mock:shadow-root>
      </wire-card>
    `);
  });
});
