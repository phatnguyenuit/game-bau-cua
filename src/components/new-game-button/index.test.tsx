import { screen, render, fireEvent } from '@testing-library/react';
import NewGameButton from './index';

const handleClickMock = jest.fn();

function setupTest() {
  const result = render(<NewGameButton onClick={handleClickMock} />);
  return result;
}

afterEach(() => {
  jest.clearAllMocks();
});

describe('new-game-button', () => {
  test('should render without crashing', () => {
    setupTest();
    expect(screen.getByTestId('new-game-button')).toBeVisible();
  });

  test('should call `onClick`', () => {
    setupTest();
    expect(screen.getByTestId('new-game-button')).toBeVisible();

    fireEvent.click(screen.getByTestId('new-game-button'));
    expect(handleClickMock).toHaveBeenCalled();
  });
});
