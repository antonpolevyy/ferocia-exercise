import { VALID_INTEREST_PAYMENTS } from '../constants/interestPaymentOptions';

const getInputFromJson = (jsonFile) => {
  const rawData = require(jsonFile);
  return {
    startDeposit: rawData['start-deposit'],
    interestRate: rawData['interest-rate'],
    investmentTerm: rawData['investment-term'],
    interestPaid: rawData['interest-paid']
  };
};

const validateInput = (input) => {
  /* Make sure that input has all attrubutes from VALID_KEYS */
  const VALID_KEYS = ['startDeposit', 'interestRate', 'investmentTerm', 'interestPaid'];
  const keys = Object.keys(input);
  const absentKeys = VALID_KEYS.filter(name => !keys.includes(name));
  if (absentKeys.length > 0) throw new Error(`All deposit input values have to be provided. Next is missing from input: ${absentKeys}`);

  /* Make sure that first 3 attributes have numeric values */
  const { interestPaid, ...numericAttributes } = input;
  for (let key in numericAttributes) {
    if (typeof numericAttributes[key] !== 'number') throw new Error(`Value of "${key}" has to be numeric.`);
  }

  /* Make sure that interestPaid has valid value */
  if (!VALID_INTEREST_PAYMENTS.includes(interestPaid)) throw new Error('Invalid "interest-paid" value.');

  return true;
};

const calculateFinalBalance = (input) => {
  return 0;
};

module.exports = {
  getInputFromJson,
  validateInput,
  calculateFinalBalance
};
