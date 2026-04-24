/**
 * Aide mots de passe : politique (longueur, minuscule, majuscule, chiffre, spécial),
 * validation, génération aléatoire (crypto si disponible).
 */

export type PasswordPolicy = {
  /** Longueur minimale totale (0 = non imposé). */
  minLength: number;
  minLowercase: number;
  minUppercase: number;
  minDigit: number;
  minSpecial: number;
};

const DEFAULT_EMPTY: PasswordPolicy = {
  minLength: 0,
  minLowercase: 0,
  minUppercase: 0,
  minDigit: 0,
  minSpecial: 0,
};

const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGIT = '0123456789';
const SPECIAL = '!@#$%^&*()-_=+[]{}:,.?';

function parseNonNegInt(v: string | null | undefined): number {
  if (v == null || v === '') return 0;
  const n = parseInt(v, 10);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

/**
 * Construit une politique à partir d’attributs du host, ex.:
 * `password-min-length="8"`, `password-min-lower="1"`, etc.
 * Des valeurs absentes ou 0 = contrainte désactivée.
 */
export function readPasswordPolicyFromElement(el: Element): PasswordPolicy {
  return {
    minLength: parseNonNegInt(el.getAttribute('password-min-length')),
    minLowercase: parseNonNegInt(el.getAttribute('password-min-lower')),
    minUppercase: parseNonNegInt(el.getAttribute('password-min-upper')),
    minDigit: parseNonNegInt(el.getAttribute('password-min-digit')),
    minSpecial: parseNonNegInt(el.getAttribute('password-min-special')),
  };
}

/**
 * Vrai s’il y a au moins une contrainte de politique.
 */
export function isPasswordPolicyActive(policy: PasswordPolicy): boolean {
  return (
    policy.minLength > 0 ||
    policy.minLowercase > 0 ||
    policy.minUppercase > 0 ||
    policy.minDigit > 0 ||
    policy.minSpecial > 0
  );
}

function countClass(s: string, re: RegExp): number {
  const m = s.match(re);
  return m ? m.length : 0;
}

/**
 * Nombre de caractères “spéciaux” (hors a–z, A–Z, 0–9).
 */
export function countSpecialChars(s: string): number {
  return countClass(s, /[^A-Za-z0-9]/g);
}

export type PasswordValidationResult = {
  valid: true;
} | { valid: false; message: string; code: 'length' | 'lower' | 'upper' | 'digit' | 'special' };

/**
 * Vérifie le mot de passe par rapport à la politique. Messages d’erreur en français.
 */
export function validatePasswordValue(value: string, policy: PasswordPolicy): PasswordValidationResult {
  const p = { ...DEFAULT_EMPTY, ...policy };
  if (!isPasswordPolicyActive(p)) return { valid: true };

  const n = value.length;
  const lower = countClass(value, /[a-z]/g);
  const upper = countClass(value, /[A-Z]/g);
  const digit = countClass(value, /[0-9]/g);
  const special = countSpecialChars(value);

  if (p.minLength > 0 && n < p.minLength) {
    return {
      valid: false,
      code: 'length',
      message: `Au moins ${p.minLength} caractère(s) requis (actuellement ${n}).`,
    };
  }
  if (p.minLowercase > 0 && lower < p.minLowercase) {
    return {
      valid: false,
      code: 'lower',
      message: `Au moins ${p.minLowercase} minuscule(s) requise(s).`,
    };
  }
  if (p.minUppercase > 0 && upper < p.minUppercase) {
    return {
      valid: false,
      code: 'upper',
      message: `Au moins ${p.minUppercase} majuscule(s) requise(s).`,
    };
  }
  if (p.minDigit > 0 && digit < p.minDigit) {
    return {
      valid: false,
      code: 'digit',
      message: `Au moins ${p.minDigit} chiffre(s) requis.`,
    };
  }
  if (p.minSpecial > 0 && special < p.minSpecial) {
    return {
      valid: false,
      code: 'special',
      message: `Au moins ${p.minSpecial} caractère(s) spécial(aux) requis.`,
    };
  }
  return { valid: true };
}

function pickChar(pool: string, random: () => number): string {
  const i = Math.floor(random() * pool.length);
  return pool[i] ?? pool[0] ?? 'a';
}

function secureRandomInt(max: number): number {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const u = new Uint32Array(1);
    crypto.getRandomValues(u);
    return u[0]! % max;
  }
  return Math.floor(Math.random() * max);
}

/**
 * Mélange Fisher–Yates (entiers via crypto si dispo).
 */
function shuffleInPlace(a: string[]): void {
  for (let i = a.length - 1; i > 0; i--) {
    const j = secureRandomInt(i + 1);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
}

/**
 * Génère un mot de passe aléatoire respectant la politique (dans la mesure du possible).
 */
export function generatePassword(policy: PasswordPolicy): string {
  const p: PasswordPolicy = { ...DEFAULT_EMPTY, ...policy };
  const needLower = p.minLowercase;
  const needUpper = p.minUppercase;
  const needDigit = p.minDigit;
  const needSpec = p.minSpecial;
  const allPools = LOWER + UPPER + DIGIT + SPECIAL;
  const rand = () => {
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const u = new Uint32Array(1);
      crypto.getRandomValues(u);
      return (u[0]! + 0.5) / (0xffffffff + 1);
    }
    return Math.random();
  };

  const parts: string[] = [];
  for (let k = 0; k < needLower; k++) parts.push(pickChar(LOWER, rand));
  for (let k = 0; k < needUpper; k++) parts.push(pickChar(UPPER, rand));
  for (let k = 0; k < needDigit; k++) parts.push(pickChar(DIGIT, rand));
  for (let k = 0; k < needSpec; k++) parts.push(pickChar(SPECIAL, rand));

  let minLen = Math.max(p.minLength, parts.length, needLower + needUpper + needDigit + needSpec);
  while (parts.length < minLen) {
    parts.push(pickChar(allPools, rand));
  }

  shuffleInPlace(parts);
  return parts.join('');
}
