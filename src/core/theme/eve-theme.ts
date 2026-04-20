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

export type { Theme as EveTheme } from '@material/material-color-utilities';

export interface EveThemeFromHexOptions {
  /** Couleur source #RRGGBB */
  hex: string;
  customColors?: CustomColor[];
}

export interface EveThemeFromImageOptions {
  image: HTMLImageElement;
  customColors?: CustomColor[];
}

export type EveThemeSource = EveThemeFromHexOptions | EveThemeFromImageOptions;

function isImageSource(s: EveThemeSource): s is EveThemeFromImageOptions {
  return 'image' in s && s.image !== undefined;
}

/**
 * Génère un thème **Material 3 Expressive** (HCT) à partir d’un hex ou d’une image (couleur dominante Google).
 */
export async function createEveTheme(source: EveThemeSource): Promise<Theme> {
  if (isImageSource(source)) {
    return themeFromImage(source.image, source.customColors);
  }
  const argb = argbFromHex(source.hex);
  return Promise.resolve(themeFromSourceColor(argb, source.customColors));
}

/**
 * Applique le thème sur un élément (par défaut `:root` via `document.documentElement`).
 * Définit les variables `--md-sys-color-*` pour une lecture **Expressive** (voir Material Color Utilities).
 */
export function applyEveTheme(
  theme: Theme,
  options?: { dark?: boolean; target?: HTMLElement },
): void {
  const target = options?.target ?? document.documentElement;
  const dark = options?.dark ?? false;
  applyTheme(theme, {
    dark,
    target,
  });
  /** Rôles « surface container » (Dynamic Color) — requis par la grille M3 boutons (elevated / filled toggle off). */
  const expressive = new SchemeExpressive(Hct.fromInt(theme.source), dark, 0);
  target.style.setProperty(
    '--md-sys-color-surface-container-low',
    hexFromArgb(expressive.surfaceContainerLow),
  );
  target.style.setProperty(
    '--md-sys-color-surface-container',
    hexFromArgb(expressive.surfaceContainer),
  );
}
