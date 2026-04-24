import type { ContractStability } from './navigation-card.contract';

export const NAVIGATION_CARD_STABILITY = {
  component: 'stable' as ContractStability,
  attributes: {
    'title': 'stable',
    'subtitle': 'stable',
    'href': 'stable',
    'icon-leading': 'stable',
    'icon-trailing': 'stable',
  } as Record<string, ContractStability>,
  events: {} as Record<string, ContractStability>,
} as const;
