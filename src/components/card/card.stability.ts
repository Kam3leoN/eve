import type { ContractStability } from './card.contract';

export const CARD_STABILITY = {
  component: 'stable' as ContractStability,
  attributes: {
    'variant': 'stable',
    'orientation': 'stable',
    'layout': 'stable',
    'interactive': 'stable',
    'href': 'stable',
    'expandable': 'stable',
    'expanded': 'stable',
    'swipe': 'stable',
    'pickup-move': 'stable',
    'media-first': 'stable',
    'media-bleed': 'stable',
  } as Record<string, ContractStability>,
  events: {} as Record<string, ContractStability>,
} as const;
