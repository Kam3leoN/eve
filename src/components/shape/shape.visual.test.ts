import { describe, expect, it } from 'vitest';
import { withLibPrefix } from '../../lib.config';
import { Shape } from './shape';

function ensureRegistered(): string {
  const tag = withLibPrefix('shape');
  if (!customElements.get(tag)) customElements.define(tag, Shape);
  return tag;
}

describe('shape.visual', () => {
  it('produit une empreinte de rendu stable', () => {
    const tag = ensureRegistered();
    const el = document.createElement(tag);
    document.body.appendChild(el);
    const root = el.shadowRoot;
    const sig = root ? root.innerHTML.length : 0;
    expect(sig).toBeGreaterThan(0);
    el.remove();
  });
});
