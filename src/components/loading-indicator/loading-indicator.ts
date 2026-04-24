import { BaseComponent } from '../../core/BaseComponent';
import shadowStyles from './loading-indicator.scss?inline';

const SHAPE_SEQUENCE = ['burstsoft', 'sides9', 'pentagon', 'pill', 'sunny', 'sides4', 'oval'] as const;
const SPIN_SWAP_MS = 500;
const SPIN_ROTATION_MS = 1000;
const SPIN_DURATION_MS = 2000;

type LoaderVariant = 'default' | 'contained';

export class LoadingIndicator extends BaseComponent {
  static observedAttributes = ['aria-label', 'paused', 'variant', 'dir', 'duration'];

  private _rootEl: HTMLElement | null = null;
  private _containerEl: HTMLElement | null = null;
  private _shapeA: HTMLElement | null = null;
  private _shapeB: HTMLElement | null = null;
  private _frontSlot: 'a' | 'b' = 'a';
  private _shapeIndex = 0;
  private _phaseTimer: number | null = null;
  private _phase: 'spin' | 'spring-swap' = 'spin';
  private _reducedMotionMediaQuery: MediaQueryList | null = null;
  private readonly _onReducedMotionChange = () => this._syncAnimationState();

  constructor() {
    super();
    const sr = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = shadowStyles;
    sr.appendChild(style);
  }

  protected onInit(): void {
    if (!this._rootEl || !this._containerEl || !this._shapeA || !this._shapeB) this._mount();
    this._setupReducedMotionListener();
    this._syncAll();
  }

  protected onDestroy(): void {
    this._stopMorphLoop();
    if (this._reducedMotionMediaQuery) {
      this._reducedMotionMediaQuery.removeEventListener('change', this._onReducedMotionChange);
      this._reducedMotionMediaQuery = null;
    }
    this._rootEl?.remove();
    this._rootEl = null;
    this._containerEl = null;
    this._shapeA = null;
    this._shapeB = null;
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    if (oldValue === newValue || !this._rootEl || !this._containerEl || !this._shapeA || !this._shapeB) return;

    if (name === 'aria-label') {
      this._syncA11y();
      return;
    }

    if (name === 'variant') {
      this._syncVariant();
      return;
    }

    if (name === 'dir') {
      this._syncDirection();
      return;
    }

    if (name === 'duration') {
      this._syncTimingTokens();
      return;
    }

    if (name === 'paused') {
      this._syncAnimationState();
      return;
    }

    this._syncAll();
  }

  private _mount(): void {
    const root = document.createElement('div');
    root.className = 'li-root';
    root.setAttribute('part', 'root');
    root.setAttribute('data-variant', 'default');

    const container = document.createElement('div');
    container.className = 'li-container';
    container.setAttribute('part', 'container');

    const rotor = document.createElement('div');
    rotor.className = 'li-rotor';
    rotor.setAttribute('part', 'rotor');

    const stack = document.createElement('div');
    stack.className = 'li-shape-stack';
    stack.setAttribute('part', 'shape-stack');

    const shapeA = document.createElement('lib-shape');
    shapeA.className = 'li-shape li-shape--a';
    shapeA.setAttribute('part', 'shape shape-a');
    shapeA.setAttribute('name', SHAPE_SEQUENCE[0]);
    shapeA.setAttribute('aria-hidden', 'true');

    const shapeB = document.createElement('lib-shape');
    shapeB.className = 'li-shape li-shape--b';
    shapeB.setAttribute('part', 'shape shape-b');
    shapeB.setAttribute('name', SHAPE_SEQUENCE[1]);
    shapeB.setAttribute('aria-hidden', 'true');

    stack.appendChild(shapeA);
    stack.appendChild(shapeB);
    rotor.appendChild(stack);
    container.appendChild(rotor);
    root.appendChild(container);
    root.setAttribute('data-front', 'a');
    root.setAttribute('data-phase', 'spin');
    this.shadowRoot!.appendChild(root);
    this._rootEl = root;
    this._containerEl = container;
    this._shapeA = shapeA;
    this._shapeB = shapeB;
  }

  private _syncAll(): void {
    this._syncA11y();
    this._syncVariant();
    this._syncDirection();
    this._syncTimingTokens();
    this._syncAnimationState();
  }

  private _syncA11y(): void {
    const label = this.getAttribute('aria-label')?.trim() || 'Loading';
    this.setAttribute('role', 'progressbar');
    this.setAttribute('aria-label', label);
    this.setAttribute('aria-busy', this.hasAttribute('paused') ? 'false' : 'true');
    this.setAttribute('aria-valuetext', label);
  }

  private _syncVariant(): void {
    if (!this._rootEl) return;
    this._rootEl.setAttribute('data-variant', this._resolveVariant());
  }

  private _syncAnimationState(): void {
    if (!this._rootEl || !this._shapeA || !this._shapeB) return;

    const shouldAnimate = !this.hasAttribute('paused') && !this._prefersReducedMotion();
    this._rootEl.toggleAttribute('data-animated', shouldAnimate);

    if (!shouldAnimate) {
      this._stopMorphLoop();
      this._shapeA.setAttribute('name', SHAPE_SEQUENCE[this._shapeIndex]);
      this._shapeB.setAttribute('name', SHAPE_SEQUENCE[(this._shapeIndex + 1) % SHAPE_SEQUENCE.length]);
      this._rootEl.setAttribute('data-front', this._frontSlot);
      this._rootEl.setAttribute('data-phase', 'spin');
      return;
    }

    this._startMorphLoop();
  }

  private _startMorphLoop(): void {
    if (this._phaseTimer != null || !this._rootEl) return;

    this._phase = 'spin';
    this._rootEl.setAttribute('data-phase', this._phase);
    this._scheduleNextPhase();
  }

  private _stopMorphLoop(): void {
    if (this._phaseTimer != null) {
      window.clearTimeout(this._phaseTimer);
      this._phaseTimer = null;
    }
    this._phase = 'spin';
    this._rootEl?.setAttribute('data-phase', 'spin');
  }

  private _advanceShape(): void {
    if (!this._rootEl || !this._shapeA || !this._shapeB) return;
    const nextShapeIndex = (this._shapeIndex + 1) % SHAPE_SEQUENCE.length;
    const incomingSlot = this._frontSlot === 'a' ? 'b' : 'a';
    const incomingEl = incomingSlot === 'a' ? this._shapeA : this._shapeB;
    incomingEl.setAttribute('name', SHAPE_SEQUENCE[nextShapeIndex]);
    this._shapeIndex = nextShapeIndex;
    this._frontSlot = incomingSlot;
    this._rootEl.setAttribute('data-front', this._frontSlot);
  }

  private _scheduleNextPhase(): void {
    if (!this._rootEl) return;

    const delay = this._phase === 'spin' ? SPIN_DURATION_MS : SPIN_SWAP_MS;
    this._phaseTimer = window.setTimeout(() => {
      if (!this._rootEl) return;

      if (this._phase === 'spin') {
        this._phase = 'spring-swap';
        this._rootEl.setAttribute('data-phase', this._phase);
        this._advanceShape();
      } else {
        this._phase = 'spin';
        this._rootEl.setAttribute('data-phase', this._phase);
      }

      this._scheduleNextPhase();
    }, delay);
  }

  private _setupReducedMotionListener(): void {
    if (typeof window === 'undefined' || !window.matchMedia || this._reducedMotionMediaQuery) return;
    this._reducedMotionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this._reducedMotionMediaQuery.addEventListener('change', this._onReducedMotionChange);
  }

  private _prefersReducedMotion(): boolean {
    return this._reducedMotionMediaQuery?.matches ?? false;
  }

  private _resolveVariant(): LoaderVariant {
    return this.getAttribute('variant')?.trim().toLowerCase() === 'contained' ? 'contained' : 'default';
  }

  private _syncTimingTokens(): void {
    this.style.setProperty('--lib-comp-loading-indicator-spring-duration', `${SPIN_SWAP_MS}ms`);
    this.style.setProperty('--lib-comp-loading-indicator-rotation-spring-duration', `${SPIN_SWAP_MS}ms`);
    this.style.setProperty('--lib-comp-loading-indicator-rotation-spin-duration', `${this._resolveSpinDurationMs()}ms`);
  }

  private _resolveSpinDurationMs(): number {
    const raw = this.getAttribute('duration')?.trim();
    if (!raw) return SPIN_ROTATION_MS;

    const numeric = this._parseDurationMs(raw);
    if (!Number.isFinite(numeric)) return SPIN_ROTATION_MS;
    return numeric;
  }

  private _parseDurationMs(value: string): number {
    const normalized = value.trim().toLowerCase();
    if (/^\d+(\.\d+)?$/.test(normalized)) return Number.parseFloat(normalized);
    if (/^\d+(\.\d+)?ms$/.test(normalized)) return Number.parseFloat(normalized);
    if (/^\d+(\.\d+)?s$/.test(normalized)) return Number.parseFloat(normalized) * 1000;
    return Number.NaN;
  }

  private _syncDirection(): void {
    const hostDir = this.getAttribute('dir')?.trim().toLowerCase();
    const nearestDir = this.closest('[dir]')?.getAttribute('dir')?.trim().toLowerCase();
    const computedDir = getComputedStyle(this).direction.toLowerCase();
    const direction = hostDir || nearestDir || computedDir;
    this.setAttribute('data-dir', direction === 'rtl' ? 'rtl' : 'ltr');
  }
}
