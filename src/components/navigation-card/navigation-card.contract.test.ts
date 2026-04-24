import { describe, expect, it } from 'vitest';
import { NavigationCard } from './navigation-card';
import { NAVIGATION_CARD_CONTRACT_ATTRIBUTES } from './navigation-card.contract';

describe('navigation-card.contract', () => {
  it('aligne contrat et observedAttributes', () => {
    const observed = [...NavigationCard.observedAttributes].sort();
    const contracted = [...NAVIGATION_CARD_CONTRACT_ATTRIBUTES.map((a) => a.name)].sort();
    expect(observed).toEqual(contracted);
  });
});
