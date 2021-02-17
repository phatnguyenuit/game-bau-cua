import { screen, render, fireEvent } from '@testing-library/react';

import { initiateBetState, getRandomDices } from 'utils';
import { DiceName } from '../../constants/index';
import DiceGrid, { DiceGridProps } from './index';

const handleBet = jest.fn();
const handleResetBet = jest.fn();

const onBet = (diceName: string) => () => {
  handleBet(diceName);
};

const onResetBet = (diceName: string) => () => {
  handleResetBet(diceName);
};
const DICE_NAME: DiceName = 'calabash';

function setupTest(setupProps?: Partial<DiceGridProps>) {
  const betState = initiateBetState();
  const rolledDices = getRandomDices();
  const result = render(
    <DiceGrid
      betValues={betState}
      rolledDices={rolledDices}
      needToShowResult={false}
      onBet={onBet}
      onResetBet={onResetBet}
      {...setupProps}
    />,
  );
  return result;
}

afterEach(() => {
  jest.clearAllMocks();
});

describe('dice-grid', () => {
  test('should render without crashing', () => {
    setupTest();
    expect(screen.getByTestId('dice-grid')).toBeVisible();
  });

  test('should render matched class name', () => {
    setupTest({
      needToShowResult: true,
    });
    expect(screen.getByTestId('dice-grid').innerHTML).toContain('matched');
  });

  test('should render betted amount', () => {
    const betState = {
      ...initiateBetState(),
      [DICE_NAME]: 1,
    };
    setupTest({
      betValues: betState,
    });
    expect(screen.getByTestId(`${DICE_NAME}-content`).className).toContain(
      'betted',
    );
    expect(screen.getByTestId(`${DICE_NAME}-bet-value`)).toHaveTextContent(
      betState[DICE_NAME].toString(),
    );
  });

  test('should call `handleBet`', () => {
    setupTest();
    expect(screen.getByTestId('dice-grid')).toBeVisible();

    fireEvent.click(screen.getByTestId(DICE_NAME));
    expect(handleBet).toHaveBeenCalledTimes(1);
  });

  test('should call `handleResetBet`', () => {
    const betState = {
      ...initiateBetState(),
      [DICE_NAME]: 1,
    };
    setupTest({
      betValues: betState,
    });
    expect(screen.getByTestId('dice-grid')).toBeVisible();

    fireEvent.click(screen.getByTestId(`${DICE_NAME}-reset`));
    expect(handleResetBet).toHaveBeenCalledTimes(1);
  });
});
