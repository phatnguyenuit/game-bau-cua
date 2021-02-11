import { useCallback, useState, useEffect } from 'react';

export const imageNames = [
  'deer',
  'calabash',
  'rooster',
  'fish',
  'crab',
  'shrimp',
] as const;

export type ImageName = typeof imageNames[number];

export const images = imageNames.reduce(
  (prev, name) => ({ ...prev, [name]: `/images/${name}.svg` }),
  {},
) as Record<ImageName, string>;

const getRandomNames = () => {
  const getRandomIndex = () => Math.floor(Math.random() * imageNames.length);
  return new Array(3)
    .fill(undefined)
    .map(getRandomIndex)
    .map((index) => imageNames[index]);
};

const initiateBetState = () =>
  imageNames.reduce((prev, name) => ({ ...prev, [name]: 0 }), {}) as Record<
    ImageName,
    number
  >;

export const useRollDices = () => {
  const [names, setNames] = useState<ImageName[]>(getRandomNames);
  const [betState, setBetState] = useState(initiateBetState);
  const [rolling, setRolling] = useState(false);
  const [needToShowResult, setNeedToShowResult] = useState(false);
  const [intervalId, setIntervalId] = useState<number>();
  const [timeoutId, setTimeoutId] = useState<number>();
  const [amount, setAmount] = useState(10);

  const handleBet = useCallback(
    (name: ImageName) => () => {
      if (!rolling) {
        const bettedItems = imageNames.filter((n) => betState[n] > 0);
        // can bet only 3 items
        if (bettedItems.length < 3 || bettedItems.includes(name)) {
          setNeedToShowResult(false);
          setBetState((prev) => ({ ...prev, [name]: prev[name] + 1 }));
        }
      }
    },
    [betState, rolling],
  );

  const handleResetBet = useCallback(
    (name: ImageName) => (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!rolling) {
        setBetState((prev) => ({ ...prev, [name]: 0 }));
      }
    },
    [rolling],
  );

  const makeCleanInterval = useCallback(
    (id?: number) => () => {
      window.clearInterval(id);
      setRolling(false);
      setNeedToShowResult(true);
    },
    [],
  );

  const handleRoll = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const id = window.setInterval(() => {
        setNames(getRandomNames());
      }, 100);
      if (needToShowResult) {
        setBetState(initiateBetState);
      }
      setRolling(true);
      setNeedToShowResult(false);
      setIntervalId(id);
      setTimeoutId(window.setTimeout(makeCleanInterval(id), 3000));
    },
    [needToShowResult, makeCleanInterval],
  );

  useEffect(() => {
    return () => {
      if (intervalId && timeoutId && rolling) {
        const cleanInterval = makeCleanInterval(intervalId);
        cleanInterval();
        window.clearTimeout(timeoutId);
      }
    };
  }, [makeCleanInterval, intervalId, timeoutId, rolling]);

  // update amount
  useEffect(() => {
    if (!rolling && needToShowResult) {
      const bettedItems = imageNames.filter((n) => betState[n] > 0);
      const gainedAmount = bettedItems.reduce((total, item) => {
        if (names.includes(item)) {
          return total + betState[item];
        }

        return total - betState[item];
      }, 0);
      setAmount((prev) => prev + gainedAmount);
      window.setTimeout(() => {
        setBetState(initiateBetState);
      }, 3000);
    }
  }, [rolling, betState, names, needToShowResult]);

  return {
    names,
    rolling,
    needToShowResult,
    betState,
    amount,
    handleRoll,
    handleBet,
    handleResetBet,
  };
};
