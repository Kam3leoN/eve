import { BaseComponent } from '../../core/BaseComponent';
import { ICONS, type IconId } from '../../core/icons/constants';
import { ensureIconSprite, iconHref } from '../../core/icons/sprite';
import {
  generatePassword,
  isPasswordPolicyActive,
  readPasswordPolicyFromElement,
  validatePasswordValue,
} from '../../core/password';
import shadowStyles from './text-field.scss?inline';

const VARIANTS = new Set(['filled', 'outlined']);

const ICON_ATTR_MAP: Record<string, IconId> = {
  check: ICONS.check,
  close: ICONS.close,
  menu: ICONS.menu,
  'chevron-right': ICONS.chevronRight,
  visibility: ICONS.visibility,
  'visibility-off': ICONS.visibilityOff,
  refresh: ICONS.refresh,
};

const FORWARDED_ATTRS = [
  'name',
  'type',
  'autocomplete',
  'inputmode',
  'minlength',
  'maxlength',
  'pattern',
  'min',
  'max',
  'step',
  'required',
  'disabled',
  'readonly',
  'placeholder',
] as const;

let textFieldIdSeq = 0;

export class TextField extends BaseComponent {
  static observedAttributes = [
    'variant',
    'label',
    'value',
    'supporting-text',
    'error-text',
    'error',
    'prefix-text',
    'suffix-text',
    'icon-leading',
    'icon-trailing',
    'text-align',
    'aria-label',
    'dir',
    'password-toggle',
    'password-generate',
    'password-min-length',
    'password-min-lower',
    'password-min-upper',
    'password-min-digit',
    'password-min-special',
    ...FORWARDED_ATTRS,
  ];

  private _field: HTMLElement | null = null;
  private _input: HTMLInputElement | null = null;
  private _label: HTMLElement | null = null;
  private _supportText: HTMLElement | null = null;
  private _counter: HTMLElement | null = null;
  private _leadingIconHost: HTMLElement | null = null;
  private _trailingIconHost: HTMLElement | null = null;
  private _leadingWrap: HTMLElement | null = null;
  private _trailingWrap: HTMLElement | null = null;
  private _leadingSlot: HTMLSlotElement | null = null;
  private _trailingSlot: HTMLSlotElement | null = null;
  private _prefix: HTMLElement | null = null;
  private _suffix: HTMLElement | null = null;
  private _outlinedStrokes: HTMLElement | null = null;
  private _outlinedPath: SVGPathElement | null = null;
  private _outlinedLayoutObserver: ResizeObserver | null = null;
  private _messageId = '';
  private _revealPassword = false;
  private _passwordToggleBtn: HTMLButtonElement | null = null;
  private _passwordGenBtn: HTMLButtonElement | null = null;

  private readonly _onInput = () => {
    this.setAttribute('value', this._input?.value ?? '');
    this._applyPasswordPolicy();
    this._syncStateClasses();
    this._syncSupportLine();
    this._syncOutlinedStrokes();
  };

  private readonly _onChange = () => {
    this.setAttribute('value', this._input?.value ?? '');
    this._syncSupportLine();
    this._dispatchNativeClone('change');
  };

  private readonly _onFocus = () => {
    this._field?.classList.add('is-focused');
    this._syncStateClasses();
    this._syncOutlinedStrokes();
    this._dispatchNativeClone('focus');
  };

  private readonly _onBlur = () => {
    this._field?.classList.remove('is-focused');
    this._syncStateClasses();
    this._syncOutlinedStrokes();
    this._syncSupportLine();
    this._dispatchNativeClone('blur');
  };

  private readonly _onSlotChange = () => {
    this._syncIcons();
    this._syncOutlinedStrokes();
  };

  private readonly _onPasswordToggle = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    if (this.getAttribute('type') !== 'password' || this._input?.disabled) return;
    this._revealPassword = !this._revealPassword;
    this._applyPasswordInputType();
    this._syncPasswordButtons();
    this._input?.focus();
  };

  private readonly _onPasswordGenerate = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    if (this.getAttribute('type') !== 'password' || this._input?.disabled) return;
    const policy = readPasswordPolicyFromElement(this);
    const pwd = isPasswordPolicyActive(policy)
      ? generatePassword(policy)
      : generatePassword({
          minLength: 12,
          minLowercase: 1,
          minUppercase: 1,
          minDigit: 1,
          minSpecial: 1,
        });
    if (this._input) this._input.value = pwd;
    this.setAttribute('value', pwd);
    this._onInput();
    this._dispatchNativeClone('change');
  };

  constructor() {
    super();
    const sr = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = shadowStyles;
    sr.appendChild(style);
  }

  protected onInit(): void {
    this._upgradeValueProp();
    if (!this._input) this._mount();
    ensureIconSprite(this.shadowRoot!);
    this._bindInputEvents();
    this._syncAll();
  }

  protected onDestroy(): void {
    if (!this._input) return;
    this._unbindInputEvents();
    this._leadingSlot?.removeEventListener('slotchange', this._onSlotChange);
    this._trailingSlot?.removeEventListener('slotchange', this._onSlotChange);
    this._outlinedLayoutObserver?.disconnect();
    this._outlinedLayoutObserver = null;
    this._field?.closest('.tf')?.remove();
    this._field = null;
    this._input = null;
    this._label = null;
    this._supportText = null;
    this._counter = null;
    this._leadingIconHost = null;
    this._trailingIconHost = null;
    this._leadingWrap = null;
    this._trailingWrap = null;
    this._leadingSlot = null;
    this._trailingSlot = null;
    this._prefix = null;
    this._suffix = null;
    this._outlinedStrokes = null;
    this._outlinedPath = null;
    this._revealPassword = false;
    this._passwordToggleBtn?.removeEventListener('click', this._onPasswordToggle);
    this._passwordGenBtn?.removeEventListener('click', this._onPasswordGenerate);
    this._passwordToggleBtn = null;
    this._passwordGenBtn = null;
  }

  attributeChangedCallback(_name: string, oldVal: string | null, newVal: string | null): void {
    if (oldVal === newVal || !this._input) return;
    this._syncAll();
  }

  get value(): string {
    return this._input?.value ?? this.getAttribute('value') ?? '';
  }

  set value(next: string) {
    this.setAttribute('value', next ?? '');
  }

  focus(options?: FocusOptions): void {
    this._input?.focus(options);
  }

  blur(): void {
    this._input?.blur();
  }

  select(): void {
    this._input?.select();
  }

  setSelectionRange(start: number, end: number, direction?: 'forward' | 'backward' | 'none'): void {
    this._input?.setSelectionRange(start, end, direction);
  }

  setCustomValidity(error: string): void {
    this._input?.setCustomValidity(error);
    this._syncSupportLine();
  }

  checkValidity(): boolean {
    const valid = this._input?.checkValidity() ?? true;
    this._syncSupportLine();
    return valid;
  }

  reportValidity(): boolean {
    const valid = this._input?.reportValidity() ?? true;
    this._syncSupportLine();
    return valid;
  }

  private _mount(): void {
    const idBase = `lib-text-field-${++textFieldIdSeq}`;
    this._messageId = `${idBase}-message`;

    const root = document.createElement('div');
    root.className = 'tf';
    root.innerHTML = `
      <div class="tf__field tf__field--filled" part="field">
        <div class="tf__outlined-strokes" part="outlined-strokes" aria-hidden="true" hidden>
          <svg class="tf__outlined-svg" preserveAspectRatio="none" focusable="false" aria-hidden="true">
            <path class="tf__outlined-path"></path>
          </svg>
        </div>
        <span class="tf__leading" part="leading">
          <span class="tf__leading-icon" part="icon-leading" hidden></span>
          <slot name="leading" class="tf__slot"></slot>
        </span>
        <span class="tf__prefix" part="prefix" hidden></span>
        <div class="tf__control-wrap">
          <label class="tf__label" part="label"></label>
          <input class="tf__input" part="input" />
        </div>
        <span class="tf__suffix" part="suffix" hidden></span>
        <span class="tf__trailing" part="trailing">
          <slot name="trailing" class="tf__slot"></slot>
          <span class="tf__trailing-icon" part="icon-trailing" hidden></span>
          <button type="button" class="tf__password-toggle" part="password-toggle" hidden aria-label="Afficher le mot de passe" tabindex="0"></button>
          <button type="button" class="tf__password-generate" part="password-generate" hidden aria-label="Générer un mot de passe" tabindex="0"></button>
        </span>
      </div>
      <div class="tf__support" part="support" id="${this._messageId}">
        <span class="tf__support-text"></span>
        <span class="tf__counter"></span>
      </div>
    `;

    this.shadowRoot!.appendChild(root);
    this._field = root.querySelector('.tf__field');
    this._input = root.querySelector('.tf__input');
    this._label = root.querySelector('.tf__label');
    this._supportText = root.querySelector('.tf__support-text');
    this._counter = root.querySelector('.tf__counter');
    this._leadingIconHost = root.querySelector('.tf__leading-icon');
    this._trailingIconHost = root.querySelector('.tf__trailing-icon');
    this._leadingWrap = root.querySelector('.tf__leading');
    this._trailingWrap = root.querySelector('.tf__trailing');
    this._leadingSlot = root.querySelector('slot[name="leading"]');
    this._trailingSlot = root.querySelector('slot[name="trailing"]');
    this._prefix = root.querySelector('.tf__prefix');
    this._suffix = root.querySelector('.tf__suffix');
    this._outlinedStrokes = root.querySelector('.tf__outlined-strokes');
    this._outlinedPath = root.querySelector('.tf__outlined-path');
    this._passwordToggleBtn = root.querySelector('.tf__password-toggle');
    this._passwordGenBtn = root.querySelector('.tf__password-generate');
    this._bindPasswordControls();

    this._input?.setAttribute('id', idBase);
    this._input?.setAttribute('aria-describedby', this._messageId);
    this._label?.setAttribute('for', idBase);

    this._leadingSlot?.addEventListener('slotchange', this._onSlotChange);
    this._trailingSlot?.addEventListener('slotchange', this._onSlotChange);
    this._setupOutlinedLayoutObserver();
  }

  private _setupOutlinedLayoutObserver(): void {
    if (this._outlinedLayoutObserver || !this._field) return;
    if (typeof ResizeObserver === 'undefined') return;
    this._outlinedLayoutObserver = new ResizeObserver(() => {
      this._syncOutlinedStrokes();
    });
    this._outlinedLayoutObserver.observe(this._field);
    if (this._label) this._outlinedLayoutObserver.observe(this._label);
  }

  private _bindInputEvents(): void {
    if (!this._input) return;
    this._input.addEventListener('input', this._onInput);
    this._input.addEventListener('change', this._onChange);
    this._input.addEventListener('focus', this._onFocus);
    this._input.addEventListener('blur', this._onBlur);
  }

  private _unbindInputEvents(): void {
    if (!this._input) return;
    this._input.removeEventListener('input', this._onInput);
    this._input.removeEventListener('change', this._onChange);
    this._input.removeEventListener('focus', this._onFocus);
    this._input.removeEventListener('blur', this._onBlur);
  }

  private _bindPasswordControls(): void {
    this._passwordToggleBtn?.addEventListener('click', this._onPasswordToggle);
    this._passwordGenBtn?.addEventListener('click', this._onPasswordGenerate);
  }

  private _applyPasswordInputType(): void {
    if (!this._input) return;
    const hostType = this.getAttribute('type') ?? 'text';
    if (hostType === 'password' && this._revealPassword) {
      this._input.setAttribute('type', 'text');
    } else {
      this._input.setAttribute('type', hostType === '' ? 'text' : hostType);
    }
  }

  private _applyPasswordPolicy(): void {
    if (!this._input) return;
    if (this.getAttribute('type') !== 'password' || !isPasswordPolicyActive(readPasswordPolicyFromElement(this))) {
      this._input.setCustomValidity('');
      return;
    }
    const v = this._input.value;
    const r = validatePasswordValue(v, readPasswordPolicyFromElement(this));
    this._input.setCustomValidity(r.valid ? '' : r.message);
  }

  private _syncPasswordButtons(): void {
    const isPwd = this.getAttribute('type') === 'password';
    if (!isPwd) {
      this._revealPassword = false;
    }
    const showToggle = isPwd && this.hasAttribute('password-toggle') && this._passwordToggleBtn;
    const showGen = isPwd && this.hasAttribute('password-generate') && this._passwordGenBtn;
    if (this._passwordToggleBtn) {
      this._passwordToggleBtn.hidden = !showToggle;
      if (showToggle) {
        const showPlain = isPwd && this._revealPassword;
        const idShow = showPlain ? ICONS.visibilityOff : ICONS.visibility;
        this._passwordToggleBtn.innerHTML = `<svg class="tf__icon" aria-hidden="true" focusable="false" width="24" height="24"><use href="${iconHref(idShow)}"/></svg>`;
        this._passwordToggleBtn.setAttribute('aria-pressed', showPlain ? 'true' : 'false');
        this._passwordToggleBtn.setAttribute(
          'aria-label',
          showPlain ? 'Masquer le mot de passe' : 'Afficher le mot de passe',
        );
        this._passwordToggleBtn.setAttribute('tabindex', '0');
      }
    }
    if (this._passwordGenBtn) {
      this._passwordGenBtn.hidden = !showGen;
      if (showGen) {
        this._passwordGenBtn.innerHTML = `<svg class="tf__icon" aria-hidden="true" focusable="false" width="24" height="24"><use href="${iconHref(ICONS.refresh)}"/></svg>`;
        this._passwordGenBtn.setAttribute('aria-label', 'Générer un mot de passe');
        this._passwordGenBtn.setAttribute('tabindex', '0');
      }
    }
    this._applyPasswordInputType();
  }

  private _syncAll(): void {
    if (!this._input || !this._field) return;
    this._syncSurfaceColor();
    this._syncVariant();
    this._syncLabel();
    this._syncInputAttrs();
    this._syncTextAlign();
    this._syncValue();
    this._syncPrefixSuffix();
    this._syncPasswordButtons();
    this._applyPasswordPolicy();
    this._syncIcons();
    this._syncDirection();
    this._syncStateClasses();
    this._syncSupportLine();
    this._syncOutlinedStrokes();
  }

  private _syncSurfaceColor(): void {
    let current: HTMLElement | null = this.parentElement;
    let resolved = '';
    while (current) {
      const bg = getComputedStyle(current).backgroundColor;
      if (!this._isTransparentColor(bg)) {
        resolved = bg;
        break;
      }
      current = current.parentElement;
    }
    this.style.setProperty('--lib-comp-text-field-surface-color', resolved || 'transparent');
  }

  private _isTransparentColor(color: string): boolean {
    const normalized = color.replace(/\s+/g, '').toLowerCase();
    return normalized === 'transparent' || normalized === 'rgba(0,0,0,0)';
  }

  private _syncVariant(): void {
    const raw = this.getAttribute('variant') ?? 'filled';
    const variant = VARIANTS.has(raw) ? raw : 'filled';
    this._field!.classList.remove('tf__field--filled', 'tf__field--outlined');
    this._field!.classList.add(`tf__field--${variant}`);
  }

  private _syncLabel(): void {
    const label = this.getAttribute('label') ?? '';
    this._label!.textContent = label;
    const ariaLabel = this.getAttribute('aria-label');
    if (label.trim().length === 0) {
      if (ariaLabel?.trim()) this._input!.setAttribute('aria-label', ariaLabel);
    } else {
      this._input!.removeAttribute('aria-label');
    }
  }

  private _syncInputAttrs(): void {
    for (const attr of FORWARDED_ATTRS) {
      if (attr === 'type') continue;
      const value = this.getAttribute(attr);
      if (value === null) this._input!.removeAttribute(attr);
      else this._input!.setAttribute(attr, value === '' ? '' : value);
    }
    if ((this.getAttribute('type') ?? 'text') !== 'password') {
      this._revealPassword = false;
    }
    this._applyPasswordInputType();
    if (!this._input!.getAttribute('type')) {
      this._input!.setAttribute('type', 'text');
    }
  }

  private _syncTextAlign(): void {
    if (!this._input) return;
    const raw = (this.getAttribute('text-align') ?? '').trim().toLowerCase();
    if (raw === 'left' || raw === 'right') {
      this._input.style.textAlign = raw;
      return;
    }
    this._input.style.removeProperty('text-align');
  }

  private _syncValue(): void {
    const next = this.getAttribute('value') ?? '';
    if (this._input!.value !== next) this._input!.value = next;
  }

  private _syncPrefixSuffix(): void {
    const prefix = this.getAttribute('prefix-text');
    const suffix = this.getAttribute('suffix-text');
    this._prefix!.textContent = prefix ?? '';
    this._suffix!.textContent = suffix ?? '';
    this._prefix!.hidden = !prefix;
    this._suffix!.hidden = !suffix;
  }

  private _syncIcons(): void {
    const hasLeading = this._paintIcon(
      'leading',
      this.getAttribute('icon-leading'),
      this._leadingSlot,
      this._leadingIconHost,
    );
    const hasPaintedTrailing = this._paintIcon(
      'trailing',
      this.getAttribute('icon-trailing'),
      this._trailingSlot,
      this._trailingIconHost,
    );
    const isPwd = this.getAttribute('type') === 'password';
    const hasPwdToggle = isPwd && this.hasAttribute('password-toggle');
    const hasPwdGen = isPwd && this.hasAttribute('password-generate');
    const hasSlotTrailing = !!this._trailingSlot?.assignedNodes({ flatten: true }).length;
    const hasTrailing = hasPaintedTrailing || hasSlotTrailing || hasPwdToggle || hasPwdGen;
    this._leadingWrap?.classList.toggle('is-visible', hasLeading);
    this._trailingWrap?.classList.toggle('is-visible', hasTrailing);
    this._field?.classList.toggle('has-leading', hasLeading);
    this._field?.classList.toggle('has-trailing', hasTrailing);
  }

  private _paintIcon(
    side: 'leading' | 'trailing',
    key: string | null,
    slot: HTMLSlotElement | null,
    host: HTMLElement | null,
  ): boolean {
    if (!slot || !host) return false;
    const hasSlot = slot.assignedNodes({ flatten: true }).length > 0;
    if (hasSlot) {
      host.hidden = true;
      host.innerHTML = '';
      return true;
    }
    const id = key ? ICON_ATTR_MAP[key] : undefined;
    if (!id) {
      host.hidden = true;
      host.innerHTML = '';
      return false;
    }
    host.hidden = false;
    host.innerHTML = `<svg class="tf__icon tf__icon--${side}" aria-hidden="true" focusable="false"><use href="${iconHref(id)}"/></svg>`;
    return true;
  }

  private _syncDirection(): void {
    const d = this.getAttribute('dir');
    if (d === 'rtl' || d === 'ltr') this._field!.setAttribute('dir', d);
    else this._field!.removeAttribute('dir');
  }

  private _syncStateClasses(): void {
    const hasValue = (this._input?.value ?? '').length > 0;
    const hasLabel = (this.getAttribute('label') ?? '').trim().length > 0;
    const isFocused = this._field!.classList.contains('is-focused');
    const isFloating = hasLabel && (hasValue || isFocused);
    this._field!.classList.toggle('has-value', hasValue);
    this._field!.classList.toggle('has-label', hasLabel);
    this._field!.classList.toggle('is-floating', isFloating);
    this._field!.classList.toggle('is-disabled', this._input!.disabled);
  }

  /**
   * Bordure outlined « découpée » (spec MD3) : pas de bordure complète, uniquement
   * des segments, avec un vrai espace sur le haut derrière le label (transparence).
   */
  private _syncOutlinedStrokes(): void {
    if (!this._field || !this._label) return;
    const variant = this.getAttribute('variant') ?? 'filled';
    const isOutlined = variant === 'outlined';
    if (!isOutlined) {
      this._outlinedStrokes?.setAttribute('hidden', '');
      this._field.classList.remove('is-top-notched');
      this._field.style.removeProperty('--lib-outlined-tstart');
      this._field.style.removeProperty('--lib-outlined-tend');
      return;
    }

    const labelText = (this.getAttribute('label') ?? '').trim();
    const hasValue = (this._input?.value ?? '').length > 0;
    const isFocused = this._field.classList.contains('is-focused');
    const shouldNotch = labelText.length > 0 && (hasValue || isFocused);
    this._field.classList.toggle('is-top-notched', shouldNotch);
    this._outlinedStrokes?.toggleAttribute('hidden', !shouldNotch);

    if (!shouldNotch) {
      this._field.style.removeProperty('--lib-outlined-tstart');
      this._field.style.removeProperty('--lib-outlined-tend');
      return;
    }

    const measure = (): void => {
      if (!this._field || !this._label || !this._outlinedPath) return;
      const fr = this._field.getBoundingClientRect();
      const lr = this._label.getBoundingClientRect();
      const padRaw = getComputedStyle(this).getPropertyValue('--lib-comp-text-field-outlined-notch-pad').trim();
      const parsedPad = parseFloat(padRaw);
      const maxPad = Number.isFinite(parsedPad) && parsedPad >= 0 ? parsedPad : 4;
      const w = fr.width;
      const h = fr.height;
      const radiusRaw = getComputedStyle(this).getPropertyValue('--lib-comp-text-field-radius').trim();
      const parsedRadius = parseFloat(radiusRaw);
      const r = Number.isFinite(parsedRadius) && parsedRadius >= 0 ? parsedRadius : 4;
      const labelWidth = Math.max(0, lr.width);
      const labelCenter = ((lr.left + lr.right) / 2) - fr.left;
      const spaceInlineStart = labelCenter - (labelWidth / 2);
      const spaceInlineEnd = w - (labelCenter + labelWidth / 2);
      const m = Math.max(0, Math.min(maxPad, spaceInlineStart, spaceInlineEnd));

      // Encoche symétrique stricte autour du centre du label.
      const notchWidth = labelWidth + (2 * m);
      const notchStart = Math.max(0, labelCenter - (notchWidth / 2));
      const notchEnd = Math.min(w, labelCenter + (notchWidth / 2));
      const tStart = Math.max(0, Math.round(notchStart));
      const tEnd = Math.max(0, Math.round(w - notchEnd));
      this._field.style.setProperty('--lib-outlined-tstart', `${tStart}px`);
      this._field.style.setProperty('--lib-outlined-tend', `${tEnd}px`);

      const topLeft = r;
      const topRight = Math.max(r, w - r);
      const notchLeft = Math.min(Math.max(tStart, topLeft), topRight);
      const notchRight = Math.max(Math.min(w - tEnd, topRight), topLeft);
      const d: string[] = [];

      if (notchLeft > topLeft) d.push(`M ${topLeft} 0 H ${notchLeft}`);
      if (notchRight < topRight) d.push(`M ${notchRight} 0 H ${topRight}`);

      d.push(
        `M ${topRight} 0`,
        `Q ${w} 0 ${w} ${r}`,
        `V ${Math.max(r, h - r)}`,
        `Q ${w} ${h} ${Math.max(r, w - r)} ${h}`,
        `H ${r}`,
        `Q 0 ${h} 0 ${Math.max(r, h - r)}`,
        `V ${r}`,
        `Q 0 0 ${r} 0`,
      );

      this._outlinedPath.setAttribute('d', d.join(' '));
    };
    // 1er passage: après mise à jour immédiate des classes/attributs.
    void requestAnimationFrame(measure);
    // 2e passage: après stabilisation du layout/typo (premier rendu + transitions initiales).
    void requestAnimationFrame(() => {
      void requestAnimationFrame(measure);
    });
  }

  private _syncSupportLine(): void {
    const manualError = this.hasAttribute('error');
    const hasNativeError = !(this._input?.validity.valid ?? true);
    const hasError = manualError || hasNativeError;

    const supporting = this.getAttribute('supporting-text') ?? '';
    const explicitError = this.getAttribute('error-text') ?? '';
    const nativeError = this._input?.validationMessage ?? '';
    const message = hasError ? explicitError || nativeError : supporting;

    this._supportText!.textContent = message;
    this._supportText!.setAttribute('aria-live', hasError ? 'assertive' : 'polite');
    this._field!.classList.toggle('is-error', hasError);
    this._input!.setAttribute('aria-invalid', hasError ? 'true' : 'false');
    this._supportText!.parentElement?.classList.toggle('is-error', hasError);

    const max = this._input?.getAttribute('maxlength');
    if (max && /^\d+$/.test(max)) {
      const current = this._input?.value.length ?? 0;
      this._counter!.textContent = `${current}/${max}`;
    } else {
      this._counter!.textContent = '';
    }
  }

  private _dispatchNativeClone(type: 'change' | 'focus' | 'blur'): void {
    const evt = new Event(type, { bubbles: true, composed: true });
    this.dispatchEvent(evt);
  }

  private _upgradeValueProp(): void {
    if (Object.prototype.hasOwnProperty.call(this, 'value')) {
      const value = this.value;
      delete (this as unknown as Record<string, unknown>).value;
      this.value = value;
    }
  }
}
