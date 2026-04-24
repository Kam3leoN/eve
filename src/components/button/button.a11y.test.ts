import { describe, expect, it } from 'vitest';
import { withLibPrefix } from '../../lib.config';
import { Button } from './button';

function ensureButtonRegistered(): string {
  const tag = withLibPrefix('button');
  if (!customElements.get(tag)) {
    customElements.define(tag, Button);
  }
  return tag;
}

describe('button.a11y', () => {
  it('relaye aria-label au controle interne', () => {
    const tag = ensureButtonRegistered();
    const el = document.createElement(tag);
    el.setAttribute('aria-label', 'Action principale');
    document.body.appendChild(el);
    const control = el.shadowRoot?.querySelector('button, a');
    expect(control?.getAttribute('aria-label')).toBe('Action principale');
    el.remove();
  });

  it('applique aria-disabled et tabIndex sur lien disabled', () => {
    const tag = ensureButtonRegistered();
    const el = document.createElement(tag);
    el.setAttribute('href', '/x');
    el.setAttribute('disabled', '');
    document.body.appendChild(el);
    const control = el.shadowRoot?.querySelector('a') as HTMLAnchorElement | null;
    expect(control?.getAttribute('aria-disabled')).toBe('true');
    expect(control?.tabIndex).toBe(-1);
    el.remove();
  });

  it('applique aria-pressed en mode toggle', () => {
    const tag = ensureButtonRegistered();
    const el = document.createElement(tag);
    el.setAttribute('toggle', '');
    document.body.appendChild(el);
    const control = el.shadowRoot?.querySelector('button') as HTMLButtonElement | null;
    expect(control?.getAttribute('aria-pressed')).toBe('false');
    control?.click();
    expect(control?.getAttribute('aria-pressed')).toBe('true');
    el.remove();
  });
});
