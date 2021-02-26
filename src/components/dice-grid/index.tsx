import { memo, useCallback } from 'react';
import { classnames } from '../../utils';
import { DICE_IMAGES, DiceName } from '../../constants';
import classes from './styles.module.css';

export const DiceGridComponent: React.FC<DiceGridProps> = ({
  betValues,
  rolledDices,
  needToShowResult,
  onBet,
  onResetBet,
}) => {
  const isBetted = useCallback(
    (diceName: DiceName) => {
      return betValues[diceName] > 0;
    },
    [betValues],
  );

  return (
    <div className={classes.root}>
      {(Object.entries(DICE_IMAGES) as Array<[DiceName, string]>).map(
        ([diceName, imageSrc]) => {
          const betted = isBetted(diceName);
          return (
            <div
              key={diceName}
              className={classes.item}
              onClick={onBet(diceName)}
            >
              <div
                className={classnames(classes.content, {
                  [classes.matched]:
                    needToShowResult && rolledDices.includes(diceName),
                  [classes.betted]: betted,
                })}
              >
                <img width={108} height="auto" src={imageSrc} alt={diceName} />
                {betted && (
                  <>
                    {!needToShowResult && (
                      <div className={classes['corner-section']}>
                        <span
                          className={classes.reset}
                          onClick={onResetBet(diceName)}
                        >
                          &#x2715;
                        </span>
                      </div>
                    )}
                    <div className={classes['bet-value']}>
                      <span>{betValues[diceName]}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        },
      )}
    </div>
  );
};

const DiceGrid = memo(DiceGridComponent);
DiceGrid.displayName = 'DiceGrid';

export default DiceGrid;

export interface DiceGridProps {
  betValues: Record<DiceName, number>;
  needToShowResult: boolean;
  rolledDices: DiceName[];
  onBet: (name: DiceName) => React.MouseEventHandler<any>;
  onResetBet: (name: DiceName) => React.MouseEventHandler<any>;
}
