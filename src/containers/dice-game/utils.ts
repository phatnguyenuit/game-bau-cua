import { ROLLING_TIMEOUT_MS } from './../../constants/index';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getRandomDices, initiateBetState, initiateAmount } from '../../utils';
import { DiceName, DICE_NAMES, ROLLING_INTERVAL_MS } from '../../constants';
import storage from 'services/storage';

const getLastAmount = () => {
  const lastAmount = storage.getItem('amount');
  return lastAmount ? Number(lastAmount) : initiateAmount();
};

export const useDiceGame = () => {
  const [rolledDices, setRolledDices] = useState<DiceName[]>(getRandomDices);
  const [betState, setBetState] = useState(initiateBetState);
  const [rolling, setRolling] = useState(false);
  const [needToShowResult, setNeedToShowResult] = useState(false);
  const [intervalId, setIntervalId] = useState<number>();
  const [timeoutId, setTimeoutId] = useState<number>();
  const [amount, setAmount] = useState(getLastAmount);
  const { t } = useTranslation();

  const handleBet = useCallback(
    (name: DiceName) => () => {
      if (!rolling) {
        const bettedItems = DICE_NAMES.filter((n) => betState[n] > 0);
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
        setBetState(initiateBetState);
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

  const handleRollingInterval = useCallback(() => {
    setRolledDices(getRandomDices);
  }, []);

  const handleRoll = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const bettedItems = DICE_NAMES.filter((n) => betState[n] > 0);
      const bettedAmount = bettedItems.reduce(
        (totalAmount, item) => totalAmount + betState[item],
        0,
      );
      // Can start only having betted and valid betted amount
      if (bettedItems.length) {
        if (bettedAmount <= amount) {
          const id = window.setInterval(
            handleRollingInterval,
            ROLLING_INTERVAL_MS,
          );
          setNeedToShowResult(false);
          setRolling(true);
          setIntervalId(id);
          setTimeoutId(
            window.setTimeout(makeCleanInterval(id), ROLLING_TIMEOUT_MS),
          );
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
    [betState, amount, handleRollingInterval, makeCleanInterval, t],
  );

  const startNewSession = useCallback(() => {
    setAmount(initiateAmount);
    setNeedToShowResult(false);
    setBetState(initiateBetState);
  }, []);

  // clean up effect
  useEffect(() => {
    return () => {
      if (intervalId && timeoutId && rolling) {
        makeCleanInterval(intervalId)();
        window.clearTimeout(timeoutId);
      }
    };
  }, [makeCleanInterval, intervalId, timeoutId, rolling]);

  // update amount effect
  useEffect(() => {
    if (!rolling && needToShowResult) {
      const bettedItems = DICE_NAMES.filter((n) => betState[n] > 0);
      const gainedAmount = bettedItems.reduce((total, item) => {
        if (rolledDices && rolledDices.includes(item)) {
          const factor = rolledDices.filter((i) => i === item).length;
          return total + factor * betState[item];
        }

        return total - betState[item];
      }, 0);
      setAmount((prev) => prev + gainedAmount);
    }
  }, [rolling, betState, rolledDices, needToShowResult]);

  // store last amount
  useEffect(() => {
    // Store the last amount
    storage.setItem('amount', String(amount));
  }, [amount]);

  return {
    rolledDices,
    rolling,
    needToShowResult,
    betState,
    amount,
    intervalId,
    timeoutId,
    handleBet,
    handleResetBet,
    handleRoll,
    handleRollingInterval,
    makeCleanInterval,
    startNewSession,
    setRolledDices,
    setRolling,
    setIntervalId,
    setTimeoutId,
    setBetState,
    setNeedToShowResult,
  };
};
