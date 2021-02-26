import { getStaticPath } from '../utils';

export const CRYPTO_KEY = process.env.REACT_APP_CRYPTO_KEY;
export const CRYPTO_SECRET = process.env.REACT_APP_CRYPTO_SECRET;
export const PUBLIC_URL = process.env.PUBLIC_URL;

export const DICE_NAMES = [
  'deer',
  'calabash',
  'rooster',
  'fish',
  'crab',
  'shrimp',
] as const;

export type DiceName = typeof DICE_NAMES[number];

export const DICE_IMAGES = DICE_NAMES.reduce(
  (prev, name) => ({
    ...prev,
    [name]: getStaticPath(`/images/${name}.svg`, PUBLIC_URL),
  }),
  {},
) as Record<DiceName, string>;
