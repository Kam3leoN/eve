import { describe, expect, it } from 'vitest';
import { Button } from './button';
import {
  BUTTON_CHANGE_EVENT,
  BUTTON_CONTRACT_ATTRIBUTES,
  BUTTON_CONTRACT_EVENTS,
  BUTTON_CONTRACT_PARTS,
  BUTTON_CONTRACT_SLOTS,
} from './button.contract';

describe('button.contract', () => {
  it('aligne les attributs du contrat avec observedAttributes', () => {
    const observed = [...Button.observedAttributes].sort();
    const contracted = [...BUTTON_CONTRACT_ATTRIBUTES.map((a) => a.name)].sort();
    expect(observed).toEqual(contracted);
  });

  it('declare les slots et parts attendus', () => {
    expect(BUTTON_CONTRACT_SLOTS).toEqual(['leading', 'default', 'trailing']);
    expect(BUTTON_CONTRACT_PARTS).toEqual(['control', 'icon-leading', 'icon-trailing']);
  });

  it('declare l evenement lib-change avec detail pressed', () => {
    expect(BUTTON_CHANGE_EVENT).toBe('lib-change');
    expect(BUTTON_CONTRACT_EVENTS).toEqual([
      { name: 'lib-change', detail: '{ pressed: boolean }', stability: 'stable' },
    ]);
  });
});
