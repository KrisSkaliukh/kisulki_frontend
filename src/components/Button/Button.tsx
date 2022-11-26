import { memo } from 'react';

import classes from './button.module.scss';

interface IButtonProps {
  title: string;
  onClick?: () => void;
  isPrimary: boolean;
}

function Button({ title, onClick, isPrimary }: IButtonProps) {
  return (
    <button
      onClick={onClick}
      className={isPrimary ? classes.primaryButton : classes.secondaryButton}
      type="button"
    >
      {title}
    </button>
  );
}

export default memo(Button);
