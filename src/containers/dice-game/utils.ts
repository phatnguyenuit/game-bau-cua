import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { randomIntegerInRange } from 'utils';
import { DiceName, diceNames } from '../../constants';

const getRandomNames = () => {
  const getRandomIndex = () => randomIntegerInRange(0, diceNames.length);
  return new Array(3)
    .fill(undefined)
    .map(getRandomIndex)
    .map((index) => diceNames[index]);
};

const initiateBetState = () =>
  diceNames.reduce((prev, name) => ({ ...prev, [name]: 0 }), {}) as Record<
    DiceName,
    number
  >;

const initiateAmount = () => randomIntegerInRange(20, 100);

export const useDiceGame = () => {
  const [names, setNames] = useState<DiceName[]>(getRandomNames);
  const [betState, setBetState] = useState(initiateBetState);
  const [rolling, setRolling] = useState(false);
  const [needToShowResult, setNeedToShowResult] = useState(false);
  const [intervalId, setIntervalId] = useState<number>();
  const [timeoutId, setTimeoutId] = useState<number>();
  const [amount, setAmount] = useState(initiateAmount);
  const { t } = useTranslation();

  const handleBet = useCallback(
    (name: DiceName) => () => {
      if (!rolling) {
        const bettedItems = diceNames.filter((n) => betState[n] > 0);
        const bettedAmount = bettedItems.reduce(
          (total, item) => total + betState[item],
          0,
        );

        if (needToShowResult) {
          setBetState(initiateBetState);
        }

        if (bettedAmount < amount) {
          // can bet only 3 items
          if (bettedItems.length < 3 || bettedItems.includes(name)) {
            setNeedToShowResult(false);
            setBetState((prev) => ({ ...prev, [name]: prev[name] + 1 }));
          } else {
            alert(
              t('max-bet-msg', { defaultValue: 'You can bet up to 3 items!' }),
            );
          }
        } else {
          alert(
            t('exceed-bet-amount-msg', {
              defaultValue: 'Please adjust your betted amount!',
            }),
          );
        }
      }
    },
    [amount, betState, needToShowResult, rolling, t],
  );

  const handleResetBet = useCallback(
    (name: DiceName) => (e: React.MouseEvent) => {
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
      const bettedItems = diceNames.filter((n) => betState[n] > 0);
      const bettedAmount = bettedItems.reduce(
        (totalAmount, item) => totalAmount + betState[item],
        0,
      );
      // Can start only having betted and valid betted amount
      if (bettedItems.length) {
        if (bettedAmount <= amount) {
          const id = window.setInterval(() => {
            setNames(getRandomNames);
          }, 100);
          setNeedToShowResult(false);
          setRolling(true);
          setIntervalId(id);
          setTimeoutId(window.setTimeout(makeCleanInterval(id), 3000));
        } else {
          alert(
            t('exceed-bet-amount-msg', {
              defaultValue: 'Please adjust your betted amount!',
            }),
          );
        }
      } else {
        alert(
          t('no-bet-msg', { defaultValue: 'Please bet at least one item!' }),
        );
      }
    },
    [amount, betState, t, makeCleanInterval],
  );

  const startNewSession = useCallback(() => {
    setAmount(initiateAmount);
    setNeedToShowResult(false);
    setBetState(initiateBetState);
  }, []);

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
      const bettedItems = diceNames.filter((n) => betState[n] > 0);
      const gainedAmount = bettedItems.reduce((total, item) => {
        if (names.includes(item)) {
          const factor = names.filter((i) => i === item).length;
          return total + factor * betState[item];
        }

        return total - betState[item];
      }, 0);
      setAmount((prev) => prev + gainedAmount);
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
    startNewSession,
  };
};
