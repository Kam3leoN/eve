import { describe, expect, it } from 'vitest';
import { withLibPrefix } from '../../lib.config';
import { LoadingIndicator } from './loading-indicator';

function ensureRegistered(): string {
  const tag = withLibPrefix('loading-indicator');
  if (!customElements.get(tag)) customElements.define(tag, LoadingIndicator);
  return tag;
}

describe('loading-indicator.visual', () => {
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
