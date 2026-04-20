import { EVE_ICONS, EVE_ICON_PREFIX } from './constants.js';

const SPRITE_ID = `${EVE_ICON_PREFIX}-sprite`;

/** Chemins SVG 24×24 (Material Symbols Outlined, simplifiés). */
const SYMBOLS: Record<string, string> = {
  [EVE_ICONS.check]:
    '<path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>',
  [EVE_ICONS.close]:
    '<path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>',
  [EVE_ICONS.menu]:
    '<path fill="currentColor" d="M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"/>',
  [EVE_ICONS.chevronRight]:
    '<path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>',
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
 * Les `<use href="#eve-icon-...">` du même arbre résolvent ce fragment.
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
