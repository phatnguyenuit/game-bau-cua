export const CRYPTO_KEY = process.env.REACT_APP_CRYPTO_KEY;
export const CRYPTO_SECRET = process.env.REACT_APP_CRYPTO_SECRET;

export const diceNames = [
  'deer',
  'calabash',
  'rooster',
  'fish',
  'crab',
  'shrimp',
] as const;

export type DiceName = typeof diceNames[number];

export const diceImages = diceNames.reduce(
  (prev, name) => ({ ...prev, [name]: `/images/${name}.svg` }),
  {},
) as Record<DiceName, string>;
