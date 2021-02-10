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

export const useRollDices = () => {
  const [names, setNames] = useState<ImageName[]>(getRandomNames);
  const [rolling, setRolling] = useState(false);
  const [intervalId, setIntervalId] = useState<number>();
  const [timeoutId, setTimeoutId] = useState<number>();

  const makeCleanInterval = useCallback(
    (id?: number) => () => {
      window.clearInterval(id);
      setRolling(false);
    },
    [],
  );

  const handleRoll = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const id = window.setInterval(() => {
        setNames(getRandomNames());
      }, 100);
      setRolling(true);
      setIntervalId(id);
      setTimeoutId(window.setTimeout(makeCleanInterval(id), 3000));
    },
    [makeCleanInterval],
  );

  useEffect(() => {
    // TODO fix rolling status
    return () => {
      if (intervalId && timeoutId) {
        const cleanInterval = makeCleanInterval(intervalId);
        console.log('cleanup');
        cleanInterval();
        window.clearTimeout(timeoutId);
      }
    };
  }, [makeCleanInterval, intervalId, timeoutId]);

  return {
    names,
    rolling,
    handleRoll,
  };
};
