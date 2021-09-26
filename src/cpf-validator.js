export default class CPFValidator {
  static validate(cpf) {
    if (!CPFValidator.isCpfDataTypeValid(cpf)) {
      return false;
    }

    if (!CPFValidator.isCpfLengthValid(cpf)) {
      return false;
    }

    const normalizedCpf = CPFValidator.normalizeCpf(cpf);

    if (CPFValidator.isAllDigitsEquals(normalizedCpf)) {
      return false;
    }

    const cpfWithoutCheckerDigits = normalizedCpf.slice(0, 9);

    const firstCheckerDigit = CPFValidator.calculateCheckerDigit(cpfWithoutCheckerDigits);

    const cpfWithOneCheckerDigit = [...cpfWithoutCheckerDigits, firstCheckerDigit];

    const secondCheckerDigit = CPFValidator.calculateCheckerDigit(
      cpfWithOneCheckerDigit,
    );

    const firstCheckerDigitToValidate = normalizedCpf[normalizedCpf.length - 2];
    const secondCheckerDigitToValidate = normalizedCpf[normalizedCpf.length - 1];

    return firstCheckerDigit === firstCheckerDigitToValidate
      && secondCheckerDigit === secondCheckerDigitToValidate;
  }

  static isCpfDataTypeValid(cpf) {
    return typeof cpf === 'string';
  }

  static isCpfLengthValid(cpf) {
    return cpf.length >= 11 || cpf.length <= 14;
  }

  static normalizeCpf(cpf) {
    return cpf
      .replace('.', '')
      .replace('.', '')
      .replace('-', '')
      .replace(' ', '')
      .split('')
      .map((digit) => parseInt(digit, 10));
  }

  static isAllDigitsEquals(cpf) {
    return cpf.every((digit) => digit === cpf[0]);
  }

  static calculateCheckerDigit(cpfDigits = []) {
    const factors = this.generateDigitsFactors(cpfDigits);
    const CPF_LENGTH = 11;

    const digitsSum = cpfDigits.reduce(
      (_digitsSum, digit, index) => _digitsSum + (digit * factors[index]),
      0,
    );

    const digitCheckerFactor = digitsSum % CPF_LENGTH;

    return digitCheckerFactor < 2 ? 0 : CPF_LENGTH - digitCheckerFactor;
  }

  static generateDigitsFactors(cpfDigits = []) {
    const FIRST_FACTOR = cpfDigits.length === 9 ? 10 : 11;
    return cpfDigits.map((_, index) => FIRST_FACTOR - index);
  }
}
