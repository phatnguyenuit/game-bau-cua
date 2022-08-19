import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getStaticPath } from '../../helpers';
import { PUBLIC_URL } from '../../constants';

import classes from './styles.module.css';

export const NewGameButtonComponent: React.FC<NewGameButtonProps> = ({
  onClick,
}) => {
  const { t } = useTranslation();

  return (
    <button
      data-testid="new-game-button"
      title={t('new-game-txt', {
        defaultValue: 'New game!',
      })}
      className={classes.root}
      onClick={onClick}
    >
      <img
        width={32}
        height="auto"
        src={getStaticPath('/images/sync.svg', PUBLIC_URL)}
        alt="new-game-icon"
      />
    </button>
  );
};

const NewGameButton = memo(NewGameButtonComponent);
NewGameButton.displayName = 'NewGameButton';

export default NewGameButton;

export interface NewGameButtonProps {
  onClick: React.EventHandler<any>;
}
