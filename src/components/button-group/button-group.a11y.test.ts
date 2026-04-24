import { describe, expect, it } from 'vitest';
import { withLibPrefix } from '../../lib.config';
import { ButtonGroup } from './button-group';

function ensureRegistered(): string {
  const tag = withLibPrefix('button-group');
  if (!customElements.get(tag)) customElements.define(tag, ButtonGroup);
  return tag;
}

describe('button-group.a11y', () => {
  it('monte le composant avec aria-label', () => {
    const tag = ensureRegistered();
    const el = document.createElement(tag);
    el.setAttribute('aria-label', 'button-group');
    document.body.appendChild(el);
    expect(el.shadowRoot).toBeTruthy();
    el.remove();
  });
});
