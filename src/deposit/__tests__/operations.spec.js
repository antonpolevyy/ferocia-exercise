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
    const input = {
      startDeposit: 1000000,
      interestRate: 1.1,
      investmentTerm: 36,
      interestPaid: 'Monthly'
    };
    expect(calculateFinalBalance(input)).toBe(1033500);

    const input2 = {
      startDeposit: 1000000,
      interestRate: 2.2,
      investmentTerm: 36,
      interestPaid: 'Quarterly'
    };
    expect(calculateFinalBalance(input2)).toBe(1068000);

    const input3 = {
      startDeposit: 1000000,
      interestRate: 3,
      investmentTerm: 30,
      interestPaid: 'At Maturity'
    };
    expect(calculateFinalBalance(input3)).toBe(1075000);

    const input4 = {
      startDeposit: 1000000,
      interestRate: 3,
      investmentTerm: 37,
      interestPaid: 'Annually'
    };
    expect(calculateFinalBalance(input4)).toBe(1095400);

    const input5 = {
      startDeposit: 1000000,
      interestRate: 4.5,
      investmentTerm: 37,
      interestPaid: 'Quarterly'
    };
    expect(calculateFinalBalance(input5)).toBe(1147900);
  });
});
