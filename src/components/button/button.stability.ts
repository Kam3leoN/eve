import type { ContractStability } from './button.contract';

export const BUTTON_STABILITY = {
  component: 'stable' as ContractStability,
  attributes: {
    variant: 'stable',
    size: 'stable',
    shape: 'stable',
    toggle: 'stable',
    pressed: 'stable',
    'shape-toggle-swap': 'experimental',
    disabled: 'stable',
    'soft-disabled': 'stable',
    type: 'stable',
    href: 'stable',
    target: 'stable',
    'icon-leading': 'stable',
    'icon-trailing': 'stable',
    'aria-label': 'stable',
    name: 'stable',
    value: 'stable',
    form: 'stable',
    dir: 'stable',
  } as Record<string, ContractStability>,
  events: {
    'lib-change': 'stable',
  } as Record<string, ContractStability>,
} as const;
