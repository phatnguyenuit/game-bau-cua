import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import DiceGrid from 'components/dice-grid';
import DicePlate from 'components/dice-plate';
import NewGameButton from 'components/new-game-button';

import { formatThousand, classnames } from 'utils';
import { useDiceGame } from './utils';

import classes from './styles.module.css';

export const DiceGameComponent: React.FC = () => {
  const { t } = useTranslation();
  const {
    amount,
    betState,
    rolledDices,
    needToShowResult,
    rolling,
    handleBet,
    handleResetBet,
    handleRoll,
    startNewSession,
  } = useDiceGame();
  return (
    <div data-testid="dice-game">
      <div
        className={classnames(classes['side-section'], classes['left-side'])}
      >
        <span>
          {t('happy-banner', { defaultValue: 'Happy new year 2021' })}
        </span>
      </div>

      <div className={classes['amount-section']}>
        <span>${formatThousand(amount)}</span>
        <NewGameButton onClick={startNewSession} />
      </div>
      <DicePlate disabled={rolling} items={rolledDices} onStart={handleRoll} />
      <DiceGrid
        betValues={betState}
        rolledDices={rolledDices}
        needToShowResult={needToShowResult}
        onBet={handleBet}
        onResetBet={handleResetBet}
      />
      <div
        className={classnames(classes['side-section'], classes['right-side'])}
      >
        <span>
          {t('happy-banner', { defaultValue: 'Happy new year 2021' })}
        </span>
      </div>
    </div>
  );
};

const DiceGame = memo(DiceGameComponent);
DiceGame.displayName = 'DiceGame';

export default DiceGame;
