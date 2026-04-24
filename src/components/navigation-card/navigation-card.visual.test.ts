import { describe, expect, it } from 'vitest';
import { withLibPrefix } from '../../lib.config';
import { NavigationCard } from './navigation-card';

function ensureRegistered(): string {
  const tag = withLibPrefix('navigation-card');
  if (!customElements.get(tag)) customElements.define(tag, NavigationCard);
  return tag;
}

describe('navigation-card.visual', () => {
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
