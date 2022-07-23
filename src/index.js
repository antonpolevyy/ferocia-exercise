import { getInputFromJson, validateInput, calculateFinalBalance } from './deposit/operations';

/* take first argument from cli to get the json path 
  or use default value */
const jsonPath = process.argv[2] || '../../testData/deposit-input.json';

const inputData = getInputFromJson(jsonPath);

validateInput(inputData);

const finalBalance = calculateFinalBalance(inputData);
console.log(finalBalance);