import type { ContractStability } from './loading-indicator.contract';

export const LOADING_INDICATOR_STABILITY = {
  component: 'stable' as ContractStability,
  attributes: {
    'aria-label': 'stable',
    'paused': 'stable',
    'variant': 'stable',
    'dir': 'stable',
    'duration': 'stable',
  } as Record<string, ContractStability>,
  events: {} as Record<string, ContractStability>,
} as const;
