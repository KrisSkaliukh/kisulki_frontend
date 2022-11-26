import cn from 'classnames';
import { memo } from 'react';

import classes from './button.module.scss';

interface IButtonProps {
  title: string;
  onClick?: () => void;
  isPrimary: boolean;
  disabled?: boolean;
}

function Button({
  title,
  onClick,
  isPrimary,
  disabled,
}: IButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn({
        [classes.primaryButton]: isPrimary && !disabled,
        [classes.secondaryButton]: !isPrimary && !disabled,
        [classes.disabledButton]: disabled,
      })}
      type="button"
      disabled={disabled}
    >
      {title}
    </button>
  );
}

export default memo(Button);
