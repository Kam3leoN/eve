import { describe, expect, it } from 'vitest';
import { withLibPrefix } from '../../lib.config';
import { Shape } from './shape';

function ensureRegistered(): string {
  const tag = withLibPrefix('shape');
  if (!customElements.get(tag)) customElements.define(tag, Shape);
  return tag;
}

describe('shape.a11y', () => {
  it('monte le composant avec aria-label', () => {
    const tag = ensureRegistered();
    const el = document.createElement(tag);
    el.setAttribute('aria-label', 'shape');
    document.body.appendChild(el);
    expect(el.shadowRoot).toBeTruthy();
    el.remove();
  });
});
