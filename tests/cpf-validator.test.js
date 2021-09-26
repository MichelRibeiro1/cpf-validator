import CPFValidator from '../src/cpf-validator';

describe('validate cpf', () => {
  it('should return TRUE for 935.411.347-80', () => {
    expect(CPFValidator.validate('935.411.347-80')).toBe(true);
  });

  it('should return TRUE for 93541134780', () => {
    expect(CPFValidator.validate('93541134780')).toBe(true);
  });

  it('should return FALSE for 111.111.111-11', () => {
    expect(CPFValidator.validate('111.111.111-11')).toBe(false);
  });

  it('should return FALSE for 11111111111', () => {
    expect(CPFValidator.validate('11111111111')).toBe(false);
  });

  it('should return FALSE for 2345678999', () => {
    expect(CPFValidator.validate('2345678999')).toBe(false);
  });

  it('should return FALSE for NULL', () => {
    expect(CPFValidator.validate(null)).toBe(false);
  });

  it('should return FALSE for 12345', () => {
    expect(CPFValidator.validate('12345')).toBe(false);
  });

  it('should return FALSE for 12345notanumber', () => {
    expect(CPFValidator.validate('12345notanumber')).toBe(false);
  });
});
