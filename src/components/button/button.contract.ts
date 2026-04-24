import { LIB_PREFIX } from '../../lib.config';

export type ContractStability = 'stable' | 'experimental' | 'deprecated';

export type ButtonVariant = 'elevated' | 'filled' | 'tonal' | 'outlined' | 'text';
export type ButtonSize = 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';
export type ButtonShape = 'round' | 'square';
export type ButtonIcon = 'check' | 'close' | 'menu' | 'chevron-right';

export interface ButtonContractAttribute {
  name: string;
  type: 'string' | 'boolean';
  values?: readonly string[];
  default?: string | boolean;
  stability: ContractStability;
}

export interface ButtonContractEvent {
  name: string;
  detail?: string;
  stability: ContractStability;
}

export const BUTTON_TAG_NAME = `${LIB_PREFIX}-button`;
export const BUTTON_CHANGE_EVENT = `${LIB_PREFIX}-change`;

export const BUTTON_CONTRACT_ATTRIBUTES: readonly ButtonContractAttribute[] = [
  { name: 'variant', type: 'string', values: ['elevated', 'filled', 'tonal', 'outlined', 'text'], default: 'filled', stability: 'stable' },
  { name: 'size', type: 'string', values: ['extra-small', 'small', 'medium', 'large', 'extra-large'], default: 'small', stability: 'stable' },
  { name: 'shape', type: 'string', values: ['round', 'square'], default: 'round', stability: 'stable' },
  { name: 'toggle', type: 'boolean', default: false, stability: 'stable' },
  { name: 'pressed', type: 'boolean', default: false, stability: 'stable' },
  { name: 'shape-toggle-swap', type: 'boolean', default: false, stability: 'experimental' },
  { name: 'disabled', type: 'boolean', default: false, stability: 'stable' },
  { name: 'soft-disabled', type: 'boolean', default: false, stability: 'stable' },
  { name: 'type', type: 'string', values: ['button', 'submit', 'reset'], default: 'button', stability: 'stable' },
  { name: 'href', type: 'string', stability: 'stable' },
  { name: 'target', type: 'string', stability: 'stable' },
  { name: 'icon-leading', type: 'string', values: ['check', 'close', 'menu', 'chevron-right'], stability: 'stable' },
  { name: 'icon-trailing', type: 'string', values: ['check', 'close', 'menu', 'chevron-right'], stability: 'stable' },
  { name: 'aria-label', type: 'string', stability: 'stable' },
  { name: 'name', type: 'string', stability: 'stable' },
  { name: 'value', type: 'string', stability: 'stable' },
  { name: 'form', type: 'string', stability: 'stable' },
  { name: 'dir', type: 'string', values: ['ltr', 'rtl'], stability: 'stable' },
] as const;

export const BUTTON_CONTRACT_EVENTS: readonly ButtonContractEvent[] = [
  {
    name: BUTTON_CHANGE_EVENT,
    detail: '{ pressed: boolean }',
    stability: 'stable',
  },
] as const;

export const BUTTON_CONTRACT_SLOTS = ['leading', 'default', 'trailing'] as const;
export const BUTTON_CONTRACT_PARTS = ['control', 'icon-leading', 'icon-trailing'] as const;

export const BUTTON_A11Y_REQUIREMENTS = [
  'aria-label relaye vers le controle interne',
  'aria-pressed present en mode toggle (ou pressed force)',
  'aria-disabled + tabIndex selon disabled/soft-disabled',
] as const;
