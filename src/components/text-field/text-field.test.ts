import { describe, expect, it } from 'vitest';
import { withLibPrefix } from '../../lib.config';
import { TextField } from './text-field';

function ensureRegistered(): string {
  const tag = withLibPrefix('text-field');
  if (!customElements.get(tag)) {
    customElements.define(tag, TextField);
  }
  return tag;
}

describe('text-field', () => {
  it('initialise automatiquement et monte un input natif', () => {
    const tag = ensureRegistered();
    const el = document.createElement(tag);
    el.setAttribute('label', 'Nom');
    document.body.appendChild(el);
    expect(el.shadowRoot?.querySelector('input')).toBeTruthy();
    el.remove();
  });

  it('supporte no-autoinit puis init manuel', () => {
    const tag = ensureRegistered();
    const el = document.createElement(tag) as HTMLElement & { init: () => void };
    el.setAttribute('no-autoinit', '');
    document.body.appendChild(el);
    expect(el.shadowRoot?.querySelector('input')).toBeNull();
    el.init();
    expect(el.shadowRoot?.querySelector('input')).toBeTruthy();
    el.remove();
  });

  it('applique la variante par défaut et la variante outlined', () => {
    const tag = ensureRegistered();
    const el = document.createElement(tag);
    document.body.appendChild(el);
    const field = el.shadowRoot?.querySelector('.tf__field') as HTMLElement;
    expect(field.classList.contains('tf__field--filled')).toBe(true);
    el.setAttribute('variant', 'outlined');
    expect(field.classList.contains('tf__field--outlined')).toBe(true);
    el.remove();
  });

  it('synchronise la value et met à jour le compteur maxlength', () => {
    const tag = ensureRegistered();
    const el = document.createElement(tag) as HTMLElement & { value: string };
    el.setAttribute('maxlength', '10');
    document.body.appendChild(el);
    el.value = 'abc';
    const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('abc');
    const counter = el.shadowRoot?.querySelector('.tf__counter') as HTMLElement;
    expect(counter.textContent).toBe('3/10');
    el.remove();
  });

  it('affiche error-text en état error', () => {
    const tag = ensureRegistered();
    const el = document.createElement(tag);
    el.setAttribute('error', '');
    el.setAttribute('error-text', 'Erreur');
    document.body.appendChild(el);
    const support = el.shadowRoot?.querySelector('.tf__support-text') as HTMLElement;
    expect(support.textContent).toBe('Erreur');
    const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;
    expect(input.getAttribute('aria-invalid')).toBe('true');
    el.remove();
  });

  it('propage disabled et readonly vers l’input', () => {
    const tag = ensureRegistered();
    const el = document.createElement(tag);
    el.setAttribute('disabled', '');
    el.setAttribute('readonly', '');
    document.body.appendChild(el);
    const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;
    expect(input.disabled).toBe(true);
    expect(input.readOnly).toBe(true);
    el.remove();
  });

  it('expose les méthodes checkValidity/reportValidity/setCustomValidity', () => {
    const tag = ensureRegistered();
    const el = document.createElement(tag) as HTMLElement & {
      checkValidity: () => boolean;
      reportValidity: () => boolean;
      setCustomValidity: (msg: string) => void;
    };
    el.setAttribute('required', '');
    document.body.appendChild(el);
    expect(el.checkValidity()).toBe(false);
    el.setCustomValidity('Erreur custom');
    expect(el.reportValidity()).toBe(false);
    el.setCustomValidity('');
    const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;
    input.value = 'ok';
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    expect(el.checkValidity()).toBe(true);
    el.remove();
  });

  it('affiche les contrôles mot de passe avec password-toggle / password-generate', () => {
    const tag = ensureRegistered();
    const el = document.createElement(tag);
    el.setAttribute('type', 'password');
    el.setAttribute('password-toggle', '');
    el.setAttribute('password-generate', '');
    document.body.appendChild(el);
    const toggle = el.shadowRoot?.querySelector('.tf__password-toggle') as HTMLButtonElement;
    const gen = el.shadowRoot?.querySelector('.tf__password-generate') as HTMLButtonElement;
    expect(toggle).toBeTruthy();
    expect(gen).toBeTruthy();
    expect(toggle.hidden).toBe(false);
    expect(gen.hidden).toBe(false);
    el.remove();
  });

  it('applique text-align left/right sur l’input natif', () => {
    const tag = ensureRegistered();
    const el = document.createElement(tag);
    document.body.appendChild(el);
    const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;
    expect(input.style.textAlign).toBe('');

    el.setAttribute('text-align', 'right');
    expect(input.style.textAlign).toBe('right');

    el.setAttribute('text-align', 'left');
    expect(input.style.textAlign).toBe('left');

    el.setAttribute('text-align', 'foo');
    expect(input.style.textAlign).toBe('');
    el.remove();
  });
});
