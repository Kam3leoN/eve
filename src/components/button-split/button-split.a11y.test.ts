import { describe, expect, it } from 'vitest';
import { withLibPrefix } from '../../lib.config';
import { ButtonSplit } from './button-split';

function ensureRegistered(): string {
  const tag = withLibPrefix('button-split');
  if (!customElements.get(tag)) customElements.define(tag, ButtonSplit);
  return tag;
}

describe('button-split.a11y', () => {
  it('monte le composant avec aria-label', () => {
    const tag = ensureRegistered();
    const el = document.createElement(tag);
    el.setAttribute('aria-label', 'button-split');
    document.body.appendChild(el);
    expect(el.shadowRoot).toBeTruthy();
    el.remove();
  });
});
