import { memo } from 'react';

import classes from './styles.module.css';

export const NewGameButtonComponent: React.FC<NewGameButtonProps> = ({
  onClick,
}) => (
  <button title="New game" className={classes.root} onClick={onClick}>
    <img width={24} height="auto" src="/images/sync.svg" alt="new-game-icon" />
  </button>
);

const NewGameButton = memo(NewGameButtonComponent);
NewGameButton.displayName = 'NewGameButton';

export default NewGameButton;

export interface NewGameButtonProps {
  onClick: React.EventHandler<any>;
}
