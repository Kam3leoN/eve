import { BaseComponent } from '../../core/BaseComponent';
import { withLibEvent } from '../../lib.config';
import { setAriaProps } from '../../core/a11y/aria';
import { ICONS, type IconId } from '../../core/icons/constants';
import { ensureIconSprite, iconHref } from '../../core/icons/sprite';
import shadowStyles from './button-icon.scss?inline';

const VARIANTS = new Set(['standard', 'filled', 'tonal', 'outlined', 'elevated']);
const SIZES = new Set(['extra-small', 'small', 'medium', 'large', 'extra-large']);

const ICON_ATTR_MAP: Record<string, IconId> = {
  check: ICONS.check,
  close: ICONS.close,
  menu: ICONS.menu,
  'chevron-right': ICONS.chevronRight,
};

export class ButtonIcon extends BaseComponent {
  static observedAttributes = [
    'variant',
    'size',
    'width',
    'shape',
    'disabled',
    'toggle',
    'pressed',
    'icon',
    'aria-label',
  ];

  private _control: HTMLButtonElement | null = null;

  private readonly _onToggle = () => {
    if (!this.hasAttribute('toggle') || this.hasAttribute('disabled')) return;
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
    if (!this._control) this._mount();
    ensureIconSprite(this.shadowRoot!);
    this._syncAll();
  }

  protected onDestroy(): void {
    if (!this._control) return;
    this._control.removeEventListener('click', this._onToggle);
    this._control.remove();
    this._control = null;
  }

  attributeChangedCallback(_name: string, oldVal: string | null, newVal: string | null): void {
    if (oldVal === newVal || !this._control) return;
    this._syncAll();
  }

  private _mount(): void {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'icon-btn icon-btn--sm icon-btn--standard';
    btn.setAttribute('part', 'control');
    btn.addEventListener('click', this._onToggle);
    this.shadowRoot!.appendChild(btn);
    this._control = btn;
  }

  private _syncAll(): void {
    if (!this._control) return;
    this._syncVariant();
    this._syncSize();
    this._syncWidth();
    this._syncShape();
    this._syncPressed();
    this._syncDisabled();
    this._syncAria();
    this._syncIcon();
  }

  private _syncVariant(): void {
    const raw = this.getAttribute('variant') ?? 'standard';
    const variant = VARIANTS.has(raw) ? raw : 'standard';
    const el = this._control!;
    for (const value of VARIANTS) el.classList.remove(`icon-btn--${value}`);
    el.classList.add(`icon-btn--${variant}`);
  }

  private _syncSize(): void {
    const raw = this.getAttribute('size') ?? 'small';
    const size = SIZES.has(raw) ? raw : 'small';
    const el = this._control!;
    el.classList.remove('icon-btn--xs', 'icon-btn--sm', 'icon-btn--md', 'icon-btn--lg', 'icon-btn--xl');
    if (size === 'extra-small') el.classList.add('icon-btn--xs');
    else if (size === 'medium') el.classList.add('icon-btn--md');
    else if (size === 'large') el.classList.add('icon-btn--lg');
    else if (size === 'extra-large') el.classList.add('icon-btn--xl');
    else el.classList.add('icon-btn--sm');
  }

  private _syncWidth(): void {
    const raw = this.getAttribute('width') ?? 'default';
    const el = this._control!;
    el.classList.remove('icon-btn--width-default', 'icon-btn--width-narrow', 'icon-btn--width-wide');
    if (raw === 'narrow') el.classList.add('icon-btn--width-narrow');
    else if (raw === 'wide') el.classList.add('icon-btn--width-wide');
    else el.classList.add('icon-btn--width-default');
  }

  private _syncShape(): void {
    const raw = this.getAttribute('shape') ?? 'round';
    const el = this._control!;
    el.classList.remove('icon-btn--shape-round', 'icon-btn--shape-square');
    if (raw === 'square') el.classList.add('icon-btn--shape-square');
    else el.classList.add('icon-btn--shape-round');
  }

  private _syncPressed(): void {
    const isPressed = this.hasAttribute('pressed');
    const hasToggle = this.hasAttribute('toggle');
    this._control!.classList.toggle('icon-btn--pressed', isPressed);
    if (hasToggle || isPressed) {
      setAriaProps(this._control!, { 'aria-pressed': isPressed ? 'true' : 'false' });
    } else {
      setAriaProps(this._control!, { 'aria-pressed': undefined });
    }
  }

  private _syncDisabled(): void {
    this._control!.disabled = this.hasAttribute('disabled');
  }

  private _syncAria(): void {
    const label = this.getAttribute('aria-label');
    setAriaProps(this._control!, { 'aria-label': label ?? undefined });
  }

  private _syncIcon(): void {
    const key = this.getAttribute('icon') ?? 'menu';
    const id = ICON_ATTR_MAP[key];
    if (!id) return;
    this._control!.innerHTML = `<svg class="icon" aria-hidden="true" focusable="false"><use href="${iconHref(id)}"/></svg>`;
  }
}
