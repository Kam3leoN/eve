/**
 * Configuration globale de la librairie.
 *
 * Toutes les conventions de nommage (custom elements, classes, variables CSS)
 * doivent dériver de ce préfixe.
 */
export const LIB_PREFIX = 'eve';

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
