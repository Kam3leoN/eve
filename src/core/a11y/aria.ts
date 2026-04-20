/**
 * Helpers ARIA centralisés (pas d'accès direct aux attributs dans les composants).
 */

export type AriaAttributeMap = Partial<
  Record<
    | 'aria-label'
    | 'aria-labelledby'
    | 'aria-describedby'
    | 'aria-expanded'
    | 'aria-controls'
    | 'aria-haspopup'
    | 'aria-pressed'
    | 'aria-busy'
    | 'aria-disabled'
    | 'aria-hidden'
    | 'aria-modal'
    | 'role',
    string | boolean | undefined
  >
>;

/**
 * Applique ou retire des attributs ARIA sur un élément.
 * Les valeurs `undefined` retirent l'attribut.
 */
export function setAriaProps(el: Element, props: AriaAttributeMap): void {
  for (const [key, value] of Object.entries(props)) {
    if (value === undefined) {
      el.removeAttribute(key);
      continue;
    }
    if (typeof value === 'boolean') {
      if (value) el.setAttribute(key, 'true');
      else el.removeAttribute(key);
      continue;
    }
    el.setAttribute(key, value);
  }
}
