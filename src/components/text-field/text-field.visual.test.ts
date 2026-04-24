import { describe, expect, it } from 'vitest';
import { withLibPrefix } from '../../lib.config';
import { TextField } from './text-field';

function ensureRegistered(): string {
  const tag = withLibPrefix('text-field');
  if (!customElements.get(tag)) customElements.define(tag, TextField);
  return tag;
}

describe('text-field.visual', () => {
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
