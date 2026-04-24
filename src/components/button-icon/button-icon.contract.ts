import { LIB_PREFIX } from '../../lib.config';
import { ButtonIcon } from './button-icon';

export type ContractStability = 'stable' | 'experimental' | 'deprecated';

export interface ButtonIconContractAttribute {
  name: string;
  type: 'string' | 'boolean';
  stability: ContractStability;
}

export const BUTTON_ICON_TAG_NAME = `${LIB_PREFIX}-button-icon`;

export const BUTTON_ICON_CONTRACT_ATTRIBUTES: readonly ButtonIconContractAttribute[] = ButtonIcon.observedAttributes.map((attrName) => ({
  name: attrName,
  type: 'string',
  stability: 'stable' as const,
}));

export const BUTTON_ICON_CONTRACT_EVENTS = [] as const;
export const BUTTON_ICON_CONTRACT_SLOTS = ['default'] as const;
export const BUTTON_ICON_CONTRACT_PARTS = ['control'] as const;
