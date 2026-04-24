import { describe, expect, it } from 'vitest';
import { Shape } from './shape';
import { SHAPE_CONTRACT_ATTRIBUTES } from './shape.contract';

describe('shape.contract', () => {
  it('aligne contrat et observedAttributes', () => {
    const observed = [...Shape.observedAttributes].sort();
    const contracted = [...SHAPE_CONTRACT_ATTRIBUTES.map((a) => a.name)].sort();
    expect(observed).toEqual(contracted);
  });
});
