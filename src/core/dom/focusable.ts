/**
 * Sélecteur minimal pour les éléments pouvant recevoir le focus (Tab).
 * Utilisé par FocusTrap et tests — centralisé pour éviter la duplication.
 */
export const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/**
 * Retourne les éléments focusables visibles dans le conteneur.
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => !el.hasAttribute('hidden') && el.closest('[hidden],[inert]') === null,
  );
}
