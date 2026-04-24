import { ICONS, ICON_PREFIX } from './constants';

const SPRITE_ID = `${ICON_PREFIX}-sprite`;

/** Chemins SVG 24×24 (Material Symbols Outlined, simplifiés). */
const SYMBOLS: Record<string, string> = {
  [ICONS.check]:
    '<path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>',
  [ICONS.close]:
    '<path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>',
  [ICONS.menu]:
    '<path fill="currentColor" d="M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"/>',
  [ICONS.chevronRight]:
    '<path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>',
  [ICONS.visibility]:
    '<path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>',
  [ICONS.visibilityOff]:
    '<path fill="currentColor" d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.45.45C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.42-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2z"/>',
  [ICONS.refresh]:
    '<path fill="currentColor" d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08a5.99 5.99 0 0 1-5.65 3.3c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>',
};

function buildSvg(ownerDocument: Document): SVGSVGElement {
  const wrapper = ownerDocument.createElement('div');
  const symbols = Object.entries(SYMBOLS)
    .map(
      ([id, path]) =>
        `<symbol id="${id}" viewBox="0 0 24 24">${path}</symbol>`,
    )
    .join('');
  wrapper.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" id="${SPRITE_ID}" aria-hidden="true" width="0" height="0" style="position:absolute;overflow:hidden;clip:rect(0 0 0 0)"><defs>${symbols}</defs></svg>`;
  return wrapper.firstElementChild as SVGSVGElement;
}

/**
 * Injecte le sprite une seule fois dans le scope (document.body ou ShadowRoot).
 * Les `<use href="#<prefix>-icon-...">` du même arbre résolvent ce fragment.
 */
export function ensureIconSprite(scope: ParentNode = document.body): void {
  const mount =
    scope instanceof Document ? scope.body : (scope as DocumentFragment);
  const doc = mount.ownerDocument ?? document;
  if (mount.querySelector(`#${SPRITE_ID}`)) return;
  mount.appendChild(buildSvg(doc));
}

/**
 * Référence locale pour `<use href="...">`.
 */
export function iconHref(iconId: string): string {
  return `#${iconId}`;
}
