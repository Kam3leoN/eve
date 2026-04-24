import { describe, expect, it } from 'vitest';
import { BaseComponent } from './BaseComponent';

class DemoBaseComponent extends BaseComponent {
  initCount = 0;
  destroyCount = 0;

  protected onInit(): void {
    this.initCount += 1;
  }

  protected onDestroy(): void {
    this.destroyCount += 1;
  }
}

const TAG = 'x-base-component-spec';
if (!customElements.get(TAG)) customElements.define(TAG, DemoBaseComponent);

describe('BaseComponent', () => {
  it('auto-init sans no-autoinit', () => {
    const el = document.createElement(TAG) as DemoBaseComponent;
    document.body.appendChild(el);
    expect(el.initialized).toBe(true);
    expect(el.initCount).toBe(1);
    el.remove();
  });

  it('init manuel avec no-autoinit', () => {
    const el = document.createElement(TAG) as DemoBaseComponent;
    el.setAttribute('no-autoinit', '');
    document.body.appendChild(el);
    expect(el.initialized).toBe(false);
    el.init();
    expect(el.initialized).toBe(true);
    expect(el.initCount).toBe(1);
    el.remove();
  });
});
