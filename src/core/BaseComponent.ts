/**
 * Classe de base des composants custom elements Eve.
 *
 * Gère:
 * - cycle de vie unifié (`init` / `destroy`)
 * - mode `no-autoinit` pour différer l'initialisation
 * - idempotence de l'initialisation
 */
export abstract class BaseComponent extends HTMLElement {
  private _initialized = false;

  /**
   * Indique si le composant est déjà initialisé.
   */
  get initialized(): boolean {
    return this._initialized;
  }

  /**
   * Initialisation automatique si `no-autoinit` est absent.
   */
  connectedCallback(): void {
    if (!this.hasAttribute('no-autoinit')) {
      this.init();
    }
  }

  /**
   * Destruction au détachement DOM.
   */
  disconnectedCallback(): void {
    this.destroy();
  }

  /**
   * Lance l'initialisation manuelle/système.
   */
  init(): void {
    if (this._initialized) return;
    this.onInit();
    this._initialized = true;
  }

  /**
   * Détruit le composant et son état interne.
   */
  destroy(): void {
    if (!this._initialized) return;
    this.onDestroy();
    this._initialized = false;
  }

  /**
   * Hook d'initialisation implémenté par le composant concret.
   */
  protected abstract onInit(): void;

  /**
   * Hook de destruction implémenté par le composant concret.
   */
  protected abstract onDestroy(): void;
}
