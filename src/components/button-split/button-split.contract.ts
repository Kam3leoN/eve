import { LIB_PREFIX } from '../../lib.config';
import { ButtonSplit } from './button-split';

export type ContractStability = 'stable' | 'experimental' | 'deprecated';

export interface ButtonSplitContractAttribute {
  name: string;
  type: 'string' | 'boolean';
  stability: ContractStability;
}

export const BUTTON_SPLIT_TAG_NAME = `${LIB_PREFIX}-button-split`;

export const BUTTON_SPLIT_CONTRACT_ATTRIBUTES: readonly ButtonSplitContractAttribute[] = ButtonSplit.observedAttributes.map((attrName) => ({
  name: attrName,
  type: 'string',
  stability: 'stable' as const,
}));

export const BUTTON_SPLIT_CONTRACT_EVENTS = [] as const;
export const BUTTON_SPLIT_CONTRACT_SLOTS = ['default'] as const;
export const BUTTON_SPLIT_CONTRACT_PARTS = ['control'] as const;
