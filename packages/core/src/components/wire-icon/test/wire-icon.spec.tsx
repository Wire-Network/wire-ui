import { newSpecPage } from '@stencil/core/testing';
import { WireIcon } from '../wire-icon';

describe('wire-icon', () => {
  it('renders with default size', async () => {
    const page = await newSpecPage({
      components: [WireIcon],
      html: `<wire-icon name="star"></wire-icon>`,
    });
    expect(page.root).toEqualHtml(`
      <wire-icon name="star">
        <mock:shadow-root>
          <div class="icon icon--medium"></div>
        </mock:shadow-root>
      </wire-icon>
    `);
  });

  it('renders with custom size', async () => {
    const page = await newSpecPage({
      components: [WireIcon],
      html: `<wire-icon name="star" size="large"></wire-icon>`,
    });
    expect(page.root).toEqualHtml(`
      <wire-icon name="star" size="large">
        <mock:shadow-root>
          <div class="icon icon--large"></div>
        </mock:shadow-root>
      </wire-icon>
    `);
  });
});
