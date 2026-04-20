/**
 * Priorité ARIA Live de l'annonce.
 */
export type AnnouncePoliteness = 'polite' | 'assertive';

let liveRegion: HTMLElement | null = null;

/**
 * Garantit l'existence d'une région ARIA live unique.
 */
function ensureLiveRegion(): HTMLElement {
  if (liveRegion) return liveRegion;
  const node = document.createElement('div');
  node.setAttribute('aria-live', 'polite');
  node.setAttribute('aria-atomic', 'true');
  node.style.position = 'absolute';
  node.style.width = '1px';
  node.style.height = '1px';
  node.style.overflow = 'hidden';
  node.style.clip = 'rect(0 0 0 0)';
  node.style.whiteSpace = 'nowrap';
  node.style.clipPath = 'inset(50%)';
  document.body.appendChild(node);
  liveRegion = node;
  return node;
}

/**
 * Utilitaire d'annonces lecteurs d'écran.
 */
export class Announcer {
  /**
   * Publie une annonce ARIA live.
   */
  static announce(message: string, politeness: AnnouncePoliteness = 'polite'): void {
    const region = ensureLiveRegion();
    region.setAttribute('aria-live', politeness);
    region.textContent = '';
    window.setTimeout(() => {
      region.textContent = message;
    }, 16);
  }

  /**
   * Nettoie la région d'annonce globale.
   */
  static destroy(): void {
    liveRegion?.remove();
    liveRegion = null;
  }
}
