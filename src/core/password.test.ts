import { describe, expect, it } from 'vitest';
import { generatePassword, isPasswordPolicyActive, validatePasswordValue } from './password';

describe('password helpers', () => {
  it('valide longueur et classes de caractères', () => {
    const policy = {
      minLength: 4,
      minLowercase: 1,
      minUppercase: 1,
      minDigit: 1,
      minSpecial: 1,
    };
    expect(validatePasswordValue('ab', policy).valid).toBe(false);
    expect(validatePasswordValue('Ab1!', policy).valid).toBe(true);
  });

  it('génère un mot de passe qui respecte la politique', () => {
    const policy = {
      minLength: 10,
      minLowercase: 2,
      minUppercase: 1,
      minDigit: 2,
      minSpecial: 1,
    };
    const s = generatePassword(policy);
    expect(s.length).toBeGreaterThanOrEqual(10);
    expect(validatePasswordValue(s, policy).valid).toBe(true);
  });

  it('isPasswordPolicyActive', () => {
    expect(
      isPasswordPolicyActive({
        minLength: 0,
        minLowercase: 0,
        minUppercase: 0,
        minDigit: 0,
        minSpecial: 0,
      }),
    ).toBe(false);
    expect(
      isPasswordPolicyActive({
        minLength: 8,
        minLowercase: 0,
        minUppercase: 0,
        minDigit: 0,
        minSpecial: 0,
      }),
    ).toBe(true);
  });
});
