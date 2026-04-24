import { BaseComponent } from '../../core/BaseComponent';
import { ICONS, type IconId } from '../../core/icons/constants';
import { ensureIconSprite, iconHref } from '../../core/icons/sprite';
import shadowStyles from './navigation-card.scss?inline';

const ICON_ATTR_MAP: Record<string, IconId> = {
  check: ICONS.check,
  close: ICONS.close,
  menu: ICONS.menu,
  'chevron-right': ICONS.chevronRight,
};

export class NavigationCard extends BaseComponent {
  static observedAttributes = ['title', 'subtitle', 'href', 'icon-leading', 'icon-trailing'];

  private _root: HTMLElement | null = null;

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
    this._root?.remove();
    this._root = null;
  }

  attributeChangedCallback(_name: string, oldVal: string | null, newVal: string | null): void {
    if (oldVal === newVal || !this._root) return;
    this._syncAll();
  }

  private _mount(): void {
    const href = this.getAttribute('href') || '#';
    const root = document.createElement('a');
    root.className = 'nav-card';
    root.setAttribute('part', 'control');
    root.setAttribute('href', href);
    root.innerHTML = `
      <span class="nav-card__icon-chip" part="icon-leading"></span>
      <span>
        <p class="nav-card__title"></p>
        <p class="nav-card__subtitle"></p>
      </span>
      <span class="nav-card__icon-chip" part="icon-trailing"></span>
    `;
    this.shadowRoot!.appendChild(root);
    this._root = root;
  }

  private _syncAll(): void {
    if (!this._root) return;
    const href = this.getAttribute('href') || '#';
    (this._root as HTMLAnchorElement).href = href;
    const title = this.getAttribute('title') || '';
    const subtitle = this.getAttribute('subtitle') || '';
    const titleEl = this._root.querySelector('.nav-card__title') as HTMLElement | null;
    const subEl = this._root.querySelector('.nav-card__subtitle') as HTMLElement | null;
    if (titleEl) titleEl.textContent = title;
    if (subEl) subEl.textContent = subtitle;
    this._paintIcon('icon-leading', this.getAttribute('icon-leading') || 'menu');
    this._paintIcon('icon-trailing', this.getAttribute('icon-trailing') || 'chevron-right');
  }

  private _paintIcon(part: 'icon-leading' | 'icon-trailing', key: string): void {
    if (!this._root) return;
    const host = this._root.querySelector(`[part="${part}"]`) as HTMLElement | null;
    if (!host) return;
    const id = ICON_ATTR_MAP[key];
    if (!id) {
      host.innerHTML = '';
      return;
    }
    host.innerHTML = `<svg class="nav-card__icon" aria-hidden="true" focusable="false"><use href="${iconHref(id)}"/></svg>`;
  }
}
