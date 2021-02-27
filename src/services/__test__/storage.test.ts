import storageService from '../storage';

describe('storage-service', () => {
  test('should set and get item', () => {
    const actualText = 'actual-text';
    const actualKey = 'key';

    storageService.setItem(actualKey, actualText);
    expect(storageService.getItem(actualKey)).toBe(actualText);
  });
});
