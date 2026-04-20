import { LIB_PREFIX } from '../../lib.config.js';

/**
 * Identifiants stables des symboles du sprite (préfixe {@link EVE_ICON_PREFIX}).
 */
export const EVE_ICON_PREFIX = `${LIB_PREFIX}-icon`;

export const EVE_ICONS = {
  check: `${EVE_ICON_PREFIX}-check`,
  close: `${EVE_ICON_PREFIX}-close`,
  menu: `${EVE_ICON_PREFIX}-menu`,
  chevronRight: `${EVE_ICON_PREFIX}-chevron-right`,
} as const;

export type EveIconId = (typeof EVE_ICONS)[keyof typeof EVE_ICONS];
