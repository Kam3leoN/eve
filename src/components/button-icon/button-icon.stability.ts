import type { ContractStability } from './button-icon.contract';

export const BUTTON_ICON_STABILITY = {
  component: 'stable' as ContractStability,
  attributes: {
    'variant': 'stable',
    'size': 'stable',
    'width': 'stable',
    'shape': 'stable',
    'disabled': 'stable',
    'toggle': 'stable',
    'pressed': 'stable',
    'icon': 'stable',
    'aria-label': 'stable',
  } as Record<string, ContractStability>,
  events: {} as Record<string, ContractStability>,
} as const;
