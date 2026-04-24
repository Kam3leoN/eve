import { describe, expect, it } from 'vitest';
import { Card } from './card';
import { CARD_CONTRACT_ATTRIBUTES } from './card.contract';

describe('card.contract', () => {
  it('aligne contrat et observedAttributes', () => {
    const observed = [...Card.observedAttributes].sort();
    const contracted = [...CARD_CONTRACT_ATTRIBUTES.map((a) => a.name)].sort();
    expect(observed).toEqual(contracted);
  });
});
