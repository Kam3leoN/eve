import { describe, expect, it } from 'vitest';
import { registerEveElements } from '../register.js';

describe('button', () => {
  it('initialise automatiquement sans no-autoinit', () => {
    registerEveElements();
    const el = document.createElement('eve-button');
    el.textContent = 'Action';
    document.body.appendChild(el);
    const control = el.shadowRoot?.querySelector('button, a');
    expect(control).toBeTruthy();
    el.remove();
  });

  it('differe l’initialisation avec no-autoinit puis init manuel', () => {
    registerEveElements();
    const el = document.createElement('eve-button');
    el.setAttribute('no-autoinit', '');
    el.textContent = 'Action';
    document.body.appendChild(el);
    expect(el.shadowRoot?.querySelector('button, a')).toBeNull();
    (el as unknown as { init: () => void }).init();
    expect(el.shadowRoot?.querySelector('button, a')).toBeTruthy();
    el.remove();
  });
});
