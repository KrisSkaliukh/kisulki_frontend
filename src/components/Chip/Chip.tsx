import { memo } from 'react';

import classes from './chip.module.scss';

interface IChipProps {
  title: string;
  color: string;
  textColor: string;
}

function Chip({ title, color, textColor }: IChipProps) {
  return (
    <div style={{ backgroundColor: color }} className={classes.chip}>
      <p style={{ color: textColor }}>{title}</p>
    </div>
  );
}

export default memo(Chip);
