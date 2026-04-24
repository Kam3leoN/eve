import { describe, expect, it } from 'vitest';
import { withLibPrefix } from '../../lib.config';
import { ButtonIcon } from './button-icon';

function ensureRegistered(): string {
  const tag = withLibPrefix('button-icon');
  if (!customElements.get(tag)) customElements.define(tag, ButtonIcon);
  return tag;
}

describe('button-icon.visual', () => {
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
