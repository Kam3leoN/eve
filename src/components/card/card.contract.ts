import { LIB_PREFIX } from '../../lib.config';
import { Card } from './card';

export type ContractStability = 'stable' | 'experimental' | 'deprecated';

export interface CardContractAttribute {
  name: string;
  type: 'string' | 'boolean';
  stability: ContractStability;
}

export const CARD_TAG_NAME = `${LIB_PREFIX}-card`;

export const CARD_CONTRACT_ATTRIBUTES: readonly CardContractAttribute[] = Card.observedAttributes.map((attrName) => ({
  name: attrName,
  type: 'string',
  stability: 'stable' as const,
}));

export const CARD_CONTRACT_EVENTS = [] as const;
export const CARD_CONTRACT_SLOTS = ['default'] as const;
export const CARD_CONTRACT_PARTS = ['control'] as const;
