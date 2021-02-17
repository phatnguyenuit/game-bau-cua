import { screen, render, fireEvent } from '@testing-library/react';

import { getRandomNames } from 'utils';
import DicePlate, { DicePlateProps } from './index';

const rolledDices = getRandomNames();
const disabled = false;
const onStart = jest.fn();

function setupTest(setupProps?: Partial<DicePlateProps>) {
  const result = render(
    <DicePlate
      disabled={disabled}
      items={rolledDices}
      onStart={onStart}
      {...setupProps}
    />,
  );
  return result;
}

afterEach(() => {
  jest.clearAllMocks();
});

describe('dice-plate', () => {
  test('should render without crashing', () => {
    setupTest();
    expect(screen.getByTestId('dice-plate')).toBeVisible();
    expect(screen.getAllByTestId('item')).toHaveLength(rolledDices.length);
  });

  test('should call `onStart`', () => {
    setupTest();
    expect(screen.getByTestId('dice-plate')).toBeVisible();

    fireEvent.click(screen.getByTestId('play-button'));
    expect(onStart).toHaveBeenCalled();
  });
});
