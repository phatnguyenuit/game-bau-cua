import { memo } from 'react';
import { getStaticPath } from '../../utils';
import { PUBLIC_URL } from '../../constants';

import classes from './styles.module.css';

export const NewGameButtonComponent: React.FC<NewGameButtonProps> = ({
  onClick,
}) => (
  <button title="New game" className={classes.root} onClick={onClick}>
    <img
      width={32}
      height="auto"
      src={getStaticPath('/images/sync.svg', PUBLIC_URL)}
      alt="new-game-icon"
    />
  </button>
);

const NewGameButton = memo(NewGameButtonComponent);
NewGameButton.displayName = 'NewGameButton';

export default NewGameButton;

export interface NewGameButtonProps {
  onClick: React.EventHandler<any>;
}
