import type { ContractStability } from './shape.contract';

export const SHAPE_STABILITY = {
  component: 'stable' as ContractStability,
  attributes: {
    'name': 'stable',
    'aria-label': 'stable',
    'color': 'stable',
    'rgba': 'stable',
    'motion': 'stable',
    'recoil': 'stable',
  } as Record<string, ContractStability>,
  events: {} as Record<string, ContractStability>,
} as const;
