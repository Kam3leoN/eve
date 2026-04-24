import { LIB_PREFIX } from '../../lib.config';
import { ButtonGroup } from './button-group';

export type ContractStability = 'stable' | 'experimental' | 'deprecated';

export interface ButtonGroupContractAttribute {
  name: string;
  type: 'string' | 'boolean';
  stability: ContractStability;
}

export const BUTTON_GROUP_TAG_NAME = `${LIB_PREFIX}-button-group`;

export const BUTTON_GROUP_CONTRACT_ATTRIBUTES: readonly ButtonGroupContractAttribute[] = ButtonGroup.observedAttributes.map((attrName) => ({
  name: attrName,
  type: 'string',
  stability: 'stable' as const,
}));

export const BUTTON_GROUP_CONTRACT_EVENTS = [] as const;
export const BUTTON_GROUP_CONTRACT_SLOTS = ['default'] as const;
export const BUTTON_GROUP_CONTRACT_PARTS = ['control'] as const;
