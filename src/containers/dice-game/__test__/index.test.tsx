import { screen, render } from '@testing-library/react';
import DiceGame from '../index';

function setupTest() {
  const result = render(<DiceGame />);
  return result;
}

describe('dice-game', () => {
  test('should render without crashing', () => {
    setupTest();
    expect(screen.getByTestId('dice-game')).toBeVisible();
  });
});
