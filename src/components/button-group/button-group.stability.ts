import type { ContractStability } from './button-group.contract';

export const BUTTON_GROUP_STABILITY = {
  component: 'stable' as ContractStability,
  attributes: {
    'variant': 'stable',
    'size': 'stable',
    'selection-mode': 'stable',
  } as Record<string, ContractStability>,
  events: {} as Record<string, ContractStability>,
} as const;
