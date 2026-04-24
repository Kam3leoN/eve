import type { ContractStability } from './button-split.contract';

export const BUTTON_SPLIT_STABILITY = {
  component: 'stable' as ContractStability,
  attributes: {
    'variant': 'stable',
    'size': 'stable',
    'disabled': 'stable',
    'aria-label': 'stable',
    'secondary-aria-label': 'stable',
    'icon-leading': 'stable',
    'selected-trailing': 'stable',
    'equal-parts': 'stable',
  } as Record<string, ContractStability>,
  events: {} as Record<string, ContractStability>,
} as const;
