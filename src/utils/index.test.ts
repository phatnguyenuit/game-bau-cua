import * as utils from './index';

describe('utils', () => {
  describe('randomInRange', () => {
    test('should return a random number in range', () => {
      const start = 5;
      const end = 10;
      const result = utils.randomInRange(5, 10);

      expect(result).toBeLessThanOrEqual(end);
      expect(result).toBeGreaterThanOrEqual(start);
    });
  });

  describe('randomIntegerInRange', () => {
    test('should return a random integer number in range', () => {
      const start = 5;
      const end = 10;
      const result = utils.randomIntegerInRange(5, 10);

      expect(result).toBeLessThanOrEqual(end);
      expect(result).toBeGreaterThanOrEqual(start);
      expect(Number.isInteger(result)).toBe(true);
    });
  });

  describe('formatThousand', () => {
    test('should return a formatted number in thousand format', () => {
      const amount = 50000;
      const result = utils.formatThousand(amount);
      expect(result).toBe('50,000');
    });
  });

  describe('classnames', () => {
    test('should return a combined class name', () => {
      const result = utils.classnames(
        'foo',
        {
          bar: true,
          baz: false,
        },
        ['array-item1', 'array-item2'],
        undefined,
      );
      expect(result).toBe('foo bar array-item1 array-item2');
    });
  });

  describe('getRandomDices', () => {
    test('should return random dices', () => {
      const result = utils.getRandomDices();
      expect(result).toHaveLength(3);
    });
  });

  describe('initiateBetState', () => {
    test('should return an initial bet state', () => {
      const result = utils.initiateBetState();
      expect(Object.values(result).every((amount) => amount === 0)).toBe(true);
    });
  });

  describe('initiateAmount', () => {
    test('should return an initial amount in range (20, 100)', () => {
      const result = utils.initiateAmount();
      expect(result).toBeLessThanOrEqual(100);
      expect(result).toBeGreaterThanOrEqual(20);
      expect(Number.isInteger(result)).toBe(true);
    });
  });
});
