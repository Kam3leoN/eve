import { describe, expect, it } from 'vitest';
import { withLibPrefix } from '../../lib.config';
import { ButtonIcon } from './button-icon';

function ensureRegistered(): string {
  const tag = withLibPrefix('button-icon');
  if (!customElements.get(tag)) customElements.define(tag, ButtonIcon);
  return tag;
}

describe('button-icon.a11y', () => {
  it('monte le composant avec aria-label', () => {
    const tag = ensureRegistered();
    const el = document.createElement(tag);
    el.setAttribute('aria-label', 'button-icon');
    document.body.appendChild(el);
    expect(el.shadowRoot).toBeTruthy();
    el.remove();
  });
});
