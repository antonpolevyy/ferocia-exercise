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

/* Transform interestPaid from a word term to a number of months */
const interestPaidToMonths = (interestPaid, investmentTerm = 12) => {
  switch(interestPaid){
  case 'Monthly':
    return 1;
  case 'Quarterly':
    return 3;
  case 'Annually':
    return 12;
  case 'At Maturity':
    return investmentTerm;
  }
};

const calculateFinalBalance = (input) => {
  const { startDeposit, interestRate, investmentTerm, interestPaid} = input;
  /* interestRate specified in per cents, so it has to be devided by 100 */
  const rate = interestRate / 100;

  /* current sum */
  let balance = startDeposit;
  /* how many months within one re-investment period */
  const tMonths = interestPaidToMonths(interestPaid, investmentTerm);
  /* how many times per year user gets interest payment */
  const timesPerYear = 12 / tMonths;

  /* iterate as many times as timesPerYear fits into investmentTerm */
  /* then take the remainder and calculate interest without re-investment */
  let quotient = Math.floor(investmentTerm/tMonths);
  const remainder = investmentTerm % tMonths;
  let interestPerYear, interestPerPeriod;
  while (quotient > 0) {
    /* annual interest */
    interestPerYear = balance * rate;
    /* periodic interest (end of month / quarter / year) */
    interestPerPeriod = Math.round(interestPerYear / timesPerYear);
    balance += interestPerPeriod;
    quotient -= 1;
  }
  /* if there are months left before the next re-investment then calculate their interest too */
  const remaindingInterest = Math.round(interestPerPeriod * remainder / tMonths);
  balance += remaindingInterest;

  /* (Optional) round the cents of the final sum */
  balance = Math.round(balance / 100) * 100;

  return balance;
};

module.exports = {
  getInputFromJson,
  validateInput,
  calculateFinalBalance
};
