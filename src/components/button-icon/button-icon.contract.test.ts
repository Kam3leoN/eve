import { describe, expect, it } from 'vitest';
import { ButtonIcon } from './button-icon';
import { BUTTON_ICON_CONTRACT_ATTRIBUTES } from './button-icon.contract';

describe('button-icon.contract', () => {
  it('aligne contrat et observedAttributes', () => {
    const observed = [...ButtonIcon.observedAttributes].sort();
    const contracted = [...BUTTON_ICON_CONTRACT_ATTRIBUTES.map((a) => a.name)].sort();
    expect(observed).toEqual(contracted);
  });
});
