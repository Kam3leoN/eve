import { describe, expect, it } from 'vitest';
import { withLibPrefix } from '../../lib.config';
import { Card } from './card';

function ensureRegistered(): string {
  const tag = withLibPrefix('card');
  if (!customElements.get(tag)) customElements.define(tag, Card);
  return tag;
}

describe('card.a11y', () => {
  it('monte le composant avec aria-label', () => {
    const tag = ensureRegistered();
    const el = document.createElement(tag);
    el.setAttribute('aria-label', 'card');
    document.body.appendChild(el);
    expect(el.shadowRoot).toBeTruthy();
    el.remove();
  });
});
