import type { ContractStability } from './text-field.contract';

export const TEXT_FIELD_STABILITY = {
  component: 'stable' as ContractStability,
  attributes: {
    'variant': 'stable',
    'label': 'stable',
    'value': 'stable',
    'supporting-text': 'stable',
    'error-text': 'stable',
    'error': 'stable',
    'prefix-text': 'stable',
    'suffix-text': 'stable',
    'icon-leading': 'stable',
    'icon-trailing': 'stable',
    'text-align': 'stable',
    'aria-label': 'stable',
    'dir': 'stable',
    'password-toggle': 'stable',
    'password-generate': 'stable',
    'password-min-length': 'stable',
    'password-min-lower': 'stable',
    'password-min-upper': 'stable',
    'password-min-digit': 'stable',
    'password-min-special': 'stable',
  } as Record<string, ContractStability>,
  events: {} as Record<string, ContractStability>,
} as const;
