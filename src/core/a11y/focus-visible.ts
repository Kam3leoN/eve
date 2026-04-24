import { withLibClass } from '../../lib.config';

const CLASS = withLibClass('focus-visible');

let refcount = 0;
let removeListeners: (() => void) | null = null;

/**
 * Active un mode « focus visible » principalement au clavier.
 * Ajoute une classe `<prefix>-focus-visible` sur `:root` lorsque la navigation est clavier.
 */
export function initFocusVisible(root: HTMLElement = document.documentElement): () => void {
  refcount += 1;
  if (refcount === 1) {
    let keyboard = false;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.altKey || e.ctrlKey) return;
      if (e.key === 'Tab' || e.key.startsWith('Arrow')) {
        keyboard = true;
        root.classList.add(CLASS);
      }
    };

    const onPointerDown = () => {
      keyboard = false;
      root.classList.remove(CLASS);
    };

    const onFocusIn = () => {
      if (keyboard) root.classList.add(CLASS);
    };

    document.addEventListener('keydown', onKeyDown, true);
    document.addEventListener('pointerdown', onPointerDown, true);
    document.addEventListener('focusin', onFocusIn, true);

    removeListeners = () => {
      document.removeEventListener('keydown', onKeyDown, true);
      document.removeEventListener('pointerdown', onPointerDown, true);
      document.removeEventListener('focusin', onFocusIn, true);
    };
  }

  return () => {
    refcount -= 1;
    if (refcount === 0) {
      removeListeners?.();
      removeListeners = null;
      root.classList.remove(CLASS);
    }
  };
}
