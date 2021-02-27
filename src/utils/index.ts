import { DiceName, DICE_NAMES, MAX_AMOUNT, MIN_AMOUNT } from '../constants';

export const randomInRange = (start: number, end: number) =>
  Math.random() * (end - start) + start;

export const randomIntegerInRange = (start: number, end: number) =>
  Math.floor(randomInRange(start, end));

export const formatThousand = (amount: number | string) => {
  const regex = /\B(?=(\d{3})+(?!\d))/g;
  return amount.toString().replace(regex, ',');
};

export const classnames = (...args: any[]) => {
  const classes = args.map((arg) => {
    if (typeof arg === 'string') return arg;
    if (Array.isArray(arg)) return arg.flat();
    if (typeof arg === 'object') {
      return Object.entries(arg).map(([key, value]) => {
        if (value) return key;
        return '';
      });
    }
    return '';
  });
  return classes.flat().filter(Boolean).join(' ');
};

export const getRandomDices = () => {
  const getRandomIndex = () => randomIntegerInRange(0, DICE_NAMES.length);
  return new Array(3)
    .fill(undefined)
    .map(getRandomIndex)
    .map((index) => DICE_NAMES[index]);
};

export const initiateBetState = () =>
  DICE_NAMES.reduce((prev, name) => ({ ...prev, [name]: 0 }), {}) as Record<
    DiceName,
    number
  >;

export const initiateAmount = () =>
  randomIntegerInRange(MIN_AMOUNT, MAX_AMOUNT);
