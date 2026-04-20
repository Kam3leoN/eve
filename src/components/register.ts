import { withLibPrefix } from '../lib.config.js';
import { applyEveTheme, createEveTheme } from '../core/theme/index.js';
import { Button } from './button/button.js';

const registry: [string, CustomElementConstructor][] = [[withLibPrefix('button'), Button]];
const DEFAULT_THEME_SOURCE_HEX = '#6750A4';

function hasSystemColorTokens(target: HTMLElement): boolean {
  return getComputedStyle(target).getPropertyValue('--md-sys-color-primary').trim().length > 0;
}

function ensureDefaultThemeTokens(): void {
  const target = document.documentElement;
  if (hasSystemColorTokens(target)) return;

  void createEveTheme({ hex: DEFAULT_THEME_SOURCE_HEX })
    .then((theme) => {
      if (!hasSystemColorTokens(target)) {
        applyEveTheme(theme, { target, dark: false });
      }
    })
    .catch(() => {
      // No-op: the app can still provide theme tokens externally.
    });
}

/**
 * Enregistre les custom elements Eve (sans effet si déjà défini).
 */
export function registerEveElements(): void {
  ensureDefaultThemeTokens();
  for (const [tag, ctor] of registry) {
    if (!customElements.get(tag)) {
      customElements.define(tag, ctor);
    }
  }
}
