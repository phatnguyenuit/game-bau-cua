import { memo } from 'react';

import DiceGrid from 'components/dice-grid';
import DicePlate from 'components/dice-plate';
import NewGameButton from 'components/new-game-button';

import { formatThousand, classnames } from 'utils';
import { useDiceGame } from './utils';

import classes from './styles.module.css';

export const DiceGameComponent: React.FC = () => {
  const {
    amount,
    betState,
    names,
    needToShowResult,
    rolling,
    handleBet,
    handleResetBet,
    handleRoll,
    startNewSession,
  } = useDiceGame();
  return (
    <div>
      <div
        className={classnames(classes['side-section'], classes['left-side'])}
      >
        <span>Happy new year 2021</span>
      </div>

      <div className={classes['amount-section']}>
        <span>${formatThousand(amount)}</span>
        <NewGameButton onClick={startNewSession} />
      </div>
      <DicePlate disabled={rolling} items={names} onStart={handleRoll} />
      <DiceGrid
        betValues={betState}
        rolledDices={names}
        needToShowResult={needToShowResult}
        onBet={handleBet}
        onResetBet={handleResetBet}
      />
      <div
        className={classnames(classes['side-section'], classes['right-side'])}
      >
        <span>Happy new year 2021</span>
      </div>
    </div>
  );
};

const DiceGame = memo(DiceGameComponent);
DiceGame.displayName = 'DiceGame';

export default DiceGame;
