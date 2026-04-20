/**
 * Options de l'effet Ripple.
 */
export interface RippleOptions {
  centered?: boolean;
  durationMs?: number;
}

const RIPPLE_CLASS = 'eve-ripple';
const RIPPLE_ACTIVE_CLASS = 'eve-ripple--active';

/**
 * Effet d'ondulation Material pour éléments interactifs.
 */
export class Ripple {
  private readonly host: HTMLElement;
  private readonly options: Required<RippleOptions>;
  private onPointerDown: (ev: PointerEvent) => void;

  /**
   * Crée une instance Ripple attachée à un hôte.
   */
  constructor(host: HTMLElement, options?: RippleOptions) {
    this.host = host;
    this.options = {
      centered: options?.centered ?? false,
      durationMs: options?.durationMs ?? 450,
    };
    this.onPointerDown = (ev) => this.spawn(ev);
  }

  /**
   * Active les écouteurs de l'effet ripple.
   */
  init(): void {
    this.host.style.position ||= 'relative';
    this.host.style.overflow ||= 'hidden';
    this.host.addEventListener('pointerdown', this.onPointerDown);
  }

  /**
   * Désactive l'effet ripple et nettoie les nœuds temporaires.
   */
  destroy(): void {
    this.host.removeEventListener('pointerdown', this.onPointerDown);
    this.host.querySelectorAll(`.${RIPPLE_CLASS}`).forEach((n) => n.remove());
  }

  /**
   * Génère un ripple à partir du point d'interaction.
   */
  private spawn(ev: PointerEvent): void {
    const rect = this.host.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.5;
    const ripple = document.createElement('span');
    ripple.className = RIPPLE_CLASS;
    ripple.style.position = 'absolute';
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.borderRadius = '9999px';
    ripple.style.pointerEvents = 'none';
    ripple.style.backgroundColor = 'currentColor';
    ripple.style.opacity = '0.16';
    ripple.style.transform = 'scale(0)';
    ripple.style.transition = `transform ${this.options.durationMs}ms ease, opacity ${this.options.durationMs}ms ease`;
    const x = this.options.centered ? rect.width / 2 : ev.clientX - rect.left;
    const y = this.options.centered ? rect.height / 2 : ev.clientY - rect.top;
    ripple.style.left = `${x - size / 2}px`;
    ripple.style.top = `${y - size / 2}px`;
    this.host.appendChild(ripple);
    requestAnimationFrame(() => {
      ripple.classList.add(RIPPLE_ACTIVE_CLASS);
      ripple.style.transform = 'scale(1)';
      ripple.style.opacity = '0';
    });
    window.setTimeout(() => ripple.remove(), this.options.durationMs + 80);
  }
}
