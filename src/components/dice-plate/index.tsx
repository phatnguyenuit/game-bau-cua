import { memo } from 'react';
import { diceImages, DiceName } from '../../constants';
import classes from './styles.module.css';

export const DicePlateComponent: React.FC<DicePlateProps> = ({
  items,
  disabled,
  onStart,
}) => (
  <div className={classes.root}>
    {items.map((item, index) => (
      <div key={`${item}-${index}`} className={classes.item}>
        <div className={classes.content}>
          <img
            width={64}
            height="auto"
            src={diceImages[item]}
            alt={`rolled-${item}`}
          />
        </div>
      </div>
    ))}
    <button
      type="button"
      className={classes['play-button']}
      disabled={disabled}
      onClick={onStart}
    >
      <img width={64} height="auto" src="/images/dice.svg" alt="play-icon" />
    </button>
  </div>
);

const DicePlate = memo(DicePlateComponent);
DicePlate.displayName = 'DicePlate';

export default DicePlate;

export interface DicePlateProps {
  disabled: boolean;
  items: DiceName[];
  onStart: React.MouseEventHandler<any>;
}
