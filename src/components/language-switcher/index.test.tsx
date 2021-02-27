import { screen, render, fireEvent } from '@testing-library/react';
import LanguageSwitcher, { supportedLanguages } from './index';

const mock_changeLanguage = jest.fn();

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: mock_changeLanguage,
    },
  }),
}));

function setupTest() {
  const result = render(<LanguageSwitcher />);
  return result;
}

afterEach(() => {
  jest.clearAllMocks();
});

describe('language-switcher', () => {
  test('should render without crashing', () => {
    setupTest();
    expect(screen.getByTestId('language-switcher')).toBeVisible();
  });

  test('should call `changeLanguage`', () => {
    setupTest();
    expect(screen.getByTestId('language-switcher')).toBeVisible();

    const expectedLanguage = supportedLanguages[0];
    fireEvent.click(screen.getByTestId(`${expectedLanguage}-link`));
    expect(mock_changeLanguage).toHaveBeenCalled();
    expect(mock_changeLanguage).toHaveBeenCalledWith(expectedLanguage);
  });
});
