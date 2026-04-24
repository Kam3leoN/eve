import { BaseComponent } from '../../core/BaseComponent';
import { withLibEvent } from '../../lib.config';
import { setAriaProps } from '../../core/a11y/aria';
import { ICONS, type IconId } from '../../core/icons/constants';
import { ensureIconSprite, iconHref } from '../../core/icons/sprite';
import shadowStyles from './button.scss?inline';

/** Types de boutons « common » M3 Expressive. @see https://m3.material.io/components/buttons */
const VARIANTS = new Set(['elevated', 'filled', 'tonal', 'outlined', 'text']);

const SIZES = new Set(['extra-small', 'small', 'medium', 'large', 'extra-large']);

const SHAPES = new Set(['round', 'square']);

/** Attributs `icon-*` (kebab-case) → id de symbole. */
const ICON_ATTR_MAP: Record<string, IconId> = {
  check: ICONS.check,
  close: ICONS.close,
  menu: ICONS.menu,
  'chevron-right': ICONS.chevronRight,
};

/**
 * Bouton Material 3 Expressive (common buttons) : elevated, filled, tonal, outlined, text.
 *
 * Slots : `leading`, défaut (libellé), `trailing`. Attributs `icon-leading` / `icon-trailing` pour le sprite.
 * Forme : défaut **round** (pilule, M3 Expressive) ; `shape="square"` = row B. `shape-toggle-swap` : avec toggle, **on** inverse la géométrie (square↔pilule).
 * **RTL** : `dir="rtl"` | `dir="ltr"` (optionnel) — propagé sur le contrôle ; padding/gap logiques ; chevron retourné en RTL.
 * @see https://m3.material.io/components/buttons
 * @see https://material-web.dev/components/button/
 */
export class Button extends BaseComponent {
  static observedAttributes = [
    'variant',
    'size',
    'disabled',
    'soft-disabled',
    'type',
    'href',
    'target',
    'icon-leading',
    'icon-trailing',
    'aria-label',
    'name',
    'value',
    'form',
    'toggle',
    'pressed',
    'shape',
    'shape-toggle-swap',
    'dir',
  ];

  private _control: HTMLButtonElement | HTMLAnchorElement | null = null;
  private _leadingSlot: HTMLSlotElement | null = null;
  private _trailingSlot: HTMLSlotElement | null = null;

  private readonly _slotChange = () => this._syncIcons();

  private readonly _onClickCapture = (e: Event) => {
    if (this.hasAttribute('disabled') || this.hasAttribute('soft-disabled')) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  };

  /** Bascule `pressed` si `toggle` est actif (bouton seulement, pas lien / submit / reset). */
  private readonly _onToggleClick = () => {
    if (!this.hasAttribute('toggle')) return;
    if (this.hasAttribute('disabled') || this.hasAttribute('soft-disabled')) return;
    if (this.getAttribute('href')) return;
    const c = this._control;
    if (!(c instanceof HTMLButtonElement)) return;
    const t = c.type;
    if (t === 'submit' || t === 'reset') return;
    const next = !this.hasAttribute('pressed');
    if (next) this.setAttribute('pressed', '');
    else this.removeAttribute('pressed');
    this.dispatchEvent(
      new CustomEvent(withLibEvent('change'), {
        bubbles: true,
        composed: true,
        detail: { pressed: next },
      }),
    );
  };

  constructor() {
    super();
    const sr = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = shadowStyles;
    sr.appendChild(style);
  }

  protected onInit(): void {
    this._upgradeProps();
    if (!this._control || this._linkModeMismatch()) {
      this._mountControl();
    }
    ensureIconSprite(this.shadowRoot!);
    this._syncAll();
  }

  protected onDestroy(): void {
    this._teardownControl();
  }

  attributeChangedCallback(_name: string, oldVal: string | null, newVal: string | null): void {
    if (oldVal === newVal) return;
    if (!this._control) {
      this._mountControl();
    } else if (_name === 'href') {
      const nowLink = !!this.getAttribute('href');
      const isLink = this._control instanceof HTMLAnchorElement;
      if (nowLink !== isLink) {
        this._mountControl();
      }
    }
    if (!this._control) return;
    this._syncAll();
  }

  get variant(): string {
    return this.getAttribute('variant') ?? 'filled';
  }
  set variant(v: string) {
    this.setAttribute('variant', v);
  }

  get disabled(): boolean {
    return this.hasAttribute('disabled');
  }
  set disabled(v: boolean) {
    if (v) this.setAttribute('disabled', '');
    else this.removeAttribute('disabled');
  }

  get softDisabled(): boolean {
    return this.hasAttribute('soft-disabled');
  }
  set softDisabled(v: boolean) {
    if (v) this.setAttribute('soft-disabled', '');
    else this.removeAttribute('soft-disabled');
  }

  /** État « enfoncé » / sélectionné (toggle ou affichage contrôlé). */
  get pressed(): boolean {
    return this.hasAttribute('pressed');
  }
  set pressed(v: boolean) {
    if (v) this.setAttribute('pressed', '');
    else this.removeAttribute('pressed');
  }

  /** `round` (pilule, défaut M3 Expressive) ou `square` (row B). */
  get shape(): string {
    return this.getAttribute('shape') ?? 'round';
  }
  set shape(v: string) {
    this.setAttribute('shape', v);
  }

  private _linkModeMismatch(): boolean {
    if (!this._control) return true;
    const want = !!this.getAttribute('href');
    const isA = this._control instanceof HTMLAnchorElement;
    return want !== isA;
  }

  private _teardownControl(): void {
    if (!this._control) return;
    this._leadingSlot?.removeEventListener('slotchange', this._slotChange);
    this._trailingSlot?.removeEventListener('slotchange', this._slotChange);
    this._control.removeEventListener('click', this._onClickCapture, true);
    this._control.removeEventListener('click', this._onToggleClick, false);
    this._control.remove();
    this._control = null;
    this._leadingSlot = null;
    this._trailingSlot = null;
  }

  private _mountControl(): void {
    this._teardownControl();
    const sr = this.shadowRoot!;
    const href = this.getAttribute('href');
    const el = href ? document.createElement('a') : document.createElement('button');

    el.setAttribute('part', 'control');
    el.classList.add('btn');
    el.innerHTML = this._innerMarkup();

    if (href) {
      const a = el as HTMLAnchorElement;
      a.href = href;
      const target = this.getAttribute('target');
      if (target) {
        a.target = target;
        if (target === '_blank') a.rel = 'noopener noreferrer';
      }
    } else {
      const b = el as HTMLButtonElement;
      const t = this.getAttribute('type') ?? 'button';
      b.type = t === 'submit' || t === 'reset' ? t : 'button';
    }

    sr.appendChild(el);
    this._control = el;
    this._leadingSlot = el.querySelector('slot[name="leading"]');
    this._trailingSlot = el.querySelector('slot[name="trailing"]');
    this._leadingSlot?.addEventListener('slotchange', this._slotChange);
    this._trailingSlot?.addEventListener('slotchange', this._slotChange);
    el.addEventListener('click', this._onClickCapture, true);
    el.addEventListener('click', this._onToggleClick, false);
  }

  private _innerMarkup(): string {
    return `
      <span class="btn__content">
        <span class="btn__segment">
          <span part="icon-leading" class="icon-host" hidden></span>
          <slot name="leading"></slot>
        </span>
        <span class="btn__segment btn__segment--label"><slot></slot></span>
        <span class="btn__segment">
          <span part="icon-trailing" class="icon-host" hidden></span>
          <slot name="trailing"></slot>
        </span>
      </span>
    `;
  }

  private _upgradeProps(): void {
    for (const k of ['disabled', 'softDisabled', 'pressed'] as const) {
      if (Object.prototype.hasOwnProperty.call(this, k)) {
        const v = (this as unknown as Record<string, boolean>)[k];
        delete (this as unknown as Record<string, boolean>)[k];
        (this as unknown as Record<string, boolean>)[k] = v;
      }
    }
  }

  private _syncAll(): void {
    if (!this._control) return;
    this._syncVariant();
    this._syncSize();
    this._syncShape();
    this._syncShapeToggleSwap();
    this._syncDisabledStates();
    this._syncType();
    this._syncHrefTarget();
    this._syncFormAttrs();
    this._syncAria();
    this._syncToggle();
    this._syncDir();
    this._syncIcons();
  }

  /** `dir` explicite sur l’hôte → bouton/lien interne (sinon héritage document / parent). */
  private _syncDir(): void {
    const el = this._control!;
    const d = this.getAttribute('dir');
    if (d === 'rtl' || d === 'ltr') el.setAttribute('dir', d);
    else el.removeAttribute('dir');
  }

  private _syncVariant(): void {
    const raw = this.getAttribute('variant') ?? 'filled';
    const v = VARIANTS.has(raw) ? raw : 'filled';
    const el = this._control!;
    for (const x of VARIANTS) el.classList.remove(`btn--${x}`);
    el.classList.add(`btn--${v}`);
  }

  /**
   * Tailles M3 Expressive : **small** = défaut doc (aucune classe ; tokens dans `.btn`).
   * @see https://m3.material.io/components/buttons/overview — « Small (existing, default) »
   */
  private _syncSize(): void {
    const raw = this.getAttribute('size') ?? 'small';
    const s = SIZES.has(raw) ? raw : 'small';
    const el = this._control!;
    el.classList.remove('btn--xs', 'btn--md', 'btn--lg', 'btn--xl');
    if (s === 'extra-small') el.classList.add('btn--xs');
    else if (s === 'medium') el.classList.add('btn--md');
    else if (s === 'large') el.classList.add('btn--lg');
    else if (s === 'extra-large') el.classList.add('btn--xl');
  }

  private _syncShape(): void {
    const raw = this.getAttribute('shape') ?? 'round';
    const s = SHAPES.has(raw) ? raw : 'round';
    const el = this._control!;
    el.classList.remove('btn--shape-round', 'btn--shape-square');
    el.classList.add(s === 'square' ? 'btn--shape-square' : 'btn--shape-round');
  }

  /** Avec `shape-toggle-swap` : l’état sélectionné (toggle) inverse square ↔ pilule. */
  private _syncShapeToggleSwap(): void {
    const el = this._control!;
    el.classList.toggle('btn--shape-toggle-swap', this.hasAttribute('shape-toggle-swap'));
  }

  private _syncDisabledStates(): void {
    const el = this._control!;
    const hard = this.hasAttribute('disabled');
    const soft = this.hasAttribute('soft-disabled');

    if (el instanceof HTMLButtonElement) {
      if (hard) {
        el.disabled = true;
        el.classList.remove('btn--soft');
        setAriaProps(el, { 'aria-disabled': true });
      } else if (soft) {
        el.disabled = false;
        el.classList.add('btn--soft');
        setAriaProps(el, { 'aria-disabled': true });
      } else {
        el.disabled = false;
        el.classList.remove('btn--soft');
        setAriaProps(el, { 'aria-disabled': undefined });
      }
    } else {
      const a = el as HTMLAnchorElement;
      if (hard) {
        a.setAttribute('aria-disabled', 'true');
        a.tabIndex = -1;
        a.classList.remove('btn--soft');
      } else if (soft) {
        a.setAttribute('aria-disabled', 'true');
        a.tabIndex = 0;
        a.classList.add('btn--soft');
      } else {
        a.removeAttribute('aria-disabled');
        a.tabIndex = 0;
        a.classList.remove('btn--soft');
      }
    }
  }

  private _syncType(): void {
    if (!(this._control instanceof HTMLButtonElement)) return;
    const t = this.getAttribute('type') ?? 'button';
    this._control.type = t === 'submit' || t === 'reset' ? t : 'button';
  }

  private _syncHrefTarget(): void {
    if (!(this._control instanceof HTMLAnchorElement)) return;
    const href = this.getAttribute('href');
    if (href) this._control.href = href;
    const target = this.getAttribute('target');
    if (target) {
      this._control.target = target;
      this._control.rel = target === '_blank' ? 'noopener noreferrer' : '';
    } else {
      this._control.removeAttribute('target');
      this._control.removeAttribute('rel');
    }
  }

  private _syncFormAttrs(): void {
    if (!(this._control instanceof HTMLButtonElement)) return;
    const name = this.getAttribute('name');
    const value = this.getAttribute('value');
    const form = this.getAttribute('form');
    if (name !== null) this._control.setAttribute('name', name);
    else this._control.removeAttribute('name');
    if (value !== null) this._control.setAttribute('value', value);
    else this._control.removeAttribute('value');
    if (form !== null) this._control.setAttribute('form', form);
    else this._control.removeAttribute('form');
  }

  private _syncAria(): void {
    const label = this.getAttribute('aria-label');
    setAriaProps(this._control!, { 'aria-label': label ?? undefined });
  }

  /**
   * Toggle : `toggle` + `pressed`, `aria-pressed` — toutes variantes common (y compris `text`).
   */
  private _syncToggle(): void {
    const el = this._control!;
    const hasToggle = this.hasAttribute('toggle');
    const isPressed = this.hasAttribute('pressed');
    el.classList.toggle('btn--toggle', hasToggle);
    el.classList.toggle('btn--pressed', isPressed);
    const showPressedState = hasToggle || isPressed;
    if (showPressedState) {
      setAriaProps(el, { 'aria-pressed': isPressed ? 'true' : 'false' });
    } else {
      setAriaProps(el, { 'aria-pressed': undefined });
    }
  }

  private _syncIcons(): void {
    this._paintIcon('leading', this.getAttribute('icon-leading'), this._leadingSlot);
    this._paintIcon('trailing', this.getAttribute('icon-trailing'), this._trailingSlot);
  }

  private _paintIcon(
    side: 'leading' | 'trailing',
    key: string | null,
    slot: HTMLSlotElement | null,
  ): void {
    const root = this.shadowRoot;
    if (!root || !slot) return;
    const host = root.querySelector(`[part="icon-${side}"]`) as HTMLElement | null;
    if (!host) return;

    const hasSlot = slot.assignedNodes({ flatten: true }).length > 0;
    if (hasSlot) {
      host.hidden = true;
      host.innerHTML = '';
      return;
    }

    const id = key ? ICON_ATTR_MAP[key] : undefined;
    if (!id) {
      host.hidden = true;
      host.innerHTML = '';
      return;
    }
    host.hidden = false;
    const directional = key === 'chevron-right';
    const iconClass = directional ? 'icon icon--directional' : 'icon';
    host.innerHTML = `<svg class="${iconClass}" aria-hidden="true" focusable="false"><use href="${iconHref(id)}"/></svg>`;
  }
}
