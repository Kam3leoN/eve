import { describe, expect, it } from 'vitest';
import { ButtonGroup } from './button-group';
import { BUTTON_GROUP_CONTRACT_ATTRIBUTES } from './button-group.contract';

describe('button-group.contract', () => {
  it('aligne contrat et observedAttributes', () => {
    const observed = [...ButtonGroup.observedAttributes].sort();
    const contracted = [...BUTTON_GROUP_CONTRACT_ATTRIBUTES.map((a) => a.name)].sort();
    expect(observed).toEqual(contracted);
  });
});
