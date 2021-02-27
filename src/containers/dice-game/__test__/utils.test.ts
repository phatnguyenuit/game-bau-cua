import { renderHook, act } from '@testing-library/react-hooks';
import { initiateBetState } from '../../../utils';
import * as globalUtils from '../../../utils';
import {
  DiceName,
  MAX_AMOUNT,
  MIN_AMOUNT,
  ROLLING_INTERVAL_MS,
} from '../../../constants';
import { useDiceGame } from '../utils';

describe('utils', () => {
  describe('useDiceGame', () => {
    function setupTest() {
      const result = renderHook(() => useDiceGame());
      return result;
    }

    let hookResult: ReturnType<typeof setupTest>;
    const alertMock = jest.spyOn(window, 'alert');
    const setIntervalMock = jest.spyOn(window, 'setInterval');
    const clearIntervalMock = jest.spyOn(window, 'clearInterval');
    const clearTimeoutMock = jest.spyOn(window, 'clearTimeout');

    beforeEach(() => {
      hookResult = setupTest();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe('- rolling', () => {
      test(`should be ${false} for default`, () => {
        expect(hookResult.result.current.rolling).toBe(false);
      });
    });

    describe('- needToShowResult', () => {
      test(`should be ${false} for default`, () => {
        expect(hookResult.result.current.needToShowResult).toBe(false);
      });
    });

    describe('- amount', () => {
      test(`should be in range of [${MIN_AMOUNT}, ${MAX_AMOUNT}]`, () => {
        expect(hookResult.result.current.amount).toBeGreaterThanOrEqual(
          MIN_AMOUNT,
        );
        expect(hookResult.result.current.amount).toBeLessThanOrEqual(
          MAX_AMOUNT,
        );
      });
    });

    describe('- handleBet', () => {
      test(`should increase betted amount of betState`, () => {
        expect(hookResult.result.current.betState).toStrictEqual(
          initiateBetState(),
        );

        const actualDiceName: DiceName = 'calabash';
        const handleBet = hookResult.result.current.handleBet(actualDiceName);

        act(() => {
          handleBet();
        });
        expect(hookResult.result.current.betState[actualDiceName]).toBe(1);

        act(() => {
          handleBet();
        });
        expect(hookResult.result.current.betState[actualDiceName]).toBe(2);
      });

      test(`should not be called in case of 'rolling'`, () => {
        expect(hookResult.result.current.betState.calabash).toBe(0);
        act(() => {
          hookResult.result.current.setRolling(true);
        });
        act(() => {
          hookResult.result.current.handleBet('calabash')();
        });
        expect(hookResult.result.current.betState.calabash).toBe(0);
      });

      test(`should reset 'betState' into initial bet state in case 'needToShowResult' is ${true}`, () => {
        const actualDiceName: DiceName = 'calabash';
        const actualDiceName2: DiceName = 'crab';

        act(() => {
          hookResult.result.current.setBetState({
            ...initiateBetState(),
            [actualDiceName]: 1,
            [actualDiceName2]: 1,
          });
        });
        act(() => {
          hookResult.result.current.setNeedToShowResult(true);
        });

        act(() => {
          const handleBet = hookResult.result.current.handleBet(actualDiceName);
          handleBet();
        });

        // Update `needToShowResult` into false
        expect(hookResult.result.current.needToShowResult).toBe(false);

        // Clear `${actualDiceName2}` bet amount
        expect(hookResult.result.current.betState[actualDiceName2]).toBe(0);

        // Update `${actualDiceName}` bet amount to 1
        expect(hookResult.result.current.betState[actualDiceName]).toBe(1);
      });

      test(`should alert error message in case 'bettedAmount' is greater than or equal to 'amount'`, () => {
        const actualDiceName: DiceName = 'calabash';
        const actualBetState = {
          ...initiateBetState(),
          [actualDiceName]: hookResult.result.current.amount,
        };

        act(() => {
          hookResult.result.current.setBetState(actualBetState);
        });

        act(() => {
          const handleBet = hookResult.result.current.handleBet(actualDiceName);
          handleBet();
        });

        // Update `${actualDiceName}` bet amount to 1
        expect(hookResult.result.current.betState[actualDiceName]).not.toBe(
          hookResult.result.current.amount + 1,
        );

        expect(alertMock).toHaveBeenCalled();
        expect(alertMock).toHaveBeenCalledTimes(1);
        expect(alertMock).toHaveBeenCalledWith('exceed-bet-amount-msg');
      });

      test(`should alert error message in case betted 3 items and continue betting new item`, () => {
        const actualBetState = {
          ...initiateBetState(),
          crab: 1,
          deer: 1,
          fish: 1,
        };
        act(() => {
          hookResult.result.current.setBetState(actualBetState);
        });

        const actualDiceName: DiceName = 'calabash';
        act(() => {
          const handleBet = hookResult.result.current.handleBet(actualDiceName);
          handleBet();
        });

        // Update `${actualDiceName}` bet amount to 1
        expect(hookResult.result.current.betState).toStrictEqual(
          actualBetState,
        );

        expect(alertMock).toHaveBeenCalled();
        expect(alertMock).toHaveBeenCalledTimes(1);
        expect(alertMock).toHaveBeenCalledWith('max-bet-msg');
      });
    });

    describe('handleResetBet', () => {
      test('should reset betted amount', () => {
        const actualDiceName: DiceName = 'calabash';
        const actualBetState = {
          ...initiateBetState(),
          [actualDiceName]: hookResult.result.current.amount,
        };

        act(() => {
          hookResult.result.current.setBetState(actualBetState);
        });

        expect(hookResult.result.current.betState).toStrictEqual(
          actualBetState,
        );

        act(() => {
          const handleResetBet = hookResult.result.current.handleResetBet(
            actualDiceName,
          );

          // @ts-ignore
          handleResetBet(new MouseEvent('click'));
        });

        expect(hookResult.result.current.betState).toStrictEqual(
          initiateBetState(),
        );
      });
      test('should not called in case of rolling', () => {
        const actualDiceName: DiceName = 'calabash';
        const actualBetState = {
          ...initiateBetState(),
          [actualDiceName]: hookResult.result.current.amount,
        };

        act(() => {
          hookResult.result.current.setBetState(actualBetState);
          hookResult.result.current.setRolling(true);
        });
        expect(hookResult.result.current.betState).toStrictEqual(
          actualBetState,
        );

        act(() => {
          const handleResetBet = hookResult.result.current.handleResetBet(
            actualDiceName,
          );

          // @ts-ignore
          handleResetBet(new MouseEvent('click'));
        });

        expect(hookResult.result.current.betState).not.toStrictEqual(
          initiateBetState(),
        );
        expect(hookResult.result.current.betState).toStrictEqual(
          actualBetState,
        );
      });
    });

    describe('makeCleanInterval', () => {
      test('should clean interval', () => {
        act(() => {
          hookResult.result.current.setRolling(true);
          hookResult.result.current.setNeedToShowResult(false);
        });
        expect(hookResult.result.current.rolling).toBe(true);
        expect(hookResult.result.current.needToShowResult).toBe(false);

        const actualIntervalId = 1;
        act(() => {
          const handleClearInterval = hookResult.result.current.makeCleanInterval(
            actualIntervalId,
          );

          handleClearInterval();
        });

        expect(hookResult.result.current.rolling).toBe(false);
        expect(hookResult.result.current.needToShowResult).toBe(true);

        expect(clearIntervalMock).toHaveBeenCalled();
        expect(clearIntervalMock).toHaveBeenCalledTimes(1);
        expect(clearIntervalMock).toHaveBeenCalledWith(actualIntervalId);
      });
    });

    describe('handleRollingInterval', () => {
      const getRandomDicesMock = jest
        .spyOn(globalUtils, 'getRandomDices')
        .mockReturnValue(['calabash', 'crab', 'fish']);
      test('should call `getRandomDices`', () => {
        const initialCalls = getRandomDicesMock.mock.calls.length;
        act(() => {
          hookResult.result.current.handleRollingInterval();
        });

        expect(getRandomDicesMock).toHaveBeenCalledTimes(initialCalls + 1);
      });
    });

    describe('handleRoll', () => {
      test('should alert error message in case no betted items', () => {
        act(() => {
          // @ts-ignore
          hookResult.result.current.handleRoll(new MouseEvent('click'));
        });

        expect(alertMock).toHaveBeenCalled();
        expect(alertMock).toHaveBeenCalledTimes(1);
        expect(alertMock).toHaveBeenCalledWith('no-bet-msg');
      });

      test('should roll the dices in case the betted amount is valid', () => {
        const actualBetState = {
          ...initiateBetState(),
          crab: MIN_AMOUNT,
        };

        const actualIntervalId = 1;
        // @ts-ignore
        setIntervalMock.mockReturnValue(actualIntervalId);

        act(() => {
          hookResult.result.current.setBetState(actualBetState);
        });

        act(() => {
          // @ts-ignore
          hookResult.result.current.handleRoll(new MouseEvent('click'));
        });

        expect(hookResult.result.current.rolling).toBe(true);
        expect(hookResult.result.current.needToShowResult).toBe(false);
        expect(hookResult.result.current.intervalId).toBe(actualIntervalId);
        expect(hookResult.result.current.timeoutId).toBeTruthy();

        expect(setIntervalMock).toHaveBeenCalled();
        expect(setIntervalMock).toHaveBeenCalledTimes(1);
        expect(setIntervalMock).toHaveBeenCalledWith(
          hookResult.result.current.handleRollingInterval,
          ROLLING_INTERVAL_MS,
        );
      });

      test('should not roll the dices in case the betted amount is greater than `amount`', () => {
        const actualBetState = {
          ...initiateBetState(),
          crab: MAX_AMOUNT + 1,
        };

        act(() => {
          hookResult.result.current.setBetState(actualBetState);
        });

        act(() => {
          // @ts-ignore
          hookResult.result.current.handleRoll(new MouseEvent('click'));
        });

        expect(hookResult.result.current.rolling).toBe(false);
        expect(hookResult.result.current.needToShowResult).toBe(false);
        expect(hookResult.result.current.intervalId).toBeFalsy();
        expect(hookResult.result.current.timeoutId).toBeFalsy();

        expect(alertMock).toHaveBeenCalled();
        expect(alertMock).toHaveBeenCalledTimes(1);
        expect(alertMock).toHaveBeenCalledWith('exceed-bet-amount-msg');
      });
    });

    describe('startNewSession', () => {
      test('should start new game session', () => {
        act(() => {
          hookResult.result.current.setNeedToShowResult(true);
        });

        act(() => {
          hookResult.result.current.startNewSession();
        });

        expect(hookResult.result.current.needToShowResult).toBe(false);
        expect(hookResult.result.current.betState).toStrictEqual(
          initiateBetState(),
        );
      });
    });

    describe('clean up effect', () => {
      test('should clear interval and timeout', () => {
        // Prepare
        const actualIntervalId = 1;
        const actualTimeoutId = 2;
        act(() => {
          hookResult.result.current.setRolling(true);
          hookResult.result.current.setIntervalId(actualIntervalId);
          hookResult.result.current.setTimeoutId(actualTimeoutId);
        });

        act(() => {
          hookResult.unmount();
        });

        expect(clearIntervalMock).toHaveBeenCalled();
        expect(clearIntervalMock).toHaveBeenCalledWith(actualIntervalId);

        expect(clearTimeoutMock).toHaveBeenCalled();
        expect(clearTimeoutMock).toHaveBeenCalledWith(actualTimeoutId);
      });
    });

    describe('update amount effect', () => {
      test('should update amount after rolled', () => {
        const currentAmount = hookResult.result.current.amount;
        // Prepare
        act(() => {
          hookResult.result.current.setRolling(false);
          hookResult.result.current.setNeedToShowResult(true);
          hookResult.result.current.setBetState((prev) => ({
            ...prev,
            calabash: 1,
            crab: 10,
          }));
          hookResult.result.current.setRolledDices(['fish', 'crab', 'crab']);
        });

        expect(hookResult.result.current.amount).toBe(
          currentAmount + -1 + 2 * 10,
        );
      });
    });
  });
});
