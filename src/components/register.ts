import { withLibPrefix } from '../lib.config.js';
import { Button } from './button/button.js';

const registry: [string, CustomElementConstructor][] = [[withLibPrefix('button'), Button]];

/**
 * Enregistre les custom elements Eve (sans effet si déjà défini).
 */
export function registerEveElements(): void {
  for (const [tag, ctor] of registry) {
    if (!customElements.get(tag)) {
      customElements.define(tag, ctor);
    }
  }
}
