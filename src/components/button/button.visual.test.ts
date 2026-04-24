import { describe, expect, it } from 'vitest';
import { withLibPrefix } from '../../lib.config';
import { Button } from './button';

const VARIANTS = ['elevated', 'filled', 'tonal', 'outlined', 'text'] as const;
const SIZES = ['extra-small', 'small', 'medium', 'large', 'extra-large'] as const;
const SHAPES = ['round', 'square'] as const;

function ensureButtonRegistered(): string {
  const tag = withLibPrefix('button');
  if (!customElements.get(tag)) {
    customElements.define(tag, Button);
  }
  return tag;
}

describe('button.visual', () => {
  it('genere une matrice de classes stable pour variantes/tailles/formes/dir', () => {
    const tag = ensureButtonRegistered();
    const matrix: string[] = [];
    for (const dir of ['ltr', 'rtl'] as const) {
      for (const variant of VARIANTS) {
        for (const size of SIZES) {
          for (const shape of SHAPES) {
            const el = document.createElement(tag);
            el.setAttribute('dir', dir);
            el.setAttribute('variant', variant);
            el.setAttribute('size', size);
            el.setAttribute('shape', shape);
            el.textContent = 'Label';
            document.body.appendChild(el);
            const control = el.shadowRoot?.querySelector('.btn') as HTMLElement | null;
            matrix.push(
              `${dir}|${variant}|${size}|${shape}|${control?.className ?? 'none'}`,
            );
            el.remove();
          }
        }
      }
    }
    expect(matrix.length).toBe(2 * VARIANTS.length * SIZES.length * SHAPES.length);
    expect(matrix.every((row) => row.includes('btn--shape-'))).toBe(true);
  });
});
