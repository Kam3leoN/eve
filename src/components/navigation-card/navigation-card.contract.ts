import { LIB_PREFIX } from '../../lib.config';
import { NavigationCard } from './navigation-card';

export type ContractStability = 'stable' | 'experimental' | 'deprecated';

export interface NavigationCardContractAttribute {
  name: string;
  type: 'string' | 'boolean';
  stability: ContractStability;
}

export const NAVIGATION_CARD_TAG_NAME = `${LIB_PREFIX}-navigation-card`;

export const NAVIGATION_CARD_CONTRACT_ATTRIBUTES: readonly NavigationCardContractAttribute[] = NavigationCard.observedAttributes.map((attrName) => ({
  name: attrName,
  type: 'string',
  stability: 'stable' as const,
}));

export const NAVIGATION_CARD_CONTRACT_EVENTS = [] as const;
export const NAVIGATION_CARD_CONTRACT_SLOTS = ['default'] as const;
export const NAVIGATION_CARD_CONTRACT_PARTS = ['control'] as const;
