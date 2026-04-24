import { describe, expect, it } from 'vitest';
import { withLibPrefix } from '../../lib.config';
import { LoadingIndicator } from './loading-indicator';

function ensureRegistered(): string {
  const tag = withLibPrefix('loading-indicator');
  if (!customElements.get(tag)) customElements.define(tag, LoadingIndicator);
  return tag;
}

describe('loading-indicator.a11y', () => {
  it('monte le composant avec aria-label', () => {
    const tag = ensureRegistered();
    const el = document.createElement(tag);
    el.setAttribute('aria-label', 'loading-indicator');
    document.body.appendChild(el);
    expect(el.shadowRoot).toBeTruthy();
    el.remove();
  });
});
