import { describe, expect, it } from 'vitest';
import { withLibPrefix } from '../../lib.config';
import { NavigationCard } from './navigation-card';

function ensureRegistered(): string {
  const tag = withLibPrefix('navigation-card');
  if (!customElements.get(tag)) customElements.define(tag, NavigationCard);
  return tag;
}

describe('navigation-card.a11y', () => {
  it('monte le composant avec aria-label', () => {
    const tag = ensureRegistered();
    const el = document.createElement(tag);
    el.setAttribute('aria-label', 'navigation-card');
    document.body.appendChild(el);
    expect(el.shadowRoot).toBeTruthy();
    el.remove();
  });
});
