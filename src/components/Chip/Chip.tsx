import { memo } from 'react';

import classes from './chip.module.scss';

interface IChipProps {
  title: string;
  color: string;
}

function Chip({ title, color }: IChipProps) {
  return (
    <div style={{ backgroundColor: color }} className={classes.chip}>
      <p>{title}</p>
    </div>
  );
}

export default memo(Chip);
