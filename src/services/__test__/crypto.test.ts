import cryptoService from '../crypto';

describe('crypto-service', () => {
  test('should encrypt and decrypt', () => {
    const actualText = 'actual-text';
    const encrypted = cryptoService.encrypt(actualText);

    expect(cryptoService.decrypt(encrypted)).toBe(actualText);
  });
});
