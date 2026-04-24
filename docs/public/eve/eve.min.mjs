var nt = class extends HTMLElement {
  _initialized = !1;
  get initialized() {
    return this._initialized;
  }
  connectedCallback() {
    this.hasAttribute("no-autoinit") || this.init();
  }
  disconnectedCallback() {
    this.destroy();
  }
  init() {
    this._initialized || (this.onInit(), this._initialized = !0);
  }
  destroy() {
    this._initialized && (this.onDestroy(), this._initialized = !1);
  }
};
function Z(e, t) {
  for (const [r, i] of Object.entries(t)) {
    if (i === void 0) {
      e.removeAttribute(r);
      continue;
    }
    if (typeof i == "boolean") {
      i ? e.setAttribute(r, "true") : e.removeAttribute(r);
      continue;
    }
    e.setAttribute(r, i);
  }
}
var qe = [
  "a[href]",
  "button:not([disabled])",
  'input:not([disabled]):not([type="hidden"])',
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])'
].join(",");
function de(e) {
  return Array.from(e.querySelectorAll(qe)).filter((t) => !t.hasAttribute("hidden") && t.closest("[hidden],[inert]") === null);
}
function Ti(e, t = {}) {
  const r = document.activeElement instanceof HTMLElement ? document.activeElement : null, i = () => {
    const a = de(e);
    a.length && a[0]?.focus();
  }, n = (a) => {
    if (a.key !== "Tab") return;
    const o = de(e);
    if (o.length === 0) return;
    const l = o[0], d = o[o.length - 1], h = document.activeElement;
    a.shiftKey ? h === l && (a.preventDefault(), d?.focus()) : h === d && (a.preventDefault(), l?.focus());
  };
  return e.addEventListener("keydown", n), queueMicrotask(() => i()), () => {
    e.removeEventListener("keydown", n);
    const a = t.returnFocusTo ?? r;
    a?.isConnected && a.focus();
  };
}
var Ei = "lib";
function et(e) {
  return `lib-${e}`;
}
function Mi(e) {
  return `--lib-${e}`;
}
function Se(e) {
  return `lib-${e}`;
}
function wt(e) {
  return `lib-${e}`;
}
var zt = Se("focus-visible"), Bt = 0, Xt = null;
function Di(e = document.documentElement) {
  if (Bt += 1, Bt === 1) {
    let t = !1;
    const r = (a) => {
      a.metaKey || a.altKey || a.ctrlKey || (a.key === "Tab" || a.key.startsWith("Arrow")) && (t = !0, e.classList.add(zt));
    }, i = () => {
      t = !1, e.classList.remove(zt);
    }, n = () => {
      t && e.classList.add(zt);
    };
    document.addEventListener("keydown", r, !0), document.addEventListener("pointerdown", i, !0), document.addEventListener("focusin", n, !0), Xt = () => {
      document.removeEventListener("keydown", r, !0), document.removeEventListener("pointerdown", i, !0), document.removeEventListener("focusin", n, !0);
    };
  }
  return () => {
    Bt -= 1, Bt === 0 && (Xt?.(), Xt = null, e.classList.remove(zt));
  };
}
var Lt = null;
function Ue() {
  if (Lt) return Lt;
  const e = document.createElement("div");
  return e.setAttribute("aria-live", "polite"), e.setAttribute("aria-atomic", "true"), e.style.position = "absolute", e.style.width = "1px", e.style.height = "1px", e.style.overflow = "hidden", e.style.clip = "rect(0 0 0 0)", e.style.whiteSpace = "nowrap", e.style.clipPath = "inset(50%)", document.body.appendChild(e), Lt = e, e;
}
var Ii = class {
  static announce(e, t = "polite") {
    const r = Ue();
    r.setAttribute("aria-live", t), r.textContent = "", window.setTimeout(() => {
      r.textContent = e;
    }, 16);
  }
  static destroy() {
    Lt?.remove(), Lt = null;
  }
}, st = "lib-icon", B = {
  check: `${st}-check`,
  close: `${st}-close`,
  menu: `${st}-menu`,
  chevronRight: `${st}-chevron-right`,
  visibility: `${st}-visibility`,
  visibilityOff: `${st}-visibility-off`,
  refresh: `${st}-refresh`
}, Le = `${st}-sprite`, Ge = {
  [B.check]: '<path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>',
  [B.close]: '<path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>',
  [B.menu]: '<path fill="currentColor" d="M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"/>',
  [B.chevronRight]: '<path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>',
  [B.visibility]: '<path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>',
  [B.visibilityOff]: '<path fill="currentColor" d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.45.45C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.42-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2z"/>',
  [B.refresh]: '<path fill="currentColor" d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08a5.99 5.99 0 0 1-5.65 3.3c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>'
};
function je(e) {
  const t = e.createElement("div");
  return t.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" id="${Le}" aria-hidden="true" width="0" height="0" style="position:absolute;overflow:hidden;clip:rect(0 0 0 0)"><defs>${Object.entries(Ge).map(([r, i]) => `<symbol id="${r}" viewBox="0 0 24 24">${i}</symbol>`).join("")}</defs></svg>`, t.firstElementChild;
}
function Mt(e = document.body) {
  const t = e instanceof Document ? e.body : e, r = t.ownerDocument ?? document;
  t.querySelector(`#${Le}`) || t.appendChild(je(r));
}
function pt(e) {
  return `#${e}`;
}
var Te = {
  minLength: 0,
  minLowercase: 0,
  minUppercase: 0,
  minDigit: 0,
  minSpecial: 0
}, he = "abcdefghijklmnopqrstuvwxyz", pe = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", me = "0123456789", be = "!@#$%^&*()-_=+[]{}:,.?";
function Pt(e) {
  if (e == null || e === "") return 0;
  const t = parseInt(e, 10);
  return Number.isFinite(t) && t >= 0 ? t : 0;
}
function Zt(e) {
  return {
    minLength: Pt(e.getAttribute("password-min-length")),
    minLowercase: Pt(e.getAttribute("password-min-lower")),
    minUppercase: Pt(e.getAttribute("password-min-upper")),
    minDigit: Pt(e.getAttribute("password-min-digit")),
    minSpecial: Pt(e.getAttribute("password-min-special"))
  };
}
function Jt(e) {
  return e.minLength > 0 || e.minLowercase > 0 || e.minUppercase > 0 || e.minDigit > 0 || e.minSpecial > 0;
}
function Ft(e, t) {
  const r = e.match(t);
  return r ? r.length : 0;
}
function Ye(e) {
  return Ft(e, /[^A-Za-z0-9]/g);
}
function Ke(e, t) {
  const r = {
    ...Te,
    ...t
  };
  if (!Jt(r)) return { valid: !0 };
  const i = e.length, n = Ft(e, /[a-z]/g), a = Ft(e, /[A-Z]/g), o = Ft(e, /[0-9]/g), l = Ye(e);
  return r.minLength > 0 && i < r.minLength ? {
    valid: !1,
    code: "length",
    message: `Au moins ${r.minLength} caractère(s) requis (actuellement ${i}).`
  } : r.minLowercase > 0 && n < r.minLowercase ? {
    valid: !1,
    code: "lower",
    message: `Au moins ${r.minLowercase} minuscule(s) requise(s).`
  } : r.minUppercase > 0 && a < r.minUppercase ? {
    valid: !1,
    code: "upper",
    message: `Au moins ${r.minUppercase} majuscule(s) requise(s).`
  } : r.minDigit > 0 && o < r.minDigit ? {
    valid: !1,
    code: "digit",
    message: `Au moins ${r.minDigit} chiffre(s) requis.`
  } : r.minSpecial > 0 && l < r.minSpecial ? {
    valid: !1,
    code: "special",
    message: `Au moins ${r.minSpecial} caractère(s) spécial(aux) requis.`
  } : { valid: !0 };
}
function kt(e, t) {
  return e[Math.floor(t() * e.length)] ?? e[0] ?? "a";
}
function Xe(e) {
  if (typeof crypto < "u" && crypto.getRandomValues) {
    const t = new Uint32Array(1);
    return crypto.getRandomValues(t), t[0] % e;
  }
  return Math.floor(Math.random() * e);
}
function Ze(e) {
  for (let t = e.length - 1; t > 0; t--) {
    const r = Xe(t + 1);
    [e[t], e[r]] = [e[r], e[t]];
  }
}
function ge(e) {
  const t = {
    ...Te,
    ...e
  }, r = t.minLowercase, i = t.minUppercase, n = t.minDigit, a = t.minSpecial, o = he + pe + me + be, l = () => {
    if (typeof crypto < "u" && crypto.getRandomValues) {
      const u = new Uint32Array(1);
      return crypto.getRandomValues(u), (u[0] + 0.5) / 4294967296;
    }
    return Math.random();
  }, d = [];
  for (let u = 0; u < r; u++) d.push(kt(he, l));
  for (let u = 0; u < i; u++) d.push(kt(pe, l));
  for (let u = 0; u < n; u++) d.push(kt(me, l));
  for (let u = 0; u < a; u++) d.push(kt(be, l));
  let h = Math.max(t.minLength, d.length, r + i + n + a);
  for (; d.length < h; ) d.push(kt(o, l));
  return Ze(d), d.join("");
}
var te = Se("ripple"), We = `${te}--active`, zi = class {
  host;
  options;
  onPointerDown;
  constructor(e, t) {
    this.host = e, this.options = {
      centered: t?.centered ?? !1,
      durationMs: t?.durationMs ?? 450
    }, this.onPointerDown = (r) => this.spawn(r);
  }
  init() {
    this.host.style.position ||= "relative", this.host.style.overflow ||= "hidden", this.host.addEventListener("pointerdown", this.onPointerDown);
  }
  destroy() {
    this.host.removeEventListener("pointerdown", this.onPointerDown), this.host.querySelectorAll(`.${te}`).forEach((e) => e.remove());
  }
  spawn(e) {
    const t = this.host.getBoundingClientRect(), r = Math.max(t.width, t.height) * 1.5, i = document.createElement("span");
    i.className = te, i.style.position = "absolute", i.style.width = `${r}px`, i.style.height = `${r}px`, i.style.borderRadius = "9999px", i.style.pointerEvents = "none", i.style.backgroundColor = "currentColor", i.style.opacity = "0.16", i.style.transform = "scale(0)", i.style.transition = `transform ${this.options.durationMs}ms ease, opacity ${this.options.durationMs}ms ease`;
    const n = this.options.centered ? t.width / 2 : e.clientX - t.left, a = this.options.centered ? t.height / 2 : e.clientY - t.top;
    i.style.left = `${n - r / 2}px`, i.style.top = `${a - r / 2}px`, this.host.appendChild(i), requestAnimationFrame(() => {
      i.classList.add(We), i.style.transform = "scale(1)", i.style.opacity = "0";
    }), window.setTimeout(() => i.remove(), this.options.durationMs + 80);
  }
};
function X(e) {
  return e < 0 ? -1 : e === 0 ? 0 : 1;
}
function Tt(e, t, r) {
  return (1 - r) * e + r * t;
}
function Qe(e, t, r) {
  return r < e ? e : r > t ? t : r;
}
function q(e, t, r) {
  return r < e ? e : r > t ? t : r;
}
function $t(e) {
  return e = e % 360, e < 0 && (e = e + 360), e;
}
function G(e) {
  return e = e % 360, e < 0 && (e = e + 360), e;
}
function Je(e, t) {
  return G(t - e) <= 180 ? 1 : -1;
}
function Ee(e, t) {
  return 180 - Math.abs(Math.abs(e - t) - 180);
}
function ee(e, t) {
  return [
    e[0] * t[0][0] + e[1] * t[0][1] + e[2] * t[0][2],
    e[0] * t[1][0] + e[1] * t[1][1] + e[2] * t[1][2],
    e[0] * t[2][0] + e[1] * t[2][1] + e[2] * t[2][2]
  ];
}
var Me = [
  [
    0.41233895,
    0.35762064,
    0.18051042
  ],
  [
    0.2126,
    0.7152,
    0.0722
  ],
  [
    0.01932141,
    0.11916382,
    0.95034478
  ]
], tr = [
  [
    3.2413774792388685,
    -1.5376652402851851,
    -0.49885366846268053
  ],
  [
    -0.9691452513005321,
    1.8758853451067872,
    0.04156585616912061
  ],
  [
    0.05562093689691305,
    -0.20395524564742123,
    1.0571799111220335
  ]
], oe = [
  95.047,
  100,
  108.883
];
function Ut(e, t, r) {
  return (255 << 24 | (e & 255) << 16 | (t & 255) << 8 | r & 255) >>> 0;
}
function fe(e) {
  return Ut(vt(e[0]), vt(e[1]), vt(e[2]));
}
function er(e) {
  return e >> 24 & 255;
}
function Gt(e) {
  return e >> 16 & 255;
}
function jt(e) {
  return e >> 8 & 255;
}
function Yt(e) {
  return e & 255;
}
function De(e, t, r) {
  const i = tr, n = i[0][0] * e + i[0][1] * t + i[0][2] * r, a = i[1][0] * e + i[1][1] * t + i[1][2] * r, o = i[2][0] * e + i[2][1] * t + i[2][2] * r;
  return Ut(vt(n), vt(a), vt(o));
}
function rr(e) {
  const t = it(Gt(e)), r = it(jt(e)), i = it(Yt(e));
  return ee([
    t,
    r,
    i
  ], Me);
}
function ir(e, t, r) {
  const i = oe, n = (e + 16) / 116, a = t / 500 + n, o = n - r / 200, l = Ht(a), d = Ht(n), h = Ht(o);
  return De(l * i[0], d * i[1], h * i[2]);
}
function Ie(e) {
  const t = it(Gt(e)), r = it(jt(e)), i = it(Yt(e)), n = Me, a = n[0][0] * t + n[0][1] * r + n[0][2] * i, o = n[1][0] * t + n[1][1] * r + n[1][2] * i, l = n[2][0] * t + n[2][1] * r + n[2][2] * i, d = oe, h = a / d[0], u = o / d[1], b = l / d[2], v = Et(h), g = Et(u), c = Et(b);
  return [
    116 * g - 16,
    500 * (v - g),
    200 * (g - c)
  ];
}
function nr(e) {
  const t = vt(ut(e));
  return Ut(t, t, t);
}
function re(e) {
  const t = rr(e)[1];
  return 116 * Et(t / 100) - 16;
}
function ut(e) {
  return 100 * Ht((e + 16) / 116);
}
function ie(e) {
  return Et(e / 100) * 116 - 16;
}
function it(e) {
  const t = e / 255;
  return t <= 0.040449936 ? t / 12.92 * 100 : Math.pow((t + 0.055) / 1.055, 2.4) * 100;
}
function vt(e) {
  const t = e / 100;
  let r = 0;
  return t <= 31308e-7 ? r = t * 12.92 : r = 1.055 * Math.pow(t, 1 / 2.4) - 0.055, Qe(0, 255, Math.round(r * 255));
}
function ar() {
  return oe;
}
function Et(e) {
  const t = 0.008856451679035631, r = 24389 / 27;
  return e > t ? Math.pow(e, 1 / 3) : (r * e + 16) / 116;
}
function Ht(e) {
  const t = 0.008856451679035631, r = 24389 / 27, i = e * e * e;
  return i > t ? i : (116 * e - 16) / r;
}
var dt = class ze {
  static make(t = ar(), r = 200 / Math.PI * ut(50) / 100, i = 50, n = 2, a = !1) {
    const o = t, l = o[0] * 0.401288 + o[1] * 0.650173 + o[2] * -0.051461, d = o[0] * -0.250268 + o[1] * 1.204414 + o[2] * 0.045854, h = o[0] * -2079e-6 + o[1] * 0.048952 + o[2] * 0.953127, u = 0.8 + n / 10, b = u >= 0.9 ? Tt(0.59, 0.69, (u - 0.9) * 10) : Tt(0.525, 0.59, (u - 0.8) * 10);
    let v = a ? 1 : u * (1 - 1 / 3.6 * Math.exp((-r - 42) / 92));
    v = v > 1 ? 1 : v < 0 ? 0 : v;
    const g = u, c = [
      v * (100 / l) + 1 - v,
      v * (100 / d) + 1 - v,
      v * (100 / h) + 1 - v
    ], f = 1 / (5 * r + 1), x = f * f * f * f, y = 1 - x, w = x * r + 0.1 * y * y * Math.cbrt(5 * r), E = ut(i) / t[1], F = 1.48 + Math.sqrt(E), z = 0.725 / Math.pow(E, 0.2), A = z, k = [
      Math.pow(w * c[0] * l / 100, 0.42),
      Math.pow(w * c[1] * d / 100, 0.42),
      Math.pow(w * c[2] * h / 100, 0.42)
    ], D = [
      400 * k[0] / (k[0] + 27.13),
      400 * k[1] / (k[1] + 27.13),
      400 * k[2] / (k[2] + 27.13)
    ];
    return new ze(E, (2 * D[0] + D[1] + 0.05 * D[2]) * z, z, A, b, g, c, w, Math.pow(w, 0.25), F);
  }
  constructor(t, r, i, n, a, o, l, d, h, u) {
    this.n = t, this.aw = r, this.nbb = i, this.ncb = n, this.c = a, this.nc = o, this.rgbD = l, this.fl = d, this.fLRoot = h, this.z = u;
  }
};
dt.DEFAULT = dt.make();
var tt = class lt {
  constructor(t, r, i, n, a, o, l, d, h) {
    this.hue = t, this.chroma = r, this.j = i, this.q = n, this.m = a, this.s = o, this.jstar = l, this.astar = d, this.bstar = h;
  }
  distance(t) {
    const r = this.jstar - t.jstar, i = this.astar - t.astar, n = this.bstar - t.bstar, a = Math.sqrt(r * r + i * i + n * n);
    return 1.41 * Math.pow(a, 0.63);
  }
  static fromInt(t) {
    return lt.fromIntInViewingConditions(t, dt.DEFAULT);
  }
  static fromIntInViewingConditions(t, r) {
    const i = (t & 16711680) >> 16, n = (t & 65280) >> 8, a = t & 255, o = it(i), l = it(n), d = it(a), h = 0.41233895 * o + 0.35762064 * l + 0.18051042 * d, u = 0.2126 * o + 0.7152 * l + 0.0722 * d, b = 0.01932141 * o + 0.11916382 * l + 0.95034478 * d, v = 0.401288 * h + 0.650173 * u - 0.051461 * b, g = -0.250268 * h + 1.204414 * u + 0.045854 * b, c = -2079e-6 * h + 0.048952 * u + 0.953127 * b, f = r.rgbD[0] * v, x = r.rgbD[1] * g, y = r.rgbD[2] * c, w = Math.pow(r.fl * Math.abs(f) / 100, 0.42), E = Math.pow(r.fl * Math.abs(x) / 100, 0.42), F = Math.pow(r.fl * Math.abs(y) / 100, 0.42), z = X(f) * 400 * w / (w + 27.13), A = X(x) * 400 * E / (E + 27.13), k = X(y) * 400 * F / (F + 27.13), D = (11 * z + -12 * A + k) / 11, R = (z + A - 2 * k) / 9, j = (20 * z + 20 * A + 21 * k) / 20, Y = (40 * z + 20 * A + k) / 20, O = Math.atan2(R, D) * 180 / Math.PI, K = G(O), at = K * Math.PI / 180, Dt = Y * r.nbb, mt = 100 * Math.pow(Dt / r.aw, r.c * r.z), Kt = 4 / r.c * Math.sqrt(mt / 100) * (r.aw + 4) * r.fLRoot, It = K < 20.14 ? K + 360 : K, Oe = 5e4 / 13 * (0.25 * (Math.cos(It * Math.PI / 180 + 2) + 3.8)) * r.nc * r.ncb * Math.sqrt(D * D + R * R) / (j + 0.305), se = Math.pow(Oe, 0.9) * Math.pow(1.64 - Math.pow(0.29, r.n), 0.73), le = se * Math.sqrt(mt / 100), ce = le * r.fLRoot, Ne = 50 * Math.sqrt(se * r.c / (r.aw + 4)), $e = 1.7000000000000002 * mt / (1 + 7e-3 * mt), ue = 1 / 0.0228 * Math.log(1 + 0.0228 * ce);
    return new lt(K, le, mt, Kt, ce, Ne, $e, ue * Math.cos(at), ue * Math.sin(at));
  }
  static fromJch(t, r, i) {
    return lt.fromJchInViewingConditions(t, r, i, dt.DEFAULT);
  }
  static fromJchInViewingConditions(t, r, i, n) {
    const a = 4 / n.c * Math.sqrt(t / 100) * (n.aw + 4) * n.fLRoot, o = r * n.fLRoot, l = r / Math.sqrt(t / 100), d = 50 * Math.sqrt(l * n.c / (n.aw + 4)), h = i * Math.PI / 180, u = 1.7000000000000002 * t / (1 + 7e-3 * t), b = 1 / 0.0228 * Math.log(1 + 0.0228 * o);
    return new lt(i, r, t, a, o, d, u, b * Math.cos(h), b * Math.sin(h));
  }
  static fromUcs(t, r, i) {
    return lt.fromUcsInViewingConditions(t, r, i, dt.DEFAULT);
  }
  static fromUcsInViewingConditions(t, r, i, n) {
    const a = r, o = i, l = Math.sqrt(a * a + o * o), d = (Math.exp(l * 0.0228) - 1) / 0.0228 / n.fLRoot;
    let h = Math.atan2(o, a) * (180 / Math.PI);
    h < 0 && (h += 360);
    const u = t / (1 - (t - 100) * 7e-3);
    return lt.fromJchInViewingConditions(u, d, h, n);
  }
  toInt() {
    return this.viewed(dt.DEFAULT);
  }
  viewed(t) {
    const r = this.chroma === 0 || this.j === 0 ? 0 : this.chroma / Math.sqrt(this.j / 100), i = Math.pow(r / Math.pow(1.64 - Math.pow(0.29, t.n), 0.73), 1 / 0.9), n = this.hue * Math.PI / 180, a = 0.25 * (Math.cos(n + 2) + 3.8), o = t.aw * Math.pow(this.j / 100, 1 / t.c / t.z), l = a * (5e4 / 13) * t.nc * t.ncb, d = o / t.nbb, h = Math.sin(n), u = Math.cos(n), b = 23 * (d + 0.305) * i / (23 * l + 11 * i * u + 108 * i * h), v = b * u, g = b * h, c = (460 * d + 451 * v + 288 * g) / 1403, f = (460 * d - 891 * v - 261 * g) / 1403, x = (460 * d - 220 * v - 6300 * g) / 1403, y = Math.max(0, 27.13 * Math.abs(c) / (400 - Math.abs(c))), w = X(c) * (100 / t.fl) * Math.pow(y, 1 / 0.42), E = Math.max(0, 27.13 * Math.abs(f) / (400 - Math.abs(f))), F = X(f) * (100 / t.fl) * Math.pow(E, 1 / 0.42), z = Math.max(0, 27.13 * Math.abs(x) / (400 - Math.abs(x))), A = X(x) * (100 / t.fl) * Math.pow(z, 1 / 0.42), k = w / t.rgbD[0], D = F / t.rgbD[1], R = A / t.rgbD[2], j = 1.86206786 * k - 1.01125463 * D + 0.14918677 * R, Y = 0.38752654 * k + 0.62144744 * D - 897398e-8 * R, O = -0.0158415 * k - 0.03412294 * D + 1.04996444 * R;
    return De(j, Y, O);
  }
  static fromXyzInViewingConditions(t, r, i, n) {
    const a = 0.401288 * t + 0.650173 * r - 0.051461 * i, o = -0.250268 * t + 1.204414 * r + 0.045854 * i, l = -2079e-6 * t + 0.048952 * r + 0.953127 * i, d = n.rgbD[0] * a, h = n.rgbD[1] * o, u = n.rgbD[2] * l, b = Math.pow(n.fl * Math.abs(d) / 100, 0.42), v = Math.pow(n.fl * Math.abs(h) / 100, 0.42), g = Math.pow(n.fl * Math.abs(u) / 100, 0.42), c = X(d) * 400 * b / (b + 27.13), f = X(h) * 400 * v / (v + 27.13), x = X(u) * 400 * g / (g + 27.13), y = (11 * c + -12 * f + x) / 11, w = (c + f - 2 * x) / 9, E = (20 * c + 20 * f + 21 * x) / 20, F = (40 * c + 20 * f + x) / 20, z = Math.atan2(w, y) * 180 / Math.PI, A = z < 0 ? z + 360 : z >= 360 ? z - 360 : z, k = A * Math.PI / 180, D = F * n.nbb, R = 100 * Math.pow(D / n.aw, n.c * n.z), j = 4 / n.c * Math.sqrt(R / 100) * (n.aw + 4) * n.fLRoot, Y = A < 20.14 ? A + 360 : A, O = 5e4 / 13 * (1 / 4 * (Math.cos(Y * Math.PI / 180 + 2) + 3.8)) * n.nc * n.ncb * Math.sqrt(y * y + w * w) / (E + 0.305), K = Math.pow(O, 0.9) * Math.pow(1.64 - Math.pow(0.29, n.n), 0.73), at = K * Math.sqrt(R / 100), Dt = at * n.fLRoot, mt = 50 * Math.sqrt(K * n.c / (n.aw + 4)), Kt = 1.7000000000000002 * R / (1 + 7e-3 * R), It = Math.log(1 + 0.0228 * Dt) / 0.0228;
    return new lt(A, at, R, j, Dt, mt, Kt, It * Math.cos(k), It * Math.sin(k));
  }
  xyzInViewingConditions(t) {
    const r = this.chroma === 0 || this.j === 0 ? 0 : this.chroma / Math.sqrt(this.j / 100), i = Math.pow(r / Math.pow(1.64 - Math.pow(0.29, t.n), 0.73), 1 / 0.9), n = this.hue * Math.PI / 180, a = 0.25 * (Math.cos(n + 2) + 3.8), o = t.aw * Math.pow(this.j / 100, 1 / t.c / t.z), l = a * (5e4 / 13) * t.nc * t.ncb, d = o / t.nbb, h = Math.sin(n), u = Math.cos(n), b = 23 * (d + 0.305) * i / (23 * l + 11 * i * u + 108 * i * h), v = b * u, g = b * h, c = (460 * d + 451 * v + 288 * g) / 1403, f = (460 * d - 891 * v - 261 * g) / 1403, x = (460 * d - 220 * v - 6300 * g) / 1403, y = Math.max(0, 27.13 * Math.abs(c) / (400 - Math.abs(c))), w = X(c) * (100 / t.fl) * Math.pow(y, 1 / 0.42), E = Math.max(0, 27.13 * Math.abs(f) / (400 - Math.abs(f))), F = X(f) * (100 / t.fl) * Math.pow(E, 1 / 0.42), z = Math.max(0, 27.13 * Math.abs(x) / (400 - Math.abs(x))), A = X(x) * (100 / t.fl) * Math.pow(z, 1 / 0.42), k = w / t.rgbD[0], D = F / t.rgbD[1], R = A / t.rgbD[2];
    return [
      1.86206786 * k - 1.01125463 * D + 0.14918677 * R,
      0.38752654 * k + 0.62144744 * D - 897398e-8 * R,
      -0.0158415 * k - 0.03412294 * D + 1.04996444 * R
    ];
  }
}, ht = class M {
  static sanitizeRadians(t) {
    return (t + Math.PI * 8) % (Math.PI * 2);
  }
  static trueDelinearized(t) {
    const r = t / 100;
    let i = 0;
    return r <= 31308e-7 ? i = r * 12.92 : i = 1.055 * Math.pow(r, 1 / 2.4) - 0.055, i * 255;
  }
  static chromaticAdaptation(t) {
    const r = Math.pow(Math.abs(t), 0.42);
    return X(t) * 400 * r / (r + 27.13);
  }
  static hueOf(t) {
    const r = ee(t, M.SCALED_DISCOUNT_FROM_LINRGB), i = M.chromaticAdaptation(r[0]), n = M.chromaticAdaptation(r[1]), a = M.chromaticAdaptation(r[2]), o = (11 * i + -12 * n + a) / 11, l = (i + n - 2 * a) / 9;
    return Math.atan2(l, o);
  }
  static areInCyclicOrder(t, r, i) {
    return M.sanitizeRadians(r - t) < M.sanitizeRadians(i - t);
  }
  static intercept(t, r, i) {
    return (r - t) / (i - t);
  }
  static lerpPoint(t, r, i) {
    return [
      t[0] + (i[0] - t[0]) * r,
      t[1] + (i[1] - t[1]) * r,
      t[2] + (i[2] - t[2]) * r
    ];
  }
  static setCoordinate(t, r, i, n) {
    const a = M.intercept(t[n], r, i[n]);
    return M.lerpPoint(t, a, i);
  }
  static isBounded(t) {
    return 0 <= t && t <= 100;
  }
  static nthVertex(t, r) {
    const i = M.Y_FROM_LINRGB[0], n = M.Y_FROM_LINRGB[1], a = M.Y_FROM_LINRGB[2], o = r % 4 <= 1 ? 0 : 100, l = r % 2 === 0 ? 0 : 100;
    if (r < 4) {
      const d = o, h = l, u = (t - d * n - h * a) / i;
      return M.isBounded(u) ? [
        u,
        d,
        h
      ] : [
        -1,
        -1,
        -1
      ];
    } else if (r < 8) {
      const d = o, h = l, u = (t - h * i - d * a) / n;
      return M.isBounded(u) ? [
        h,
        u,
        d
      ] : [
        -1,
        -1,
        -1
      ];
    } else {
      const d = o, h = l, u = (t - d * i - h * n) / a;
      return M.isBounded(u) ? [
        d,
        h,
        u
      ] : [
        -1,
        -1,
        -1
      ];
    }
  }
  static bisectToSegment(t, r) {
    let i = [
      -1,
      -1,
      -1
    ], n = i, a = 0, o = 0, l = !1, d = !0;
    for (let h = 0; h < 12; h++) {
      const u = M.nthVertex(t, h);
      if (u[0] < 0) continue;
      const b = M.hueOf(u);
      if (!l) {
        i = u, n = u, a = b, o = b, l = !0;
        continue;
      }
      (d || M.areInCyclicOrder(a, b, o)) && (d = !1, M.areInCyclicOrder(a, r, b) ? (n = u, o = b) : (i = u, a = b));
    }
    return [i, n];
  }
  static midpoint(t, r) {
    return [
      (t[0] + r[0]) / 2,
      (t[1] + r[1]) / 2,
      (t[2] + r[2]) / 2
    ];
  }
  static criticalPlaneBelow(t) {
    return Math.floor(t - 0.5);
  }
  static criticalPlaneAbove(t) {
    return Math.ceil(t - 0.5);
  }
  static bisectToLimit(t, r) {
    const i = M.bisectToSegment(t, r);
    let n = i[0], a = M.hueOf(n), o = i[1];
    for (let l = 0; l < 3; l++) if (n[l] !== o[l]) {
      let d = -1, h = 255;
      n[l] < o[l] ? (d = M.criticalPlaneBelow(M.trueDelinearized(n[l])), h = M.criticalPlaneAbove(M.trueDelinearized(o[l]))) : (d = M.criticalPlaneAbove(M.trueDelinearized(n[l])), h = M.criticalPlaneBelow(M.trueDelinearized(o[l])));
      for (let u = 0; u < 8 && !(Math.abs(h - d) <= 1); u++) {
        const b = Math.floor((d + h) / 2), v = M.CRITICAL_PLANES[b], g = M.setCoordinate(n, v, o, l), c = M.hueOf(g);
        M.areInCyclicOrder(a, r, c) ? (o = g, h = b) : (n = g, a = c, d = b);
      }
    }
    return M.midpoint(n, o);
  }
  static inverseChromaticAdaptation(t) {
    const r = Math.abs(t), i = Math.max(0, 27.13 * r / (400 - r));
    return X(t) * Math.pow(i, 1 / 0.42);
  }
  static findResultByJ(t, r, i) {
    let n = Math.sqrt(i) * 11;
    const a = dt.DEFAULT, o = 1 / Math.pow(1.64 - Math.pow(0.29, a.n), 0.73), l = 0.25 * (Math.cos(t + 2) + 3.8) * (5e4 / 13) * a.nc * a.ncb, d = Math.sin(t), h = Math.cos(t);
    for (let u = 0; u < 5; u++) {
      const b = n / 100, v = r === 0 || n === 0 ? 0 : r / Math.sqrt(b), g = Math.pow(v * o, 1 / 0.9), c = a.aw * Math.pow(b, 1 / a.c / a.z) / a.nbb, f = 23 * (c + 0.305) * g / (23 * l + 11 * g * h + 108 * g * d), x = f * h, y = f * d, w = (460 * c + 451 * x + 288 * y) / 1403, E = (460 * c - 891 * x - 261 * y) / 1403, F = (460 * c - 220 * x - 6300 * y) / 1403, z = M.inverseChromaticAdaptation(w), A = M.inverseChromaticAdaptation(E), k = M.inverseChromaticAdaptation(F), D = ee([
        z,
        A,
        k
      ], M.LINRGB_FROM_SCALED_DISCOUNT);
      if (D[0] < 0 || D[1] < 0 || D[2] < 0) return 0;
      const R = M.Y_FROM_LINRGB[0], j = M.Y_FROM_LINRGB[1], Y = M.Y_FROM_LINRGB[2], O = R * D[0] + j * D[1] + Y * D[2];
      if (O <= 0) return 0;
      if (u === 4 || Math.abs(O - i) < 2e-3)
        return D[0] > 100.01 || D[1] > 100.01 || D[2] > 100.01 ? 0 : fe(D);
      n = n - (O - i) * n / (2 * O);
    }
    return 0;
  }
  static solveToInt(t, r, i) {
    if (r < 1e-4 || i < 1e-4 || i > 99.9999) return nr(i);
    t = G(t);
    const n = t / 180 * Math.PI, a = ut(i), o = M.findResultByJ(n, r, a);
    if (o !== 0) return o;
    const l = M.bisectToLimit(a, n);
    return fe(l);
  }
  static solveToCam(t, r, i) {
    return tt.fromInt(M.solveToInt(t, r, i));
  }
};
ht.SCALED_DISCOUNT_FROM_LINRGB = [
  [
    0.001200833568784504,
    0.002389694492170889,
    2795742885861124e-19
  ],
  [
    5891086651375999e-19,
    0.0029785502573438758,
    3270666104008398e-19
  ],
  [
    10146692491640572e-20,
    5364214359186694e-19,
    0.0032979401770712076
  ]
];
ht.LINRGB_FROM_SCALED_DISCOUNT = [
  [
    1373.2198709594231,
    -1100.4251190754821,
    -7.278681089101213
  ],
  [
    -271.815969077903,
    559.6580465940733,
    -32.46047482791194
  ],
  [
    1.9622899599665666,
    -57.173814538844006,
    308.7233197812385
  ]
];
ht.Y_FROM_LINRGB = [
  0.2126,
  0.7152,
  0.0722
];
ht.CRITICAL_PLANES = [
  0.015176349177441876,
  0.045529047532325624,
  0.07588174588720938,
  0.10623444424209313,
  0.13658714259697685,
  0.16693984095186062,
  0.19729253930674434,
  0.2276452376616281,
  0.2579979360165119,
  0.28835063437139563,
  0.3188300904430532,
  0.350925934958123,
  0.3848314933096426,
  0.42057480301049466,
  0.458183274052838,
  0.4976837250274023,
  0.5391024159806381,
  0.5824650784040898,
  0.6277969426914107,
  0.6751227633498623,
  0.7244668422128921,
  0.775853049866786,
  0.829304845476233,
  0.8848452951698498,
  0.942497089126609,
  1.0022825574869039,
  1.0642236851973577,
  1.1283421258858297,
  1.1946592148522128,
  1.2631959812511864,
  1.3339731595349034,
  1.407011200216447,
  1.4823302800086415,
  1.5599503113873272,
  1.6398909516233677,
  1.7221716113234105,
  1.8068114625156377,
  1.8938294463134073,
  1.9832442801866852,
  2.075074464868551,
  2.1693382909216234,
  2.2660538449872063,
  2.36523901573795,
  2.4669114995532007,
  2.5710888059345764,
  2.6777882626779785,
  2.7870270208169257,
  2.898822059350997,
  3.0131901897720907,
  3.1301480604002863,
  3.2497121605402226,
  3.3718988244681087,
  3.4967242352587946,
  3.624204428461639,
  3.754355295633311,
  3.887192587735158,
  4.022731918402185,
  4.160988767090289,
  4.301978482107941,
  4.445716283538092,
  4.592217266055746,
  4.741496401646282,
  4.893568542229298,
  5.048448422192488,
  5.20615066083972,
  5.3666897647573375,
  5.5300801301023865,
  5.696336044816294,
  5.865471690767354,
  6.037501145825082,
  6.212438385869475,
  6.390297286737924,
  6.571091626112461,
  6.7548350853498045,
  6.941541251256611,
  7.131223617812143,
  7.323895587840543,
  7.5195704746346665,
  7.7182615035334345,
  7.919981813454504,
  8.124744458384042,
  8.332562408825165,
  8.543448553206703,
  8.757415699253682,
  8.974476575321063,
  9.194643831691977,
  9.417930041841839,
  9.644347703669503,
  9.873909240696694,
  10.106627003236781,
  10.342513269534024,
  10.58158024687427,
  10.8238400726681,
  11.069304815507364,
  11.317986476196008,
  11.569896988756009,
  11.825048221409341,
  12.083451977536606,
  12.345119996613247,
  12.610063955123938,
  12.878295467455942,
  13.149826086772048,
  13.42466730586372,
  13.702830557985108,
  13.984327217668513,
  14.269168601521828,
  14.55736596900856,
  14.848930523210871,
  15.143873411576273,
  15.44220572664832,
  15.743938506781891,
  16.04908273684337,
  16.35764934889634,
  16.66964922287304,
  16.985093187232053,
  17.30399201960269,
  17.62635644741625,
  17.95219714852476,
  18.281524751807332,
  18.614349837764564,
  18.95068293910138,
  19.290534541298456,
  19.633915083172692,
  19.98083495742689,
  20.331304511189067,
  20.685334046541502,
  21.042933821039977,
  21.404114048223256,
  21.76888489811322,
  22.137256497705877,
  22.50923893145328,
  22.884842241736916,
  23.264076429332462,
  23.6469514538663,
  24.033477234264016,
  24.42366364919083,
  24.817520537484558,
  25.21505769858089,
  25.61628489293138,
  26.021211842414342,
  26.429848230738664,
  26.842203703840827,
  27.258287870275353,
  27.678110301598522,
  28.10168053274597,
  28.529008062403893,
  28.96010235337422,
  29.39497283293396,
  29.83362889318845,
  30.276079891419332,
  30.722335150426627,
  31.172403958865512,
  31.62629557157785,
  32.08401920991837,
  32.54558406207592,
  33.010999283389665,
  33.4802739966603,
  33.953417292456834,
  34.430438229418264,
  34.911345834551085,
  35.39614910352207,
  35.88485700094671,
  36.37747846067349,
  36.87402238606382,
  37.37449765026789,
  37.87891309649659,
  38.38727753828926,
  38.89959975977785,
  39.41588851594697,
  39.93615253289054,
  40.460400508064545,
  40.98864111053629,
  41.520882981230194,
  42.05713473317016,
  42.597404951718396,
  43.141702194811224,
  43.6900349931913,
  44.24241185063697,
  44.798841244188324,
  45.35933162437017,
  45.92389141541209,
  46.49252901546552,
  47.065252796817916,
  47.64207110610409,
  48.22299226451468,
  48.808024568002054,
  49.3971762874833,
  49.9904556690408,
  50.587870934119984,
  51.189430279724725,
  51.79514187861014,
  52.40501387947288,
  53.0190544071392,
  53.637271562750364,
  54.259673423945976,
  54.88626804504493,
  55.517063457223934,
  56.15206766869424,
  56.79128866487574,
  57.43473440856916,
  58.08241284012621,
  58.734331877617365,
  59.39049941699807,
  60.05092333227251,
  60.715611475655585,
  61.38457167773311,
  62.057811747619894,
  62.7353394731159,
  63.417162620860914,
  64.10328893648692,
  64.79372614476921,
  65.48848194977529,
  66.18756403501224,
  66.89098006357258,
  67.59873767827808,
  68.31084450182222,
  69.02730813691093,
  69.74813616640164,
  70.47333615344107,
  71.20291564160104,
  71.93688215501312,
  72.67524319850172,
  73.41800625771542,
  74.16517879925733,
  74.9167682708136,
  75.67278210128072,
  76.43322770089146,
  77.1981124613393,
  77.96744375590167,
  78.74122893956174,
  79.51947534912904,
  80.30219030335869,
  81.08938110306934,
  81.88105503125999,
  82.67721935322541,
  83.4778813166706,
  84.28304815182372,
  85.09272707154808,
  85.90692527145302,
  86.72564993000343,
  87.54890820862819,
  88.3767072518277,
  89.2090541872801,
  90.04595612594655,
  90.88742016217518,
  91.73345337380438,
  92.58406282226491,
  93.43925555268066,
  94.29903859396902,
  95.16341895893969,
  96.03240364439274,
  96.9059996312159,
  97.78421388448044,
  98.6670533535366,
  99.55452497210776
];
var L = class Vt {
  static from(t, r, i) {
    return new Vt(ht.solveToInt(t, r, i));
  }
  static fromInt(t) {
    return new Vt(t);
  }
  toInt() {
    return this.argb;
  }
  get hue() {
    return this.internalHue;
  }
  set hue(t) {
    this.setInternalState(ht.solveToInt(t, this.internalChroma, this.internalTone));
  }
  get chroma() {
    return this.internalChroma;
  }
  set chroma(t) {
    this.setInternalState(ht.solveToInt(this.internalHue, t, this.internalTone));
  }
  get tone() {
    return this.internalTone;
  }
  set tone(t) {
    this.setInternalState(ht.solveToInt(this.internalHue, this.internalChroma, t));
  }
  setValue(t, r) {
    this[t] = r;
  }
  toString() {
    return `HCT(${this.hue.toFixed(0)}, ${this.chroma.toFixed(0)}, ${this.tone.toFixed(0)})`;
  }
  static isBlue(t) {
    return t >= 250 && t < 270;
  }
  static isYellow(t) {
    return t >= 105 && t < 125;
  }
  static isCyan(t) {
    return t >= 170 && t < 207;
  }
  constructor(t) {
    this.argb = t;
    const r = tt.fromInt(t);
    this.internalHue = r.hue, this.internalChroma = r.chroma, this.internalTone = re(t), this.argb = t;
  }
  setInternalState(t) {
    const r = tt.fromInt(t);
    this.internalHue = r.hue, this.internalChroma = r.chroma, this.internalTone = re(t), this.argb = t;
  }
  inViewingConditions(t) {
    const r = tt.fromInt(this.toInt()).xyzInViewingConditions(t), i = tt.fromXyzInViewingConditions(r[0], r[1], r[2], dt.make());
    return Vt.from(i.hue, i.chroma, ie(r[1]));
  }
}, or = class Be {
  static harmonize(t, r) {
    const i = L.fromInt(t), n = L.fromInt(r), a = Ee(i.hue, n.hue), o = Math.min(a * 0.5, 15), l = G(i.hue + o * Je(i.hue, n.hue));
    return L.from(l, i.chroma, i.tone).toInt();
  }
  static hctHue(t, r, i) {
    const n = Be.cam16Ucs(t, r, i), a = tt.fromInt(n), o = tt.fromInt(t);
    return L.from(a.hue, o.chroma, re(t)).toInt();
  }
  static cam16Ucs(t, r, i) {
    const n = tt.fromInt(t), a = tt.fromInt(r), o = n.jstar, l = n.astar, d = n.bstar, h = a.jstar, u = a.astar, b = a.bstar, v = o + (h - o) * i, g = l + (u - l) * i, c = d + (b - d) * i;
    return tt.fromUcs(v, g, c).toInt();
  }
}, $ = class xt {
  static ratioOfTones(t, r) {
    return t = q(0, 100, t), r = q(0, 100, r), xt.ratioOfYs(ut(t), ut(r));
  }
  static ratioOfYs(t, r) {
    const i = t > r ? t : r, n = i === r ? t : r;
    return (i + 5) / (n + 5);
  }
  static lighter(t, r) {
    if (t < 0 || t > 100) return -1;
    const i = ut(t), n = r * (i + 5) - 5, a = xt.ratioOfYs(n, i), o = Math.abs(a - r);
    if (a < r && o > 0.04) return -1;
    const l = ie(n) + 0.4;
    return l < 0 || l > 100 ? -1 : l;
  }
  static darker(t, r) {
    if (t < 0 || t > 100) return -1;
    const i = ut(t), n = (i + 5) / r - 5, a = xt.ratioOfYs(i, n), o = Math.abs(a - r);
    if (a < r && o > 0.04) return -1;
    const l = ie(n) - 0.4;
    return l < 0 || l > 100 ? -1 : l;
  }
  static lighterUnsafe(t, r) {
    const i = xt.lighter(t, r);
    return i < 0 ? 100 : i;
  }
  static darkerUnsafe(t, r) {
    const i = xt.darker(t, r);
    return i < 0 ? 0 : i;
  }
}, ne = class Re {
  static isDisliked(t) {
    const r = Math.round(t.hue) >= 90 && Math.round(t.hue) <= 111, i = Math.round(t.chroma) > 16, n = Math.round(t.tone) < 65;
    return r && i && n;
  }
  static fixIfDisliked(t) {
    return Re.isDisliked(t) ? L.from(t.hue, t.chroma, 70) : t;
  }
};
function sr(e, t, r) {
  if (e.name !== r.name) throw new Error(`Attempting to extend color ${e.name} with color ${r.name} of different name for spec version ${t}.`);
  if (e.isBackground !== r.isBackground) throw new Error(`Attempting to extend color ${e.name} as a ${e.isBackground ? "background" : "foreground"} with color ${r.name} as a ${r.isBackground ? "background" : "foreground"} for spec version ${t}.`);
}
function T(e, t, r) {
  return sr(e, t, r), p.fromPalette({
    name: e.name,
    palette: (i) => i.specVersion === t ? r.palette(i) : e.palette(i),
    tone: (i) => i.specVersion === t ? r.tone(i) : e.tone(i),
    isBackground: e.isBackground,
    chromaMultiplier: (i) => {
      const n = i.specVersion === t ? r.chromaMultiplier : e.chromaMultiplier;
      return n !== void 0 ? n(i) : 1;
    },
    background: (i) => {
      const n = i.specVersion === t ? r.background : e.background;
      return n !== void 0 ? n(i) : void 0;
    },
    secondBackground: (i) => {
      const n = i.specVersion === t ? r.secondBackground : e.secondBackground;
      return n !== void 0 ? n(i) : void 0;
    },
    contrastCurve: (i) => {
      const n = i.specVersion === t ? r.contrastCurve : e.contrastCurve;
      return n !== void 0 ? n(i) : void 0;
    },
    toneDeltaPair: (i) => {
      const n = i.specVersion === t ? r.toneDeltaPair : e.toneDeltaPair;
      return n !== void 0 ? n(i) : void 0;
    }
  });
}
var p = class gt {
  static fromPalette(t) {
    return new gt(t.name ?? "", t.palette, t.tone ?? gt.getInitialToneFromBackground(t.background), t.isBackground ?? !1, t.chromaMultiplier, t.background, t.secondBackground, t.contrastCurve, t.toneDeltaPair);
  }
  static getInitialToneFromBackground(t) {
    return t === void 0 ? (r) => 50 : (r) => t(r) ? t(r).getTone(r) : 50;
  }
  constructor(t, r, i, n, a, o, l, d, h) {
    if (this.name = t, this.palette = r, this.tone = i, this.isBackground = n, this.chromaMultiplier = a, this.background = o, this.secondBackground = l, this.contrastCurve = d, this.toneDeltaPair = h, this.hctCache = /* @__PURE__ */ new Map(), !o && l) throw new Error(`Color ${t} has secondBackgrounddefined, but background is not defined.`);
    if (!o && d) throw new Error(`Color ${t} has contrastCurvedefined, but background is not defined.`);
    if (o && !d) throw new Error(`Color ${t} has backgrounddefined, but contrastCurve is not defined.`);
  }
  clone() {
    return gt.fromPalette({
      name: this.name,
      palette: this.palette,
      tone: this.tone,
      isBackground: this.isBackground,
      chromaMultiplier: this.chromaMultiplier,
      background: this.background,
      secondBackground: this.secondBackground,
      contrastCurve: this.contrastCurve,
      toneDeltaPair: this.toneDeltaPair
    });
  }
  clearCache() {
    this.hctCache.clear();
  }
  getArgb(t) {
    return this.getHct(t).toInt();
  }
  getHct(t) {
    const r = this.hctCache.get(t);
    if (r != null) return r;
    const i = ve(t.specVersion).getHct(t, this);
    return this.hctCache.size > 4 && this.hctCache.clear(), this.hctCache.set(t, i), i;
  }
  getTone(t) {
    return ve(t.specVersion).getTone(t, this);
  }
  static foregroundTone(t, r) {
    const i = $.lighterUnsafe(t, r), n = $.darkerUnsafe(t, r), a = $.ratioOfTones(i, t), o = $.ratioOfTones(n, t);
    if (gt.tonePrefersLightForeground(t)) {
      const l = Math.abs(a - o) < 0.1 && a < r && o < r;
      return a >= r || a >= o || l ? i : n;
    } else return o >= r || o >= a ? n : i;
  }
  static tonePrefersLightForeground(t) {
    return Math.round(t) < 60;
  }
  static toneAllowsLightForeground(t) {
    return Math.round(t) <= 49;
  }
  static enableLightForeground(t) {
    return gt.tonePrefersLightForeground(t) && !gt.toneAllowsLightForeground(t) ? 49 : t;
  }
}, lr = class {
  getHct(e, t) {
    const r = t.getTone(e);
    return t.palette(e).getHct(r);
  }
  getTone(e, t) {
    const r = e.contrastLevel < 0, i = t.toneDeltaPair ? t.toneDeltaPair(e) : void 0;
    if (i) {
      const n = i.roleA, a = i.roleB, o = i.delta, l = i.polarity, d = i.stayTogether, h = l === "nearer" || l === "lighter" && !e.isDark || l === "darker" && e.isDark, u = h ? n : a, b = h ? a : n, v = t.name === u.name, g = e.isDark ? 1 : -1;
      let c = u.tone(e), f = b.tone(e);
      if (t.background && u.contrastCurve && b.contrastCurve) {
        const x = t.background(e), y = u.contrastCurve(e), w = b.contrastCurve(e);
        if (x && y && w) {
          const E = x.getTone(e), F = y.get(e.contrastLevel), z = w.get(e.contrastLevel);
          $.ratioOfTones(E, c) < F && (c = p.foregroundTone(E, F)), $.ratioOfTones(E, f) < z && (f = p.foregroundTone(E, z)), r && (c = p.foregroundTone(E, F), f = p.foregroundTone(E, z));
        }
      }
      return (f - c) * g < o && (f = q(0, 100, c + o * g), (f - c) * g >= o || (c = q(0, 100, f - o * g))), 50 <= c && c < 60 ? g > 0 ? (c = 60, f = Math.max(f, c + o * g)) : (c = 49, f = Math.min(f, c + o * g)) : 50 <= f && f < 60 && (d ? g > 0 ? (c = 60, f = Math.max(f, c + o * g)) : (c = 49, f = Math.min(f, c + o * g)) : g > 0 ? f = 60 : f = 49), v ? c : f;
    } else {
      let n = t.tone(e);
      if (t.background == null || t.background(e) === void 0 || t.contrastCurve == null || t.contrastCurve(e) === void 0) return n;
      const a = t.background(e).getTone(e), o = t.contrastCurve(e).get(e.contrastLevel);
      if ($.ratioOfTones(a, n) >= o || (n = p.foregroundTone(a, o)), r && (n = p.foregroundTone(a, o)), t.isBackground && 50 <= n && n < 60 && ($.ratioOfTones(49, a) >= o ? n = 49 : n = 60), t.secondBackground == null || t.secondBackground(e) === void 0) return n;
      const [l, d] = [t.background, t.secondBackground], [h, u] = [l(e).getTone(e), d(e).getTone(e)], [b, v] = [Math.max(h, u), Math.min(h, u)];
      if ($.ratioOfTones(b, n) >= o && $.ratioOfTones(v, n) >= o) return n;
      const g = $.lighter(b, o), c = $.darker(v, o), f = [];
      return g !== -1 && f.push(g), c !== -1 && f.push(c), p.tonePrefersLightForeground(h) || p.tonePrefersLightForeground(u) ? g < 0 ? 100 : g : f.length === 1 ? f[0] : c < 0 ? 0 : c;
    }
  }
}, cr = class {
  getHct(e, t) {
    const r = t.palette(e), i = t.getTone(e), n = r.hue, a = r.chroma * (t.chromaMultiplier ? t.chromaMultiplier(e) : 1);
    return L.from(n, a, i);
  }
  getTone(e, t) {
    const r = t.toneDeltaPair ? t.toneDeltaPair(e) : void 0;
    if (r) {
      const i = r.roleA, n = r.roleB, a = r.polarity, o = r.constraint, l = a === "darker" || a === "relative_lighter" && e.isDark || a === "relative_darker" && !e.isDark ? -r.delta : r.delta, d = t.name === i.name, h = d ? i : n, u = d ? n : i;
      let b = h.tone(e), v = u.getTone(e);
      const g = l * (d ? 1 : -1);
      if (o === "exact" ? b = q(0, 100, v + g) : o === "nearer" ? g > 0 ? b = q(0, 100, q(v, v + g, b)) : b = q(0, 100, q(v + g, v, b)) : o === "farther" && (g > 0 ? b = q(v + g, 100, b) : b = q(0, v + g, b)), t.background && t.contrastCurve) {
        const c = t.background(e), f = t.contrastCurve(e);
        if (c && f) {
          const x = c.getTone(e), y = f.get(e.contrastLevel);
          b = $.ratioOfTones(x, b) >= y && e.contrastLevel >= 0 ? b : p.foregroundTone(x, y);
        }
      }
      return t.isBackground && !t.name.endsWith("_fixed_dim") && (b >= 57 ? b = q(65, 100, b) : b = q(0, 49, b)), b;
    } else {
      let i = t.tone(e);
      if (t.background == null || t.background(e) === void 0 || t.contrastCurve == null || t.contrastCurve(e) === void 0) return i;
      const n = t.background(e).getTone(e), a = t.contrastCurve(e).get(e.contrastLevel);
      if (i = $.ratioOfTones(n, i) >= a && e.contrastLevel >= 0 ? i : p.foregroundTone(n, a), t.isBackground && !t.name.endsWith("_fixed_dim") && (i >= 57 ? i = q(65, 100, i) : i = q(0, 49, i)), t.secondBackground == null || t.secondBackground(e) === void 0) return i;
      const [o, l] = [t.background, t.secondBackground], [d, h] = [o(e).getTone(e), l(e).getTone(e)], [u, b] = [Math.max(d, h), Math.min(d, h)];
      if ($.ratioOfTones(u, i) >= a && $.ratioOfTones(b, i) >= a) return i;
      const v = $.lighter(u, a), g = $.darker(b, a), c = [];
      return v !== -1 && c.push(v), g !== -1 && c.push(g), p.tonePrefersLightForeground(d) || p.tonePrefersLightForeground(h) ? v < 0 ? 100 : v : c.length === 1 ? c[0] : g < 0 ? 0 : g;
    }
  }
}, ur = new lr(), dr = new cr();
function ve(e) {
  return e === "2025" ? dr : ur;
}
var _ = class Ot {
  static fromInt(t) {
    const r = L.fromInt(t);
    return Ot.fromHct(r);
  }
  static fromHct(t) {
    return new Ot(t.hue, t.chroma, t);
  }
  static fromHueAndChroma(t, r) {
    return new Ot(t, r, new hr(t, r).create());
  }
  constructor(t, r, i) {
    this.hue = t, this.chroma = r, this.keyColor = i, this.cache = /* @__PURE__ */ new Map();
  }
  tone(t) {
    let r = this.cache.get(t);
    return r === void 0 && (t == 99 && L.isYellow(this.hue) ? r = this.averageArgb(this.tone(98), this.tone(100)) : r = L.from(this.hue, this.chroma, t).toInt(), this.cache.set(t, r)), r;
  }
  getHct(t) {
    return L.fromInt(this.tone(t));
  }
  averageArgb(t, r) {
    const i = t >>> 16 & 255, n = t >>> 8 & 255, a = t & 255, o = r >>> 16 & 255, l = r >>> 8 & 255, d = r & 255, h = Math.round((i + o) / 2), u = Math.round((n + l) / 2), b = Math.round((a + d) / 2);
    return (255 << 24 | (h & 255) << 16 | (u & 255) << 8 | b & 255) >>> 0;
  }
}, hr = class {
  constructor(e, t) {
    this.hue = e, this.requestedChroma = t, this.chromaCache = /* @__PURE__ */ new Map(), this.maxChromaValue = 200;
  }
  create() {
    let i = 0, n = 100;
    for (; i < n; ) {
      const a = Math.floor((i + n) / 2), o = this.maxChroma(a) < this.maxChroma(a + 1);
      if (this.maxChroma(a) >= this.requestedChroma - 0.01) if (Math.abs(i - 50) < Math.abs(n - 50)) n = a;
      else {
        if (i === a) return L.from(this.hue, this.requestedChroma, i);
        i = a;
      }
      else o ? i = a + 1 : n = a;
    }
    return L.from(this.hue, this.requestedChroma, i);
  }
  maxChroma(e) {
    if (this.chromaCache.has(e)) return this.chromaCache.get(e);
    const t = L.from(this.hue, this.maxChromaValue, e).chroma;
    return this.chromaCache.set(e, t), t;
  }
}, ye = class Nt {
  constructor(t) {
    this.input = t, this.hctsByTempCache = [], this.hctsByHueCache = [], this.tempsByHctCache = /* @__PURE__ */ new Map(), this.inputRelativeTemperatureCache = -1, this.complementCache = null;
  }
  get hctsByTemp() {
    if (this.hctsByTempCache.length > 0) return this.hctsByTempCache;
    const t = this.hctsByHue.concat([this.input]), r = this.tempsByHct;
    return t.sort((i, n) => r.get(i) - r.get(n)), this.hctsByTempCache = t, t;
  }
  get warmest() {
    return this.hctsByTemp[this.hctsByTemp.length - 1];
  }
  get coldest() {
    return this.hctsByTemp[0];
  }
  analogous(t = 5, r = 12) {
    const i = Math.round(this.input.hue), n = this.hctsByHue[i];
    let a = this.relativeTemperature(n);
    const o = [n];
    let l = 0;
    for (let c = 0; c < 360; c++) {
      const f = $t(i + c), x = this.hctsByHue[f], y = this.relativeTemperature(x), w = Math.abs(y - a);
      a = y, l += w;
    }
    let d = 1;
    const h = l / r;
    let u = 0;
    for (a = this.relativeTemperature(n); o.length < r; ) {
      const c = $t(i + d), f = this.hctsByHue[c], x = this.relativeTemperature(f), y = Math.abs(x - a);
      u += y;
      const w = o.length * h;
      let E = u >= w, F = 1;
      for (; E && o.length < r; ) {
        o.push(f);
        const z = (o.length + F) * h;
        E = u >= z, F++;
      }
      if (a = x, d++, d > 360) {
        for (; o.length < r; ) o.push(f);
        break;
      }
    }
    const b = [this.input], v = Math.floor((t - 1) / 2);
    for (let c = 1; c < v + 1; c++) {
      let f = 0 - c;
      for (; f < 0; ) f = o.length + f;
      f >= o.length && (f = f % o.length), b.splice(0, 0, o[f]);
    }
    const g = t - v - 1;
    for (let c = 1; c < g + 1; c++) {
      let f = c;
      for (; f < 0; ) f = o.length + f;
      f >= o.length && (f = f % o.length), b.push(o[f]);
    }
    return b;
  }
  get complement() {
    if (this.complementCache != null) return this.complementCache;
    const t = this.coldest.hue, r = this.tempsByHct.get(this.coldest), i = this.warmest.hue, n = this.tempsByHct.get(this.warmest) - r, a = Nt.isBetween(this.input.hue, t, i), o = a ? i : t, l = a ? t : i, d = 1;
    let h = 1e3, u = this.hctsByHue[Math.round(this.input.hue)];
    const b = 1 - this.inputRelativeTemperature;
    for (let v = 0; v <= 360; v += 1) {
      const g = G(o + d * v);
      if (!Nt.isBetween(g, o, l)) continue;
      const c = this.hctsByHue[Math.round(g)], f = (this.tempsByHct.get(c) - r) / n, x = Math.abs(b - f);
      x < h && (h = x, u = c);
    }
    return this.complementCache = u, this.complementCache;
  }
  relativeTemperature(t) {
    const r = this.tempsByHct.get(this.warmest) - this.tempsByHct.get(this.coldest), i = this.tempsByHct.get(t) - this.tempsByHct.get(this.coldest);
    return r === 0 ? 0.5 : i / r;
  }
  get inputRelativeTemperature() {
    return this.inputRelativeTemperatureCache >= 0 ? this.inputRelativeTemperatureCache : (this.inputRelativeTemperatureCache = this.relativeTemperature(this.input), this.inputRelativeTemperatureCache);
  }
  get tempsByHct() {
    if (this.tempsByHctCache.size > 0) return this.tempsByHctCache;
    const t = this.hctsByHue.concat([this.input]), r = /* @__PURE__ */ new Map();
    for (const i of t) r.set(i, Nt.rawTemperature(i));
    return this.tempsByHctCache = r, r;
  }
  get hctsByHue() {
    if (this.hctsByHueCache.length > 0) return this.hctsByHueCache;
    const t = [];
    for (let r = 0; r <= 360; r += 1) {
      const i = L.from(r, this.input.chroma, this.input.tone);
      t.push(i);
    }
    return this.hctsByHueCache = t, this.hctsByHueCache;
  }
  static isBetween(t, r, i) {
    return r < i ? r <= t && t <= i : r <= t || t <= i;
  }
  static rawTemperature(t) {
    const r = Ie(t.toInt()), i = G(Math.atan2(r[2], r[1]) * 180 / Math.PI), n = Math.sqrt(r[1] * r[1] + r[2] * r[2]);
    return -0.5 + 0.02 * Math.pow(n, 1.07) * Math.cos(G(i - 50) * Math.PI / 180);
  }
}, P = class {
  constructor(e, t, r, i) {
    this.low = e, this.normal = t, this.medium = r, this.high = i;
  }
  get(e) {
    return e <= -1 ? this.low : e < 0 ? Tt(this.low, this.normal, (e - -1) / 1) : e < 0.5 ? Tt(this.normal, this.medium, (e - 0) / 0.5) : e < 1 ? Tt(this.medium, this.high, (e - 0.5) / 0.5) : this.high;
  }
}, H = class {
  constructor(e, t, r, i, n, a) {
    this.roleA = e, this.roleB = t, this.delta = r, this.polarity = i, this.stayTogether = n, this.constraint = a, this.constraint = a ?? "exact";
  }
}, s;
(function(e) {
  e[e.MONOCHROME = 0] = "MONOCHROME", e[e.NEUTRAL = 1] = "NEUTRAL", e[e.TONAL_SPOT = 2] = "TONAL_SPOT", e[e.VIBRANT = 3] = "VIBRANT", e[e.EXPRESSIVE = 4] = "EXPRESSIVE", e[e.FIDELITY = 5] = "FIDELITY", e[e.CONTENT = 6] = "CONTENT", e[e.RAINBOW = 7] = "RAINBOW", e[e.FRUIT_SALAD = 8] = "FRUIT_SALAD";
})(s || (s = {}));
function _t(e) {
  return e.variant === s.FIDELITY || e.variant === s.CONTENT;
}
function V(e) {
  return e.variant === s.MONOCHROME;
}
function pr(e, t, r, i) {
  let n = r, a = L.from(e, t, r);
  if (a.chroma < t) {
    let o = a.chroma;
    for (; a.chroma < t; ) {
      n += i ? -1 : 1;
      const l = L.from(e, t, n);
      if (o > l.chroma || Math.abs(l.chroma - t) < 0.4) break;
      Math.abs(l.chroma - t) < Math.abs(a.chroma - t) && (a = l), o = Math.max(o, l.chroma);
    }
  }
  return n;
}
var mr = class {
  primaryPaletteKeyColor() {
    return p.fromPalette({
      name: "primary_palette_key_color",
      palette: (e) => e.primaryPalette,
      tone: (e) => e.primaryPalette.keyColor.tone
    });
  }
  secondaryPaletteKeyColor() {
    return p.fromPalette({
      name: "secondary_palette_key_color",
      palette: (e) => e.secondaryPalette,
      tone: (e) => e.secondaryPalette.keyColor.tone
    });
  }
  tertiaryPaletteKeyColor() {
    return p.fromPalette({
      name: "tertiary_palette_key_color",
      palette: (e) => e.tertiaryPalette,
      tone: (e) => e.tertiaryPalette.keyColor.tone
    });
  }
  neutralPaletteKeyColor() {
    return p.fromPalette({
      name: "neutral_palette_key_color",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.neutralPalette.keyColor.tone
    });
  }
  neutralVariantPaletteKeyColor() {
    return p.fromPalette({
      name: "neutral_variant_palette_key_color",
      palette: (e) => e.neutralVariantPalette,
      tone: (e) => e.neutralVariantPalette.keyColor.tone
    });
  }
  errorPaletteKeyColor() {
    return p.fromPalette({
      name: "error_palette_key_color",
      palette: (e) => e.errorPalette,
      tone: (e) => e.errorPalette.keyColor.tone
    });
  }
  background() {
    return p.fromPalette({
      name: "background",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.isDark ? 6 : 98,
      isBackground: !0
    });
  }
  onBackground() {
    return p.fromPalette({
      name: "on_background",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.isDark ? 90 : 10,
      background: (e) => this.background(),
      contrastCurve: (e) => new P(3, 3, 4.5, 7)
    });
  }
  surface() {
    return p.fromPalette({
      name: "surface",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.isDark ? 6 : 98,
      isBackground: !0
    });
  }
  surfaceDim() {
    return p.fromPalette({
      name: "surface_dim",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.isDark ? 6 : new P(87, 87, 80, 75).get(e.contrastLevel),
      isBackground: !0
    });
  }
  surfaceBright() {
    return p.fromPalette({
      name: "surface_bright",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.isDark ? new P(24, 24, 29, 34).get(e.contrastLevel) : 98,
      isBackground: !0
    });
  }
  surfaceContainerLowest() {
    return p.fromPalette({
      name: "surface_container_lowest",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.isDark ? new P(4, 4, 2, 0).get(e.contrastLevel) : 100,
      isBackground: !0
    });
  }
  surfaceContainerLow() {
    return p.fromPalette({
      name: "surface_container_low",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.isDark ? new P(10, 10, 11, 12).get(e.contrastLevel) : new P(96, 96, 96, 95).get(e.contrastLevel),
      isBackground: !0
    });
  }
  surfaceContainer() {
    return p.fromPalette({
      name: "surface_container",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.isDark ? new P(12, 12, 16, 20).get(e.contrastLevel) : new P(94, 94, 92, 90).get(e.contrastLevel),
      isBackground: !0
    });
  }
  surfaceContainerHigh() {
    return p.fromPalette({
      name: "surface_container_high",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.isDark ? new P(17, 17, 21, 25).get(e.contrastLevel) : new P(92, 92, 88, 85).get(e.contrastLevel),
      isBackground: !0
    });
  }
  surfaceContainerHighest() {
    return p.fromPalette({
      name: "surface_container_highest",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.isDark ? new P(22, 22, 26, 30).get(e.contrastLevel) : new P(90, 90, 84, 80).get(e.contrastLevel),
      isBackground: !0
    });
  }
  onSurface() {
    return p.fromPalette({
      name: "on_surface",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.isDark ? 90 : 10,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new P(4.5, 7, 11, 21)
    });
  }
  surfaceVariant() {
    return p.fromPalette({
      name: "surface_variant",
      palette: (e) => e.neutralVariantPalette,
      tone: (e) => e.isDark ? 30 : 90,
      isBackground: !0
    });
  }
  onSurfaceVariant() {
    return p.fromPalette({
      name: "on_surface_variant",
      palette: (e) => e.neutralVariantPalette,
      tone: (e) => e.isDark ? 80 : 30,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new P(3, 4.5, 7, 11)
    });
  }
  inverseSurface() {
    return p.fromPalette({
      name: "inverse_surface",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.isDark ? 90 : 20,
      isBackground: !0
    });
  }
  inverseOnSurface() {
    return p.fromPalette({
      name: "inverse_on_surface",
      palette: (e) => e.neutralPalette,
      tone: (e) => e.isDark ? 20 : 95,
      background: (e) => this.inverseSurface(),
      contrastCurve: (e) => new P(4.5, 7, 11, 21)
    });
  }
  outline() {
    return p.fromPalette({
      name: "outline",
      palette: (e) => e.neutralVariantPalette,
      tone: (e) => e.isDark ? 60 : 50,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new P(1.5, 3, 4.5, 7)
    });
  }
  outlineVariant() {
    return p.fromPalette({
      name: "outline_variant",
      palette: (e) => e.neutralVariantPalette,
      tone: (e) => e.isDark ? 30 : 80,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new P(1, 1, 3, 4.5)
    });
  }
  shadow() {
    return p.fromPalette({
      name: "shadow",
      palette: (e) => e.neutralPalette,
      tone: (e) => 0
    });
  }
  scrim() {
    return p.fromPalette({
      name: "scrim",
      palette: (e) => e.neutralPalette,
      tone: (e) => 0
    });
  }
  surfaceTint() {
    return p.fromPalette({
      name: "surface_tint",
      palette: (e) => e.primaryPalette,
      tone: (e) => e.isDark ? 80 : 40,
      isBackground: !0
    });
  }
  primary() {
    return p.fromPalette({
      name: "primary",
      palette: (e) => e.primaryPalette,
      tone: (e) => V(e) ? e.isDark ? 100 : 0 : e.isDark ? 80 : 40,
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new P(3, 4.5, 7, 7),
      toneDeltaPair: (e) => new H(this.primaryContainer(), this.primary(), 10, "nearer", !1)
    });
  }
  primaryDim() {
  }
  onPrimary() {
    return p.fromPalette({
      name: "on_primary",
      palette: (e) => e.primaryPalette,
      tone: (e) => V(e) ? e.isDark ? 10 : 90 : e.isDark ? 20 : 100,
      background: (e) => this.primary(),
      contrastCurve: (e) => new P(4.5, 7, 11, 21)
    });
  }
  primaryContainer() {
    return p.fromPalette({
      name: "primary_container",
      palette: (e) => e.primaryPalette,
      tone: (e) => _t(e) ? e.sourceColorHct.tone : V(e) ? e.isDark ? 85 : 25 : e.isDark ? 30 : 90,
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new P(1, 1, 3, 4.5),
      toneDeltaPair: (e) => new H(this.primaryContainer(), this.primary(), 10, "nearer", !1)
    });
  }
  onPrimaryContainer() {
    return p.fromPalette({
      name: "on_primary_container",
      palette: (e) => e.primaryPalette,
      tone: (e) => _t(e) ? p.foregroundTone(this.primaryContainer().tone(e), 4.5) : V(e) ? e.isDark ? 0 : 100 : e.isDark ? 90 : 30,
      background: (e) => this.primaryContainer(),
      contrastCurve: (e) => new P(3, 4.5, 7, 11)
    });
  }
  inversePrimary() {
    return p.fromPalette({
      name: "inverse_primary",
      palette: (e) => e.primaryPalette,
      tone: (e) => e.isDark ? 40 : 80,
      background: (e) => this.inverseSurface(),
      contrastCurve: (e) => new P(3, 4.5, 7, 7)
    });
  }
  secondary() {
    return p.fromPalette({
      name: "secondary",
      palette: (e) => e.secondaryPalette,
      tone: (e) => e.isDark ? 80 : 40,
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new P(3, 4.5, 7, 7),
      toneDeltaPair: (e) => new H(this.secondaryContainer(), this.secondary(), 10, "nearer", !1)
    });
  }
  secondaryDim() {
  }
  onSecondary() {
    return p.fromPalette({
      name: "on_secondary",
      palette: (e) => e.secondaryPalette,
      tone: (e) => V(e) ? e.isDark ? 10 : 100 : e.isDark ? 20 : 100,
      background: (e) => this.secondary(),
      contrastCurve: (e) => new P(4.5, 7, 11, 21)
    });
  }
  secondaryContainer() {
    return p.fromPalette({
      name: "secondary_container",
      palette: (e) => e.secondaryPalette,
      tone: (e) => {
        const t = e.isDark ? 30 : 90;
        return V(e) ? e.isDark ? 30 : 85 : _t(e) ? pr(e.secondaryPalette.hue, e.secondaryPalette.chroma, t, !e.isDark) : t;
      },
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new P(1, 1, 3, 4.5),
      toneDeltaPair: (e) => new H(this.secondaryContainer(), this.secondary(), 10, "nearer", !1)
    });
  }
  onSecondaryContainer() {
    return p.fromPalette({
      name: "on_secondary_container",
      palette: (e) => e.secondaryPalette,
      tone: (e) => V(e) ? e.isDark ? 90 : 10 : _t(e) ? p.foregroundTone(this.secondaryContainer().tone(e), 4.5) : e.isDark ? 90 : 30,
      background: (e) => this.secondaryContainer(),
      contrastCurve: (e) => new P(3, 4.5, 7, 11)
    });
  }
  tertiary() {
    return p.fromPalette({
      name: "tertiary",
      palette: (e) => e.tertiaryPalette,
      tone: (e) => V(e) ? e.isDark ? 90 : 25 : e.isDark ? 80 : 40,
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new P(3, 4.5, 7, 7),
      toneDeltaPair: (e) => new H(this.tertiaryContainer(), this.tertiary(), 10, "nearer", !1)
    });
  }
  tertiaryDim() {
  }
  onTertiary() {
    return p.fromPalette({
      name: "on_tertiary",
      palette: (e) => e.tertiaryPalette,
      tone: (e) => V(e) ? e.isDark ? 10 : 90 : e.isDark ? 20 : 100,
      background: (e) => this.tertiary(),
      contrastCurve: (e) => new P(4.5, 7, 11, 21)
    });
  }
  tertiaryContainer() {
    return p.fromPalette({
      name: "tertiary_container",
      palette: (e) => e.tertiaryPalette,
      tone: (e) => {
        if (V(e)) return e.isDark ? 60 : 49;
        if (!_t(e)) return e.isDark ? 30 : 90;
        const t = e.tertiaryPalette.getHct(e.sourceColorHct.tone);
        return ne.fixIfDisliked(t).tone;
      },
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new P(1, 1, 3, 4.5),
      toneDeltaPair: (e) => new H(this.tertiaryContainer(), this.tertiary(), 10, "nearer", !1)
    });
  }
  onTertiaryContainer() {
    return p.fromPalette({
      name: "on_tertiary_container",
      palette: (e) => e.tertiaryPalette,
      tone: (e) => V(e) ? e.isDark ? 0 : 100 : _t(e) ? p.foregroundTone(this.tertiaryContainer().tone(e), 4.5) : e.isDark ? 90 : 30,
      background: (e) => this.tertiaryContainer(),
      contrastCurve: (e) => new P(3, 4.5, 7, 11)
    });
  }
  error() {
    return p.fromPalette({
      name: "error",
      palette: (e) => e.errorPalette,
      tone: (e) => e.isDark ? 80 : 40,
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new P(3, 4.5, 7, 7),
      toneDeltaPair: (e) => new H(this.errorContainer(), this.error(), 10, "nearer", !1)
    });
  }
  errorDim() {
  }
  onError() {
    return p.fromPalette({
      name: "on_error",
      palette: (e) => e.errorPalette,
      tone: (e) => e.isDark ? 20 : 100,
      background: (e) => this.error(),
      contrastCurve: (e) => new P(4.5, 7, 11, 21)
    });
  }
  errorContainer() {
    return p.fromPalette({
      name: "error_container",
      palette: (e) => e.errorPalette,
      tone: (e) => e.isDark ? 30 : 90,
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new P(1, 1, 3, 4.5),
      toneDeltaPair: (e) => new H(this.errorContainer(), this.error(), 10, "nearer", !1)
    });
  }
  onErrorContainer() {
    return p.fromPalette({
      name: "on_error_container",
      palette: (e) => e.errorPalette,
      tone: (e) => V(e) ? e.isDark ? 90 : 10 : e.isDark ? 90 : 30,
      background: (e) => this.errorContainer(),
      contrastCurve: (e) => new P(3, 4.5, 7, 11)
    });
  }
  primaryFixed() {
    return p.fromPalette({
      name: "primary_fixed",
      palette: (e) => e.primaryPalette,
      tone: (e) => V(e) ? 40 : 90,
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new P(1, 1, 3, 4.5),
      toneDeltaPair: (e) => new H(this.primaryFixed(), this.primaryFixedDim(), 10, "lighter", !0)
    });
  }
  primaryFixedDim() {
    return p.fromPalette({
      name: "primary_fixed_dim",
      palette: (e) => e.primaryPalette,
      tone: (e) => V(e) ? 30 : 80,
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new P(1, 1, 3, 4.5),
      toneDeltaPair: (e) => new H(this.primaryFixed(), this.primaryFixedDim(), 10, "lighter", !0)
    });
  }
  onPrimaryFixed() {
    return p.fromPalette({
      name: "on_primary_fixed",
      palette: (e) => e.primaryPalette,
      tone: (e) => V(e) ? 100 : 10,
      background: (e) => this.primaryFixedDim(),
      secondBackground: (e) => this.primaryFixed(),
      contrastCurve: (e) => new P(4.5, 7, 11, 21)
    });
  }
  onPrimaryFixedVariant() {
    return p.fromPalette({
      name: "on_primary_fixed_variant",
      palette: (e) => e.primaryPalette,
      tone: (e) => V(e) ? 90 : 30,
      background: (e) => this.primaryFixedDim(),
      secondBackground: (e) => this.primaryFixed(),
      contrastCurve: (e) => new P(3, 4.5, 7, 11)
    });
  }
  secondaryFixed() {
    return p.fromPalette({
      name: "secondary_fixed",
      palette: (e) => e.secondaryPalette,
      tone: (e) => V(e) ? 80 : 90,
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new P(1, 1, 3, 4.5),
      toneDeltaPair: (e) => new H(this.secondaryFixed(), this.secondaryFixedDim(), 10, "lighter", !0)
    });
  }
  secondaryFixedDim() {
    return p.fromPalette({
      name: "secondary_fixed_dim",
      palette: (e) => e.secondaryPalette,
      tone: (e) => V(e) ? 70 : 80,
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new P(1, 1, 3, 4.5),
      toneDeltaPair: (e) => new H(this.secondaryFixed(), this.secondaryFixedDim(), 10, "lighter", !0)
    });
  }
  onSecondaryFixed() {
    return p.fromPalette({
      name: "on_secondary_fixed",
      palette: (e) => e.secondaryPalette,
      tone: (e) => 10,
      background: (e) => this.secondaryFixedDim(),
      secondBackground: (e) => this.secondaryFixed(),
      contrastCurve: (e) => new P(4.5, 7, 11, 21)
    });
  }
  onSecondaryFixedVariant() {
    return p.fromPalette({
      name: "on_secondary_fixed_variant",
      palette: (e) => e.secondaryPalette,
      tone: (e) => V(e) ? 25 : 30,
      background: (e) => this.secondaryFixedDim(),
      secondBackground: (e) => this.secondaryFixed(),
      contrastCurve: (e) => new P(3, 4.5, 7, 11)
    });
  }
  tertiaryFixed() {
    return p.fromPalette({
      name: "tertiary_fixed",
      palette: (e) => e.tertiaryPalette,
      tone: (e) => V(e) ? 40 : 90,
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new P(1, 1, 3, 4.5),
      toneDeltaPair: (e) => new H(this.tertiaryFixed(), this.tertiaryFixedDim(), 10, "lighter", !0)
    });
  }
  tertiaryFixedDim() {
    return p.fromPalette({
      name: "tertiary_fixed_dim",
      palette: (e) => e.tertiaryPalette,
      tone: (e) => V(e) ? 30 : 80,
      isBackground: !0,
      background: (e) => this.highestSurface(e),
      contrastCurve: (e) => new P(1, 1, 3, 4.5),
      toneDeltaPair: (e) => new H(this.tertiaryFixed(), this.tertiaryFixedDim(), 10, "lighter", !0)
    });
  }
  onTertiaryFixed() {
    return p.fromPalette({
      name: "on_tertiary_fixed",
      palette: (e) => e.tertiaryPalette,
      tone: (e) => V(e) ? 100 : 10,
      background: (e) => this.tertiaryFixedDim(),
      secondBackground: (e) => this.tertiaryFixed(),
      contrastCurve: (e) => new P(4.5, 7, 11, 21)
    });
  }
  onTertiaryFixedVariant() {
    return p.fromPalette({
      name: "on_tertiary_fixed_variant",
      palette: (e) => e.tertiaryPalette,
      tone: (e) => V(e) ? 90 : 30,
      background: (e) => this.tertiaryFixedDim(),
      secondBackground: (e) => this.tertiaryFixed(),
      contrastCurve: (e) => new P(3, 4.5, 7, 11)
    });
  }
  highestSurface(e) {
    return e.isDark ? this.surfaceBright() : this.surfaceDim();
  }
};
function I(e, t = 0, r = 100, i = 1) {
  let n = Fe(e.hue, e.chroma * i, 100, !0);
  return q(t, r, n);
}
function ot(e, t = 0, r = 100) {
  let i = Fe(e.hue, e.chroma, 0, !1);
  return q(t, r, i);
}
function Fe(e, t, r, i) {
  let n = r, a = L.from(e, t, n);
  for (; a.chroma < t && !(r < 0 || r > 100); ) {
    r += i ? -1 : 1;
    const o = L.from(e, t, r);
    a.chroma < o.chroma && (a = o, n = r);
  }
  return n;
}
function S(e) {
  return e === 1.5 ? new P(1.5, 1.5, 3, 5.5) : e === 3 ? new P(3, 3, 4.5, 7) : e === 4.5 ? new P(4.5, 4.5, 7, 11) : e === 6 ? new P(6, 6, 7, 11) : e === 7 ? new P(7, 7, 11, 21) : e === 9 ? new P(9, 9, 11, 21) : e === 11 ? new P(11, 11, 21, 21) : e === 21 ? new P(21, 21, 21, 21) : new P(e, e, 7, 21);
}
var br = class extends mr {
  surface() {
    const e = p.fromPalette({
      name: "surface",
      palette: (t) => t.neutralPalette,
      tone: (t) => (super.surface().tone(t), t.platform === "phone" ? t.isDark ? 4 : L.isYellow(t.neutralPalette.hue) ? 99 : t.variant === s.VIBRANT ? 97 : 98 : 0),
      isBackground: !0
    });
    return T(super.surface(), "2025", e);
  }
  surfaceDim() {
    const e = p.fromPalette({
      name: "surface_dim",
      palette: (t) => t.neutralPalette,
      tone: (t) => t.isDark ? 4 : L.isYellow(t.neutralPalette.hue) ? 90 : t.variant === s.VIBRANT ? 85 : 87,
      isBackground: !0,
      chromaMultiplier: (t) => {
        if (!t.isDark) {
          if (t.variant === s.NEUTRAL) return 2.5;
          if (t.variant === s.TONAL_SPOT) return 1.7;
          if (t.variant === s.EXPRESSIVE) return L.isYellow(t.neutralPalette.hue) ? 2.7 : 1.75;
          if (t.variant === s.VIBRANT) return 1.36;
        }
        return 1;
      }
    });
    return T(super.surfaceDim(), "2025", e);
  }
  surfaceBright() {
    const e = p.fromPalette({
      name: "surface_bright",
      palette: (t) => t.neutralPalette,
      tone: (t) => t.isDark ? 18 : L.isYellow(t.neutralPalette.hue) ? 99 : t.variant === s.VIBRANT ? 97 : 98,
      isBackground: !0,
      chromaMultiplier: (t) => {
        if (t.isDark) {
          if (t.variant === s.NEUTRAL) return 2.5;
          if (t.variant === s.TONAL_SPOT) return 1.7;
          if (t.variant === s.EXPRESSIVE) return L.isYellow(t.neutralPalette.hue) ? 2.7 : 1.75;
          if (t.variant === s.VIBRANT) return 1.36;
        }
        return 1;
      }
    });
    return T(super.surfaceBright(), "2025", e);
  }
  surfaceContainerLowest() {
    const e = p.fromPalette({
      name: "surface_container_lowest",
      palette: (t) => t.neutralPalette,
      tone: (t) => t.isDark ? 0 : 100,
      isBackground: !0
    });
    return T(super.surfaceContainerLowest(), "2025", e);
  }
  surfaceContainerLow() {
    const e = p.fromPalette({
      name: "surface_container_low",
      palette: (t) => t.neutralPalette,
      tone: (t) => t.platform === "phone" ? t.isDark ? 6 : L.isYellow(t.neutralPalette.hue) ? 98 : t.variant === s.VIBRANT ? 95 : 96 : 15,
      isBackground: !0,
      chromaMultiplier: (t) => {
        if (t.platform === "phone") {
          if (t.variant === s.NEUTRAL) return 1.3;
          if (t.variant === s.TONAL_SPOT) return 1.25;
          if (t.variant === s.EXPRESSIVE) return L.isYellow(t.neutralPalette.hue) ? 1.3 : 1.15;
          if (t.variant === s.VIBRANT) return 1.08;
        }
        return 1;
      }
    });
    return T(super.surfaceContainerLow(), "2025", e);
  }
  surfaceContainer() {
    const e = p.fromPalette({
      name: "surface_container",
      palette: (t) => t.neutralPalette,
      tone: (t) => t.platform === "phone" ? t.isDark ? 9 : L.isYellow(t.neutralPalette.hue) ? 96 : t.variant === s.VIBRANT ? 92 : 94 : 20,
      isBackground: !0,
      chromaMultiplier: (t) => {
        if (t.platform === "phone") {
          if (t.variant === s.NEUTRAL) return 1.6;
          if (t.variant === s.TONAL_SPOT) return 1.4;
          if (t.variant === s.EXPRESSIVE) return L.isYellow(t.neutralPalette.hue) ? 1.6 : 1.3;
          if (t.variant === s.VIBRANT) return 1.15;
        }
        return 1;
      }
    });
    return T(super.surfaceContainer(), "2025", e);
  }
  surfaceContainerHigh() {
    const e = p.fromPalette({
      name: "surface_container_high",
      palette: (t) => t.neutralPalette,
      tone: (t) => t.platform === "phone" ? t.isDark ? 12 : L.isYellow(t.neutralPalette.hue) ? 94 : t.variant === s.VIBRANT ? 90 : 92 : 25,
      isBackground: !0,
      chromaMultiplier: (t) => {
        if (t.platform === "phone") {
          if (t.variant === s.NEUTRAL) return 1.9;
          if (t.variant === s.TONAL_SPOT) return 1.5;
          if (t.variant === s.EXPRESSIVE) return L.isYellow(t.neutralPalette.hue) ? 1.95 : 1.45;
          if (t.variant === s.VIBRANT) return 1.22;
        }
        return 1;
      }
    });
    return T(super.surfaceContainerHigh(), "2025", e);
  }
  surfaceContainerHighest() {
    const e = p.fromPalette({
      name: "surface_container_highest",
      palette: (t) => t.neutralPalette,
      tone: (t) => t.isDark ? 15 : L.isYellow(t.neutralPalette.hue) ? 92 : t.variant === s.VIBRANT ? 88 : 90,
      isBackground: !0,
      chromaMultiplier: (t) => t.variant === s.NEUTRAL ? 2.2 : t.variant === s.TONAL_SPOT ? 1.7 : t.variant === s.EXPRESSIVE ? L.isYellow(t.neutralPalette.hue) ? 2.3 : 1.6 : t.variant === s.VIBRANT ? 1.29 : 1
    });
    return T(super.surfaceContainerHighest(), "2025", e);
  }
  onSurface() {
    const e = p.fromPalette({
      name: "on_surface",
      palette: (t) => t.neutralPalette,
      tone: (t) => t.variant === s.VIBRANT ? I(t.neutralPalette, 0, 100, 1.1) : p.getInitialToneFromBackground((r) => r.platform === "phone" ? this.highestSurface(r) : this.surfaceContainerHigh())(t),
      chromaMultiplier: (t) => {
        if (t.platform === "phone") {
          if (t.variant === s.NEUTRAL) return 2.2;
          if (t.variant === s.TONAL_SPOT) return 1.7;
          if (t.variant === s.EXPRESSIVE) return L.isYellow(t.neutralPalette.hue) ? t.isDark ? 3 : 2.3 : 1.6;
        }
        return 1;
      },
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : this.surfaceContainerHigh(),
      contrastCurve: (t) => t.isDark && t.platform === "phone" ? S(11) : S(9)
    });
    return T(super.onSurface(), "2025", e);
  }
  onSurfaceVariant() {
    const e = p.fromPalette({
      name: "on_surface_variant",
      palette: (t) => t.neutralPalette,
      chromaMultiplier: (t) => {
        if (t.platform === "phone") {
          if (t.variant === s.NEUTRAL) return 2.2;
          if (t.variant === s.TONAL_SPOT) return 1.7;
          if (t.variant === s.EXPRESSIVE) return L.isYellow(t.neutralPalette.hue) ? t.isDark ? 3 : 2.3 : 1.6;
        }
        return 1;
      },
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : this.surfaceContainerHigh(),
      contrastCurve: (t) => t.platform === "phone" ? t.isDark ? S(6) : S(4.5) : S(7)
    });
    return T(super.onSurfaceVariant(), "2025", e);
  }
  outline() {
    const e = p.fromPalette({
      name: "outline",
      palette: (t) => t.neutralPalette,
      chromaMultiplier: (t) => {
        if (t.platform === "phone") {
          if (t.variant === s.NEUTRAL) return 2.2;
          if (t.variant === s.TONAL_SPOT) return 1.7;
          if (t.variant === s.EXPRESSIVE) return L.isYellow(t.neutralPalette.hue) ? t.isDark ? 3 : 2.3 : 1.6;
        }
        return 1;
      },
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : this.surfaceContainerHigh(),
      contrastCurve: (t) => t.platform === "phone" ? S(3) : S(4.5)
    });
    return T(super.outline(), "2025", e);
  }
  outlineVariant() {
    const e = p.fromPalette({
      name: "outline_variant",
      palette: (t) => t.neutralPalette,
      chromaMultiplier: (t) => {
        if (t.platform === "phone") {
          if (t.variant === s.NEUTRAL) return 2.2;
          if (t.variant === s.TONAL_SPOT) return 1.7;
          if (t.variant === s.EXPRESSIVE) return L.isYellow(t.neutralPalette.hue) ? t.isDark ? 3 : 2.3 : 1.6;
        }
        return 1;
      },
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : this.surfaceContainerHigh(),
      contrastCurve: (t) => t.platform === "phone" ? S(1.5) : S(3)
    });
    return T(super.outlineVariant(), "2025", e);
  }
  inverseSurface() {
    const e = p.fromPalette({
      name: "inverse_surface",
      palette: (t) => t.neutralPalette,
      tone: (t) => t.isDark ? 98 : 4,
      isBackground: !0
    });
    return T(super.inverseSurface(), "2025", e);
  }
  inverseOnSurface() {
    const e = p.fromPalette({
      name: "inverse_on_surface",
      palette: (t) => t.neutralPalette,
      background: (t) => this.inverseSurface(),
      contrastCurve: (t) => S(7)
    });
    return T(super.inverseOnSurface(), "2025", e);
  }
  primary() {
    const e = p.fromPalette({
      name: "primary",
      palette: (t) => t.primaryPalette,
      tone: (t) => t.variant === s.NEUTRAL ? t.platform === "phone" ? t.isDark ? 80 : 40 : 90 : t.variant === s.TONAL_SPOT ? t.platform === "phone" ? t.isDark ? 80 : I(t.primaryPalette) : I(t.primaryPalette, 0, 90) : t.variant === s.EXPRESSIVE ? t.platform === "phone" ? I(t.primaryPalette, 0, L.isYellow(t.primaryPalette.hue) ? 25 : L.isCyan(t.primaryPalette.hue) ? 88 : 98) : I(t.primaryPalette) : t.platform === "phone" ? I(t.primaryPalette, 0, L.isCyan(t.primaryPalette.hue) ? 88 : 98) : I(t.primaryPalette),
      isBackground: !0,
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : this.surfaceContainerHigh(),
      contrastCurve: (t) => t.platform === "phone" ? S(4.5) : S(7),
      toneDeltaPair: (t) => t.platform === "phone" ? new H(this.primaryContainer(), this.primary(), 5, "relative_lighter", !0, "farther") : void 0
    });
    return T(super.primary(), "2025", e);
  }
  primaryDim() {
    return p.fromPalette({
      name: "primary_dim",
      palette: (e) => e.primaryPalette,
      tone: (e) => e.variant === s.NEUTRAL ? 85 : e.variant === s.TONAL_SPOT ? I(e.primaryPalette, 0, 90) : I(e.primaryPalette),
      isBackground: !0,
      background: (e) => this.surfaceContainerHigh(),
      contrastCurve: (e) => S(4.5),
      toneDeltaPair: (e) => new H(this.primaryDim(), this.primary(), 5, "darker", !0, "farther")
    });
  }
  onPrimary() {
    const e = p.fromPalette({
      name: "on_primary",
      palette: (t) => t.primaryPalette,
      background: (t) => t.platform === "phone" ? this.primary() : this.primaryDim(),
      contrastCurve: (t) => t.platform === "phone" ? S(6) : S(7)
    });
    return T(super.onPrimary(), "2025", e);
  }
  primaryContainer() {
    const e = p.fromPalette({
      name: "primary_container",
      palette: (t) => t.primaryPalette,
      tone: (t) => t.platform === "watch" ? 30 : t.variant === s.NEUTRAL ? t.isDark ? 30 : 90 : t.variant === s.TONAL_SPOT ? t.isDark ? ot(t.primaryPalette, 35, 93) : I(t.primaryPalette, 0, 90) : t.variant === s.EXPRESSIVE ? t.isDark ? I(t.primaryPalette, 30, 93) : I(t.primaryPalette, 78, L.isCyan(t.primaryPalette.hue) ? 88 : 90) : t.isDark ? ot(t.primaryPalette, 66, 93) : I(t.primaryPalette, 66, L.isCyan(t.primaryPalette.hue) ? 88 : 93),
      isBackground: !0,
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : void 0,
      toneDeltaPair: (t) => t.platform === "phone" ? void 0 : new H(this.primaryContainer(), this.primaryDim(), 10, "darker", !0, "farther"),
      contrastCurve: (t) => t.platform === "phone" && t.contrastLevel > 0 ? S(1.5) : void 0
    });
    return T(super.primaryContainer(), "2025", e);
  }
  onPrimaryContainer() {
    const e = p.fromPalette({
      name: "on_primary_container",
      palette: (t) => t.primaryPalette,
      background: (t) => this.primaryContainer(),
      contrastCurve: (t) => t.platform === "phone" ? S(6) : S(7)
    });
    return T(super.onPrimaryContainer(), "2025", e);
  }
  primaryFixed() {
    const e = p.fromPalette({
      name: "primary_fixed",
      palette: (t) => t.primaryPalette,
      tone: (t) => {
        let r = Object.assign({}, t, {
          isDark: !1,
          contrastLevel: 0
        });
        return this.primaryContainer().getTone(r);
      },
      isBackground: !0,
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : void 0,
      contrastCurve: (t) => t.platform === "phone" && t.contrastLevel > 0 ? S(1.5) : void 0
    });
    return T(super.primaryFixed(), "2025", e);
  }
  primaryFixedDim() {
    const e = p.fromPalette({
      name: "primary_fixed_dim",
      palette: (t) => t.primaryPalette,
      tone: (t) => this.primaryFixed().getTone(t),
      isBackground: !0,
      toneDeltaPair: (t) => new H(this.primaryFixedDim(), this.primaryFixed(), 5, "darker", !0, "exact")
    });
    return T(super.primaryFixedDim(), "2025", e);
  }
  onPrimaryFixed() {
    const e = p.fromPalette({
      name: "on_primary_fixed",
      palette: (t) => t.primaryPalette,
      background: (t) => this.primaryFixedDim(),
      contrastCurve: (t) => S(7)
    });
    return T(super.onPrimaryFixed(), "2025", e);
  }
  onPrimaryFixedVariant() {
    const e = p.fromPalette({
      name: "on_primary_fixed_variant",
      palette: (t) => t.primaryPalette,
      background: (t) => this.primaryFixedDim(),
      contrastCurve: (t) => S(4.5)
    });
    return T(super.onPrimaryFixedVariant(), "2025", e);
  }
  inversePrimary() {
    const e = p.fromPalette({
      name: "inverse_primary",
      palette: (t) => t.primaryPalette,
      tone: (t) => I(t.primaryPalette),
      background: (t) => this.inverseSurface(),
      contrastCurve: (t) => t.platform === "phone" ? S(6) : S(7)
    });
    return T(super.inversePrimary(), "2025", e);
  }
  secondary() {
    const e = p.fromPalette({
      name: "secondary",
      palette: (t) => t.secondaryPalette,
      tone: (t) => t.platform === "watch" ? t.variant === s.NEUTRAL ? 90 : I(t.secondaryPalette, 0, 90) : t.variant === s.NEUTRAL ? t.isDark ? ot(t.secondaryPalette, 0, 98) : I(t.secondaryPalette) : t.variant === s.VIBRANT ? I(t.secondaryPalette, 0, t.isDark ? 90 : 98) : t.isDark ? 80 : I(t.secondaryPalette),
      isBackground: !0,
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : this.surfaceContainerHigh(),
      contrastCurve: (t) => t.platform === "phone" ? S(4.5) : S(7),
      toneDeltaPair: (t) => t.platform === "phone" ? new H(this.secondaryContainer(), this.secondary(), 5, "relative_lighter", !0, "farther") : void 0
    });
    return T(super.secondary(), "2025", e);
  }
  secondaryDim() {
    return p.fromPalette({
      name: "secondary_dim",
      palette: (e) => e.secondaryPalette,
      tone: (e) => e.variant === s.NEUTRAL ? 85 : I(e.secondaryPalette, 0, 90),
      isBackground: !0,
      background: (e) => this.surfaceContainerHigh(),
      contrastCurve: (e) => S(4.5),
      toneDeltaPair: (e) => new H(this.secondaryDim(), this.secondary(), 5, "darker", !0, "farther")
    });
  }
  onSecondary() {
    const e = p.fromPalette({
      name: "on_secondary",
      palette: (t) => t.secondaryPalette,
      background: (t) => t.platform === "phone" ? this.secondary() : this.secondaryDim(),
      contrastCurve: (t) => t.platform === "phone" ? S(6) : S(7)
    });
    return T(super.onSecondary(), "2025", e);
  }
  secondaryContainer() {
    const e = p.fromPalette({
      name: "secondary_container",
      palette: (t) => t.secondaryPalette,
      tone: (t) => t.platform === "watch" ? 30 : t.variant === s.VIBRANT ? t.isDark ? ot(t.secondaryPalette, 30, 40) : I(t.secondaryPalette, 84, 90) : t.variant === s.EXPRESSIVE ? t.isDark ? 15 : I(t.secondaryPalette, 90, 95) : t.isDark ? 25 : 90,
      isBackground: !0,
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : void 0,
      toneDeltaPair: (t) => t.platform === "watch" ? new H(this.secondaryContainer(), this.secondaryDim(), 10, "darker", !0, "farther") : void 0,
      contrastCurve: (t) => t.platform === "phone" && t.contrastLevel > 0 ? S(1.5) : void 0
    });
    return T(super.secondaryContainer(), "2025", e);
  }
  onSecondaryContainer() {
    const e = p.fromPalette({
      name: "on_secondary_container",
      palette: (t) => t.secondaryPalette,
      background: (t) => this.secondaryContainer(),
      contrastCurve: (t) => t.platform === "phone" ? S(6) : S(7)
    });
    return T(super.onSecondaryContainer(), "2025", e);
  }
  secondaryFixed() {
    const e = p.fromPalette({
      name: "secondary_fixed",
      palette: (t) => t.secondaryPalette,
      tone: (t) => {
        let r = Object.assign({}, t, {
          isDark: !1,
          contrastLevel: 0
        });
        return this.secondaryContainer().getTone(r);
      },
      isBackground: !0,
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : void 0,
      contrastCurve: (t) => t.platform === "phone" && t.contrastLevel > 0 ? S(1.5) : void 0
    });
    return T(super.secondaryFixed(), "2025", e);
  }
  secondaryFixedDim() {
    const e = p.fromPalette({
      name: "secondary_fixed_dim",
      palette: (t) => t.secondaryPalette,
      tone: (t) => this.secondaryFixed().getTone(t),
      isBackground: !0,
      toneDeltaPair: (t) => new H(this.secondaryFixedDim(), this.secondaryFixed(), 5, "darker", !0, "exact")
    });
    return T(super.secondaryFixedDim(), "2025", e);
  }
  onSecondaryFixed() {
    const e = p.fromPalette({
      name: "on_secondary_fixed",
      palette: (t) => t.secondaryPalette,
      background: (t) => this.secondaryFixedDim(),
      contrastCurve: (t) => S(7)
    });
    return T(super.onSecondaryFixed(), "2025", e);
  }
  onSecondaryFixedVariant() {
    const e = p.fromPalette({
      name: "on_secondary_fixed_variant",
      palette: (t) => t.secondaryPalette,
      background: (t) => this.secondaryFixedDim(),
      contrastCurve: (t) => S(4.5)
    });
    return T(super.onSecondaryFixedVariant(), "2025", e);
  }
  tertiary() {
    const e = p.fromPalette({
      name: "tertiary",
      palette: (t) => t.tertiaryPalette,
      tone: (t) => t.platform === "watch" ? t.variant === s.TONAL_SPOT ? I(t.tertiaryPalette, 0, 90) : I(t.tertiaryPalette) : t.variant === s.EXPRESSIVE || t.variant === s.VIBRANT ? I(t.tertiaryPalette, 0, L.isCyan(t.tertiaryPalette.hue) ? 88 : t.isDark ? 98 : 100) : t.isDark ? I(t.tertiaryPalette, 0, 98) : I(t.tertiaryPalette),
      isBackground: !0,
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : this.surfaceContainerHigh(),
      contrastCurve: (t) => t.platform === "phone" ? S(4.5) : S(7),
      toneDeltaPair: (t) => t.platform === "phone" ? new H(this.tertiaryContainer(), this.tertiary(), 5, "relative_lighter", !0, "farther") : void 0
    });
    return T(super.tertiary(), "2025", e);
  }
  tertiaryDim() {
    return p.fromPalette({
      name: "tertiary_dim",
      palette: (e) => e.tertiaryPalette,
      tone: (e) => e.variant === s.TONAL_SPOT ? I(e.tertiaryPalette, 0, 90) : I(e.tertiaryPalette),
      isBackground: !0,
      background: (e) => this.surfaceContainerHigh(),
      contrastCurve: (e) => S(4.5),
      toneDeltaPair: (e) => new H(this.tertiaryDim(), this.tertiary(), 5, "darker", !0, "farther")
    });
  }
  onTertiary() {
    const e = p.fromPalette({
      name: "on_tertiary",
      palette: (t) => t.tertiaryPalette,
      background: (t) => t.platform === "phone" ? this.tertiary() : this.tertiaryDim(),
      contrastCurve: (t) => t.platform === "phone" ? S(6) : S(7)
    });
    return T(super.onTertiary(), "2025", e);
  }
  tertiaryContainer() {
    const e = p.fromPalette({
      name: "tertiary_container",
      palette: (t) => t.tertiaryPalette,
      tone: (t) => t.platform === "watch" ? t.variant === s.TONAL_SPOT ? I(t.tertiaryPalette, 0, 90) : I(t.tertiaryPalette) : t.variant === s.NEUTRAL ? t.isDark ? I(t.tertiaryPalette, 0, 93) : I(t.tertiaryPalette, 0, 96) : t.variant === s.TONAL_SPOT ? I(t.tertiaryPalette, 0, t.isDark ? 93 : 100) : t.variant === s.EXPRESSIVE ? I(t.tertiaryPalette, 75, L.isCyan(t.tertiaryPalette.hue) ? 88 : t.isDark ? 93 : 100) : t.isDark ? I(t.tertiaryPalette, 0, 93) : I(t.tertiaryPalette, 72, 100),
      isBackground: !0,
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : void 0,
      toneDeltaPair: (t) => t.platform === "watch" ? new H(this.tertiaryContainer(), this.tertiaryDim(), 10, "darker", !0, "farther") : void 0,
      contrastCurve: (t) => t.platform === "phone" && t.contrastLevel > 0 ? S(1.5) : void 0
    });
    return T(super.tertiaryContainer(), "2025", e);
  }
  onTertiaryContainer() {
    const e = p.fromPalette({
      name: "on_tertiary_container",
      palette: (t) => t.tertiaryPalette,
      background: (t) => this.tertiaryContainer(),
      contrastCurve: (t) => t.platform === "phone" ? S(6) : S(7)
    });
    return T(super.onTertiaryContainer(), "2025", e);
  }
  tertiaryFixed() {
    const e = p.fromPalette({
      name: "tertiary_fixed",
      palette: (t) => t.tertiaryPalette,
      tone: (t) => {
        let r = Object.assign({}, t, {
          isDark: !1,
          contrastLevel: 0
        });
        return this.tertiaryContainer().getTone(r);
      },
      isBackground: !0,
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : void 0,
      contrastCurve: (t) => t.platform === "phone" && t.contrastLevel > 0 ? S(1.5) : void 0
    });
    return T(super.tertiaryFixed(), "2025", e);
  }
  tertiaryFixedDim() {
    const e = p.fromPalette({
      name: "tertiary_fixed_dim",
      palette: (t) => t.tertiaryPalette,
      tone: (t) => this.tertiaryFixed().getTone(t),
      isBackground: !0,
      toneDeltaPair: (t) => new H(this.tertiaryFixedDim(), this.tertiaryFixed(), 5, "darker", !0, "exact")
    });
    return T(super.tertiaryFixedDim(), "2025", e);
  }
  onTertiaryFixed() {
    const e = p.fromPalette({
      name: "on_tertiary_fixed",
      palette: (t) => t.tertiaryPalette,
      background: (t) => this.tertiaryFixedDim(),
      contrastCurve: (t) => S(7)
    });
    return T(super.onTertiaryFixed(), "2025", e);
  }
  onTertiaryFixedVariant() {
    const e = p.fromPalette({
      name: "on_tertiary_fixed_variant",
      palette: (t) => t.tertiaryPalette,
      background: (t) => this.tertiaryFixedDim(),
      contrastCurve: (t) => S(4.5)
    });
    return T(super.onTertiaryFixedVariant(), "2025", e);
  }
  error() {
    const e = p.fromPalette({
      name: "error",
      palette: (t) => t.errorPalette,
      tone: (t) => t.platform === "phone" ? t.isDark ? ot(t.errorPalette, 0, 98) : I(t.errorPalette) : ot(t.errorPalette),
      isBackground: !0,
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : this.surfaceContainerHigh(),
      contrastCurve: (t) => t.platform === "phone" ? S(4.5) : S(7),
      toneDeltaPair: (t) => t.platform === "phone" ? new H(this.errorContainer(), this.error(), 5, "relative_lighter", !0, "farther") : void 0
    });
    return T(super.error(), "2025", e);
  }
  errorDim() {
    return p.fromPalette({
      name: "error_dim",
      palette: (e) => e.errorPalette,
      tone: (e) => ot(e.errorPalette),
      isBackground: !0,
      background: (e) => this.surfaceContainerHigh(),
      contrastCurve: (e) => S(4.5),
      toneDeltaPair: (e) => new H(this.errorDim(), this.error(), 5, "darker", !0, "farther")
    });
  }
  onError() {
    const e = p.fromPalette({
      name: "on_error",
      palette: (t) => t.errorPalette,
      background: (t) => t.platform === "phone" ? this.error() : this.errorDim(),
      contrastCurve: (t) => t.platform === "phone" ? S(6) : S(7)
    });
    return T(super.onError(), "2025", e);
  }
  errorContainer() {
    const e = p.fromPalette({
      name: "error_container",
      palette: (t) => t.errorPalette,
      tone: (t) => t.platform === "watch" ? 30 : t.isDark ? ot(t.errorPalette, 30, 93) : I(t.errorPalette, 0, 90),
      isBackground: !0,
      background: (t) => t.platform === "phone" ? this.highestSurface(t) : void 0,
      toneDeltaPair: (t) => t.platform === "watch" ? new H(this.errorContainer(), this.errorDim(), 10, "darker", !0, "farther") : void 0,
      contrastCurve: (t) => t.platform === "phone" && t.contrastLevel > 0 ? S(1.5) : void 0
    });
    return T(super.errorContainer(), "2025", e);
  }
  onErrorContainer() {
    const e = p.fromPalette({
      name: "on_error_container",
      palette: (t) => t.errorPalette,
      background: (t) => this.errorContainer(),
      contrastCurve: (t) => t.platform === "phone" ? S(4.5) : S(7)
    });
    return T(super.onErrorContainer(), "2025", e);
  }
  surfaceVariant() {
    const e = Object.assign(this.surfaceContainerHighest().clone(), { name: "surface_variant" });
    return T(super.surfaceVariant(), "2025", e);
  }
  surfaceTint() {
    const e = Object.assign(this.primary().clone(), { name: "surface_tint" });
    return T(super.surfaceTint(), "2025", e);
  }
  background() {
    const e = Object.assign(this.surface().clone(), { name: "background" });
    return T(super.background(), "2025", e);
  }
  onBackground() {
    const e = Object.assign(this.onSurface().clone(), {
      name: "on_background",
      tone: (t) => t.platform === "watch" ? 100 : this.onSurface().getTone(t)
    });
    return T(super.onBackground(), "2025", e);
  }
}, m = class C {
  constructor() {
    this.allColors = [
      this.background(),
      this.onBackground(),
      this.surface(),
      this.surfaceDim(),
      this.surfaceBright(),
      this.surfaceContainerLowest(),
      this.surfaceContainerLow(),
      this.surfaceContainer(),
      this.surfaceContainerHigh(),
      this.surfaceContainerHighest(),
      this.onSurface(),
      this.onSurfaceVariant(),
      this.outline(),
      this.outlineVariant(),
      this.inverseSurface(),
      this.inverseOnSurface(),
      this.primary(),
      this.primaryDim(),
      this.onPrimary(),
      this.primaryContainer(),
      this.onPrimaryContainer(),
      this.primaryFixed(),
      this.primaryFixedDim(),
      this.onPrimaryFixed(),
      this.onPrimaryFixedVariant(),
      this.inversePrimary(),
      this.secondary(),
      this.secondaryDim(),
      this.onSecondary(),
      this.secondaryContainer(),
      this.onSecondaryContainer(),
      this.secondaryFixed(),
      this.secondaryFixedDim(),
      this.onSecondaryFixed(),
      this.onSecondaryFixedVariant(),
      this.tertiary(),
      this.tertiaryDim(),
      this.onTertiary(),
      this.tertiaryContainer(),
      this.onTertiaryContainer(),
      this.tertiaryFixed(),
      this.tertiaryFixedDim(),
      this.onTertiaryFixed(),
      this.onTertiaryFixedVariant(),
      this.error(),
      this.errorDim(),
      this.onError(),
      this.errorContainer(),
      this.onErrorContainer()
    ].filter((t) => t !== void 0);
  }
  highestSurface(t) {
    return C.colorSpec.highestSurface(t);
  }
  primaryPaletteKeyColor() {
    return C.colorSpec.primaryPaletteKeyColor();
  }
  secondaryPaletteKeyColor() {
    return C.colorSpec.secondaryPaletteKeyColor();
  }
  tertiaryPaletteKeyColor() {
    return C.colorSpec.tertiaryPaletteKeyColor();
  }
  neutralPaletteKeyColor() {
    return C.colorSpec.neutralPaletteKeyColor();
  }
  neutralVariantPaletteKeyColor() {
    return C.colorSpec.neutralVariantPaletteKeyColor();
  }
  errorPaletteKeyColor() {
    return C.colorSpec.errorPaletteKeyColor();
  }
  background() {
    return C.colorSpec.background();
  }
  onBackground() {
    return C.colorSpec.onBackground();
  }
  surface() {
    return C.colorSpec.surface();
  }
  surfaceDim() {
    return C.colorSpec.surfaceDim();
  }
  surfaceBright() {
    return C.colorSpec.surfaceBright();
  }
  surfaceContainerLowest() {
    return C.colorSpec.surfaceContainerLowest();
  }
  surfaceContainerLow() {
    return C.colorSpec.surfaceContainerLow();
  }
  surfaceContainer() {
    return C.colorSpec.surfaceContainer();
  }
  surfaceContainerHigh() {
    return C.colorSpec.surfaceContainerHigh();
  }
  surfaceContainerHighest() {
    return C.colorSpec.surfaceContainerHighest();
  }
  onSurface() {
    return C.colorSpec.onSurface();
  }
  surfaceVariant() {
    return C.colorSpec.surfaceVariant();
  }
  onSurfaceVariant() {
    return C.colorSpec.onSurfaceVariant();
  }
  outline() {
    return C.colorSpec.outline();
  }
  outlineVariant() {
    return C.colorSpec.outlineVariant();
  }
  inverseSurface() {
    return C.colorSpec.inverseSurface();
  }
  inverseOnSurface() {
    return C.colorSpec.inverseOnSurface();
  }
  shadow() {
    return C.colorSpec.shadow();
  }
  scrim() {
    return C.colorSpec.scrim();
  }
  surfaceTint() {
    return C.colorSpec.surfaceTint();
  }
  primary() {
    return C.colorSpec.primary();
  }
  primaryDim() {
    return C.colorSpec.primaryDim();
  }
  onPrimary() {
    return C.colorSpec.onPrimary();
  }
  primaryContainer() {
    return C.colorSpec.primaryContainer();
  }
  onPrimaryContainer() {
    return C.colorSpec.onPrimaryContainer();
  }
  inversePrimary() {
    return C.colorSpec.inversePrimary();
  }
  primaryFixed() {
    return C.colorSpec.primaryFixed();
  }
  primaryFixedDim() {
    return C.colorSpec.primaryFixedDim();
  }
  onPrimaryFixed() {
    return C.colorSpec.onPrimaryFixed();
  }
  onPrimaryFixedVariant() {
    return C.colorSpec.onPrimaryFixedVariant();
  }
  secondary() {
    return C.colorSpec.secondary();
  }
  secondaryDim() {
    return C.colorSpec.secondaryDim();
  }
  onSecondary() {
    return C.colorSpec.onSecondary();
  }
  secondaryContainer() {
    return C.colorSpec.secondaryContainer();
  }
  onSecondaryContainer() {
    return C.colorSpec.onSecondaryContainer();
  }
  secondaryFixed() {
    return C.colorSpec.secondaryFixed();
  }
  secondaryFixedDim() {
    return C.colorSpec.secondaryFixedDim();
  }
  onSecondaryFixed() {
    return C.colorSpec.onSecondaryFixed();
  }
  onSecondaryFixedVariant() {
    return C.colorSpec.onSecondaryFixedVariant();
  }
  tertiary() {
    return C.colorSpec.tertiary();
  }
  tertiaryDim() {
    return C.colorSpec.tertiaryDim();
  }
  onTertiary() {
    return C.colorSpec.onTertiary();
  }
  tertiaryContainer() {
    return C.colorSpec.tertiaryContainer();
  }
  onTertiaryContainer() {
    return C.colorSpec.onTertiaryContainer();
  }
  tertiaryFixed() {
    return C.colorSpec.tertiaryFixed();
  }
  tertiaryFixedDim() {
    return C.colorSpec.tertiaryFixedDim();
  }
  onTertiaryFixed() {
    return C.colorSpec.onTertiaryFixed();
  }
  onTertiaryFixedVariant() {
    return C.colorSpec.onTertiaryFixedVariant();
  }
  error() {
    return C.colorSpec.error();
  }
  errorDim() {
    return C.colorSpec.errorDim();
  }
  onError() {
    return C.colorSpec.onError();
  }
  errorContainer() {
    return C.colorSpec.errorContainer();
  }
  onErrorContainer() {
    return C.colorSpec.onErrorContainer();
  }
  static highestSurface(t) {
    return C.colorSpec.highestSurface(t);
  }
};
m.contentAccentToneDelta = 15;
m.colorSpec = new br();
m.primaryPaletteKeyColor = m.colorSpec.primaryPaletteKeyColor();
m.secondaryPaletteKeyColor = m.colorSpec.secondaryPaletteKeyColor();
m.tertiaryPaletteKeyColor = m.colorSpec.tertiaryPaletteKeyColor();
m.neutralPaletteKeyColor = m.colorSpec.neutralPaletteKeyColor();
m.neutralVariantPaletteKeyColor = m.colorSpec.neutralVariantPaletteKeyColor();
m.background = m.colorSpec.background();
m.onBackground = m.colorSpec.onBackground();
m.surface = m.colorSpec.surface();
m.surfaceDim = m.colorSpec.surfaceDim();
m.surfaceBright = m.colorSpec.surfaceBright();
m.surfaceContainerLowest = m.colorSpec.surfaceContainerLowest();
m.surfaceContainerLow = m.colorSpec.surfaceContainerLow();
m.surfaceContainer = m.colorSpec.surfaceContainer();
m.surfaceContainerHigh = m.colorSpec.surfaceContainerHigh();
m.surfaceContainerHighest = m.colorSpec.surfaceContainerHighest();
m.onSurface = m.colorSpec.onSurface();
m.surfaceVariant = m.colorSpec.surfaceVariant();
m.onSurfaceVariant = m.colorSpec.onSurfaceVariant();
m.inverseSurface = m.colorSpec.inverseSurface();
m.inverseOnSurface = m.colorSpec.inverseOnSurface();
m.outline = m.colorSpec.outline();
m.outlineVariant = m.colorSpec.outlineVariant();
m.shadow = m.colorSpec.shadow();
m.scrim = m.colorSpec.scrim();
m.surfaceTint = m.colorSpec.surfaceTint();
m.primary = m.colorSpec.primary();
m.onPrimary = m.colorSpec.onPrimary();
m.primaryContainer = m.colorSpec.primaryContainer();
m.onPrimaryContainer = m.colorSpec.onPrimaryContainer();
m.inversePrimary = m.colorSpec.inversePrimary();
m.secondary = m.colorSpec.secondary();
m.onSecondary = m.colorSpec.onSecondary();
m.secondaryContainer = m.colorSpec.secondaryContainer();
m.onSecondaryContainer = m.colorSpec.onSecondaryContainer();
m.tertiary = m.colorSpec.tertiary();
m.onTertiary = m.colorSpec.onTertiary();
m.tertiaryContainer = m.colorSpec.tertiaryContainer();
m.onTertiaryContainer = m.colorSpec.onTertiaryContainer();
m.error = m.colorSpec.error();
m.onError = m.colorSpec.onError();
m.errorContainer = m.colorSpec.errorContainer();
m.onErrorContainer = m.colorSpec.onErrorContainer();
m.primaryFixed = m.colorSpec.primaryFixed();
m.primaryFixedDim = m.colorSpec.primaryFixedDim();
m.onPrimaryFixed = m.colorSpec.onPrimaryFixed();
m.onPrimaryFixedVariant = m.colorSpec.onPrimaryFixedVariant();
m.secondaryFixed = m.colorSpec.secondaryFixed();
m.secondaryFixedDim = m.colorSpec.secondaryFixedDim();
m.onSecondaryFixed = m.colorSpec.onSecondaryFixed();
m.onSecondaryFixedVariant = m.colorSpec.onSecondaryFixedVariant();
m.tertiaryFixed = m.colorSpec.tertiaryFixed();
m.tertiaryFixedDim = m.colorSpec.tertiaryFixedDim();
m.onTertiaryFixed = m.colorSpec.onTertiaryFixed();
m.onTertiaryFixedVariant = m.colorSpec.onTertiaryFixedVariant();
var N = class ae {
  static maybeFallbackSpecVersion(t, r) {
    switch (r) {
      case s.EXPRESSIVE:
      case s.VIBRANT:
      case s.TONAL_SPOT:
      case s.NEUTRAL:
        return t;
      default:
        return "2021";
    }
  }
  constructor(t) {
    this.sourceColorArgb = t.sourceColorHct.toInt(), this.variant = t.variant, this.contrastLevel = t.contrastLevel, this.isDark = t.isDark, this.platform = t.platform ?? "phone", this.specVersion = ae.maybeFallbackSpecVersion(t.specVersion ?? "2021", this.variant), this.sourceColorHct = t.sourceColorHct, this.primaryPalette = t.primaryPalette ?? Ct(this.specVersion).getPrimaryPalette(this.variant, t.sourceColorHct, this.isDark, this.platform, this.contrastLevel), this.secondaryPalette = t.secondaryPalette ?? Ct(this.specVersion).getSecondaryPalette(this.variant, t.sourceColorHct, this.isDark, this.platform, this.contrastLevel), this.tertiaryPalette = t.tertiaryPalette ?? Ct(this.specVersion).getTertiaryPalette(this.variant, t.sourceColorHct, this.isDark, this.platform, this.contrastLevel), this.neutralPalette = t.neutralPalette ?? Ct(this.specVersion).getNeutralPalette(this.variant, t.sourceColorHct, this.isDark, this.platform, this.contrastLevel), this.neutralVariantPalette = t.neutralVariantPalette ?? Ct(this.specVersion).getNeutralVariantPalette(this.variant, t.sourceColorHct, this.isDark, this.platform, this.contrastLevel), this.errorPalette = t.errorPalette ?? Ct(this.specVersion).getErrorPalette(this.variant, t.sourceColorHct, this.isDark, this.platform, this.contrastLevel) ?? _.fromHueAndChroma(25, 84), this.colors = new m();
  }
  toString() {
    return `Scheme: variant=${s[this.variant]}, mode=${this.isDark ? "dark" : "light"}, platform=${this.platform}, contrastLevel=${this.contrastLevel.toFixed(1)}, seed=${this.sourceColorHct.toString()}, specVersion=${this.specVersion}`;
  }
  static getPiecewiseHue(t, r, i) {
    const n = Math.min(r.length - 1, i.length), a = t.hue;
    for (let o = 0; o < n; o++) if (a >= r[o] && a < r[o + 1]) return G(i[o]);
    return a;
  }
  static getRotatedHue(t, r, i) {
    let n = ae.getPiecewiseHue(t, r, i);
    return Math.min(r.length - 1, i.length) <= 0 && (n = 0), G(t.hue + n);
  }
  getArgb(t) {
    return t.getArgb(this);
  }
  getHct(t) {
    return t.getHct(this);
  }
  get primaryPaletteKeyColor() {
    return this.getArgb(this.colors.primaryPaletteKeyColor());
  }
  get secondaryPaletteKeyColor() {
    return this.getArgb(this.colors.secondaryPaletteKeyColor());
  }
  get tertiaryPaletteKeyColor() {
    return this.getArgb(this.colors.tertiaryPaletteKeyColor());
  }
  get neutralPaletteKeyColor() {
    return this.getArgb(this.colors.neutralPaletteKeyColor());
  }
  get neutralVariantPaletteKeyColor() {
    return this.getArgb(this.colors.neutralVariantPaletteKeyColor());
  }
  get errorPaletteKeyColor() {
    return this.getArgb(this.colors.errorPaletteKeyColor());
  }
  get background() {
    return this.getArgb(this.colors.background());
  }
  get onBackground() {
    return this.getArgb(this.colors.onBackground());
  }
  get surface() {
    return this.getArgb(this.colors.surface());
  }
  get surfaceDim() {
    return this.getArgb(this.colors.surfaceDim());
  }
  get surfaceBright() {
    return this.getArgb(this.colors.surfaceBright());
  }
  get surfaceContainerLowest() {
    return this.getArgb(this.colors.surfaceContainerLowest());
  }
  get surfaceContainerLow() {
    return this.getArgb(this.colors.surfaceContainerLow());
  }
  get surfaceContainer() {
    return this.getArgb(this.colors.surfaceContainer());
  }
  get surfaceContainerHigh() {
    return this.getArgb(this.colors.surfaceContainerHigh());
  }
  get surfaceContainerHighest() {
    return this.getArgb(this.colors.surfaceContainerHighest());
  }
  get onSurface() {
    return this.getArgb(this.colors.onSurface());
  }
  get surfaceVariant() {
    return this.getArgb(this.colors.surfaceVariant());
  }
  get onSurfaceVariant() {
    return this.getArgb(this.colors.onSurfaceVariant());
  }
  get inverseSurface() {
    return this.getArgb(this.colors.inverseSurface());
  }
  get inverseOnSurface() {
    return this.getArgb(this.colors.inverseOnSurface());
  }
  get outline() {
    return this.getArgb(this.colors.outline());
  }
  get outlineVariant() {
    return this.getArgb(this.colors.outlineVariant());
  }
  get shadow() {
    return this.getArgb(this.colors.shadow());
  }
  get scrim() {
    return this.getArgb(this.colors.scrim());
  }
  get surfaceTint() {
    return this.getArgb(this.colors.surfaceTint());
  }
  get primary() {
    return this.getArgb(this.colors.primary());
  }
  get primaryDim() {
    const t = this.colors.primaryDim();
    if (t === void 0) throw new Error("`primaryDim` color is undefined prior to 2025 spec.");
    return this.getArgb(t);
  }
  get onPrimary() {
    return this.getArgb(this.colors.onPrimary());
  }
  get primaryContainer() {
    return this.getArgb(this.colors.primaryContainer());
  }
  get onPrimaryContainer() {
    return this.getArgb(this.colors.onPrimaryContainer());
  }
  get primaryFixed() {
    return this.getArgb(this.colors.primaryFixed());
  }
  get primaryFixedDim() {
    return this.getArgb(this.colors.primaryFixedDim());
  }
  get onPrimaryFixed() {
    return this.getArgb(this.colors.onPrimaryFixed());
  }
  get onPrimaryFixedVariant() {
    return this.getArgb(this.colors.onPrimaryFixedVariant());
  }
  get inversePrimary() {
    return this.getArgb(this.colors.inversePrimary());
  }
  get secondary() {
    return this.getArgb(this.colors.secondary());
  }
  get secondaryDim() {
    const t = this.colors.secondaryDim();
    if (t === void 0) throw new Error("`secondaryDim` color is undefined prior to 2025 spec.");
    return this.getArgb(t);
  }
  get onSecondary() {
    return this.getArgb(this.colors.onSecondary());
  }
  get secondaryContainer() {
    return this.getArgb(this.colors.secondaryContainer());
  }
  get onSecondaryContainer() {
    return this.getArgb(this.colors.onSecondaryContainer());
  }
  get secondaryFixed() {
    return this.getArgb(this.colors.secondaryFixed());
  }
  get secondaryFixedDim() {
    return this.getArgb(this.colors.secondaryFixedDim());
  }
  get onSecondaryFixed() {
    return this.getArgb(this.colors.onSecondaryFixed());
  }
  get onSecondaryFixedVariant() {
    return this.getArgb(this.colors.onSecondaryFixedVariant());
  }
  get tertiary() {
    return this.getArgb(this.colors.tertiary());
  }
  get tertiaryDim() {
    const t = this.colors.tertiaryDim();
    if (t === void 0) throw new Error("`tertiaryDim` color is undefined prior to 2025 spec.");
    return this.getArgb(t);
  }
  get onTertiary() {
    return this.getArgb(this.colors.onTertiary());
  }
  get tertiaryContainer() {
    return this.getArgb(this.colors.tertiaryContainer());
  }
  get onTertiaryContainer() {
    return this.getArgb(this.colors.onTertiaryContainer());
  }
  get tertiaryFixed() {
    return this.getArgb(this.colors.tertiaryFixed());
  }
  get tertiaryFixedDim() {
    return this.getArgb(this.colors.tertiaryFixedDim());
  }
  get onTertiaryFixed() {
    return this.getArgb(this.colors.onTertiaryFixed());
  }
  get onTertiaryFixedVariant() {
    return this.getArgb(this.colors.onTertiaryFixedVariant());
  }
  get error() {
    return this.getArgb(this.colors.error());
  }
  get errorDim() {
    const t = this.colors.errorDim();
    if (t === void 0) throw new Error("`errorDim` color is undefined prior to 2025 spec.");
    return this.getArgb(t);
  }
  get onError() {
    return this.getArgb(this.colors.onError());
  }
  get errorContainer() {
    return this.getArgb(this.colors.errorContainer());
  }
  get onErrorContainer() {
    return this.getArgb(this.colors.onErrorContainer());
  }
};
N.DEFAULT_SPEC_VERSION = "2021";
N.DEFAULT_PLATFORM = "phone";
var He = class {
  getPrimaryPalette(e, t, r, i, n) {
    switch (e) {
      case s.CONTENT:
      case s.FIDELITY:
        return _.fromHueAndChroma(t.hue, t.chroma);
      case s.FRUIT_SALAD:
        return _.fromHueAndChroma(G(t.hue - 50), 48);
      case s.MONOCHROME:
        return _.fromHueAndChroma(t.hue, 0);
      case s.NEUTRAL:
        return _.fromHueAndChroma(t.hue, 12);
      case s.RAINBOW:
        return _.fromHueAndChroma(t.hue, 48);
      case s.TONAL_SPOT:
        return _.fromHueAndChroma(t.hue, 36);
      case s.EXPRESSIVE:
        return _.fromHueAndChroma(G(t.hue + 240), 40);
      case s.VIBRANT:
        return _.fromHueAndChroma(t.hue, 200);
      default:
        throw new Error(`Unsupported variant: ${e}`);
    }
  }
  getSecondaryPalette(e, t, r, i, n) {
    switch (e) {
      case s.CONTENT:
      case s.FIDELITY:
        return _.fromHueAndChroma(t.hue, Math.max(t.chroma - 32, t.chroma * 0.5));
      case s.FRUIT_SALAD:
        return _.fromHueAndChroma(G(t.hue - 50), 36);
      case s.MONOCHROME:
        return _.fromHueAndChroma(t.hue, 0);
      case s.NEUTRAL:
        return _.fromHueAndChroma(t.hue, 8);
      case s.RAINBOW:
        return _.fromHueAndChroma(t.hue, 16);
      case s.TONAL_SPOT:
        return _.fromHueAndChroma(t.hue, 16);
      case s.EXPRESSIVE:
        return _.fromHueAndChroma(N.getRotatedHue(t, [
          0,
          21,
          51,
          121,
          151,
          191,
          271,
          321,
          360
        ], [
          45,
          95,
          45,
          20,
          45,
          90,
          45,
          45,
          45
        ]), 24);
      case s.VIBRANT:
        return _.fromHueAndChroma(N.getRotatedHue(t, [
          0,
          41,
          61,
          101,
          131,
          181,
          251,
          301,
          360
        ], [
          18,
          15,
          10,
          12,
          15,
          18,
          15,
          12,
          12
        ]), 24);
      default:
        throw new Error(`Unsupported variant: ${e}`);
    }
  }
  getTertiaryPalette(e, t, r, i, n) {
    switch (e) {
      case s.CONTENT:
        return _.fromHct(ne.fixIfDisliked(new ye(t).analogous(3, 6)[2]));
      case s.FIDELITY:
        return _.fromHct(ne.fixIfDisliked(new ye(t).complement));
      case s.FRUIT_SALAD:
        return _.fromHueAndChroma(t.hue, 36);
      case s.MONOCHROME:
        return _.fromHueAndChroma(t.hue, 0);
      case s.NEUTRAL:
        return _.fromHueAndChroma(t.hue, 16);
      case s.RAINBOW:
      case s.TONAL_SPOT:
        return _.fromHueAndChroma(G(t.hue + 60), 24);
      case s.EXPRESSIVE:
        return _.fromHueAndChroma(N.getRotatedHue(t, [
          0,
          21,
          51,
          121,
          151,
          191,
          271,
          321,
          360
        ], [
          120,
          120,
          20,
          45,
          20,
          15,
          20,
          120,
          120
        ]), 32);
      case s.VIBRANT:
        return _.fromHueAndChroma(N.getRotatedHue(t, [
          0,
          41,
          61,
          101,
          131,
          181,
          251,
          301,
          360
        ], [
          35,
          30,
          20,
          25,
          30,
          35,
          30,
          25,
          25
        ]), 32);
      default:
        throw new Error(`Unsupported variant: ${e}`);
    }
  }
  getNeutralPalette(e, t, r, i, n) {
    switch (e) {
      case s.CONTENT:
      case s.FIDELITY:
        return _.fromHueAndChroma(t.hue, t.chroma / 8);
      case s.FRUIT_SALAD:
        return _.fromHueAndChroma(t.hue, 10);
      case s.MONOCHROME:
        return _.fromHueAndChroma(t.hue, 0);
      case s.NEUTRAL:
        return _.fromHueAndChroma(t.hue, 2);
      case s.RAINBOW:
        return _.fromHueAndChroma(t.hue, 0);
      case s.TONAL_SPOT:
        return _.fromHueAndChroma(t.hue, 6);
      case s.EXPRESSIVE:
        return _.fromHueAndChroma(G(t.hue + 15), 8);
      case s.VIBRANT:
        return _.fromHueAndChroma(t.hue, 10);
      default:
        throw new Error(`Unsupported variant: ${e}`);
    }
  }
  getNeutralVariantPalette(e, t, r, i, n) {
    switch (e) {
      case s.CONTENT:
        return _.fromHueAndChroma(t.hue, t.chroma / 8 + 4);
      case s.FIDELITY:
        return _.fromHueAndChroma(t.hue, t.chroma / 8 + 4);
      case s.FRUIT_SALAD:
        return _.fromHueAndChroma(t.hue, 16);
      case s.MONOCHROME:
        return _.fromHueAndChroma(t.hue, 0);
      case s.NEUTRAL:
        return _.fromHueAndChroma(t.hue, 2);
      case s.RAINBOW:
        return _.fromHueAndChroma(t.hue, 0);
      case s.TONAL_SPOT:
        return _.fromHueAndChroma(t.hue, 8);
      case s.EXPRESSIVE:
        return _.fromHueAndChroma(G(t.hue + 15), 12);
      case s.VIBRANT:
        return _.fromHueAndChroma(t.hue, 12);
      default:
        throw new Error(`Unsupported variant: ${e}`);
    }
  }
  getErrorPalette(e, t, r, i, n) {
  }
}, gr = class Q extends He {
  getPrimaryPalette(t, r, i, n, a) {
    switch (t) {
      case s.NEUTRAL:
        return _.fromHueAndChroma(r.hue, n === "phone" ? L.isBlue(r.hue) ? 12 : 8 : L.isBlue(r.hue) ? 16 : 12);
      case s.TONAL_SPOT:
        return _.fromHueAndChroma(r.hue, n === "phone" && i ? 26 : 32);
      case s.EXPRESSIVE:
        return _.fromHueAndChroma(r.hue, n === "phone" ? i ? 36 : 48 : 40);
      case s.VIBRANT:
        return _.fromHueAndChroma(r.hue, n === "phone" ? 74 : 56);
      default:
        return super.getPrimaryPalette(t, r, i, n, a);
    }
  }
  getSecondaryPalette(t, r, i, n, a) {
    switch (t) {
      case s.NEUTRAL:
        return _.fromHueAndChroma(r.hue, n === "phone" ? L.isBlue(r.hue) ? 6 : 4 : L.isBlue(r.hue) ? 10 : 6);
      case s.TONAL_SPOT:
        return _.fromHueAndChroma(r.hue, 16);
      case s.EXPRESSIVE:
        return _.fromHueAndChroma(N.getRotatedHue(r, [
          0,
          105,
          140,
          204,
          253,
          278,
          300,
          333,
          360
        ], [
          -160,
          155,
          -100,
          96,
          -96,
          -156,
          -165,
          -160
        ]), n === "phone" && i ? 16 : 24);
      case s.VIBRANT:
        return _.fromHueAndChroma(N.getRotatedHue(r, [
          0,
          38,
          105,
          140,
          333,
          360
        ], [
          -14,
          10,
          -14,
          10,
          -14
        ]), n === "phone" ? 56 : 36);
      default:
        return super.getSecondaryPalette(t, r, i, n, a);
    }
  }
  getTertiaryPalette(t, r, i, n, a) {
    switch (t) {
      case s.NEUTRAL:
        return _.fromHueAndChroma(N.getRotatedHue(r, [
          0,
          38,
          105,
          161,
          204,
          278,
          333,
          360
        ], [
          -32,
          26,
          10,
          -39,
          24,
          -15,
          -32
        ]), n === "phone" ? 20 : 36);
      case s.TONAL_SPOT:
        return _.fromHueAndChroma(N.getRotatedHue(r, [
          0,
          20,
          71,
          161,
          333,
          360
        ], [
          -40,
          48,
          -32,
          40,
          -32
        ]), n === "phone" ? 28 : 32);
      case s.EXPRESSIVE:
        return _.fromHueAndChroma(N.getRotatedHue(r, [
          0,
          105,
          140,
          204,
          253,
          278,
          300,
          333,
          360
        ], [
          -165,
          160,
          -105,
          101,
          -101,
          -160,
          -170,
          -165
        ]), 48);
      case s.VIBRANT:
        return _.fromHueAndChroma(N.getRotatedHue(r, [
          0,
          38,
          71,
          105,
          140,
          161,
          253,
          333,
          360
        ], [
          -72,
          35,
          24,
          -24,
          62,
          50,
          62,
          -72
        ]), 56);
      default:
        return super.getTertiaryPalette(t, r, i, n, a);
    }
  }
  static getExpressiveNeutralHue(t) {
    return N.getRotatedHue(t, [
      0,
      71,
      124,
      253,
      278,
      300,
      360
    ], [
      10,
      0,
      10,
      0,
      10,
      0
    ]);
  }
  static getExpressiveNeutralChroma(t, r, i) {
    const n = Q.getExpressiveNeutralHue(t);
    return i === "phone" ? r ? L.isYellow(n) ? 6 : 14 : 18 : 12;
  }
  static getVibrantNeutralHue(t) {
    return N.getRotatedHue(t, [
      0,
      38,
      105,
      140,
      333,
      360
    ], [
      -14,
      10,
      -14,
      10,
      -14
    ]);
  }
  static getVibrantNeutralChroma(t, r) {
    const i = Q.getVibrantNeutralHue(t);
    return r === "phone" || L.isBlue(i) ? 28 : 20;
  }
  getNeutralPalette(t, r, i, n, a) {
    switch (t) {
      case s.NEUTRAL:
        return _.fromHueAndChroma(r.hue, n === "phone" ? 1.4 : 6);
      case s.TONAL_SPOT:
        return _.fromHueAndChroma(r.hue, n === "phone" ? 5 : 10);
      case s.EXPRESSIVE:
        return _.fromHueAndChroma(Q.getExpressiveNeutralHue(r), Q.getExpressiveNeutralChroma(r, i, n));
      case s.VIBRANT:
        return _.fromHueAndChroma(Q.getVibrantNeutralHue(r), Q.getVibrantNeutralChroma(r, n));
      default:
        return super.getNeutralPalette(t, r, i, n, a);
    }
  }
  getNeutralVariantPalette(t, r, i, n, a) {
    switch (t) {
      case s.NEUTRAL:
        return _.fromHueAndChroma(r.hue, (n === "phone" ? 1.4 : 6) * 2.2);
      case s.TONAL_SPOT:
        return _.fromHueAndChroma(r.hue, (n === "phone" ? 5 : 10) * 1.7);
      case s.EXPRESSIVE:
        const o = Q.getExpressiveNeutralHue(r), l = Q.getExpressiveNeutralChroma(r, i, n);
        return _.fromHueAndChroma(o, l * (o >= 105 && o < 125 ? 1.6 : 2.3));
      case s.VIBRANT:
        const d = Q.getVibrantNeutralHue(r), h = Q.getVibrantNeutralChroma(r, n);
        return _.fromHueAndChroma(d, h * 1.29);
      default:
        return super.getNeutralVariantPalette(t, r, i, n, a);
    }
  }
  getErrorPalette(t, r, i, n, a) {
    const o = N.getPiecewiseHue(r, [
      0,
      3,
      13,
      23,
      33,
      43,
      153,
      273,
      360
    ], [
      12,
      22,
      32,
      12,
      22,
      32,
      22,
      12
    ]);
    switch (t) {
      case s.NEUTRAL:
        return _.fromHueAndChroma(o, n === "phone" ? 50 : 40);
      case s.TONAL_SPOT:
        return _.fromHueAndChroma(o, n === "phone" ? 60 : 48);
      case s.EXPRESSIVE:
        return _.fromHueAndChroma(o, n === "phone" ? 64 : 48);
      case s.VIBRANT:
        return _.fromHueAndChroma(o, n === "phone" ? 80 : 60);
      default:
        return super.getErrorPalette(t, r, i, n, a);
    }
  }
}, fr = new He(), vr = new gr();
function Ct(e) {
  return e === "2025" ? vr : fr;
}
var At = class J {
  static of(t) {
    return new J(t, !1);
  }
  static contentOf(t) {
    return new J(t, !0);
  }
  static fromColors(t) {
    return J.createPaletteFromColors(!1, t);
  }
  static contentFromColors(t) {
    return J.createPaletteFromColors(!0, t);
  }
  static createPaletteFromColors(t, r) {
    const i = new J(r.primary, t);
    return r.secondary && (i.a2 = new J(r.secondary, t).a1), r.tertiary && (i.a3 = new J(r.tertiary, t).a1), r.error && (i.error = new J(r.error, t).a1), r.neutral && (i.n1 = new J(r.neutral, t).n1), r.neutralVariant && (i.n2 = new J(r.neutralVariant, t).n2), i;
  }
  constructor(t, r) {
    const i = L.fromInt(t), n = i.hue, a = i.chroma;
    r ? (this.a1 = _.fromHueAndChroma(n, a), this.a2 = _.fromHueAndChroma(n, a / 3), this.a3 = _.fromHueAndChroma(n + 60, a / 2), this.n1 = _.fromHueAndChroma(n, Math.min(a / 12, 4)), this.n2 = _.fromHueAndChroma(n, Math.min(a / 6, 8))) : (this.a1 = _.fromHueAndChroma(n, Math.max(48, a)), this.a2 = _.fromHueAndChroma(n, 16), this.a3 = _.fromHueAndChroma(n + 60, 24), this.n1 = _.fromHueAndChroma(n, 4), this.n2 = _.fromHueAndChroma(n, 8)), this.error = _.fromHueAndChroma(25, 84);
  }
}, yr = class {
  fromInt(e) {
    return Ie(e);
  }
  toInt(e) {
    return ir(e[0], e[1], e[2]);
  }
  distance(e, t) {
    const r = e[0] - t[0], i = e[1] - t[1], n = e[2] - t[2];
    return r * r + i * i + n * n;
  }
}, _r = 10, Cr = 3, xr = class {
  static quantize(e, t, r) {
    const i = /* @__PURE__ */ new Map(), n = new Array(), a = new Array(), o = new yr();
    let l = 0;
    for (let y = 0; y < e.length; y++) {
      const w = e[y], E = i.get(w);
      E === void 0 ? (l++, n.push(o.fromInt(w)), a.push(w), i.set(w, 1)) : i.set(w, E + 1);
    }
    const d = new Array();
    for (let y = 0; y < l; y++) {
      const w = a[y], E = i.get(w);
      E !== void 0 && (d[y] = E);
    }
    let h = Math.min(r, l);
    t.length > 0 && (h = Math.min(h, t.length));
    const u = new Array();
    for (let y = 0; y < t.length; y++) u.push(o.fromInt(t[y]));
    const b = h - u.length;
    if (t.length === 0 && b > 0) for (let y = 0; y < b; y++) {
      const w = Math.random() * 100, E = Math.random() * 201 + -100, F = Math.random() * 201 + -100;
      u.push(new Array(w, E, F));
    }
    const v = new Array();
    for (let y = 0; y < l; y++) v.push(Math.floor(Math.random() * h));
    const g = new Array();
    for (let y = 0; y < h; y++) {
      g.push(new Array());
      for (let w = 0; w < h; w++) g[y].push(0);
    }
    const c = new Array();
    for (let y = 0; y < h; y++) {
      c.push(new Array());
      for (let w = 0; w < h; w++) c[y].push(new Ar());
    }
    const f = new Array();
    for (let y = 0; y < h; y++) f.push(0);
    for (let y = 0; y < _r; y++) {
      for (let A = 0; A < h; A++) {
        for (let k = A + 1; k < h; k++) {
          const D = o.distance(u[A], u[k]);
          c[k][A].distance = D, c[k][A].index = A, c[A][k].distance = D, c[A][k].index = k;
        }
        c[A].sort();
        for (let k = 0; k < h; k++) g[A][k] = c[A][k].index;
      }
      let w = 0;
      for (let A = 0; A < l; A++) {
        const k = n[A], D = v[A], R = u[D], j = o.distance(k, R);
        let Y = j, O = -1;
        for (let K = 0; K < h; K++) {
          if (c[D][K].distance >= 4 * j) continue;
          const at = o.distance(k, u[K]);
          at < Y && (Y = at, O = K);
        }
        O !== -1 && Math.abs(Math.sqrt(Y) - Math.sqrt(j)) > Cr && (w++, v[A] = O);
      }
      if (w === 0 && y !== 0) break;
      const E = new Array(h).fill(0), F = new Array(h).fill(0), z = new Array(h).fill(0);
      for (let A = 0; A < h; A++) f[A] = 0;
      for (let A = 0; A < l; A++) {
        const k = v[A], D = n[A], R = d[A];
        f[k] += R, E[k] += D[0] * R, F[k] += D[1] * R, z[k] += D[2] * R;
      }
      for (let A = 0; A < h; A++) {
        const k = f[A];
        if (k === 0) {
          u[A] = [
            0,
            0,
            0
          ];
          continue;
        }
        u[A] = [
          E[A] / k,
          F[A] / k,
          z[A] / k
        ];
      }
    }
    const x = /* @__PURE__ */ new Map();
    for (let y = 0; y < h; y++) {
      const w = f[y];
      if (w === 0) continue;
      const E = o.toInt(u[y]);
      x.has(E) || x.set(E, w);
    }
    return x;
  }
}, Ar = class {
  constructor() {
    this.distance = -1, this.index = -1;
  }
}, wr = class {
  static quantize(e) {
    const t = /* @__PURE__ */ new Map();
    for (let r = 0; r < e.length; r++) {
      const i = e[r];
      er(i) < 255 || t.set(i, (t.get(i) ?? 0) + 1);
    }
    return t;
  }
}, Rt = 5, W = 33, St = 35937, U = {
  RED: "red",
  GREEN: "green",
  BLUE: "blue"
}, Pr = class {
  constructor(e = [], t = [], r = [], i = [], n = [], a = []) {
    this.weights = e, this.momentsR = t, this.momentsG = r, this.momentsB = i, this.moments = n, this.cubes = a;
  }
  quantize(e, t) {
    this.constructHistogram(e), this.computeMoments();
    const r = this.createBoxes(t);
    return this.createResult(r.resultCount);
  }
  constructHistogram(e) {
    this.weights = Array.from({ length: St }).fill(0), this.momentsR = Array.from({ length: St }).fill(0), this.momentsG = Array.from({ length: St }).fill(0), this.momentsB = Array.from({ length: St }).fill(0), this.moments = Array.from({ length: St }).fill(0);
    const t = wr.quantize(e);
    for (const [r, i] of t.entries()) {
      const n = Gt(r), a = jt(r), o = Yt(r), l = 8 - Rt, d = (n >> l) + 1, h = (a >> l) + 1, u = (o >> l) + 1, b = this.getIndex(d, h, u);
      this.weights[b] = (this.weights[b] ?? 0) + i, this.momentsR[b] += i * n, this.momentsG[b] += i * a, this.momentsB[b] += i * o, this.moments[b] += i * (n * n + a * a + o * o);
    }
  }
  computeMoments() {
    for (let e = 1; e < W; e++) {
      const t = Array.from({ length: W }).fill(0), r = Array.from({ length: W }).fill(0), i = Array.from({ length: W }).fill(0), n = Array.from({ length: W }).fill(0), a = Array.from({ length: W }).fill(0);
      for (let o = 1; o < W; o++) {
        let l = 0, d = 0, h = 0, u = 0, b = 0;
        for (let v = 1; v < W; v++) {
          const g = this.getIndex(e, o, v);
          l += this.weights[g], d += this.momentsR[g], h += this.momentsG[g], u += this.momentsB[g], b += this.moments[g], t[v] += l, r[v] += d, i[v] += h, n[v] += u, a[v] += b;
          const c = this.getIndex(e - 1, o, v);
          this.weights[g] = this.weights[c] + t[v], this.momentsR[g] = this.momentsR[c] + r[v], this.momentsG[g] = this.momentsG[c] + i[v], this.momentsB[g] = this.momentsB[c] + n[v], this.moments[g] = this.moments[c] + a[v];
        }
      }
    }
  }
  createBoxes(e) {
    this.cubes = Array.from({ length: e }).fill(0).map(() => new kr());
    const t = Array.from({ length: e }).fill(0);
    this.cubes[0].r0 = 0, this.cubes[0].g0 = 0, this.cubes[0].b0 = 0, this.cubes[0].r1 = W - 1, this.cubes[0].g1 = W - 1, this.cubes[0].b1 = W - 1;
    let r = e, i = 0;
    for (let n = 1; n < e; n++) {
      this.cut(this.cubes[i], this.cubes[n]) ? (t[i] = this.cubes[i].vol > 1 ? this.variance(this.cubes[i]) : 0, t[n] = this.cubes[n].vol > 1 ? this.variance(this.cubes[n]) : 0) : (t[i] = 0, n--), i = 0;
      let a = t[0];
      for (let o = 1; o <= n; o++) t[o] > a && (a = t[o], i = o);
      if (a <= 0) {
        r = n + 1;
        break;
      }
    }
    return new Sr(e, r);
  }
  createResult(e) {
    const t = [];
    for (let r = 0; r < e; ++r) {
      const i = this.cubes[r], n = this.volume(i, this.weights);
      if (n > 0) {
        const a = Math.round(this.volume(i, this.momentsR) / n), o = Math.round(this.volume(i, this.momentsG) / n), l = Math.round(this.volume(i, this.momentsB) / n), d = 255 << 24 | (a & 255) << 16 | (o & 255) << 8 | l & 255;
        t.push(d);
      }
    }
    return t;
  }
  variance(e) {
    const t = this.volume(e, this.momentsR), r = this.volume(e, this.momentsG), i = this.volume(e, this.momentsB);
    return this.moments[this.getIndex(e.r1, e.g1, e.b1)] - this.moments[this.getIndex(e.r1, e.g1, e.b0)] - this.moments[this.getIndex(e.r1, e.g0, e.b1)] + this.moments[this.getIndex(e.r1, e.g0, e.b0)] - this.moments[this.getIndex(e.r0, e.g1, e.b1)] + this.moments[this.getIndex(e.r0, e.g1, e.b0)] + this.moments[this.getIndex(e.r0, e.g0, e.b1)] - this.moments[this.getIndex(e.r0, e.g0, e.b0)] - (t * t + r * r + i * i) / this.volume(e, this.weights);
  }
  cut(e, t) {
    const r = this.volume(e, this.momentsR), i = this.volume(e, this.momentsG), n = this.volume(e, this.momentsB), a = this.volume(e, this.weights), o = this.maximize(e, U.RED, e.r0 + 1, e.r1, r, i, n, a), l = this.maximize(e, U.GREEN, e.g0 + 1, e.g1, r, i, n, a), d = this.maximize(e, U.BLUE, e.b0 + 1, e.b1, r, i, n, a);
    let h;
    const u = o.maximum, b = l.maximum, v = d.maximum;
    if (u >= b && u >= v) {
      if (o.cutLocation < 0) return !1;
      h = U.RED;
    } else b >= u && b >= v ? h = U.GREEN : h = U.BLUE;
    switch (t.r1 = e.r1, t.g1 = e.g1, t.b1 = e.b1, h) {
      case U.RED:
        e.r1 = o.cutLocation, t.r0 = e.r1, t.g0 = e.g0, t.b0 = e.b0;
        break;
      case U.GREEN:
        e.g1 = l.cutLocation, t.r0 = e.r0, t.g0 = e.g1, t.b0 = e.b0;
        break;
      case U.BLUE:
        e.b1 = d.cutLocation, t.r0 = e.r0, t.g0 = e.g0, t.b0 = e.b1;
        break;
      default:
        throw new Error("unexpected direction " + h);
    }
    return e.vol = (e.r1 - e.r0) * (e.g1 - e.g0) * (e.b1 - e.b0), t.vol = (t.r1 - t.r0) * (t.g1 - t.g0) * (t.b1 - t.b0), !0;
  }
  maximize(e, t, r, i, n, a, o, l) {
    const d = this.bottom(e, t, this.momentsR), h = this.bottom(e, t, this.momentsG), u = this.bottom(e, t, this.momentsB), b = this.bottom(e, t, this.weights);
    let v = 0, g = -1, c = 0, f = 0, x = 0, y = 0;
    for (let w = r; w < i; w++) {
      if (c = d + this.top(e, t, w, this.momentsR), f = h + this.top(e, t, w, this.momentsG), x = u + this.top(e, t, w, this.momentsB), y = b + this.top(e, t, w, this.weights), y === 0) continue;
      let E = (c * c + f * f + x * x) * 1, F = y * 1, z = E / F;
      c = n - c, f = a - f, x = o - x, y = l - y, y !== 0 && (E = (c * c + f * f + x * x) * 1, F = y * 1, z += E / F, z > v && (v = z, g = w));
    }
    return new Lr(g, v);
  }
  volume(e, t) {
    return t[this.getIndex(e.r1, e.g1, e.b1)] - t[this.getIndex(e.r1, e.g1, e.b0)] - t[this.getIndex(e.r1, e.g0, e.b1)] + t[this.getIndex(e.r1, e.g0, e.b0)] - t[this.getIndex(e.r0, e.g1, e.b1)] + t[this.getIndex(e.r0, e.g1, e.b0)] + t[this.getIndex(e.r0, e.g0, e.b1)] - t[this.getIndex(e.r0, e.g0, e.b0)];
  }
  bottom(e, t, r) {
    switch (t) {
      case U.RED:
        return -r[this.getIndex(e.r0, e.g1, e.b1)] + r[this.getIndex(e.r0, e.g1, e.b0)] + r[this.getIndex(e.r0, e.g0, e.b1)] - r[this.getIndex(e.r0, e.g0, e.b0)];
      case U.GREEN:
        return -r[this.getIndex(e.r1, e.g0, e.b1)] + r[this.getIndex(e.r1, e.g0, e.b0)] + r[this.getIndex(e.r0, e.g0, e.b1)] - r[this.getIndex(e.r0, e.g0, e.b0)];
      case U.BLUE:
        return -r[this.getIndex(e.r1, e.g1, e.b0)] + r[this.getIndex(e.r1, e.g0, e.b0)] + r[this.getIndex(e.r0, e.g1, e.b0)] - r[this.getIndex(e.r0, e.g0, e.b0)];
      default:
        throw new Error("unexpected direction $direction");
    }
  }
  top(e, t, r, i) {
    switch (t) {
      case U.RED:
        return i[this.getIndex(r, e.g1, e.b1)] - i[this.getIndex(r, e.g1, e.b0)] - i[this.getIndex(r, e.g0, e.b1)] + i[this.getIndex(r, e.g0, e.b0)];
      case U.GREEN:
        return i[this.getIndex(e.r1, r, e.b1)] - i[this.getIndex(e.r1, r, e.b0)] - i[this.getIndex(e.r0, r, e.b1)] + i[this.getIndex(e.r0, r, e.b0)];
      case U.BLUE:
        return i[this.getIndex(e.r1, e.g1, r)] - i[this.getIndex(e.r1, e.g0, r)] - i[this.getIndex(e.r0, e.g1, r)] + i[this.getIndex(e.r0, e.g0, r)];
      default:
        throw new Error("unexpected direction $direction");
    }
  }
  getIndex(e, t, r) {
    return (e << Rt * 2) + (e << Rt + 1) + e + (t << Rt) + t + r;
  }
}, kr = class {
  constructor(e = 0, t = 0, r = 0, i = 0, n = 0, a = 0, o = 0) {
    this.r0 = e, this.r1 = t, this.g0 = r, this.g1 = i, this.b0 = n, this.b1 = a, this.vol = o;
  }
}, Sr = class {
  constructor(e, t) {
    this.requestedCount = e, this.resultCount = t;
  }
}, Lr = class {
  constructor(e, t) {
    this.cutLocation = e, this.maximum = t;
  }
}, Tr = class {
  static quantize(e, t) {
    const r = new Pr().quantize(e, t);
    return xr.quantize(e, r, t);
  }
}, _e = class ft {
  get primary() {
    return this.props.primary;
  }
  get onPrimary() {
    return this.props.onPrimary;
  }
  get primaryContainer() {
    return this.props.primaryContainer;
  }
  get onPrimaryContainer() {
    return this.props.onPrimaryContainer;
  }
  get secondary() {
    return this.props.secondary;
  }
  get onSecondary() {
    return this.props.onSecondary;
  }
  get secondaryContainer() {
    return this.props.secondaryContainer;
  }
  get onSecondaryContainer() {
    return this.props.onSecondaryContainer;
  }
  get tertiary() {
    return this.props.tertiary;
  }
  get onTertiary() {
    return this.props.onTertiary;
  }
  get tertiaryContainer() {
    return this.props.tertiaryContainer;
  }
  get onTertiaryContainer() {
    return this.props.onTertiaryContainer;
  }
  get error() {
    return this.props.error;
  }
  get onError() {
    return this.props.onError;
  }
  get errorContainer() {
    return this.props.errorContainer;
  }
  get onErrorContainer() {
    return this.props.onErrorContainer;
  }
  get background() {
    return this.props.background;
  }
  get onBackground() {
    return this.props.onBackground;
  }
  get surface() {
    return this.props.surface;
  }
  get onSurface() {
    return this.props.onSurface;
  }
  get surfaceVariant() {
    return this.props.surfaceVariant;
  }
  get onSurfaceVariant() {
    return this.props.onSurfaceVariant;
  }
  get outline() {
    return this.props.outline;
  }
  get outlineVariant() {
    return this.props.outlineVariant;
  }
  get shadow() {
    return this.props.shadow;
  }
  get scrim() {
    return this.props.scrim;
  }
  get inverseSurface() {
    return this.props.inverseSurface;
  }
  get inverseOnSurface() {
    return this.props.inverseOnSurface;
  }
  get inversePrimary() {
    return this.props.inversePrimary;
  }
  static light(t) {
    return ft.lightFromCorePalette(At.of(t));
  }
  static dark(t) {
    return ft.darkFromCorePalette(At.of(t));
  }
  static lightContent(t) {
    return ft.lightFromCorePalette(At.contentOf(t));
  }
  static darkContent(t) {
    return ft.darkFromCorePalette(At.contentOf(t));
  }
  static lightFromCorePalette(t) {
    return new ft({
      primary: t.a1.tone(40),
      onPrimary: t.a1.tone(100),
      primaryContainer: t.a1.tone(90),
      onPrimaryContainer: t.a1.tone(10),
      secondary: t.a2.tone(40),
      onSecondary: t.a2.tone(100),
      secondaryContainer: t.a2.tone(90),
      onSecondaryContainer: t.a2.tone(10),
      tertiary: t.a3.tone(40),
      onTertiary: t.a3.tone(100),
      tertiaryContainer: t.a3.tone(90),
      onTertiaryContainer: t.a3.tone(10),
      error: t.error.tone(40),
      onError: t.error.tone(100),
      errorContainer: t.error.tone(90),
      onErrorContainer: t.error.tone(10),
      background: t.n1.tone(99),
      onBackground: t.n1.tone(10),
      surface: t.n1.tone(99),
      onSurface: t.n1.tone(10),
      surfaceVariant: t.n2.tone(90),
      onSurfaceVariant: t.n2.tone(30),
      outline: t.n2.tone(50),
      outlineVariant: t.n2.tone(80),
      shadow: t.n1.tone(0),
      scrim: t.n1.tone(0),
      inverseSurface: t.n1.tone(20),
      inverseOnSurface: t.n1.tone(95),
      inversePrimary: t.a1.tone(80)
    });
  }
  static darkFromCorePalette(t) {
    return new ft({
      primary: t.a1.tone(80),
      onPrimary: t.a1.tone(20),
      primaryContainer: t.a1.tone(30),
      onPrimaryContainer: t.a1.tone(90),
      secondary: t.a2.tone(80),
      onSecondary: t.a2.tone(20),
      secondaryContainer: t.a2.tone(30),
      onSecondaryContainer: t.a2.tone(90),
      tertiary: t.a3.tone(80),
      onTertiary: t.a3.tone(20),
      tertiaryContainer: t.a3.tone(30),
      onTertiaryContainer: t.a3.tone(90),
      error: t.error.tone(80),
      onError: t.error.tone(20),
      errorContainer: t.error.tone(30),
      onErrorContainer: t.error.tone(80),
      background: t.n1.tone(10),
      onBackground: t.n1.tone(90),
      surface: t.n1.tone(10),
      onSurface: t.n1.tone(90),
      surfaceVariant: t.n2.tone(30),
      onSurfaceVariant: t.n2.tone(80),
      outline: t.n2.tone(60),
      outlineVariant: t.n2.tone(30),
      shadow: t.n1.tone(0),
      scrim: t.n1.tone(0),
      inverseSurface: t.n1.tone(90),
      inverseOnSurface: t.n1.tone(20),
      inversePrimary: t.a1.tone(40)
    });
  }
  constructor(t) {
    this.props = t;
  }
  toJSON() {
    return { ...this.props };
  }
}, Er = class extends N {
  constructor(e, t, r, i = N.DEFAULT_SPEC_VERSION, n = N.DEFAULT_PLATFORM) {
    super({
      sourceColorHct: e,
      variant: s.EXPRESSIVE,
      contrastLevel: r,
      isDark: t,
      platform: n,
      specVersion: i
    });
  }
}, Mr = {
  desired: 4,
  fallbackColorARGB: 4282549748,
  filter: !0
};
function Dr(e, t) {
  return e.score > t.score ? -1 : e.score < t.score ? 1 : 0;
}
var yt = class ct {
  constructor() {
  }
  static score(t, r) {
    const { desired: i, fallbackColorARGB: n, filter: a } = {
      ...Mr,
      ...r
    }, o = [], l = new Array(360).fill(0);
    let d = 0;
    for (const [g, c] of t.entries()) {
      const f = L.fromInt(g);
      o.push(f);
      const x = Math.floor(f.hue);
      l[x] += c, d += c;
    }
    const h = new Array(360).fill(0);
    for (let g = 0; g < 360; g++) {
      const c = l[g] / d;
      for (let f = g - 14; f < g + 16; f++) {
        const x = $t(f);
        h[x] += c;
      }
    }
    const u = new Array();
    for (const g of o) {
      const c = h[$t(Math.round(g.hue))];
      if (a && (g.chroma < ct.CUTOFF_CHROMA || c <= ct.CUTOFF_EXCITED_PROPORTION)) continue;
      const f = c * 100 * ct.WEIGHT_PROPORTION, x = g.chroma < ct.TARGET_CHROMA ? ct.WEIGHT_CHROMA_BELOW : ct.WEIGHT_CHROMA_ABOVE, y = f + (g.chroma - ct.TARGET_CHROMA) * x;
      u.push({
        hct: g,
        score: y
      });
    }
    u.sort(Dr);
    const b = [];
    for (let g = 90; g >= 15; g--) {
      b.length = 0;
      for (const { hct: c } of u)
        if (b.find((f) => Ee(c.hue, f.hue) < g) || b.push(c), b.length >= i) break;
      if (b.length >= i) break;
    }
    const v = [];
    b.length === 0 && v.push(n);
    for (const g of b) v.push(g.toInt());
    return v;
  }
};
yt.TARGET_CHROMA = 48;
yt.WEIGHT_PROPORTION = 0.7;
yt.WEIGHT_CHROMA_ABOVE = 0.3;
yt.WEIGHT_CHROMA_BELOW = 0.1;
yt.CUTOFF_CHROMA = 5;
yt.CUTOFF_EXCITED_PROPORTION = 0.01;
function qt(e) {
  const t = Gt(e), r = jt(e), i = Yt(e), n = [
    t.toString(16),
    r.toString(16),
    i.toString(16)
  ];
  for (const [a, o] of n.entries()) o.length === 1 && (n[a] = "0" + o);
  return "#" + n.join("");
}
function Ir(e) {
  e = e.replace("#", "");
  const t = e.length === 3, r = e.length === 6, i = e.length === 8;
  if (!t && !r && !i) throw new Error("unexpected hex " + e);
  let n = 0, a = 0, o = 0;
  return t ? (n = rt(e.slice(0, 1).repeat(2)), a = rt(e.slice(1, 2).repeat(2)), o = rt(e.slice(2, 3).repeat(2))) : r ? (n = rt(e.slice(0, 2)), a = rt(e.slice(2, 4)), o = rt(e.slice(4, 6))) : i && (n = rt(e.slice(2, 4)), a = rt(e.slice(4, 6)), o = rt(e.slice(6, 8))), (255 << 24 | (n & 255) << 16 | (a & 255) << 8 | o & 255) >>> 0;
}
function rt(e) {
  return parseInt(e, 16);
}
async function zr(e) {
  return Br(await new Promise((t, r) => {
    const i = document.createElement("canvas"), n = i.getContext("2d");
    if (!n) {
      r(/* @__PURE__ */ new Error("Could not get canvas context"));
      return;
    }
    const a = () => {
      i.width = e.width, i.height = e.height, n.drawImage(e, 0, 0);
      let l = [
        0,
        0,
        e.width,
        e.height
      ];
      const d = e.dataset.area;
      d && /^\d+(\s*,\s*\d+){3}$/.test(d) && (l = d.split(/\s*,\s*/).map((g) => parseInt(g, 10)));
      const [h, u, b, v] = l;
      t(n.getImageData(h, u, b, v).data);
    }, o = () => {
      r(/* @__PURE__ */ new Error("Image load failed"));
    };
    e.complete ? a() : (e.onload = a, e.onerror = o);
  }));
}
function Br(e) {
  const t = [];
  for (let i = 0; i < e.length; i += 4) {
    const n = e[i], a = e[i + 1], o = e[i + 2];
    if (e[i + 3] < 255) continue;
    const l = Ut(n, a, o);
    t.push(l);
  }
  const r = Tr.quantize(t, 128);
  return yt.score(r)[0];
}
function Ve(e, t = []) {
  const r = At.of(e);
  return {
    source: e,
    schemes: {
      light: _e.light(e),
      dark: _e.dark(e)
    },
    palettes: {
      primary: r.a1,
      secondary: r.a2,
      tertiary: r.a3,
      neutral: r.n1,
      neutralVariant: r.n2,
      error: r.error
    },
    customColors: t.map((i) => Fr(e, i))
  };
}
async function Rr(e, t = []) {
  return Ve(await zr(e), t);
}
function Fr(e, t) {
  let r = t.value;
  const i = r, n = e;
  t.blend && (r = or.harmonize(i, n));
  const a = At.of(r).a1;
  return {
    color: t,
    value: r,
    light: {
      color: a.tone(40),
      onColor: a.tone(100),
      colorContainer: a.tone(90),
      onColorContainer: a.tone(10)
    },
    dark: {
      color: a.tone(80),
      onColor: a.tone(20),
      colorContainer: a.tone(30),
      onColorContainer: a.tone(90)
    }
  };
}
function Hr(e, t) {
  const r = t?.target || document.body;
  if (Wt(r, t?.dark ?? !1 ? e.schemes.dark : e.schemes.light), t?.brightnessSuffix && (Wt(r, e.schemes.dark, "-dark"), Wt(r, e.schemes.light, "-light")), t?.paletteTones) {
    const i = t?.paletteTones ?? [];
    for (const [n, a] of Object.entries(e.palettes)) {
      const o = n.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
      for (const l of i) {
        const d = `--md-ref-palette-${o}-${o}${l}`, h = qt(a.tone(l));
        r.style.setProperty(d, h);
      }
    }
  }
}
function Wt(e, t, r = "") {
  for (const [i, n] of Object.entries(t.toJSON())) {
    const a = i.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), o = qt(n);
    e.style.setProperty(`--md-sys-color-${a}${r}`, o);
  }
}
function Vr(e) {
  return "image" in e && e.image !== void 0;
}
async function Or(e) {
  if (Vr(e)) return Rr(e.image, e.customColors);
  const t = Ir(e.hex);
  return Promise.resolve(Ve(t, e.customColors));
}
function Nr(e, t) {
  const r = t?.target ?? document.documentElement, i = t?.dark ?? !1;
  Hr(e, {
    dark: i,
    target: r
  });
  const n = new Er(L.fromInt(e.source), i, 0);
  r.style.setProperty("--md-sys-color-surface-container-low", qt(n.surfaceContainerLow)), r.style.setProperty("--md-sys-color-surface-container", qt(n.surfaceContainer));
}
var $r = ':host{--lib-comp-button-label-medium-size:.75rem;--lib-comp-button-label-medium-line-height:1rem;--lib-comp-button-label-medium-tracking:.03125em;--lib-comp-button-label-large-size:.875rem;--lib-comp-button-label-large-line-height:1.25rem;--lib-comp-button-label-large-tracking:.00625em;--lib-comp-button-title-md-size:1.125rem;--lib-comp-button-title-md-line-height:1.75rem;--lib-comp-button-title-md-tracking:.00625em;--lib-comp-button-headline-md-size:2rem;--lib-comp-button-headline-md-line-height:2.5rem;--lib-comp-button-headline-md-tracking:0em;--lib-comp-button-headline-lg-size:2.5rem;--lib-comp-button-headline-lg-line-height:3rem;--lib-comp-button-headline-lg-tracking:0em;--lib-comp-button-xs-height:32px;--lib-comp-button-xs-padding-inline:12px;--lib-comp-button-xs-icon-size:20px;--lib-comp-button-xs-gap:4px;--lib-comp-button-sm-height:40px;--lib-comp-button-sm-padding-inline:16px;--lib-comp-button-sm-icon-size:20px;--lib-comp-button-sm-gap:8px;--lib-comp-button-md-height:56px;--lib-comp-button-md-padding-inline:24px;--lib-comp-button-md-icon-size:24px;--lib-comp-button-md-gap:8px;--lib-comp-button-lg-height:96px;--lib-comp-button-lg-padding-inline:48px;--lib-comp-button-lg-icon-size:32px;--lib-comp-button-lg-gap:12px;--lib-comp-button-xl-height:136px;--lib-comp-button-xl-padding-inline:64px;--lib-comp-button-xl-icon-size:40px;--lib-comp-button-xl-gap:16px;--lib-comp-button-xs-radius-square:12px;--lib-comp-button-xs-radius-pressed:8px;--lib-comp-button-sm-radius-square:12px;--lib-comp-button-sm-radius-pressed:8px;--lib-comp-button-md-radius-square:16px;--lib-comp-button-md-radius-pressed:12px;--lib-comp-button-lg-radius-square:28px;--lib-comp-button-lg-radius-pressed:16px;--lib-comp-button-xl-radius-square:28px;--lib-comp-button-xl-radius-pressed:16px}@layer components{.btn{cursor:pointer;-webkit-user-select:none;user-select:none;isolation:isolate;box-sizing:border-box;--btn-h:var(--lib-comp-button-sm-height);--btn-pad-x:var(--lib-comp-button-sm-padding-inline);--btn-icon:var(--lib-comp-button-sm-icon-size);--btn-gap:var(--lib-comp-button-sm-gap);--btn-fs:var(--lib-comp-button-label-large-size);--btn-lh:var(--lib-comp-button-label-large-line-height);--btn-tracking:var(--lib-comp-button-label-large-tracking);--btn-radius-pressed:var(--lib-comp-button-sm-radius-pressed);min-height:var(--btn-h);padding-inline:var(--btn-pad-x);padding-block:max(0px, calc((var(--btn-h) - max(var(--btn-lh), var(--btn-icon))) / 2));justify-content:center;align-items:center;gap:var(--btn-gap);border-radius:var(--btn-radius-rest);font-family:var(--lib-type-label-large-font-family-name);font-size:var(--btn-fs);line-height:var(--btn-lh);font-weight:var(--lib-type-label-large-weight);letter-spacing:var(--btn-tracking);-webkit-tap-highlight-color:transparent;transition-property:background-color,color,border-color,box-shadow,opacity,border-radius;transition-duration:var(--lib-motion-duration-short4);transition-timing-function:var(--lib-motion-easing-emphasized-decelerate);border:0;text-decoration:none;display:inline-flex;position:relative}:host([data-group-position=middle]) .btn{border-radius:var(--lib-group-inner-current-radius,var(--lib-group-inner-radius,var(--btn-radius-rest)))!important}:host([data-group-position=first]) .btn{border-start-start-radius:var(--lib-group-outer-radius,var(--btn-radius-rest))!important;border-start-end-radius:var(--lib-group-inner-current-radius,var(--lib-group-inner-radius,var(--btn-radius-rest)))!important;border-end-end-radius:var(--lib-group-inner-current-radius,var(--lib-group-inner-radius,var(--btn-radius-rest)))!important;border-end-start-radius:var(--lib-group-outer-radius,var(--btn-radius-rest))!important}:host([data-group-position=last]) .btn{border-start-start-radius:var(--lib-group-inner-current-radius,var(--lib-group-inner-radius,var(--btn-radius-rest)))!important;border-start-end-radius:var(--lib-group-outer-radius,var(--btn-radius-rest))!important;border-end-end-radius:var(--lib-group-outer-radius,var(--btn-radius-rest))!important;border-end-start-radius:var(--lib-group-inner-current-radius,var(--lib-group-inner-radius,var(--btn-radius-rest)))!important}.btn:before{content:"";border-radius:inherit;opacity:0;pointer-events:none;transition:opacity var(--lib-motion-duration-short4) var(--lib-motion-easing-emphasized-decelerate);position:absolute;inset:0}.btn__content{z-index:1;justify-content:center;align-items:center;gap:var(--btn-gap);display:inline-flex;position:relative}.btn__segment{justify-content:center;align-items:center;display:inline-flex}.btn__segment--label:empty{display:none}.btn--elevated:before{background-color:var(--lib-color-on-surface)}.btn--filled:before{background-color:var(--lib-color-on-primary)}.btn--toggle.btn--filled:not(.btn--pressed):not(:disabled):not(.btn--soft):before{background-color:var(--lib-color-on-surface-variant)}.btn--tonal:before{background-color:var(--lib-color-on-secondary-container)}.btn--outlined:before{background-color:var(--lib-color-on-surface-variant)}.btn--text:before{display:none}.btn:focus-visible:not(:disabled):before,.btn:active:not(:disabled):not(.btn--soft):before{opacity:.1}.btn:active:not(:disabled):not(.btn--soft):not(.btn--shape-toggle-swap):not(.btn--text){border-radius:var(--btn-radius-pressed);transition-duration:var(--lib-motion-duration-short2);transition-timing-function:var(--lib-motion-easing-emphasized-accelerate)}.btn--shape-round{--btn-radius-rest:calc(var(--btn-h) / 2)}.btn--shape-square{--btn-radius-rest:var(--lib-comp-button-sm-radius-square)}.btn--shape-square.btn--xs{--btn-radius-rest:var(--lib-comp-button-xs-radius-square)}.btn--shape-square.btn--md{--btn-radius-rest:var(--lib-comp-button-md-radius-square)}.btn--shape-square.btn--lg{--btn-radius-rest:var(--lib-comp-button-lg-radius-square)}.btn--shape-square.btn--xl{--btn-radius-rest:var(--lib-comp-button-xl-radius-square)}.btn--pressed:not(:disabled):not(.btn--soft):not(.btn--shape-toggle-swap):not(.btn--text){border-radius:var(--btn-radius-pressed)}:host([data-group-active=true]) .btn,:host(:active) .btn{border-radius:var(--lib-group-inner-current-radius,var(--lib-group-inner-radius,var(--btn-radius-pressed)))!important}:host([data-group-position=first][data-group-active=true]) .btn,:host([data-group-position=first]:active) .btn{border-start-start-radius:var(--lib-group-outer-radius,var(--btn-radius-rest))!important;border-start-end-radius:var(--lib-group-inner-current-radius,var(--lib-group-inner-radius,var(--btn-radius-pressed)))!important;border-end-end-radius:var(--lib-group-inner-current-radius,var(--lib-group-inner-radius,var(--btn-radius-pressed)))!important;border-end-start-radius:var(--lib-group-outer-radius,var(--btn-radius-rest))!important}:host([data-group-position=last][data-group-active=true]) .btn,:host([data-group-position=last]:active) .btn{border-start-start-radius:var(--lib-group-inner-current-radius,var(--lib-group-inner-radius,var(--btn-radius-pressed)))!important;border-start-end-radius:var(--lib-group-outer-radius,var(--btn-radius-rest))!important;border-end-end-radius:var(--lib-group-outer-radius,var(--btn-radius-rest))!important;border-end-start-radius:var(--lib-group-inner-current-radius,var(--lib-group-inner-radius,var(--btn-radius-pressed)))!important}.btn--shape-toggle-swap.btn--shape-square.btn--pressed:not(:disabled):not(.btn--soft):not(.btn--text){border-radius:calc(var(--btn-h) / 2)}.btn--shape-toggle-swap.btn--shape-round.btn--pressed:not(:disabled):not(.btn--soft):not(.btn--text){border-radius:var(--lib-comp-button-sm-radius-square)}.btn--shape-toggle-swap.btn--shape-round.btn--pressed.btn--xs:not(.btn--text){border-radius:var(--lib-comp-button-xs-radius-square)}.btn--shape-toggle-swap.btn--shape-round.btn--pressed.btn--md:not(.btn--text){border-radius:var(--lib-comp-button-md-radius-square)}.btn--shape-toggle-swap.btn--shape-round.btn--pressed.btn--lg:not(.btn--text){border-radius:var(--lib-comp-button-lg-radius-square)}.btn--shape-toggle-swap.btn--shape-round.btn--pressed.btn--xl:not(.btn--text){border-radius:var(--lib-comp-button-xl-radius-square)}.btn:focus-visible{outline:2px solid var(--lib-color-primary);outline-offset:2px}.btn:disabled{cursor:not-allowed;opacity:.38;pointer-events:none}.btn--soft{cursor:not-allowed;opacity:.38}@media (prefers-reduced-motion:reduce){.btn,.btn:before{transition:none}}.btn--elevated{background-color:var(--lib-color-surface-container-low);color:var(--lib-color-primary);box-shadow:0 1px 2px color-mix(in srgb, var(--lib-color-shadow) 30%, transparent), 0 1px 3px 1px color-mix(in srgb, var(--lib-color-shadow) 15%, transparent)}.btn--filled{background-color:var(--lib-color-primary);color:var(--lib-color-on-primary)}.btn--tonal{background-color:var(--lib-color-secondary-container);color:var(--lib-color-on-secondary-container)}.btn--outlined{color:var(--lib-color-on-surface-variant);border:1px solid var(--lib-color-outline-variant);background-color:#0000}.btn--text{box-shadow:none;color:var(--lib-color-primary);background-color:#0000;border:0}.btn--toggle.btn--filled:not(.btn--pressed):not(:disabled):not(.btn--soft){background-color:var(--lib-color-surface-container);color:var(--lib-color-on-surface-variant)}.btn--elevated.btn--pressed{background-color:var(--lib-color-primary);color:var(--lib-color-on-primary);box-shadow:0 1px 2px color-mix(in srgb, var(--lib-color-shadow) 30%, transparent), 0 1px 3px 1px color-mix(in srgb, var(--lib-color-shadow) 15%, transparent)}.btn--elevated.btn--pressed:before{background-color:var(--lib-color-on-primary)}.btn--filled.btn--pressed{background-color:var(--lib-color-primary);color:var(--lib-color-on-primary)}.btn--filled.btn--pressed:before{background-color:var(--lib-color-on-primary)}.btn--tonal.btn--pressed{background-color:var(--lib-color-secondary);color:var(--lib-color-on-secondary)}.btn--tonal.btn--pressed:before{background-color:var(--lib-color-on-secondary)}.btn--outlined.btn--pressed{background-color:var(--lib-color-inverse-surface);color:var(--lib-color-inverse-on-surface);border-color:var(--lib-color-inverse-surface)}.btn--outlined.btn--pressed:before{background-color:var(--lib-color-inverse-on-surface)}.btn--text.btn--pressed{color:var(--lib-color-primary);background-color:#0000}.btn--xs{--btn-h:var(--lib-comp-button-xs-height);--btn-pad-x:var(--lib-comp-button-xs-padding-inline);--btn-icon:var(--lib-comp-button-xs-icon-size);--btn-gap:var(--lib-comp-button-xs-gap);--btn-fs:var(--lib-comp-button-label-medium-size);--btn-lh:var(--lib-comp-button-label-medium-line-height);--btn-tracking:var(--lib-comp-button-label-medium-tracking);--btn-radius-pressed:var(--lib-comp-button-xs-radius-pressed)}.btn--md{--btn-h:var(--lib-comp-button-md-height);--btn-pad-x:var(--lib-comp-button-md-padding-inline);--btn-icon:var(--lib-comp-button-md-icon-size);--btn-gap:var(--lib-comp-button-md-gap);--btn-fs:var(--lib-comp-button-title-md-size);--btn-lh:var(--lib-comp-button-title-md-line-height);--btn-tracking:var(--lib-comp-button-title-md-tracking);--btn-radius-pressed:var(--lib-comp-button-md-radius-pressed)}.btn--lg{--btn-h:var(--lib-comp-button-lg-height);--btn-pad-x:var(--lib-comp-button-lg-padding-inline);--btn-icon:var(--lib-comp-button-lg-icon-size);--btn-gap:var(--lib-comp-button-lg-gap);--btn-fs:var(--lib-comp-button-headline-md-size);--btn-lh:var(--lib-comp-button-headline-md-line-height);--btn-tracking:var(--lib-comp-button-headline-md-tracking);--btn-radius-pressed:var(--lib-comp-button-lg-radius-pressed)}.btn--xl{--btn-h:var(--lib-comp-button-xl-height);--btn-pad-x:var(--lib-comp-button-xl-padding-inline);--btn-icon:var(--lib-comp-button-xl-icon-size);--btn-gap:var(--lib-comp-button-xl-gap);--btn-fs:var(--lib-comp-button-headline-lg-size);--btn-lh:var(--lib-comp-button-headline-lg-line-height);--btn-tracking:var(--lib-comp-button-headline-lg-tracking);--btn-radius-pressed:var(--lib-comp-button-xl-radius-pressed)}.icon{width:var(--btn-icon);height:var(--btn-icon);color:currentColor;flex-shrink:0}.icon-host{display:inline-flex}.btn:is(:lang(ae),:lang(ar),:lang(arc),:lang(bcc),:lang(bqi),:lang(ckb),:lang(dv),:lang(fa),:lang(glk),:lang(he),:lang(ku),:lang(mzn),:lang(nqo),:lang(pnb),:lang(ps),:lang(sd),:lang(ug),:lang(ur),:lang(yi)) .icon--directional{transform:scaleX(-1)}}', Ce = /* @__PURE__ */ new Set([
  "elevated",
  "filled",
  "tonal",
  "outlined",
  "text"
]), qr = /* @__PURE__ */ new Set([
  "extra-small",
  "small",
  "medium",
  "large",
  "extra-large"
]), Ur = /* @__PURE__ */ new Set(["round", "square"]), Gr = {
  check: B.check,
  close: B.close,
  menu: B.menu,
  "chevron-right": B.chevronRight
}, jr = class extends nt {
  static observedAttributes = [
    "variant",
    "size",
    "disabled",
    "soft-disabled",
    "type",
    "href",
    "target",
    "icon-leading",
    "icon-trailing",
    "aria-label",
    "name",
    "value",
    "form",
    "toggle",
    "pressed",
    "shape",
    "shape-toggle-swap",
    "dir"
  ];
  _control = null;
  _leadingSlot = null;
  _trailingSlot = null;
  _slotChange = () => this._syncIcons();
  _onClickCapture = (e) => {
    (this.hasAttribute("disabled") || this.hasAttribute("soft-disabled")) && (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation());
  };
  _onToggleClick = () => {
    if (!this.hasAttribute("toggle") || this.hasAttribute("disabled") || this.hasAttribute("soft-disabled") || this.getAttribute("href")) return;
    const e = this._control;
    if (!(e instanceof HTMLButtonElement)) return;
    const t = e.type;
    if (t === "submit" || t === "reset") return;
    const r = !this.hasAttribute("pressed");
    r ? this.setAttribute("pressed", "") : this.removeAttribute("pressed"), this.dispatchEvent(new CustomEvent(wt("change"), {
      bubbles: !0,
      composed: !0,
      detail: { pressed: r }
    }));
  };
  constructor() {
    super();
    const e = this.attachShadow({ mode: "open" }), t = document.createElement("style");
    t.textContent = $r, e.appendChild(t);
  }
  onInit() {
    this._upgradeProps(), (!this._control || this._linkModeMismatch()) && this._mountControl(), Mt(this.shadowRoot), this._syncAll();
  }
  onDestroy() {
    this._teardownControl();
  }
  attributeChangedCallback(e, t, r) {
    t !== r && (this._control ? e === "href" && !!this.getAttribute("href") != this._control instanceof HTMLAnchorElement && this._mountControl() : this._mountControl(), this._control && this._syncAll());
  }
  get variant() {
    return this.getAttribute("variant") ?? "filled";
  }
  set variant(e) {
    this.setAttribute("variant", e);
  }
  get disabled() {
    return this.hasAttribute("disabled");
  }
  set disabled(e) {
    e ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
  }
  get softDisabled() {
    return this.hasAttribute("soft-disabled");
  }
  set softDisabled(e) {
    e ? this.setAttribute("soft-disabled", "") : this.removeAttribute("soft-disabled");
  }
  get pressed() {
    return this.hasAttribute("pressed");
  }
  set pressed(e) {
    e ? this.setAttribute("pressed", "") : this.removeAttribute("pressed");
  }
  get shape() {
    return this.getAttribute("shape") ?? "round";
  }
  set shape(e) {
    this.setAttribute("shape", e);
  }
  _linkModeMismatch() {
    return this._control ? !!this.getAttribute("href") != this._control instanceof HTMLAnchorElement : !0;
  }
  _teardownControl() {
    this._control && (this._leadingSlot?.removeEventListener("slotchange", this._slotChange), this._trailingSlot?.removeEventListener("slotchange", this._slotChange), this._control.removeEventListener("click", this._onClickCapture, !0), this._control.removeEventListener("click", this._onToggleClick, !1), this._control.remove(), this._control = null, this._leadingSlot = null, this._trailingSlot = null);
  }
  _mountControl() {
    this._teardownControl();
    const e = this.shadowRoot, t = this.getAttribute("href"), r = t ? document.createElement("a") : document.createElement("button");
    if (r.setAttribute("part", "control"), r.classList.add("btn"), r.innerHTML = this._innerMarkup(), t) {
      const i = r;
      i.href = t;
      const n = this.getAttribute("target");
      n && (i.target = n, n === "_blank" && (i.rel = "noopener noreferrer"));
    } else {
      const i = r, n = this.getAttribute("type") ?? "button";
      i.type = n === "submit" || n === "reset" ? n : "button";
    }
    e.appendChild(r), this._control = r, this._leadingSlot = r.querySelector('slot[name="leading"]'), this._trailingSlot = r.querySelector('slot[name="trailing"]'), this._leadingSlot?.addEventListener("slotchange", this._slotChange), this._trailingSlot?.addEventListener("slotchange", this._slotChange), r.addEventListener("click", this._onClickCapture, !0), r.addEventListener("click", this._onToggleClick, !1);
  }
  _innerMarkup() {
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
  _upgradeProps() {
    for (const e of [
      "disabled",
      "softDisabled",
      "pressed"
    ]) if (Object.prototype.hasOwnProperty.call(this, e)) {
      const t = this[e];
      delete this[e], this[e] = t;
    }
  }
  _syncAll() {
    this._control && (this._syncVariant(), this._syncSize(), this._syncShape(), this._syncShapeToggleSwap(), this._syncDisabledStates(), this._syncType(), this._syncHrefTarget(), this._syncFormAttrs(), this._syncAria(), this._syncToggle(), this._syncDir(), this._syncIcons());
  }
  _syncDir() {
    const e = this._control, t = this.getAttribute("dir");
    t === "rtl" || t === "ltr" ? e.setAttribute("dir", t) : e.removeAttribute("dir");
  }
  _syncVariant() {
    const e = this.getAttribute("variant") ?? "filled", t = Ce.has(e) ? e : "filled", r = this._control;
    for (const i of Ce) r.classList.remove(`btn--${i}`);
    r.classList.add(`btn--${t}`);
  }
  _syncSize() {
    const e = this.getAttribute("size") ?? "small", t = qr.has(e) ? e : "small", r = this._control;
    r.classList.remove("btn--xs", "btn--md", "btn--lg", "btn--xl"), t === "extra-small" ? r.classList.add("btn--xs") : t === "medium" ? r.classList.add("btn--md") : t === "large" ? r.classList.add("btn--lg") : t === "extra-large" && r.classList.add("btn--xl");
  }
  _syncShape() {
    const e = this.getAttribute("shape") ?? "round", t = Ur.has(e) ? e : "round", r = this._control;
    r.classList.remove("btn--shape-round", "btn--shape-square"), r.classList.add(t === "square" ? "btn--shape-square" : "btn--shape-round");
  }
  _syncShapeToggleSwap() {
    this._control.classList.toggle("btn--shape-toggle-swap", this.hasAttribute("shape-toggle-swap"));
  }
  _syncDisabledStates() {
    const e = this._control, t = this.hasAttribute("disabled"), r = this.hasAttribute("soft-disabled");
    if (e instanceof HTMLButtonElement) t ? (e.disabled = !0, e.classList.remove("btn--soft"), Z(e, { "aria-disabled": !0 })) : r ? (e.disabled = !1, e.classList.add("btn--soft"), Z(e, { "aria-disabled": !0 })) : (e.disabled = !1, e.classList.remove("btn--soft"), Z(e, { "aria-disabled": void 0 }));
    else {
      const i = e;
      t ? (i.setAttribute("aria-disabled", "true"), i.tabIndex = -1, i.classList.remove("btn--soft")) : r ? (i.setAttribute("aria-disabled", "true"), i.tabIndex = 0, i.classList.add("btn--soft")) : (i.removeAttribute("aria-disabled"), i.tabIndex = 0, i.classList.remove("btn--soft"));
    }
  }
  _syncType() {
    if (!(this._control instanceof HTMLButtonElement)) return;
    const e = this.getAttribute("type") ?? "button";
    this._control.type = e === "submit" || e === "reset" ? e : "button";
  }
  _syncHrefTarget() {
    if (!(this._control instanceof HTMLAnchorElement)) return;
    const e = this.getAttribute("href");
    e && (this._control.href = e);
    const t = this.getAttribute("target");
    t ? (this._control.target = t, this._control.rel = t === "_blank" ? "noopener noreferrer" : "") : (this._control.removeAttribute("target"), this._control.removeAttribute("rel"));
  }
  _syncFormAttrs() {
    if (!(this._control instanceof HTMLButtonElement)) return;
    const e = this.getAttribute("name"), t = this.getAttribute("value"), r = this.getAttribute("form");
    e !== null ? this._control.setAttribute("name", e) : this._control.removeAttribute("name"), t !== null ? this._control.setAttribute("value", t) : this._control.removeAttribute("value"), r !== null ? this._control.setAttribute("form", r) : this._control.removeAttribute("form");
  }
  _syncAria() {
    const e = this.getAttribute("aria-label");
    Z(this._control, { "aria-label": e ?? void 0 });
  }
  _syncToggle() {
    const e = this._control, t = this.hasAttribute("toggle"), r = this.hasAttribute("pressed");
    e.classList.toggle("btn--toggle", t), e.classList.toggle("btn--pressed", r), t || r ? Z(e, { "aria-pressed": r ? "true" : "false" }) : Z(e, { "aria-pressed": void 0 });
  }
  _syncIcons() {
    this._paintIcon("leading", this.getAttribute("icon-leading"), this._leadingSlot), this._paintIcon("trailing", this.getAttribute("icon-trailing"), this._trailingSlot);
  }
  _paintIcon(e, t, r) {
    const i = this.shadowRoot;
    if (!i || !r) return;
    const n = i.querySelector(`[part="icon-${e}"]`);
    if (!n) return;
    if (r.assignedNodes({ flatten: !0 }).length > 0) {
      n.hidden = !0, n.innerHTML = "";
      return;
    }
    const a = t ? Gr[t] : void 0;
    if (!a) {
      n.hidden = !0, n.innerHTML = "";
      return;
    }
    n.hidden = !1, n.innerHTML = `<svg class="${t === "chevron-right" ? "icon icon--directional" : "icon"}" aria-hidden="true" focusable="false"><use href="${pt(a)}"/></svg>`;
  }
}, Yr = ':host{--lib-comp-icon-button-xs-size:32px;--lib-comp-icon-button-sm-size:40px;--lib-comp-icon-button-md-size:56px;--lib-comp-icon-button-lg-size:96px;--lib-comp-icon-button-xl-size:136px;--lib-comp-icon-button-xs-icon:18px;--lib-comp-icon-button-sm-icon:20px;--lib-comp-icon-button-md-icon:24px;--lib-comp-icon-button-lg-icon:32px;--lib-comp-icon-button-xl-icon:40px;--lib-comp-icon-button-radius-rest:999px;--lib-comp-icon-button-width-narrow:.75;--lib-comp-icon-button-width-default:1;--lib-comp-icon-button-width-wide:1.25;--lib-comp-icon-button-square-xs-radius:10px;--lib-comp-icon-button-square-sm-radius:12px;--lib-comp-icon-button-square-md-radius:16px;--lib-comp-icon-button-square-lg-radius:28px;--lib-comp-icon-button-square-xl-radius:28px}@layer components{.icon-btn{inline-size:calc(var(--icon-btn-size) * var(--icon-btn-width-factor));block-size:var(--icon-btn-size);border-radius:var(--icon-btn-rest-radius);cursor:pointer;isolation:isolate;-webkit-tap-highlight-color:transparent;transition:background-color var(--lib-motion-duration-short4) var(--lib-motion-easing-emphasized-decelerate), color var(--lib-motion-duration-short4) var(--lib-motion-easing-emphasized-decelerate), border-color var(--lib-motion-duration-short4) var(--lib-motion-easing-emphasized-decelerate);border:0;justify-content:center;align-items:center;display:inline-flex;position:relative}.icon-btn:before{content:"";border-radius:inherit;opacity:0;transition:opacity var(--lib-motion-duration-short4) var(--lib-motion-easing-emphasized-decelerate);background:currentColor;position:absolute;inset:0}.icon-btn:focus-visible:before,.icon-btn:active:not(:disabled):before{opacity:.1}.icon-btn--xs{--icon-btn-size:var(--lib-comp-icon-button-xs-size);--icon-btn-icon:var(--lib-comp-icon-button-xs-icon);--icon-btn-square-radius:var(--lib-comp-icon-button-square-xs-radius)}.icon-btn--sm{--icon-btn-size:var(--lib-comp-icon-button-sm-size);--icon-btn-icon:var(--lib-comp-icon-button-sm-icon);--icon-btn-square-radius:var(--lib-comp-icon-button-square-sm-radius)}.icon-btn--md{--icon-btn-size:var(--lib-comp-icon-button-md-size);--icon-btn-icon:var(--lib-comp-icon-button-md-icon);--icon-btn-square-radius:var(--lib-comp-icon-button-square-md-radius)}.icon-btn--lg{--icon-btn-size:var(--lib-comp-icon-button-lg-size);--icon-btn-icon:var(--lib-comp-icon-button-lg-icon);--icon-btn-square-radius:var(--lib-comp-icon-button-square-lg-radius)}.icon-btn--xl{--icon-btn-size:var(--lib-comp-icon-button-xl-size);--icon-btn-icon:var(--lib-comp-icon-button-xl-icon);--icon-btn-square-radius:var(--lib-comp-icon-button-square-xl-radius)}.icon-btn--width-narrow{--icon-btn-width-factor:var(--lib-comp-icon-button-width-narrow);--icon-btn-rest-radius:calc(var(--icon-btn-size) / 2)}.icon-btn--width-default{--icon-btn-width-factor:var(--lib-comp-icon-button-width-default);--icon-btn-rest-radius:var(--lib-comp-icon-button-radius-rest)}.icon-btn--width-wide{--icon-btn-width-factor:var(--lib-comp-icon-button-width-wide);--icon-btn-rest-radius:calc(var(--icon-btn-size) / 2)}.icon-btn--shape-round{--icon-btn-shape-radius:calc(var(--icon-btn-size) / 2);--icon-btn-morph-radius:var(--icon-btn-square-radius)}.icon-btn--shape-square{--icon-btn-shape-radius:var(--icon-btn-square-radius);--icon-btn-morph-radius:calc(var(--icon-btn-size) / 2)}.icon-btn{border-radius:var(--icon-btn-shape-radius,var(--icon-btn-rest-radius))}:host([data-group-position=middle]) .icon-btn{border-radius:var(--lib-group-inner-current-radius,var(--lib-group-inner-radius,var(--icon-btn-shape-radius,var(--icon-btn-rest-radius))))!important}:host([data-group-position=first]) .icon-btn{border-start-start-radius:var(--lib-group-outer-radius,var(--icon-btn-shape-radius,var(--icon-btn-rest-radius)))!important;border-start-end-radius:var(--lib-group-inner-current-radius,var(--lib-group-inner-radius,var(--icon-btn-shape-radius,var(--icon-btn-rest-radius))))!important;border-end-end-radius:var(--lib-group-inner-current-radius,var(--lib-group-inner-radius,var(--icon-btn-shape-radius,var(--icon-btn-rest-radius))))!important;border-end-start-radius:var(--lib-group-outer-radius,var(--icon-btn-shape-radius,var(--icon-btn-rest-radius)))!important}:host([data-group-position=last]) .icon-btn{border-start-start-radius:var(--lib-group-inner-current-radius,var(--lib-group-inner-radius,var(--icon-btn-shape-radius,var(--icon-btn-rest-radius))))!important;border-start-end-radius:var(--lib-group-outer-radius,var(--icon-btn-shape-radius,var(--icon-btn-rest-radius)))!important;border-end-end-radius:var(--lib-group-outer-radius,var(--icon-btn-shape-radius,var(--icon-btn-rest-radius)))!important;border-end-start-radius:var(--lib-group-inner-current-radius,var(--lib-group-inner-radius,var(--icon-btn-shape-radius,var(--icon-btn-rest-radius))))!important}.icon-btn:active:not(:disabled),.icon-btn.icon-btn--pressed{border-radius:var(--icon-btn-morph-radius,var(--icon-btn-rest-radius))}:host([data-group-active=true]) .icon-btn,:host(:active) .icon-btn{border-radius:var(--lib-group-inner-current-radius,var(--lib-group-inner-radius,var(--icon-btn-morph-radius,var(--icon-btn-rest-radius))))!important}:host([data-group-position=first][data-group-active=true]) .icon-btn,:host([data-group-position=first]:active) .icon-btn{border-start-start-radius:var(--lib-group-outer-radius,var(--icon-btn-shape-radius,var(--icon-btn-rest-radius)))!important;border-start-end-radius:var(--lib-group-inner-current-radius,var(--lib-group-inner-radius,var(--icon-btn-morph-radius,var(--icon-btn-rest-radius))))!important;border-end-end-radius:var(--lib-group-inner-current-radius,var(--lib-group-inner-radius,var(--icon-btn-morph-radius,var(--icon-btn-rest-radius))))!important;border-end-start-radius:var(--lib-group-outer-radius,var(--icon-btn-shape-radius,var(--icon-btn-rest-radius)))!important}:host([data-group-position=last][data-group-active=true]) .icon-btn,:host([data-group-position=last]:active) .icon-btn{border-start-start-radius:var(--lib-group-inner-current-radius,var(--lib-group-inner-radius,var(--icon-btn-morph-radius,var(--icon-btn-rest-radius))))!important;border-start-end-radius:var(--lib-group-outer-radius,var(--icon-btn-shape-radius,var(--icon-btn-rest-radius)))!important;border-end-end-radius:var(--lib-group-outer-radius,var(--icon-btn-shape-radius,var(--icon-btn-rest-radius)))!important;border-end-start-radius:var(--lib-group-inner-current-radius,var(--lib-group-inner-radius,var(--icon-btn-morph-radius,var(--icon-btn-rest-radius))))!important}.icon-btn--standard{color:var(--lib-color-primary);background:0 0}.icon-btn--filled{background:var(--lib-color-primary);color:var(--lib-color-on-primary)}.icon-btn--tonal{background:var(--lib-color-secondary-container);color:var(--lib-color-on-secondary-container)}.icon-btn--outlined{color:var(--lib-color-on-surface-variant);border:1px solid var(--lib-color-outline-variant);background:0 0}.icon-btn--elevated{background:var(--lib-color-surface-container-low);color:var(--lib-color-primary);box-shadow:0 1px 2px color-mix(in srgb, var(--lib-color-shadow) 30%, transparent), 0 1px 3px 1px color-mix(in srgb, var(--lib-color-shadow) 15%, transparent)}.icon-btn--pressed.icon-btn--filled{background:var(--lib-color-primary-container);color:var(--lib-color-on-primary-container)}.icon-btn--pressed.icon-btn--tonal{background:var(--lib-color-secondary);color:var(--lib-color-on-secondary)}.icon-btn--pressed.icon-btn--outlined{background:var(--lib-color-inverse-surface);color:var(--lib-color-inverse-on-surface);border-color:var(--lib-color-inverse-surface)}.icon-btn--pressed.icon-btn--elevated{background:var(--lib-color-primary-container);color:var(--lib-color-on-primary-container);box-shadow:0 1px 2px color-mix(in srgb, var(--lib-color-shadow) 30%, transparent), 0 1px 3px 1px color-mix(in srgb, var(--lib-color-shadow) 15%, transparent)}.icon{inline-size:var(--icon-btn-icon);block-size:var(--icon-btn-icon);color:currentColor;z-index:1;position:relative}.icon-btn:focus-visible{outline:2px solid var(--lib-color-primary);outline-offset:2px}.icon-btn:disabled{opacity:.38;cursor:not-allowed}@media (prefers-reduced-motion:reduce){.icon-btn,.icon-btn:before{transition:none}}}', xe = /* @__PURE__ */ new Set([
  "standard",
  "filled",
  "tonal",
  "outlined",
  "elevated"
]), Kr = /* @__PURE__ */ new Set([
  "extra-small",
  "small",
  "medium",
  "large",
  "extra-large"
]), Xr = {
  check: B.check,
  close: B.close,
  menu: B.menu,
  "chevron-right": B.chevronRight
}, Zr = class extends nt {
  static observedAttributes = [
    "variant",
    "size",
    "width",
    "shape",
    "disabled",
    "toggle",
    "pressed",
    "icon",
    "aria-label"
  ];
  _control = null;
  _onToggle = () => {
    if (!this.hasAttribute("toggle") || this.hasAttribute("disabled")) return;
    const e = !this.hasAttribute("pressed");
    e ? this.setAttribute("pressed", "") : this.removeAttribute("pressed"), this.dispatchEvent(new CustomEvent(wt("change"), {
      bubbles: !0,
      composed: !0,
      detail: { pressed: e }
    }));
  };
  constructor() {
    super();
    const e = this.attachShadow({ mode: "open" }), t = document.createElement("style");
    t.textContent = Yr, e.appendChild(t);
  }
  onInit() {
    this._control || this._mount(), Mt(this.shadowRoot), this._syncAll();
  }
  onDestroy() {
    this._control && (this._control.removeEventListener("click", this._onToggle), this._control.remove(), this._control = null);
  }
  attributeChangedCallback(e, t, r) {
    t === r || !this._control || this._syncAll();
  }
  _mount() {
    const e = document.createElement("button");
    e.type = "button", e.className = "icon-btn icon-btn--sm icon-btn--standard", e.setAttribute("part", "control"), e.addEventListener("click", this._onToggle), this.shadowRoot.appendChild(e), this._control = e;
  }
  _syncAll() {
    this._control && (this._syncVariant(), this._syncSize(), this._syncWidth(), this._syncShape(), this._syncPressed(), this._syncDisabled(), this._syncAria(), this._syncIcon());
  }
  _syncVariant() {
    const e = this.getAttribute("variant") ?? "standard", t = xe.has(e) ? e : "standard", r = this._control;
    for (const i of xe) r.classList.remove(`icon-btn--${i}`);
    r.classList.add(`icon-btn--${t}`);
  }
  _syncSize() {
    const e = this.getAttribute("size") ?? "small", t = Kr.has(e) ? e : "small", r = this._control;
    r.classList.remove("icon-btn--xs", "icon-btn--sm", "icon-btn--md", "icon-btn--lg", "icon-btn--xl"), t === "extra-small" ? r.classList.add("icon-btn--xs") : t === "medium" ? r.classList.add("icon-btn--md") : t === "large" ? r.classList.add("icon-btn--lg") : t === "extra-large" ? r.classList.add("icon-btn--xl") : r.classList.add("icon-btn--sm");
  }
  _syncWidth() {
    const e = this.getAttribute("width") ?? "default", t = this._control;
    t.classList.remove("icon-btn--width-default", "icon-btn--width-narrow", "icon-btn--width-wide"), e === "narrow" ? t.classList.add("icon-btn--width-narrow") : e === "wide" ? t.classList.add("icon-btn--width-wide") : t.classList.add("icon-btn--width-default");
  }
  _syncShape() {
    const e = this.getAttribute("shape") ?? "round", t = this._control;
    t.classList.remove("icon-btn--shape-round", "icon-btn--shape-square"), e === "square" ? t.classList.add("icon-btn--shape-square") : t.classList.add("icon-btn--shape-round");
  }
  _syncPressed() {
    const e = this.hasAttribute("pressed"), t = this.hasAttribute("toggle");
    this._control.classList.toggle("icon-btn--pressed", e), t || e ? Z(this._control, { "aria-pressed": e ? "true" : "false" }) : Z(this._control, { "aria-pressed": void 0 });
  }
  _syncDisabled() {
    this._control.disabled = this.hasAttribute("disabled");
  }
  _syncAria() {
    const e = this.getAttribute("aria-label");
    Z(this._control, { "aria-label": e ?? void 0 });
  }
  _syncIcon() {
    const e = Xr[this.getAttribute("icon") ?? "menu"];
    e && (this._control.innerHTML = `<svg class="icon" aria-hidden="true" focusable="false"><use href="${pt(e)}"/></svg>`);
  }
}, Wr = '@layer components{.split{border-radius:calc(var(--split-height) / 2);min-block-size:var(--split-height);--split-height:40px;--split-primary-pad-start:16px;--split-primary-pad-end:12px;--split-secondary-size:40px;--split-icon-size:20px;--split-inner-radius:4px;--split-menu-offset:-1px;--split-font-size:var(--lib-type-label-large-size);--split-line-height:var(--lib-type-label-large-line-height);--split-letter-spacing:var(--lib-type-label-large-tracking);--split-font-weight:var(--lib-type-label-large-weight);align-items:center;gap:2px;display:inline-flex}.split__primary,.split__secondary{cursor:pointer;color:inherit;font-family:var(--lib-type-label-large-font-family-name);font-size:var(--split-font-size);font-weight:var(--split-font-weight);line-height:var(--split-line-height);letter-spacing:var(--split-letter-spacing);min-height:var(--split-height);transition:background-color var(--lib-motion-duration-short4) var(--lib-motion-easing-emphasized-decelerate), border-radius var(--lib-motion-duration-short4) var(--lib-motion-easing-emphasized-decelerate);isolation:isolate;background:0 0;border:0;justify-content:center;align-items:center;display:inline-flex;position:relative}.split__primary:before,.split__secondary:before{content:"";border-radius:inherit;opacity:0;transition:opacity var(--lib-motion-duration-short4) var(--lib-motion-easing-emphasized-decelerate);pointer-events:none;background:currentColor;position:absolute;inset:0}.split__primary{gap:8px;padding-inline:16px 12px}.split__secondary{inline-size:var(--split-secondary-size)}.split--equal .split__primary,.split--equal .split__secondary{inline-size:var(--split-secondary-size);justify-content:center;padding-inline:0}.split__primary{padding-inline:var(--split-primary-pad-start) var(--split-primary-pad-end)}.split__secondary .icon{transform:translateX(var(--split-menu-offset)) rotate(90deg);transition:transform var(--lib-motion-duration-short4) var(--lib-motion-easing-emphasized-decelerate)}.split__primary{border-start-start-radius:calc(var(--split-height) / 2);border-start-end-radius:var(--split-inner-radius);border-end-end-radius:var(--split-inner-radius);border-end-start-radius:calc(var(--split-height) / 2)}.split__secondary{border-start-start-radius:var(--split-inner-radius);border-start-end-radius:calc(var(--split-height) / 2);border-end-end-radius:calc(var(--split-height) / 2);border-end-start-radius:var(--split-inner-radius)}.split--selected-trailing .split__secondary .icon{transform:translate(0)rotate(-90deg)}.split--elevated{color:var(--lib-color-primary)}.split--elevated .split__primary,.split--elevated .split__secondary{background:var(--lib-color-surface-container-low);box-shadow:0 1px 2px color-mix(in srgb, var(--lib-color-shadow) 30%, transparent), 0 1px 3px 1px color-mix(in srgb, var(--lib-color-shadow) 15%, transparent)}.split--filled{color:var(--lib-color-on-primary)}.split--filled .split__primary,.split--filled .split__secondary{background:var(--lib-color-primary)}.split--tonal{color:var(--lib-color-on-secondary-container)}.split--tonal .split__primary,.split--tonal .split__secondary{background:var(--lib-color-secondary-container)}.split--outlined{color:var(--lib-color-on-surface-variant)}.split--outlined .split__primary,.split--outlined .split__secondary{border:1px solid var(--lib-color-outline-variant);background:0 0}.split__primary:focus-visible,.split__secondary:focus-visible{outline:2px solid var(--lib-color-primary);outline-offset:-2px;border-radius:var(--split-inner-radius)}.split__primary:hover:before,.split__secondary:hover:before{opacity:.08}.split__primary:focus-visible:before,.split__secondary:focus-visible:before{opacity:.1}.split__secondary:active,.split--selected-trailing .split__secondary{border-radius:calc(var(--split-height) / 2)}.split__secondary:active:before,.split--selected-trailing .split__secondary:before{opacity:.1}.split[aria-disabled=true]{opacity:.38}.split[aria-disabled=true] .split__primary,.split[aria-disabled=true] .split__secondary{cursor:not-allowed}.icon{inline-size:var(--split-icon-size);block-size:var(--split-icon-size)}.split--xs{--split-height:32px;--split-primary-pad-start:12px;--split-primary-pad-end:10px;--split-secondary-size:32px;--split-icon-size:18px;--split-menu-offset:-1px;--split-inner-radius:4px;--split-font-size:var(--lib-type-label-small-font-size);--split-line-height:var(--lib-type-label-small-line-height);--split-letter-spacing:var(--lib-type-label-small-tracking);--split-font-weight:var(--lib-type-label-small-weight)}.split--sm{--split-height:40px;--split-primary-pad-start:16px;--split-primary-pad-end:12px;--split-secondary-size:40px;--split-icon-size:20px;--split-menu-offset:-1px;--split-inner-radius:4px;--split-font-size:var(--lib-type-label-large-size);--split-line-height:var(--lib-type-label-large-line-height);--split-letter-spacing:var(--lib-type-label-large-tracking);--split-font-weight:var(--lib-type-label-large-weight)}.split--md{--split-height:56px;--split-primary-pad-start:24px;--split-primary-pad-end:16px;--split-secondary-size:56px;--split-icon-size:24px;--split-menu-offset:-2px;--split-inner-radius:4px;--split-font-size:var(--lib-type-title-medium-font-size);--split-line-height:var(--lib-type-title-medium-line-height);--split-letter-spacing:var(--lib-type-title-medium-tracking);--split-font-weight:var(--lib-type-title-medium-weight)}.split--lg{--split-height:96px;--split-primary-pad-start:48px;--split-primary-pad-end:24px;--split-secondary-size:96px;--split-icon-size:32px;--split-menu-offset:-3px;--split-inner-radius:8px;--split-font-size:var(--lib-type-title-large-font-size);--split-line-height:var(--lib-type-title-large-line-height);--split-letter-spacing:var(--lib-type-title-large-tracking);--split-font-weight:var(--lib-type-title-large-weight)}.split--xl{--split-height:136px;--split-primary-pad-start:64px;--split-primary-pad-end:32px;--split-secondary-size:136px;--split-icon-size:40px;--split-menu-offset:-6px;--split-inner-radius:12px;--split-font-size:var(--lib-type-headline-small-font-size);--split-line-height:var(--lib-type-headline-small-line-height);--split-letter-spacing:var(--lib-type-headline-small-tracking);--split-font-weight:var(--lib-type-headline-small-weight)}}', Qr = /* @__PURE__ */ new Set([
  "elevated",
  "filled",
  "tonal",
  "outlined"
]), Jr = /* @__PURE__ */ new Set([
  "extra-small",
  "small",
  "medium",
  "large",
  "extra-large"
]), ti = {
  check: B.check,
  menu: B.menu,
  close: B.close
}, ei = class extends nt {
  static observedAttributes = [
    "variant",
    "size",
    "disabled",
    "aria-label",
    "secondary-aria-label",
    "icon-leading",
    "selected-trailing",
    "equal-parts"
  ];
  _root = null;
  _primary = null;
  _secondary = null;
  _onPrimaryClick = () => {
    this.hasAttribute("disabled") || this.dispatchEvent(new CustomEvent(wt("split-primary-click"), {
      bubbles: !0,
      composed: !0
    }));
  };
  _onSecondaryClick = () => {
    this.hasAttribute("disabled") || (this.hasAttribute("selected-trailing") ? this.removeAttribute("selected-trailing") : this.setAttribute("selected-trailing", ""), this.dispatchEvent(new CustomEvent(wt("split-secondary-click"), {
      bubbles: !0,
      composed: !0
    })));
  };
  constructor() {
    super();
    const e = this.attachShadow({ mode: "open" }), t = document.createElement("style");
    t.textContent = Wr, e.appendChild(t);
  }
  onInit() {
    this._root || this._mount(), Mt(this.shadowRoot), this._syncAll();
  }
  onDestroy() {
    this._primary?.removeEventListener("click", this._onPrimaryClick), this._secondary?.removeEventListener("click", this._onSecondaryClick), this._root?.remove(), this._root = null, this._primary = null, this._secondary = null;
  }
  attributeChangedCallback(e, t, r) {
    t === r || !this._root || this._syncAll();
  }
  _mount() {
    const e = document.createElement("div");
    e.className = "split split--filled";
    const t = document.createElement("button");
    t.className = "split__primary", t.type = "button", t.innerHTML = '<span class="split__leading" part="icon-leading"></span><span class="split__label"><slot></slot></span>';
    const r = document.createElement("button");
    r.className = "split__secondary", r.type = "button", r.innerHTML = `<svg class="icon" aria-hidden="true" focusable="false"><use href="${pt(B.chevronRight)}"/></svg>`, t.addEventListener("click", this._onPrimaryClick), r.addEventListener("click", this._onSecondaryClick), e.append(t, r), this.shadowRoot.appendChild(e), this._root = e, this._primary = t, this._secondary = r;
  }
  _syncAll() {
    if (!this._root || !this._primary || !this._secondary) return;
    const e = this.getAttribute("variant") ?? "filled", t = Qr.has(e) ? e : "filled";
    this._root.classList.remove("split--elevated", "split--filled", "split--tonal", "split--outlined"), this._root.classList.add(`split--${t}`);
    const r = this.getAttribute("size") ?? "small", i = Jr.has(r) ? r : "small";
    this._root.classList.remove("split--xs", "split--sm", "split--md", "split--lg", "split--xl"), i === "extra-small" ? this._root.classList.add("split--xs") : i === "medium" ? this._root.classList.add("split--md") : i === "large" ? this._root.classList.add("split--lg") : i === "extra-large" ? this._root.classList.add("split--xl") : this._root.classList.add("split--sm");
    const n = this.hasAttribute("disabled");
    this._primary.disabled = n, this._secondary.disabled = n, Z(this._root, { "aria-disabled": n ? "true" : void 0 }), Z(this._primary, { "aria-label": this.getAttribute("aria-label") ?? void 0 }), Z(this._secondary, {
      "aria-label": this.getAttribute("secondary-aria-label") ?? "Open menu",
      "aria-pressed": this.hasAttribute("selected-trailing") ? "true" : "false"
    }), this._root.classList.toggle("split--selected-trailing", this.hasAttribute("selected-trailing")), this._root.classList.toggle("split--equal", this.hasAttribute("equal-parts")), this._syncLeadingIcon();
  }
  _syncLeadingIcon() {
    if (!this._primary) return;
    const e = this._primary.querySelector('[part="icon-leading"]');
    if (!e) return;
    const t = this.getAttribute("icon-leading"), r = t ? ti[t] : void 0;
    if (!r) {
      e.innerHTML = "";
      return;
    }
    e.innerHTML = `<svg class="icon" aria-hidden="true" focusable="false"><use href="${pt(r)}"/></svg>`;
  }
}, ri = ":host{--lib-comp-button-group-gap:2px;--lib-comp-button-group-xs-height:32px;--lib-comp-button-group-xs-inner-default:8px;--lib-comp-button-group-xs-inner-active:4px;--lib-comp-button-group-sm-height:40px;--lib-comp-button-group-sm-inner-default:8px;--lib-comp-button-group-sm-inner-active:4px;--lib-comp-button-group-md-height:56px;--lib-comp-button-group-md-inner-default:8px;--lib-comp-button-group-md-inner-active:4px;--lib-comp-button-group-lg-height:96px;--lib-comp-button-group-lg-inner-default:16px;--lib-comp-button-group-lg-inner-active:12px;--lib-comp-button-group-xl-height:136px;--lib-comp-button-group-xl-inner-default:20px;--lib-comp-button-group-xl-inner-active:16px}@layer components{.group{flex-wrap:wrap;align-items:center;display:inline-flex}.group--standard{gap:.5rem}.group--connected{gap:var(--group-gap);--group-item-height:var(--lib-comp-button-group-sm-height);--group-gap:var(--lib-comp-button-group-gap);--group-inner-radius-active:var(--lib-comp-button-group-sm-inner-active);--group-inner-radius:var(--lib-comp-button-group-sm-inner-default);--group-outer-radius:calc(var(--group-item-height) / 2);border-radius:calc(var(--group-item-height) / 2)}.group--connected ::slotted(.lib-group-item){--lib-group-inner-radius:var(--group-inner-radius);--lib-group-outer-radius:var(--group-outer-radius);--lib-group-inner-current-radius:var(--group-inner-radius);margin:0;border-radius:var(--lib-group-inner-current-radius)!important;border:0!important;display:inline-flex!important;overflow:hidden!important}.group--connected ::slotted(.lib-group-item--first){border-start-start-radius:var(--group-outer-radius)!important;border-start-end-radius:var(--lib-group-inner-current-radius)!important;border-end-end-radius:var(--lib-group-inner-current-radius)!important;border-end-start-radius:var(--group-outer-radius)!important}.group--connected ::slotted(.lib-group-item--middle){border-radius:var(--lib-group-inner-current-radius)!important}.group--connected ::slotted(.lib-group-item--last){border-start-start-radius:var(--lib-group-inner-current-radius)!important;border-start-end-radius:var(--group-outer-radius)!important;border-end-end-radius:var(--group-outer-radius)!important;border-end-start-radius:var(--lib-group-inner-current-radius)!important}.group--connected ::slotted(.lib-group-item[pressed]),.group--connected ::slotted(.lib-group-item[aria-pressed=true]){--lib-group-inner-current-radius:var(--group-outer-radius)}.group--connected ::slotted(.lib-group-item--first[pressed]),.group--connected ::slotted(.lib-group-item--first[aria-pressed=true]){border-start-start-radius:var(--group-outer-radius)!important;border-start-end-radius:var(--group-outer-radius)!important;border-end-end-radius:var(--group-outer-radius)!important;border-end-start-radius:var(--group-outer-radius)!important}.group--connected ::slotted(.lib-group-item--middle[pressed]),.group--connected ::slotted(.lib-group-item--middle[aria-pressed=true]){border-radius:var(--group-outer-radius)!important}.group--connected ::slotted(.lib-group-item--last[pressed]),.group--connected ::slotted(.lib-group-item--last[aria-pressed=true]){border-start-start-radius:var(--group-outer-radius)!important;border-start-end-radius:var(--group-outer-radius)!important;border-end-end-radius:var(--group-outer-radius)!important;border-end-start-radius:var(--group-outer-radius)!important}.group--connected ::slotted(.lib-group-item:active),.group--connected ::slotted(.lib-group-item[data-group-active=true]){--lib-group-inner-current-radius:var(--group-inner-radius-active);border-radius:var(--group-inner-radius-active)!important}.group--connected ::slotted(.lib-group-item--first:active),.group--connected ::slotted(.lib-group-item--first[data-group-active=true]){border-start-start-radius:var(--group-outer-radius)!important;border-start-end-radius:var(--group-inner-radius-active)!important;border-end-end-radius:var(--group-inner-radius-active)!important;border-end-start-radius:var(--group-outer-radius)!important}.group--connected ::slotted(.lib-group-item--middle:active),.group--connected ::slotted(.lib-group-item--middle[data-group-active=true]){border-radius:var(--group-inner-radius-active)!important}.group--connected ::slotted(.lib-group-item--last:active),.group--connected ::slotted(.lib-group-item--last[data-group-active=true]){border-start-start-radius:var(--group-inner-radius-active)!important;border-start-end-radius:var(--group-outer-radius)!important;border-end-end-radius:var(--group-outer-radius)!important;border-end-start-radius:var(--group-inner-radius-active)!important}.group--xs{--group-item-height:var(--lib-comp-button-group-xs-height);--group-gap:var(--lib-comp-button-group-gap);--group-inner-radius:var(--lib-comp-button-group-xs-inner-default);--group-inner-radius-active:var(--lib-comp-button-group-xs-inner-active);--group-outer-radius:calc(var(--group-item-height) / 2)}.group--sm{--group-item-height:var(--lib-comp-button-group-sm-height);--group-gap:var(--lib-comp-button-group-gap);--group-inner-radius:var(--lib-comp-button-group-sm-inner-default);--group-inner-radius-active:var(--lib-comp-button-group-sm-inner-active);--group-outer-radius:calc(var(--group-item-height) / 2)}.group--md{--group-item-height:var(--lib-comp-button-group-md-height);--group-gap:var(--lib-comp-button-group-gap);--group-inner-radius:var(--lib-comp-button-group-md-inner-default);--group-inner-radius-active:var(--lib-comp-button-group-md-inner-active);--group-outer-radius:calc(var(--group-item-height) / 2)}.group--lg{--group-item-height:var(--lib-comp-button-group-lg-height);--group-gap:var(--lib-comp-button-group-gap);--group-inner-radius:var(--lib-comp-button-group-lg-inner-default);--group-inner-radius-active:var(--lib-comp-button-group-lg-inner-active);--group-outer-radius:calc(var(--group-item-height) / 2)}.group--xl{--group-item-height:var(--lib-comp-button-group-xl-height);--group-gap:var(--lib-comp-button-group-gap);--group-inner-radius:var(--lib-comp-button-group-xl-inner-default);--group-inner-radius-active:var(--lib-comp-button-group-xl-inner-active);--group-outer-radius:calc(var(--group-item-height) / 2)}}", ii = /* @__PURE__ */ new Set(["standard", "connected"]), ni = /* @__PURE__ */ new Set([
  "extra-small",
  "small",
  "medium",
  "large",
  "extra-large"
]), ai = class extends nt {
  static observedAttributes = [
    "variant",
    "size",
    "selection-mode"
  ];
  _root = null;
  _slot = null;
  _onSlotChange = () => this._syncConnectedItemClasses();
  _onChildChange = (e) => this._handleChildChange(e);
  constructor() {
    super();
    const e = this.attachShadow({ mode: "open" }), t = document.createElement("style");
    t.textContent = ri, e.appendChild(t);
  }
  onInit() {
    this._root || this._mount(), this.addEventListener(wt("change"), this._onChildChange), this._syncVariant(), this._syncSize(), this._syncConnectedItemClasses();
  }
  onDestroy() {
    this.removeEventListener(wt("change"), this._onChildChange), this._slot?.removeEventListener("slotchange", this._onSlotChange), this._root?.remove(), this._root = null, this._slot = null;
  }
  attributeChangedCallback(e, t, r) {
    t === r || !this._root || (this._syncVariant(), this._syncSize(), this._syncConnectedItemClasses());
  }
  _mount() {
    const e = document.createElement("div");
    e.className = "group group--standard", e.innerHTML = "<slot></slot>", this.shadowRoot.appendChild(e), this._root = e, this._slot = e.querySelector("slot"), this._slot?.addEventListener("slotchange", this._onSlotChange);
  }
  _syncVariant() {
    if (!this._root) return;
    const e = this.getAttribute("variant") ?? "standard", t = (ii.has(e) ? e : "standard") === "connected";
    this._root.classList.remove("group--standard", "group--connected"), this._root.classList.add(t ? "group--connected" : "group--standard"), this._syncSize(), this._syncConnectedItemClasses();
  }
  _syncSize() {
    if (!this._root) return;
    const e = this.getAttribute("size") ?? "small", t = ni.has(e) ? e : "small";
    this._root.classList.remove("group--xs", "group--sm", "group--md", "group--lg", "group--xl"), t === "extra-small" ? this._root.classList.add("group--xs") : t === "medium" ? this._root.classList.add("group--md") : t === "large" ? this._root.classList.add("group--lg") : t === "extra-large" ? this._root.classList.add("group--xl") : this._root.classList.add("group--sm");
  }
  _syncConnectedItemClasses() {
    if (!this._slot) return;
    const e = this._slot.assignedElements({ flatten: !0 }), t = this.getAttribute("size"), r = this._root?.classList.contains("group--connected") ?? !1;
    for (const [i, n] of e.entries())
      n.classList.remove("lib-group-item", "lib-group-item--first", "lib-group-item--middle", "lib-group-item--last"), n.removeAttribute("data-group-position"), r ? (n.classList.add("lib-group-item"), i === 0 ? n.classList.add("lib-group-item--first") : i === e.length - 1 ? n.classList.add("lib-group-item--last") : n.classList.add("lib-group-item--middle"), i === 0 ? n.setAttribute("data-group-position", "first") : i === e.length - 1 ? n.setAttribute("data-group-position", "last") : n.setAttribute("data-group-position", "middle"), t && !n.hasAttribute("size") && n.setAttribute("size", t), n.hasAttribute("shape") || (n.setAttribute("shape", "square"), n.setAttribute("data-group-shape", "auto")), !n.hasAttribute("toggle") && !n.hasAttribute("href") && (n.setAttribute("toggle", ""), n.setAttribute("data-group-toggle", "auto"))) : (n.getAttribute("data-group-shape") === "auto" && (n.removeAttribute("shape"), n.removeAttribute("data-group-shape")), n.getAttribute("data-group-toggle") === "auto" && (n.removeAttribute("toggle"), n.removeAttribute("data-group-toggle")));
  }
  _handleChildChange(e) {
    if (!this._slot) return;
    const t = e.target;
    if (t) {
      if (this._resolveSelectionMode() === "one-select" && (t.hasAttribute("pressed") || t.getAttribute("aria-pressed") === "true")) {
        const r = this._slot.assignedElements({ flatten: !0 });
        for (const i of r)
          i !== t && i.hasAttribute("pressed") && i.removeAttribute("pressed");
      }
      this._syncConnectedItemClasses();
    }
  }
  _resolveSelectionMode() {
    const e = this.getAttribute("selection-mode");
    return e === "one-select" || e === "multi-select" ? e : "multi-select";
  }
}, oi = ':host{--lib-comp-card-radius:12px;--lib-comp-card-padding-inline:16px;--lib-comp-card-padding-block:16px;--lib-comp-card-gap:8px;--lib-comp-card-gap-expanded:12px;--lib-comp-card-heading-gap:4px;--lib-comp-card-actions-gap:8px;--lib-comp-card-min-media-inline:120px;--lib-comp-card-horizontal-media-ratio:36%;--lib-comp-card-mosaic-min-block:220px;--lib-comp-card-staggered-min-block:180px;--lib-comp-card-state-hover-opacity:.08;--lib-comp-card-state-pressed-opacity:.1;--lib-comp-card-focus-ring-width:3px;--lib-comp-card-focus-ring-opacity:35%;--lib-comp-card-elevated-shadow-y:1px;--lib-comp-card-elevated-shadow-blur:2px;--lib-comp-card-elevated-shadow-opacity:18%;--lib-comp-card-elevated-hover-shadow-y:1px;--lib-comp-card-elevated-hover-shadow-blur:3px;--lib-comp-card-elevated-hover-shadow-opacity:22%;--lib-comp-card-overline-tracking:.04em;--lib-comp-card-overline-size:.875rem;--lib-comp-card-overline-weight:500;--lib-comp-card-overline-line-height:1.25rem}@layer components{:host{min-inline-size:0;display:block}.card{border-radius:var(--lib-comp-card-radius);isolation:isolate;text-align:start;min-inline-size:0;transition:box-shadow var(--lib-motion-duration-short4) var(--lib-motion-easing-emphasized-decelerate), border-color var(--lib-motion-duration-short4) var(--lib-motion-easing-emphasized-decelerate), transform var(--lib-motion-duration-short4) var(--lib-motion-easing-emphasized-decelerate);border:1px solid #0000;display:block;position:relative}.card__surface{gap:var(--lib-comp-card-gap);padding-block:var(--lib-comp-card-padding-block);padding-inline:var(--lib-comp-card-padding-inline);border-radius:inherit;outline:none;align-content:start;min-inline-size:0;display:grid;position:relative}.card__surface:before{content:"";border-radius:inherit;background:var(--lib-color-on-surface);opacity:0;transition:opacity var(--lib-motion-duration-short4) var(--lib-motion-easing-emphasized-decelerate);pointer-events:none;position:absolute;inset:0}.card--elevated{background:var(--lib-color-surface-container-low);color:var(--lib-color-on-surface);box-shadow:0 var(--lib-comp-card-elevated-shadow-y) var(--lib-comp-card-elevated-shadow-blur) color-mix(in srgb, var(--lib-color-shadow) var(--lib-comp-card-elevated-shadow-opacity), transparent)}.card--filled{background:var(--lib-color-surface-container-highest);color:var(--lib-color-on-surface)}.card--outlined{background:var(--lib-color-surface);color:var(--lib-color-on-surface);border-color:var(--lib-color-outline-variant)}.card--interactive .card__surface{cursor:pointer}.card--interactive .card__surface:focus-visible{box-shadow:0 0 0 var(--lib-comp-card-focus-ring-width) color-mix(in srgb, var(--lib-color-primary) var(--lib-comp-card-focus-ring-opacity), transparent)}.card--elevated.card--interactive:hover{box-shadow:0 var(--lib-comp-card-elevated-hover-shadow-y) var(--lib-comp-card-elevated-hover-shadow-blur) color-mix(in srgb, var(--lib-color-shadow) var(--lib-comp-card-elevated-hover-shadow-opacity), transparent)}.card--swipe .card__surface{touch-action:pan-y;-webkit-user-select:none;user-select:none}.card--pickup-move .card__surface{cursor:grab}.card--pickup-move .card__surface:active{cursor:grabbing}.card__header{justify-content:space-between;align-items:start;gap:var(--lib-comp-card-gap);display:flex}.card--media-first .card__media{order:1}.card--media-first .card__header{order:2}.card--media-first .card__supporting{order:3}.card--media-first .card__content{order:4}.card--media-first .card__list{order:5}.card--media-first .card__footer{order:6}.card--media-bleed .card__surface{gap:0;padding:0}.card--media-bleed .card__media{margin:0;display:block}.card--media-bleed .card__media::slotted(*){border-radius:var(--lib-comp-card-radius)}.card--media-bleed .card__header,.card--media-bleed .card__supporting,.card--media-bleed .card__content,.card--media-bleed .card__list,.card--media-bleed .card__footer{padding-inline:var(--lib-comp-card-padding-inline)}.card--media-bleed .card__header{padding-block-start:var(--lib-comp-card-padding-block);padding-block-end:var(--lib-comp-card-gap)}.card--media-bleed .card__supporting,.card--media-bleed .card__content,.card--media-bleed .card__list{padding-block-end:var(--lib-comp-card-gap)}.card--media-bleed .card__footer{padding-block-end:var(--lib-comp-card-padding-block)}.card__heading-stack{gap:var(--lib-comp-card-heading-gap);flex:1;min-inline-size:0;display:grid}.card__menu{justify-content:end;display:inline-flex}.card__media::slotted(*){border-radius:var(--lib-corner-medium,.75rem);inline-size:100%;display:block}.card--interactive:hover .card__surface:before{opacity:var(--lib-comp-card-state-hover-opacity)}.card--interactive:active .card__surface:before{opacity:var(--lib-comp-card-state-pressed-opacity)}.card__overline::slotted(*){color:var(--lib-color-on-surface-variant);font-family:var(--lib-type-label-large-font-family-name);font-size:var(--lib-type-label-large-size,var(--lib-comp-card-overline-size));font-weight:var(--lib-type-label-large-weight,var(--lib-comp-card-overline-weight));line-height:var(--lib-type-label-large-line-height,var(--lib-comp-card-overline-line-height));text-transform:uppercase;letter-spacing:var(--lib-comp-card-overline-tracking);margin:0}.card__headline::slotted(*){font-family:var(--lib-type-title-large-font-family-name);font-size:var(--lib-type-title-large-size);font-weight:var(--lib-type-title-large-weight);line-height:var(--lib-type-title-large-line-height);letter-spacing:var(--lib-type-title-large-tracking);margin:0}.card__subhead::slotted(*),.card__supporting::slotted(*){color:var(--lib-color-on-surface-variant);font-family:var(--lib-type-body-medium-font-family-name);font-size:var(--lib-type-body-medium-size);font-weight:var(--lib-type-body-medium-weight);line-height:var(--lib-type-body-medium-line-height);margin:0}.card__content::slotted(*){font-family:var(--lib-type-body-large-font-family-name);font-size:var(--lib-type-body-large-size);font-weight:var(--lib-type-body-large-weight);line-height:var(--lib-type-body-large-line-height);margin:0}.card__list::slotted(*){margin:0}.card__footer{justify-content:start;display:flex}.card__actions{gap:var(--lib-comp-card-actions-gap);flex-wrap:wrap;justify-content:start;display:flex}.card__menu-slot.is-empty,.card__actions-slot.is-empty,.card__list.is-empty,.card__supporting.is-empty,.card__subhead.is-empty,.card__overline.is-empty,.card__headline.is-empty,.card__media.is-empty{display:none}.card--horizontal .card__surface{grid-template-columns:minmax(var(--lib-comp-card-min-media-inline), var(--lib-comp-card-horizontal-media-ratio)) minmax(0, 1fr);grid-template-areas:"media header""media supporting""media content""media list""media footer";align-items:start}.card--horizontal .card__header{grid-area:header}.card--horizontal .card__media{grid-area:media}.card--horizontal .card__supporting{grid-area:supporting}.card--horizontal .card__content{grid-area:content}.card--horizontal .card__list{grid-area:list}.card--horizontal .card__footer{grid-area:footer}.card--layout-vertical-list{inline-size:100%}.card--layout-mosaic{min-block-size:var(--lib-comp-card-mosaic-min-block)}.card--layout-staggered{min-block-size:var(--lib-comp-card-staggered-min-block)}.card--expanded .card__surface{gap:var(--lib-comp-card-gap-expanded)}.card--expandable:not(.card--expanded) .card__list,.card--expandable:not(.card--expanded) .card__content{display:none}@media (width<=720px){.card--horizontal .card__surface{grid-template-columns:1fr;grid-template-areas:"header""media""supporting""content""list""footer"}}}', si = /* @__PURE__ */ new Set([
  "elevated",
  "filled",
  "outlined"
]), li = /* @__PURE__ */ new Set(["vertical", "horizontal"]), ci = /* @__PURE__ */ new Set([
  "default",
  "vertical-list",
  "mosaic",
  "staggered"
]), ui = class extends nt {
  static observedAttributes = [
    "variant",
    "orientation",
    "layout",
    "interactive",
    "href",
    "expandable",
    "expanded",
    "swipe",
    "pickup-move",
    "media-first",
    "media-bleed"
  ];
  _root = null;
  _surface = null;
  _slots = [];
  _pointerStart = null;
  _onClick = (e) => this._handleClick(e);
  _onKeyDown = (e) => this._handleKeyDown(e);
  _onPointerDown = (e) => this._handlePointerDown(e);
  _onPointerUp = (e) => this._handlePointerUp(e);
  _onDragStart = (e) => this._handleDragStart(e);
  _onSlotChange = () => this._syncSlotsState();
  constructor() {
    super();
    const e = this.attachShadow({ mode: "open" }), t = document.createElement("style");
    t.textContent = oi, e.appendChild(t);
  }
  onInit() {
    this._root || this._mount(), this._bindEvents(), this._syncAll();
  }
  onDestroy() {
    this._unbindEvents(), this._root?.remove(), this._root = null, this._surface = null, this._slots = [], this._pointerStart = null;
  }
  attributeChangedCallback(e, t, r) {
    t === r || !this._root || this._syncAll();
  }
  _mount() {
    const e = document.createElement("article");
    e.className = "card", e.innerHTML = `
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
    `, this.shadowRoot.appendChild(e), this._root = e, this._surface = e.querySelector(".card__surface"), this._slots = Array.from(e.querySelectorAll("slot"));
  }
  _syncAll() {
    this._syncVariant(), this._syncOrientation(), this._syncLayout(), this._syncInteractive(), this._syncExpandable(), this._syncPickupMove(), this._syncMediaFlow(), this._syncMediaBleed(), this._syncSlotsState();
  }
  _syncVariant() {
    if (!this._root) return;
    const e = this.getAttribute("variant") ?? "filled", t = si.has(e) ? e : "filled";
    this._root.classList.remove("card--elevated", "card--filled", "card--outlined"), this._root.classList.add(`card--${t}`);
  }
  _syncOrientation() {
    if (!this._root) return;
    const e = this.getAttribute("orientation") ?? "vertical", t = li.has(e) ? e : "vertical";
    this._root.classList.remove("card--vertical", "card--horizontal"), this._root.classList.add(`card--${t}`);
  }
  _syncLayout() {
    if (!this._root) return;
    const e = this.getAttribute("layout") ?? "default", t = ci.has(e) ? e : "default";
    this._root.classList.remove("card--layout-default", "card--layout-vertical-list", "card--layout-mosaic", "card--layout-staggered"), this._root.classList.add(`card--layout-${t}`);
  }
  _syncInteractive() {
    if (!this._root || !this._surface) return;
    const e = this.hasAttribute("interactive") || this.hasAttribute("href") || this.hasAttribute("expandable");
    this._root.classList.toggle("card--interactive", e), this._surface.toggleAttribute("tabindex", e), e ? (this._surface.setAttribute("tabindex", "0"), this._surface.setAttribute("role", "button")) : (this._surface.removeAttribute("tabindex"), this._surface.removeAttribute("role"));
    const t = this.getAttribute("href");
    t && t.trim().length > 0 ? this._surface.setAttribute("data-href", t) : this._surface.removeAttribute("data-href"), this._root.classList.toggle("card--swipe", this.hasAttribute("swipe"));
  }
  _syncExpandable() {
    if (!this._root) return;
    const e = this.hasAttribute("expandable"), t = e && this.hasAttribute("expanded");
    this._root.classList.toggle("card--expandable", e), this._root.classList.toggle("card--expanded", t), e ? this.setAttribute("aria-expanded", t ? "true" : "false") : this.removeAttribute("aria-expanded");
  }
  _syncPickupMove() {
    if (!this._surface || !this._root) return;
    const e = this.hasAttribute("pickup-move");
    this._surface.draggable = e, this._root.classList.toggle("card--pickup-move", e);
  }
  _syncMediaFlow() {
    this._root && this._root.classList.toggle("card--media-first", this.hasAttribute("media-first"));
  }
  _syncMediaBleed() {
    this._root && this._root.classList.toggle("card--media-bleed", this.hasAttribute("media-bleed"));
  }
  _syncSlotsState() {
    !this._root || !this.shadowRoot || this.shadowRoot.querySelectorAll("slot").forEach((e) => {
      const t = e.assignedElements({ flatten: !0 }).length > 0;
      e.classList.toggle("is-empty", !t);
    });
  }
  _bindEvents() {
    this._surface?.addEventListener("click", this._onClick), this._surface?.addEventListener("keydown", this._onKeyDown), this._surface?.addEventListener("pointerdown", this._onPointerDown), this._surface?.addEventListener("pointerup", this._onPointerUp), this._surface?.addEventListener("dragstart", this._onDragStart), this._slots.forEach((e) => e.addEventListener("slotchange", this._onSlotChange));
  }
  _unbindEvents() {
    this._surface?.removeEventListener("click", this._onClick), this._surface?.removeEventListener("keydown", this._onKeyDown), this._surface?.removeEventListener("pointerdown", this._onPointerDown), this._surface?.removeEventListener("pointerup", this._onPointerUp), this._surface?.removeEventListener("dragstart", this._onDragStart), this._slots.forEach((e) => e.removeEventListener("slotchange", this._onSlotChange));
  }
  _handleClick(e) {
    if (!(e.target instanceof HTMLElement) || e.target.closest('[slot="actions"], [slot="menu"]')) return;
    if (this.hasAttribute("expandable")) {
      this.toggleExpanded();
      return;
    }
    const t = this.getAttribute("href");
    if (t && t.trim()) {
      window.location.assign(t);
      return;
    }
    this.hasAttribute("interactive") && this.dispatchEvent(new CustomEvent("lib-card-activate", {
      bubbles: !0,
      composed: !0
    }));
  }
  _handleKeyDown(e) {
    e.key !== "Enter" && e.key !== " " || (e.preventDefault(), this._handleClick(e));
  }
  _handlePointerDown(e) {
    this.hasAttribute("swipe") && (this._pointerStart = {
      x: e.clientX,
      y: e.clientY
    });
  }
  _handlePointerUp(e) {
    if (!this.hasAttribute("swipe") || !this._pointerStart) return;
    const t = e.clientX - this._pointerStart.x, r = e.clientY - this._pointerStart.y;
    if (this._pointerStart = null, Math.abs(t) < 56 || Math.abs(t) < Math.abs(r)) return;
    const i = t > 0 ? "right" : "left";
    this.dispatchEvent(new CustomEvent("lib-card-swipe", {
      bubbles: !0,
      composed: !0,
      detail: { direction: i }
    }));
  }
  _handleDragStart(e) {
    if (!this.hasAttribute("pickup-move")) {
      e.preventDefault();
      return;
    }
    e.dataTransfer?.setData("text/plain", this.id || this.getAttribute("data-key") || ""), this.dispatchEvent(new CustomEvent("lib-card-pickup", {
      bubbles: !0,
      composed: !0
    }));
  }
  expand() {
    this.hasAttribute("expandable") || this.setAttribute("expandable", ""), this.setAttribute("expanded", ""), this._syncExpandable();
  }
  collapse() {
    this.removeAttribute("expanded"), this._syncExpandable();
  }
  toggleExpanded(e) {
    const t = typeof e == "boolean" ? e : !this.hasAttribute("expanded");
    t ? this.expand() : this.collapse(), this.dispatchEvent(new CustomEvent("lib-card-expand", {
      bubbles: !0,
      composed: !0,
      detail: { expanded: t }
    }));
  }
  static filter(e, t) {
    const r = Array.from(e);
    for (const i of r) i.hidden = !t(i);
    return r.filter((i) => !i.hidden);
  }
  static sort(e, t) {
    const r = Array.from(e.querySelectorAll("lib-card"));
    return r.sort(t), r.forEach((i) => e.appendChild(i)), r;
  }
}, di = "@layer components{.nav-card{border:1px solid var(--lib-color-outline-variant);background:var(--lib-color-surface-container-low);min-block-size:88px;color:inherit;transition:background-color var(--lib-motion-duration-short4) var(--lib-motion-easing-emphasized-decelerate);border-radius:1rem;grid-template-columns:auto 1fr auto;align-items:center;gap:.9rem;padding:.9rem 1.1rem;text-decoration:none;display:grid}.nav-card:hover{background:var(--lib-color-surface-container)}.nav-card__icon-chip{background:color-mix(in srgb, var(--lib-color-primary) 10%, transparent);block-size:2.6rem;inline-size:2.6rem;color:var(--lib-color-primary);border-radius:999px;justify-content:center;align-items:center;display:inline-flex}.nav-card__title{font-size:var(--lib-type-title-medium-font-size);line-height:var(--lib-type-title-medium-line-height);font-weight:var(--lib-type-title-medium-weight);letter-spacing:var(--lib-type-title-medium-tracking);margin:0}.nav-card__subtitle{font-size:var(--lib-type-body-medium-font-size);line-height:var(--lib-type-body-medium-line-height);color:var(--lib-color-on-surface-variant);margin:.15rem 0 0}.nav-card__icon{color:currentColor;block-size:1.25rem;inline-size:1.25rem}}", hi = {
  check: B.check,
  close: B.close,
  menu: B.menu,
  "chevron-right": B.chevronRight
}, pi = class extends nt {
  static observedAttributes = [
    "title",
    "subtitle",
    "href",
    "icon-leading",
    "icon-trailing"
  ];
  _root = null;
  constructor() {
    super();
    const e = this.attachShadow({ mode: "open" }), t = document.createElement("style");
    t.textContent = di, e.appendChild(t);
  }
  onInit() {
    this._root || this._mount(), Mt(this.shadowRoot), this._syncAll();
  }
  onDestroy() {
    this._root?.remove(), this._root = null;
  }
  attributeChangedCallback(e, t, r) {
    t === r || !this._root || this._syncAll();
  }
  _mount() {
    const e = this.getAttribute("href") || "#", t = document.createElement("a");
    t.className = "nav-card", t.setAttribute("part", "control"), t.setAttribute("href", e), t.innerHTML = `
      <span class="nav-card__icon-chip" part="icon-leading"></span>
      <span>
        <p class="nav-card__title"></p>
        <p class="nav-card__subtitle"></p>
      </span>
      <span class="nav-card__icon-chip" part="icon-trailing"></span>
    `, this.shadowRoot.appendChild(t), this._root = t;
  }
  _syncAll() {
    if (!this._root) return;
    const e = this.getAttribute("href") || "#";
    this._root.href = e;
    const t = this.getAttribute("title") || "", r = this.getAttribute("subtitle") || "", i = this._root.querySelector(".nav-card__title"), n = this._root.querySelector(".nav-card__subtitle");
    i && (i.textContent = t), n && (n.textContent = r), this._paintIcon("icon-leading", this.getAttribute("icon-leading") || "menu"), this._paintIcon("icon-trailing", this.getAttribute("icon-trailing") || "chevron-right");
  }
  _paintIcon(e, t) {
    if (!this._root) return;
    const r = this._root.querySelector(`[part="${e}"]`);
    if (!r) return;
    const i = hi[t];
    if (!i) {
      r.innerHTML = "";
      return;
    }
    r.innerHTML = `<svg class="nav-card__icon" aria-hidden="true" focusable="false"><use href="${pt(i)}"/></svg>`;
  }
}, mi = ":host{--lib-comp-shape-size:2.5rem;--lib-comp-shape-color:currentColor}@layer components{:host{inline-size:var(--lib-comp-shape-size);block-size:var(--lib-comp-shape-size);color:var(--lib-comp-shape-color);vertical-align:middle;line-height:0;display:inline-flex}svg{block-size:100%;inline-size:100%;color:inherit;fill:currentColor;transform-origin:50%;transition:transform var(--lib-motion-duration-short4) var(--lib-motion-easing-emphasized-decelerate), color var(--lib-motion-duration-short4) var(--lib-motion-easing-emphasized-decelerate);display:block}svg[data-motion=emphasized]{animation:eve-shape-emphasized-in var(--lib-motion-duration-medium2) var(--lib-motion-easing-emphasized-decelerate) both}svg[data-motion=emphasized][data-recoil]{animation:eve-shape-emphasized-in-recoil var(--lib-motion-duration-medium3) var(--lib-motion-easing-emphasized) both}svg[data-motion=spin]{animation:eve-shape-spin var(--lib-motion-duration-long4) var(--lib-motion-easing-emphasized) infinite}svg[data-motion=spin-inverse]{animation:eve-shape-spin-inverse var(--lib-motion-duration-long4) var(--lib-motion-easing-emphasized) infinite}@keyframes eve-shape-emphasized-in{0%{opacity:.001;transform:scale(.92)}to{opacity:1;transform:scale(1)}}@keyframes eve-shape-emphasized-in-recoil{0%{opacity:.001;transform:scale(.88)}60%{opacity:1;transform:scale(1.05)}to{opacity:1;transform:scale(1)}}@keyframes eve-shape-spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes eve-shape-spin-inverse{0%{transform:rotate(0)}to{transform:rotate(-360deg)}}@media (prefers-reduced-motion:reduce){svg{transition:none;animation:none;transform:none}}}", Ae = {
  arch: {
    viewBox: "0 0 304 304",
    d: "M304 253.72C304 259.83 304 262.89 303.69 265.46C301.31 285.51 285.51 301.31 265.46 303.69C262.89 304 259.83 304 253.72 304H50.281C44.169 304 41.113 304 38.544 303.69C18.495 301.31 2.68799 285.51 0.304993 265.46C-7.33137e-06 262.89 0 259.83 0 253.72V152C0 68.05 68.053 0 152 0C235.95 0 304 68.05 304 152V253.72Z"
  },
  arrow: {
    viewBox: "0 0 316 278",
    d: "M271.57 122.2C257.552 100.62 243.535 79.01 229.517 57.43C220.423 43.42 211.167 29.2202 198.872 18.0902C186.576 6.94018 170.648 -0.939823 154.316 0.0901773C139.976 1.01018 126.684 8.72013 116.191 18.7901C105.698 28.8601 97.546 41.2601 89.528 53.5401C67.842 86.7201 46.13 119.9 24.444 153.1C14.139 168.86 3.56499 185.31 0.712987 204.09C-2.73101 226.78 6.55198 249.89 23.018 264.98C40.237 280.76 68.138 279.48 89.098 275.16C112.075 270.41 134.541 261.48 157.975 261.51C178.047 261.51 197.446 268.11 216.979 272.91C236.485 277.68 257.445 280.62 276.279 273.52C299.659 264.73 316.448 239.73 315.991 214.07C315.56 190.66 302.457 169.75 289.839 150.27C283.758 140.92 277.678 131.55 271.597 122.2H271.57Z"
  },
  boom: {
    viewBox: "0 0 320 320",
    d: "M156.818 10.1599C157.571 4.13988 157.948 1.13006 158.52 0.590059C159.353 -0.199941 160.647 -0.199941 161.48 0.590059C162.052 1.13006 162.429 4.13988 163.182 10.1599L172.76 86.74C173.064 89.17 173.216 90.3799 173.652 90.8899C174.285 91.6099 175.32 91.8399 176.193 91.4299C176.794 91.1499 177.425 90.1 178.686 88L218.415 21.9599C221.539 16.7699 223.101 14.1699 223.842 13.9099C224.92 13.5399 226.102 14.0699 226.546 15.1299C226.851 15.8499 225.977 18.76 224.229 24.57L201.999 98.4399C201.293 100.79 200.941 101.96 201.136 102.59C201.42 103.52 202.276 104.14 203.238 104.13C203.901 104.12 204.901 103.42 206.901 102.02L269.911 57.9399C274.867 54.4699 277.344 52.74 278.125 52.8C279.261 52.9 280.127 53.87 280.105 55.01C280.091 55.8 278.117 58.0999 274.17 62.6899L223.976 121.09C222.383 122.94 221.587 123.87 221.508 124.53C221.393 125.49 221.922 126.41 222.807 126.79C223.416 127.06 224.613 126.82 227.006 126.36L302.403 111.86C308.332 110.72 311.297 110.15 311.983 110.53C312.981 111.08 313.381 112.32 312.898 113.36C312.566 114.07 309.834 115.36 304.37 117.94L234.892 150.77C232.686 151.81 231.584 152.33 231.244 152.9C230.751 153.73 230.862 154.79 231.516 155.5C231.966 155.99 233.152 156.27 235.525 156.82L310.272 174.41C316.15 175.79 319.09 176.48 319.562 177.11C320.249 178.02 320.114 179.32 319.253 180.07C318.66 180.58 315.643 180.65 309.607 180.77L232.857 182.34C230.421 182.39 229.203 182.42 228.662 182.8C227.875 183.36 227.548 184.37 227.859 185.29C228.073 185.92 229.043 186.66 230.985 188.14L292.158 234.76C296.968 238.43 299.374 240.27 299.551 241.03C299.809 242.15 299.162 243.28 298.071 243.61C297.322 243.84 294.54 242.66 288.975 240.31L218.226 210.36C215.98 209.41 214.857 208.93 214.207 209.06C213.263 209.25 212.555 210.04 212.468 211C212.409 211.66 212.996 212.74 214.171 214.88L251.192 282.5C254.103 287.81 255.559 290.47 255.411 291.25C255.194 292.37 254.148 293.14 253.016 293C252.238 292.9 250.173 290.69 246.043 286.26L193.526 229.96C191.859 228.18 191.025 227.28 190.38 227.14C189.441 226.92 188.475 227.35 188.006 228.2C187.683 228.78 187.786 230 187.991 232.44L194.458 309.35C194.967 315.4 195.221 318.42 194.773 319.07C194.12 320.01 192.854 320.28 191.878 319.69C191.206 319.28 190.215 316.41 188.233 310.68L163.029 237.78C162.229 235.46 161.829 234.31 161.299 233.91C160.529 233.33 159.471 233.33 158.701 233.91C158.171 234.31 157.771 235.46 156.971 237.78L131.767 310.68C129.785 316.41 128.794 319.28 128.122 319.69C127.146 320.28 125.88 320.01 125.227 319.07C124.779 318.42 125.033 315.4 125.542 309.35L132.009 232.44C132.214 230 132.317 228.78 131.994 228.2C131.525 227.35 130.559 226.92 129.621 227.14C128.975 227.28 128.141 228.18 126.474 229.96L73.9568 286.26C69.8267 290.69 67.7616 292.9 66.984 293C65.8524 293.14 64.8055 292.37 64.5894 291.25C64.4409 290.47 65.8966 287.81 68.808 282.5L105.829 214.88C107.004 212.74 107.591 211.66 107.532 211C107.445 210.04 106.737 209.25 105.793 209.06C105.143 208.93 104.02 209.41 101.774 210.36L31.0245 240.31C25.4605 242.66 22.6785 243.84 21.9288 243.61C20.838 243.28 20.191 242.15 20.4489 241.03C20.6262 240.27 23.0316 238.43 27.8424 234.76L89.0148 188.14C90.957 186.66 91.927 185.92 92.141 185.29C92.452 184.37 92.125 183.36 91.338 182.8C90.797 182.42 89.5787 182.39 87.1425 182.34L10.3933 180.77C4.35749 180.65 1.3395 180.58 0.747495 180.07C-0.114065 179.32 -0.249315 178.02 0.438095 177.11C0.910495 176.48 3.84969 175.79 9.72809 174.41L84.475 156.82C86.8477 156.27 88.034 155.99 88.4844 155.5C89.1385 154.79 89.2491 153.73 88.756 152.9C88.4164 152.33 87.3137 151.81 85.1083 150.77L15.6304 117.94C10.1664 115.36 7.4344 114.07 7.1023 113.36C6.6191 112.32 7.01889 111.08 8.01699 110.53C8.70279 110.15 11.6676 110.72 17.5971 111.86L92.994 126.36C95.387 126.82 96.584 127.06 97.193 126.79C98.078 126.41 98.607 125.49 98.492 124.53C98.414 123.87 97.617 122.94 96.024 121.09L45.8303 62.6899C41.8829 58.0999 39.9092 55.8 39.8946 55.01C39.8732 53.87 40.739 52.9 41.8751 52.8C42.6558 52.74 45.1335 54.4699 50.0889 57.9399L113.099 102.02C115.099 103.42 116.099 104.12 116.762 104.13C117.724 104.14 118.58 103.52 118.864 102.59C119.059 101.96 118.707 100.79 118.001 98.4399L95.771 24.57C94.023 18.76 93.149 15.8499 93.454 15.1299C93.898 14.0699 95.08 13.5399 96.158 13.9099C96.899 14.1699 98.461 16.7699 101.585 21.9599L141.314 88C142.575 90.1 143.206 91.1499 143.807 91.4299C144.68 91.8399 145.715 91.6099 146.348 90.8899C146.784 90.3799 146.936 89.17 147.24 86.74L156.818 10.1599Z"
  },
  boomsoft: {
    viewBox: "0 0 320 320",
    d: "M174.94 84.95C197.48 -28.315 122.55 -28.315 145.08 84.95C122.55 -28.315 53.327 0.35202 117.49 96.38C53.327 0.35202 0.35202 53.33 96.38 117.49C0.35202 53.33 -28.315 122.55 84.95 145.07C-28.315 122.54 -28.315 197.46 84.95 174.93C-28.315 197.46 0.36602 266.67 96.38 202.51C0.36602 266.67 53.34 319.65 117.49 223.62C53.327 319.63 122.55 348.3 145.07 235.05C122.54 348.32 197.46 348.32 174.93 235.05C197.46 348.32 266.67 319.63 202.51 223.62C266.67 319.63 319.65 266.66 223.62 202.51C319.63 266.67 348.3 197.45 235.05 174.93C348.32 197.46 348.32 122.54 235.05 145.07C348.32 122.54 319.63 53.33 223.62 117.49C319.63 53.33 266.66 0.35202 202.51 96.38C266.67 0.36602 197.45 -28.302 174.93 84.95H174.94Z"
  },
  bun: {
    viewBox: "0 0 310 320",
    d: "M0 81.36C0 36.42 36.42 0 81.36 0H228.64C273.58 0 310 36.42 310 81.36C310 118.41 285.23 149.68 251.34 159.5C251.12 159.57 250.97 159.77 250.97 160C250.97 160.23 251.12 160.43 251.34 160.5C285.23 170.32 310 201.59 310 238.64C310 283.58 273.58 320 228.64 320H81.36C36.42 320 0 283.58 0 238.64C0 201.83 24.45 170.73 58 160.69C58.3 160.6 58.51 160.32 58.51 160C58.51 159.68 58.3 159.4 58 159.31C24.45 149.27 0 118.17 0 81.36Z"
  },
  burst: {
    viewBox: "0 0 320 320",
    d: "M157.39 2.55C158.13 1.23 158.49 0.58 158.94 0.3C159.59 -0.1 160.41 -0.1 161.06 0.3C161.51 0.58 161.87 1.23 162.61 2.55L187.87 47.6999C188.32 48.5099 188.55 48.92 188.86 49.16C189.3 49.52 189.87 49.6699 190.43 49.5799C190.82 49.5199 191.22 49.29 192.01 48.81L236.47 22.3399C237.76 21.5699 238.41 21.18 238.93 21.17C239.7 21.14 240.4 21.5499 240.77 22.2199C241.02 22.6899 241.01 23.4399 240.99 24.9499L240.29 76.68C240.27 77.61 240.27 78.0699 240.41 78.4399C240.61 78.9699 241.03 79.3899 241.56 79.5899C241.93 79.7299 242.39 79.7299 243.32 79.7099L295.05 79.01C296.56 78.99 297.31 78.9799 297.78 79.2299C298.45 79.5999 298.86 80.2999 298.83 81.0699C298.82 81.5899 298.43 82.24 297.66 83.53L271.19 127.99C270.71 128.78 270.48 129.18 270.42 129.57C270.33 130.13 270.48 130.7 270.84 131.14C271.08 131.45 271.49 131.68 272.3 132.13L317.45 157.39C318.77 158.13 319.42 158.49 319.7 158.94C320.1 159.59 320.1 160.41 319.7 161.06C319.42 161.51 318.77 161.87 317.45 162.61L272.3 187.87C271.49 188.32 271.08 188.55 270.84 188.86C270.48 189.3 270.33 189.87 270.42 190.43C270.48 190.82 270.71 191.22 271.19 192.01L297.66 236.47C298.43 237.76 298.82 238.41 298.83 238.93C298.86 239.7 298.45 240.4 297.78 240.77C297.31 241.02 296.56 241.01 295.05 240.99L243.32 240.29C242.39 240.27 241.93 240.27 241.56 240.41C241.03 240.61 240.61 241.03 240.41 241.56C240.27 241.93 240.27 242.39 240.29 243.32L240.99 295.05C241.01 296.56 241.02 297.31 240.77 297.78C240.4 298.45 239.7 298.86 238.93 298.83C238.41 298.82 237.76 298.43 236.47 297.66L192.01 271.19C191.22 270.71 190.82 270.48 190.43 270.42C189.87 270.33 189.3 270.48 188.86 270.84C188.55 271.08 188.32 271.49 187.87 272.3L162.61 317.45C161.87 318.77 161.51 319.42 161.06 319.7C160.41 320.1 159.59 320.1 158.94 319.7C158.49 319.42 158.13 318.77 157.39 317.45L132.13 272.3C131.68 271.49 131.45 271.08 131.14 270.84C130.7 270.48 130.13 270.33 129.57 270.42C129.18 270.48 128.78 270.71 127.99 271.19L83.53 297.66C82.24 298.43 81.5899 298.82 81.0699 298.83C80.2999 298.86 79.5999 298.45 79.2299 297.78C78.9799 297.31 78.99 296.56 79.01 295.05L79.7099 243.32C79.7299 242.39 79.7299 241.93 79.5899 241.56C79.3899 241.03 78.9699 240.61 78.4399 240.41C78.0699 240.27 77.61 240.27 76.68 240.29L24.9499 240.99C23.4399 241.01 22.6899 241.02 22.2199 240.77C21.5499 240.4 21.14 239.7 21.17 238.93C21.18 238.41 21.5699 237.76 22.3399 236.47L48.81 192.01C49.29 191.22 49.5199 190.82 49.5799 190.43C49.6699 189.87 49.52 189.3 49.16 188.86C48.92 188.55 48.5099 188.32 47.6999 187.87L2.55 162.61C1.23 161.87 0.58 161.51 0.3 161.06C-0.1 160.41 -0.1 159.59 0.3 158.94C0.58 158.49 1.23 158.13 2.55 157.39L47.6999 132.13C48.5099 131.68 48.92 131.45 49.16 131.14C49.52 130.7 49.6699 130.13 49.5799 129.57C49.5199 129.18 49.29 128.78 48.81 127.99L22.3399 83.53C21.5699 82.24 21.18 81.5899 21.17 81.0699C21.14 80.2999 21.5499 79.5999 22.2199 79.2299C22.6899 78.9799 23.4399 78.99 24.9499 79.01L76.68 79.7099C77.61 79.7299 78.0699 79.7299 78.4399 79.5899C78.9699 79.3899 79.3899 78.9699 79.5899 78.4399C79.7299 78.0699 79.7299 77.61 79.7099 76.68L79.01 24.9499C78.99 23.4399 78.9799 22.6899 79.2299 22.2199C79.5999 21.5499 80.2999 21.14 81.0699 21.17C81.5899 21.18 82.24 21.5699 83.53 22.3399L127.99 48.81C128.78 49.29 129.18 49.5199 129.57 49.5799C130.13 49.6699 130.7 49.52 131.14 49.16C131.45 48.92 131.68 48.5099 132.13 47.6999L157.39 2.55Z"
  },
  burstsoft: {
    viewBox: "0 0 320 320",
    d: "M145.15 7.90401C151.98 -2.63499 168.02 -2.63499 174.85 7.90401L191.24 33.165C195.73 40.093 204.8 42.91 212.69 39.83L241.47 28.603C253.48 23.92 266.45 32.932 265.51 45.3L263.24 74.95C262.61 83.08 268.21 90.45 276.49 92.4L306.68 99.49C319.27 102.45 324.23 117.03 315.86 126.51L295.8 149.21C290.3 155.44 290.3 164.56 295.8 170.79L315.86 193.49C324.23 202.97 319.27 217.55 306.68 220.51L276.49 227.6C268.21 229.55 262.61 236.92 263.24 245.05L265.51 274.7C266.45 287.07 253.48 296.08 241.47 291.4L212.69 280.17C204.8 277.09 195.73 279.91 191.24 286.84L174.85 312.1C168.02 322.63 151.98 322.63 145.15 312.1L128.76 286.84C124.27 279.91 115.2 277.09 107.31 280.17L78.53 291.4C66.52 296.08 53.55 287.07 54.49 274.7L56.76 245.05C57.39 236.92 51.79 229.55 43.51 227.6L13.32 220.51C0.729964 217.55 -4.22997 202.97 4.14003 193.49L24.2 170.79C29.7 164.56 29.7 155.44 24.2 149.21L4.14003 126.51C-4.22997 117.03 0.729964 102.45 13.32 99.49L43.51 92.4C51.79 90.45 57.39 83.08 56.76 74.95L54.49 45.3C53.55 32.932 66.52 23.92 78.53 28.603L107.31 39.83C115.2 42.91 124.27 40.093 128.76 33.165L145.15 7.90401Z"
  },
  circle: {
    viewBox: "0 0 320 320",
    d: "M320 160C320 248.366 248.366 320 160 320C71.6344 320 -1e-05 248.366 0 160C0 71.6344 71.6345 -7.72516e-06 160 0C248.366 7.72516e-06 320 71.6345 320 160Z"
  },
  clamshell: {
    viewBox: "0 0 320 254",
    d: "M306.405 84.081C313.114 97.591 316.468 104.346 318.162 111.403C320.613 121.606 320.613 132.394 318.162 142.597C316.468 149.654 313.114 156.409 306.405 169.919L285.967 211.079C279.258 224.589 275.904 231.344 271.495 236.58C265.12 244.148 257.084 249.543 248.259 252.177C242.155 254 235.446 254 222.028 254H97.972C84.554 254 77.845 254 71.741 252.178C62.916 249.543 54.88 244.149 48.505 236.58C44.096 231.345 40.742 224.589 34.033 211.079L13.595 169.919C6.88599 156.409 3.53201 149.654 1.83801 142.597C-0.612994 132.394 -0.612994 121.606 1.83801 111.403C3.53201 104.346 6.88599 97.591 13.595 84.081L34.033 42.921C40.742 29.411 44.096 22.655 48.505 17.42C54.88 9.85098 62.916 4.45699 71.741 1.82199C77.845 -9.05991e-06 84.554 0 97.972 0H222.028C235.446 0 242.155 -9.05991e-06 248.259 1.82199C257.084 4.45699 265.12 9.85098 271.495 17.42C275.904 22.655 279.258 29.41 285.967 42.921L306.405 84.081Z"
  },
  diamond: {
    viewBox: "0 0 268 320",
    d: "M191.442 276.481C174.606 298.514 166.188 309.53 156.466 314.548C142.383 321.817 125.617 321.817 111.534 314.548C101.812 309.53 93.394 298.514 76.558 276.481L20.646 203.308C10.406 189.906 5.286 183.206 2.751 176.032C-0.917 165.654 -0.917 154.346 2.751 143.968C5.286 136.794 10.406 130.094 20.646 116.692L76.558 43.5194C93.394 21.4863 101.812 10.4697 111.534 5.45181C125.617 -1.81727 142.383 -1.81727 156.466 5.4518C166.188 10.4697 174.606 21.4863 191.442 43.5195L247.354 116.692C257.594 130.094 262.714 136.794 265.249 143.968C268.917 154.346 268.917 165.654 265.249 176.032C262.714 183.206 257.594 189.906 247.354 203.308L191.442 276.481Z"
  },
  fan: {
    viewBox: "0 0 280 280",
    d: "M0 44.2105C0 42.6506 1.95317e-05 41.8706 0.0200195 41.2111C0.71702 18.7571 18.757 0.7174 41.211 0.0205002C41.871 1.82539e-07 42.651 0 44.211 0C52.53 0 56.69 -4.76837e-07 60.208 0.1092C179.96 3.8259 276.17 100.038 279.89 219.792C280 223.31 280 227.47 280 235.789C280 237.349 280 238.129 279.98 238.789C279.28 261.243 261.24 279.283 238.79 279.98C238.13 280 237.35 280 235.79 280H62.945C43.927 280 34.417 280 26.874 277.013C15.955 272.69 7.31 264.045 2.987 253.126C-4.76837e-07 245.583 0 236.073 0 217.055V44.2105Z"
  },
  flower: {
    viewBox: "0 0 320 320",
    d: "M273.13 46.8625C261.25 34.988 234.19 40.8597 201.55 59.6813C191.77 23.2855 176.79 2.9362e-06 160 0C143.2 -2.9362e-06 128.22 23.2841 118.45 59.6779C85.7999 40.8581 58.75 34.9874 46.87 46.8614C35 58.7367 40.8699 85.7963 59.6899 118.446C23.2899 128.222 0 143.204 0 160C0 176.793 23.2801 191.773 59.6801 201.549C40.8501 234.2 34.98 261.261 46.85 273.137C58.73 285.013 85.7899 279.138 118.44 260.31C128.22 296.711 143.2 320 160 320C176.79 320 191.77 296.709 201.55 260.307C234.21 279.136 261.27 285.012 273.15 273.136C285.02 261.26 279.15 234.2 260.32 201.549C296.72 191.773 320 176.793 320 160C320 143.204 296.71 128.222 260.3 118.446C279.13 85.7966 285 58.7376 273.13 46.8625Z",
    fillRule: "evenodd",
    clipRule: "evenodd"
  },
  gem: {
    viewBox: "0 0 302 312",
    d: "M92.48 26.6316C110.64 13.4359 119.73 6.838 129.41 3.55802C143.41 -1.18601 158.59 -1.18601 172.59 3.55802C182.27 6.838 191.36 13.4359 209.52 26.6317L250.37 56.3046C261.16 64.1409 266.56 68.059 270.95 72.7627C277.31 79.5606 282.18 87.6027 285.27 96.381C287.41 102.454 288.38 109.048 290.34 122.236L297.9 173.237C301.33 196.373 303.05 207.941 301.32 218.367C298.81 233.448 291.24 247.227 279.86 257.431C271.99 264.486 261.3 269.245 239.93 278.763L191.52 300.326C178.62 306.07 172.17 308.941 165.55 310.409C155.96 312.53 146.04 312.53 136.45 310.409C129.83 308.941 123.38 306.07 110.48 300.326L62.07 278.763C40.7 269.245 30.01 264.486 22.14 257.431C10.76 247.227 3.19008 233.448 0.68008 218.367C-1.04992 207.941 0.670002 196.373 4.1 173.237L11.6601 122.236C13.6201 109.048 14.59 102.454 16.73 96.381C19.82 87.6027 24.6901 79.5606 31.0501 72.7627C35.4401 68.059 40.84 64.1409 51.63 56.3046L92.48 26.6316Z"
  },
  ghost: {
    viewBox: "0 0 304 304",
    d: "M0 144.762C0 64.812 68.0527 0 152 0C235.947 0 304 64.812 304 144.762V246.095C304 278.075 276.779 304 243.2 304C233.247 304 223.853 301.722 215.56 297.685C211.335 295.627 207.119 293.372 202.885 291.107C187.986 283.136 172.866 275.048 156.327 275.048H147.673C131.134 275.048 116.014 283.136 101.115 291.107C96.881 293.372 92.665 295.627 88.44 297.685C80.1472 301.722 70.7529 304 60.8 304C27.2211 304 0 278.075 0 246.095V144.762Z"
  },
  heart: {
    viewBox: "0 0 320 286",
    d: "M251.1 0.130005C229.439 0.130005 210.113 10.3 197.481 26.2L160 67.51V67.38L122.519 26.0601C109.887 10.1701 90.561 0 68.9 0C30.848 0 0 31.3701 0 70.0601C0 104.06 28.375 129.47 48.919 153.88C69.389 178.21 89.856 202.52 110.323 226.84L156.272 281.44C157.516 282.91 158.756 284.39 160 285.87V286C161.244 284.52 162.484 283.05 163.728 281.57C179.043 263.37 194.358 245.18 209.677 226.98C230.144 202.66 250.614 178.34 271.081 154.02C291.625 129.61 320 104.2 320 70.1899C320 31.4999 289.152 0.130005 251.1 0.130005Z"
  },
  leaf4: {
    viewBox: "0 0 296 296",
    d: "M21 148C7.9 132.34 0 112.13 0 90.0601C0 40.3201 40.11 0 89.6 0C111.99 0 132.47 8.25991 148.17 21.9099C163.84 8.25991 184.27 0 206.61 0C255.98 0 296 40.3201 296 90.0601C296 112.13 288.12 132.34 275.05 148C288.12 163.66 296 183.87 296 205.94C296 255.68 255.98 296 206.61 296C184.27 296 163.84 287.74 148.17 274.09C132.47 287.74 111.99 296 89.6 296C40.11 296 0 255.68 0 205.94C0 183.87 7.9 163.66 21 148Z"
  },
  leaf8: {
    viewBox: "0 0 320 320",
    d: "M308.58 160C334.43 208.16 314.9 251.77 265.07 265.06C251.77 314.9 208.16 334.42 160 308.58C111.83 334.43 68.2201 314.9 54.9301 265.07C5.10006 251.77 -14.4299 208.16 11.4201 160C-14.4299 111.83 5.10006 68.2198 54.9301 54.9298C68.2201 5.09982 111.83 -14.4302 160 11.4198C208.16 -14.4302 251.77 5.09982 265.06 54.9298C314.9 68.2198 334.42 111.83 308.58 160Z"
  },
  oval: {
    viewBox: "0 0 300 300",
    d: "M231.309 231.31C161.705 300.91 68.8765 320.94 23.9707 276.03C-20.9352 231.12 -0.913322 138.29 68.6908 68.6899C138.295 -0.91011 231.123 -20.9401 276.029 23.9699C320.935 68.8799 300.913 161.71 231.309 231.31Z"
  },
  pentagon: {
    viewBox: "0 0 320 320",
    d: "M109.63 24.3699C125.24 12.2899 133.04 6.24994 141.38 3.24994C153.44 -1.08006 166.56 -1.08006 178.62 3.24994C186.96 6.24994 194.76 12.2899 210.37 24.3699L244.51 50.8L278.63 75.56C294.82 87.31 302.92 93.1899 308.33 100.57C316.15 111.26 320.27 124.39 319.99 137.82C319.79 147.11 316.58 156.82 310.14 176.23L296.74 216.66L284.38 258.08C278.57 277.52 275.67 287.24 270.6 294.8C263.26 305.74 252.59 313.78 240.32 317.63C231.84 320.3 222.06 320.14 202.5 319.83L160 319.16L117.5 319.83C97.94 320.14 88.16 320.3 79.68 317.63C67.41 313.78 56.74 305.74 49.4 294.8C44.33 287.24 41.43 277.52 35.62 258.08L23.26 216.66L9.85994 176.23C3.41994 156.82 0.209968 147.11 0.0099682 137.82C-0.270032 124.39 3.85 111.26 11.67 100.57C17.08 93.1899 25.18 87.31 41.37 75.56L75.49 50.8L109.63 24.3699Z"
  },
  pill: {
    viewBox: "0 0 300 300",
    d: "M79.86 37.77C130.22 -12.59 211.87 -12.59 262.23 37.77C312.59 88.13 312.59 169.78 262.23 220.14L220.14 262.23C169.78 312.59 88.13 312.59 37.77 262.23C-12.59 211.87 -12.59 130.22 37.77 79.86L79.86 37.77Z"
  },
  pixelcircle: {
    viewBox: "0 0 320 320",
    d: "M225.19 0H94.81V20.74H50.37V47.41H23.704V94.8101H0V225.19H23.704V272.59H50.37V299.26H94.81V320H225.19V299.26H269.63V272.59H296.3V225.19H320V94.8101H296.3V47.41H269.63V20.74H225.19V0Z"
  },
  pixeltriangle: {
    viewBox: "0 0 248 320",
    d: "M55.64 0H0V320H55.64V292.174H98.5601V265.739H143.08V235.13H179.64V210.086H216.21V179.478H248V140.522H216.21V109.912H179.64V84.869H143.08V54.261H98.5601V27.826H55.64V0Z"
  },
  puffy: {
    viewBox: "0 0 320 280",
    d: "M319.98 138.106C319.72 116.574 303.73 99.333 284.24 99.621C283.17 99.621 282.11 99.711 281.06 99.838C281.88 99.098 282.68 98.341 283.44 97.511C297.4 82.489 297.69 57.782 284.11 42.344C283.31 41.443 282.52 40.541 281.7 39.675C267.74 24.653 245.42 24.977 231.82 40.415C231.07 41.262 230.39 42.146 229.72 43.048C229.83 41.894 229.9 40.721 229.92 39.531C230.19 17.998 214.61 0.307 195.14 0C194.57 0 194 0 193.43 0H192.27C177.84 0 165.46 9.59399 160 23.318C154.54 9.59399 142.15 0 127.73 0H126.57C126 0 125.43 0 124.86 0C105.39 0.289 89.8099 17.98 90.0699 39.531C90.0699 40.721 90.15 41.894 90.26 43.048C89.6 42.146 88.91 41.262 88.16 40.415C74.58 24.977 52.24 24.653 38.28 39.675C37.47 40.559 36.65 41.443 35.87 42.344C22.29 57.782 22.58 82.471 36.54 97.511C37.31 98.341 38.1 99.098 38.92 99.838C37.88 99.711 36.82 99.639 35.74 99.621C16.27 99.333 0.28 116.574 0 138.106C0 138.738 0 139.369 0 140C0 140.631 0 141.262 0 141.894C0.26 163.427 16.26 180.667 35.74 180.379C36.82 180.379 37.88 180.289 38.92 180.162C38.1 180.902 37.31 181.659 36.54 182.489C22.58 197.511 22.29 222.218 35.87 237.656C36.67 238.557 37.47 239.459 38.28 240.325C52.24 255.347 74.56 255.023 88.16 239.585C88.91 238.738 89.6 237.854 90.26 236.952C90.15 238.106 90.0799 239.279 90.0699 240.469C89.8099 262.002 105.38 279.711 124.86 280C125.43 280 126 280 126.57 280H127.73C142.16 280 154.54 270.406 160 256.682C165.46 270.406 177.85 280 192.27 280H193.43C194 280 194.57 280 195.14 280C214.61 279.711 230.19 262.02 229.93 240.469C229.93 239.279 229.85 238.106 229.74 236.952C230.4 237.854 231.09 238.738 231.84 239.585C245.42 255.023 267.76 255.347 281.72 240.325C282.53 239.441 283.35 238.557 284.13 237.656C297.71 222.218 297.42 197.529 283.46 182.489C282.69 181.659 281.9 180.902 281.08 180.162C282.12 180.289 283.18 180.361 284.26 180.379C303.73 180.667 319.74 163.445 320 141.894C320 141.262 320 140.631 320 140C320 139.369 320 138.738 320 138.106H319.98Z"
  },
  puffydiamond: {
    viewBox: "0 0 320 320",
    d: "M249.4 249.754C261.48 237.666 265.57 220.608 261.66 205.157C277.12 209.086 294.2 205.001 306.3 192.902C324.57 174.636 324.57 145.02 306.3 126.754C294.27 114.727 277.32 110.619 261.94 114.43C265.37 99.286 261.19 82.766 249.4 70.975C237.28 58.86 220.17 54.78 204.7 58.736C208.8 43.171 204.75 25.903 192.54 13.7C174.28 -4.56699 144.66 -4.56699 126.4 13.7C114.27 25.83 110.19 42.965 114.17 58.458C99 54.986 82.43 59.158 70.62 70.975C58.83 82.767 54.6499 99.289 58.0799 114.434C42.6899 110.616 25.7299 114.723 13.6999 126.754C-4.57006 145.02 -4.57006 174.636 13.6999 192.902C25.7999 205.005 42.89 209.089 58.35 205.153C54.44 220.605 58.53 237.665 70.62 249.754C82.38 261.521 98.86 265.708 113.98 262.314C110.33 277.602 114.47 294.371 126.4 306.3C144.66 324.567 174.28 324.567 192.54 306.3C204.54 294.301 208.66 277.403 204.89 262.043C220.32 265.914 237.33 261.817 249.4 249.754Z"
  },
  semicircle: {
    viewBox: "0 0 320 200",
    d: "M320 166.92C320 185.19 305.19 200 286.921 200H33.0794C14.8102 200 0 185.19 0 166.92V160C-1e-05 71.63 71.6344 0 160 0C248.366 0 320 71.63 320 160V166.92Z"
  },
  sides4: {
    viewBox: "0 0 280 280",
    d: "M178.73 6.20997C238.87 -19.91 299.91 41.13 273.79 101.27L269.47 111.21C261.5 129.58 261.5 150.42 269.47 168.79L273.79 178.73C299.91 238.87 238.87 299.91 178.73 273.79L168.79 269.47C150.42 261.5 129.58 261.5 111.21 269.47L101.27 273.79C41.128 299.91 -19.9141 238.87 6.20694 178.73L10.526 168.79C18.501 150.42 18.501 129.58 10.526 111.21L6.20694 101.27C-19.9141 41.13 41.128 -19.91 101.27 6.20997L111.21 10.53C129.58 18.5 150.42 18.5 168.79 10.53L178.73 6.20997Z"
  },
  sides6: {
    viewBox: "0 0 296 316",
    d: "M92.1859 22.5702C123.276 -7.51981 172.724 -7.51981 203.814 22.5702C213.328 31.7702 224.984 38.4802 237.738 42.0902C279.419 53.8902 304.142 96.5901 293.552 138.47C290.312 151.29 290.312 164.71 293.552 177.53C304.142 219.41 279.419 262.11 237.738 273.91C224.984 277.52 213.328 284.23 203.814 293.43C172.724 323.52 123.276 323.52 92.1859 293.43C82.6719 284.23 71.0159 277.52 58.2619 273.91C16.5809 262.11 -8.14208 219.41 2.44792 177.53C5.68792 164.71 5.68792 151.29 2.44792 138.47C-8.14208 96.5901 16.5809 53.8902 58.2619 42.0902C71.0159 38.4802 82.6719 31.7702 92.1859 22.5702Z"
  },
  sides7: {
    viewBox: "0 0 320 316",
    d: "M112.67 19.78C116.243 16.64 118.029 15.07 119.671 13.8C143.425 -4.6 176.575 -4.6 200.329 13.8C201.971 15.07 203.757 16.64 207.33 19.78C208.526 20.84 209.124 21.3601 209.724 21.8701C218.136 28.9201 228.171 33.7699 238.92 35.9599C239.688 36.1199 240.471 36.26 242.038 36.54C246.719 37.38 249.059 37.79 251.075 38.29C280.234 45.43 300.902 71.4099 301.364 101.49C301.396 103.57 301.283 105.95 301.057 110.71C300.982 112.31 300.944 113.1 300.925 113.89C300.665 124.88 303.143 135.76 308.136 145.55C308.493 146.25 308.872 146.95 309.63 148.36C311.894 152.55 313.026 154.64 313.897 156.53C326.503 183.83 319.127 216.23 295.949 235.34C294.347 236.67 292.42 238.06 288.566 240.85C287.276 241.79 286.63 242.25 286.007 242.73C277.27 249.38 270.326 258.11 265.803 268.12C265.48 268.84 265.169 269.57 264.547 271.04C262.69 275.43 261.761 277.62 260.832 279.48C247.393 306.38 217.526 320.8 188.162 314.56C186.132 314.12 183.842 313.48 179.262 312.2C177.728 311.78 176.962 311.56 176.203 311.37C165.569 308.67 154.431 308.67 143.797 311.37C143.038 311.56 142.272 311.78 140.738 312.2C136.158 313.48 133.868 314.12 131.838 314.56C102.474 320.8 72.6071 306.38 59.168 279.48C58.2388 277.62 57.3102 275.43 55.453 271.04C54.8311 269.57 54.5202 268.84 54.1975 268.12C49.6741 258.11 42.7297 249.38 33.993 242.73C33.3696 242.25 32.7244 241.79 31.434 240.85C27.5801 238.06 25.6532 236.67 24.0507 235.34C0.872993 216.23 -6.50347 183.83 6.10269 156.53C6.97419 154.64 8.10619 152.55 10.3703 148.36C11.1283 146.95 11.5074 146.25 11.8636 145.55C16.8568 135.76 19.3353 124.88 19.0745 113.89C19.0559 113.1 19.0182 112.31 18.9426 110.71C18.7168 105.95 18.6039 103.57 18.6359 101.49C19.0982 71.4099 39.7665 45.43 68.9252 38.29C70.9411 37.79 73.2814 37.38 77.9618 36.54C79.5289 36.26 80.3125 36.1199 81.0795 35.9599C91.829 33.7699 101.864 28.9201 110.276 21.8701C110.876 21.3601 111.474 20.84 112.67 19.78Z"
  },
  sides9: {
    viewBox: "0 0 320 320",
    d: "M125.26 13.3798C126.99 11.9498 127.85 11.2398 128.64 10.6398C147.19 -3.55019 172.81 -3.55019 191.36 10.6398C192.15 11.2398 193.01 11.9498 194.74 13.3798C195.51 14.0098 195.89 14.3298 196.27 14.6398C205 21.5798 215.71 25.52 226.82 25.87C227.3 25.88 227.8 25.8898 228.79 25.8998C231.02 25.9298 232.14 25.9399 233.12 25.9899C256.36 27.1799 275.98 43.8199 281.17 66.7299C281.39 67.6999 281.6 68.8099 282.02 71.0199C282.2 72.0099 282.29 72.4999 282.39 72.9799C284.66 83.9799 290.36 93.9398 298.64 101.42C299.01 101.75 299.38 102.08 300.14 102.73C301.83 104.2 302.67 104.94 303.39 105.62C320.44 121.61 324.89 147.11 314.29 168.03C313.84 168.92 313.29 169.9 312.2 171.86C311.71 172.74 311.47 173.18 311.24 173.61C305.99 183.5 304.01 194.84 305.6 205.95C305.67 206.44 305.75 206.93 305.91 207.92C306.27 210.15 306.45 211.26 306.57 212.25C309.45 235.57 296.64 257.99 275.21 267.13C274.3 267.52 273.25 267.92 271.17 268.72C270.24 269.07 269.77 269.25 269.32 269.43C259 273.6 250.28 281 244.42 290.54C244.17 290.96 243.92 291.39 243.41 292.25C242.27 294.19 241.7 295.16 241.16 296C228.53 315.73 204.46 324.59 182.22 317.67C181.28 317.38 180.22 317.01 178.12 316.26C177.18 315.93 176.71 315.76 176.25 315.61C165.7 312.1 154.3 312.1 143.75 315.61C143.29 315.76 142.82 315.93 141.88 316.26C139.78 317.01 138.72 317.38 137.78 317.67C115.54 324.59 91.47 315.73 78.84 296C78.3 295.16 77.73 294.19 76.59 292.25C76.08 291.39 75.83 290.96 75.58 290.54C69.72 281 61.0001 273.6 50.6801 269.43C50.2301 269.25 49.76 269.07 48.83 268.72C46.75 267.92 45.7001 267.52 44.7901 267.13C23.3601 257.99 10.5501 235.57 13.4301 212.25C13.5501 211.26 13.73 210.15 14.09 207.92C14.25 206.93 14.3301 206.44 14.4001 205.95C15.9901 194.84 14.01 183.5 8.76004 173.61C8.53004 173.18 8.29008 172.74 7.80008 171.86C6.71008 169.9 6.15999 168.92 5.70999 168.03C-4.89001 147.11 -0.439983 121.61 16.61 105.62C17.33 104.94 18.17 104.2 19.86 102.73C20.62 102.08 20.99 101.75 21.36 101.42C29.64 93.9398 35.34 83.9799 37.61 72.9799C37.71 72.4999 37.8 72.0099 37.98 71.0199C38.4 68.8099 38.61 67.6999 38.83 66.7299C44.02 43.8199 63.64 27.1799 86.88 25.9899C87.86 25.9399 88.98 25.9298 91.21 25.8998C92.2 25.8898 92.7001 25.88 93.1801 25.87C104.29 25.52 115 21.5798 123.73 14.6398C124.11 14.3298 124.49 14.0098 125.26 13.3798Z"
  },
  sides12: {
    viewBox: "0 0 320 320",
    d: "M136.7 9.85021C137.24 9.32021 137.51 9.05019 137.74 8.83019C150.25 -2.93981 169.75 -2.93981 182.26 8.83019C182.49 9.05019 182.76 9.32021 183.3 9.85021C183.63 10.1602 183.79 10.3201 183.94 10.4701C191.95 18.1101 203.28 21.1401 214.03 18.5301C214.24 18.4801 214.46 18.4202 214.9 18.3102C215.63 18.1202 216 18.0301 216.31 17.9501C233.02 14.0101 249.92 23.7601 254.86 40.2101C254.95 40.5201 255.05 40.8802 255.26 41.6102C255.38 42.0502 255.44 42.2701 255.5 42.4801C258.61 53.0901 266.91 61.3901 277.52 64.5001C277.73 64.5601 277.95 64.6201 278.39 64.7401C279.12 64.9501 279.48 65.05 279.79 65.14C296.24 70.08 305.99 86.98 302.05 103.69C301.97 104 301.88 104.37 301.69 105.1C301.58 105.54 301.52 105.76 301.47 105.97C298.86 116.72 301.89 128.05 309.53 136.06C309.68 136.21 309.84 136.37 310.15 136.7C310.68 137.24 310.95 137.51 311.17 137.74C322.94 150.25 322.94 169.75 311.17 182.26C310.95 182.49 310.68 182.76 310.15 183.3C309.84 183.63 309.68 183.79 309.53 183.94C301.89 191.95 298.86 203.28 301.47 214.03C301.52 214.24 301.58 214.46 301.69 214.9C301.88 215.63 301.97 216 302.05 216.31C305.99 233.02 296.24 249.92 279.79 254.86C279.48 254.95 279.12 255.05 278.39 255.26C277.95 255.38 277.73 255.44 277.52 255.5C266.91 258.61 258.61 266.91 255.5 277.52C255.44 277.73 255.38 277.95 255.26 278.39C255.05 279.12 254.95 279.48 254.86 279.79C249.92 296.24 233.02 305.99 216.31 302.05C216 301.97 215.63 301.88 214.9 301.69C214.46 301.58 214.24 301.52 214.03 301.47C203.28 298.86 191.95 301.89 183.94 309.53C183.79 309.68 183.63 309.84 183.3 310.15C182.76 310.68 182.49 310.95 182.26 311.17C169.75 322.94 150.25 322.94 137.74 311.17C137.51 310.95 137.24 310.68 136.7 310.15C136.37 309.84 136.21 309.68 136.06 309.53C128.05 301.89 116.72 298.86 105.97 301.47C105.76 301.52 105.54 301.58 105.1 301.69C104.37 301.88 104 301.97 103.69 302.05C86.9799 305.99 70.08 296.24 65.14 279.79C65.05 279.48 64.95 279.12 64.74 278.39C64.62 277.95 64.56 277.73 64.5 277.52C61.39 266.91 53.09 258.61 42.48 255.5C42.27 255.44 42.05 255.38 41.61 255.26C40.88 255.05 40.5199 254.95 40.2099 254.86C23.7599 249.92 14.0099 233.02 17.9499 216.31C18.0299 216 18.12 215.63 18.31 214.9C18.42 214.46 18.48 214.24 18.53 214.03C21.14 203.28 18.11 191.95 10.47 183.94C10.32 183.79 10.16 183.63 9.84996 183.3C9.31996 182.76 9.04994 182.49 8.82994 182.26C-2.94006 169.75 -2.94006 150.25 8.82994 137.74C9.04994 137.51 9.31996 137.24 9.84996 136.7C10.16 136.37 10.32 136.21 10.47 136.06C18.11 128.05 21.14 116.72 18.53 105.97C18.48 105.76 18.42 105.54 18.31 105.1C18.12 104.37 18.0299 104 17.9499 103.69C14.0099 86.98 23.7599 70.08 40.2099 65.14C40.5199 65.05 40.88 64.9501 41.61 64.7401C42.05 64.6201 42.27 64.5601 42.48 64.5001C53.09 61.3901 61.39 53.0901 64.5 42.4801C64.56 42.2701 64.62 42.0502 64.74 41.6102C64.95 40.8802 65.05 40.5201 65.14 40.2101C70.08 23.7601 86.9799 14.0101 103.69 17.9501C104 18.0301 104.37 18.1202 105.1 18.3102C105.54 18.4202 105.76 18.4801 105.97 18.5301C116.72 21.1401 128.05 18.1101 136.06 10.4701C136.21 10.3201 136.37 10.1602 136.7 9.85021Z"
  },
  slanted: {
    viewBox: "0 0 320 300",
    d: "M15.715 80.54C18.289 55.96 19.576 43.67 24.303 33.978C31.142 19.945 43.077 9.11002 57.628 3.72302C67.683 2.24113e-05 79.933 0 104.432 0H228.137C257.764 0 272.578 3.8147e-06 283.887 4.854C300.261 11.882 312.72 25.849 317.927 43.02C321.523 54.87 319.967 69.73 316.854 99.46L304.285 219.46C301.711 244.04 300.424 256.33 295.697 266.02C288.858 280.05 276.923 290.89 262.372 296.28C252.317 300 240.067 300 215.568 300H91.863C62.236 300 47.422 300 36.113 295.15C19.739 288.12 7.28 274.15 2.073 256.98C-1.524 245.13 0.0330019 230.27 3.146 200.54L15.715 80.54Z"
  },
  square: {
    viewBox: "0 0 320 320",
    d: "M320 172C320 216.72 320 239.08 312.98 256.81C302.81 282.49 282.49 302.81 256.81 312.98C239.08 320 216.72 320 172 320H148C103.28 320 80.9199 320 63.1899 312.98C37.5099 302.81 17.19 282.49 7.02002 256.81C1.95503e-05 239.08 0 216.72 0 172V148C0 103.28 1.95503e-05 80.92 7.02002 63.19C17.19 37.515 37.5099 17.187 63.1899 7.02197C80.9199 -2.71797e-05 103.28 0 148 0H172C216.72 0 239.08 -2.71797e-05 256.81 7.02197C282.49 17.187 302.81 37.515 312.98 63.19C320 80.92 320 103.28 320 148V172Z"
  },
  sunny: {
    viewBox: "0 0 340 340",
    d: "M261.856 41.24C272.431 41.96 277.718 42.32 281.991 44.18C288.175 46.89 293.111 51.83 295.816 58.01C297.685 62.28 298.044 67.57 298.762 78.14L300.402 102.27C300.693 106.55 300.838 108.69 301.303 110.73C301.975 113.68 303.142 116.5 304.754 119.06C305.869 120.84 307.279 122.45 310.097 125.68L326.001 143.9C332.97 151.89 336.455 155.88 338.155 160.22C340.615 166.51 340.615 173.49 338.155 179.78C336.455 184.12 332.97 188.11 326.001 196.1L310.097 214.32C307.279 217.55 305.869 219.16 304.754 220.94C303.142 223.5 301.975 226.32 301.303 229.27C300.838 231.31 300.693 233.45 300.402 237.73L298.762 261.86C298.044 272.43 297.685 277.72 295.816 281.99C293.111 288.17 288.175 293.11 281.991 295.82C277.718 297.68 272.431 298.04 261.856 298.76L237.725 300.4C233.448 300.69 231.31 300.84 229.267 301.3C226.316 301.97 223.499 303.14 220.937 304.75C219.164 305.87 217.549 307.28 214.319 310.1L196.097 326C188.111 332.97 184.119 336.45 179.775 338.15C173.491 340.62 166.509 340.62 160.225 338.15C155.881 336.45 151.889 332.97 143.903 326L125.681 310.1C122.451 307.28 120.836 305.87 119.063 304.75C116.501 303.14 113.684 301.97 110.733 301.3C108.69 300.84 106.552 300.69 102.275 300.4L78.1438 298.76C67.5694 298.04 62.2822 297.68 58.0088 295.82C51.8252 293.11 46.8887 288.17 44.1844 281.99C42.3154 277.72 41.9561 272.43 41.2375 261.86L39.5977 237.73C39.3071 233.45 39.1618 231.31 38.6969 229.27C38.0251 226.32 36.8584 223.5 35.2463 220.94C34.1306 219.16 32.7213 217.55 29.9027 214.32L13.999 196.1C7.02996 188.11 3.54542 184.12 1.84516 179.78C-0.615054 173.49 -0.615053 166.51 1.84516 160.22C3.54542 155.88 7.02996 151.89 13.999 143.9L29.9027 125.68C32.7213 122.45 34.1306 120.84 35.2463 119.06C36.8584 116.5 38.0251 113.68 38.6969 110.73C39.1618 108.69 39.3071 106.55 39.5977 102.27L41.2375 78.14C41.9561 67.57 42.3154 62.28 44.1844 58.01C46.8887 51.83 51.8252 46.89 58.0088 44.18C62.2823 42.32 67.5694 41.96 78.1438 41.24L102.275 39.5999C106.552 39.3099 108.69 39.1599 110.733 38.6999C113.684 38.0299 116.501 36.86 119.063 35.25C120.836 34.13 122.451 32.72 125.681 29.9L143.903 14C151.889 7.02996 155.881 3.54994 160.225 1.84994C166.509 -0.620064 173.491 -0.620064 179.775 1.84994C184.119 3.54994 188.111 7.02996 196.097 14L214.319 29.9C217.549 32.72 219.164 34.13 220.937 35.25C223.499 36.86 226.316 38.0299 229.267 38.6999C231.31 39.1599 233.448 39.3099 237.725 39.5999L261.856 41.24Z"
  },
  sunnysoft: {
    viewBox: "0 0 320 320",
    d: "M136.72 13.1899C147.26 -4.40006 172.74 -4.40006 183.28 13.1899L195.12 32.96C201.27 43.21 213.4 48.24 224.99 45.33L247.35 39.73C267.24 34.75 285.25 52.76 280.27 72.65L274.67 95.01C271.76 106.6 276.79 118.73 287.04 124.88L306.81 136.72C324.4 147.26 324.4 172.74 306.81 183.28L287.04 195.12C276.79 201.27 271.76 213.4 274.67 224.99L280.27 247.35C285.25 267.24 267.24 285.25 247.35 280.27L224.99 274.67C213.4 271.76 201.27 276.79 195.12 287.04L183.28 306.81C172.74 324.4 147.26 324.4 136.72 306.81L124.88 287.04C118.73 276.79 106.6 271.76 95.01 274.67L72.646 280.27C52.763 285.25 34.747 267.24 39.729 247.35L45.333 224.99C48.238 213.4 43.214 201.27 32.96 195.12L13.187 183.28C-4.39599 172.74 -4.39599 147.26 13.187 136.72L32.96 124.88C43.214 118.73 48.238 106.6 45.333 95.01L39.729 72.65C34.747 52.76 52.763 34.75 72.645 39.73L95.01 45.33C106.6 48.24 118.73 43.21 124.88 32.96L136.72 13.1899Z"
  },
  triangle: {
    viewBox: "0 0 316 286",
    d: "M104.461 51.1999C119.597 24.8199 127.165 11.63 136.342 6.06C149.648 -2.02 166.352 -2.02 179.658 6.06C188.835 11.63 196.403 24.8199 211.539 51.1999L293.309 193.72C308.3 219.85 315.795 232.91 315.993 243.58C316.28 259.06 307.949 273.42 294.364 280.86C284.994 286 269.919 286 239.77 286H76.2299C46.0809 286 31.0059 286 21.6359 280.86C8.04994 273.42 -0.280059 259.06 0.00694063 243.58C0.204941 232.91 7.69996 219.85 22.691 193.72L104.461 51.1999Z"
  }
}, bi = {
  "4-sided-cookie": "sides4",
  "6-sided-cookie": "sides6",
  "7-sided-cookie": "sides7",
  "9-sided-cookie": "sides9",
  "12-sided-cookie": "sides12",
  "soft-burst": "burstsoft",
  "soft-boom": "boomsoft",
  "very-sunny": "sunnysoft",
  verysunny: "sunnysoft",
  ghostish: "ghost",
  "pixel-circle": "pixelcircle",
  "pixel-triangle": "pixeltriangle",
  "puffy-diamond": "puffydiamond",
  clover4: "leaf4",
  clover8: "leaf8"
}, gi = "circle", fi = class extends nt {
  static observedAttributes = [
    "name",
    "aria-label",
    "color",
    "rgba",
    "motion",
    "recoil"
  ];
  _svg = null;
  _path = null;
  _reducedMotionMediaQuery = null;
  _onReducedMotionChange = () => this._syncMotion();
  constructor() {
    super();
    const e = this.attachShadow({ mode: "open" }), t = document.createElement("style");
    t.textContent = mi, e.appendChild(t);
  }
  onInit() {
    (!this._svg || !this._path) && this._mount(), this._setupReducedMotionListener(), this._syncAll();
  }
  onDestroy() {
    this._reducedMotionMediaQuery && (this._reducedMotionMediaQuery.removeEventListener("change", this._onReducedMotionChange), this._reducedMotionMediaQuery = null), this._svg?.remove(), this._svg = null, this._path = null;
  }
  attributeChangedCallback(e, t) {
    e === t || !this._svg || !this._path || this._syncAll();
  }
  _mount() {
    const e = "http://www.w3.org/2000/svg", t = document.createElementNS(e, "svg");
    t.setAttribute("part", "svg"), t.setAttribute("fill", "none"), t.setAttribute("focusable", "false"), t.setAttribute("aria-hidden", "true"), t.setAttribute("preserveAspectRatio", "xMidYMid meet");
    const r = document.createElementNS(e, "path");
    t.appendChild(r), this.shadowRoot.appendChild(t), this._svg = t, this._path = r;
  }
  _syncAll() {
    this._syncShape(), this._syncColor(), this._syncMotion(), this._syncA11y();
  }
  _syncShape() {
    const e = Ae[this._resolveShapeName(this.getAttribute("name")) ?? gi];
    this._svg.setAttribute("viewBox", e.viewBox), this._path.setAttribute("d", e.d), this._path.setAttribute("fill", "currentColor"), e.fillRule ? this._path.setAttribute("fill-rule", e.fillRule) : this._path.removeAttribute("fill-rule"), e.clipRule ? this._path.setAttribute("clip-rule", e.clipRule) : this._path.removeAttribute("clip-rule");
  }
  _syncA11y() {
    const e = this.getAttribute("aria-label")?.trim();
    e ? (this._svg.setAttribute("role", "img"), this._svg.setAttribute("aria-label", e), this._svg.removeAttribute("aria-hidden")) : (this._svg.removeAttribute("role"), this._svg.removeAttribute("aria-label"), this._svg.setAttribute("aria-hidden", "true"));
  }
  _syncColor() {
    const e = this.getAttribute("color")?.trim(), t = this.getAttribute("rgba")?.trim(), r = e || t || "";
    if (r && this._isValidCssColor(r)) {
      this.style.setProperty("color", r);
      return;
    }
    this.style.removeProperty("color");
  }
  _syncMotion() {
    if (!this._svg) return;
    const e = this.getAttribute("motion")?.trim().toLowerCase(), t = this.hasAttribute("recoil") || e === "emphasized-recoil";
    if (this._svg.removeAttribute("data-motion"), this._svg.removeAttribute("data-recoil"), !(!e || e === "none" || this._prefersReducedMotion())) {
      if (e === "emphasized" || e === "emphasized-recoil") {
        this._svg.setAttribute("data-motion", "emphasized"), t && this._svg.setAttribute("data-recoil", ""), this._restartMotionAnimation();
        return;
      }
      (e === "spin" || e === "spin-inverse") && (this._svg.setAttribute("data-motion", e), this._restartMotionAnimation());
    }
  }
  _restartMotionAnimation() {
    this._svg && (this._svg.style.animation = "none", this._svg.getBoundingClientRect(), this._svg.style.removeProperty("animation"));
  }
  _setupReducedMotionListener() {
    typeof window > "u" || !window.matchMedia || this._reducedMotionMediaQuery || (this._reducedMotionMediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)"), this._reducedMotionMediaQuery.addEventListener("change", this._onReducedMotionChange));
  }
  _prefersReducedMotion() {
    return this._reducedMotionMediaQuery?.matches ?? !1;
  }
  _isValidCssColor(e) {
    return typeof CSS < "u" && typeof CSS.supports == "function" && CSS.supports("color", e);
  }
  _resolveShapeName(e) {
    if (!e) return null;
    const t = e.trim().toLowerCase();
    return t ? t in Ae ? t : bi[t] ?? null : null;
  }
}, vi = ":host{--lib-comp-loading-indicator-size:48px;--lib-comp-loading-indicator-active-size-default:48px;--lib-comp-loading-indicator-active-size-contained:38px;--lib-comp-loading-indicator-contained-gap:6px;--lib-comp-loading-indicator-spring-duration:.7s;--lib-comp-loading-indicator-rotation-spin-duration:4.666s;--lib-comp-loading-indicator-rotation-spring-duration:.6s;--lib-comp-loading-indicator-default-active-color:var(--lib-color-primary);--lib-comp-loading-indicator-default-container-color:var(--lib-color-primary-container);--lib-comp-loading-indicator-contained-container-color:var(--lib-color-primary-container);--lib-comp-loading-indicator-contained-active-color:var(--lib-color-on-primary-container)}@layer components{:host{inline-size:var(--lib-comp-loading-indicator-size);block-size:var(--lib-comp-loading-indicator-size);vertical-align:middle;line-height:0;display:inline-flex}.li-root,.li-container,.li-rotor,.li-shape-stack,.li-shape{block-size:100%;inline-size:100%}.li-root,.li-container,.li-rotor{place-items:center;display:grid}.li-container{max-inline-size:var(--lib-comp-loading-indicator-size);max-block-size:var(--lib-comp-loading-indicator-size);background:0 0;border-radius:9999px}.li-rotor{inline-size:var(--lib-comp-loading-indicator-active-size-default);block-size:var(--lib-comp-loading-indicator-active-size-default);max-inline-size:var(--lib-comp-loading-indicator-active-size-default);max-block-size:var(--lib-comp-loading-indicator-active-size-default);transform-origin:50%}.li-root[data-variant=contained] .li-container{background:var(--lib-comp-loading-indicator-contained-container-color)}.li-root[data-variant=contained] .li-rotor{inline-size:calc(var(--lib-comp-loading-indicator-size) - 2 * var(--lib-comp-loading-indicator-contained-gap));block-size:calc(var(--lib-comp-loading-indicator-size) - 2 * var(--lib-comp-loading-indicator-contained-gap));max-inline-size:var(--lib-comp-loading-indicator-active-size-contained);max-block-size:var(--lib-comp-loading-indicator-active-size-contained)}.li-shape-stack{transform-origin:50%;position:relative}.li-shape{color:var(--lib-comp-loading-indicator-default-active-color);opacity:0;transition:opacity var(--lib-motion-duration-medium1) var(--lib-motion-easing-emphasized-decelerate), transform var(--lib-motion-duration-medium1) var(--lib-motion-easing-emphasized-decelerate);position:absolute;inset:0;transform:scale(.97)}.li-root[data-variant=contained] .li-shape{color:var(--lib-comp-loading-indicator-contained-active-color)}.li-root[data-front=a] .li-shape--a,.li-root[data-front=b] .li-shape--b{opacity:1;transform:scale(1)}.li-root[data-animated] .li-shape-stack{animation:eve-loading-spring var(--lib-comp-loading-indicator-spring-duration) var(--lib-motion-easing-emphasized) infinite paused;transform-origin:50%}.li-root[data-animated] .li-rotor{animation:eve-loading-spin var(--lib-comp-loading-indicator-rotation-spin-duration) linear infinite}:host([data-dir=rtl]) .li-root[data-animated][data-phase=spin] .li-rotor{animation-name:eve-loading-spin-inverse}.li-root[data-animated][data-phase=spring-swap] .li-shape-stack{animation-play-state:running}.li-root[data-animated][data-phase=spring-swap] .li-rotor{animation-name:eve-loading-spin-inverse;animation-duration:var(--lib-comp-loading-indicator-rotation-spring-duration)}:host([data-dir=rtl]) .li-root[data-animated][data-phase=spring-swap] .li-rotor{animation-name:eve-loading-spin}@keyframes eve-loading-spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes eve-loading-spin-inverse{0%{transform:rotate(0)}to{transform:rotate(-360deg)}}@keyframes eve-loading-spring{0%{transform:scale(1)}42%{transform:scale(1.08)}to{transform:scale(.96)}}@media (prefers-reduced-motion:reduce){.li-rotor,.li-shape-stack,.li-shape{transition:none!important;animation:none!important;transform:none!important}.li-root[data-front=a] .li-shape--a,.li-root[data-front=b] .li-shape--b{opacity:1}.li-root[data-front=a] .li-shape--b,.li-root[data-front=b] .li-shape--a{opacity:0}}}", bt = [
  "burstsoft",
  "sides9",
  "pentagon",
  "pill",
  "sunny",
  "sides4",
  "oval"
], Qt = 500, we = 1e3, yi = 2e3, _i = class extends nt {
  static observedAttributes = [
    "aria-label",
    "paused",
    "variant",
    "dir",
    "duration"
  ];
  _rootEl = null;
  _containerEl = null;
  _shapeA = null;
  _shapeB = null;
  _frontSlot = "a";
  _shapeIndex = 0;
  _phaseTimer = null;
  _phase = "spin";
  _reducedMotionMediaQuery = null;
  _onReducedMotionChange = () => this._syncAnimationState();
  constructor() {
    super();
    const e = this.attachShadow({ mode: "open" }), t = document.createElement("style");
    t.textContent = vi, e.appendChild(t);
  }
  onInit() {
    (!this._rootEl || !this._containerEl || !this._shapeA || !this._shapeB) && this._mount(), this._setupReducedMotionListener(), this._syncAll();
  }
  onDestroy() {
    this._stopMorphLoop(), this._reducedMotionMediaQuery && (this._reducedMotionMediaQuery.removeEventListener("change", this._onReducedMotionChange), this._reducedMotionMediaQuery = null), this._rootEl?.remove(), this._rootEl = null, this._containerEl = null, this._shapeA = null, this._shapeB = null;
  }
  attributeChangedCallback(e, t, r) {
    if (!(t === r || !this._rootEl || !this._containerEl || !this._shapeA || !this._shapeB)) {
      if (e === "aria-label") {
        this._syncA11y();
        return;
      }
      if (e === "variant") {
        this._syncVariant();
        return;
      }
      if (e === "dir") {
        this._syncDirection();
        return;
      }
      if (e === "duration") {
        this._syncTimingTokens();
        return;
      }
      if (e === "paused") {
        this._syncAnimationState();
        return;
      }
      this._syncAll();
    }
  }
  _mount() {
    const e = document.createElement("div");
    e.className = "li-root", e.setAttribute("part", "root"), e.setAttribute("data-variant", "default");
    const t = document.createElement("div");
    t.className = "li-container", t.setAttribute("part", "container");
    const r = document.createElement("div");
    r.className = "li-rotor", r.setAttribute("part", "rotor");
    const i = document.createElement("div");
    i.className = "li-shape-stack", i.setAttribute("part", "shape-stack");
    const n = document.createElement("lib-shape");
    n.className = "li-shape li-shape--a", n.setAttribute("part", "shape shape-a"), n.setAttribute("name", bt[0]), n.setAttribute("aria-hidden", "true");
    const a = document.createElement("lib-shape");
    a.className = "li-shape li-shape--b", a.setAttribute("part", "shape shape-b"), a.setAttribute("name", bt[1]), a.setAttribute("aria-hidden", "true"), i.appendChild(n), i.appendChild(a), r.appendChild(i), t.appendChild(r), e.appendChild(t), e.setAttribute("data-front", "a"), e.setAttribute("data-phase", "spin"), this.shadowRoot.appendChild(e), this._rootEl = e, this._containerEl = t, this._shapeA = n, this._shapeB = a;
  }
  _syncAll() {
    this._syncA11y(), this._syncVariant(), this._syncDirection(), this._syncTimingTokens(), this._syncAnimationState();
  }
  _syncA11y() {
    const e = this.getAttribute("aria-label")?.trim() || "Loading";
    this.setAttribute("role", "progressbar"), this.setAttribute("aria-label", e), this.setAttribute("aria-busy", this.hasAttribute("paused") ? "false" : "true"), this.setAttribute("aria-valuetext", e);
  }
  _syncVariant() {
    this._rootEl && this._rootEl.setAttribute("data-variant", this._resolveVariant());
  }
  _syncAnimationState() {
    if (!this._rootEl || !this._shapeA || !this._shapeB) return;
    const e = !this.hasAttribute("paused") && !this._prefersReducedMotion();
    if (this._rootEl.toggleAttribute("data-animated", e), !e) {
      this._stopMorphLoop(), this._shapeA.setAttribute("name", bt[this._shapeIndex]), this._shapeB.setAttribute("name", bt[(this._shapeIndex + 1) % bt.length]), this._rootEl.setAttribute("data-front", this._frontSlot), this._rootEl.setAttribute("data-phase", "spin");
      return;
    }
    this._startMorphLoop();
  }
  _startMorphLoop() {
    this._phaseTimer != null || !this._rootEl || (this._phase = "spin", this._rootEl.setAttribute("data-phase", this._phase), this._scheduleNextPhase());
  }
  _stopMorphLoop() {
    this._phaseTimer != null && (window.clearTimeout(this._phaseTimer), this._phaseTimer = null), this._phase = "spin", this._rootEl?.setAttribute("data-phase", "spin");
  }
  _advanceShape() {
    if (!this._rootEl || !this._shapeA || !this._shapeB) return;
    const e = (this._shapeIndex + 1) % bt.length, t = this._frontSlot === "a" ? "b" : "a";
    (t === "a" ? this._shapeA : this._shapeB).setAttribute("name", bt[e]), this._shapeIndex = e, this._frontSlot = t, this._rootEl.setAttribute("data-front", this._frontSlot);
  }
  _scheduleNextPhase() {
    if (!this._rootEl) return;
    const e = this._phase === "spin" ? yi : Qt;
    this._phaseTimer = window.setTimeout(() => {
      this._rootEl && (this._phase === "spin" ? (this._phase = "spring-swap", this._rootEl.setAttribute("data-phase", this._phase), this._advanceShape()) : (this._phase = "spin", this._rootEl.setAttribute("data-phase", this._phase)), this._scheduleNextPhase());
    }, e);
  }
  _setupReducedMotionListener() {
    typeof window > "u" || !window.matchMedia || this._reducedMotionMediaQuery || (this._reducedMotionMediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)"), this._reducedMotionMediaQuery.addEventListener("change", this._onReducedMotionChange));
  }
  _prefersReducedMotion() {
    return this._reducedMotionMediaQuery?.matches ?? !1;
  }
  _resolveVariant() {
    return this.getAttribute("variant")?.trim().toLowerCase() === "contained" ? "contained" : "default";
  }
  _syncTimingTokens() {
    this.style.setProperty("--lib-comp-loading-indicator-spring-duration", `${Qt}ms`), this.style.setProperty("--lib-comp-loading-indicator-rotation-spring-duration", `${Qt}ms`), this.style.setProperty("--lib-comp-loading-indicator-rotation-spin-duration", `${this._resolveSpinDurationMs()}ms`);
  }
  _resolveSpinDurationMs() {
    const e = this.getAttribute("duration")?.trim();
    if (!e) return we;
    const t = this._parseDurationMs(e);
    return Number.isFinite(t) ? t : we;
  }
  _parseDurationMs(e) {
    const t = e.trim().toLowerCase();
    return /^\d+(\.\d+)?$/.test(t) || /^\d+(\.\d+)?ms$/.test(t) ? Number.parseFloat(t) : /^\d+(\.\d+)?s$/.test(t) ? Number.parseFloat(t) * 1e3 : NaN;
  }
  _syncDirection() {
    const e = this.getAttribute("dir")?.trim().toLowerCase(), t = this.closest("[dir]")?.getAttribute("dir")?.trim().toLowerCase(), r = getComputedStyle(this).direction.toLowerCase(), i = e || t || r;
    this.setAttribute("data-dir", i === "rtl" ? "rtl" : "ltr");
  }
}, Ci = ":host{--lib-comp-text-field-height:56px;--lib-comp-text-field-padding-inline:16px;--lib-comp-text-field-padding-top:0;--lib-comp-text-field-padding-bottom:0;--lib-comp-text-field-radius:4px;--lib-comp-text-field-label-size:1rem;--lib-comp-text-field-label-float-size:.75rem;--lib-comp-text-field-input-size:1rem;--lib-comp-text-field-support-size:.75rem;--lib-comp-text-field-icon-size:24px;--lib-comp-text-field-prefix-gap:2px;--lib-comp-text-field-icon-gap:16px;--lib-comp-text-field-icon-edge-padding:12px;--lib-comp-text-field-surface-color:transparent;--lib-comp-text-field-outlined-notch-pad:4px;--lib-comp-text-field-outlined-notch-duration:var(--md-sys-motion-duration-medium2,.3s);--lib-comp-text-field-outlined-notch-spring:cubic-bezier(.28, 1.25, .42, .99)}@layer components{:host{inline-size:100%;min-inline-size:220px;max-inline-size:100%;color:var(--lib-color-on-surface);font:var(--lib-typescale-body-large-font,400 1rem/1.5rem system-ui, sans-serif);display:inline-block}.tf{gap:4px;display:grid}.tf__field{box-sizing:border-box;height:56px;transition:background-color var(--lib-motion-duration-short4) var(--lib-motion-easing-emphasized-decelerate), box-shadow var(--lib-motion-duration-short4) var(--lib-motion-easing-emphasized-decelerate);min-block-size:var(--lib-comp-text-field-height);block-size:var(--lib-comp-text-field-height);padding:0 16px;padding-inline:var(--lib-comp-text-field-padding-inline);--lib-outlined-stroke-width:1px;align-items:center;padding-block-start:var(--lib-comp-text-field-padding-top);padding-block-end:var(--lib-comp-text-field-padding-bottom);display:flex;position:relative;overflow:visible}.tf__field--outlined.is-focused{--lib-outlined-stroke-width:2px}.tf__outlined-strokes{z-index:0;pointer-events:none;color:var(--lib-color-outline);border-radius:var(--lib-comp-text-field-radius);position:absolute;inset:0;overflow:hidden}.tf__field--outlined.is-error .tf__outlined-strokes,.tf__field--outlined.is-error.is-focused .tf__outlined-strokes{color:var(--lib-color-error)}.tf__field--outlined.is-focused:not(.is-error) .tf__outlined-strokes{color:var(--lib-color-primary)}.tf__outlined-svg{block-size:100%;inline-size:100%;display:block}.tf__outlined-path{fill:none;stroke:currentColor;stroke-width:var(--lib-outlined-stroke-width);stroke-linejoin:round;stroke-linecap:round;vector-effect:non-scaling-stroke;transition:stroke-width var(--md-sys-motion-duration-short2,.1s) var(--md-sys-motion-easing-emphasized-decelerate,ease)}.tf__field--filled{background-color:var(--lib-color-surface-container-highest);box-shadow:inset 0 calc(-1 * 1px) 0 0 var(--lib-color-on-surface-variant);border-radius:4px 4px 0 0}.tf__field--filled:hover:not(.is-disabled):not(.is-error){box-shadow:inset 0 calc(-1 * 1px) 0 0 var(--lib-color-on-surface)}.tf__field--filled:hover:not(.is-disabled).is-error{box-shadow:inset 0 calc(-1 * 1px) 0 0 var(--lib-color-on-error-container)}.tf__field--filled.is-focused:not(.is-disabled):not(.is-error){box-shadow:inset 0 calc(-1 * 2px) 0 0 var(--lib-color-primary)}.tf__field--filled.is-focused:not(.is-disabled).is-error{box-shadow:inset 0 calc(-1 * 2px) 0 0 var(--lib-color-error)}.tf__field--filled.is-error:not(.is-focused){box-shadow:inset 0 calc(-1 * 1px) 0 0 var(--lib-color-error)}.tf__field--outlined:not(.is-top-notched){height:56px;box-shadow:inset 0 0 0 1px var(--lib-color-outline);background:0 0;border-radius:4px}.tf__field--outlined.is-top-notched{box-shadow:none;background:0 0}.tf__field--outlined:hover:not(.is-disabled):not(.is-top-notched):not(.is-error){box-shadow:inset 0 0 0 1px var(--lib-color-outline)}.tf__field--outlined:hover:not(.is-disabled):not(.is-top-notched).is-error{box-shadow:inset 0 0 0 1px var(--lib-color-error)}.tf__field--outlined.is-focused:not(.is-disabled):not(.is-top-notched):not(.is-error){box-shadow:inset 0 0 0 2px var(--lib-color-primary)}.tf__field--outlined.is-focused:not(.is-disabled):not(.is-top-notched).is-error{box-shadow:inset 0 0 0 2px var(--lib-color-error)}.tf__field--outlined.is-error:not(.is-focused):not(.is-top-notched){box-shadow:inset 0 0 0 1px var(--lib-color-error)}.tf__field--outlined.is-disabled:not(.is-top-notched){box-shadow:inset 0 0 0 1px color-mix(in srgb, var(--lib-color-outline) 38%, transparent)}.tf__field.is-disabled{cursor:not-allowed;pointer-events:none;opacity:.38}.tf__leading,.tf__trailing,.tf__prefix,.tf__suffix,.tf__control-wrap{z-index:1;position:relative}.tf__leading{color:var(--lib-color-on-surface-variant);inline-size:var(--lib-comp-text-field-icon-size);block-size:var(--lib-comp-text-field-icon-size);flex:none;justify-content:center;align-items:center;display:none}.tf__trailing{min-block-size:var(--lib-comp-text-field-icon-size);inline-size:auto;color:var(--lib-color-on-surface-variant);flex-flow:row;flex:none;justify-content:flex-end;align-items:center;gap:0;display:none}.tf__leading.is-visible,.tf__trailing.is-visible{display:inline-flex}.tf__leading{margin-inline-end:var(--lib-comp-text-field-icon-gap)}.tf__trailing{margin-inline-start:var(--lib-comp-text-field-icon-gap)}.tf__icon{inline-size:var(--lib-comp-text-field-icon-size);block-size:var(--lib-comp-text-field-icon-size);color:currentColor}.tf__password-toggle,.tf__password-generate{box-sizing:border-box;block-size:40px;inline-size:40px;color:inherit;cursor:pointer;-webkit-tap-highlight-color:transparent;background:0 0;border:none;border-radius:9999px;flex:none;justify-content:center;align-items:center;margin:0;margin-inline:-8px;padding:0;display:inline-flex}.tf__field:not(.is-disabled) .tf__password-toggle:hover,.tf__field:not(.is-disabled) .tf__password-generate:hover{background:color-mix(in srgb, currentColor 8%, transparent)}.tf__field:not(.is-disabled) .tf__password-toggle:focus-visible,.tf__field:not(.is-disabled) .tf__password-generate:focus-visible{outline:2px solid var(--lib-color-primary);outline-offset:2px}.tf__prefix,.tf__suffix{color:var(--lib-color-on-surface-variant);font-size:var(--lib-comp-text-field-input-size);white-space:nowrap;align-self:center;align-items:center;line-height:24px;display:inline-flex}.tf__prefix{margin-inline-end:var(--lib-comp-text-field-prefix-gap)}.tf__suffix{margin-inline-start:var(--lib-comp-text-field-prefix-gap)}.tf__control-wrap{flex-direction:column;flex:1;justify-content:center;align-self:stretch;align-items:stretch;block-size:100%;min-block-size:0;min-inline-size:0;display:flex;position:relative}.tf__input{box-sizing:border-box;width:100%;font:inherit;font-size:var(--lib-comp-text-field-input-size);color:var(--lib-color-on-surface);caret-color:var(--lib-color-primary);background:0 0;border:none;outline:none;block-size:auto;min-block-size:24px;max-block-size:100%;min-inline-size:0;margin:0;padding:0;line-height:24px;display:block}.tf__field.has-label .tf__input,.tf__field.has-label.is-floating .tf__input,.tf__field.has-label:not(.is-floating) .tf__input{padding:0}.tf__field:not(.has-label) .tf__input{min-block-size:24px}.tf__input::placeholder{color:var(--lib-color-on-surface-variant);opacity:0;transition:opacity var(--lib-motion-duration-short4) var(--lib-motion-easing-emphasized-decelerate)}.tf__field.is-floating .tf__input::placeholder{opacity:1}.tf__label{pointer-events:none;max-width:calc(100% - 1rem);color:var(--lib-color-on-surface-variant);transform-origin:0 0;transition:inset-block-start var(--lib-motion-duration-short4) var(--lib-motion-easing-emphasized-decelerate), inset-inline-start var(--lib-motion-duration-short4) var(--lib-motion-easing-emphasized-decelerate), transform var(--lib-motion-duration-short4) var(--lib-motion-easing-emphasized-decelerate), color var(--lib-motion-duration-short4) var(--lib-motion-easing-emphasized-decelerate), font-size var(--lib-motion-duration-short4) var(--lib-motion-easing-emphasized-decelerate);z-index:1;line-height:1;position:absolute;inset-block-start:16px;inset-inline-start:0}.tf__field--filled.has-label.is-floating .tf__label{font-size:var(--lib-comp-text-field-label-float-size);color:var(--lib-color-primary);inset-block-start:4px;inset-inline-start:0}.tf__field--outlined.has-label:not(.is-floating) .tf__label{font-size:var(--lib-comp-text-field-label-size);margin:0 -4px;padding:0 4px;inset-block-start:16px;inset-inline-start:0;transform:translateY(0)}.tf__field--outlined.has-label.is-floating .tf__label{font-size:var(--lib-comp-text-field-label-float-size);color:var(--lib-color-primary);z-index:2;margin:0;padding:0 4px;line-height:1.35;inset-block-start:-8px;inset-inline-start:calc(12px - var(--lib-comp-text-field-padding-inline));transform:none}.tf__field--outlined:hover:not(.is-disabled):not(.is-error) .tf__label{color:var(--lib-color-on-surface)}.tf__field.is-error .tf__label,.tf__field.is-focused.is-error .tf__label,.tf__field--filled.has-label.is-floating.is-error .tf__label,.tf__field--outlined.has-label.is-floating.is-error .tf__label{color:var(--lib-color-error)}.tf__support{color:var(--lib-color-on-surface-variant);font-size:var(--lib-comp-text-field-support-size);justify-content:space-between;align-items:baseline;gap:16px;min-block-size:20px;padding:4px 16px 0;line-height:1.35;display:flex}.tf__support.is-error{color:var(--lib-color-error)}.tf__counter{white-space:nowrap}.tf__slot{display:contents}.tf__field.has-leading{padding-inline-start:var(--lib-comp-text-field-icon-edge-padding)}.tf__field.has-trailing{padding-inline-end:var(--lib-comp-text-field-icon-edge-padding)}@media (prefers-reduced-motion:reduce){.tf__field,.tf__input::placeholder,.tf__label,.tf__outlined-path{transition:none}}}", xi = /* @__PURE__ */ new Set(["filled", "outlined"]), Ai = {
  check: B.check,
  close: B.close,
  menu: B.menu,
  "chevron-right": B.chevronRight,
  visibility: B.visibility,
  "visibility-off": B.visibilityOff,
  refresh: B.refresh
}, Pe = [
  "name",
  "type",
  "autocomplete",
  "inputmode",
  "minlength",
  "maxlength",
  "pattern",
  "min",
  "max",
  "step",
  "required",
  "disabled",
  "readonly",
  "placeholder"
], wi = 0, Pi = class extends nt {
  static observedAttributes = [
    "variant",
    "label",
    "value",
    "supporting-text",
    "error-text",
    "error",
    "prefix-text",
    "suffix-text",
    "icon-leading",
    "icon-trailing",
    "text-align",
    "aria-label",
    "dir",
    "password-toggle",
    "password-generate",
    "password-min-length",
    "password-min-lower",
    "password-min-upper",
    "password-min-digit",
    "password-min-special",
    ...Pe
  ];
  _field = null;
  _input = null;
  _label = null;
  _supportText = null;
  _counter = null;
  _leadingIconHost = null;
  _trailingIconHost = null;
  _leadingWrap = null;
  _trailingWrap = null;
  _leadingSlot = null;
  _trailingSlot = null;
  _prefix = null;
  _suffix = null;
  _outlinedStrokes = null;
  _outlinedPath = null;
  _outlinedLayoutObserver = null;
  _messageId = "";
  _revealPassword = !1;
  _passwordToggleBtn = null;
  _passwordGenBtn = null;
  _onInput = () => {
    this.setAttribute("value", this._input?.value ?? ""), this._applyPasswordPolicy(), this._syncStateClasses(), this._syncSupportLine(), this._syncOutlinedStrokes();
  };
  _onChange = () => {
    this.setAttribute("value", this._input?.value ?? ""), this._syncSupportLine(), this._dispatchNativeClone("change");
  };
  _onFocus = () => {
    this._field?.classList.add("is-focused"), this._syncStateClasses(), this._syncOutlinedStrokes(), this._dispatchNativeClone("focus");
  };
  _onBlur = () => {
    this._field?.classList.remove("is-focused"), this._syncStateClasses(), this._syncOutlinedStrokes(), this._syncSupportLine(), this._dispatchNativeClone("blur");
  };
  _onSlotChange = () => {
    this._syncIcons(), this._syncOutlinedStrokes();
  };
  _onPasswordToggle = (e) => {
    e.preventDefault(), e.stopPropagation(), !(this.getAttribute("type") !== "password" || this._input?.disabled) && (this._revealPassword = !this._revealPassword, this._applyPasswordInputType(), this._syncPasswordButtons(), this._input?.focus());
  };
  _onPasswordGenerate = (e) => {
    if (e.preventDefault(), e.stopPropagation(), this.getAttribute("type") !== "password" || this._input?.disabled) return;
    const t = Zt(this), r = Jt(t) ? ge(t) : ge({
      minLength: 12,
      minLowercase: 1,
      minUppercase: 1,
      minDigit: 1,
      minSpecial: 1
    });
    this._input && (this._input.value = r), this.setAttribute("value", r), this._onInput(), this._dispatchNativeClone("change");
  };
  constructor() {
    super();
    const e = this.attachShadow({ mode: "open" }), t = document.createElement("style");
    t.textContent = Ci, e.appendChild(t);
  }
  onInit() {
    this._upgradeValueProp(), this._input || this._mount(), Mt(this.shadowRoot), this._bindInputEvents(), this._syncAll();
  }
  onDestroy() {
    this._input && (this._unbindInputEvents(), this._leadingSlot?.removeEventListener("slotchange", this._onSlotChange), this._trailingSlot?.removeEventListener("slotchange", this._onSlotChange), this._outlinedLayoutObserver?.disconnect(), this._outlinedLayoutObserver = null, this._field?.closest(".tf")?.remove(), this._field = null, this._input = null, this._label = null, this._supportText = null, this._counter = null, this._leadingIconHost = null, this._trailingIconHost = null, this._leadingWrap = null, this._trailingWrap = null, this._leadingSlot = null, this._trailingSlot = null, this._prefix = null, this._suffix = null, this._outlinedStrokes = null, this._outlinedPath = null, this._revealPassword = !1, this._passwordToggleBtn?.removeEventListener("click", this._onPasswordToggle), this._passwordGenBtn?.removeEventListener("click", this._onPasswordGenerate), this._passwordToggleBtn = null, this._passwordGenBtn = null);
  }
  attributeChangedCallback(e, t, r) {
    t === r || !this._input || this._syncAll();
  }
  get value() {
    return this._input?.value ?? this.getAttribute("value") ?? "";
  }
  set value(e) {
    this.setAttribute("value", e ?? "");
  }
  focus(e) {
    this._input?.focus(e);
  }
  blur() {
    this._input?.blur();
  }
  select() {
    this._input?.select();
  }
  setSelectionRange(e, t, r) {
    this._input?.setSelectionRange(e, t, r);
  }
  setCustomValidity(e) {
    this._input?.setCustomValidity(e), this._syncSupportLine();
  }
  checkValidity() {
    const e = this._input?.checkValidity() ?? !0;
    return this._syncSupportLine(), e;
  }
  reportValidity() {
    const e = this._input?.reportValidity() ?? !0;
    return this._syncSupportLine(), e;
  }
  _mount() {
    const e = `lib-text-field-${++wi}`;
    this._messageId = `${e}-message`;
    const t = document.createElement("div");
    t.className = "tf", t.innerHTML = `
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
    `, this.shadowRoot.appendChild(t), this._field = t.querySelector(".tf__field"), this._input = t.querySelector(".tf__input"), this._label = t.querySelector(".tf__label"), this._supportText = t.querySelector(".tf__support-text"), this._counter = t.querySelector(".tf__counter"), this._leadingIconHost = t.querySelector(".tf__leading-icon"), this._trailingIconHost = t.querySelector(".tf__trailing-icon"), this._leadingWrap = t.querySelector(".tf__leading"), this._trailingWrap = t.querySelector(".tf__trailing"), this._leadingSlot = t.querySelector('slot[name="leading"]'), this._trailingSlot = t.querySelector('slot[name="trailing"]'), this._prefix = t.querySelector(".tf__prefix"), this._suffix = t.querySelector(".tf__suffix"), this._outlinedStrokes = t.querySelector(".tf__outlined-strokes"), this._outlinedPath = t.querySelector(".tf__outlined-path"), this._passwordToggleBtn = t.querySelector(".tf__password-toggle"), this._passwordGenBtn = t.querySelector(".tf__password-generate"), this._bindPasswordControls(), this._input?.setAttribute("id", e), this._input?.setAttribute("aria-describedby", this._messageId), this._label?.setAttribute("for", e), this._leadingSlot?.addEventListener("slotchange", this._onSlotChange), this._trailingSlot?.addEventListener("slotchange", this._onSlotChange), this._setupOutlinedLayoutObserver();
  }
  _setupOutlinedLayoutObserver() {
    this._outlinedLayoutObserver || !this._field || typeof ResizeObserver > "u" || (this._outlinedLayoutObserver = new ResizeObserver(() => {
      this._syncOutlinedStrokes();
    }), this._outlinedLayoutObserver.observe(this._field), this._label && this._outlinedLayoutObserver.observe(this._label));
  }
  _bindInputEvents() {
    this._input && (this._input.addEventListener("input", this._onInput), this._input.addEventListener("change", this._onChange), this._input.addEventListener("focus", this._onFocus), this._input.addEventListener("blur", this._onBlur));
  }
  _unbindInputEvents() {
    this._input && (this._input.removeEventListener("input", this._onInput), this._input.removeEventListener("change", this._onChange), this._input.removeEventListener("focus", this._onFocus), this._input.removeEventListener("blur", this._onBlur));
  }
  _bindPasswordControls() {
    this._passwordToggleBtn?.addEventListener("click", this._onPasswordToggle), this._passwordGenBtn?.addEventListener("click", this._onPasswordGenerate);
  }
  _applyPasswordInputType() {
    if (!this._input) return;
    const e = this.getAttribute("type") ?? "text";
    e === "password" && this._revealPassword ? this._input.setAttribute("type", "text") : this._input.setAttribute("type", e === "" ? "text" : e);
  }
  _applyPasswordPolicy() {
    if (!this._input) return;
    if (this.getAttribute("type") !== "password" || !Jt(Zt(this))) {
      this._input.setCustomValidity("");
      return;
    }
    const e = this._input.value, t = Ke(e, Zt(this));
    this._input.setCustomValidity(t.valid ? "" : t.message);
  }
  _syncPasswordButtons() {
    const e = this.getAttribute("type") === "password";
    e || (this._revealPassword = !1);
    const t = e && this.hasAttribute("password-toggle") && this._passwordToggleBtn, r = e && this.hasAttribute("password-generate") && this._passwordGenBtn;
    if (this._passwordToggleBtn && (this._passwordToggleBtn.hidden = !t, t)) {
      const i = e && this._revealPassword, n = i ? B.visibilityOff : B.visibility;
      this._passwordToggleBtn.innerHTML = `<svg class="tf__icon" aria-hidden="true" focusable="false" width="24" height="24"><use href="${pt(n)}"/></svg>`, this._passwordToggleBtn.setAttribute("aria-pressed", i ? "true" : "false"), this._passwordToggleBtn.setAttribute("aria-label", i ? "Masquer le mot de passe" : "Afficher le mot de passe"), this._passwordToggleBtn.setAttribute("tabindex", "0");
    }
    this._passwordGenBtn && (this._passwordGenBtn.hidden = !r, r && (this._passwordGenBtn.innerHTML = `<svg class="tf__icon" aria-hidden="true" focusable="false" width="24" height="24"><use href="${pt(B.refresh)}"/></svg>`, this._passwordGenBtn.setAttribute("aria-label", "Générer un mot de passe"), this._passwordGenBtn.setAttribute("tabindex", "0"))), this._applyPasswordInputType();
  }
  _syncAll() {
    !this._input || !this._field || (this._syncSurfaceColor(), this._syncVariant(), this._syncLabel(), this._syncInputAttrs(), this._syncTextAlign(), this._syncValue(), this._syncPrefixSuffix(), this._syncPasswordButtons(), this._applyPasswordPolicy(), this._syncIcons(), this._syncDirection(), this._syncStateClasses(), this._syncSupportLine(), this._syncOutlinedStrokes());
  }
  _syncSurfaceColor() {
    let e = this.parentElement, t = "";
    for (; e; ) {
      const r = getComputedStyle(e).backgroundColor;
      if (!this._isTransparentColor(r)) {
        t = r;
        break;
      }
      e = e.parentElement;
    }
    this.style.setProperty("--lib-comp-text-field-surface-color", t || "transparent");
  }
  _isTransparentColor(e) {
    const t = e.replace(/\s+/g, "").toLowerCase();
    return t === "transparent" || t === "rgba(0,0,0,0)";
  }
  _syncVariant() {
    const e = this.getAttribute("variant") ?? "filled", t = xi.has(e) ? e : "filled";
    this._field.classList.remove("tf__field--filled", "tf__field--outlined"), this._field.classList.add(`tf__field--${t}`);
  }
  _syncLabel() {
    const e = this.getAttribute("label") ?? "";
    this._label.textContent = e;
    const t = this.getAttribute("aria-label");
    e.trim().length === 0 ? t?.trim() && this._input.setAttribute("aria-label", t) : this._input.removeAttribute("aria-label");
  }
  _syncInputAttrs() {
    for (const e of Pe) {
      if (e === "type") continue;
      const t = this.getAttribute(e);
      t === null ? this._input.removeAttribute(e) : this._input.setAttribute(e, t === "" ? "" : t);
    }
    (this.getAttribute("type") ?? "text") !== "password" && (this._revealPassword = !1), this._applyPasswordInputType(), this._input.getAttribute("type") || this._input.setAttribute("type", "text");
  }
  _syncTextAlign() {
    if (!this._input) return;
    const e = (this.getAttribute("text-align") ?? "").trim().toLowerCase();
    if (e === "left" || e === "right") {
      this._input.style.textAlign = e;
      return;
    }
    this._input.style.removeProperty("text-align");
  }
  _syncValue() {
    const e = this.getAttribute("value") ?? "";
    this._input.value !== e && (this._input.value = e);
  }
  _syncPrefixSuffix() {
    const e = this.getAttribute("prefix-text"), t = this.getAttribute("suffix-text");
    this._prefix.textContent = e ?? "", this._suffix.textContent = t ?? "", this._prefix.hidden = !e, this._suffix.hidden = !t;
  }
  _syncIcons() {
    const e = this._paintIcon("leading", this.getAttribute("icon-leading"), this._leadingSlot, this._leadingIconHost), t = this._paintIcon("trailing", this.getAttribute("icon-trailing"), this._trailingSlot, this._trailingIconHost), r = this.getAttribute("type") === "password", i = r && this.hasAttribute("password-toggle"), n = r && this.hasAttribute("password-generate"), a = !!this._trailingSlot?.assignedNodes({ flatten: !0 }).length, o = t || a || i || n;
    this._leadingWrap?.classList.toggle("is-visible", e), this._trailingWrap?.classList.toggle("is-visible", o), this._field?.classList.toggle("has-leading", e), this._field?.classList.toggle("has-trailing", o);
  }
  _paintIcon(e, t, r, i) {
    if (!r || !i) return !1;
    if (r.assignedNodes({ flatten: !0 }).length > 0)
      return i.hidden = !0, i.innerHTML = "", !0;
    const n = t ? Ai[t] : void 0;
    return n ? (i.hidden = !1, i.innerHTML = `<svg class="tf__icon tf__icon--${e}" aria-hidden="true" focusable="false"><use href="${pt(n)}"/></svg>`, !0) : (i.hidden = !0, i.innerHTML = "", !1);
  }
  _syncDirection() {
    const e = this.getAttribute("dir");
    e === "rtl" || e === "ltr" ? this._field.setAttribute("dir", e) : this._field.removeAttribute("dir");
  }
  _syncStateClasses() {
    const e = (this._input?.value ?? "").length > 0, t = (this.getAttribute("label") ?? "").trim().length > 0, r = this._field.classList.contains("is-focused"), i = t && (e || r);
    this._field.classList.toggle("has-value", e), this._field.classList.toggle("has-label", t), this._field.classList.toggle("is-floating", i), this._field.classList.toggle("is-disabled", this._input.disabled);
  }
  _syncOutlinedStrokes() {
    if (!this._field || !this._label) return;
    if ((this.getAttribute("variant") ?? "filled") !== "outlined") {
      this._outlinedStrokes?.setAttribute("hidden", ""), this._field.classList.remove("is-top-notched"), this._field.style.removeProperty("--lib-outlined-tstart"), this._field.style.removeProperty("--lib-outlined-tend");
      return;
    }
    const e = (this.getAttribute("label") ?? "").trim(), t = (this._input?.value ?? "").length > 0, r = this._field.classList.contains("is-focused"), i = e.length > 0 && (t || r);
    if (this._field.classList.toggle("is-top-notched", i), this._outlinedStrokes?.toggleAttribute("hidden", !i), !i) {
      this._field.style.removeProperty("--lib-outlined-tstart"), this._field.style.removeProperty("--lib-outlined-tend");
      return;
    }
    const n = () => {
      if (!this._field || !this._label || !this._outlinedPath) return;
      const a = this._field.getBoundingClientRect(), o = this._label.getBoundingClientRect(), l = getComputedStyle(this).getPropertyValue("--lib-comp-text-field-outlined-notch-pad").trim(), d = parseFloat(l), h = Number.isFinite(d) && d >= 0 ? d : 4, u = a.width, b = a.height, v = getComputedStyle(this).getPropertyValue("--lib-comp-text-field-radius").trim(), g = parseFloat(v), c = Number.isFinite(g) && g >= 0 ? g : 4, f = Math.max(0, o.width), x = (o.left + o.right) / 2 - a.left, y = x - f / 2, w = u - (x + f / 2), E = f + 2 * Math.max(0, Math.min(h, y, w)), F = Math.max(0, x - E / 2), z = Math.min(u, x + E / 2), A = Math.max(0, Math.round(F)), k = Math.max(0, Math.round(u - z));
      this._field.style.setProperty("--lib-outlined-tstart", `${A}px`), this._field.style.setProperty("--lib-outlined-tend", `${k}px`);
      const D = c, R = Math.max(c, u - c), j = Math.min(Math.max(A, D), R), Y = Math.max(Math.min(u - k, R), D), O = [];
      j > D && O.push(`M ${D} 0 H ${j}`), Y < R && O.push(`M ${Y} 0 H ${R}`), O.push(`M ${R} 0`, `Q ${u} 0 ${u} ${c}`, `V ${Math.max(c, b - c)}`, `Q ${u} ${b} ${Math.max(c, u - c)} ${b}`, `H ${c}`, `Q 0 ${b} 0 ${Math.max(c, b - c)}`, `V ${c}`, `Q 0 0 ${c} 0`), this._outlinedPath.setAttribute("d", O.join(" "));
    };
    requestAnimationFrame(n), requestAnimationFrame(() => {
      requestAnimationFrame(n);
    });
  }
  _syncSupportLine() {
    const e = this.hasAttribute("error"), t = !(this._input?.validity.valid ?? !0), r = e || t, i = this.getAttribute("supporting-text") ?? "", n = this.getAttribute("error-text") ?? "", a = this._input?.validationMessage ?? "", o = r ? n || a : i;
    this._supportText.textContent = o, this._supportText.setAttribute("aria-live", r ? "assertive" : "polite"), this._field.classList.toggle("is-error", r), this._input.setAttribute("aria-invalid", r ? "true" : "false"), this._supportText.parentElement?.classList.toggle("is-error", r);
    const l = this._input?.getAttribute("maxlength");
    if (l && /^\d+$/.test(l)) {
      const d = this._input?.value.length ?? 0;
      this._counter.textContent = `${d}/${l}`;
    } else this._counter.textContent = "";
  }
  _dispatchNativeClone(e) {
    const t = new Event(e, {
      bubbles: !0,
      composed: !0
    });
    this.dispatchEvent(t);
  }
  _upgradeValueProp() {
    if (Object.prototype.hasOwnProperty.call(this, "value")) {
      const e = this.value;
      delete this.value, this.value = e;
    }
  }
}, ki = [
  [et("button"), jr],
  [et("button-icon"), Zr],
  [et("button-split"), ei],
  [et("button-group"), ai],
  [et("card"), ui],
  [et("navigation-card"), pi],
  [et("shape"), fi],
  [et("loading-indicator"), _i],
  [et("text-field"), Pi]
], Si = "#6750A4";
function ke(e) {
  return getComputedStyle(e).getPropertyValue("--md-sys-color-primary").trim().length > 0;
}
function Li() {
  const e = document.documentElement;
  ke(e) || Or({ hex: Si }).then((t) => {
    ke(e) || Nr(t, {
      target: e,
      dark: !1
    });
  }).catch(() => {
  });
}
function Bi() {
  Li();
  for (const [e, t] of ki) customElements.get(e) || customElements.define(e, t);
}
export {
  Ii as Announcer,
  nt as BaseComponent,
  jr as Button,
  ai as ButtonGroup,
  Zr as ButtonIcon,
  ei as ButtonSplit,
  ui as Card,
  qe as FOCUSABLE_SELECTOR,
  B as ICONS,
  st as ICON_PREFIX,
  Ei as LIB_PREFIX,
  _i as LoadingIndicator,
  pi as NavigationCard,
  zi as Ripple,
  fi as Shape,
  Pi as TextField,
  Nr as applyThemeTokens,
  Ye as countSpecialChars,
  Ti as createFocusTrap,
  Or as createTheme,
  Mi as cssVar,
  Mt as ensureIconSprite,
  ge as generatePassword,
  de as getFocusableElements,
  pt as iconHref,
  Di as initFocusVisible,
  Jt as isPasswordPolicyActive,
  Zt as readPasswordPolicyFromElement,
  Bi as registerElements,
  Z as setAriaProps,
  Ke as validatePasswordValue,
  Se as withLibClass,
  wt as withLibEvent,
  et as withLibPrefix
};
