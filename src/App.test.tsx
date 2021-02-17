import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

test('renders app', () => {
  render(<App />);
  const app = screen.getByTestId('App');
  expect(app).toBeInTheDocument();
});
