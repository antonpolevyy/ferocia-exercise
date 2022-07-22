import { validateInput, calculateFinalBalance } from '../operations';

describe('operationsTest', () => {
  test('input validation', () => {
    const correctInput =  {
      startDeposit: 1000000,
      interestRate: 1.1,
      investmentTerm: 36,
      interestPaid: 'Monthly'
    };
    expect(validateInput(correctInput)).toBe(true);

    const wrongVelueInput = {
      ...correctInput,
      interestRate: '1.1'
    }
    expect(() => validateInput(wrongVelueInput)).toThrow();

    const incorrectInput = {
      ...correctInput,
      interestPaid: 'Daily'
    };
    expect(() => validateInput(incorrectInput)).toThrow();

    const { startDeposit, ...missingValueInput } = correctInput;
    expect(() => validateInput(startDeposit)).toThrow();
    expect(() => validateInput(missingValueInput)).toThrow();
  });

  test('balance calculation', () => {
    const input =  {
      startDeposit: 1000000,
      interestRate: 1.1,
      investmentTerm: 36,
      interestPaid: 'At Maturity'
    };
    expect(calculateFinalBalance(input)).toBe(1033000);
  });
});
