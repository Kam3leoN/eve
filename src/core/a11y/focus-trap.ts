import { getFocusableElements } from '../dom/focusable';

export interface FocusTrapOptions {
  /** Élément à activer en sortie (souvent le déclencheur). */
  returnFocusTo?: HTMLElement | null;
}

/**
 * Piège le focus (Tab / Shift+Tab) dans un conteneur (modale, drawer).
 * Retourne une fonction `release()` pour restaurer les écouteurs et le focus.
 */
export function createFocusTrap(container: HTMLElement, options: FocusTrapOptions = {}): () => void {
  const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;

  const focusFirst = () => {
    const list = getFocusableElements(container);
    if (list.length) list[0]?.focus();
  };

  const onKeydown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    const list = getFocusableElements(container);
    if (list.length === 0) return;
    const first = list[0];
    const last = list[list.length - 1];
    const active = document.activeElement;
    if (!e.shiftKey) {
      if (active === last) {
        e.preventDefault();
        first?.focus();
      }
    } else {
      if (active === first) {
        e.preventDefault();
        last?.focus();
      }
    }
  };

  container.addEventListener('keydown', onKeydown);
  queueMicrotask(() => focusFirst());

  return () => {
    container.removeEventListener('keydown', onKeydown);
    const target = options.returnFocusTo ?? previous;
    if (target?.isConnected) target.focus();
  };
}
