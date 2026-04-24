import { withLibPrefix } from '../lib.config';
import { applyThemeTokens, createTheme } from '../core/theme';
import { Button } from './button/button';
import { ButtonIcon } from './button-icon/button-icon';
import { ButtonSplit } from './button-split/button-split';
import { ButtonGroup } from './button-group/button-group';
import { Card } from './card/card';
import { NavigationCard } from './navigation-card/navigation-card';
import { Shape } from './shape/shape';
import { LoadingIndicator } from './loading-indicator/loading-indicator';
import { TextField } from './text-field/text-field';

const registry: [string, CustomElementConstructor][] = [
  [withLibPrefix('button'), Button],
  [withLibPrefix('button-icon'), ButtonIcon],
  [withLibPrefix('button-split'), ButtonSplit],
  [withLibPrefix('button-group'), ButtonGroup],
  [withLibPrefix('card'), Card],
  [withLibPrefix('navigation-card'), NavigationCard],
  [withLibPrefix('shape'), Shape],
  [withLibPrefix('loading-indicator'), LoadingIndicator],
  [withLibPrefix('text-field'), TextField],
];
const DEFAULT_THEME_SOURCE_HEX = '#6750A4';

function hasSystemColorTokens(target: HTMLElement): boolean {
  return getComputedStyle(target).getPropertyValue('--md-sys-color-primary').trim().length > 0;
}

function ensureDefaultThemeTokens(): void {
  const target = document.documentElement;
  if (hasSystemColorTokens(target)) return;

  void createTheme({ hex: DEFAULT_THEME_SOURCE_HEX })
    .then((theme) => {
      if (!hasSystemColorTokens(target)) {
        applyThemeTokens(theme, { target, dark: false });
      }
    })
    .catch(() => {
      // No-op: the app can still provide theme tokens externally.
    });
}

/**
 * Enregistre les custom elements de la lib (sans effet si déjà défini).
 */
export function registerElements(): void {
  ensureDefaultThemeTokens();
  for (const [tag, ctor] of registry) {
    if (!customElements.get(tag)) {
      customElements.define(tag, ctor);
    }
  }
}
