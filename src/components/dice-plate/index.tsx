import { memo } from 'react';
import { getStaticPath } from '../../utils';
import { DICE_IMAGES, DiceName, PUBLIC_URL } from '../../constants';
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
            src={DICE_IMAGES[item]}
            alt={`rolled-${item}`}
          />
        </div>
      </div>
    ))}
    <button
      type="button"
      title="Play"
      className={classes['play-button']}
      disabled={disabled}
      onClick={onStart}
    >
      <img
        width={64}
        height="auto"
        src={getStaticPath('/images/dice.svg', PUBLIC_URL)}
        alt="play-icon"
      />
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
