import { describe, expect, it } from 'vitest';
import { ButtonSplit } from './button-split';
import { BUTTON_SPLIT_CONTRACT_ATTRIBUTES } from './button-split.contract';

describe('button-split.contract', () => {
  it('aligne contrat et observedAttributes', () => {
    const observed = [...ButtonSplit.observedAttributes].sort();
    const contracted = [...BUTTON_SPLIT_CONTRACT_ATTRIBUTES.map((a) => a.name)].sort();
    expect(observed).toEqual(contracted);
  });
});
