import { describe, expect, it } from 'vitest';
import { withLibPrefix } from '../../lib.config';
import { TextField } from './text-field';

function ensureRegistered(): string {
  const tag = withLibPrefix('text-field');
  if (!customElements.get(tag)) customElements.define(tag, TextField);
  return tag;
}

describe('text-field.a11y', () => {
  it('monte le composant avec aria-label', () => {
    const tag = ensureRegistered();
    const el = document.createElement(tag);
    el.setAttribute('aria-label', 'text-field');
    document.body.appendChild(el);
    expect(el.shadowRoot).toBeTruthy();
    el.remove();
  });
});
