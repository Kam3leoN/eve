import { LIB_PREFIX } from '../../lib.config';

/**
 * Identifiants stables des symboles du sprite (préfixe {@link ICON_PREFIX}).
 */
export const ICON_PREFIX = `${LIB_PREFIX}-icon`;

export const ICONS = {
  check: `${ICON_PREFIX}-check`,
  close: `${ICON_PREFIX}-close`,
  menu: `${ICON_PREFIX}-menu`,
  chevronRight: `${ICON_PREFIX}-chevron-right`,
  visibility: `${ICON_PREFIX}-visibility`,
  visibilityOff: `${ICON_PREFIX}-visibility-off`,
  refresh: `${ICON_PREFIX}-refresh`,
} as const;

export type IconId = (typeof ICONS)[keyof typeof ICONS];
