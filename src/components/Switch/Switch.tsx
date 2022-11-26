import cn from 'classnames';
import { memo } from 'react';

import classes from './switch.module.scss';

interface ISwitchProps {
activeOption: string;
onChange: (option: 'left' | 'right') => void;
}

function Switch({
  activeOption,
  onChange,
}: ISwitchProps) {
  const activeLeft = activeOption === 'left';
  const activeRight = activeOption === 'right';

  return (
    <div className={classes.switchWrapper}>
      <div
        className={classes.switchLable}
        style={{
          fontWeight: activeLeft ? 600 : 400,
          color: activeLeft ? '#000' : '#64748b',
        }}
      >
        offline
      </div>
      <div className={classes.switch}>
        <div
          className={cn(classes.leftOption, {
            [classes.activeOption]: activeLeft,
          })}
          onClick={() => onChange('left')}
          role="none"
        />
        <div
          className={cn(classes.rightOption, {
            [classes.activeOption]: activeRight,
          })}
          onClick={() => onChange('right')}
          role="none"
        />
      </div>
      <div
        className={classes.switchLable}
        style={{
          fontWeight: activeRight ? 600 : 400,
          color: activeRight ? '#000' : '#64748b',
        }}
      >
        online
      </div>
    </div>
  );
}

export default memo(Switch);
