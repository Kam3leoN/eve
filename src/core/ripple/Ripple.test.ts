import { describe, expect, it } from 'vitest';
import { withLibClass } from '../../lib.config';
import { Ripple } from './Ripple';

describe('Ripple', () => {
  it('injecte un ripple sur pointerdown', async () => {
    const host = document.createElement('button');
    document.body.appendChild(host);
    const ripple = new Ripple(host);
    ripple.init();
    const event = new Event('pointerdown', { bubbles: true }) as Event & {
      clientX: number;
      clientY: number;
    };
    event.clientX = 10;
    event.clientY = 10;
    host.dispatchEvent(event);
    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(host.querySelector(`.${withLibClass('ripple')}`)).toBeTruthy();
    ripple.destroy();
    host.remove();
  });
});
