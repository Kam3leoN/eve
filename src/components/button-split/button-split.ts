import { BaseComponent } from '../../core/BaseComponent';
import { withLibEvent } from '../../lib.config';
import { setAriaProps } from '../../core/a11y/aria';
import { ICONS, type IconId } from '../../core/icons/constants';
import { ensureIconSprite, iconHref } from '../../core/icons/sprite';
import shadowStyles from './button-split.scss?inline';

const VARIANTS = new Set(['elevated', 'filled', 'tonal', 'outlined']);
const SIZES = new Set(['extra-small', 'small', 'medium', 'large', 'extra-large']);
const ICON_ATTR_MAP: Record<string, IconId> = {
  check: ICONS.check,
  menu: ICONS.menu,
  close: ICONS.close,
};

export class ButtonSplit extends BaseComponent {
  static observedAttributes = [
    'variant',
    'size',
    'disabled',
    'aria-label',
    'secondary-aria-label',
    'icon-leading',
    'selected-trailing',
    'equal-parts',
  ];

  private _root: HTMLElement | null = null;
  private _primary: HTMLButtonElement | null = null;
  private _secondary: HTMLButtonElement | null = null;

  private readonly _onPrimaryClick = () => {
    if (this.hasAttribute('disabled')) return;
    this.dispatchEvent(new CustomEvent(withLibEvent('split-primary-click'), { bubbles: true, composed: true }));
  };

  private readonly _onSecondaryClick = () => {
    if (this.hasAttribute('disabled')) return;
    const next = !this.hasAttribute('selected-trailing');
    if (next) this.setAttribute('selected-trailing', '');
    else this.removeAttribute('selected-trailing');
    this.dispatchEvent(new CustomEvent(withLibEvent('split-secondary-click'), { bubbles: true, composed: true }));
  };

  constructor() {
    super();
    const sr = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = shadowStyles;
    sr.appendChild(style);
  }

  protected onInit(): void {
    if (!this._root) this._mount();
    ensureIconSprite(this.shadowRoot!);
    this._syncAll();
  }

  protected onDestroy(): void {
    this._primary?.removeEventListener('click', this._onPrimaryClick);
    this._secondary?.removeEventListener('click', this._onSecondaryClick);
    this._root?.remove();
    this._root = null;
    this._primary = null;
    this._secondary = null;
  }

  attributeChangedCallback(_name: string, oldVal: string | null, newVal: string | null): void {
    if (oldVal === newVal || !this._root) return;
    this._syncAll();
  }

  private _mount(): void {
    const root = document.createElement('div');
    root.className = 'split split--filled';
    const primary = document.createElement('button');
    primary.className = 'split__primary';
    primary.type = 'button';
    primary.innerHTML =
      '<span class="split__leading" part="icon-leading"></span><span class="split__label"><slot></slot></span>';
    const secondary = document.createElement('button');
    secondary.className = 'split__secondary';
    secondary.type = 'button';
    secondary.innerHTML =
      `<svg class="icon" aria-hidden="true" focusable="false"><use href="${iconHref(ICONS.chevronRight)}"/></svg>`;
    primary.addEventListener('click', this._onPrimaryClick);
    secondary.addEventListener('click', this._onSecondaryClick);
    root.append(primary, secondary);
    this.shadowRoot!.appendChild(root);
    this._root = root;
    this._primary = primary;
    this._secondary = secondary;
  }

  private _syncAll(): void {
    if (!this._root || !this._primary || !this._secondary) return;
    const raw = this.getAttribute('variant') ?? 'filled';
    const variant = VARIANTS.has(raw) ? raw : 'filled';
    this._root.classList.remove('split--elevated', 'split--filled', 'split--tonal', 'split--outlined');
    this._root.classList.add(`split--${variant}`);
    const rawSize = this.getAttribute('size') ?? 'small';
    const size = SIZES.has(rawSize) ? rawSize : 'small';
    this._root.classList.remove('split--xs', 'split--sm', 'split--md', 'split--lg', 'split--xl');
    if (size === 'extra-small') this._root.classList.add('split--xs');
    else if (size === 'medium') this._root.classList.add('split--md');
    else if (size === 'large') this._root.classList.add('split--lg');
    else if (size === 'extra-large') this._root.classList.add('split--xl');
    else this._root.classList.add('split--sm');
    const disabled = this.hasAttribute('disabled');
    this._primary.disabled = disabled;
    this._secondary.disabled = disabled;
    setAriaProps(this._root, { 'aria-disabled': disabled ? 'true' : undefined });
    setAriaProps(this._primary, { 'aria-label': this.getAttribute('aria-label') ?? undefined });
    setAriaProps(this._secondary, {
      'aria-label': this.getAttribute('secondary-aria-label') ?? 'Open menu',
      'aria-pressed': this.hasAttribute('selected-trailing') ? 'true' : 'false',
    });
    this._root.classList.toggle('split--selected-trailing', this.hasAttribute('selected-trailing'));
    this._root.classList.toggle('split--equal', this.hasAttribute('equal-parts'));
    this._syncLeadingIcon();
  }

  private _syncLeadingIcon(): void {
    if (!this._primary) return;
    const host = this._primary.querySelector('[part="icon-leading"]') as HTMLElement | null;
    if (!host) return;
    const icon = this.getAttribute('icon-leading');
    const id = icon ? ICON_ATTR_MAP[icon] : undefined;
    if (!id) {
      host.innerHTML = '';
      return;
    }
    host.innerHTML = `<svg class="icon" aria-hidden="true" focusable="false"><use href="${iconHref(id)}"/></svg>`;
  }
}
