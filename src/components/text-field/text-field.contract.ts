import { LIB_PREFIX } from '../../lib.config';
import { TextField } from './text-field';

export type ContractStability = 'stable' | 'experimental' | 'deprecated';

export interface TextFieldContractAttribute {
  name: string;
  type: 'string' | 'boolean';
  stability: ContractStability;
}

export const TEXT_FIELD_TAG_NAME = `${LIB_PREFIX}-text-field`;

export const TEXT_FIELD_CONTRACT_ATTRIBUTES: readonly TextFieldContractAttribute[] = TextField.observedAttributes.map((attrName) => ({
  name: attrName,
  type: 'string',
  stability: 'stable' as const,
}));

export const TEXT_FIELD_CONTRACT_EVENTS = [] as const;
export const TEXT_FIELD_CONTRACT_SLOTS = ['default'] as const;
export const TEXT_FIELD_CONTRACT_PARTS = ['control'] as const;
