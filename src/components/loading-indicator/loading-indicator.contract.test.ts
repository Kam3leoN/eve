import { describe, expect, it } from 'vitest';
import { LoadingIndicator } from './loading-indicator';
import { LOADING_INDICATOR_CONTRACT_ATTRIBUTES } from './loading-indicator.contract';

describe('loading-indicator.contract', () => {
  it('aligne contrat et observedAttributes', () => {
    const observed = [...LoadingIndicator.observedAttributes].sort();
    const contracted = [...LOADING_INDICATOR_CONTRACT_ATTRIBUTES.map((a) => a.name)].sort();
    expect(observed).toEqual(contracted);
  });
});
