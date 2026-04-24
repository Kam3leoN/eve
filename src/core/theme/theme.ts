import {
  applyTheme,
  argbFromHex,
  Hct,
  hexFromArgb,
  SchemeExpressive,
  themeFromImage,
  themeFromSourceColor,
  type CustomColor,
  type Theme,
} from '@material/material-color-utilities';

export type { Theme as UiTheme } from '@material/material-color-utilities';

export interface ThemeFromHexOptions {
  /** Couleur source #RRGGBB */
  hex: string;
  customColors?: CustomColor[];
}

export interface ThemeFromImageOptions {
  image: HTMLImageElement;
  customColors?: CustomColor[];
}

export type ThemeSource = ThemeFromHexOptions | ThemeFromImageOptions;

function isImageSource(source: ThemeSource): source is ThemeFromImageOptions {
  return 'image' in source && source.image !== undefined;
}

/**
 * Génère un thème Material 3 Expressive (HCT) à partir d’un hex ou d’une image.
 */
export async function createTheme(source: ThemeSource): Promise<Theme> {
  if (isImageSource(source)) {
    return themeFromImage(source.image, source.customColors);
  }
  const argb = argbFromHex(source.hex);
  return Promise.resolve(themeFromSourceColor(argb, source.customColors));
}

/**
 * Applique le thème sur un élément (par défaut `:root` via `document.documentElement`).
 */
export function applyThemeTokens(
  theme: Theme,
  options?: { dark?: boolean; target?: HTMLElement },
): void {
  const target = options?.target ?? document.documentElement;
  const dark = options?.dark ?? false;
  applyTheme(theme, { dark, target });

  // Rôles Dynamic Color requis par la grille M3 boutons.
  const expressive = new SchemeExpressive(Hct.fromInt(theme.source), dark, 0);
  target.style.setProperty('--md-sys-color-surface-container-low', hexFromArgb(expressive.surfaceContainerLow));
  target.style.setProperty('--md-sys-color-surface-container', hexFromArgb(expressive.surfaceContainer));
}
