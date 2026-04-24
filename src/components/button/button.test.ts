import { describe, expect, it } from 'vitest';
import { withLibPrefix } from '../../lib.config';
import { Button } from './button';

function ensureButtonRegistered(): void {
  const tag = withLibPrefix('button');
  if (!customElements.get(tag)) {
    customElements.define(tag, Button);
  }
}

describe('button', () => {
  it('initialise automatiquement sans no-autoinit', () => {
    ensureButtonRegistered();
    const el = document.createElement(withLibPrefix('button'));
    el.textContent = 'Action';
    document.body.appendChild(el);
    const control = el.shadowRoot?.querySelector('button, a');
    expect(control).toBeTruthy();
    el.remove();
  });

  it('differe l’initialisation avec no-autoinit puis init manuel', () => {
    ensureButtonRegistered();
    const el = document.createElement(withLibPrefix('button'));
    el.setAttribute('no-autoinit', '');
    el.textContent = 'Action';
    document.body.appendChild(el);
    expect(el.shadowRoot?.querySelector('button, a')).toBeNull();
    (el as unknown as { init: () => void }).init();
    expect(el.shadowRoot?.querySelector('button, a')).toBeTruthy();
    el.remove();
  });

  it('monte un lien quand href est present', () => {
    ensureButtonRegistered();
    const el = document.createElement(withLibPrefix('button'));
    el.setAttribute('href', '/next');
    el.textContent = 'Lien';
    document.body.appendChild(el);
    const control = el.shadowRoot?.querySelector('a');
    expect(control).toBeTruthy();
    expect(control?.getAttribute('href')).toContain('/next');
    el.remove();
  });

  it('emet lib-change en mode toggle', () => {
    ensureButtonRegistered();
    const el = document.createElement(withLibPrefix('button'));
    el.setAttribute('toggle', '');
    el.textContent = 'Toggle';
    document.body.appendChild(el);
    let received = false;
    el.addEventListener('lib-change', ((evt: Event) => {
      const e = evt as CustomEvent<{ pressed: boolean }>;
      received = e.detail?.pressed === true;
    }) as EventListener);
    const control = el.shadowRoot?.querySelector('button') as HTMLButtonElement | null;
    expect(control).toBeTruthy();
    control?.click();
    expect(received).toBe(true);
    expect(el.hasAttribute('pressed')).toBe(true);
    el.remove();
  });
});
