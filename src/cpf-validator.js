const CPF_VALID_LENGTH = 11;

function isCpfDataTypeValid(cpf) {
  return typeof cpf === 'string';
}

function isCpfLengthValid(cpf) {
  return cpf.length === 11;
}

function normalizeCpf(cpf) {
  return cpf
    .replace(/\D/gu, '')
    .split('')
    .map((digit) => parseInt(digit, 10));
}

function isAllDigitsEquals(cpf) {
  return cpf.every((digit) => digit === cpf[0]);
}

function generateDigitsFactors(cpfDigits, firstFactor) {
  return cpfDigits.map((_, index) => firstFactor - index);
}

function calculateCheckerDigit(cpfDigits, firstFactor) {
  const factors = generateDigitsFactors(cpfDigits, firstFactor);

  const digitsSum = cpfDigits.reduce(
    (_digitsSum, digit, index) => _digitsSum + (digit * factors[index]),
    0,
  );

  const digitCheckerFactor = digitsSum % CPF_VALID_LENGTH;

  return digitCheckerFactor < 2 ? 0 : CPF_VALID_LENGTH - digitCheckerFactor;
}

function validate(cpf) {
  if (!isCpfDataTypeValid(cpf)) {
    return false;
  }

  const normalizedCpf = normalizeCpf(cpf);

  if (!isCpfLengthValid(normalizedCpf)) {
    return false;
  }

  if (isAllDigitsEquals(normalizedCpf)) {
    return false;
  }

  const [cpfWithoutCheckerDigits, checkerDigits] = [
    normalizedCpf.slice(0, 9),
    normalizedCpf.slice(9, 11),
  ];

  const expectedFirstCheckerDigit = calculateCheckerDigit(cpfWithoutCheckerDigits, 10);

  const cpfWithOneCheckerDigit = [...cpfWithoutCheckerDigits, checkerDigits[0]];

  const expectedSecondCheckerDigit = calculateCheckerDigit(
    cpfWithOneCheckerDigit,
    11,
  );

  const firstCheckerDigitToValidate = normalizedCpf[normalizedCpf.length - 2];
  const secondCheckerDigitToValidate = normalizedCpf[normalizedCpf.length - 1];

  return expectedFirstCheckerDigit === firstCheckerDigitToValidate
    && expectedSecondCheckerDigit === secondCheckerDigitToValidate;
}

export default {
  validate,
};
