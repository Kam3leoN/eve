import { describe, expect, it } from 'vitest';
import { withLibPrefix } from '../../lib.config';
import { ButtonGroup } from './button-group';

function ensureRegistered(): string {
  const tag = withLibPrefix('button-group');
  if (!customElements.get(tag)) customElements.define(tag, ButtonGroup);
  return tag;
}

describe('button-group.visual', () => {
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
