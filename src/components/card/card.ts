import { BaseComponent } from '../../core/BaseComponent';
import shadowStyles from './card.scss?inline';

const VARIANTS = new Set(['elevated', 'filled', 'outlined']);
const ORIENTATIONS = new Set(['vertical', 'horizontal']);
const LAYOUTS = new Set(['default', 'vertical-list', 'mosaic', 'staggered']);

export class Card extends BaseComponent {
  static observedAttributes = [
    'variant',
    'orientation',
    'layout',
    'interactive',
    'href',
    'expandable',
    'expanded',
    'swipe',
    'pickup-move',
    'media-first',
    'media-bleed',
  ];

  private _root: HTMLElement | null = null;
  private _surface: HTMLElement | null = null;
  private _slots: HTMLSlotElement[] = [];
  private _pointerStart: { x: number; y: number } | null = null;

  private readonly _onClick = (event: Event) => this._handleClick(event);
  private readonly _onKeyDown = (event: KeyboardEvent) => this._handleKeyDown(event);
  private readonly _onPointerDown = (event: PointerEvent) => this._handlePointerDown(event);
  private readonly _onPointerUp = (event: PointerEvent) => this._handlePointerUp(event);
  private readonly _onDragStart = (event: DragEvent) => this._handleDragStart(event);
  private readonly _onSlotChange = () => this._syncSlotsState();

  constructor() {
    super();
    const sr = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = shadowStyles;
    sr.appendChild(style);
  }

  protected onInit(): void {
    if (!this._root) this._mount();
    this._bindEvents();
    this._syncAll();
  }

  protected onDestroy(): void {
    this._unbindEvents();
    this._root?.remove();
    this._root = null;
    this._surface = null;
    this._slots = [];
    this._pointerStart = null;
  }

  attributeChangedCallback(_name: string, oldVal: string | null, newVal: string | null): void {
    if (oldVal === newVal || !this._root) return;
    this._syncAll();
  }

  private _mount(): void {
    const root = document.createElement('article');
    root.className = 'card';
    root.innerHTML = `
      <div class="card__surface" part="surface">
        <header class="card__header">
          <div class="card__heading-stack">
            <slot class="card__overline" name="overline"></slot>
            <slot class="card__headline" name="headline"></slot>
            <slot class="card__subhead" name="subhead"></slot>
          </div>
          <div class="card__menu"><slot class="card__menu-slot" name="menu"></slot></div>
        </header>
        <slot class="card__media" name="media"></slot>
        <slot class="card__supporting" name="supporting"></slot>
        <slot class="card__content"></slot>
        <slot class="card__list" name="list"></slot>
        <footer class="card__footer">
          <div class="card__actions"><slot class="card__actions-slot" name="actions"></slot></div>
        </footer>
      </div>
    `;
    this.shadowRoot!.appendChild(root);
    this._root = root;
    this._surface = root.querySelector('.card__surface');
    this._slots = Array.from(root.querySelectorAll('slot'));
  }

  private _syncAll(): void {
    this._syncVariant();
    this._syncOrientation();
    this._syncLayout();
    this._syncInteractive();
    this._syncExpandable();
    this._syncPickupMove();
    this._syncMediaFlow();
    this._syncMediaBleed();
    this._syncSlotsState();
  }

  private _syncVariant(): void {
    if (!this._root) return;
    const raw = this.getAttribute('variant') ?? 'filled';
    const variant = VARIANTS.has(raw) ? raw : 'filled';
    this._root.classList.remove('card--elevated', 'card--filled', 'card--outlined');
    this._root.classList.add(`card--${variant}`);
  }

  private _syncOrientation(): void {
    if (!this._root) return;
    const raw = this.getAttribute('orientation') ?? 'vertical';
    const orientation = ORIENTATIONS.has(raw) ? raw : 'vertical';
    this._root.classList.remove('card--vertical', 'card--horizontal');
    this._root.classList.add(`card--${orientation}`);
  }

  private _syncLayout(): void {
    if (!this._root) return;
    const raw = this.getAttribute('layout') ?? 'default';
    const layout = LAYOUTS.has(raw) ? raw : 'default';
    this._root.classList.remove(
      'card--layout-default',
      'card--layout-vertical-list',
      'card--layout-mosaic',
      'card--layout-staggered'
    );
    this._root.classList.add(`card--layout-${layout}`);
  }

  private _syncInteractive(): void {
    if (!this._root || !this._surface) return;
    const interactive = this.hasAttribute('interactive') || this.hasAttribute('href') || this.hasAttribute('expandable');
    this._root.classList.toggle('card--interactive', interactive);
    this._surface.toggleAttribute('tabindex', interactive);
    if (interactive) {
      this._surface.setAttribute('tabindex', '0');
      this._surface.setAttribute('role', 'button');
    } else {
      this._surface.removeAttribute('tabindex');
      this._surface.removeAttribute('role');
    }
    const href = this.getAttribute('href');
    if (href && href.trim().length > 0) this._surface.setAttribute('data-href', href);
    else this._surface.removeAttribute('data-href');
    this._root.classList.toggle('card--swipe', this.hasAttribute('swipe'));
  }

  private _syncExpandable(): void {
    if (!this._root) return;
    const expandable = this.hasAttribute('expandable');
    const expanded = expandable && this.hasAttribute('expanded');
    this._root.classList.toggle('card--expandable', expandable);
    this._root.classList.toggle('card--expanded', expanded);
    if (expandable) this.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    else this.removeAttribute('aria-expanded');
  }

  private _syncPickupMove(): void {
    if (!this._surface || !this._root) return;
    const pickupMove = this.hasAttribute('pickup-move');
    this._surface.draggable = pickupMove;
    this._root.classList.toggle('card--pickup-move', pickupMove);
  }

  private _syncMediaFlow(): void {
    if (!this._root) return;
    this._root.classList.toggle('card--media-first', this.hasAttribute('media-first'));
  }

  private _syncMediaBleed(): void {
    if (!this._root) return;
    this._root.classList.toggle('card--media-bleed', this.hasAttribute('media-bleed'));
  }

  private _syncSlotsState(): void {
    if (!this._root || !this.shadowRoot) return;
    const slots = this.shadowRoot.querySelectorAll('slot');
    slots.forEach((slotEl) => {
      const assigned = (slotEl as HTMLSlotElement).assignedElements({ flatten: true });
      const hasContent = assigned.length > 0;
      slotEl.classList.toggle('is-empty', !hasContent);
    });
  }

  private _bindEvents(): void {
    this._surface?.addEventListener('click', this._onClick);
    this._surface?.addEventListener('keydown', this._onKeyDown);
    this._surface?.addEventListener('pointerdown', this._onPointerDown);
    this._surface?.addEventListener('pointerup', this._onPointerUp);
    this._surface?.addEventListener('dragstart', this._onDragStart);
    this._slots.forEach((slotEl) => slotEl.addEventListener('slotchange', this._onSlotChange));
  }

  private _unbindEvents(): void {
    this._surface?.removeEventListener('click', this._onClick);
    this._surface?.removeEventListener('keydown', this._onKeyDown);
    this._surface?.removeEventListener('pointerdown', this._onPointerDown);
    this._surface?.removeEventListener('pointerup', this._onPointerUp);
    this._surface?.removeEventListener('dragstart', this._onDragStart);
    this._slots.forEach((slotEl) => slotEl.removeEventListener('slotchange', this._onSlotChange));
  }

  private _handleClick(event: Event): void {
    if (!(event.target instanceof HTMLElement)) return;
    if (event.target.closest('[slot="actions"], [slot="menu"]')) return;

    if (this.hasAttribute('expandable')) {
      this.toggleExpanded();
      return;
    }

    const href = this.getAttribute('href');
    if (href && href.trim()) {
      window.location.assign(href);
      return;
    }

    if (this.hasAttribute('interactive')) {
      this.dispatchEvent(
        new CustomEvent('lib-card-activate', {
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  private _handleKeyDown(event: KeyboardEvent): void {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    this._handleClick(event);
  }

  private _handlePointerDown(event: PointerEvent): void {
    if (!this.hasAttribute('swipe')) return;
    this._pointerStart = { x: event.clientX, y: event.clientY };
  }

  private _handlePointerUp(event: PointerEvent): void {
    if (!this.hasAttribute('swipe') || !this._pointerStart) return;
    const deltaX = event.clientX - this._pointerStart.x;
    const deltaY = event.clientY - this._pointerStart.y;
    this._pointerStart = null;

    if (Math.abs(deltaX) < 56 || Math.abs(deltaX) < Math.abs(deltaY)) return;
    const direction = deltaX > 0 ? 'right' : 'left';
    this.dispatchEvent(
      new CustomEvent('lib-card-swipe', {
        bubbles: true,
        composed: true,
        detail: { direction },
      })
    );
  }

  private _handleDragStart(event: DragEvent): void {
    if (!this.hasAttribute('pickup-move')) {
      event.preventDefault();
      return;
    }
    event.dataTransfer?.setData('text/plain', this.id || this.getAttribute('data-key') || '');
    this.dispatchEvent(
      new CustomEvent('lib-card-pickup', {
        bubbles: true,
        composed: true,
      })
    );
  }

  public expand(): void {
    if (!this.hasAttribute('expandable')) this.setAttribute('expandable', '');
    this.setAttribute('expanded', '');
    this._syncExpandable();
  }

  public collapse(): void {
    this.removeAttribute('expanded');
    this._syncExpandable();
  }

  public toggleExpanded(force?: boolean): void {
    const next = typeof force === 'boolean' ? force : !this.hasAttribute('expanded');
    if (next) this.expand();
    else this.collapse();
    this.dispatchEvent(
      new CustomEvent('lib-card-expand', {
        bubbles: true,
        composed: true,
        detail: { expanded: next },
      })
    );
  }

  public static filter(collection: Iterable<Card>, predicate: (card: Card) => boolean): Card[] {
    const cards = Array.from(collection);
    for (const card of cards) {
      const visible = predicate(card);
      card.hidden = !visible;
    }
    return cards.filter((card) => !card.hidden);
  }

  public static sort(container: Element, compareFn: (a: Card, b: Card) => number): Card[] {
    const cards = Array.from(container.querySelectorAll<Card>('lib-card'));
    cards.sort(compareFn);
    cards.forEach((card) => container.appendChild(card));
    return cards;
  }
}
