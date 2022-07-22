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
  return false;
};

const calculateFinalBalance = (input) => {
  return 0;
};

module.exports = {
  getInputFromJson,
  validateInput,
  calculateFinalBalance
};
