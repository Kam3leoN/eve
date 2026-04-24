import { LIB_PREFIX } from '../../lib.config';
import { Shape } from './shape';

export type ContractStability = 'stable' | 'experimental' | 'deprecated';

export interface ShapeContractAttribute {
  name: string;
  type: 'string' | 'boolean';
  stability: ContractStability;
}

export const SHAPE_TAG_NAME = `${LIB_PREFIX}-shape`;

export const SHAPE_CONTRACT_ATTRIBUTES: readonly ShapeContractAttribute[] = Shape.observedAttributes.map((attrName) => ({
  name: attrName,
  type: 'string',
  stability: 'stable' as const,
}));

export const SHAPE_CONTRACT_EVENTS = [] as const;
export const SHAPE_CONTRACT_SLOTS = ['default'] as const;
export const SHAPE_CONTRACT_PARTS = ['control'] as const;
