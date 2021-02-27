import { getStaticPath } from '../helpers';

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

export const MIN_AMOUNT = 20;
export const MAX_AMOUNT = 100;

export const ROLLING_INTERVAL_MS = 100;
export const ROLLING_TIMEOUT_MS = 3000;
