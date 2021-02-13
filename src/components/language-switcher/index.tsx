/* eslint-disable jsx-a11y/anchor-is-valid */
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import classes from './styles.module.css';

const supportedLanguages = ['en', 'vi'];

export const LanguageSwitcherComponent: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = useCallback(
    (lng: string) => () => {
      i18n.changeLanguage(lng);
    },
    [i18n],
  );
  return (
    <div className={classes.root}>
      {supportedLanguages.map((language) => (
        <a key={language} href="#" onClick={changeLanguage(language)}>
          {language}
        </a>
      ))}
    </div>
  );
};

const LanguageSwitcher = memo(LanguageSwitcherComponent);
LanguageSwitcher.displayName = 'LanguageSwitcher';

export default LanguageSwitcher;
