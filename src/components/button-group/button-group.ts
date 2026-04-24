import { BaseComponent } from '../../core/BaseComponent';
import { withLibEvent } from '../../lib.config';
import shadowStyles from './button-group.scss?inline';

const VARIANTS = new Set(['standard', 'connected']);
const SIZES = new Set(['extra-small', 'small', 'medium', 'large', 'extra-large']);

export class ButtonGroup extends BaseComponent {
  static observedAttributes = ['variant', 'size', 'selection-mode'];

  private _root: HTMLElement | null = null;
  private _slot: HTMLSlotElement | null = null;
  private readonly _onSlotChange = () => this._syncConnectedItemClasses();
  private readonly _onChildChange = (e: Event) => this._handleChildChange(e);

  constructor() {
    super();
    const sr = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = shadowStyles;
    sr.appendChild(style);
  }

  protected onInit(): void {
    if (!this._root) this._mount();
    this.addEventListener(withLibEvent('change'), this._onChildChange);
    this._syncVariant();
    this._syncSize();
    this._syncConnectedItemClasses();
  }

  protected onDestroy(): void {
    this.removeEventListener(withLibEvent('change'), this._onChildChange);
    this._slot?.removeEventListener('slotchange', this._onSlotChange);
    this._root?.remove();
    this._root = null;
    this._slot = null;
  }

  attributeChangedCallback(_name: string, oldVal: string | null, newVal: string | null): void {
    if (oldVal === newVal || !this._root) return;
    this._syncVariant();
    this._syncSize();
    this._syncConnectedItemClasses();
  }

  private _mount(): void {
    const root = document.createElement('div');
    root.className = 'group group--standard';
    root.innerHTML = '<slot></slot>';
    this.shadowRoot!.appendChild(root);
    this._root = root;
    this._slot = root.querySelector('slot');
    this._slot?.addEventListener('slotchange', this._onSlotChange);
  }

  private _syncVariant(): void {
    if (!this._root) return;
    const raw = this.getAttribute('variant') ?? 'standard';
    const variant = VARIANTS.has(raw) ? raw : 'standard';
    const connected = variant === 'connected';
    this._root.classList.remove('group--standard', 'group--connected');
    this._root.classList.add(connected ? 'group--connected' : 'group--standard');
    this._syncSize();
    this._syncConnectedItemClasses();
  }

  private _syncSize(): void {
    if (!this._root) return;
    const raw = this.getAttribute('size') ?? 'small';
    const size = SIZES.has(raw) ? raw : 'small';
    this._root.classList.remove('group--xs', 'group--sm', 'group--md', 'group--lg', 'group--xl');
    if (size === 'extra-small') this._root.classList.add('group--xs');
    else if (size === 'medium') this._root.classList.add('group--md');
    else if (size === 'large') this._root.classList.add('group--lg');
    else if (size === 'extra-large') this._root.classList.add('group--xl');
    else this._root.classList.add('group--sm');
  }

  private _syncConnectedItemClasses(): void {
    if (!this._slot) return;
    const items = this._slot.assignedElements({ flatten: true });
    const groupSize = this.getAttribute('size');
    const connected = this._root?.classList.contains('group--connected') ?? false;
    for (const [idx, item] of items.entries()) {
      item.classList.remove('lib-group-item', 'lib-group-item--first', 'lib-group-item--middle', 'lib-group-item--last');
      item.removeAttribute('data-group-position');
      if (connected) {
        item.classList.add('lib-group-item');
        if (idx === 0) item.classList.add('lib-group-item--first');
        else if (idx === items.length - 1) item.classList.add('lib-group-item--last');
        else item.classList.add('lib-group-item--middle');

        if (idx === 0) item.setAttribute('data-group-position', 'first');
        else if (idx === items.length - 1) item.setAttribute('data-group-position', 'last');
        else item.setAttribute('data-group-position', 'middle');

        // M3E: le groupe connecté applique une taille cohérente à tous les enfants.
        if (groupSize && !item.hasAttribute('size')) {
          item.setAttribute('size', groupSize);
        }

        // M3E connected: géométrie de base carrée pour respecter les coins internes.
        if (!item.hasAttribute('shape')) {
          item.setAttribute('shape', 'square');
          item.setAttribute('data-group-shape', 'auto');
        }
        // Connected group: rendre l'état sélectionnable visible (M3E),
        // sans écraser une configuration explicite du consommateur.
        if (!item.hasAttribute('toggle') && !item.hasAttribute('href')) {
          item.setAttribute('toggle', '');
          item.setAttribute('data-group-toggle', 'auto');
        }
      } else {
        if (item.getAttribute('data-group-shape') === 'auto') {
          item.removeAttribute('shape');
          item.removeAttribute('data-group-shape');
        }
        if (item.getAttribute('data-group-toggle') === 'auto') {
          item.removeAttribute('toggle');
          item.removeAttribute('data-group-toggle');
        }
      }
    }
  }

  private _handleChildChange(e: Event): void {
    if (!this._slot) return;
    const target = e.target as HTMLElement | null;
    if (!target) return;
    const mode = this._resolveSelectionMode();
    if (mode === 'one-select' && (target.hasAttribute('pressed') || target.getAttribute('aria-pressed') === 'true')) {
      const items = this._slot.assignedElements({ flatten: true });
      for (const item of items) {
        if (item === target) continue;
        if (item.hasAttribute('pressed')) item.removeAttribute('pressed');
      }
    }
    this._syncConnectedItemClasses();
  }

  private _resolveSelectionMode(): 'one-select' | 'multi-select' {
    const explicit = this.getAttribute('selection-mode');
    if (explicit === 'one-select' || explicit === 'multi-select') return explicit;
    return 'multi-select';
  }
}
