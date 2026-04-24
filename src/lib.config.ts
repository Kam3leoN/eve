/**
 * Configuration globale de la librairie.
 *
 * Toutes les conventions de nommage (custom elements, classes, variables CSS)
 * doivent dériver de ce préfixe.
 */
export const LIB_PREFIX = 'lib';

/**
 * Construit un nom de custom element avec préfixe.
 */
export function withLibPrefix(name: string): string {
  return `${LIB_PREFIX}-${name}`;
}

/**
 * Construit une variable CSS préfixée.
 */
export function cssVar(name: string): string {
  return `--${LIB_PREFIX}-${name}`;
}

/**
 * Construit une classe CSS préfixée.
 */
export function withLibClass(name: string): string {
  return `${LIB_PREFIX}-${name}`;
}

/**
 * Construit un nom d'événement DOM préfixé.
 */
export function withLibEvent(name: string): string {
  return `${LIB_PREFIX}-${name}`;
}
