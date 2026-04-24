import { describe, expect, it } from 'vitest';
import { TextField } from './text-field';
import { TEXT_FIELD_CONTRACT_ATTRIBUTES } from './text-field.contract';

describe('text-field.contract', () => {
  it('aligne contrat et observedAttributes', () => {
    const observed = [...TextField.observedAttributes].sort();
    const contracted = [...TEXT_FIELD_CONTRACT_ATTRIBUTES.map((a) => a.name)].sort();
    expect(observed).toEqual(contracted);
  });
});
